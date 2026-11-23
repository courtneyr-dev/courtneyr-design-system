import { readFileSync } from 'node:fs';

export const composed = JSON.parse(readFileSync(new URL('./composed.json', import.meta.url), 'utf8'));

for (const entry of composed) {
  const built = 'build' in entry;
  const valid =
    /^[a-z0-9-]+$/.test(entry.id ?? '') &&
    Boolean(entry.title) &&
    (built
      ? /^\/[a-z0-9-]+\/$/.test(entry.path ?? '') && /^[0-9a-f]{40}$/.test(entry.build.sha ?? '') &&
        /^[\w.-]+\/[\w.-]+$/.test(entry.build.repo ?? '') &&
        /^(\.|[\w-]+(\/[\w-]+)*)$/.test(entry.build.dir ?? '') && !('url' in entry)
      : /^https:\/\//.test(entry.url ?? '') && !('path' in entry));
  if (!valid) {
    throw new Error(
      `.storybook/composed.json: "${entry.id}" needs a lowercase id, a title, and either build (owner/repo, full sha, dir) plus a /path/, or an https url`,
    );
  }
}

export function refs(overrides = JSON.parse(process.env.STORYBOOK_REF_URLS || '{}')) {
  return Object.fromEntries(
    composed
      .filter((entry) => !entry.planned || entry.id in overrides)
      .map(({ id, title, path, url }) => [id, { title, url: (overrides[id] ?? url ?? path).replace(/\/$/, '') }]),
  );
}
