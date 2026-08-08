/* ==========================================================================
   scripts/main.js — nav, copy buttons, FAQ enhancement, current-page highlight
   (AGENTS.md §13.5). Progressive enhancement only: all core content and
   navigation work without JS. No network requests at runtime.
   ========================================================================== */
(function () {
  'use strict';

  var doc = document;
  var root = doc.documentElement;
  root.classList.add('js'); // enables JS-only presentation (mobile menu, copy buttons)

  var reduceMotion = window.reduceMotion || function () { return false; };
  var animate = window.animate;
  var spring = { damping: 1.0, response: 0.35 }; // menu + FAQ spring (§11.6.2)

  /* ---------- Header scroll-edge mask (soft gradient, §11.4.2) ---------- */
  var header = doc.querySelector('.site-header');
  if (header) {
    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Current-page highlight (aria-current is also in the markup) */
  var currentPage = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  doc.querySelectorAll('.nav-links a').forEach(function (link) {
    var href = (link.getAttribute('href') || '').toLowerCase();
    if (href === currentPage) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ---------- Instant press feedback on pointer-down (§11.6.1) ---------- */
  doc.addEventListener('pointerdown', function (e) {
    var target = e.target.closest('a, button, summary, [role="button"]');
    if (!target) return;
    target.classList.add('is-pressed');
    function release() {
      target.classList.remove('is-pressed');
    }
    target.addEventListener('pointerup', release, { once: true });
    target.addEventListener('pointercancel', release, { once: true });
  }, true);

  /* ---------- Card press & hover elevation (spring, damping 1.0, §11.6.2) */
  if (animate) {
    doc.querySelectorAll('.card--lift').forEach(function (card) {
      if (reduceMotion()) return;
      card.addEventListener('pointerenter', function () {
        animate(card, { transform: { y: -2 } }, { damping: 1.0, response: 0.4, rest: true });
      });
      card.addEventListener('pointerleave', function () {
        animate(card, { transform: { y: 0 } }, { damping: 1.0, response: 0.4, rest: true });
      });
    });

    // Interactive cards: keep press feedback even while the hover lift is set
    doc.addEventListener('pointerdown', function (e) {
      var card = e.target.closest('.card-link');
      if (!card || reduceMotion()) return;
      animate(card, { transform: { scale: 0.97 } }, { damping: 1.0, response: 0.25 });
      var release = function () {
        animate(card, { transform: { scale: 1 } }, { damping: 1.0, response: 0.3, rest: true });
      };
      card.addEventListener('pointerup', release, { once: true });
      card.addEventListener('pointercancel', release, { once: true });
    });
  }

  /* ---------- Mobile navigation (§12.1) ---------- */
  var toggle = doc.querySelector('.nav-toggle');
  var navLinks = doc.querySelector('.nav-links');
  if (toggle && navLinks && animate) {
    var isOpen = false;

    function setPanel(visible) {
      navLinks.style.visibility = visible ? 'visible' : 'hidden';
      navLinks.style.pointerEvents = visible ? 'auto' : 'none';
    }

    function openMenu() {
      if (isOpen) return;
      isOpen = true;
      toggle.setAttribute('aria-expanded', 'true');
      header && header.classList.add('nav-open');
      doc.body.classList.add('nav-open');
      setPanel(true);
      if (reduceMotion()) {
        navLinks.style.opacity = '1';
        navLinks.style.transform = 'none';
      } else {
        animate(navLinks, { transform: { y: 0 }, opacity: 1 }, spring);
      }
    }

    function closeMenu() {
      if (!isOpen) return;
      isOpen = false;
      toggle.setAttribute('aria-expanded', 'false');
      doc.body.classList.remove('nav-open');
      if (reduceMotion()) {
        navLinks.style.opacity = '0';
        setPanel(false);
        header && header.classList.remove('nav-open');
      } else {
        animate(navLinks, { transform: { y: -8 }, opacity: 0 }, {
          damping: spring.damping,
          response: spring.response,
          onComplete: function () {
            if (!isOpen) {
              setPanel(false);
              header && header.classList.remove('nav-open');
            }
          }
        });
      }
      if (navLinks.contains(doc.activeElement)) {
        toggle.focus(); // predictable return path
      }
    }

    toggle.addEventListener('click', function () {
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeMenu(); // close on selection
    });

    doc.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });

    doc.addEventListener('click', function (e) {
      if (isOpen && !e.target.closest('.site-header')) closeMenu(); // tap outside
    });

    window.addEventListener('resize', function () {
      if (isOpen && window.innerWidth >= 1024) {
        isOpen = false;
        toggle.setAttribute('aria-expanded', 'false');
        header && header.classList.remove('nav-open');
        doc.body.classList.remove('nav-open');
        navLinks.style.opacity = '';
        navLinks.style.transform = '';
        navLinks.style.visibility = '';
        navLinks.style.pointerEvents = '';
      }
    }, { passive: true });
  }

  /* ---------- Copy-to-clipboard on every code block (§12.7) ---------- */
  var COPY_ICON =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">' +
    '<rect x="5.5" y="5.5" width="8" height="8" rx="1.5"></rect>' +
    '<path d="M10.5 5.5V4a1.5 1.5 0 0 0-1.5-1.5H4A1.5 1.5 0 0 0 2.5 4v5A1.5 1.5 0 0 0 4 10.5h1.5"></path>' +
    '</svg>';

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = doc.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      doc.body.appendChild(ta);
      ta.select();
      var ok = false;
      try {
        ok = doc.execCommand('copy');
      } catch (err) {
        reject(err);
        doc.body.removeChild(ta);
        return;
      }
      doc.body.removeChild(ta);
      ok ? resolve() : reject(new Error('copy failed'));
    });
  }

  function makeCopyButton(pre, status) {
    var btn = doc.createElement('button');
    btn.type = 'button';
    btn.className = 'copy-btn';
    btn.innerHTML = COPY_ICON + '<span class="copy-label">Copy</span>';
    btn.addEventListener('click', function () {
      copyText(pre.innerText).then(function () {
        btn.classList.add('is-copied');
        btn.querySelector('.copy-label').textContent = 'Copied';
        if (status) status.textContent = 'Copied to clipboard';
        clearTimeout(btn._reset);
        btn._reset = setTimeout(function () {
          btn.classList.remove('is-copied');
          btn.querySelector('.copy-label').textContent = 'Copy';
          if (status) status.textContent = '';
        }, 2000);
      }).catch(function () {
        if (status) status.textContent = 'Copy failed — select the text manually.';
      });
    });
    return btn;
  }

  doc.querySelectorAll('pre.code').forEach(function (pre) {
    if (pre.dataset.copyReady) return;
    pre.dataset.copyReady = '1';
    var label = pre.getAttribute('data-label') || 'terminal';
    var status = doc.createElement('span');
    status.className = 'sr-only';
    status.setAttribute('role', 'status');
    var copyBtn = makeCopyButton(pre, status);

    var terminal = pre.closest('.terminal');
    if (terminal) {
      // Terminal mockup: copy button lives in the window chrome bar
      var bar = terminal.querySelector('.terminal-bar');
      if (bar) {
        var actions = bar.querySelector('.terminal-actions');
        if (actions) {
          actions.appendChild(copyBtn);
        } else {
          bar.appendChild(copyBtn);
        }
        terminal.appendChild(status);
      }
      return;
    }

    // Standalone code block: wrap in .code-block with a header
    var wrap = doc.createElement('div');
    wrap.className = 'code-block';
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);

    var headerEl = doc.createElement('div');
    headerEl.className = 'code-header';
    var labelEl = doc.createElement('span');
    labelEl.className = 'code-label';
    labelEl.textContent = label;
    headerEl.appendChild(labelEl);
    headerEl.appendChild(copyBtn);
    wrap.insertBefore(headerEl, pre);
    wrap.appendChild(status);
  });

  /* ---------- Table overflow edge fade (§11.8, §12.9) ---------- */
  function checkOverflow(wrap) {
    wrap.classList.toggle('has-overflow', wrap.scrollWidth > wrap.clientWidth + 1);
  }
  doc.querySelectorAll('.table-wrap').forEach(function (wrap) {
    checkOverflow(wrap);
    window.addEventListener('resize', function () { checkOverflow(wrap); }, { passive: true });
  });

  /* ---------- FAQ disclosure enhancement (§12.10) ---------- */
  function initFaq() {
    if (reduceMotion()) return; // native <details> toggling is the calm equivalent
    if (!animate) return;

    doc.querySelectorAll('details.faq-item').forEach(function (details) {
      var summary = details.querySelector('summary');
      var inner = details.querySelector('.faq-inner');
      if (!summary || !inner) return;
      var state = details.open ? 'open' : 'closed';

      function animateIn() {
        inner.style.opacity = '0';
        inner.style.transform = 'translate3d(0, -4px, 0)';
        animate(inner, { transform: { y: 0 }, opacity: 1 }, {
          damping: spring.damping,
          response: spring.response,
          onComplete: function () {
            if (state === 'opening') state = 'open';
          }
        });
      }

      function animateOut() {
        details.classList.add('is-closing');
        animate(inner, { transform: { y: -4 }, opacity: 0 }, {
          damping: spring.damping,
          response: spring.response,
          onComplete: function () {
            if (state === 'closing') {
              details.open = false;
              details.classList.remove('is-closing');
              inner.style.opacity = '';
              inner.style.transform = '';
              state = 'closed';
            }
          }
        });
      }

      summary.addEventListener('click', function (e) {
        if (state === 'opening') {
          e.preventDefault(); // reverse an in-flight open into a smooth close
          state = 'closing';
          animateOut();
        } else if (state === 'closing') {
          e.preventDefault(); // reverse mid-close; never jump to the target
          state = 'opening';
          details.classList.remove('is-closing');
          animateIn();
        } else if (details.open) {
          e.preventDefault(); // keep the panel measurable while it animates shut
          state = 'closing';
          animateOut();
        } else {
          state = 'opening'; // let native open start the grid-rows transition
          requestAnimationFrame(function () {
            if (state === 'opening') animateIn();
          });
        }
      });
    });
  }
  initFaq();
})();
