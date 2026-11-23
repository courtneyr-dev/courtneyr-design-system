const SECTION_HEADER = /\/\*\s*=+\s*\n\s*(\d+)\.\s+([^\n]+)/g;
const DECLARATION = /(--[\w-]+)\s*:\s*([^;]+);/g;
const COLOR_LITERAL = /^(#(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})|(?:rgb|hsl)a?\([^)]*\))$/i;

function blankComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '));
}

export function parseDeclarations(css) {
  const sections = [...css.matchAll(SECTION_HEADER)].map((m) => ({
    index: m.index,
    title: `${m[1]}. ${m[2].trim()}`,
  }));
  const sectionAt = (index) =>
    sections.filter((s) => s.index <= index).at(-1)?.title ?? 'Unsectioned';

  const seen = new Map();
  for (const m of blankComments(css).matchAll(DECLARATION)) {
    const name = m[1];
    if (seen.has(name)) continue;
    seen.set(name, { name, value: m[2].replace(/\s+/g, ' ').trim(), section: sectionAt(m.index) });
  }
  return [...seen.values()];
}

function resolve(value, byName) {
  return value.replace(/var\((--[\w-]+)\)/g, (ref, name) =>
    byName.has(name) ? resolve(byName.get(name).value, byName) : ref,
  );
}

export function colorTokens(css) {
  const declarations = parseDeclarations(css);
  const byName = new Map(declarations.map((d) => [d.name, d]));
  return declarations
    .map((d) => ({ ...d, resolved: resolve(d.value, byName) }))
    .filter((d) => COLOR_LITERAL.test(d.resolved));
}

export function typographyTokens(css) {
  const groups = new Map();
  for (const d of parseDeclarations(css)) {
    const match = d.name.match(/^--cr-(font|text|leading|tracking|weight)-/);
    if (!match) continue;
    if (!groups.has(match[1])) groups.set(match[1], []);
    groups.get(match[1]).push(d);
  }
  return groups;
}

export function iconSymbols(svg) {
  return [...svg.matchAll(/<symbol\s+id="([^"]+)"[^>]*>\s*<title>([^<]+)<\/title>/g)].map((m) => ({
    id: m[1],
    title: m[2],
  }));
}

export function definedClasses(css) {
  return new Set([...blankComments(css).matchAll(/\.(cr-[\w-]+)/g)].map((m) => m[1]));
}

export function classesInHtml(html) {
  return [...html.matchAll(/class="([^"]+)"/g)]
    .flatMap((m) => m[1].split(/\s+/))
    .filter((c) => c.startsWith('cr-'));
}

export function documentedComponents(markdown) {
  return markdown
    .split(/^#{2,3} /m)
    .slice(1)
    .map((part) => {
      const [heading, ...rest] = part.split(/^---$/m)[0].split('\n');
      const text = rest.join('\n');
      const summary = text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .find((p) => p && !/^(```|\||-|Modifiers?:|Elements:)/.test(p));
      const examples = [...text.matchAll(/```html\n([\s\S]*?)```/g)].map((m) => m[1].trim());
      return { heading: heading.trim(), summary: summary ?? '', examples };
    })
    .filter((section) => section.examples.length > 0);
}
