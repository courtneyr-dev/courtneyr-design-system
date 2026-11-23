import { AxeBuilder } from '@axe-core/playwright';
import { WCAG_TAGS } from '../.storybook/a11y-rules.js';
import { withStorybook } from './lib/static-storybook.mjs';

const SCHEMES = ['light', 'dark'];

// axe can't read a background through a gradient and leaves contrast
// unmeasured. Fiber and halftone are texture over a solid surface, so remove
// them. The light-mode .cr-highlight swipe puts each letter half on the
// surface and half on the yellow band; text that passes on the band is dark
// enough to pass on any lighter surface, so fill the swipe solid and measure
// there. An unmeasured contrast check anywhere else fails the run.
const TEXTURE_OFF = `
  body, .cr-hero, .cr-halftone { background-image: none !important; }
  .cr-highlight { background: var(--cr-highlight) !important; }`;

const ISSUES = 'https://github.com/courtneyr-dev/courtneyr-design-system/issues';
const COMPONENTS = 'components-documented-classes--all-components';
const KNOWN = [
  { story: COMPONENTS, scheme: 'light', rule: 'color-contrast', target: /^\.cr-eyebrow$/, issue: `${ISSUES}/5` },
  { story: COMPONENTS, scheme: 'light', rule: 'color-contrast', target: /^\.cr-hero__title--accent$/, issue: `${ISSUES}/5` },
  { story: 'foundations-brand--icons', scheme: 'dark', rule: 'color-contrast', target: /> figcaption$/, issue: `${ISSUES}/6` },
  { story: COMPONENTS, scheme: 'dark', rule: 'color-contrast', target: /^(\.cr-toc__heading|a\[href\$="#(why|fix)"\])$/, issue: `${ISSUES}/6` },
];

const known = (story, scheme, rule, target) =>
  KNOWN.find((k) => k.story === story && k.scheme === scheme && k.rule === rule && k.target.test(target));

let failures = 0;
const seenKnown = new Set();

await withStorybook(async ({ context, index, openStory }) => {
  const stories = Object.values(index.entries).filter((e) => e.type === 'story');
  for (const scheme of SCHEMES) {
    for (const story of stories) {
      const page = await context.newPage();
      await openStory(page, story.id, scheme);
      await page.addStyleTag({ content: TEXTURE_OFF });
      const { violations, incomplete } = await new AxeBuilder({ page })
        .include('#storybook-root')
        .withTags(WCAG_TAGS)
        .analyze();
      await page.close();

      const unmeasured = (incomplete.find((i) => i.id === 'color-contrast')?.nodes ?? [])
        .filter((node) => !node.any.some((check) => check.data?.messageKey === 'nonBmp'))
        .map((node) => ({ id: 'color-contrast-unmeasured', target: node.target.join(' '), help: node.any[0]?.message }));
      const found = [
        ...violations.flatMap((v) => v.nodes.map((node) => ({ id: v.id, target: node.target.join(' '), help: v.help }))),
        ...unmeasured,
      ];

      const fresh = [];
      for (const f of found) {
        const match = known(story.id, scheme, f.id, f.target);
        if (match) seenKnown.add(match);
        else fresh.push(`${f.id}: ${f.target}  ${f.help}`);
      }
      failures += fresh.length;
      console.log(`${fresh.length ? 'FAIL' : 'pass'}  ${scheme.padEnd(5)}  ${story.id}`);
      for (const line of fresh) console.log(`        ${line}`);
    }
  }

  for (const k of KNOWN) {
    if (seenKnown.has(k)) console.log(`known ${k.scheme.padEnd(5)}  ${k.story} ${k.rule} ${k.target.source}  ${k.issue}`);
    else {
      failures += 1;
      console.log(`FAIL  known violation no longer occurs, remove it from KNOWN: ${k.scheme} ${k.story} ${k.target.source}`);
    }
  }
  console.log(
    `\n${stories.length} stories x ${SCHEMES.length} color schemes, ${failures} failures, ${seenKnown.size} known (axe tags: ${WCAG_TAGS.join(', ')})`,
  );
});

if (failures > 0) process.exitCode = 1;
