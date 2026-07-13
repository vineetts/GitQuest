/* ═══════════════════════════════════════════════
   Scroll-driven "product reveal" for the landing page.
   A chain of pinned chapters, each mapping its own scroll
   progress (0→1) to: a Git repository building itself, the
   four learning paths sliding in from alternating sides, and
   a depth-stack of feature mockups (terminal, IDE, incident,
   quiz) rising into view — Apple-style scrollytelling, vanilla
   JS, zero deps. Fully respects prefers-reduced-motion.
   ═══════════════════════════════════════════════ */
(function () {
  const clamp  = (v, a, b) => Math.min(b, Math.max(a, v));
  const smooth = (a, b, x) => {
    if (a === b) return x >= b ? 1 : 0;
    const t = clamp((x - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };

  function buildApplier(track) {
    const stage = track.querySelector('.lp-rv-stage');
    const nodes = [...track.querySelectorAll('.lp-rv-node')];
    const edges = [...track.querySelectorAll('.lp-rv-edge')];
    const lines = [...track.querySelectorAll('.lp-rv-line')];
    const caps  = [...track.querySelectorAll('.lp-rv-cap')];
    const glow  = track.querySelector('.lp-rv-glow');
    const xpEl  = track.querySelector('.lp-rv-xp-num');
    const bar   = track.querySelector('.lp-rv-progress span');
    const sides = [...track.querySelectorAll('.lp-rv-side')];
    const layers = [...track.querySelectorAll('.lp-rv-layer')];

    return function apply(p) {
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

      // Background glow intensifies as the chapter progresses
      if (glow) {
        glow.style.opacity = (0.2 + 0.7 * p).toFixed(3);
        glow.style.transform = 'translate(-50%, -50%) scale(' + (0.85 + 0.5 * p).toFixed(3) + ')';
      }

      // XP counts up during the final "ship it" phase
      if (xpEl) xpEl.textContent = Math.round(smooth(0.78, 0.97, p) * 1240);

      // Side-sliding cards: enter from alternating left/right
      for (const el of sides) {
        const a = +el.dataset.in;
        const dur = el.dataset.dur ? +el.dataset.dur : 0.16;
        const t = smooth(a, a + dur, p);
        const dir = el.dataset.side === 'r' ? 1 : -1;
        el.style.opacity = t.toFixed(3);
        el.style.transform =
          'translateX(' + ((1 - t) * 90 * dir).toFixed(1) + 'px) translateY(' + ((1 - t) * 10).toFixed(1) + 'px)';
      }

      // Depth-stack layers: rise from behind and settle in front
      for (const el of layers) {
        const a = +el.dataset.in;
        const dur = el.dataset.dur ? +el.dataset.dur : 0.16;
        const t = smooth(a, a + dur, p);
        const depth = 1 - t;
        el.style.opacity = smooth(a - 0.03, a + 0.06, p).toFixed(3);
        el.style.transform = 'translateY(' + (depth * 30).toFixed(1) + 'px) scale(' + (0.86 + 0.14 * t).toFixed(3) + ')';
        el.style.zIndex = String(Math.round(t * 10));
      }
    };
  }

  function init() {
    const tracks = [...document.querySelectorAll('.lp-reveal')];
    if (!tracks.length) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reduced motion / no-JS-scroll fallback: reveal each chapter's finished state statically.
    if (reduce) {
      tracks.forEach(track => {
        track.classList.add('lp-rv-static');
        buildApplier(track)(1);
      });
      return;
    }

    const entries = tracks.map(track => ({ track, apply: buildApplier(track) }));

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const vh = window.innerHeight || document.documentElement.clientHeight;
        for (const { track, apply } of entries) {
          const r = track.getBoundingClientRect();
          const denom = r.height - vh;
          const p = denom > 0 ? clamp(-r.top / denom, 0, 1) : 0;
          apply(p);
        }
      });
    }

    // Capture phase so this also fires if an inner element is the scroll
    // container (the landing uses overflow-x:clip, which is safe, but this
    // stays defensive in case that ever changes).
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
