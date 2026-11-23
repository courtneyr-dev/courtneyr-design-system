import { createServer } from 'node:http';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const ROOT = fileURLToPath(new URL('../../storybook-static', import.meta.url));
const TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
};

export function serve(root = ROOT) {
  const server = createServer(async (req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    const file = join(root, path.endsWith('/') ? `${path}index.html` : path);
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': TYPES[extname(file)] ?? 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  return new Promise((resolve) =>
    server.listen(0, '127.0.0.1', () => resolve({ server, url: `http://127.0.0.1:${server.address().port}` })),
  );
}

export async function withStorybook(run) {
  if (!existsSync(join(ROOT, 'index.json'))) {
    throw new Error('storybook-static/index.json is missing. Run `npm run build-storybook` first.');
  }
  const { server, url } = await serve();
  const browser = await chromium.launch({ channel: 'chrome' });
  try {
    const context = await browser.newContext();
    const index = JSON.parse(await readFile(join(ROOT, 'index.json'), 'utf8'));
    const openStory = async (page, id, colorScheme = 'light') => {
      await page.emulateMedia({ colorScheme });
      await page.goto(`${url}/iframe.html?id=${id}&viewMode=story`);
      await page.waitForSelector('body.sb-show-main, body.sb-show-errordisplay');
      // addon-a11y runs its own axe pass in the afterEach phase, and a second axe run started
      // before it ends throws "Axe is already running".
      await page.waitForFunction((storyId) => {
        const render = window.__STORYBOOK_PREVIEW__?.currentRender;
        return render?.id === storyId && ['finished', 'errored', 'aborted'].includes(render.phase);
      }, id);
      if (await page.$('body.sb-show-errordisplay')) throw new Error(`Story ${id} threw while rendering.`);
      await page.evaluate(() => document.fonts.ready);
    };
    await run({ context, index, openStory });
  } finally {
    await browser.close();
    server.close();
  }
}
