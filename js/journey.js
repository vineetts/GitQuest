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
    const l0layer = track.querySelector('.jy-l0');
    const l0copy  = track.querySelector('.jy-l0 .jy-copy');
    const l0frame = track.querySelector('.jy-l0 .jy-frame');
    const hint    = track.querySelector('.jy-scroll-hint');
    const l1      = track.querySelector('.jy-l1');
    const l2      = track.querySelector('.jy-l2');
    const l3      = track.querySelector('.jy-l3');
    const l4      = track.querySelector('.jy-l4');
    // D3: mockup and copy (headline/sub) fade on independent curves —
    // see applyMock()/textOpacityFor() below — so each layer needs
    // both refs separately rather than treating the whole .jy-layer
    // as one opacity/blur unit.
    const l1mock  = track.querySelector('.jy-l1 .jy-mock');
    const l2mock  = track.querySelector('.jy-l2 .jy-mock');
    const l3mock  = track.querySelector('.jy-l3 .jy-mock');
    const l4mock  = track.querySelector('.jy-l4 .jy-mock');
    const l1copy  = track.querySelector('.jy-l1 .jy-copy');
    const l2copy  = track.querySelector('.jy-l2 .jy-copy');
    const l3copy  = track.querySelector('.jy-l3 .jy-copy');
    const l4copy  = track.querySelector('.jy-l4 .jy-copy');
    const l2term  = track.querySelector('.jy-l2 .jy-lp-term');
    const finale  = track.querySelector('.jy-finale');

    const backdrop = document.querySelector('.jy-backdrop');
    const bgLayers = backdrop ? [...backdrop.querySelectorAll('.jy-bg')] : [];
    const vignette = backdrop ? backdrop.querySelector('.jy-vignette') : null;

    const indicator = document.querySelector('.jy-indicator');
    const dots       = indicator ? [...indicator.querySelectorAll('.jy-dot')] : [];
    const fill        = indicator ? indicator.querySelector('.jy-indicator-fill') : null;

    const ttexts = [...track.querySelectorAll('.jy-ttext')];
    // L1's four-path overview cards — same generic data-in reveal
    // technique as coreLines below (snap-in opacity over a short fixed
    // window), just scoped to L1 and with a small rise for a touch more
    // presence than a flat fade.
    const l1Cards = [...track.querySelectorAll('.jy-l1 .jy-map-path')];
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
    // (L0's copy fade timing is now derived from PUSH[0] itself via
    // textOpacityFor() — see below — rather than separate constants.)
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
        // D3(a): blur clears on a SHORTER window than opacity/scale —
        // done by roughly the midpoint of the push, not at its very
        // end — so the incoming layer is already crisp well before
        // its own enter finishes, guaranteeing something in the frame
        // reads sharp through the whole second half of the push.
        const blurEnd = cfg.enterStart + (cfg.enterEnd - cfg.enterStart) * 0.5;
        const blurT = smooth(cfg.enterStart, blurEnd, p);
        blur = lerp(6, 0, blurT);
      } else if (p < cfg.holdEnd) {
        const holdT = smooth(holdStart, cfg.holdEnd, p);
        scale = lerp(1, 1.06, holdT);
        blur = 0;
      } else {
        // Leaving: the mockup is allowed to linger, blurring/scaling
        // away over the FULL leave window (unlike its copy — see
        // textOpacityFor below, which hard-cuts much sooner). This is
        // the "object carries the transition" half of D3(b).
        scale = lerp(1.06, 2.4, leaveT);
        blur = lerp(0, 10, leaveT);
      }
      return { scale, blur, opacity };
    }

    // D3(b)+(c): the copy (headline/sub/CTA/hint) of a layer fades on
    // its own much faster, non-overlapping curve — hard-cutting out
    // within the first ~35% of its leave window (Apple-style: text
    // snaps, it doesn't linger), and only fading in during the second
    // ~35% of its enter window so it never overlaps the text of the
    // layer it's replacing (whose own leave curve has, symmetrically,
    // already finished by then).
    const TEXT_FRACTION = 0.35;
    function textOpacityFor(p, cfg) {
      let opacity = 1;
      if (cfg.enterStart != null) {
        const span = cfg.enterEnd - cfg.enterStart;
        const inStart = cfg.enterStart + span * TEXT_FRACTION;
        const inEnd = inStart + span * TEXT_FRACTION;
        if (p < inEnd) opacity = smooth(inStart, inEnd, p);
      }
      if (p >= cfg.holdEnd) {
        const leaveSpan = cfg.leaveEnd - cfg.holdEnd;
        const outEnd = cfg.holdEnd + leaveSpan * TEXT_FRACTION;
        opacity = Math.min(opacity, 1 - smooth(cfg.holdEnd, outEnd, p));
      }
      return clamp(opacity, 0, 1);
    }

    // Camera-push geometry only (scale) — applied to the .jy-layer
    // root so mockup + copy scale together as one unit; their
    // opacity/blur are set independently below (D3).
    function applyLayerScale(el, scale) {
      if (!el) return;
      el.style.transform = 'scale(' + scale.toFixed(4) + ')';
    }

    function applyMock(el, t) {
      if (!el) return;
      el.style.opacity = t.opacity.toFixed(3);
      el.style.filter = t.blur > 0.01 ? 'blur(' + t.blur.toFixed(2) + 'px)' : 'none';
    }

    function applyFrame(el, t, extraTranslateY) {
      if (!el) return;
      const ty = extraTranslateY ? extraTranslateY.toFixed(2) + 'px' : '0px';
      el.style.opacity = t.opacity.toFixed(3);
      el.style.transform = 'translateY(' + ty + ') scale(' + t.scale.toFixed(4) + ')';
      el.style.filter = t.blur > 0.01 ? 'blur(' + t.blur.toFixed(2) + 'px)' : 'none';
    }

    function applyCopy(el, opacity, extraTranslateY) {
      if (!el) return;
      const ty = extraTranslateY ? extraTranslateY.toFixed(2) + 'px' : '0px';
      el.style.opacity = opacity.toFixed(3);
      el.style.transform = 'translateY(' + ty + ')';
    }

    // D1: toggles the CSS hook (`.jy-layer.is-live` / `.jy-finale.is-live`)
    // that scopes `pointer-events: auto` onto that host's `.btn`
    // children — the ONLY moment those buttons are real click targets.
    function setLive(el, active) {
      if (!el) return;
      el.classList.toggle('is-live', active);
    }

    // ── Core render: everything derives from a single p value. ──
    function apply(p) {
      // L0 copy: departs upward + fades, on its own hard-cut curve
      // (D3) distinct from the frame's slower push-through lingering.
      // PUSH[0] has no enter window (L0 is present from p=0), so
      // textOpacityFor only ever applies its LEAVE half here.
      if (l0copy) {
        const opacity = textOpacityFor(p, PUSH[0]);
        applyCopy(l0copy, opacity, -(1 - opacity) * 40);
        // D1: L0's CTAs are only real click targets while the copy
        // that contains them is substantially visible.
        setLive(l0layer, opacity > 0.5);
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
        applyFrame(l0frame, t);
        frameOpacity = t.opacity;
      }

      // The backdrop's L0/"surface" hue still returns during the pull-back
      // (a purely visual echo — nothing physically re-enters), independent
      // of the (now one-way) frame opacity above.
      const returnT = smooth(RETURN_START, 1.0, p);
      const bg0Presence = Math.max(frameOpacity, returnT);

      // L1 / L2 / L3 / L4: push-through lifecycle. Each layer's SCALE
      // goes on the .jy-layer root (camera geometry, shared by mockup
      // + copy); opacity/blur are then split between the mockup
      // (lingers, per pushTransform's full-span curve) and the copy
      // (hard-cuts fast, per textOpacityFor) — this is what keeps a
      // crisp focal subject on screen through mid-push (D3).
      const layers = [l1, l2, l3, l4];
      const mocks  = [l1mock, l2mock, l3mock, l4mock];
      const copies = [l1copy, l2copy, l3copy, l4copy];
      const presence = [bg0Presence]; // presence[0] tracks the frame/backdrop-0 envelope
      layers.forEach((el, i) => {
        const cfg = PUSH[i + 1];
        const t = pushTransform(p, cfg);
        applyLayerScale(el, t.scale);
        applyMock(mocks[i], t);
        applyCopy(copies[i], textOpacityFor(p, cfg));
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

      // L1 path cards: sequential snap-in reveal, one per data-in.
      for (const el of l1Cards) {
        const a = +el.dataset.in;
        const t = smooth(a, a + 0.03, p);
        el.style.opacity = t.toFixed(3);
        el.style.transform = 'translateY(' + ((1 - t) * 10).toFixed(2) + 'px)';
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
        // D1: the finale's CTAs are only real click targets once the
        // overlay is substantially visible (mirrors L0's setLive above).
        setLive(finale, t > 0.5);
      }

      // Backdrop: 5 hue "scenes" crossfade using the same presence
      // envelopes that drive the content layers — one source of truth.
      if (bgLayers.length === 5) {
        presence.forEach((v, i) => { bgLayers[i].style.opacity = v.toFixed(3); });
      }
      if (vignette) vignette.style.opacity = (0.65 * (1 - bg0Presence)).toFixed(3);

      // Journey progress indicator. Opacity fades in/out (a visual
      // detail); pointer-events stays `auto` at all times (set once in
      // CSS, see .jy-indicator) — it's a small fixed hit area off to
      // the side, and D1 requires dot clicks to work even at p=0,
      // before this fade-in has visually completed.
      if (indicator) {
        const showT = smooth(0, 0.03, p) * (1 - smooth(0.90, 0.97, p));
        indicator.style.opacity = showT.toFixed(3);
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

    // Current journey progress, computed straight from track geometry
    // (shared by the passive scroll listener and the dot-glide loop
    // below, so both always agree on what p means).
    function currentP() {
      const r = track.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const denom = r.height - vh;
      return denom > 0 ? clamp(-r.top / denom, 0, 1) : 0;
    }

    function onScroll() {
      // While a dot-glide is in flight it already calls apply() itself
      // on every rAF tick (see glideScrollTo below) using geometry it
      // cached up front. Letting this listener's OWN independent rAF
      // also fire mid-glide serves no purpose — it can only ever
      // re-render a p value the glide has already superseded — and it
      // adds a second getBoundingClientRect() read on top of the
      // glide's own per-frame scrollTo() write, a read-after-write
      // pattern that forces the browser to resolve layout twice as
      // often as necessary during the fastest-moving part of the
      // animation.
      if (glideRAF != null) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const vh = window.innerHeight || document.documentElement.clientHeight;
        apply(currentP());
        applyPostFade(window.scrollY || window.pageYOffset, trackTop, trackHeight, vh);
      });
    }

    function onResize() {
      measure();
      onScroll();
    }

    // ── Dot-glide: custom rAF scroll animation ──────────────────
    // D2: dot clicks used to rely on CSS `scroll-behavior: smooth` /
    // native `scrollTo({behavior:'smooth'})`, whose browser-internal
    // interpolation isn't synced to our own render loop — screenshots
    // captured mid-glide showed a hard-edged black band, a frame where
    // the browser had moved the scroll position but our composition
    // hadn't (or vice versa). Driving the jump ourselves and calling
    // apply(p) on every single animation frame guarantees every frame
    // painted during the glide is a fully legitimate composition.
    const GLIDE_MS = 900;
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    let glideRAF = null;
    function cancelGlide() {
      if (glideRAF != null) {
        cancelAnimationFrame(glideRAF);
        glideRAF = null;
      }
    }
    function glideScrollTo(targetY) {
      cancelGlide();
      measure(); // fresh trackTop/trackHeight before computing p below
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const pDenom = Math.max(trackHeight - vh, 1);
      const maxY = document.documentElement.scrollHeight - vh;
      const clampedTarget = clamp(targetY, 0, Math.max(maxY, 0));
      const startY = window.scrollY || window.pageYOffset;
      const delta = clampedTarget - startY;
      if (Math.abs(delta) < 1) return;
      const t0 = performance.now();
      function step(now) {
        const elapsed = now - t0;
        const lt = clamp(elapsed / GLIDE_MS, 0, 1);
        const eased = easeInOutCubic(lt);
        const y = startY + delta * eased;
        // behavior: 'instant' — explicitly bypasses any CSS
        // scroll-behavior so the browser never layers its own smooth
        // interpolation on top of ours (which is what produced D2's
        // artifact frames in the first place).
        window.scrollTo({ top: y, left: 0, behavior: 'instant' });
        // p is derived from geometry measured ONCE above, not from a
        // fresh getBoundingClientRect() read here. Reading layout
        // geometry back immediately after writing scroll position on
        // every single rAF tick (a read-after-write / "layout
        // thrashing" pattern) forces the browser to synchronously
        // resolve layout far more often than vsync requires.
        apply(clamp((y - trackTop) / pDenom, 0, 1));
        if (lt < 1) {
          glideRAF = requestAnimationFrame(step);
        } else {
          glideRAF = null;
        }
      }
      glideRAF = requestAnimationFrame(step);
    }
    // Any real user scroll input interrupts an in-flight glide — it
    // must never fight the user for control of the scroll position.
    window.addEventListener('wheel', cancelGlide, { passive: true });
    window.addEventListener('touchstart', cancelGlide, { passive: true });

    // Indicator dots: click to jump to that beat's hold-center.
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        measure();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        const denom = Math.max(trackHeight - vh, 1);
        const targetY = trackTop + HOLD_CENTERS[i] * denom;
        glideScrollTo(targetY);
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
