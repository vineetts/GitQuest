// ═══════════════════════════════════════════════
//  GitQuest — Main Application
// ═══════════════════════════════════════════════

const App = (() => {

  // ── State ──────────────────────────────────────
  let state = loadState();
  let currentPersona = null;
  let currentLevelData = null;
  let currentStepIndex = 0;
  let currentStepCount = 0;
  let screenHistory = ['welcome'];
  let quizAnswered = {};
  let draggedFile = null;
  let stagedFiles = [];
  let completedActions = {};
  let challengeCompleted = {};

  // ── Persona color map ─────────────────────────
  const PERSONA_META = {
    beginner:     { label: 'Explorer',    color: '#3fb950', nextPersona: 'intermediate' },
    intermediate: { label: 'Adventurer',  color: '#58a6ff', nextPersona: 'expert' },
    expert:       { label: 'Master',      color: '#f0883e', nextPersona: 'innovator' },
    innovator:    { label: 'Innovator',   color: '#d2a8ff', nextPersona: null }
  };

  // ── Init ──────────────────────────────────────
  function init() {
    showScreen('welcome');
    // Restore last active persona if any
    if (state.lastPersona) {
      currentPersona = state.lastPersona;
    }
  }

  // ══════════════════════════════════════════════
  //  SCREEN NAVIGATION
  // ══════════════════════════════════════════════
  function showScreen(name) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const el = document.getElementById(`screen-${name}`);
    if (el) el.classList.add('active');

    if (screenHistory[screenHistory.length - 1] !== name) {
      screenHistory.push(name);
    }

    if (name === 'worldmap') renderWorldMap();
    if (name === 'profile')  renderProfile();
  }

  function goBack() {
    screenHistory.pop();
    const prev = screenHistory[screenHistory.length - 1] || 'welcome';
    showScreen(prev);
  }

  // ══════════════════════════════════════════════
  //  PERSONA SELECTION
  // ══════════════════════════════════════════════
  function selectPersona(persona) {
    currentPersona = persona;
    state.lastPersona = persona;
    if (!state.progress[persona]) {
      state.progress[persona] = { xp: 0, completedLevels: [], achievements: [] };
    }
    saveState();
    showScreen('worldmap');
  }

  // ══════════════════════════════════════════════
  //  WORLD MAP
  // ══════════════════════════════════════════════
  function renderWorldMap() {
    const persona = currentPersona;
    if (!persona) return;

    const data = GAME_DATA[persona];
    const meta = PERSONA_META[persona];
    const progress = state.progress[persona] || { xp: 0, completedLevels: [] };

    // Header
    document.getElementById('worldmap-title').textContent = data.title;
    document.getElementById('worldmap-subtitle').textContent = data.subtitle;

    // HUD
    const level = Math.floor(progress.xp / 500) + 1;
    document.getElementById('hud-xp').textContent = progress.xp;
    document.getElementById('hud-level').textContent = level;
    document.getElementById('hud-streak').textContent = `${state.streak || 0} 🔥`;

    // XP bar
    const xpInLevel = progress.xp % 500;
    document.getElementById('xp-bar').style.width = `${(xpInLevel / 500) * 100}%`;
    document.getElementById('xp-bar-label').textContent = `${progress.xp} XP total`;

    // Level map
    const map = document.getElementById('level-map');
    map.innerHTML = '';

    data.levels.forEach((lvl, idx) => {
      const completed = progress.completedLevels.includes(lvl.id);
      const isFirst = idx === 0;
      const prevCompleted = idx === 0 || progress.completedLevels.includes(data.levels[idx - 1].id);
      const locked = !prevCompleted && !completed && !isFirst;

      // Connector line between items
      if (idx > 0) {
        const connector = document.createElement('div');
        connector.className = 'level-connector';
        map.appendChild(connector);
      }

      const item = document.createElement('div');
      item.className = `level-item ${persona}${completed ? ' completed' : ''}${locked ? ' locked' : ''}`;
      if (!completed && prevCompleted && !locked) item.classList.add('current');

      item.innerHTML = `
        <div class="level-number">${completed ? '✓' : lvl.num}</div>
        <div class="level-info">
          <h4>${lvl.icon} ${lvl.title}</h4>
          <p>${lvl.subtitle}</p>
        </div>
        <div class="level-meta">
          <span class="level-xp">+${lvl.xp} XP</span>
          <span class="level-type-badge">${lvl.type}</span>
        </div>
      `;

      if (!locked) {
        item.addEventListener('click', () => startLesson(lvl));
      }

      map.appendChild(item);
    });
  }

  // ══════════════════════════════════════════════
  //  LESSON ENGINE
  // ══════════════════════════════════════════════
  function startLesson(levelData) {
    currentLevelData = levelData;
    currentStepIndex = 0;
    quizAnswered = {};
    completedActions = {};
    stagedFiles = [];

    showScreen('lesson');

    // Sidebar
    document.getElementById('lesson-badge').textContent = levelData.icon;
    document.getElementById('lesson-title').textContent = levelData.title;
    document.getElementById('lesson-xp-pill').textContent = `+${levelData.xp} XP`;
    document.getElementById('lesson-tip-text').textContent = levelData.tip || '';

    // Command reference
    renderCommandRef(levelData.commands || []);

    // Step indicators
    renderStepIndicators(levelData.steps);

    // Start visualizer
    const svgEl = document.getElementById('git-svg');
    GitVisualizer.render(svgEl, levelData.gitState, currentPersona);

    // Terminal
    Terminal.init(levelData);

    // Render first step
    renderStep(0);

    // Default to graph tab
    switchVizTab('graph', document.querySelector('.viz-tab'));
  }

  function renderCommandRef(commands) {
    const el = document.getElementById('command-reference');
    if (!commands.length) { el.innerHTML = ''; return; }

    el.innerHTML = `<h5>Command Reference</h5>` +
      commands.map(c => `
        <div class="cmd-item">
          <span class="cmd-code">${escHtml(c.cmd)}</span>
          <span class="cmd-desc">${escHtml(c.desc)}</span>
        </div>
      `).join('');
  }

  function renderStepIndicators(steps) {
    const container = document.getElementById('lesson-steps');
    container.innerHTML = steps.map((s, i) => {
      const label = s.title || s.type.charAt(0).toUpperCase() + s.type.slice(1);
      return `
        <div class="step-item${i === 0 ? ' active' : ''}" id="step-ind-${i}" onclick="App.jumpToStep(${i})">
          <span class="step-dot"></span>
          <span>${label}</span>
        </div>
      `;
    }).join('');
  }

  function renderStep(index) {
    const steps = currentLevelData.steps;
    if (index < 0 || index >= steps.length) return;

    currentStepIndex = index;
    const step = steps[index];

    // Update step indicators
    document.querySelectorAll('.step-item').forEach((el, i) => {
      el.classList.remove('active', 'done');
      if (i < index) el.classList.add('done');
      if (i === index) el.classList.add('active');
      el.querySelector('.step-dot')?.classList?.toggle('done', i < index);
    });

    // Buttons
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');
    btnPrev.disabled = index === 0;
    btnNext.textContent = index === steps.length - 1 ? 'Complete ✓' : 'Next →';

    // Render content
    const stage = document.getElementById('lesson-stage');
    stage.innerHTML = '';

    switch (step.type) {
      case 'story':         renderStory(stage, step); break;
      case 'concept':       renderConcept(stage, step); break;
      case 'interactive':   renderInteractive(stage, step); break;
      case 'dragdrop':      renderDragDrop(stage, step); break;
      case 'commitform':    renderCommitForm(stage, step); break;
      case 'quiz':          renderQuiz(stage, step, index); break;
      case 'ide':           renderIDE(stage, step); break;
      case 'conflictresolver': renderConflictResolver(stage, step); break;
      case 'scenario':      renderScenario(stage, step); break;
      case 'challenge':     renderChallenge(stage, step); break;
      default:              stage.innerHTML = `<p>${step.type} step</p>`; break;
    }

    // Update git graph for this step
    if (step.gitState) {
      GitVisualizer.render(document.getElementById('git-svg'), step.gitState, currentPersona);
    } else if (currentLevelData.gitState) {
      GitVisualizer.render(document.getElementById('git-svg'), currentLevelData.gitState, currentPersona);
    }
  }

  function jumpToStep(i) { renderStep(i); }

  function nextStep() {
    const steps = currentLevelData.steps;
    if (currentStepIndex < steps.length - 1) {
      renderStep(currentStepIndex + 1);
    } else {
      completeLevel();
    }
  }

  function prevStep() {
    if (currentStepIndex > 0) {
      renderStep(currentStepIndex - 1);
    }
  }

  // ══════════════════════════════════════════════
  //  STEP RENDERERS
  // ══════════════════════════════════════════════

  function renderStory(stage, step) {
    stage.innerHTML = `
      <div class="stage-story">
        <h2>${step.title}</h2>
        <p class="story-context">${step.context}</p>
        <div class="story-objective">
          <span>🎯</span>
          <span>${step.objective || ''}</span>
        </div>
      </div>
      <div class="progress-indicator">
        ${currentLevelData.steps.map((_, i) =>
          `<div class="progress-dot ${i < currentStepIndex ? 'done' : i === currentStepIndex ? 'active' : ''}"></div>`
        ).join('')}
      </div>
    `;
  }

  function renderConcept(stage, step) {
    const diagramHtml = step.diagram ? `
      <div class="concept-diagram">
        ${step.diagram.map(d => d.icon === '→' || d.icon === '↔' || d.icon === '➕' || d.icon === '+' ? `
          <div class="diagram-arrow">${d.icon === '→' ? '→' : d.icon === '↔' ? '↔' : d.label || d.icon}</div>
        ` : `
          <div class="diagram-box">
            <span class="box-icon">${d.icon}</span>
            <div class="box-label">${d.label}</div>
            ${d.sub ? `<div class="box-sub">${d.sub}</div>` : ''}
          </div>
        `).join('')}
      </div>
    ` : '';

    stage.innerHTML = `
      <div class="concept-box">
        <h3>${step.icon || '📚'} ${step.title}</h3>
        <div class="concept-text">${step.body.replace(/\n/g, '<br>')}</div>
      </div>
      ${diagramHtml}
    `;
  }

  function renderInteractive(stage, step) {
    const persona = currentPersona;
    const accentColor = PERSONA_META[persona]?.color || '#3fb950';

    const actionsHtml = step.actions.map((action, i) => `
      <div class="action-step${completedActions[action.id] ? ' done' : ''}" id="action-${action.id}">
        <span class="action-step-check">${completedActions[action.id] ? '✅' : '⬜'}</span>
        <div style="flex:1">
          <div style="font-family:var(--font-mono);font-size:.82rem;color:var(--text)">${escHtml(action.label)}</div>
          ${completedActions[action.id] && action.result ? `<div style="color:var(--green);font-family:var(--font-mono);font-size:.75rem;margin-top:4px;white-space:pre">${escHtml(action.result)}</div>` : ''}
        </div>
        ${!completedActions[action.id] ? `<button class="btn btn-sm btn-secondary" onclick="App.executeAction('${action.id}', ${i})" style="border-color:${accentColor};color:${accentColor}">Run ▶</button>` : ''}
      </div>
    `).join('');

    stage.innerHTML = `
      <div class="action-board">
        <h4>${step.title}</h4>
        <p>${step.instructions || ''}</p>
        ${actionsHtml}
      </div>
      <p style="font-size:.8rem;color:var(--text-muted);margin-top:8px">
        💡 Click "Run ▶" to execute each step, or type the commands in the Terminal tab →
      </p>
    `;
  }

  function renderDragDrop(stage, step) {
    stagedFiles = [];

    const unstaged = step.files.filter(f => !f.stage);
    const shouldBe  = step.files.filter(f => f.shouldStage);

    stage.innerHTML = `
      <div class="concept-box" style="margin-bottom:12px">
        <h3>🖱️ ${step.title}</h3>
        <p style="color:var(--text-muted);font-size:.88rem">${step.instructions}</p>
      </div>
      <div class="activity-staging">
        <div class="staging-zone" id="zone-working"
             ondragover="event.preventDefault()" ondrop="App.dropFile(event,'working')">
          <h4>📁 Working Directory</h4>
          <div id="files-working">
            ${unstaged.map(f => `
              <div class="file-chip" draggable="true" id="file-${f.name}"
                   data-file="${f.name}" data-should="${f.shouldStage}"
                   ondragstart="App.dragStart(event)">
                📄 ${f.name}
                <span class="file-status status-${f.status}">${f.status}</span>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="staging-arrow">→</div>
        <div class="staging-zone" id="zone-staging"
             ondragover="event.preventDefault()" ondrop="App.dropFile(event,'staging')">
          <h4>📋 Staging Area</h4>
          <div id="files-staging">
            <p style="color:var(--text-dim);font-size:.8rem;padding:8px">Drop files here to stage them</p>
          </div>
        </div>
        <div class="staging-arrow">→</div>
        <div class="staging-zone" id="zone-repo" style="opacity:.5">
          <h4>🗄️ Repository</h4>
          <p style="color:var(--text-dim);font-size:.8rem;padding:8px">After git commit</p>
        </div>
      </div>
      <div id="staging-feedback" style="margin-top:12px;font-size:.85rem;color:var(--text-muted)">
        Drag files to the Staging Area to practice <code>git add</code>
      </div>
      <button class="btn btn-secondary btn-sm" onclick="App.checkStaging()" style="margin-top:10px">Check Staging ✓</button>
    `;
  }

  function renderCommitForm(stage, step) {
    const filesHtml = (step.stagedFiles || []).map(f =>
      `<div class="file-chip"><span class="file-status status-new">new</span>📄 ${f}</div>`
    ).join('');

    stage.innerHTML = `
      <div class="concept-box" style="margin-bottom:12px">
        <h3>💾 ${step.title || 'Write your commit message'}</h3>
        <p style="color:var(--text-muted);font-size:.88rem">Staged files ready to commit:</p>
        ${filesHtml}
      </div>
      <div class="commit-form">
        <label>Commit Message <span style="color:var(--red)">*</span></label>
        <input type="text" id="commit-msg-input"
               placeholder="${step.placeholder || 'Add a descriptive commit message'}"
               maxlength="72" />
        <div style="font-size:.75rem;color:var(--text-dim);margin-top:-12px;margin-bottom:12px">
          Keep under 50 chars for the subject. Imperative mood ("Add...", "Fix...", "Update...")
        </div>
        <label>Description (optional)</label>
        <textarea id="commit-desc-input" placeholder="Explain WHY this change was made..."></textarea>
        <button class="btn btn-primary" onclick="App.submitCommit('${step.achievement || ''}')">
          💾 Create Commit
        </button>
      </div>
      <div id="commit-feedback"></div>
    `;
  }

  function renderQuiz(stage, step, stepIdx) {
    const answered = quizAnswered[stepIdx] || {};

    const questionsHtml = step.questions.map((q, qi) => {
      const ans = answered[qi];
      return `
        <div class="quiz-question">
          <h4>Q${qi + 1}: ${q.q}</h4>
          <div class="quiz-options">
            ${q.options.map((opt, oi) => {
              let cls = '';
              if (ans !== undefined) {
                if (oi === q.correct) cls = 'correct';
                else if (oi === ans && ans !== q.correct) cls = 'wrong';
              } else if (ans === oi) cls = 'selected';
              return `
                <div class="quiz-option ${cls}" onclick="App.selectAnswer(${stepIdx}, ${qi}, ${oi})">
                  <span class="quiz-option-letter">${String.fromCharCode(65 + oi)}</span>
                  ${opt}
                </div>
              `;
            }).join('')}
          </div>
          ${ans !== undefined ? `
            <div class="quiz-feedback show ${ans === q.correct ? 'correct' : 'wrong'}">
              ${q.explanation}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    stage.innerHTML = `
      <div class="activity-quiz">
        ${questionsHtml}
      </div>
    `;
  }

  function renderIDE(stage, step) {
    if (step.mode === 'vscode-scm')        renderVSCodeSCM(stage, step);
    else if (step.mode === 'github-pr')    renderGitHubPR(stage, step);
    else if (step.mode === 'vscode-advanced') renderVSCodeAdvanced(stage, step);
    else if (step.mode === 'github-settings') renderGitHubSettings(stage, step);
    else if (step.mode === 'ai-commit')    renderAICommit(stage, step);
    else if (step.mode === 'ai-review')    renderAIReview(stage, step);
    else if (step.mode === 'agent-workflow')  renderAgentWorkflow(stage, step);
    else if (step.mode === 'dependabot-prs') renderDependabotPRs(stage, step);
    else renderGenericIDE(stage, step);
  }

  // ── AI Commit message comparison ──────────────
  function renderAICommit(stage, step) {
    const diffHtml = escHtml(step.diff || '').replace(/\n/g, '<br>').replace(/@@[^@]+@@/g, s => `<span style="color:var(--blue)">${s}</span>`).replace(/^\+(.*)$/gm, '<span style="color:var(--green)">+$1</span>').replace(/^-(.*)$/gm, '<span style="color:var(--red)">-$1</span>');

    const msgs = (step.aiMessages || []).map((m, i) => {
      const isBad = m.tool.includes('bad');
      const borderColor = isBad ? 'var(--red)' : i === 1 ? 'var(--purple)' : 'var(--blue)';
      const toolColor   = isBad ? 'var(--red)' : i === 1 ? 'var(--purple)' : 'var(--blue)';
      return `
        <div style="border:1px solid ${borderColor};border-radius:10px;padding:16px;background:var(--bg)">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
            <span style="font-size:1.2rem">${i === 0 ? '🐙' : i === 1 ? '🤖' : '😬'}</span>
            <span style="font-weight:600;font-size:.85rem;color:${toolColor}">${m.tool}</span>
            ${isBad ? '<span style="background:rgba(248,81,73,.15);color:var(--red);font-size:.7rem;padding:2px 8px;border-radius:100px">❌ Bad example</span>' : '<span style="background:rgba(63,185,80,.1);color:var(--green);font-size:.7rem;padding:2px 8px;border-radius:100px">✅ Good</span>'}
          </div>
          <pre style="font-family:var(--font-mono);font-size:.78rem;color:var(--text);white-space:pre-wrap;margin:0">${escHtml(m.msg)}</pre>
        </div>
      `;
    }).join('');

    stage.innerHTML = `
      <div class="concept-box" style="margin-bottom:12px">
        <h3>🤖 AI-Generated Commit Messages</h3>
        <p style="color:var(--text-muted);font-size:.88rem">The diff below — how would different tools describe it?</p>
      </div>
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:10px;padding:16px;font-family:var(--font-mono);font-size:.78rem;line-height:1.8;margin-bottom:16px;overflow-x:auto">
        ${diffHtml}
      </div>
      <div style="display:flex;flex-direction:column;gap:12px">${msgs}</div>
      <div style="margin-top:14px;background:rgba(210,168,255,.08);border:1px solid rgba(210,168,255,.2);border-radius:10px;padding:14px;font-size:.85rem;color:#d2a8ff">
        💡 The best commit message combines AI's diff-reading with your business context. Edit the AI draft — add the ticket number, the why, or the security implication it couldn't know.
      </div>
    `;
  }

  // ── AI Code Review panel ───────────────────────
  function renderAIReview(stage, step) {
    const sevColor = { critical: 'var(--red)', warning: 'var(--yellow)', suggestion: 'var(--blue)', info: 'var(--text-muted)' };
    const sevIcon  = { critical: '🔴', warning: '🟡', suggestion: '🔵', info: 'ℹ️' };

    const comments = (step.reviewComments || []).map(c => `
      <div style="border:1px solid ${sevColor[c.severity] || 'var(--border)'};border-radius:10px;padding:16px;background:var(--bg);margin-bottom:10px">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap">
          <span style="font-size:1.1rem">${c.icon}</span>
          <span style="font-weight:600;font-size:.82rem;color:var(--text-muted)">${c.tool}</span>
          <span style="background:rgba(0,0,0,.2);color:${sevColor[c.severity]};border:1px solid ${sevColor[c.severity]};font-size:.7rem;padding:2px 9px;border-radius:100px;text-transform:uppercase;font-weight:700">${sevIcon[c.severity]} ${c.severity}</span>
          ${c.file ? `<span style="font-family:var(--font-mono);font-size:.72rem;color:var(--text-dim)">${c.file}:${c.line}</span>` : ''}
        </div>
        <p style="font-size:.85rem;color:var(--text);line-height:1.65;margin-bottom:${c.suggestion ? '10px' : '0'}">${c.comment}</p>
        ${c.suggestion ? `<div style="background:rgba(63,185,80,.08);border:1px solid rgba(63,185,80,.2);border-radius:7px;padding:10px;font-family:var(--font-mono);font-size:.76rem;color:var(--green)">💡 ${escHtml(c.suggestion)}</div>` : ''}
        <div style="display:flex;gap:8px;margin-top:10px">
          <button class="btn btn-sm btn-secondary" onclick="this.textContent='✅ Resolved';this.disabled=true" style="font-size:.75rem">Mark Resolved</button>
          <button class="btn btn-sm btn-ghost" style="font-size:.75rem">View Diff</button>
        </div>
      </div>
    `).join('');

    const critCount = (step.reviewComments || []).filter(c => c.severity === 'critical').length;

    stage.innerHTML = `
      <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:16px;margin-bottom:14px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px">
        <div>
          <div style="font-weight:700;font-size:1rem;margin-bottom:4px">🔍 AI Review — ${escHtml(step.prTitle || 'Pull Request')}</div>
          <div style="font-size:.82rem;color:var(--text-muted)">${(step.reviewComments||[]).length} comments · ${critCount} critical · Reviewed in &lt;60s</div>
        </div>
        ${critCount > 0 ? `<div style="background:rgba(248,81,73,.15);color:var(--red);border:1px solid var(--red);padding:6px 14px;border-radius:100px;font-size:.8rem;font-weight:600">🔴 ${critCount} Critical issue${critCount > 1 ? 's' : ''} must be resolved</div>` : '<div style="background:rgba(63,185,80,.1);color:var(--green);border:1px solid var(--green);padding:6px 14px;border-radius:100px;font-size:.8rem">✅ No blockers</div>'}
      </div>
      ${comments}
      <p style="font-size:.78rem;color:var(--text-dim);margin-top:8px">Mark all critical issues resolved before requesting human review. AI review is a first pass — human review focuses on business logic and architecture.</p>
    `;
  }

  // ── Agentic workflow stepper ───────────────────
  function renderAgentWorkflow(stage, step) {
    const achievement = step.achievement;
    const agentSteps = step.agentSteps || [];

    const stepsHtml = agentSteps.map((s, i) => `
      <div class="action-step${completedActions['ag_'+i] ? ' done' : ''}" id="ag-step-${i}">
        <span style="min-width:22px;font-size:.8rem;font-weight:700;color:var(--text-dim)">${s.step}</span>
        <div style="flex:1">
          <div style="font-size:.85rem;font-weight:500;margin-bottom:3px">${s.action}</div>
          ${completedActions['ag_'+i] ? `<div style="font-family:var(--font-mono);font-size:.75rem;color:var(--green);white-space:pre-wrap">${escHtml(s.output)}</div>` : ''}
        </div>
        ${!completedActions['ag_'+i] ? `<button class="btn btn-sm" style="background:rgba(210,168,255,.15);border:1px solid rgba(210,168,255,.3);color:#d2a8ff;font-size:.75rem" onclick="App.runAgentStep(${i}, '${achievement||''}')">▶ Run</button>` : '<span style="color:var(--green)">✅</span>'}
      </div>
    `).join('');

    const doneCount = agentSteps.filter((_, i) => completedActions['ag_'+i]).length;

    stage.innerHTML = `
      <div style="background:rgba(210,168,255,.06);border:1px solid rgba(210,168,255,.2);border-radius:10px;padding:16px;margin-bottom:14px">
        <div style="display:flex;align-items:flex-start;gap:12px">
          <span style="font-size:1.6rem">🤖</span>
          <div>
            <div style="font-weight:700;font-size:.9rem;color:#d2a8ff;margin-bottom:4px">Agent Task</div>
            <div style="font-size:.88rem;color:var(--text);line-height:1.6">${escHtml(step.task || '')}</div>
          </div>
        </div>
        <div style="margin-top:12px">
          <div style="display:flex;justify-content:space-between;font-size:.75rem;color:var(--text-muted);margin-bottom:4px"><span>Agent progress</span><span>${doneCount}/${agentSteps.length}</span></div>
          <div style="height:4px;background:var(--bg3);border-radius:2px"><div style="height:100%;width:${(doneCount/agentSteps.length)*100}%;background:#d2a8ff;border-radius:2px;transition:width .4s"></div></div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">${stepsHtml}</div>
      <p style="font-size:.78rem;color:var(--text-dim);margin-top:12px">▶ Click Run on each step to watch the agent work. In real tools (Claude Code, Cursor) this happens automatically — you review the final diff.</p>
    `;
  }

  // ── Dependabot / Renovate PR list ─────────────
  function renderDependabotPRs(stage, step) {
    const typeIcon  = { security: '🔒', patch: '🔧', minor: '⬆️', major: '💥' };
    const typeColor = { security: 'var(--red)', patch: 'var(--green)', minor: 'var(--blue)', major: 'var(--yellow)' };

    const prs = (step.prs || []).map(pr => `
      <div style="background:var(--bg2);border:1px solid ${pr.severity === 'HIGH' ? 'var(--red)' : 'var(--border)'};border-radius:10px;padding:16px;display:flex;align-items:center;gap:14px;flex-wrap:wrap">
        <div style="min-width:36px;text-align:center;font-size:1.4rem">${typeIcon[pr.type]}</div>
        <div style="flex:1;min-width:160px">
          <div style="font-weight:600;font-size:.88rem">${pr.pkg} <span style="color:var(--text-dim)">${pr.from}</span> → <span style="color:${typeColor[pr.type]}">${pr.to}</span></div>
          <div style="font-size:.75rem;color:var(--text-muted);margin-top:2px">
            ${pr.cve ? `<span style="color:var(--red);font-weight:600">${pr.cve}</span> · ` : ''}
            ${pr.severity ? `<span style="color:var(--red)">${pr.severity} severity</span> · ` : ''}
            PR #${pr.num} · ${pr.autoMerge ? '<span style="color:var(--green)">Auto-merge ON</span>' : '<span style="color:var(--yellow)">Needs review</span>'}
          </div>
        </div>
        <div style="display:flex;gap:8px">
          ${pr.autoMerge
            ? `<button class="btn btn-sm btn-secondary" onclick="this.textContent='✅ Auto-merged';this.disabled=true;this.style.color='var(--green)'" style="font-size:.75rem">⚡ Auto-merge</button>`
            : `<button class="btn btn-sm btn-primary" onclick="this.textContent='✅ Merged';this.disabled=true" style="font-size:.75rem;background:${pr.severity==='HIGH'?'var(--red)':'var(--blue)'}">Review & Merge</button>`
          }
        </div>
      </div>
    `).join('');

    stage.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px">
        <h3 style="font-size:1rem;font-weight:700">🤖 Automated Dependency PRs</h3>
        <div style="font-size:.8rem;color:var(--text-muted)">Renovate + Dependabot · ${(step.prs||[]).length} open</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">${prs}</div>
      <div style="margin-top:14px;background:rgba(227,179,65,.07);border:1px solid rgba(227,179,65,.2);border-radius:10px;padding:14px;font-size:.82rem;color:var(--yellow)">
        🔒 <strong>Security PRs are highest priority.</strong> Merge them immediately — they fix known CVEs in your production dependencies. Patch/minor auto-merges handle themselves. Major version bumps need you to read the migration guide first.
      </div>
    `;
  }

  function renderVSCodeSCM(stage, step) {
    const files = step.changedFiles || [];
    let activeFile = files[0];

    const scmFiles = files.map(f => `
      <div class="scm-file-item" onclick="App.selectSCMFile('${f.name}')">
        <span>📄 ${f.name}</span>
        <span class="scm-status ${f.status}">${f.status}</span>
      </div>
    `).join('');

    const codeLines = (activeFile?.content || []).map(l => `
      <div class="${l.type === 'add' ? 'highlight' : ''}">
        <span class="line-num">${l.ln}</span>
        <span style="color:${l.type === 'add' ? '#3fb950' : '#d4d4d4'}">${escHtml(l.text)}</span>
      </div>
    `).join('');

    stage.innerHTML = `
      <div class="vscode-sim">
        <div class="vscode-titlebar">
          <span class="t-dot red"></span><span class="t-dot yellow"></span><span class="t-dot green"></span>
          <span class="title">my-app — VS Code</span>
        </div>
        <div class="vscode-body">
          <div class="vscode-activity-bar">
            <div class="vsc-icon active" title="Source Control">⎇</div>
            <div class="vsc-icon" title="Explorer">📁</div>
            <div class="vsc-icon" title="Search">🔍</div>
            <div class="vsc-icon" title="Extensions">🧩</div>
          </div>
          <div class="vscode-editor">
            <div class="vscode-tabs">
              ${files.map((f, i) => `<div class="vscode-tab${i===0?' active':''}">${f.name}</div>`).join('')}
            </div>
            <div class="vscode-code" id="vsc-code">${codeLines}</div>
          </div>
          <div class="vscode-scm-panel">
            <div class="scm-header">Source Control</div>
            <div class="scm-section">
              <div class="scm-section-title">Changes</div>
              ${scmFiles}
            </div>
            <textarea class="scm-input" placeholder="Message (Ctrl+Enter to commit)"></textarea>
            <button class="scm-commit-btn" onclick="App.vscodeCommit()">✓ Commit</button>
          </div>
        </div>
      </div>
      <div style="margin-top:14px">
        <h4 style="margin-bottom:10px">Steps to practice:</h4>
        ${(step.instructions || []).map((ins, i) => `
          <div class="action-step" id="vsc-step-${i}">
            <span class="action-step-check" id="vsc-check-${i}">⬜</span>
            <span style="font-size:.88rem">${ins}</span>
          </div>
        `).join('')}
      </div>
    `;

    // Auto-mark first instruction as in progress
    setTimeout(() => {
      const check = document.getElementById('vsc-check-0');
      if (check) check.textContent = '👆';
    }, 300);
  }

  function renderGitHubPR(stage, step) {
    const pr = step.prData;
    const checksHtml = pr.checks.map(c => `
      <div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border);font-size:.82rem">
        <span>${c.status === 'pass' ? '✅' : '❌'}</span>
        <span style="flex:1">${c.name}</span>
        <span style="color:${c.status === 'pass' ? 'var(--green)' : 'var(--red)'}">${c.status}</span>
      </div>
    `).join('');

    const commentsHtml = pr.comments.map(c => `
      <div style="display:flex;gap:12px;padding:14px;border:1px solid var(--border);border-radius:8px;background:var(--bg)">
        <span style="font-size:1.5rem">${c.avatar}</span>
        <div style="flex:1">
          <div style="font-weight:600;font-size:.88rem">${c.author} ${c.file ? `<span style="color:var(--text-muted);font-weight:400">on ${c.file}:${c.line}</span>` : ''}</div>
          <p style="font-size:.85rem;color:var(--text-muted);margin-top:4px;line-height:1.6">${c.text}</p>
          <button class="btn btn-sm btn-secondary" style="margin-top:8px" onclick="App.replyPRComment(this)">Reply →</button>
        </div>
      </div>
    `).join('');

    stage.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:16px">
        <!-- PR Header -->
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:20px">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
            <span style="background:rgba(63,185,80,.15);color:var(--green);border:1px solid var(--green);padding:3px 12px;border-radius:100px;font-size:.75rem;font-weight:700">OPEN</span>
            <h3 style="font-size:1.05rem">${pr.title}</h3>
          </div>
          <p style="color:var(--text-muted);font-size:.82rem">${pr.branch} → ${pr.base}</p>
        </div>

        <!-- Checks -->
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:16px">
          <h4 style="font-size:.85rem;margin-bottom:8px">✅ All checks passed</h4>
          ${checksHtml}
        </div>

        <!-- Comments -->
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:16px">
          <h4 style="font-size:.85rem;margin-bottom:12px">💬 ${pr.comments.length} comments</h4>
          <div style="display:flex;flex-direction:column;gap:10px">${commentsHtml}</div>
        </div>

        <!-- Merge -->
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:16px">
          <button class="btn btn-primary" onclick="App.mergePR(this)" style="width:100%;justify-content:center">
            🔀 Squash and Merge
          </button>
          <p style="font-size:.75rem;color:var(--text-muted);margin-top:8px;text-align:center">
            1 approval required · 2 reviewers
          </p>
        </div>
      </div>
    `;
  }

  function renderVSCodeAdvanced(stage, step) {
    const features = step.features || [];
    stage.innerHTML = `
      <div class="concept-box" style="margin-bottom:12px">
        <h3>🖥️ ${step.title}</h3>
      </div>
      ${features.map(f => `
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:16px;margin-bottom:10px;display:flex;gap:14px;align-items:flex-start">
          <span style="font-size:1.8rem">${f.icon}</span>
          <div>
            <h4 style="font-weight:600;margin-bottom:4px">${f.name}</h4>
            <p style="color:var(--text-muted);font-size:.88rem;line-height:1.6">${f.desc}</p>
          </div>
        </div>
      `).join('')}
    `;
  }

  function renderGitHubSettings(stage, step) {
    stage.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:20px">
          <h4 style="margin-bottom:14px;color:var(--orange)">🔒 Branch Protection Rules</h4>
          <div style="display:flex;flex-direction:column;gap:10px">
            ${[
              ['Require pull request before merging', true],
              [`Require ${step.settings.requiredReviewers} approvals`, true],
              ['Dismiss stale reviews on push', true],
              ['Require status checks to pass', true],
              ['Require conversation resolution', true],
              ['Block direct pushes to main', true]
            ].map(([label, on]) => `
              <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:.85rem">
                <input type="checkbox" ${on ? 'checked' : ''} onclick="this.checked=${on}" style="width:16px;height:16px;accent-color:var(--green)" />
                ${label}
              </label>
            `).join('')}
          </div>
        </div>
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:20px">
          <h4 style="margin-bottom:14px;color:var(--blue)">👤 CODEOWNERS</h4>
          <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:12px;font-family:var(--font-mono);font-size:.78rem;line-height:1.8;color:var(--green)">
            ${escHtml(step.settings.codeowners || '').replace(/\n/g, '<br>')}
          </div>
          <p style="font-size:.75rem;color:var(--text-muted);margin-top:8px">File: .github/CODEOWNERS</p>
        </div>
      </div>
      <div style="background:var(--bg2);border:1px solid var(--border);border-radius:10px;padding:16px;margin-top:16px">
        <h4 style="margin-bottom:10px">✅ Required Status Checks</h4>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          ${(step.settings.requiredChecks || []).map(c => `
            <span style="background:rgba(63,185,80,.1);border:1px solid var(--green);color:var(--green);padding:4px 14px;border-radius:100px;font-size:.8rem">${c}</span>
          `).join('')}
        </div>
      </div>
    `;
  }

  function renderGenericIDE(stage, step) {
    stage.innerHTML = `
      <div class="concept-box">
        <h3>${step.title || 'IDE Integration'}</h3>
        <p style="color:var(--text-muted)">${step.instructions || ''}</p>
      </div>
    `;
  }

  function renderConflictResolver(stage, step) {
    stage.innerHTML = `
      <div class="concept-box" style="margin-bottom:12px">
        <h3>⚔️ Resolve the Merge Conflict</h3>
        <p style="color:var(--text-muted);font-size:.88rem">${step.context}</p>
      </div>
      <div class="conflict-editor">
        <div class="conflict-file-header">📄 ${step.filename}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--border)">
          <div style="background:var(--bg2);padding:12px">
            <div style="font-size:.72rem;color:var(--blue);margin-bottom:6px;font-weight:600">◀ YOUR VERSION (HEAD)</div>
            <pre style="font-size:.8rem;color:var(--text);font-family:var(--font-mono)">${escHtml(step.ours)}</pre>
          </div>
          <div style="background:var(--bg2);padding:12px">
            <div style="font-size:.72px;color:var(--green);margin-bottom:6px;font-weight:600;font-size:.72rem">▶ INCOMING VERSION</div>
            <pre style="font-size:.8rem;color:var(--text);font-family:var(--font-mono)">${escHtml(step.theirs)}</pre>
          </div>
        </div>
      </div>
      <div style="margin-top:14px">
        <label style="display:block;font-size:.85rem;color:var(--text-muted);margin-bottom:8px">✏️ Your resolved version (remove all conflict markers):</label>
        <textarea id="conflict-resolve-input" class="conflict-textarea" rows="6"
          placeholder="Write the final version of the file here...">${escHtml(step.ours)}</textarea>
        <div style="display:flex;gap:10px;margin-top:10px;flex-wrap:wrap">
          <button class="btn btn-secondary btn-sm" onclick="App.fillConflict('ours','${encodeURIComponent(step.ours)}')">Keep Ours ◀</button>
          <button class="btn btn-secondary btn-sm" onclick="App.fillConflict('theirs','${encodeURIComponent(step.theirs)}')">Keep Theirs ▶</button>
          <button class="btn btn-secondary btn-sm" onclick="App.fillConflict('new','${encodeURIComponent(step.resolution || step.ours)}')">Suggested Resolution</button>
          <button class="btn btn-primary btn-sm" onclick="App.commitConflictResolution()">✓ Commit Merge</button>
        </div>
      </div>
    `;
  }

  function renderScenario(stage, step) {
    const severityClass = { critical: 'severity-critical', warning: 'severity-warning', info: 'severity-info' }[step.severity] || 'severity-info';

    const stepsHtml = (step.steps || []).map((s, i) => `
      <div class="action-step${completedActions['sc_' + i] ? ' done' : ''}" style="flex-direction:column;gap:8px;align-items:flex-start">
        <div style="display:flex;align-items:center;gap:10px;width:100%">
          <span style="font-weight:700;color:var(--text-muted);font-size:.8rem;min-width:20px">Step ${s.step}</span>
          <span style="flex:1;font-size:.88rem">${s.action}</span>
          ${completedActions['sc_' + i] ? '<span style="color:var(--green)">✅</span>' :
            `<button class="btn btn-sm btn-secondary" onclick="App.runScenarioStep(${i})">Run ▶</button>`}
        </div>
        <div style="background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:8px;width:100%;font-family:var(--font-mono);font-size:.78rem;color:var(--green)">
          ${escHtml(s.cmd)}
        </div>
        ${completedActions['sc_' + i] ? `<div style="color:var(--text-muted);font-size:.78rem;font-family:var(--font-mono);white-space:pre">${escHtml(s.result)}</div>` : ''}
      </div>
    `).join('');

    stage.innerHTML = `
      <div class="scenario-card">
        <div class="scenario-header">
          <span class="scenario-severity ${severityClass}">${step.severity?.toUpperCase() || 'SCENARIO'}</span>
          <span style="font-weight:600">${step.title}</span>
        </div>
        <div class="scenario-body">
          <p style="color:var(--text-muted);font-size:.88rem;margin-bottom:16px;line-height:1.7">${step.description}</p>
          <div style="display:flex;flex-direction:column;gap:12px">${stepsHtml}</div>
        </div>
      </div>
    `;
  }

  function renderChallenge(stage, step) {
    const total = step.steps?.length || 0;
    const done = Object.values(challengeCompleted).filter(Boolean).length;

    const stepsHtml = (step.steps || []).map((s, i) => {
      const isDone = challengeCompleted[s.id];
      return `
        <div class="action-step${isDone ? ' done' : ''}" id="ch-${s.id}">
          <span class="action-step-check">${isDone ? '✅' : '⬜'}</span>
          <span style="flex:1;font-size:.88rem">${s.instruction}</span>
          ${!isDone ? `<button class="btn btn-sm btn-secondary" onclick="App.completeChallenge('${s.id}')">Mark Done ✓</button>` : ''}
        </div>
      `;
    }).join('');

    stage.innerHTML = `
      <div class="concept-box" style="margin-bottom:12px">
        <h3>🏁 ${step.title || 'Challenge'}</h3>
        <div style="background:var(--bg);border-radius:8px;padding:10px;margin-top:10px">
          <div style="display:flex;justify-content:space-between;font-size:.82rem;color:var(--text-muted);margin-bottom:6px">
            <span>Progress</span><span>${done}/${total}</span>
          </div>
          <div style="height:6px;background:var(--bg3);border-radius:3px">
            <div style="height:100%;width:${(done/total)*100}%;background:var(--green);border-radius:3px;transition:width .4s"></div>
          </div>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px">${stepsHtml}</div>
      <p style="font-size:.8rem;color:var(--text-muted);margin-top:12px">
        💡 Use the Terminal tab to practice the actual commands, then mark each step done.
      </p>
    `;
  }

  // ══════════════════════════════════════════════
  //  INTERACTION HANDLERS
  // ══════════════════════════════════════════════

  function runAgentStep(idx, achievement) {
    completedActions['ag_' + idx] = true;
    const step = currentLevelData.steps[currentStepIndex];
    const s = (step.agentSteps || [])[idx];
    if (s) {
      Terminal.print('cmd', `[Agent] ${s.action}`);
      Terminal.print('out', s.output);
    }
    if (achievement) awardAchievement(achievement);
    renderStep(currentStepIndex);
  }

  function executeAction(actionId, actionIdx) {
    const step = currentLevelData.steps[currentStepIndex];
    const action = step.actions.find(a => a.id === actionId);
    if (!action) return;

    completedActions[actionId] = true;

    // Print to terminal
    const cmdPart = action.label.split(':')[1]?.trim() || action.id;
    Terminal.print('cmd', `$ ${cmdPart}`);
    if (action.result) {
      action.result.split('\n').forEach(line => Terminal.print('out', line));
    }

    // Achievement
    if (action.achievement) {
      awardAchievement(action.achievement);
    }

    renderStep(currentStepIndex);
  }

  function runScenarioStep(idx) {
    const step = currentLevelData.steps[currentStepIndex];
    const s = step.steps[idx];
    if (!s) return;

    completedActions['sc_' + idx] = true;

    Terminal.print('cmd', `$ ${s.cmd.split('\n')[0]}`);
    s.result.split('\n').forEach(l => Terminal.print('out', l));

    renderStep(currentStepIndex);
    switchVizTab('terminal');
  }

  function completeChallenge(stepId) {
    challengeCompleted[stepId] = true;
    renderStep(currentStepIndex);

    const total = currentLevelData.steps[currentStepIndex].steps?.length || 1;
    const done = Object.values(challengeCompleted).filter(Boolean).length;
    if (done === total) {
      showToast('🏁', 'Challenge Complete!');
    }
  }

  function selectAnswer(stepIdx, qi, oi) {
    if (quizAnswered[stepIdx]?.[qi] !== undefined) return;
    if (!quizAnswered[stepIdx]) quizAnswered[stepIdx] = {};
    quizAnswered[stepIdx][qi] = oi;

    const q = currentLevelData.steps[stepIdx].questions[qi];
    if (oi === q.correct) {
      showToast('✅', 'Correct!');
      if (q.achievement) awardAchievement(q.achievement);
    }

    renderStep(currentStepIndex);
  }

  function submitCommit(achievement) {
    const input = document.getElementById('commit-msg-input');
    const msg = input?.value.trim();
    if (!msg) {
      showFeedback('commit-feedback', '⚠️ Please write a commit message', false);
      return;
    }
    if (msg.length < 5) {
      showFeedback('commit-feedback', '⚠️ Commit message is too short. Be descriptive!', false);
      return;
    }
    if (msg.toLowerCase() === 'fix' || msg.toLowerCase() === 'wip' || msg.toLowerCase() === 'update') {
      showFeedback('commit-feedback', '⚠️ "' + msg + '" is too vague. What specifically did you fix/update?', false);
      return;
    }

    showFeedback('commit-feedback', `✅ Great commit! "${msg}" is clear and imperative.`, true);
    Terminal.print('cmd', `$ git commit -m "${msg}"`);
    Terminal.print('out', `[main a1b2c3d] ${msg}\n files changed`);

    if (achievement) awardAchievement(achievement);

    setTimeout(() => {
      document.getElementById('btn-next')?.click();
    }, 1200);
  }

  function dragStart(e) {
    draggedFile = e.target.closest('.file-chip')?.dataset.file;
    e.target.classList.add('dragging');
  }

  function dropFile(e, zone) {
    e.preventDefault();
    if (!draggedFile) return;

    const shouldStage = document.getElementById(`file-${draggedFile}`)?.dataset.should === 'true';

    if (zone === 'staging') {
      if (!stagedFiles.includes(draggedFile)) {
        stagedFiles.push(draggedFile);
        const chip = document.getElementById(`file-${draggedFile}`);
        if (chip) {
          document.getElementById('files-staging')?.appendChild(chip);
          chip.classList.remove('dragging');
          const p = document.querySelector('#zone-staging p');
          if (p) p.remove();
        }
      }
    } else if (zone === 'working') {
      stagedFiles = stagedFiles.filter(f => f !== draggedFile);
      const chip = document.getElementById(`file-${draggedFile}`);
      if (chip) document.getElementById('files-working')?.appendChild(chip);
    }

    draggedFile = null;
  }

  function checkStaging() {
    const step = currentLevelData.steps[currentStepIndex];
    const shouldBe = (step.files || []).filter(f => f.shouldStage).map(f => f.name);
    const correct = shouldBe.every(f => stagedFiles.includes(f));
    const noExtra = stagedFiles.every(f => shouldBe.includes(f));

    const fb = document.getElementById('staging-feedback');
    if (correct && noExtra) {
      fb.style.color = 'var(--green)';
      fb.textContent = '✅ Perfect! You staged the right files. Now you can git commit.';
      awardAchievement('first_commit');
    } else if (!correct) {
      const missing = shouldBe.filter(f => !stagedFiles.includes(f));
      fb.style.color = 'var(--red)';
      fb.textContent = `❌ Missing: ${missing.join(', ')} should be staged.`;
    } else {
      fb.style.color = 'var(--yellow)';
      fb.textContent = `⚠️ debug.log shouldn't be staged — keep logs out of commits!`;
    }
  }

  function fillConflict(mode, encoded) {
    const ta = document.getElementById('conflict-resolve-input');
    if (!ta) return;
    ta.value = decodeURIComponent(encoded);
  }

  function commitConflictResolution() {
    const ta = document.getElementById('conflict-resolve-input');
    const val = ta?.value.trim();
    if (!val) return;
    if (val.includes('<<<<<<<') || val.includes('=======') || val.includes('>>>>>>>')) {
      ta.style.borderColor = 'var(--red)';
      alert('⚠️ Remove all conflict markers (<<<<<<<, =======, >>>>>>>) before committing!');
      return;
    }

    Terminal.print('out', '✅ Conflict resolved! Running: git add app.js && git commit');
    Terminal.print('out', '[main merge-abc123] Merge feature/hello\n 1 file changed');
    awardAchievement('conflict_hero');
    showToast('⚔️', 'Conflict Resolved!');
    setTimeout(() => nextStep(), 1000);
  }

  function vscodeCommit() {
    const inp = document.querySelector('.scm-input');
    const msg = inp?.value.trim();
    if (!msg) { alert('Write a commit message first!'); return; }
    Terminal.print('cmd', `$ git commit -m "${msg}"`);
    Terminal.print('out', `[main a2b3c4d] ${msg}`);
    inp.value = '';
    showToast('💾', 'Committed via VS Code!');
  }

  function replyPRComment(btn) {
    btn.textContent = '✅ Addressed';
    btn.disabled = true;
    btn.style.color = 'var(--green)';
  }

  function mergePR(btn) {
    btn.textContent = '✅ Merged!';
    btn.disabled = true;
    btn.style.background = 'var(--green)';
    awardAchievement('pr_hero');
    showToast('🔀', 'PR Merged!');
  }

  function selectSCMFile(name) {
    Terminal.print('info', `Opened diff for ${name} in VS Code editor`);
  }

  function showHint() {
    const tip = currentLevelData?.tip;
    if (tip) alert(`💡 Hint: ${tip}`);
  }

  // ══════════════════════════════════════════════
  //  LEVEL COMPLETION
  // ══════════════════════════════════════════════
  function completeLevel() {
    const persona = currentPersona;
    const level = currentLevelData;

    if (!state.progress[persona]) {
      state.progress[persona] = { xp: 0, completedLevels: [], achievements: [] };
    }

    const prog = state.progress[persona];
    const already = prog.completedLevels.includes(level.id);

    if (!already) {
      prog.completedLevels.push(level.id);
      prog.xp = (prog.xp || 0) + level.xp;
      state.streak = (state.streak || 0) + 1;
      saveState();
    }

    // Show modal
    const modal = document.getElementById('modal-levelcomplete');
    document.getElementById('modal-lesson-name').textContent = level.title;
    document.getElementById('modal-xp').textContent = `+${already ? 0 : level.xp}`;

    // Clear and populate achievements list
    document.getElementById('modal-achievements').innerHTML = '';

    spawnConfetti();
    modal.classList.remove('hidden');
  }

  function onLevelCompleteContinue() {
    document.getElementById('modal-levelcomplete').classList.add('hidden');

    // Find next level
    const levels = GAME_DATA[currentPersona].levels;
    const idx = levels.findIndex(l => l.id === currentLevelData.id);
    const next = levels[idx + 1];

    if (next) {
      startLesson(next);
    } else {
      showScreen('worldmap');
      showToast('🏆', `${PERSONA_META[currentPersona].label} path complete!`);
    }
  }

  // ══════════════════════════════════════════════
  //  ACHIEVEMENTS
  // ══════════════════════════════════════════════
  function awardAchievement(id) {
    const persona = currentPersona;
    if (!persona) return;
    if (!state.progress[persona]) state.progress[persona] = { xp: 0, completedLevels: [], achievements: [] };
    if (state.progress[persona].achievements.includes(id)) return;

    state.progress[persona].achievements.push(id);
    saveState();

    const ach = ACHIEVEMENTS.find(a => a.id === id);
    if (ach) showToast(ach.icon, ach.name);
  }

  function showToast(icon, name) {
    const toast = document.getElementById('achievement-toast');
    document.getElementById('toast-icon').textContent = icon;
    document.getElementById('toast-name').textContent = name;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3500);
  }

  // ══════════════════════════════════════════════
  //  PROFILE SCREEN
  // ══════════════════════════════════════════════
  function renderProfile() {
    const allAchs = [];
    let totalXP = 0;
    let totalLevels = 0;

    Object.entries(state.progress).forEach(([p, prog]) => {
      if (prog) {
        totalXP += prog.xp || 0;
        totalLevels += prog.completedLevels?.length || 0;
        (prog.achievements || []).forEach(a => { if (!allAchs.includes(a)) allAchs.push(a); });
      }
    });

    const persona = currentPersona || 'beginner';
    const meta = PERSONA_META[persona];
    const level = Math.floor(totalXP / 500) + 1;

    document.getElementById('profile-name').textContent = 'Git Developer';
    document.getElementById('profile-level-label').textContent = `${meta?.label || 'Explorer'} · Level ${level}`;
    document.getElementById('profile-xp-fill').style.width = `${((totalXP % 500) / 500) * 100}%`;
    document.getElementById('profile-xp-text').textContent = `${totalXP} XP total · ${totalXP % 500}/500 to next level`;

    // Stats
    document.getElementById('profile-stats').innerHTML = `
      <div class="profile-stat"><div class="stat-value">${totalXP}</div><div class="stat-label">Total XP</div></div>
      <div class="profile-stat"><div class="stat-value">${totalLevels}</div><div class="stat-label">Levels Done</div></div>
      <div class="profile-stat"><div class="stat-value">${allAchs.length}</div><div class="stat-label">Achievements</div></div>
    `;

    // Achievements
    const grid = document.getElementById('achievements-grid');
    grid.innerHTML = ACHIEVEMENTS.map(a => {
      const unlocked = allAchs.includes(a.id);
      return `
        <div class="achievement-item ${unlocked ? 'unlocked' : 'locked'}">
          <div class="achievement-icon">${a.icon}</div>
          <div class="achievement-name">${a.name}</div>
          <div class="achievement-desc">${unlocked ? a.desc : '???'}</div>
        </div>
      `;
    }).join('');
  }

  // ══════════════════════════════════════════════
  //  VIZ TAB
  // ══════════════════════════════════════════════
  function switchVizTab(tab, btn) {
    document.querySelectorAll('.viz-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.viz-panel').forEach(p => p.classList.remove('active'));

    if (btn) btn.classList.add('active');
    else {
      document.querySelectorAll('.viz-tab').forEach(t => {
        if (t.textContent.toLowerCase() === tab) t.classList.add('active');
      });
    }

    const panel = document.getElementById(`viz-${tab}`);
    if (panel) panel.classList.add('active');

    if (tab === 'terminal') {
      setTimeout(() => document.getElementById('terminal-input')?.focus(), 50);
    }
  }

  // ══════════════════════════════════════════════
  //  TERMINAL CALLBACKS
  // ══════════════════════════════════════════════
  function onTerminalCommand(sub, args, parts) {
    // Update graph after terminal commands
    if (currentLevelData) {
      GitVisualizer.render(document.getElementById('git-svg'), currentLevelData.gitState, currentPersona);
    }
  }

  function onChallengeAction(action) {
    // Map terminal actions to challenge completions
  }

  // ══════════════════════════════════════════════
  //  HELPERS
  // ══════════════════════════════════════════════
  function showFeedback(elId, msg, success) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.style.color = success ? 'var(--green)' : 'var(--red)';
    el.style.marginTop = '8px';
    el.style.fontSize = '.85rem';
    el.textContent = msg;
  }

  function closeModal(id) {
    document.getElementById(id)?.classList.add('hidden');
  }

  function spawnConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    container.innerHTML = '';
    const colors = ['#3fb950', '#58a6ff', '#f0883e', '#e3b341', '#bc8cff'];
    for (let i = 0; i < 40; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.cssText = `
        left:${Math.random() * 100}%;
        top:${Math.random() * -20}px;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
        width:${6 + Math.random() * 8}px;
        height:${6 + Math.random() * 8}px;
        animation-delay:${Math.random() * 0.8}s;
        animation-duration:${1.5 + Math.random() * 1}s;
      `;
      container.appendChild(piece);
    }
  }

  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function resolveConflict(mode) {}
  function submitConflictResolution() {}

  // ══════════════════════════════════════════════
  //  PERSISTENCE
  // ══════════════════════════════════════════════
  function loadState() {
    try {
      const raw = localStorage.getItem('gitquest_state');
      if (raw) return JSON.parse(raw);
    } catch(e) {}
    return {
      progress: {
        beginner:     { xp: 0, completedLevels: [], achievements: [] },
        intermediate: { xp: 0, completedLevels: [], achievements: [] },
        expert:       { xp: 0, completedLevels: [], achievements: [] }
      },
      streak: 0,
      lastPersona: null
    };
  }

  function saveState() {
    try {
      localStorage.setItem('gitquest_state', JSON.stringify(state));
    } catch(e) {}
  }

  // Public API
  return {
    init, showScreen, goBack, selectPersona,
    startLesson, nextStep, prevStep, jumpToStep,
    executeAction, runScenarioStep, runAgentStep, completeChallenge,
    selectAnswer, submitCommit, showHint,
    dragStart, dropFile, checkStaging,
    fillConflict, commitConflictResolution,
    vscodeCommit, replyPRComment, mergePR, selectSCMFile,
    switchVizTab,
    awardAchievement, showToast,
    onLevelCompleteContinue, closeModal,
    onTerminalCommand, onChallengeAction,
    resolveConflict, submitConflictResolution
  };
})();

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
