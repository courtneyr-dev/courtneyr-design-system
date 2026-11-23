import { readFileSync } from 'node:fs';
import { colorTokens } from '../stories/lib/foundations.js';
import { contrastAgainst } from '../stories/lib/contrast.js';

const background = process.argv[2] ?? '#ebebeb';
const css = readFileSync(new URL('../tokens/tokens.css', import.meta.url), 'utf8');
const rows = contrastAgainst(background, colorTokens(css));
const floor2 = (n) => (Math.floor(n * 100) / 100).toFixed(2);

console.log(`| Text color | Tokens | Ratio on ${background} | Normal text (4.5:1) | Large text (3:1) |`);
console.log('| --- | --- | --- | --- | --- |');
for (const r of rows) {
  const names = r.names.map((n) => `\`${n}\``).join(', ');
  console.log(`| \`${r.hex}\` | ${names} | ${floor2(r.ratio)}:1 | ${r.normal ? 'Pass' : 'Fail'} | ${r.large ? 'Pass' : 'Fail'} |`);
}
