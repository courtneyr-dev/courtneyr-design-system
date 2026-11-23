import { readFileSync } from 'node:fs';
import { withStorybook } from './lib/static-storybook.mjs';

const tokensCss = readFileSync(new URL('../tokens/tokens.css', import.meta.url), 'utf8');
const PALETTE_STORY = 'foundations-color--palette';
const REQUIRED = { name: '--cr-light-gray', rgb: 'rgb(235, 235, 235)' };

function fail(message) {
  console.error(`FAIL  ${message}`);
  process.exitCode = 1;
}

await withStorybook(async ({ context, openStory }) => {
  const oracle = await context.newPage();
  await oracle.setContent(`<!doctype html><style>${tokensCss}</style>`);
  const expected = await oracle.evaluate(() => {
    const names = new Set();
    const walk = (rules) => {
      for (const rule of rules) {
        if (rule.cssRules) walk(rule.cssRules);
        if (rule.style) for (const prop of rule.style) if (prop.startsWith('--')) names.add(prop);
      }
    };
    walk(document.styleSheets[0].cssRules);
    const root = getComputedStyle(document.documentElement);
    return [...names].filter((n) => CSS.supports('color', root.getPropertyValue(n).trim())).sort();
  });

  const page = await context.newPage();
  await openStory(page, PALETTE_STORY);
  const rendered = await page.$$eval('[data-color-token]', (items) => items.map((i) => i.dataset.colorToken).sort());
  const statedCount = Number(await page.getAttribute('[data-color-count]', 'data-color-count'));
  const swatch = await page.$eval(
    `[data-color-token="${REQUIRED.name}"] .fd-swatch`,
    (el) => getComputedStyle(el).backgroundColor,
  ).catch(() => null);

  console.log(`tokens.css color custom properties (browser CSSOM): ${expected.length}`);
  console.log(`rendered on ${PALETTE_STORY}: ${rendered.length} (page states ${statedCount})`);
  console.log(`${REQUIRED.name} swatch background: ${swatch}`);

  const missing = expected.filter((n) => !rendered.includes(n));
  const extra = rendered.filter((n) => !expected.includes(n));
  if (missing.length) fail(`not rendered: ${missing.join(', ')}`);
  if (extra.length) fail(`rendered but not a color in tokens.css: ${extra.join(', ')}`);
  if (expected.length !== rendered.length || rendered.length !== statedCount) fail('counts differ');
  if (swatch !== REQUIRED.rgb) fail(`${REQUIRED.name} swatch is ${swatch}, expected ${REQUIRED.rgb}`);
  if (!process.exitCode) console.log('pass  palette lists every color custom property in tokens.css');
});
