// ═══════════════════════════════════════════════
//  GitQuest — Git Graph Visualizer v2 (SVG)
// ═══════════════════════════════════════════════

const GitVisualizer = (() => {

  const BRANCH_COLORS = [
    '#3fb950', '#58a6ff', '#f0883e', '#bc8cff',
    '#e3b341', '#f85149', '#79c0ff', '#d2a8ff'
  ];

  const NODE_R       = 15;
  const LANE_W       = 52;
  const ROW_H        = 66;
  const LABEL_ZONE   = 96;   // left reserved for branch-name pills
  const MSG_PAD      = 20;   // gap between last lane and commit messages
  const TOP_PAD      = 64;   // extra room for focus-caption banner
  const BOTTOM_PAD   = 24;

  let _tooltip = null;

  // ── tooltip singleton ──────────────────────────
  function getTooltip() {
    if (!_tooltip) {
      _tooltip = document.createElement('div');
      _tooltip.className = 'git-tooltip';
      document.body.appendChild(_tooltip);
    }
    return _tooltip;
  }

  function positionTooltip(e) {
    const tt = getTooltip();
    const x = Math.min(e.clientX + 14, window.innerWidth - 210);
    const y = Math.max(e.clientY - 14, 8);
    tt.style.left = x + 'px';
    tt.style.top  = y + 'px';
  }

  // ── main render ────────────────────────────────
  function render(svgEl, gitState, persona) {
    if (!svgEl || !gitState) return;

    svgEl.innerHTML = '';
    const tt = getTooltip();
    tt.style.display = 'none';

    const commits = gitState.commits || [];
    if (commits.length === 0) {
      renderEmpty(svgEl, persona);
      return;
    }

    // ── lane assignment ──
    const branchLane  = {};
    const laneColors  = {};
    let   nextLane    = 0;

    commits.forEach(c => {
      if (c.branch && branchLane[c.branch] === undefined) {
        branchLane[c.branch]  = nextLane;
        laneColors[c.branch]  = BRANCH_COLORS[nextLane % BRANCH_COLORS.length];
        nextLane++;
      }
    });

    const commitMap = {};
    commits.forEach(c => { commitMap[c.id] = c; });

    const rows = {};
    commits.forEach((c, i) => { rows[c.id] = i; });

    const numLanes = Math.max(nextLane, 1);
    const graphW   = numLanes * LANE_W;
    const maxMsgLen = 30;
    const totalW   = LABEL_ZONE + graphW + MSG_PAD + maxMsgLen * 7 + 20;
    const totalH   = commits.length * ROW_H + TOP_PAD + BOTTOM_PAD;

    svgEl.setAttribute('viewBox', `0 0 ${totalW} ${totalH}`);
    svgEl.setAttribute('height', Math.min(totalH, 440));

    // ── defs: glow filter + per-color arrowhead markers ──
    const defs = mkSvg('defs', svgEl);

    // Glow filter
    const filt = mkSvg('filter', defs, { id: 'gq-glow', x: '-60%', y: '-60%', width: '220%', height: '220%' });
    mkSvg('feGaussianBlur', filt, { in: 'SourceGraphic', stdDeviation: '3.5', result: 'blur' });
    const fm = mkSvg('feMerge', filt);
    mkSvg('feMergeNode', fm, { in: 'blur' });
    mkSvg('feMergeNode', fm, { in: 'SourceGraphic' });

    // Outer-glow for HEAD ring
    const filtRing = mkSvg('filter', defs, { id: 'gq-ring', x: '-80%', y: '-80%', width: '260%', height: '260%' });
    mkSvg('feGaussianBlur', filtRing, { in: 'SourceGraphic', stdDeviation: '5', result: 'blur' });
    const fmr = mkSvg('feMerge', filtRing);
    mkSvg('feMergeNode', fmr, { in: 'blur' });

    // Arrow markers per branch color
    Object.entries(laneColors).forEach(([branch, color]) => {
      const mid = `gq-arrow-${branch.replace(/[^a-z0-9]/gi, '_')}`;
      const mk = mkSvg('marker', defs, {
        id: mid,
        markerWidth: '7', markerHeight: '7',
        refX: '5', refY: '3.5',
        orient: 'auto'
      });
      mkSvg('path', mk, { d: 'M 0 0 L 7 3.5 L 0 7 z', fill: color, opacity: '0.75' });
    });

    const originX = LABEL_ZONE;

    // ── faint vertical lane tracks ──
    const tracks = mkSvg('g', svgEl, { opacity: '0.1' });
    for (let l = 0; l < numLanes; l++) {
      const lx = originX + l * LANE_W + LANE_W / 2;
      mkSvg('line', tracks, {
        x1: lx, y1: TOP_PAD - 12,
        x2: lx, y2: totalH - BOTTOM_PAD + 12,
        stroke: BRANCH_COLORS[l % BRANCH_COLORS.length],
        'stroke-width': '2',
        'stroke-dasharray': '4,6'
      });
    }

    // ── edges ──
    const edgeG = mkSvg('g', svgEl);

    // Edges start drawing after ALL nodes have popped in
    const edgeBaseDelay = commits.length * 0.15 + 0.3;

    commits.forEach((c, idx) => {
      const cx    = originX + branchLane[c.branch] * LANE_W + LANE_W / 2;
      const cy    = TOP_PAD + rows[c.id] * ROW_H;
      const color = laneColors[c.branch] || BRANCH_COLORS[0];
      const mid   = `gq-arrow-${c.branch.replace(/[^a-z0-9]/gi, '_')}`;

      if (c.parent && commitMap[c.parent]) {
        const p   = commitMap[c.parent];
        const px  = originX + branchLane[p.branch] * LANE_W + LANE_W / 2;
        const py  = TOP_PAD + rows[p.id] * ROW_H;
        drawEdge(edgeG, cx, cy + NODE_R, px, py - NODE_R, color, false, mid, idx, edgeBaseDelay);
      }

      if (c.merge && commitMap[c.merge]) {
        const m      = commitMap[c.merge];
        const mx     = originX + branchLane[m.branch] * LANE_W + LANE_W / 2;
        const my     = TOP_PAD + rows[m.id] * ROW_H;
        const mcol   = laneColors[m.branch] || BRANCH_COLORS[1];
        const mmid   = `gq-arrow-${m.branch.replace(/[^a-z0-9]/gi, '_')}`;
        drawEdge(edgeG, cx, cy + NODE_R, mx, my - NODE_R, mcol, true, mmid, idx, edgeBaseDelay);
      }
    });

    // ── nodes ──
    const nodeG = mkSvg('g', svgEl);

    commits.forEach((c, i) => {
      const cx    = originX + branchLane[c.branch] * LANE_W + LANE_W / 2;
      const cy    = TOP_PAD + rows[c.id] * ROW_H;
      const color = laneColors[c.branch] || BRANCH_COLORS[0];
      const isHEAD = gitState.HEAD === c.branch
                  && gitState.branches
                  && gitState.branches[c.branch] === c.id;

      // Outer glow ring for HEAD
      if (isHEAD) {
        const ring = mkSvg('circle', nodeG, {
          cx, cy, r: NODE_R + 8,
          fill: 'none',
          stroke: color,
          'stroke-width': '3',
          opacity: '0.25',
          filter: 'url(#gq-ring)'
        });
        ring.style.animation = 'gq-pulse 2.2s ease-in-out infinite';
      }

      // Main circle
      const circle = mkSvg('circle', nodeG, {
        cx, cy, r: NODE_R,
        fill: isHEAD ? color : 'var(--bg2, #161b22)',
        stroke: color,
        'stroke-width': isHEAD ? '0' : '2.5',
        style: 'cursor:pointer',
        filter: isHEAD ? 'url(#gq-glow)' : 'none'
      });

      // Staggered pop-in animation — slow enough to follow each commit appearing
      circle.style.opacity = '0';
      circle.style.transform = `scale(0.2)`;
      circle.style.transformOrigin = `${cx}px ${cy}px`;
      circle.style.transition = `opacity 0.38s ${i * 0.15}s, transform 0.38s ${i * 0.15}s cubic-bezier(.34,1.56,.64,1)`;
      requestAnimationFrame(() => {
        circle.style.opacity = '1';
        circle.style.transform = 'scale(1)';
      });

      // Inner dot (HEAD marker)
      if (isHEAD) {
        mkSvg('circle', nodeG, { cx, cy, r: 5, fill: '#000000' });
      }

      // Short-SHA ring label (non-HEAD)
      if (!isHEAD) {
        const shaRing = mkSvg('text', nodeG, {
          x: cx, y: cy + 1,
          fill: color,
          'font-size': '8',
          'font-weight': '700',
          'font-family': 'JetBrains Mono, monospace',
          'text-anchor': 'middle',
          'dominant-baseline': 'middle',
          'pointer-events': 'none'
        });
        shaRing.textContent = c.id.slice(0, 4);
      }

      // Tag badge
      if (c.tag) {
        const tw = c.tag.length * 6.8 + 14;
        mkSvg('rect', nodeG, {
          x: cx + NODE_R + 5, y: cy - 10,
          width: tw, height: 18, rx: 9,
          fill: '#e3b341', opacity: '0.92'
        });
        const tl = mkSvg('text', nodeG, {
          x: cx + NODE_R + 12, y: cy + 5,
          fill: '#000',
          'font-size': '9.5', 'font-weight': '800',
          'font-family': 'JetBrains Mono, monospace'
        });
        tl.textContent = c.tag;
      }

      // Commit message (right of graph)
      const msgX = originX + numLanes * LANE_W + MSG_PAD;
      const msgEl = mkSvg('text', nodeG, {
        x: msgX, y: cy - 3,
        fill: isHEAD ? '#e6edf3' : '#8b949e',
        'font-size': '11',
        'font-family': 'JetBrains Mono, monospace',
        'font-weight': isHEAD ? '700' : '400',
        'dominant-baseline': 'auto'
      });
      msgEl.textContent = c.msg.length > maxMsgLen
        ? c.msg.slice(0, maxMsgLen - 1) + '…'
        : c.msg;

      const shaEl = mkSvg('text', nodeG, {
        x: msgX, y: cy + 13,
        fill: '#484f58',
        'font-size': '9',
        'font-family': 'JetBrains Mono, monospace'
      });
      shaEl.textContent = c.id.slice(0, 7);

      // Hover tooltip
      const hitZone = mkSvg('circle', nodeG, {
        cx, cy, r: NODE_R + 4,
        fill: 'transparent',
        style: 'cursor:pointer'
      });
      hitZone.addEventListener('mouseenter', e => {
        const tt = getTooltip();
        tt.innerHTML = `
          <div class="gq-tt-hash">${escHtml(c.id.slice(0, 7))}</div>
          <div class="gq-tt-msg">${escHtml(c.msg)}</div>
          <div class="gq-tt-branch" style="color:${color}">⎇ ${escHtml(c.branch)}${isHEAD ? ' · <b>HEAD</b>' : ''}</div>
          ${c.tag ? `<div class="gq-tt-tag">🏷 ${escHtml(c.tag)}</div>` : ''}
          ${c.parent ? `<div class="gq-tt-parent">parent: ${escHtml(c.parent.slice(0,7))}</div>` : ''}
        `;
        tt.style.display = 'block';
        positionTooltip(e);
      });
      hitZone.addEventListener('mousemove', positionTooltip);
      hitZone.addEventListener('mouseleave', () => {
        getTooltip().style.display = 'none';
      });
    });

    // ── focus caption banner ──
    if (gitState.focus) {
      const capG   = mkSvg('g', svgEl);
      const capTxt = gitState.focus.length > 68 ? gitState.focus.slice(0, 67) + '…' : gitState.focus;
      const capW   = Math.min(capTxt.length * 6.2 + 28, totalW - 16);
      const capX   = totalW / 2 - capW / 2;
      mkSvg('rect', capG, {
        x: capX, y: 6, width: capW, height: 26, rx: 13,
        fill: 'rgba(88,166,255,0.1)',
        stroke: 'rgba(88,166,255,0.28)', 'stroke-width': '1'
      });
      const ct = mkSvg('text', capG, {
        x: totalW / 2, y: 23,
        fill: '#79c0ff', 'font-size': '9.5', 'font-weight': '600',
        'font-family': 'Inter, sans-serif',
        'text-anchor': 'middle', 'dominant-baseline': 'middle'
      });
      ct.textContent = '📍 ' + capTxt;
    }

    // ── branch label pills (left zone) ──
    const labelG = mkSvg('g', svgEl);
    const branches = gitState.branches || {};

    // Pre-compute which branches share the same commit (for pill stacking)
    const pillsAtCommit = {};
    Object.entries(branches).forEach(([name, targetId]) => {
      if (!targetId || !commitMap[targetId]) return;
      if (!pillsAtCommit[targetId]) pillsAtCommit[targetId] = [];
      pillsAtCommit[targetId].push(name);
    });

    Object.entries(branches).forEach(([name, targetId]) => {
      if (!commitMap[targetId]) return;
      const tc      = commitMap[targetId];
      const pills   = pillsAtCommit[targetId] || [name];
      const pillIdx = pills.indexOf(name);
      const total   = pills.length;
      // Stack vertically when multiple branches point to the same commit
      const stackOff = total > 1 ? (pillIdx - (total - 1) / 2) * 22 : 0;
      const ty   = TOP_PAD + rows[tc.id] * ROW_H + stackOff;
      const isCur = gitState.HEAD === name;
      const color = laneColors[tc.branch] || BRANCH_COLORS[0];

      const maxPillW = LABEL_ZONE - 12;
      const pillW    = Math.min(name.length * 6.4 + 16, maxPillW);
      const pillX    = LABEL_ZONE - pillW - 6;

      // Connector dashes to node
      const nodeX = originX + branchLane[tc.branch] * LANE_W + LANE_W / 2;
      mkSvg('line', labelG, {
        x1: pillX + pillW, y1: ty,
        x2: nodeX - NODE_R - 1, y2: ty,
        stroke: color, 'stroke-width': '1',
        opacity: '0.35', 'stroke-dasharray': '3,3'
      });

      // Pill background
      mkSvg('rect', labelG, {
        x: pillX, y: ty - 10,
        width: pillW, height: 20, rx: 10,
        fill: isCur ? color : 'var(--bg2, #161b22)',
        stroke: color, 'stroke-width': '1.5',
        opacity: isCur ? '0.95' : '0.85'
      });

      // Pill text
      const bl = mkSvg('text', labelG, {
        x: pillX + pillW / 2, y: ty + 1,
        fill: isCur ? '#000' : color,
        'font-size': '8.5', 'font-weight': '700',
        'font-family': 'JetBrains Mono, monospace',
        'text-anchor': 'middle', 'dominant-baseline': 'middle'
      });
      bl.textContent = name.length > 14 ? name.slice(0, 13) + '…' : name;

      // HEAD arrow indicator
      if (isCur) {
        const hy = ty - 22;
        mkSvg('text', labelG, {
          x: pillX + pillW / 2, y: hy,
          fill: '#e3b341', 'font-size': '7.5', 'font-weight': '800',
          'font-family': 'JetBrains Mono, monospace', 'text-anchor': 'middle'
        }).textContent = '▼ HEAD';
      }
    });

    updateLegend(gitState, branchLane, laneColors);
  }

  // ── edge drawing ──────────────────────────────
  function drawEdge(parent, x1, y1, x2, y2, color, isDashed, markerId, idx, baseDelay = 0.3) {
    const sameLane = Math.abs(x1 - x2) < 6;
    let d;
    if (sameLane) {
      d = `M ${x1} ${y1} L ${x2} ${y2}`;
    } else {
      // Nice S-curve for cross-lane merge edges
      const ctl1y = y1 + (y2 - y1) * 0.35;
      const ctl2y = y1 + (y2 - y1) * 0.65;
      d = `M ${x1} ${y1} C ${x1} ${ctl1y}, ${x2} ${ctl2y}, ${x2} ${y2}`;
    }

    const path = mkSvg('path', parent, {
      d,
      stroke: color,
      'stroke-width': '2',
      fill: 'none',
      opacity: '0.6',
      'stroke-dasharray': isDashed ? '7,4' : 'none',
      'marker-end': `url(#${markerId})`
    });

    // Animate draw-on — starts after all nodes have appeared
    try {
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len} ${len}`;
      path.style.strokeDashoffset = `${len}`;
      path.style.transition = `stroke-dashoffset 0.6s ${(baseDelay + idx * 0.12).toFixed(2)}s ease`;
      requestAnimationFrame(() => { path.style.strokeDashoffset = '0'; });
    } catch(e) { /* no-op if getTotalLength unavailable */ }
  }

  // ── empty state ───────────────────────────────
  function renderEmpty(svg, persona) {
    const colors = {
      beginner: '#3fb950', intermediate: '#58a6ff',
      expert: '#f0883e',   innovator: '#d2a8ff'
    };
    const color = colors[persona] || '#3fb950';

    svg.setAttribute('viewBox', '0 0 300 180');
    svg.setAttribute('height', '180');

    const defs = mkSvg('defs', svg);
    const f = mkSvg('filter', defs, { id: 'gq-empty-glow' });
    mkSvg('feGaussianBlur', f, { in: 'SourceGraphic', stdDeviation: '4', result: 'b' });
    const fm2 = mkSvg('feMerge', f);
    mkSvg('feMergeNode', fm2, { in: 'b' });
    mkSvg('feMergeNode', fm2, { in: 'SourceGraphic' });

    const g = mkSvg('g', svg);

    // Outer dashed orbit
    const orbit = mkSvg('circle', g, {
      cx: 150, cy: 84, r: 30,
      fill: 'none', stroke: color,
      'stroke-width': '1.2', 'stroke-dasharray': '5,5',
      opacity: '0.35', filter: 'url(#gq-empty-glow)'
    });
    orbit.style.animation = 'gq-spin 10s linear infinite';

    // Inner filled node
    mkSvg('circle', g, {
      cx: 150, cy: 84, r: 16,
      fill: 'none', stroke: color,
      'stroke-width': '2', opacity: '0.7',
      filter: 'url(#gq-empty-glow)'
    });

    const sym = mkSvg('text', g, {
      x: 150, y: 90,
      fill: color, 'font-size': '16', 'text-anchor': 'middle',
      'font-family': 'Inter, sans-serif', 'font-weight': '700'
    });
    sym.textContent = '⎇';

    const sub = mkSvg('text', g, {
      x: 150, y: 130,
      fill: '#8b949e', 'font-size': '11', 'text-anchor': 'middle',
      'font-family': 'Inter, sans-serif'
    });
    sub.textContent = 'Graph loads as you progress';
  }

  // ── legend ────────────────────────────────────
  function updateLegend(gitState, branchLane, laneColors) {
    const legend = document.getElementById('git-legend');
    if (!legend) return;
    legend.innerHTML = '';

    const branches = gitState.branches || {};
    Object.entries(branches).forEach(([name]) => {
      if (branchLane[name] === undefined) return;
      const color = laneColors[name] || '#3fb950';
      const isHead = gitState.HEAD === name;
      const item = document.createElement('div');
      item.className = 'legend-item';
      item.innerHTML = `
        <span class="legend-dot" style="background:${color};${isHead ? `box-shadow:0 0 7px ${color}` : ''}"></span>
        <span>${escHtml(name)}</span>
        ${isHead ? '<span class="legend-head-badge">HEAD</span>' : ''}
      `;
      legend.appendChild(item);
    });

    if (gitState.tags) {
      Object.keys(gitState.tags).forEach(tag => {
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = `<span class="legend-dot" style="background:#e3b341"></span>🏷 ${escHtml(tag)}`;
        legend.appendChild(item);
      });
    }
  }

  // ── helpers ───────────────────────────────────
  function mkSvg(tag, parent, attrs = {}) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    parent.appendChild(el);
    return el;
  }

  function escHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function animateNewCommit(svgEl, gitState, persona) {
    render(svgEl, gitState, persona);
  }

  return { render, animateNewCommit };
})();
