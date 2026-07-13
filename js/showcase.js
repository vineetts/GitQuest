/* ═══════════════════════════════════════════════
   The one cinematic scroll moment on the landing page: a Git
   repository builds itself as you scroll through a single
   pinned "showcase" section — commits appear, a branch splits,
   a merge lands, XP ticks up. Bounded to one section (not
   scroll-jacked for screens on end), Apple-style but tasteful.
   Vanilla JS, zero deps. Fully respects prefers-reduced-motion.
   ═══════════════════════════════════════════════ */
(function () {
  function init() {
    const track = document.getElementById('lp-showcase');
    if (!track) return;

    const stage = track.querySelector('.lp-showcase-stage');
    const nodes = [...track.querySelectorAll('.lp-sc-node')];
    const edges = [...track.querySelectorAll('.lp-sc-edge')];
    const lines = [...track.querySelectorAll('.lp-sc-line')];
    const caps  = [...track.querySelectorAll('.lp-sc-cap')];
    const glow  = track.querySelector('.lp-sc-glow');
    const xpEl  = track.querySelector('.lp-sc-xp-num');
    const bar   = track.querySelector('.lp-sc-progress span');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const clamp  = (v, a, b) => Math.min(b, Math.max(a, v));
    const smooth = (a, b, x) => {
      if (a === b) return x >= b ? 1 : 0;
      const t = clamp((x - a) / (b - a), 0, 1);
      return t * t * (3 - 2 * t);
    };

    if (reduce) {
      track.classList.add('lp-showcase-static');
      apply(1);
      return;
    }

    function apply(p) {
      if (stage) stage.style.setProperty('--p', p.toFixed(4));
      if (bar) bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';

      for (const el of lines) {
        const a = +el.dataset.in;
        const b = el.dataset.out ? +el.dataset.out : a + 0.08;
        const t = smooth(a, b, p);
        el.style.opacity = t;
        el.style.transform = 'translateY(' + ((1 - t) * 12).toFixed(2) + 'px)';
      }
      for (const el of nodes) {
        const a = +el.dataset.in;
        const t = smooth(a, a + 0.07, p);
        el.style.opacity = t;
        el.style.transform = 'scale(' + (0.4 + 0.6 * t).toFixed(3) + ')';
      }
      for (const el of edges) {
        const a = +el.dataset.in;
        const dur = el.dataset.dur ? +el.dataset.dur : 0.1;
        const t = smooth(a, a + dur, p);
        el.style.strokeDashoffset = (1 - t).toFixed(4);
        el.style.opacity = t > 0.001 ? 1 : 0;
      }
      for (const c of caps) {
        const a = +c.dataset.a, b = +c.dataset.b;
        const op = Math.max(0, Math.min(smooth(a - 0.02, a + 0.06, p), 1 - smooth(b - 0.06, b + 0.02, p)));
        c.style.opacity = op.toFixed(3);
        c.style.transform = 'translateY(' + ((1 - op) * 16).toFixed(2) + 'px)';
      }
      if (glow) {
        glow.style.opacity = (0.2 + 0.7 * p).toFixed(3);
        glow.style.transform = 'translate(-50%, -50%) scale(' + (0.85 + 0.5 * p).toFixed(3) + ')';
      }
      if (xpEl) xpEl.textContent = Math.round(smooth(0.72, 0.96, p) * 1240);
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

    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
