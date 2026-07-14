/* ═══════════════════════════════════════════════
   THE DESCENT — maps overall landing-page scroll progress to a CSS
   custom property, --depth, on #screen-landing:
     0   at the top of the page (the surface)
     1   by the start of the final CTA (the deepest point)
     ~.2 by the end of the CTA (the page "resurfaces")
   CSS reads --depth to crossfade the two fixed aurora backdrop layers
   (see #screen-landing::before / .lp-depth-deep in css/style.css).
   Also drives the fixed depth rail's active-waypoint highlight and
   progress fill via IntersectionObserver — that part stays fully
   functional under prefers-reduced-motion since it's navigation, not
   decoration. rAF-throttled, passive + capture-phase scroll listener,
   same pattern as js/showcase.js. Vanilla JS, zero deps.
   ═══════════════════════════════════════════════ */
(function () {
  function init() {
    const root = document.getElementById('screen-landing');
    const cta = document.querySelector('.lp-cta');
    if (!root || !cta) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

    if (reduce) {
      // Static mid-depth: no scroll-driven backdrop change.
      root.style.setProperty('--depth', '0.35');
    } else {
      let ticking = false;

      function computeDepth() {
        const doc = document.documentElement;
        const vh = window.innerHeight || doc.clientHeight;
        const y = window.scrollY || window.pageYOffset;
        const ctaTop = cta.offsetTop;

        // Descent: viewport midpoint travels from the top of the page to
        // the start of the CTA → 0 to 1.
        const descend = clamp((y + vh * 0.5) / Math.max(ctaTop, 1), 0, 1);

        // Resurface: as the CTA rises into view (viewport bottom passes its
        // top) the light comes back — fully resurfaced to ~0.2 exactly when
        // the page bottoms out. Subtractive so the two ramps blend smoothly.
        const tail = Math.max(doc.scrollHeight - ctaTop, 1);
        const resurface = clamp((y + vh - ctaTop) / tail, 0, 1);

        const depth = clamp(descend - resurface * 0.8, 0, 1);
        root.style.setProperty('--depth', depth.toFixed(4));
      }

      function onScroll() {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          computeDepth();
        });
      }

      window.addEventListener('scroll', onScroll, { passive: true, capture: true });
      window.addEventListener('resize', onScroll, { passive: true });
      computeDepth();
    }

    initRail();
  }

  // Depth rail: active-waypoint highlighting + progress fill. Independent
  // of prefers-reduced-motion — this is navigation, not decoration.
  function initRail() {
    const rail = document.querySelector('.lp-depth-rail');
    if (!rail) return;

    const points = [...rail.querySelectorAll('.lp-depth-pt')];
    const sections = points
      .map((pt) => document.querySelector(pt.getAttribute('href')))
      .filter(Boolean);
    if (!sections.length) return;

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            const idx = sections.indexOf(entry.target);
            if (idx === -1) continue;
            points.forEach((p) => p.classList.remove('is-active'));
            points[idx].classList.add('is-active');
          }
        },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      );
      sections.forEach((s) => io.observe(s));
    }

    // Progress fill: overall scroll fraction across the whole landing
    // page, independent of --depth (which resurfaces near the CTA —
    // the rail fill should keep reading as "how far down the page").
    let ticking = false;
    function updateFill() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - (window.innerHeight || doc.clientHeight);
      const frac = max > 0 ? clamp((window.scrollY || window.pageYOffset) / max, 0, 1) : 0;
      rail.style.setProperty('--rail-progress', frac.toFixed(4));
    }
    function clamp(v, a, b) { return Math.min(b, Math.max(a, v)); }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { ticking = false; updateFill(); });
    }
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateFill();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
