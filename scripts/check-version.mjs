import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const { version } = JSON.parse(read('package.json'));
const readme = read('README.md');

const checks = [
  ['tokens/tokens.css header', read('tokens/tokens.css').includes(`design tokens v${version}\n`)],
  ['brand/brand.json "version"', JSON.parse(read('brand/brand.json')).version === version],
  ['README.md version badge', readme.includes(`badge/version-${version}-`)],
  ['README.md "## Version" entry', readme.includes(`**v${version}**`)],
];

for (const [where, ok] of checks) console.log(`${ok ? 'pass' : 'FAIL'}  ${where} says ${version}`);
if (checks.some(([, ok]) => !ok)) {
  console.error(`\nUpdate every place above to ${version} (package.json is the source).`);
  process.exitCode = 1;
}
