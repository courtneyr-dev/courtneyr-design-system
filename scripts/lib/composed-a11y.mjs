import assert from 'node:assert/strict';

const foundation = 'foundations-brand--wordmark';
const rating = 'blocks-star-rating--numeric';
const ratingId = `post-kinds_${rating}`;
const searchId = 'storybook-explorer-searchfield';

export async function checkManagerNavigation(context, url, colorScheme) {
  const home = new URL(`?path=/story/${foundation}`, url).href;
  const page = await context.newPage();
  let journey;
  try {
    await page.emulateMedia({ colorScheme });
    await page.goto(home);
    const refButton = page.getByRole('button', { name: 'Post Kinds for IndieWeb', exact: true });
    await refButton.waitFor();
    await page.waitForFunction(() =>
      document.querySelector('[data-ref-id="post-kinds"][data-nodetype="root"]'),
    );
    assert.equal(await refButton.getAttribute('aria-expanded'), 'true');
    await refButton.press('Enter');
    assert.equal(await refButton.getAttribute('aria-expanded'), 'false');
    await refButton.press('Enter');
    assert.equal(await refButton.getAttribute('aria-expanded'), 'true');

    const recovery = page.getByRole('navigation', { name: 'Storybook catalogs' });
    await recovery.waitFor({ state: 'hidden' });
    await page.keyboard.press(process.platform === 'darwin' ? 'Meta+k' : 'Control+k');
    const search = page.locator(`#${searchId}`);
    await search.fill('Numeric Star Rating');
    await page.getByRole('option').filter({ hasText: 'Numeric' }).first().waitFor();
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForURL(`**${ratingId}`);
    const canvas = page.frameLocator('#storybook-ref-post-kinds');
    await canvas.getByRole('slider').first().waitFor();
    await page.waitForFunction((id) => document.activeElement?.id === id, ratingId, { timeout: 5000 });
    const selected = await page.locator(':focus').textContent();
    await page.keyboard.press('Tab');
    const skip = page.locator(':focus');
    assert.equal(await skip.textContent(), 'Skip to content');
    assert.equal(await skip.getAttribute('href'), '#storybook-preview-wrapper');
    await page.keyboard.press('Enter');
    const canvasFocus = await page.evaluate(() => document.activeElement?.id);
    assert.equal(canvasFocus, 'storybook-preview-wrapper');
    await page.keyboard.press('Tab');
    const returnLink = page.locator(':focus');
    assert.equal(await returnLink.textContent(), 'Skip to sidebar');
    assert.equal(await returnLink.getAttribute('href'), `#${ratingId}`);
    await page.keyboard.press('Enter');
    assert.equal(await page.evaluate(() => document.activeElement?.id), ratingId);
    const addons = page.getByRole('tablist').filter({ has: page.getByRole('tab', { name: 'Actions' }) });
    await addons.getByRole('tab', { name: /^Controls/ }).focus();
    await page.keyboard.press('ArrowRight');
    assert.equal(await addons.getByRole('tab', { name: 'Actions', exact: true }).evaluate(
      (tab) => tab === document.activeElement,
    ), true);

    await page.goBack();
    await page.waitForURL(home);
    await page.frameLocator('#storybook-preview-iframe').getByRole('heading', { name: 'Wordmark' }).waitFor();
    journey = { selected: selected.trim(), ref: 'post-kinds', story: rating, canvasFocus, addons: 'Actions', back: page.url() };

    await page.goto(new URL(`?path=/story/${ratingId}`, url).href);
    await canvas.getByRole('slider').first().waitFor();
  } finally {
    await page.close();
  }

  const outages = [];
  const catalogPaths = [
    '/courtneyr-design-system/site/',
    '/post-formats-for-block-themes/storybook/',
    '/post-kinds-for-indieweb/storybook/',
    '/outpost/storybook/',
  ];
  for (const [path, title] of [
    ['/post-kinds-for-indieweb/storybook/', 'Post Kinds for IndieWeb'],
    ['/outpost/storybook/', 'Outpost'],
  ]) {
    const outage = await context.newPage();
    try {
      await outage.emulateMedia({ colorScheme });
      const blocked = [];
      const indexPath = `${path}index.json`;
      await outage.route(({ pathname }) => pathname === indexPath || pathname === `${path}stories.json`, (route) => {
        blocked.push(route.request().url());
        return route.abort('failed');
      });
      await outage.goto(home);
      const recovery = outage.getByRole('navigation', { name: 'Storybook catalogs' });
      const status = recovery.getByRole('status');
      await status.filter({ hasText: `Story index unavailable for ${title}` }).waitFor();
      assert.ok(blocked.some((entry) => new URL(entry).pathname === indexPath));
      const direct = await recovery.getByRole('link').evaluateAll((links) => links.map(({ href }) => href));
      assert.deepEqual(direct.map((href) => new URL(href).pathname), catalogPaths);
      const other = 'editor-status-character-counter--near-limit';
      const otherBranch = outage.getByRole('button', { name: 'Status character counter', exact: true });
      await otherBranch.click();
      const frame = await (await outage.waitForSelector('#storybook-ref-post-formats')).contentFrame();
      await frame.locator('.pfpu-char-counter', { hasText: '160 characters remaining' }).waitFor();
      const storyLink = outage.locator(`a[id="post-formats_${other}"]`);
      await storyLink.click();
      await frame.locator('.pfpu-char-counter', { hasText: '15 characters remaining' }).waitFor();
      outages.push({ blocked, message: await status.textContent(), direct, otherStory: other });
    } finally {
      await outage.close();
    }
  }
  return { journey, outages };
}
