/* ═══════════════════════════════════════════════
   Scroll-driven "product reveal" for the landing page.
   As the user scrolls through a tall pinned section, a Git
   repository builds itself in the background — commits appear,
   a branch splits, a merge lands, and the XP/achievement HUD
   assembles. Apple-style scrollytelling, vanilla JS, zero deps.
   Fully respects prefers-reduced-motion.
   ═══════════════════════════════════════════════ */
(function () {
  function init() {
    const track = document.getElementById('lp-reveal');
    if (!track) return;

    const stage  = track.querySelector('.lp-rv-stage');
    const nodes  = [...track.querySelectorAll('.lp-rv-node')];
    const edges  = [...track.querySelectorAll('.lp-rv-edge')];
    const lines  = [...track.querySelectorAll('.lp-rv-line')];
    const caps   = [...track.querySelectorAll('.lp-rv-cap')];
    const glow   = track.querySelector('.lp-rv-glow');
    const xpEl   = track.querySelector('.lp-rv-xp-num');
    const bar     = track.querySelector('.lp-rv-progress span');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const clamp  = (v, a, b) => Math.min(b, Math.max(a, v));
    const smooth = (a, b, x) => {
      if (a === b) return x >= b ? 1 : 0;
      const t = clamp((x - a) / (b - a), 0, 1);
      return t * t * (3 - 2 * t);
    };

    // Reduced motion / no-JS-scroll fallback: reveal the finished repo statically.
    if (reduce) {
      track.classList.add('lp-rv-static');
      apply(1);
      return;
    }

    function apply(p) {
      if (stage) stage.style.setProperty('--p', p.toFixed(4));
      if (bar) bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';

      // Terminal lines / HUD / labels: fade + rise
      for (const el of lines) {
        const a = +el.dataset.in;
        const b = el.dataset.out ? +el.dataset.out : a + 0.08;
        const t = smooth(a, b, p);
        el.style.opacity = t;
        el.style.transform = 'translateY(' + ((1 - t) * 12).toFixed(2) + 'px)';
      }

      // Graph nodes: pop in with a scale
      for (const el of nodes) {
        const a = +el.dataset.in;
        const t = smooth(a, a + 0.06, p);
        el.style.opacity = t;
        el.style.transform = 'scale(' + (0.4 + 0.6 * t).toFixed(3) + ')';
      }

      // Graph edges: draw on (normalized via pathLength="1")
      for (const el of edges) {
        const a = +el.dataset.in;
        const dur = el.dataset.dur ? +el.dataset.dur : 0.1;
        const t = smooth(a, a + dur, p);
        el.style.strokeDashoffset = (1 - t).toFixed(4);
        el.style.opacity = t > 0.001 ? 1 : 0;
      }

      // Captions: crossfade so only the active one shows
      for (const c of caps) {
        const a = +c.dataset.a, b = +c.dataset.b;
        const op = Math.max(0, Math.min(smooth(a - 0.02, a + 0.05, p), 1 - smooth(b - 0.05, b + 0.02, p)));
        c.style.opacity = op.toFixed(3);
        c.style.transform = 'translateY(' + ((1 - op) * 14).toFixed(2) + 'px)';
      }

      // Background glow intensifies as the repo takes shape
      if (glow) {
        glow.style.opacity = (0.2 + 0.7 * p).toFixed(3);
        glow.style.transform = 'translate(-50%, -50%) scale(' + (0.85 + 0.5 * p).toFixed(3) + ')';
      }

      // XP counts up during the final "ship it" phase
      if (xpEl) xpEl.textContent = Math.round(smooth(0.78, 0.97, p) * 1240);
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const r = track.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const denom = r.height - vh;
        const p = denom > 0 ? clamp(-r.top / denom, 0, 1) : 0;
        apply(p);
      });
    }

    // Capture phase so this also fires if an inner element is the scroll
    // container (the landing uses overflow-x:hidden, which can make it one).
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll(); // set initial state
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
