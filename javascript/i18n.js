/**
 * Innovation Days 2026 — Motor de internacionalización.
 *
 * Contrato de marcado (aplicado sobre cualquier elemento):
 *   data-i18n="clave"                 -> textContent
 *   data-i18n-html="clave"            -> innerHTML (copy con marcado en línea)
 *   data-i18n-attrs="attr:clave;…"    -> atributos (aria-label, title, …)
 *
 * Resolución del idioma, por orden de prioridad:
 *   1. ?lang=xx en la URL  (enlace compartible)
 *   2. localStorage        (preferenciarecordada)
 *   3. navigator.languages (idioma del navegador)
 *   4. 'ca'                (por defecto)
 *
 * Si falta una clave en el idioma activo se recurre al diccionario 'ca' y se
 * avisa por consola. Nunca se muestra la clave en crudo al usuario.
 */
(function (global) {
  'use strict';

  var DICT = global.InnovationDaysI18n || {};
  var SUPPORTED = ['ca', 'es'];
  var DEFAULT_LANG = 'ca';
  var STORAGE_KEY = 'innovation-days-lang';
  var current = DEFAULT_LANG;

  function lookup(lang, key) {
    if (!key) return null;
    if (DICT[lang] && DICT[lang][key] != null) return DICT[lang][key];
    if (DICT[DEFAULT_LANG] && DICT[DEFAULT_LANG][key] != null) {
      return DICT[DEFAULT_LANG][key];
    }
    return null;
  }

  function t(key) {
    var value = lookup(current, key);
    return value == null ? key : value;
  }

  function detect() {
    var match = /[?&]lang=([a-zA-Z]{2})/.exec(global.location.search || '');
    if (match) {
      var fromUrl = match[1].toLowerCase();
      if (SUPPORTED.indexOf(fromUrl) !== -1) return fromUrl;
    }

    try {
      var stored = global.localStorage.getItem(STORAGE_KEY);
      if (stored && SUPPORTED.indexOf(stored) !== -1) return stored;
    } catch (error) {
      /* modo privado o storage bloqueado: se ignora */
    }

    var candidates = (global.navigator && global.navigator.languages) || [];
    if (!candidates.length && global.navigator) candidates = [global.navigator.language];
    for (var i = 0; i < candidates.length; i++) {
      var tag = String(candidates[i] || '').toLowerCase();
      if (SUPPORTED.indexOf(tag) !== -1) return tag;
      if (tag.indexOf('es') === 0) return 'es';
      if (tag.indexOf('ca') === 0) return 'ca';
    }

    return DEFAULT_LANG;
  }

  function applyTranslations(root) {
    var scope = root || document;

    var textNodes = scope.querySelectorAll('[data-i18n]');
    for (var i = 0; i < textNodes.length; i++) {
      var el = textNodes[i];
      var value = lookup(current, el.getAttribute('data-i18n'));
      if (value == null) continue;
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    }

    var htmlNodes = scope.querySelectorAll('[data-i18n-html]');
    for (var h = 0; h < htmlNodes.length; h++) {
      var htmlEl = htmlNodes[h];
      if (htmlEl.hasAttribute('data-i18n')) continue;
      var htmlValue = lookup(current, htmlEl.getAttribute('data-i18n-html'));
      if (htmlValue != null) htmlEl.innerHTML = htmlValue;
    }

    var attrNodes = scope.querySelectorAll('[data-i18n-attrs]');
    for (var a = 0; a < attrNodes.length; a++) {
      var attrEl = attrNodes[a];
      var pairs = attrEl.getAttribute('data-i18n-attrs').split(';');
      for (var p = 0; p < pairs.length; p++) {
        var parts = pairs[p].split(':');
        if (parts.length !== 2) continue;
        var name = parts[0].trim();
        var key = parts[1].trim();
        var attrValue = lookup(current, key);
        if (attrValue != null) attrEl.setAttribute(name, attrValue);
      }
    }
  }

  function applyMeta() {
    var title = lookup(current, 'meta.title');
    if (title) document.title = title;

    var description = lookup(current, 'meta.description');
    var metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && description) metaDescription.setAttribute('content', description);

    var metaLocale = document.querySelector('meta[name="content-language"]');
    if (metaLocale) metaLocale.setAttribute('content', current === 'ca' ? 'ca_ES' : 'es_ES');

    document.documentElement.setAttribute('lang', current);
  }

  function updateSwitcher() {
    var links = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var isActive = link.getAttribute('data-lang') === current;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  }

  function updateUrl(lang) {
    if (!global.history || !global.history.replaceState) return;
    var url;
    try {
      url = new URL(global.location.href);
    } catch (error) {
      return;
    }
    url.searchParams.set('lang', lang);
    global.history.replaceState({}, '', url.toString());
  }

  function setLang(lang, options) {
    var opts = options || {};
    if (SUPPORTED.indexOf(lang) === -1) lang = DEFAULT_LANG;
    current = lang;

    applyTranslations(document);
    applyMeta();
    updateSwitcher();

    try {
      global.localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      /* sin persistencia: la preferencia vive solo en la URL */
    }

    if (opts.updateUrl !== false) updateUrl(lang);

    document.dispatchEvent(
      new CustomEvent('i18n:change', { detail: { lang: lang } })
    );
  }

  function reportMissingKeys() {
    var problems = [];
    var base = DICT[DEFAULT_LANG] || {};
    var baseKeys = Object.keys(base);

    for (var i = 0; i < SUPPORTED.length; i++) {
      var lang = SUPPORTED[i];
      if (!DICT[lang]) {
        problems.push('Falta el diccionario completo: ' + lang);
        continue;
      }
      var langKeys = Object.keys(DICT[lang]);
      for (var k = 0; k < baseKeys.length; k++) {
        if (langKeys.indexOf(baseKeys[k]) === -1) {
          problems.push('[' + lang + '] falta la clave ' + baseKeys[k]);
        }
      }
      for (var m = 0; m < langKeys.length; m++) {
        if (baseKeys.indexOf(langKeys[m]) === -1) {
          problems.push('[' + lang + '] clave sobrante ' + langKeys[m]);
        }
      }
    }

    if (problems.length && global.console && global.console.warn) {
      global.console.warn('[i18n] Desajuste de claves:\n' + problems.join('\n'));
    }
    return problems;
  }

  function init() {
    var lang = detect();
    setLang(lang, { updateUrl: false });
    reportMissingKeys();

    var links = document.querySelectorAll('[data-lang]');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (event) {
        var target = this.getAttribute('data-lang');
        if (target === current) {
          event.preventDefault();
          return;
        }
        event.preventDefault();
        setLang(target);
      });
    }
  }

  global.I18n = {
    init: init,
    setLang: setLang,
    t: t,
    reportMissingKeys: reportMissingKeys,
    get lang() {
      return current;
    }
  };
})(window);
