import { addons } from 'storybook/manager-api';

const explorerId = 'storybook-explorer-tree';
const searchId = 'storybook-explorer-searchfield';
const previewId = 'storybook-preview-wrapper';
const selectedStory = '.sidebar-item[data-selected="true"] > a[rel="canonical"]';

// Storybook 10.6.6 owns this markup. Recheck these selectors at the next upgrade.
function repairSidebar(tree, originalControls) {
  for (const button of tree.querySelectorAll('button[data-action="collapse-root"][aria-label]')) {
    button.removeAttribute('aria-label');
  }

  for (const button of tree.querySelectorAll('button[data-action="collapse-ref"]')) {
    const wrapper = button.parentElement;
    const expanded = wrapper.getAttribute('aria-expanded');
    if (expanded !== null) {
      button.setAttribute('aria-expanded', expanded);
      wrapper.removeAttribute('aria-expanded');
      wrapper.removeAttribute('aria-label');
    }
  }

  for (const button of tree.querySelectorAll('.sidebar-item[data-ref-id] > button[id][aria-expanded]')) {
    const current = button.getAttribute('aria-controls');
    const previous = originalControls.get(button);
    const authored = previous?.applied === current ? previous.authored : current;
    if (!authored) continue;
    const refId = button.parentElement.dataset.refId;
    const controls = authored.split(/\s+/).map((id) => {
      const qualified = refId === 'storybook_internal' || id.startsWith(`${refId}_`) ? id : `${refId}_${id}`;
      return tree.contains(document.getElementById(qualified)) ? qualified : null;
    }).filter(Boolean).join(' ') || null;
    originalControls.set(button, { authored, applied: controls });
    if (controls === current) continue;
    if (controls) button.setAttribute('aria-controls', controls);
    else button.removeAttribute('aria-controls');
  }
}

function createRecoveryLinks() {
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Storybook catalogs');
  nav.style.padding = '12px 20px';
  nav.hidden = true;
  const status = document.createElement('p');
  status.setAttribute('role', 'status');
  const links = document.createElement('ul');
  nav.append(status, links);
  let lastState;

  return (tree, refs) => {
    if (nav.nextElementSibling !== tree) tree.before(nav);
    const unavailable = refs.filter(({ indexError, index, type, loginUrl }) =>
      !Object.keys(index ?? {}).length && (indexError || (type === 'auto-inject' && !loginUrl)),
    );
    const state = JSON.stringify([unavailable.map(({ id }) => id), refs.map(({ id, url }) => [id, url])]);
    if (state === lastState) return;
    lastState = state;
    nav.hidden = unavailable.length === 0;
    status.textContent = unavailable.length
      ? `Story index unavailable for ${unavailable.map(({ title, id }) => title ?? id).join(', ')}. Open a catalog directly:`
      : '';
    links.replaceChildren(...(unavailable.length ? refs.map(({ title, id, url }) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `${url.replace(/\/$/, '')}/`;
      link.textContent = title ?? id;
      link.style.color = 'inherit';
      link.style.textDecoration = 'underline';
      item.append(link);
      return item;
    }) : []));
  };
}

addons.register('courtneyr/composed-navigation', (api) => {
  const originalControls = new WeakMap();
  const showRecoveryLinks = createRecoveryLinks();
  let selection;

  document.addEventListener('keydown', (event) => {
    if (event.target?.id !== searchId || event.key !== 'Enter' || event.isComposing) return;
    const option = document.getElementById(event.target.getAttribute('aria-activedescendant'));
    selection = option?.dataset.id && {
      id: option.dataset.id,
      refId: option.dataset.refid ?? 'storybook_internal',
    };
  }, true);
  document.addEventListener('focusin', (event) => {
    if (event.target?.id !== searchId) selection = undefined;
  });
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[href^="#"]');
    const preview = document.getElementById(previewId);
    if (!link || !preview) return;
    const target = link.hash === `#${previewId}` ? preview
      : link.parentElement === preview ? document.getElementById(link.hash.slice(1)) : null;
    if (!target) return;
    event.preventDefault();
    target.focus();
  });

  const update = () => {
    const tree = document.getElementById(explorerId);
    if (!tree) return;
    repairSidebar(tree, originalControls);
    showRecoveryLinks(tree, Object.values(api.getRefs()));

    const preview = document.getElementById(previewId);
    if (preview && !preview.hasAttribute('tabindex')) {
      preview.tabIndex = -1;
      preview.setAttribute('role', 'group');
      preview.setAttribute('aria-label', 'Story canvas');
    }
    const selected = tree.querySelector(selectedStory);
    const returnLink = preview?.querySelector(':scope > a[href^="#"]');
    if (returnLink && selected && returnLink.hash !== `#${selected.id}`) returnLink.setAttribute('href', `#${selected.id}`);

    if (!selection || document.activeElement !== document.body) return;
    const item = [...tree.querySelectorAll('.sidebar-item[data-selected="true"]')].find(({ dataset }) =>
      dataset.refId === selection.refId && [dataset.itemId, dataset.parentId].includes(selection.id),
    );
    const link = item?.querySelector('a[rel="canonical"]');
    if (link) {
      selection = undefined;
      link.focus();
    }
  };

  new MutationObserver(update).observe(document.getElementById('root'), {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['aria-label', 'aria-expanded', 'aria-controls', 'data-selected'],
  });
  update();
});
