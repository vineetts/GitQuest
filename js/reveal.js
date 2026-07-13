/* ═══════════════════════════════════════════════
   Lightweight reveal-on-scroll for the landing page.
   Elements with `.reveal` fade + rise into place the first
   time they enter the viewport (IntersectionObserver), with a
   small stagger for siblings that reveal together. No scroll-
   jacking, no pinned sections — the page scrolls at its own
   natural speed. Fully respects prefers-reduced-motion.
   ═══════════════════════════════════════════════ */
(function () {
  function init() {
    const els = [...document.querySelectorAll('.reveal')];
    if (!els.length) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }

    // Stagger siblings that share a parent so grids/rows cascade in together.
    const groups = new Map();
    for (const el of els) {
      const parent = el.parentElement;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(el);
    }
    for (const siblings of groups.values()) {
      siblings.forEach((el, i) => {
        el.style.setProperty('--reveal-delay', Math.min(i * 0.08, 0.4) + 's');
      });
    }

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    els.forEach(el => io.observe(el));

    // Safety net: guarantee every element becomes visible even if it never
    // registers an intersection (crawlers/tools that render without
    // scrolling, deep-linked anchors, or any other observer edge case).
    // Text and layout are never gated behind scroll — only the animation is.
    setTimeout(() => {
      els.forEach(el => el.classList.add('is-visible'));
      io.disconnect();
    }, 2500);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
