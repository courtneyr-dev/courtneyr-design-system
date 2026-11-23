import { readFileSync } from 'node:fs';
import { classesInHtml, definedClasses, documentedComponents } from '../stories/lib/foundations.js';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const defined = definedClasses(read('components/components.css'));
const sections = documentedComponents(read('docs/COMPONENTS.md'));
const used = new Set(sections.flatMap((s) => s.examples.flatMap(classesInHtml)));
const missing = [...used].filter((c) => !defined.has(c));

console.log(`${sections.length} COMPONENTS.md sections, ${used.size} .cr-* classes in their examples`);
if (missing.length) {
  console.error(`FAIL  not defined in components/components.css: ${missing.join(', ')}`);
  process.exitCode = 1;
} else {
  console.log('pass  every example class is defined in components/components.css');
}
