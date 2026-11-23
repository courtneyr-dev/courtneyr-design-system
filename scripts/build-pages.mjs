import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { composed } from '../.storybook/composed.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');
const WORK = join(ROOT, '.pages-work');

function run(cmd, args, cwd) {
  console.log(`$ ${[cmd, ...args].join(' ')}    (in ${relative(ROOT, cwd) || '.'})`);
  execFileSync(cmd, args, { cwd, stdio: 'inherit' });
}

function checkout({ repo, sha }, into) {
  const head = existsSync(join(into, '.git'))
    ? execFileSync('git', ['rev-parse', 'HEAD'], { cwd: into, encoding: 'utf8' }).trim()
    : null;
  if (head === sha) return;
  rmSync(into, { recursive: true, force: true });
  mkdirSync(into, { recursive: true });
  run('git', ['init', '--quiet'], into);
  run('git', ['fetch', '--quiet', '--depth', '1', `https://github.com/${repo}.git`, sha], into);
  run('git', ['checkout', '--quiet', 'FETCH_HEAD'], into);
}

rmSync(DIST, { recursive: true, force: true });
run('npm', ['run', 'build-storybook'], ROOT);
cpSync(join(ROOT, 'storybook-static'), DIST, { recursive: true });

for (const { id, path, build } of composed.filter((entry) => entry.build)) {
  const checkoutDir = join(WORK, id);
  checkout(build, checkoutDir);
  const dir = join(checkoutDir, build.dir);
  run('npm', ['ci', '--ignore-scripts', '--no-audit', '--no-fund'], dir);
  run('npm', ['run', 'build-storybook', '--', '--output-dir', join(DIST, path)], dir);
}

console.log(`\ndist/ assembled: host at /, ${composed.filter((e) => e.build).map((e) => `${e.id} at ${e.path}`).join(', ')}`);
