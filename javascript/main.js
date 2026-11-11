/**
 * Innovation Days 2026 — Interacciones de la página.
 *
 * Sin dependencias. Se ejecuta con `defer`, por lo que el DOM ya está
 * parseado. Todos los listeners se registran aquí y nada se expone en `window`
 * salvo el motor de i18n (javascript/i18n.js), que lo necesita entre módulos.
 */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  var supportsObserver = 'IntersectionObserver' in window;

  function toArray(nodeList) {
    return Array.prototype.slice.call(nodeList);
  }

  /* ------------------------------------------------------------------ */
  /* Cabecera: estado condensado al hacer scroll                          */
  /* ------------------------------------------------------------------ */
  function initHeader() {
    var header = document.querySelector('[data-site-header]');
    if (!header) return;

    var ticking = false;

    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 12);
      ticking = false;
    }

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      },
      { passive: true }
    );

    update();
  }

  /* ------------------------------------------------------------------ */
  /* Drawer móvil                                                        */
  /* ------------------------------------------------------------------ */
  function initDrawer() {
    var toggle = document.querySelector('[data-menu-toggle]');
    var drawer = document.querySelector('[data-drawer]');
    if (!toggle || !drawer) return;

    var panel = drawer.querySelector('.drawer__panel');
    var lastFocused = null;

    function focusables() {
      if (!panel) return [];
      return toArray(
        panel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
      );
    }

    function open() {
      lastFocused = document.activeElement;
      drawer.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', window.I18n ? window.I18n.t('a11y.closeMenu') : '');
      document.body.classList.add('is-locked');
      var items = focusables();
      if (items.length) items[0].focus();
    }

    function close() {
      if (drawer.hidden) return;
      drawer.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', window.I18n ? window.I18n.t('a11y.openMenu') : '');
      document.body.classList.remove('is-locked');
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    function onKeydown(event) {
      if (drawer.hidden) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== 'Tab') return;

      var items = focusables();
      if (!items.length) return;

      var first = items[0];
      var last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    toggle.addEventListener('click', function () {
      if (drawer.hidden) {
        open();
      } else {
        close();
      }
    });

    drawer.addEventListener('click', function (event) {
      var closer = event.target.closest('[data-drawer-close], .drawer__link');
      if (closer) close();
    });

    document.addEventListener('keydown', onKeydown);

    // El motor i18n reescribe el aria-label del botón: se restituye el
    // que corresponde al estado real del menú.
    document.addEventListener('i18n:change', function () {
      if (!window.I18n) return;
      toggle.setAttribute(
        'aria-label',
        window.I18n.t(drawer.hidden ? 'a11y.openMenu' : 'a11y.closeMenu')
      );
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 900) close();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Hero: parallax sobre el fondo                                        */
  /* ------------------------------------------------------------------ */
  function initParallax() {
    var hero = document.querySelector('.hero');
    var media = document.querySelector('[data-hero-media]');
    if (!hero || !media || reduceMotion.matches) return;

    var ticking = false;

    function update() {
      var rect = hero.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        var offset = rect.top * 0.16;
        media.style.transform =
          'translate3d(0,' + offset.toFixed(2) + 'px,0) scale(1.08)';
      }
      ticking = false;
    }

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    window.addEventListener('resize', update);
    update();
  }

  /* ------------------------------------------------------------------ */
  /* Animaciones de entrada                                               */
  /* ------------------------------------------------------------------ */
  var revealObserver = null;

  /**
   * Marca como "pendiente" solo lo que está realmente fuera de pantalla.
   * Lo que ya está visible nunca se oculta, así que el contenido es legible
   * aunque el IntersectionObserver no llegue a dispararse.
   */
  function markPending(items) {
    var viewport = window.innerHeight;

    items.forEach(function (item) {
      if (item.classList.contains('is-in')) return;

      var rect = item.getBoundingClientRect();

      // Sin caja: está dentro de un panel oculto. Se resolverá al mostrarlo.
      if (!rect.height) return;

      if (rect.top > viewport * 0.92 || rect.bottom < 0) {
        item.setAttribute('data-reveal-pending', '');
      } else {
        item.removeAttribute('data-reveal-pending');
      }
    });
  }

  function refreshReveal(scope) {
    if (reduceMotion.matches || !supportsObserver) return;
    var items = toArray((scope || document).querySelectorAll('.reveal'));
    markPending(items);
  }

  function initReveal() {
    var groups = [
      '.section__head',
      '.about__copy',
      '.about__aside',
      '.overview__lead',
      '.prose--wide',
      '.stats__item',
      '.tabs__list',
      '.session',
      '.cta__inner'
    ];

    var targets = [];

    groups.forEach(function (selector) {
      var items = toArray(document.querySelectorAll(selector));
      items.forEach(function (item, index) {
        if (!item.classList.contains('reveal')) item.classList.add('reveal');
        item.style.setProperty('--reveal-delay', Math.min(index, 10) * 55 + 'ms');
        targets.push(item);
      });
    });

    if (!targets.length || reduceMotion.matches || !supportsObserver) return;

    revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.removeAttribute('data-reveal-pending');
          entry.target.classList.add('is-in');
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 }
    );

    targets.forEach(function (item) {
      revealObserver.observe(item);
    });

    markPending(targets);
  }

  /* ------------------------------------------------------------------ */
  /* Contadores animados                                                  */
  /* ------------------------------------------------------------------ */
  function initCounters() {
    var counters = toArray(document.querySelectorAll('[data-counter]'));
    if (!counters.length) return;

    function animate(element) {
      var target = parseInt(element.getAttribute('data-counter'), 10) || 0;

      if (reduceMotion.matches) {
        element.textContent = String(target);
        return;
      }

      // El HTML ya trae la cifra correcta: si el script falla, el dato es
      // correcto. La animación solo sustituye ese valor ya visible.
      var duration = 1100;
      var start = null;
      element.textContent = '0';

      function step(timestamp) {
        if (start === null) start = timestamp;
        var progress = Math.min((timestamp - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = String(Math.round(target * eased));
        if (progress < 1) window.requestAnimationFrame(step);
      }

      window.requestAnimationFrame(step);
    }

    if (!supportsObserver) {
      counters.forEach(animate);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          animate(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.4 }
    );

    counters.forEach(function (counter) {
      observer.observe(counter);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Programa: pestañas accesibles + progreso del timeline                */
  /* ------------------------------------------------------------------ */
  function initProgram() {
    var root = document.querySelector('[data-tabs]');
    if (!root) return;

    var tablist = root.querySelector('[role="tablist"]');
    var tabs = toArray(root.querySelectorAll('[role="tab"]'));
    var panels = toArray(root.querySelectorAll('[role="tabpanel"]'));
    var indicator = root.querySelector('[data-tab-indicator]');
    var timelines = toArray(document.querySelectorAll('[data-timeline]'));

    function moveIndicator() {
      if (!indicator) return;
      var active = root.querySelector('[role="tab"].is-active');
      if (!active) return;
      var width = active.offsetWidth;
      if (!width) return;
      indicator.style.width = width + 'px';
      indicator.style.transform = 'translateX(' + active.offsetLeft + 'px)';
    }

    function updateTimelineProgress() {
      timelines.forEach(function (timeline) {
        var panel = timeline.closest('[role="tabpanel"]');

        if (panel && panel.hidden) {
          timeline.style.setProperty('--progress', '0%');
          return;
        }

        var rect = timeline.getBoundingClientRect();
        var focusLine = window.innerHeight * 0.62;
        var seen = focusLine - rect.top;
        var ratio = Math.max(0, Math.min(1, seen / Math.max(rect.height, 1)));

        timeline.style.setProperty('--progress', (ratio * 100).toFixed(2) + '%');
      });
    }

    function hashDay() {
      var match = /^#programa-d([12])$/.exec(window.location.hash || '');
      return match ? parseInt(match[1], 10) : null;
    }

    function select(index, options) {
      var opts = options || {};
      if (index < 0 || index >= tabs.length) return;

      tabs.forEach(function (tab, i) {
        var active = i === index;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
        tab.tabIndex = active ? 0 : -1;
      });

      panels.forEach(function (panel, i) {
        panel.hidden = i !== index;
      });

      // El panel recién visible tiene que recalcular qué queda fuera de
      // pantalla: hasta ahora sus elementos no tenían caja y no se podían
      // ocultar de forma segura.
      if (panels[index]) refreshReveal(panels[index]);

      moveIndicator();
      updateTimelineProgress();

      if (opts.focus) tabs[index].focus();

      if (opts.updateHash && window.history && window.history.replaceState) {
        window.history.replaceState(
          null,
          '',
          '#programa-d' + (index + 1)
        );
      }
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        select(index, { updateHash: true });
      });
    });

    if (tablist) {
      tablist.addEventListener('keydown', function (event) {
        var current = tabs.indexOf(document.activeElement);
        if (current === -1) return;

        var next = null;

        switch (event.key) {
          case 'ArrowRight':
            next = (current + 1) % tabs.length;
            break;
          case 'ArrowLeft':
            next = (current - 1 + tabs.length) % tabs.length;
            break;
          case 'Home':
            next = 0;
            break;
          case 'End':
            next = tabs.length - 1;
            break;
          default:
            return;
        }

        event.preventDefault();
        select(next, { focus: true });
      });
    }

    window.addEventListener('hashchange', function () {
      var day = hashDay();
      if (day) select(day - 1);
    });

    var initial = hashDay();
    select(initial ? initial - 1 : 0);

    window.addEventListener('resize', function () {
      moveIndicator();
      updateTimelineProgress();
    });

    // El ancho de las pestañas depende de la fuente: se recalcula cuando la
    // webfont termina de cargar, que es cuando el texto cambia de anchura.
    window.addEventListener('load', function () {
      moveIndicator();
    });

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        moveIndicator();
      });
    }

    var ticking = false;
    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(function () {
            updateTimelineProgress();
            ticking = false;
          });
        }
      },
      { passive: true }
    );

    // El ancho del indicador depende del texto, que cambia con el idioma.
    document.addEventListener('i18n:change', function () {
      moveIndicator();
      updateTimelineProgress();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Scrollspy: resalta la sección activa en la navegación                 */
  /* ------------------------------------------------------------------ */
  function initScrollspy() {
    var links = toArray(document.querySelectorAll('.nav__link'));
    if (!links.length || !supportsObserver) return;

    var sections = links
      .map(function (link) {
        var href = link.getAttribute('href') || '';
        return href.charAt(0) === '#' ? document.querySelector(href) : null;
      })
      .filter(Boolean);

    if (!sections.length) return;

    var currentId = null;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) currentId = entry.target.id;
        });

        links.forEach(function (link) {
          var isCurrent = link.getAttribute('href') === '#' + currentId;
          link.classList.toggle('is-current', isCurrent);
          if (isCurrent) {
            link.setAttribute('aria-current', 'true');
          } else {
            link.removeAttribute('aria-current');
          }
        });
      },
      { rootMargin: '-48% 0px -48% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Volver arriba                                                        */
  /* ------------------------------------------------------------------ */
  function initToTop() {
    var button = document.querySelector('[data-to-top]');
    if (!button) return;

    var ticking = false;

    function update() {
      var shouldShow = window.scrollY > 600;

      if (shouldShow && button.hidden) {
        button.hidden = false;
        window.requestAnimationFrame(function () {
          button.classList.add('is-visible');
        });
      } else if (!shouldShow && !button.hidden) {
        button.classList.remove('is-visible');
        window.setTimeout(function () {
          if (!button.classList.contains('is-visible')) button.hidden = true;
        }, 320);
      }

      ticking = false;
    }

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      },
      { passive: true }
    );

    button.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: reduceMotion.matches ? 'auto' : 'smooth'
      });
    });

    update();
  }

  /* ------------------------------------------------------------------ */
  /* Arranque                                                             */
  /* ------------------------------------------------------------------ */
  function init() {
    // Activa las animaciones de entrada solo cuando hay JavaScript.
    document.documentElement.classList.add('js');

    if (window.I18n) {
      window.I18n.init();
    }

    initHeader();
    initDrawer();
    initParallax();
    initReveal();
    initCounters();
    initProgram();
    initScrollspy();
    initToTop();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
