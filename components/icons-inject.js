// icons-inject.js — fetches components/icons.svg and inlines it into the
// document, so <use href="…/icons.svg#post-icon-blog"> references resolve
// even where cross-document SVG references fail (some sandboxed previews,
// older Safari/Edge versions, file:// origins).
//
// After injection, every existing <use href="…icons.svg#id"> is rewritten
// to a same-document <use href="#id"> reference.
(function () {
  // Resolve the sprite URL relative to THIS script's src — that way every
  // page (root or in /ui_kits/courtneyr-dev/) loads the same file.
  var thisScript = document.currentScript;
  if (!thisScript) {
    var all = document.getElementsByTagName('script');
    thisScript = all[all.length - 1];
  }
  var spriteUrl = new URL('icons.svg', thisScript.src).href;

  // Cache-buster: forces fetch of the latest sprite when the symbol set changes.
  // Bump SPRITE_VERSION whenever you add/remove/redraw a symbol.
  var SPRITE_VERSION = 'v24';
  var spriteUrlVersioned = spriteUrl + (spriteUrl.indexOf('?') === -1 ? '?' : '&') + 'v=' + SPRITE_VERSION;

  function rewriteUses() {
    var uses = document.querySelectorAll('use[href*="icons.svg#"], use[*|href*="icons.svg#"]');
    uses.forEach(function (u) {
      var href = u.getAttribute('href') || u.getAttributeNS('http://www.w3.org/1999/xlink', 'href') || '';
      var hashIdx = href.indexOf('#');
      if (hashIdx === -1) return;
      var id = href.slice(hashIdx); // "#post-icon-blog"
      u.setAttribute('href', id);
      u.removeAttributeNS('http://www.w3.org/1999/xlink', 'href');
    });
  }

  function inject() {
    fetch(spriteUrlVersioned, { credentials: 'same-origin' })
      .then(function (r) { return r.ok ? r.text() : Promise.reject(new Error('icons.svg ' + r.status)); })
      .then(function (text) {
        // Parse as SVG, not HTML. innerHTML on a <div> uses the HTML parser,
        // which silently drops some <symbol>/<rect>/<circle> children — only
        // ~half of the 18 symbols survived. DOMParser with image/svg+xml
        // preserves all of them.
        var doc = new DOMParser().parseFromString(text, 'image/svg+xml');
        var rootSvg = doc.documentElement;
        if (!rootSvg || rootSvg.nodeName === 'parsererror') {
          throw new Error('icons.svg: parse error');
        }
        // Import the parsed <svg> into our document and hide it.
        var imported = document.importNode(rootSvg, true);
        imported.setAttribute('aria-hidden', 'true');
        imported.setAttribute('style', 'position:absolute;width:0;height:0;overflow:hidden');
        imported.setAttribute('data-icons-injected', '');
        document.body.insertBefore(imported, document.body.firstChild);
        rewriteUses();
      })
      .catch(function (err) {
        // Non-fatal: pages without icons (cover, tokens, typography, etc.) still work.
        if (window.console) console.warn('[icons-inject] could not load sprite:', err);
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
