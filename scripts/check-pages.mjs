import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AxeBuilder } from '@axe-core/playwright';
import { LinkChecker } from 'linkinator';
import { chromium } from 'playwright-core';
import { WCAG_TAGS } from '../.storybook/a11y-rules.js';
import { composed } from '../.storybook/composed.js';
import { serve } from './lib/static-storybook.mjs';

const DIST = fileURLToPath(new URL('../dist', import.meta.url));
const SCHEMES = ['light', 'dark'];

const STORYBOOK_UI = 'Storybook 10.6.6 manager markup, not this repo';
const KNOWN_IN_STORYBOOK_UI = [
  {
    rule: 'label-content-name-mismatch',
    target: /> \.css-[a-z0-9]+\[aria-label="Collapse"\]\[data-action="collapse-root"\]$/,
    why: `${STORYBOOK_UI}: each sidebar section button shows its name and is labeled "Collapse"`,
  },
  {
    rule: 'aria-allowed-attr',
    target: /^\.css-[a-z0-9]+(:nth-child\(\d+\))?$/,
    html: /^<div aria-label="Hide .* stories" aria-expanded=/,
    why: `${STORYBOOK_UI}: each composed Storybook's header is a div with aria-expanded and no role`,
  },
  {
    rule: 'aria-valid-attr-value',
    target: /^#[a-z0-9-]+_[a-z0-9-]+$/,
    why: `${STORYBOOK_UI}: a composed component's aria-controls lists story ids without the ref prefix, so no element has them`,
  },
];

let failures = 0;
const fail = (message) => {
  failures += 1;
  console.log(`FAIL  ${message}`);
};

const settled = (id) => {
  const render = window.__STORYBOOK_PREVIEW__?.currentRender;
  return render?.id === id && ['finished', 'errored', 'aborted'].includes(render.phase);
};
const outcome = () => {
  const render = window.__STORYBOOK_PREVIEW__.currentRender;
  return {
    phase: render.phase,
    errorDisplay: document.body.classList.contains('sb-show-errordisplay'),
    skippedRules: (render.story?.parameters?.a11y?.config?.rules ?? []).filter((r) => r.enabled === false).map((r) => r.id),
  };
};

async function storiesIn(base) {
  const response = await fetch(new URL('index.json', base));
  if (!response.ok) throw new Error(`${base}index.json returned ${response.status}`);
  return Object.values((await response.json()).entries).filter((entry) => entry.type === 'story');
}

async function checkComposition(context, url, id, base, stories) {
  const page = await context.newPage();
  await page.goto(`${url}/`);
  await page.waitForSelector(`[data-ref-id="${id}"][data-nodetype="root"], [data-ref-id="${id}"][data-nodetype="component"]`);
  for (const button of await page.locator(`[data-ref-id="${id}"] [data-action="expand-all"]`).all()) await button.click();
  const shown = await page.locator(`[data-ref-id="${id}"][data-nodetype="story"]`).count();
  if (shown === stories.length) console.log(`pass  ${id}: host sidebar lists ${shown} stories, ${base}index.json has ${stories.length}`);
  else fail(`${id}: host sidebar lists ${shown} stories, ${base}index.json has ${stories.length}`);

  let rendered = 0;
  for (const story of stories) {
    await page.locator(`[data-ref-id="${id}"][data-nodetype="story"][data-item-id="${story.id}"]`).click();
    const refFrame = await (await page.waitForSelector(`#storybook-ref-${id}`)).contentFrame();
    try {
      await refFrame.waitForFunction(settled, story.id, { timeout: 30_000 });
      const { phase, errorDisplay } = await refFrame.evaluate(outcome);
      if (phase === 'finished' && !errorDisplay) rendered += 1;
      else fail(`${id}: ${story.id} ended in phase ${phase}${errorDisplay ? ' with the error display' : ''} inside the host`);
    } catch {
      fail(`${id}: ${story.id} did not finish rendering inside the host within 30 s`);
    }
  }
  console.log(`${rendered === stories.length ? 'pass' : 'FAIL'}  ${id}: ${rendered} of ${stories.length} stories rendered inside the host`);
  await page.close();
}

async function checkAxe(context, id, base, stories) {
  let clean = 0;
  const skips = new Set();
  for (const scheme of SCHEMES) {
    for (const story of stories) {
      const page = await context.newPage();
      const pageErrors = [];
      page.on('pageerror', (error) => pageErrors.push(error.message));
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto(`${base}iframe.html?id=${story.id}&viewMode=story`);
      const finished = await page.waitForFunction(settled, story.id, { timeout: 30_000 }).then(
        () => true,
        () => false,
      );
      const { phase, errorDisplay, skippedRules = [] } = finished
        ? await page.evaluate(outcome)
        : { phase: 'unfinished after 30 s' };
      for (const rule of skippedRules) skips.add(`${story.id} ${rule}`);
      await page.evaluate(() => document.fonts.ready);
      const { violations } = await new AxeBuilder({ page })
        .include('#storybook-root')
        .withTags(WCAG_TAGS)
        .disableRules(skippedRules)
        .analyze();
      await page.close();

      const problems = [
        ...(phase === 'finished' && !errorDisplay
          ? []
          : [`render ended in phase ${phase}${errorDisplay ? ' with the error display' : ''}`]),
        ...pageErrors.map((message) => `page error: ${message}`),
        ...violations.flatMap((v) => v.nodes.map((node) => `${v.id}: ${node.target.join(' ')}  ${v.help}`)),
      ];
      if (problems.length === 0) clean += 1;
      else fail(`axe ${scheme.padEnd(5)} ${id}: ${story.id}\n        ${problems.join('\n        ')}`);
    }
  }
  for (const key of skips) console.log(`skip  axe ${id}: ${key}, declared in the story's parameters.a11y.config.rules`);
  const renders = stories.length * SCHEMES.length;
  console.log(
    `${clean === renders ? 'pass' : 'FAIL'}  axe ${id}: ${clean} of ${renders} renders clean (${stories.length} stories x ${SCHEMES.length} color schemes, tags: ${WCAG_TAGS.join(', ')}, ${skips.size} story-declared rule skips)`,
  );
}

async function checkStorybookUi(context, url, refIds) {
  const seen = new Set();
  let fresh = 0;
  for (const scheme of SCHEMES) {
    const page = await context.newPage();
    await page.emulateMedia({ colorScheme: scheme });
    await page.goto(`${url}/`);
    for (const id of refIds) {
      await page.waitForSelector(`[data-ref-id="${id}"]`);
      for (const button of await page.locator(`[data-ref-id="${id}"] [data-action="expand-all"]`).all()) await button.click();
    }
    const { violations } = await new AxeBuilder({ page }).exclude('iframe').withTags(WCAG_TAGS).analyze();
    await page.close();
    for (const v of violations) {
      for (const node of v.nodes) {
        const target = node.target.join(' ');
        const known = KNOWN_IN_STORYBOOK_UI.find(
          (k) => k.rule === v.id && k.target.test(target) && (!k.html || k.html.test(node.html)),
        );
        if (known) seen.add(known);
        else {
          fresh += 1;
          fail(`axe ${scheme.padEnd(5)} Storybook UI: ${v.id}: ${target}  ${v.help}`);
        }
      }
    }
  }
  for (const known of KNOWN_IN_STORYBOOK_UI) {
    if (seen.has(known)) console.log(`known axe Storybook UI: ${known.rule}  (${known.why})`);
    else fail(`axe Storybook UI: known ${known.rule} no longer occurs, remove it from KNOWN_IN_STORYBOOK_UI`);
  }
  console.log(`${fresh ? 'FAIL' : 'pass'}  axe Storybook UI: host page with every ref expanded, ${SCHEMES.length} color schemes, ${fresh} new violations`);
}

async function checkLinks(url, roots) {
  const seeds = roots.flatMap((root) => [`${url}${root}`, `${url}${root}iframe.html`]);
  const result = await new LinkChecker().check({ path: seeds, recurse: true, checkCss: true });
  const broken = result.links.filter((link) => link.state === 'BROKEN');
  for (const link of broken) fail(`link ${link.status} ${link.url}  (on ${link.parent})`);
  console.log(`${broken.length ? 'FAIL' : 'pass'}  linkinator: ${result.links.length} links from ${seeds.length} seed pages, ${broken.length} broken`);
}

if (!existsSync(join(DIST, 'index.html'))) throw new Error('dist/index.html is missing. Run `npm run build:pages` first.');

const { server, url } = await serve(DIST, '/courtneyr-design-system');
const browser = await chromium.launch({ channel: 'chrome' });
try {
  const context = await browser.newContext({ viewport: { width: 1280, height: 4000 } });
  const page = await context.newPage();
  await page.goto(`${url}/`);
  const refs = await page.evaluate(() => window.REFS ?? {});
  await page.close();

  for (const [id, ref] of Object.entries(refs)) {
    const base = new URL(`${ref.url}/`, `${url}/`).href;
    const stories = await storiesIn(base);
    await checkComposition(context, url, id, base, stories);
    if (base.startsWith(url)) await checkAxe(context, id, base, stories);
    else console.log(`note  axe ${id}: served from ${base}, so its own repo's checks cover it`);
  }

  await checkStorybookUi(context, url, Object.keys(refs));

  for (const { id, url: planned } of composed.filter((entry) => entry.planned)) {
    const live = await fetch(new URL('index.json', planned)).then((r) => r.ok, () => false);
    console.log(
      live
        ? `note  ${id}: ${planned} now serves index.json. Remove "planned" from its composed.json entry to compose it.`
        : `note  ${id}: planned, ${planned} doesn't serve a Storybook yet, so the host leaves it out`,
    );
  }

  await checkLinks(url, ['/', ...composed.filter((entry) => entry.build).map((entry) => entry.path)]);
} finally {
  await browser.close();
  server.close();
}

console.log(`\n${failures} failures`);
if (failures > 0) process.exitCode = 1;
