// ═══════════════════════════════════════════════
//  GitQuest — Git Graph Visualizer (SVG)
// ═══════════════════════════════════════════════

const GitVisualizer = (() => {

  const BRANCH_COLORS = [
    '#3fb950', '#58a6ff', '#f0883e', '#bc8cff',
    '#e3b341', '#f85149', '#79c0ff', '#d2a8ff'
  ];

  const NODE_R = 12;
  const LANE_W = 44;
  const ROW_H  = 52;
  const PAD_X  = 60;
  const PAD_Y  = 40;

  let currentState = null;

  function render(svgEl, gitState, persona) {
    if (!svgEl || !gitState) return;
    currentState = gitState;

    const svg = svgEl;
    svg.innerHTML = '';

    const commits = gitState.commits || [];
    if (commits.length === 0) {
      renderEmpty(svg, persona);
      return;
    }

    // Assign lanes (columns) to branches
    const branchLane = {};
    let nextLane = 0;
    const laneColors = {};

    commits.forEach(c => {
      if (c.branch && branchLane[c.branch] === undefined) {
        branchLane[c.branch] = nextLane;
        laneColors[c.branch] = BRANCH_COLORS[nextLane % BRANCH_COLORS.length];
        nextLane++;
      }
    });

    // Build id → commit map
    const commitMap = {};
    commits.forEach(c => { commitMap[c.id] = c; });

    // Assign rows (top = newest)
    const rows = {};
    commits.forEach((c, i) => { rows[c.id] = i; });

    const totalH = commits.length * ROW_H + PAD_Y * 2;
    const totalW = Math.max(nextLane * LANE_W + PAD_X * 2, 260);

    svg.setAttribute('viewBox', `0 0 ${totalW} ${totalH}`);
    svg.setAttribute('height', totalH);

    const defs = svgEl.ownerDocument.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svg.appendChild(defs);

    // Draw edges first (so nodes render on top)
    const edgeGroup = createSVGEl('g', svg);

    commits.forEach(c => {
      const cx = PAD_X + branchLane[c.branch] * LANE_W;
      const cy = PAD_Y + rows[c.id] * ROW_H;
      const color = laneColors[c.branch] || BRANCH_COLORS[0];

      if (c.parent && commitMap[c.parent]) {
        const p = commitMap[c.parent];
        const px = PAD_X + branchLane[p.branch] * LANE_W;
        const py = PAD_Y + rows[p.id] * ROW_H;
        drawEdge(edgeGroup, cx, cy, px, py, color, false);
      }

      if (c.merge && commitMap[c.merge]) {
        const m = commitMap[c.merge];
        const mx = PAD_X + branchLane[m.branch] * LANE_W;
        const my = PAD_Y + rows[m.id] * ROW_H;
        const mergeColor = laneColors[m.branch] || BRANCH_COLORS[1];
        drawEdge(edgeGroup, cx, cy, mx, my, mergeColor, true);
      }
    });

    // Draw nodes
    const nodeGroup = createSVGEl('g', svg);

    commits.forEach((c, i) => {
      const cx = PAD_X + branchLane[c.branch] * LANE_W;
      const cy = PAD_Y + rows[c.id] * ROW_H;
      const color = laneColors[c.branch] || BRANCH_COLORS[0];
      const isHEAD = gitState.HEAD === c.branch && gitState.branches[c.branch] === c.id;

      // Node circle
      const circle = createSVGEl('circle', nodeGroup, {
        cx, cy, r: NODE_R,
        fill: isHEAD ? color : '#161b22',
        stroke: color,
        'stroke-width': isHEAD ? 0 : 2.5,
        style: 'cursor:pointer'
      });

      // Animate in
      circle.style.opacity = '0';
      circle.style.transform = `scale(0)`;
      circle.style.transformOrigin = `${cx}px ${cy}px`;
      requestAnimationFrame(() => {
        circle.style.transition = `opacity 0.3s ${i * 0.06}s, transform 0.3s ${i * 0.06}s`;
        circle.style.opacity = '1';
        circle.style.transform = 'scale(1)';
      });

      // HEAD dot
      if (isHEAD) {
        createSVGEl('circle', nodeGroup, {
          cx, cy, r: 4,
          fill: '#000'
        });
      }

      // Tag badge
      if (c.tag) {
        const tagBg = createSVGEl('rect', nodeGroup, {
          x: cx + NODE_R + 3,
          y: cy - 10,
          width: c.tag.length * 7.2 + 10,
          height: 18,
          rx: 9,
          fill: '#e3b341',
          opacity: 0.9
        });
        const tagTxt = createSVGEl('text', nodeGroup, {
          x: cx + NODE_R + 8,
          y: cy + 5,
          fill: '#000',
          'font-size': '10',
          'font-weight': '700',
          'font-family': 'JetBrains Mono, monospace'
        });
        tagTxt.textContent = c.tag;
      }

      // Commit message label
      const labelX = Math.max(...Object.values(branchLane)) * LANE_W + PAD_X + NODE_R + 20;
      const label = createSVGEl('text', nodeGroup, {
        x: labelX,
        y: cy + 4,
        fill: isHEAD ? '#e6edf3' : '#8b949e',
        'font-size': '11',
        'font-family': 'JetBrains Mono, monospace',
        'font-weight': isHEAD ? '600' : '400'
      });
      const maxLen = 26;
      label.textContent = c.msg.length > maxLen ? c.msg.slice(0, maxLen) + '…' : c.msg;

      // SHA label
      const shaLabel = createSVGEl('text', nodeGroup, {
        x: labelX,
        y: cy + 17,
        fill: '#484f58',
        'font-size': '9',
        'font-family': 'JetBrains Mono, monospace'
      });
      shaLabel.textContent = c.id.slice(0, 7);
    });

    // Draw branch labels (right side)
    const labelGroup = createSVGEl('g', svg);
    const branches = gitState.branches || {};
    Object.entries(branches).forEach(([name, targetId]) => {
      if (!commitMap[targetId]) return;
      const tc = commitMap[targetId];
      const ty = PAD_Y + rows[tc.id] * ROW_H;
      const tx = 4;
      const isCurrentBranch = gitState.HEAD === name;
      const color = laneColors[tc.branch] || BRANCH_COLORS[0];

      const pill = createSVGEl('rect', labelGroup, {
        x: tx - 2,
        y: ty - 9,
        width: name.length * 6.4 + 14,
        height: 17,
        rx: 8,
        fill: isCurrentBranch ? color : 'none',
        stroke: color,
        'stroke-width': 1,
        opacity: 0.85
      });

      const branchLabel = createSVGEl('text', labelGroup, {
        x: tx + 5,
        y: ty + 4,
        fill: isCurrentBranch ? '#000' : color,
        'font-size': '9',
        'font-weight': '600',
        'font-family': 'JetBrains Mono, monospace'
      });
      branchLabel.textContent = name;
    });

    // Update legend
    updateLegend(gitState, branchLane, laneColors);
  }

  function drawEdge(parent, x1, y1, x2, y2, color, isDashed) {
    const path = createSVGEl('path', parent, {
      stroke: color,
      'stroke-width': '2',
      fill: 'none',
      'stroke-dasharray': isDashed ? '5,3' : 'none',
      opacity: 0.7
    });

    // Curved path for cross-lane connections
    if (Math.abs(x1 - x2) > 5) {
      const midY = (y1 + y2) / 2;
      path.setAttribute('d', `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`);
    } else {
      path.setAttribute('d', `M ${x1} ${y1} L ${x2} ${y2}`);
    }
  }

  function renderEmpty(svg, persona) {
    const colors = { beginner: '#3fb950', intermediate: '#58a6ff', expert: '#f0883e' };
    const color = colors[persona] || '#3fb950';

    svg.setAttribute('viewBox', '0 0 260 160');
    svg.setAttribute('height', '160');

    const g = createSVGEl('g', svg);

    // Placeholder node
    createSVGEl('circle', g, { cx: 130, cy: 60, r: 16, fill: 'none', stroke: color, 'stroke-width': 2, 'stroke-dasharray': '5,3' });

    const txt = createSVGEl('text', g, {
      x: 130, y: 65,
      fill: color,
      'font-size': '12',
      'text-anchor': 'middle',
      'font-family': 'Inter, sans-serif'
    });
    txt.textContent = 'git init';

    const sub = createSVGEl('text', g, {
      x: 130, y: 105,
      fill: '#484f58',
      'font-size': '10',
      'text-anchor': 'middle',
      'font-family': 'Inter, sans-serif'
    });
    sub.textContent = 'Graph will appear as you progress';
  }

  function updateLegend(gitState, branchLane, laneColors) {
    const legend = document.getElementById('git-legend');
    if (!legend) return;
    legend.innerHTML = '';

    const branches = gitState.branches || {};
    Object.entries(branches).forEach(([name]) => {
      if (branchLane[name] === undefined) return;
      const color = laneColors[name] || '#3fb950';
      const item = document.createElement('div');
      item.className = 'legend-item';
      item.innerHTML = `<span class="legend-dot" style="background:${color}"></span>${name}`;
      legend.appendChild(item);
    });

    if (gitState.tags) {
      Object.keys(gitState.tags).forEach(tag => {
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = `<span class="legend-dot" style="background:#e3b341"></span>${tag}`;
        legend.appendChild(item);
      });
    }
  }

  function createSVGEl(tag, parent, attrs = {}) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    parent.appendChild(el);
    return el;
  }

  function animateNewCommit(svgEl, gitState, persona) {
    render(svgEl, gitState, persona);
  }

  return { render, animateNewCommit };
})();
