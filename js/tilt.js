/* ═══════════════════════════════════════════════
   Subtle pointer-reactive tilt for `.tilt` cards (the path
   cards). Purely decorative — CSS alone already gives a
   working hover state, so this degrades silently on touch
   devices or if it fails to init. Vanilla JS, zero deps.
   ═══════════════════════════════════════════════ */
(function () {
  function init() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const cards = [...document.querySelectorAll('.tilt')];
    if (!cards.length) return;

    const MAX_DEG = 6;

    cards.forEach(card => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;  // 0..1
        const py = (e.clientY - r.top) / r.height;  // 0..1
        const rx = (0.5 - py) * MAX_DEG * 2;
        const ry = (px - 0.5) * MAX_DEG * 2;
        card.style.setProperty('--tilt-x', rx.toFixed(2) + 'deg');
        card.style.setProperty('--tilt-y', ry.toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
