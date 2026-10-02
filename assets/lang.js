/* Augenblick — Sprachwahl DE | EN (ohne Bibliothek, ohne Fremdressourcen).
 *
 * Reihenfolge: gespeicherte Wahl > Browsersprache (de* = Deutsch, sonst Englisch).
 * Gespeichert wird nur in localStorage — bewusst kein Cookie, weil die Seiten
 * laut Datenschutzerklärung keine Cookies setzen.
 *
 * Markup:
 *   data-lang="de|en"          Element nur in dieser Sprache sichtbar (CSS, assets/lang.css)
 *   data-en="…"                Text (oder bei <meta> der content) in Englisch; Deutsch = Originaltext
 *   data-en-placeholder="…"    Platzhalter in Englisch
 *   data-en-aria-label="…"     aria-label in Englisch
 *   data-set-lang="de|en"      Button, der die Sprache umschaltet
 */
(function () {
  'use strict';

  var KEY = 'augenblick-lang';
  var root = document.documentElement;

  function stored() {
    try {
      var v = window.localStorage.getItem(KEY);
      return v === 'de' || v === 'en' ? v : null;
    } catch (e) { return null; }
  }

  function save(lang) {
    try { window.localStorage.setItem(KEY, lang); } catch (e) { /* privater Modus o. Ä.: Wahl gilt nur für diese Seite */ }
  }

  function detect() {
    var n = String(navigator.language || '').toLowerCase();
    return n === 'de' || n.indexOf('de-') === 0 ? 'de' : 'en';
  }

  var lang = stored() || detect();
  root.lang = lang; // sofort, damit kein deutscher Text aufblitzt

  function setValue(el, attr, value) {
    if (attr) el.setAttribute(attr, value); else el.textContent = value;
  }

  // Wechselt Text (target leer) oder ein Attribut (target) zwischen Original (= Deutsch) und data-en*.
  function swap(selector, enAttr, target) {
    var nodes = document.querySelectorAll(selector);
    var deAttr = 'data-de-' + (target || 'text');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (!el.hasAttribute(deAttr)) {
        el.setAttribute(deAttr, target ? el.getAttribute(target) : el.textContent);
      }
      setValue(el, target, lang === 'en' ? el.getAttribute(enAttr) : el.getAttribute(deAttr));
    }
  }

  function render() {
    root.lang = lang;
    var metas = document.querySelectorAll('meta[data-en]');
    for (var m = 0; m < metas.length; m++) {
      if (!metas[m].hasAttribute('data-de-content')) metas[m].setAttribute('data-de-content', metas[m].getAttribute('content'));
      metas[m].setAttribute('content', lang === 'en' ? metas[m].getAttribute('data-en') : metas[m].getAttribute('data-de-content'));
    }
    swap('title[data-en], option[data-en]', 'data-en');
    swap('[data-en-placeholder]', 'data-en-placeholder', 'placeholder');
    swap('[data-en-aria-label]', 'data-en-aria-label', 'aria-label');
    var btns = document.querySelectorAll('[data-set-lang]');
    for (var b = 0; b < btns.length; b++) {
      btns[b].setAttribute('aria-pressed', btns[b].getAttribute('data-set-lang') === lang ? 'true' : 'false');
    }
  }

  function set(next, persist) {
    if (next !== 'de' && next !== 'en') return;
    lang = next;
    if (persist) save(next);
    render();
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btns = document.querySelectorAll('[data-set-lang]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function (ev) {
        set(ev.currentTarget.getAttribute('data-set-lang'), true);
      });
    }
    render();
  });

  // Wahl in einem anderen Tab übernehmen
  window.addEventListener('storage', function (ev) {
    if (ev.key === KEY && (ev.newValue === 'de' || ev.newValue === 'en')) set(ev.newValue, false);
  });
})();
