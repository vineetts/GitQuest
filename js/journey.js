/* ═══════════════════════════════════════════════
   THE JOURNEY — the landing page's single scroll driver. One pinned
   ~620vh (~420vh on mobile) track; the camera pushes through 5
   nested layers of the actual product UI (browser → world map →
   lesson → terminal → commit graph), then retreats back to the
   browser frame for a finale CTA overlay.

   Everything is a pure function of scroll progress p (0..1 across
   the track) — no timers, nothing keeps animating once you stop
   scrolling. transform / opacity / filter only. One rAF-throttled,
   passive + capture-phase scroll listener (same pattern as the
   landing page's previous js/showcase.js + js/depth.js, now merged
   into this single driver). Vanilla JS, zero deps.

   Fully respects prefers-reduced-motion: the CSS "reduced motion"
   block renders all 5 layers as static, fully-composed stacked
   sections, and this script does no scroll-driven work at all in
   that mode (see init() below) — it only fills in the couple of
   details CSS can't reach (the final XP number).
   ═══════════════════════════════════════════════ */
(function () {
  function init() {
    const track = document.getElementById('jy-track');
    if (!track) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      // Static fallback: CSS composes every layer fully. The only
      // scroll-driven detail CSS can't express is the XP counter's
      // final text content.
      const xpEl = track.querySelector('.jy-core-xp-num');
      if (xpEl) xpEl.textContent = '1240';
      return;
    }

    const stage   = track.querySelector('.jy-stage');
    const l0copy  = track.querySelector('.jy-l0 .jy-copy');
    const l0frame = track.querySelector('.jy-l0 .jy-frame');
    const hint    = track.querySelector('.jy-scroll-hint');
    const l1      = track.querySelector('.jy-l1');
    const l2      = track.querySelector('.jy-l2');
    const l3      = track.querySelector('.jy-l3');
    const l4      = track.querySelector('.jy-l4');
    const l2term  = track.querySelector('.jy-l2 .jy-lp-term');
    const finale  = track.querySelector('.jy-finale');

    const backdrop = document.querySelector('.jy-backdrop');
    const bgLayers = backdrop ? [...backdrop.querySelectorAll('.jy-bg')] : [];
    const vignette = backdrop ? backdrop.querySelector('.jy-vignette') : null;

    const indicator = document.querySelector('.jy-indicator');
    const dots       = indicator ? [...indicator.querySelectorAll('.jy-dot')] : [];
    const fill        = indicator ? indicator.querySelector('.jy-indicator-fill') : null;

    const ttexts = [...track.querySelectorAll('.jy-ttext')];
    const coreEdges = [...track.querySelectorAll('.jy-l4 .lp-sc-edge')];
    const coreNodes = [...track.querySelectorAll('.jy-l4 .lp-sc-node')];
    const coreLines = [...track.querySelectorAll('.jy-l4 .jy-core-line')];
    const coreXpEl  = track.querySelector('.jy-core-xp-num');

    // ── Math helpers ────────────────────────────────────────────
    const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
    const lerp  = (a, b, t) => a + (b - a) * t;
    // Cubic smoothstep: 0 before a, 1 after b, eased between.
    const smooth = (a, b, x) => {
      if (a === b) return x >= b ? 1 : 0;
      const t = clamp((x - a) / (b - a), 0, 1);
      return t * t * (3 - 2 * t);
    };

    // ── Per-layer motion map (desktop + mobile share the same p
    // breakpoints; only track height differs, via CSS). Matches the
    // spec's motion map 1:1: each "push" window is both the previous
    // layer's leave and the next layer's enter, so the curves
    // overlap and the camera reads as continuous, never a slideshow. ──
    const PUSH = [
      { enterStart: null, enterEnd: null, holdEnd: 0.10, leaveEnd: 0.24 }, // L0 frame
      { enterStart: 0.10, enterEnd: 0.24, holdEnd: 0.34, leaveEnd: 0.46 }, // L1
      { enterStart: 0.34, enterEnd: 0.46, holdEnd: 0.56, leaveEnd: 0.66 }, // L2
      { enterStart: 0.56, enterEnd: 0.66, holdEnd: 0.76, leaveEnd: 0.84 }, // L3
      { enterStart: 0.76, enterEnd: 0.84, holdEnd: 0.94, leaveEnd: 0.975 }, // L4 — mostly finishes leaving before the finale becomes prominent (see FINALE_START)
    ];
    const RETURN_START = 0.90; // backdrop hue's pull-back-to-green window start
    const COPY_HOLD_END = 0.07, COPY_LEAVE_END = 0.20; // headline departs upward+fades early
    // FINALE_START deliberately starts *inside* L4's leave window (0.94 to
    // 0.975) rather than after it: by the time the finale's own opacity
    // becomes significant, L4 is already faint/mostly-blurred-away, so
    // there's a real crossfade instead of either (a) a muddy moment where
    // both a half-opaque finale and a half-blurred L4 are simultaneously
    // prominent, or (b) a blank gap where neither is visible yet.
    const FINALE_START = 0.955;
    const HOLD_CENTERS = [0.05, 0.29, 0.51, 0.71, 0.89]; // indicator dot scroll targets

    function pushTransform(p, cfg) {
      const holdStart = cfg.enterEnd != null ? cfg.enterEnd : 0;
      const enterT = cfg.enterStart != null ? smooth(cfg.enterStart, cfg.enterEnd, p) : 1;
      const leaveT = smooth(cfg.holdEnd, cfg.leaveEnd, p);
      const opacity = enterT * (1 - leaveT);

      let scale, blur;
      if (cfg.enterStart != null && p < cfg.enterEnd) {
        scale = lerp(0.55, 1, enterT);
        blur = lerp(6, 0, enterT);
      } else if (p < cfg.holdEnd) {
        const holdT = smooth(holdStart, cfg.holdEnd, p);
        scale = lerp(1, 1.06, holdT);
        blur = 0;
      } else {
        scale = lerp(1.06, 2.4, leaveT);
        blur = lerp(0, 10, leaveT);
      }
      return { scale, blur, opacity };
    }

    function applyTransform(el, t, extraTranslateY) {
      if (!el) return;
      const ty = extraTranslateY ? extraTranslateY.toFixed(2) + 'px' : '0px';
      el.style.opacity = t.opacity.toFixed(3);
      el.style.transform = 'translateY(' + ty + ') scale(' + t.scale.toFixed(4) + ')';
      el.style.filter = t.blur > 0.01 ? 'blur(' + t.blur.toFixed(2) + 'px)' : 'none';
    }

    function setInteractive(el, opacity) {
      if (!el) return;
      el.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
    }

    // ── Core render: everything derives from a single p value. ──
    function apply(p) {
      // L0 copy: departs upward + fades (distinct from the frame's push-through)
      if (l0copy) {
        const t = smooth(COPY_HOLD_END, COPY_LEAVE_END, p);
        const opacity = 1 - t;
        l0copy.style.opacity = opacity.toFixed(3);
        l0copy.style.transform = 'translateY(' + (-t * 40).toFixed(2) + 'px)';
        setInteractive(l0copy, opacity);
      }
      if (hint) {
        hint.style.opacity = clamp(1 - p / 0.06, 0, 1).toFixed(3);
      }

      // L0 frame: a single push-through lifecycle — enters, holds, then
      // leaves for good by p=0.24. It never physically reappears for the
      // finale (that used to make it independently flex-centered at the
      // same time as the finale's own headline+CTA group, so the two
      // fought for the same vertical center and the CTAs overlapped the
      // frame's top edge). The finale's browser-frame echo is a separate
      // element laid out in-flow inside .jy-finale itself (see below).
      let frameOpacity = 0;
      if (l0frame) {
        const t = pushTransform(p, PUSH[0]);
        applyTransform(l0frame, t);
        frameOpacity = t.opacity;
      }

      // The backdrop's L0/"surface" hue still returns during the pull-back
      // (a purely visual echo — nothing physically re-enters), independent
      // of the (now one-way) frame opacity above.
      const returnT = smooth(RETURN_START, 1.0, p);
      const bg0Presence = Math.max(frameOpacity, returnT);

      // L1 / L2 / L3 / L4: push-through lifecycle.
      const layers = [l1, l2, l3, l4];
      const presence = [bg0Presence]; // presence[0] tracks the frame/backdrop-0 envelope
      layers.forEach((el, i) => {
        const t = pushTransform(p, PUSH[i + 1]);
        applyTransform(el, t);
        presence.push(t.opacity);
      });

      // L2's terminal pane glows as departure nears (reuses L2's own leave curve).
      if (l2term) {
        const leaveT = smooth(PUSH[2].holdEnd, PUSH[2].leaveEnd, p);
        l2term.style.setProperty('--jy-leave', leaveT.toFixed(3));
      }

      // Terminal typing (L3): pure function of p, monospace ch-width reveal.
      // The full command/output text is authored directly in the HTML (so
      // it's in the DOM for crawlers with zero JS) — width is the only
      // thing gated by scroll.
      for (const el of ttexts) {
        const len = el.dataset.len || (el.dataset.len = String(el.textContent.length));
        const a = +el.dataset.in, dur = +el.dataset.dur;
        const t = smooth(a, a + dur, p);
        const n = Math.round(t * (+len));
        el.style.width = n + 'ch';
      }

      // L4 commit graph: reuses the pathLength=1 + stroke-dashoffset
      // technique that used to live in js/showcase.js.
      for (const el of coreEdges) {
        const a = +el.dataset.in, dur = +el.dataset.dur;
        const t = smooth(a, a + dur, p);
        el.style.strokeDashoffset = (1 - t).toFixed(4);
        el.style.opacity = t > 0.001 ? 1 : 0;
      }
      for (const el of coreNodes) {
        const a = +el.dataset.in;
        const t = smooth(a, a + 0.02, p);
        el.style.opacity = t;
        el.style.transform = 'scale(' + (0.4 + 0.6 * t).toFixed(3) + ')';
      }
      for (const el of coreLines) {
        const a = +el.dataset.in;
        const t = smooth(a, a + 0.02, p);
        el.style.opacity = t;
      }
      if (coreXpEl) coreXpEl.textContent = Math.round(smooth(0.840, 0.930, p) * 1240);

      // Finale overlay: fades in on top of the returned browser frame.
      if (finale) {
        const t = smooth(FINALE_START, 1.0, p);
        finale.style.opacity = t.toFixed(3);
        finale.style.transform = 'translateY(' + ((1 - t) * 18).toFixed(2) + 'px)';
        setInteractive(finale, t);
      }

      // Backdrop: 5 hue "scenes" crossfade using the same presence
      // envelopes that drive the content layers — one source of truth.
      if (bgLayers.length === 5) {
        presence.forEach((v, i) => { bgLayers[i].style.opacity = v.toFixed(3); });
      }
      if (vignette) vignette.style.opacity = (0.65 * (1 - bg0Presence)).toFixed(3);

      // Journey progress indicator.
      if (indicator) {
        const showT = smooth(0, 0.03, p) * (1 - smooth(0.90, 0.97, p));
        indicator.style.opacity = showT.toFixed(3);
        indicator.style.pointerEvents = showT > 0.05 ? 'auto' : 'none';
        if (fill) indicator.style.setProperty('--jy-fill', p.toFixed(4));
        const idx = p < 0.17 ? 0 : p < 0.40 ? 1 : p < 0.61 ? 2 : p < 0.80 ? 3 : 4;
        dots.forEach((d, i) => d.classList.toggle('is-active', i === idx));
      }
    }

    // ── Backdrop container fade-out once scroll passes the journey
    // (paths / proof / footer read against a plain dark background). ──
    function applyPostFade(scrollY, trackTop, trackHeight, vh) {
      if (!backdrop) return;
      const trackBottom = trackTop + trackHeight;
      const t = clamp((scrollY - (trackBottom - vh * 0.2)) / (vh * 0.8), 0, 1);
      backdrop.style.opacity = (1 - t).toFixed(3);
    }

    // ── Scroll driver ───────────────────────────────────────────
    let ticking = false;
    let trackTop = 0, trackHeight = 0;

    function measure() {
      const r = track.getBoundingClientRect();
      trackTop = r.top + (window.scrollY || window.pageYOffset);
      trackHeight = track.offsetHeight;
    }

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
        applyPostFade(window.scrollY || window.pageYOffset, trackTop, trackHeight, vh);
      });
    }

    function onResize() {
      measure();
      onScroll();
    }

    // Indicator dots: click to jump to that beat's hold-center.
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        const vh = window.innerHeight || document.documentElement.clientHeight;
        measure();
        const denom = Math.max(trackHeight - vh, 1);
        const targetY = trackTop + HOLD_CENTERS[i] * denom;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      });
    });

    measure();
    window.addEventListener('scroll', onScroll, { passive: true, capture: true });
    window.addEventListener('resize', onResize, { passive: true });
    onScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
