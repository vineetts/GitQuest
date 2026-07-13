// ═══════════════════════════════════════════════
//  Git Energy — Main Application
// ═══════════════════════════════════════════════

const App = (() => {

  // ── State ──────────────────────────────────────
  let state = loadState();
  let currentPersona = null;
  let currentLevelData = null;
  let currentStepIndex = 0;
  let currentStepCount = 0;
  let screenHistory = ['landing'];
  let quizAnswered = {};
  let quizAttempts = {};      // { stepIdx: { qi: attemptCount } }
  let quizSkipped  = {};      // { stepIdx: true } — quiz steps skipped via Next
  let draggedFile = null;
  let stagedFiles = [];
  let completedActions = {};
  let challengeCompleted = {};

  // ── Story narrative data ──────────────────────
  const STORY_DATA = {
    beginner: {
      character: { name: 'Priya', role: 'Senior Dev', avatar: '👩‍💻' },
      arcs: [
        { upTo: 3,  title: 'Chapter 1 · First Day',        text: 'You just landed your first dev job at TechStart Inc. Priya hands you a laptop: "All code lives in Git. Don\'t break main." The adventure begins.' },
        { upTo: 7,  title: 'Chapter 2 · The Feature Branch', text: 'Your first solo feature! Priya trusts you to branch, commit, and open your first pull request. The team is watching.' },
        { upTo: 12, title: 'Chapter 3 · Team Player',       text: 'The team is growing fast. Merge conflicts, code reviews, and real collaboration — you\'re no longer just a newcomer.' }
      ],
      quotes: [
        '"Day one. Git awaits you."',
        '"You\'re getting the hang of it, rookie."',
        '"The team actually trusts your commits now."',
        '"Half the senior devs can\'t do what you just did."',
        '"🎉 Explorer complete — you\'ve earned your stripes."'
      ]
    },
    intermediate: {
      character: { name: 'Alex', role: 'Tech Lead', avatar: '🧑‍💻' },
      arcs: [
        { upTo: 3,  title: 'Chapter 1 · The Incident',       text: 'A hotfix is needed in production NOW. Alex needs you to handle it without breaking main. No pressure.' },
        { upTo: 7,  title: 'Chapter 2 · Pull Request Wars',  text: 'PRs are piling up, conflicts everywhere. Alex points at the backlog: "Clean it up. You know how." Do you?' },
        { upTo: 10, title: 'Chapter 3 · Clean History',      text: 'The big release is tomorrow. Squash, rebase, and amend — the commit history needs to tell a clean story.' }
      ],
      quotes: [
        '"Production is on fire. Can you handle it?"',
        '"Surviving the chaos. Alex is watching closely."',
        '"You\'re becoming the go-to person for Git fires."',
        '"Almost mastered the craft. One more push."',
        '"🎉 Adventurer complete — the expert path awaits."'
      ]
    },
    expert: {
      character: { name: 'Sam', role: 'Staff Engineer', avatar: '🧙‍♂️' },
      arcs: [
        { upTo: 2,  title: 'Chapter 1 · The Detective',  text: 'A regression just hit production. Sam hands you the keyboard: "Find the commit that broke it." The clock is ticking.' },
        { upTo: 5,  title: 'Chapter 2 · The Architect',  text: 'You\'re designing the Git workflow for a 50-person team. Hooks, policies, automation — all on you.' },
        { upTo: 8,  title: 'Chapter 3 · The Release',    text: 'Release day. Tags, changelogs, rollbacks, submodules. One wrong move and 10k users feel it immediately.' }
      ],
      quotes: [
        '"The regression hunt begins. Start bisecting."',
        '"You think like a senior. Sam is impressed."',
        '"The team follows your Git patterns as gospel now."',
        '"One last challenge before true mastery."',
        '"🎉 Master complete — you\'ve earned the ⚡ badge."'
      ]
    },
    innovator: {
      character: { name: 'Jordan', role: 'Principal Engineer', avatar: '🚀' },
      arcs: [
        { upTo: 3,  title: 'Chapter 1 · The Future Stack',  text: 'Jordan just returned from KubeCon. "We\'re going trunk-based, GitOps, and AI-assisted. All of it. Starting now. You\'re leading it."' },
        { upTo: 6,  title: 'Chapter 2 · The AI Co-Pilot',   text: 'Your new teammates are Claude Code, Copilot, and Cursor. You\'re learning to direct AI agents across your codebase.' },
        { upTo: 9,  title: 'Chapter 3 · The Platform',      text: 'You\'re not just writing code — you\'re building the systems that let 200 engineers ship safely every day.' },
        { upTo: 11, title: 'Chapter 4 · The Frontier',      text: 'MCP, merge queues, autonomous Dependabot. Welcome to the cutting edge of how elite teams ship software.' }
      ],
      quotes: [
        '"The future of Git development awaits you."',
        '"Trunk-based and thriving. Jordan approves."',
        '"Your AI agents are shipping PRs while you sleep."',
        '"Building platforms others dream about. Legendary."',
        '"🎉 Innovator complete — you\'re at the frontier."'
      ]
    }
  };

  // ── Persona color map ─────────────────────────
  const PERSONA_META = {
    beginner:     { label: 'Explorer',    color: '#3fb950', nextPersona: 'intermediate' },
    intermediate: { label: 'Adventurer',  color: '#58a6ff', nextPersona: 'expert' },
    expert:       { label: 'Master',      color: '#f0883e', nextPersona: 'innovator' },
    innovator:    { label: 'Innovator',   color: '#d2a8ff', nextPersona: null }
  };

  // ── Init ──────────────────────────────────────
  function init() {
    showScreen('landing');
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
    if (name === 'persona')  renderPersonaRecommendation();
  }

  function goBack() {
    screenHistory.pop();
    const prev = screenHistory[screenHistory.length - 1] || 'landing';
    showScreen(prev);
  }

  // ══════════════════════════════════════════════
  //  LIFE STAGE SELECTION
  // ══════════════════════════════════════════════
  function selectLifeStage(stage) {
    state.lifeStage = stage;
    saveState();
    showScreen('persona');
  }

  // ══════════════════════════════════════════════
  //  PERSONA SELECTION
  // ══════════════════════════════════════════════
  function selectPersona(persona) {
    currentPersona = persona;
    state.lastPersona = persona;
    if (!state.progress[persona]) {
      state.progress[persona] = { xp: 0, completedLevels: [], skippedLevels: [], achievements: [] };
    }
    saveState();
    showScreen('worldmap');
  }

  // ══════════════════════════════════════════════
  //  PATH RECOMMENDATION QUIZ
  // ══════════════════════════════════════════════
  const PATH_QUIZ = [
    {
      q: 'How would you describe your experience with Git?',
      answers: [
        { text: "I've never used it — what even is a repository?", scores: { beginner: 3 } },
        { text: "I know git add, commit and push — that's about it", scores: { beginner: 1, intermediate: 2 } },
        { text: 'I use branches, merges and pull requests regularly', scores: { intermediate: 1, expert: 2 } },
        { text: 'I mentor others and handle Git incidents in production', scores: { expert: 3, innovator: 1 } }
      ]
    },
    {
      q: "What's your comfort level with the command line?",
      answers: [
        { text: "I've never opened a terminal", scores: { beginner: 3 } },
        { text: 'I can run basic commands if I follow instructions', scores: { beginner: 1, intermediate: 2 } },
        { text: "I'm comfortable — I use it daily", scores: { intermediate: 1, expert: 2 } },
        { text: 'Very comfortable — I script, alias and automate things', scores: { expert: 2, innovator: 2 } }
      ]
    },
    {
      q: 'Which of these sounds most like you right now?',
      answers: [
        { text: "I don't know what version control even solves", scores: { beginner: 3 } },
        { text: 'I get merge conflicts and my stomach drops', scores: { intermediate: 3 } },
        { text: 'Production broke — I need to bisect or roll back, fast', scores: { expert: 3 } },
        { text: 'I want AI agents and GitOps pipelines working together', scores: { innovator: 3 } }
      ]
    },
    {
      q: "What's your goal right now?",
      answers: [
        { text: 'Understand the absolute basics, no pressure', scores: { beginner: 2 } },
        { text: 'Work smoothly in a team without breaking things', scores: { intermediate: 2 } },
        { text: 'Handle high-stakes incidents and lead Git practices', scores: { expert: 2 } },
        { text: 'Adopt the cutting-edge AI + DevOps workflow', scores: { innovator: 2 } }
      ]
    }
  ];

  const PQ_ICON = { beginner: '🌱', intermediate: '🔀', expert: '⚡', innovator: '🚀' };
  const PQ_RESULT_DESC = {
    beginner:     "You're starting fresh — Explorer builds the mental model from zero with visual, no-pressure lessons.",
    intermediate: "You've got the basics down — Adventurer tackles the team workflows that trip people up: conflicts, PRs, rebasing.",
    expert:       "You're Git-fluent already — Master goes deep on internals, incidents, and the judgment calls senior engineers make.",
    innovator:    "You're ready for the frontier — Innovator covers the AI-era workflows elite teams are shipping with right now."
  };

  let pqIndex = 0;
  let pqScores = {};
  let pqRecommendation = null;

  function startPathQuiz() {
    pqIndex = 0;
    pqScores = { beginner: 0, intermediate: 0, expert: 0, innovator: 0 };
    showScreen('pathquiz');
    renderPathQuizQuestion();
  }

  function renderPathQuizQuestion() {
    document.getElementById('pq-result').classList.remove('active');
    document.getElementById('pq-question-area').classList.add('active');

    const total = PATH_QUIZ.length;
    document.getElementById('pq-dots').innerHTML = PATH_QUIZ.map((_, i) =>
      `<span class="pq-dot ${i < pqIndex ? 'done' : ''} ${i === pqIndex ? 'active' : ''}"></span>`
    ).join('');

    const item = PATH_QUIZ[pqIndex];
    document.getElementById('pq-counter').textContent = `Question ${pqIndex + 1} of ${total}`;
    document.getElementById('pq-question-text').textContent = item.q;
    document.getElementById('pq-answers').innerHTML = item.answers.map((a, i) =>
      `<button class="pq-answer" onclick="App.answerPathQuiz(${i})">${a.text}</button>`
    ).join('');
  }

  function answerPathQuiz(i) {
    const scores = PATH_QUIZ[pqIndex].answers[i].scores;
    Object.keys(scores).forEach(k => { pqScores[k] = (pqScores[k] || 0) + scores[k]; });
    pqIndex++;
    if (pqIndex >= PATH_QUIZ.length) {
      finishPathQuiz();
    } else {
      renderPathQuizQuestion();
    }
  }

  function finishPathQuiz() {
    const order = ['beginner', 'intermediate', 'expert', 'innovator'];
    let best = order[0];
    order.forEach(k => { if ((pqScores[k] || 0) > (pqScores[best] || 0)) best = k; });
    pqRecommendation = best;

    document.getElementById('pq-dots').innerHTML = PATH_QUIZ.map(() => '<span class="pq-dot done"></span>').join('');
    document.getElementById('pq-question-area').classList.remove('active');
    document.getElementById('pq-result').classList.add('active');

    const meta = PERSONA_META[best];
    document.getElementById('pq-result-card').className = 'pq-result-card ' + best;
    document.getElementById('pq-result-badge').textContent = PQ_ICON[best];
    document.getElementById('pq-result-tag').textContent = meta.label;
    document.getElementById('pq-result-title').textContent = `We recommend ${meta.label}`;
    document.getElementById('pq-result-desc').textContent = PQ_RESULT_DESC[best];
    document.getElementById('pq-result-cta').textContent = `Start ${meta.label} →`;
  }

  function acceptPathQuizResult() {
    if (pqRecommendation) selectPersona(pqRecommendation);
  }

  function renderPersonaRecommendation() {
    document.querySelectorAll('.persona-card').forEach(c => {
      c.classList.remove('pq-recommended');
      const ribbon = c.querySelector('.pq-ribbon');
      if (ribbon) ribbon.remove();
    });
    if (!pqRecommendation) return;
    const card = document.querySelector('.persona-card.' + pqRecommendation);
    if (!card) return;
    card.classList.add('pq-recommended');
    const ribbon = document.createElement('div');
    ribbon.className = 'pq-ribbon';
    ribbon.textContent = '✨ Recommended for you';
    card.prepend(ribbon);
  }

  // ══════════════════════════════════════════════
  //  RESET PATH / RESET MODULE
  // ══════════════════════════════════════════════
  function promptResetPath() {
    const persona = currentPersona;
    const label = PERSONA_META[persona]?.label || 'this path';
    document.getElementById('modal-reset-path-name').textContent =
      `Reset the "${label}" path — all XP and completed lessons for this path will be erased. Other paths and achievements are unaffected.`;
    document.getElementById('modal-reset-path').classList.remove('hidden');
  }

  function confirmResetPath() {
    const persona = currentPersona;
    if (state.progress[persona]) {
      state.progress[persona] = { xp: 0, completedLevels: [], skippedLevels: [], achievements: [] };
      saveState();
    }
    closeModal('modal-reset-path');
    renderWorldMap();
  }

  function promptResetLevel(levelId, event) {
    if (event) event.stopPropagation();
    const data   = GAME_DATA[currentPersona];
    const level  = data?.levels.find(l => l.id === levelId);
    const name   = level?.title || levelId;
    const prog   = state.progress[currentPersona];
    if (!prog) return;

    if (!confirm(`Reset "${name}"? Your progress for this lesson will be cleared.`)) return;

    prog.completedLevels = prog.completedLevels.filter(id => id !== levelId);
    if (prog.skippedLevels) prog.skippedLevels = prog.skippedLevels.filter(id => id !== levelId);

    // Deduct XP for that lesson
    const xpToRemove = level?.xp || 0;
    prog.xp = Math.max(0, (prog.xp || 0) - xpToRemove);
    saveState();
    renderWorldMap();
  }

  // ══════════════════════════════════════════════
  //  STORY ARC CARD
  // ══════════════════════════════════════════════
  function renderStoryArcCard(persona, progress, data) {
    let card = document.getElementById('story-arc-card');
    if (!card) {
      card = document.createElement('div');
      card.id = 'story-arc-card';
      const map = document.getElementById('level-map');
      map.parentNode.insertBefore(card, map);
    }

    const color      = PERSONA_META[persona]?.color || '#3fb950';
    const totalLevels = data.levels.length;
    const doneCount   = progress.completedLevels.length;
    const pct         = Math.round((doneCount / totalLevels) * 100);

    // ── Try rich JUNGLE_STORY first ─────────────
    const jungle    = (typeof JUNGLE_STORY !== 'undefined') ? JUNGLE_STORY[persona] : null;
    const lifeStageKey = state.lifeStage || 'working';

    if (jungle) {
      // Life-stage specific data; fallback to 'working' if that life stage has no data
      const jungleLS = jungle[lifeStageKey] || jungle.working || {};
      const ch     = (typeof getJungleChapter !== 'undefined')
                       ? getJungleChapter(persona, progress.completedLevels, lifeStageKey)
                       : jungleLS.chapters?.[0];
      const comp   = jungleLS.companion || jungle.working?.companion || { name: 'Guide', role: '', avatar: '🧑‍💻', color };

      // Progress dots — one per chapter
      const chapterDots = (jungleLS.chapters || []).map(c => {
        const done = c.levels.every(id => progress.completedLevels.includes(id));
        const active = c === ch;
        return `<span class="arc-chapter-dot ${done ? 'done' : active ? 'active' : ''}" style="${active ? `background:${color}` : done ? `background:${color}88` : ''}"></span>`;
      }).join('');

      // Level progress trail — small emoji dots for each lesson
      const trailDots = data.levels.map(lvl => {
        const done = progress.completedLevels.includes(lvl.id);
        return `<span class="arc-trail-dot ${done ? 'done' : ''}" style="${done ? `background:${color}` : ''}"></span>`;
      }).join('');

      card.innerHTML = `
        <div class="story-arc-card jungle-card" style="--arc-color:${color}">
          <div class="jungle-zone-banner">
            <span class="jungle-zone-emoji">${jungle.zoneEmoji}</span>
            <div class="jungle-zone-info">
              <div class="jungle-zone-name">${escHtml(jungle.zone)}</div>
              <div class="jungle-zone-atm">${escHtml(jungle.atmosphere)}</div>
            </div>
          </div>

          <div class="jungle-chapter-row">
            <div class="jungle-chapter-dots">${chapterDots}</div>
            <div class="jungle-chapter-title" style="color:${color}">${escHtml(ch?.title || '')}</div>
          </div>

          <p class="jungle-narrative">${escHtml(ch?.narrative || '')}</p>

          <div class="jungle-companion-row">
            <div class="jungle-companion-avatar" style="border-color:${color}">${comp.avatar}</div>
            <div class="jungle-companion-info">
              <span class="jungle-companion-name" style="color:${color}">${comp.name}</span>
              <span class="jungle-companion-role">${comp.role}</span>
            </div>
          </div>

          <div class="arc-progress jungle-progress">
            <div class="arc-trail">${trailDots}</div>
            <div class="arc-bar-wrap">
              <div class="arc-bar-fill" style="width:${pct}%;background:${color}"></div>
            </div>
            <span class="arc-pct">${doneCount}/${totalLevels} lessons · ${pct}%</span>
          </div>
        </div>
      `;
      return;
    }

    // ── Fallback to STORY_DATA ───────────────────
    const story = STORY_DATA[persona];
    if (!story) { card.innerHTML = ''; return; }

    const arc   = story.arcs.find(a => doneCount <= a.upTo) || story.arcs[story.arcs.length - 1];
    const qIdx  = Math.min(Math.floor((doneCount / totalLevels) * (story.quotes.length - 1)), story.quotes.length - 1);
    const quote = story.quotes[qIdx];

    card.innerHTML = `
      <div class="story-arc-card" style="--arc-color:${color}">
        <div class="arc-character">
          <div class="arc-avatar">${story.character.avatar}</div>
          <div class="arc-char-info">
            <div class="arc-char-name">${story.character.name}</div>
            <div class="arc-char-role">${story.character.role}</div>
          </div>
        </div>
        <div class="arc-body">
          <div class="arc-chapter">${arc.title}</div>
          <p class="arc-narrative">${arc.text}</p>
          <div class="arc-quote">${quote}</div>
        </div>
        <div class="arc-progress">
          <div class="arc-bar-wrap">
            <div class="arc-bar-fill" style="width:${pct}%;background:${color}"></div>
          </div>
          <span class="arc-pct">${doneCount}/${totalLevels} lessons · ${pct}%</span>
        </div>
      </div>
    `;
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

    // Story arc card
    renderStoryArcCard(persona, progress, data);

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

      const skipped   = progress.skippedLevels?.includes(lvl.id);
      const item = document.createElement('div');
      item.className = `level-item ${persona}${completed ? ' completed' : ''}${locked ? ' locked' : ''}${skipped ? ' skipped' : ''}`;
      if (!completed && prevCompleted && !locked) item.classList.add('current');

      item.innerHTML = `
        <div class="level-number">${completed ? '✓' : skipped ? '~' : lvl.num}</div>
        <div class="level-info">
          <h4>${lvl.icon} ${lvl.title}</h4>
          <p>${lvl.subtitle}</p>
          ${skipped ? '<span class="skipped-badge">Quiz skipped — ½ XP</span>' : ''}
        </div>
        <div class="level-meta">
          <span class="level-xp">${skipped ? `+${Math.floor(lvl.xp/2)} XP` : `+${lvl.xp} XP`}</span>
          <span class="level-type-badge">${lvl.type}</span>
          ${completed || skipped ? `<button class="btn-level-reset" title="Reset this lesson" onclick="App.promptResetLevel('${lvl.id}', event)">↺</button>` : ''}
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
    quizAnswered     = {};
    quizAttempts     = {};
    quizSkipped      = {};
    completedActions = {};
    stagedFiles      = [];

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
      case 'crisis':            renderCrisis(stage, step); break;
      case 'hotfix':            renderHotfix(stage, step); break;
      case 'terminal-practice': renderTerminalPractice(stage, step); break;
      default:                  stage.innerHTML = `<p>${step.type} step</p>`; break;
    }

    // Update git graph for this step
    if (step.gitState) {
      GitVisualizer.render(document.getElementById('git-svg'), step.gitState, currentPersona);
    } else if (currentLevelData.gitState) {
      GitVisualizer.render(document.getElementById('git-svg'), currentLevelData.gitState, currentPersona);
    }

    // Panel hints — guide user's eyes to the right panel
    addPanelHints(step);
  }

  // ── Panel hints ──────────────────────────────────────────
  // Prepends a tp-pointer-style banner at the TOP of the lesson stage,
  // directing the learner at the correct right-panel tab (Graph or Terminal).
  // terminal-practice is excluded — it already has its own embedded tp-pointer.
  function addPanelHints(step) {
    const stage = document.getElementById('lesson-stage');
    if (!stage) return;

    // Steps where the Terminal tab is the primary action pane
    const TERMINAL_TYPES = new Set(['challenge', 'commitform', 'conflictresolver', 'hotfix', 'crisis']);
    // Steps where the Git Graph is the primary visual
    // quiz/dragdrop/ide/scenario have their own UI — no graph hint needed
    const GRAPH_TYPES    = new Set(['story', 'concept', 'visual', 'interactive']);

    const wantsTerminal = TERMINAL_TYPES.has(step.type);
    const wantsGraph    = GRAPH_TYPES.has(step.type) && !!(step.gitState || currentLevelData?.gitState);

    if (wantsTerminal) {
      const hint = document.createElement('div');
      hint.className = 'tp-pointer';
      hint.innerHTML = `💻 Try these commands in the <strong>Terminal tab →</strong> on the right. Watch what Git prints back — those messages are real.`;
      stage.prepend(hint);
      pulseTab('terminal');
    } else if (wantsGraph) {
      const hint = document.createElement('div');
      hint.className = 'tp-pointer graph-pointer';
      hint.innerHTML = `👉 Watch the <strong>Git Graph →</strong> on the right — it updates as you progress. See how commits and branches connect.`;
      stage.prepend(hint);
      pulseTab('graph');
    }
  }

  // Briefly highlight the relevant viz tab so the learner notices it
  function pulseTab(which) {
    const tabs = document.querySelectorAll('.viz-tab');
    tabs.forEach(t => t.classList.remove('tab-attention'));
    const target = Array.from(tabs).find(t => t.getAttribute('onclick')?.includes(which));
    if (!target) return;
    target.classList.add('tab-attention');
    setTimeout(() => target.classList.remove('tab-attention'), 4000);
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
    const story     = STORY_DATA[currentPersona];
    const lifeStage = state.lifeStage || 'working';
    const levelId   = currentLevelData?.id || '';
    const key       = `${currentPersona}_${levelId}_${currentStepIndex}`;

    // ── Priority 1: life-stage override ──────────
    const lsOverride = (typeof LIFESTAGE_CONTEXTS !== 'undefined')
      ? LIFESTAGE_CONTEXTS?.[lifeStage]?.[key]
      : null;

    // ── Priority 2: jungle story level data (life-stage aware) ──
    const jungleData  = (typeof JUNGLE_STORY !== 'undefined')
      ? JUNGLE_STORY[currentPersona]
      : null;
    const jungleLS    = jungleData ? (jungleData[lifeStage] || jungleData.working || {}) : {};
    const jungleLvl   = jungleLS?.levels?.[levelId] || null;

    // ── Resolve character ─────────────────────────
    // Jungle companion overrides the generic STORY_DATA character
    const jungleChar = jungleLS?.companion || jungleData?.working?.companion || null;
    const char       = lsOverride?.character
                     || (jungleChar ? { name: jungleChar.name, role: jungleChar.role, avatar: jungleChar.avatar } : null)
                     || story?.character
                     || { name: 'Guide', role: '', avatar: '🧑‍💻' };

    const color = PERSONA_META[currentPersona]?.color || '#3fb950';

    // ── Resolve context text ──────────────────────
    // Jungle 'before' text provides immersive scene-setting; 'mission' is the companion's direct dialogue.
    // life-stage override takes highest priority if present.
    const sceneText  = lsOverride?.context || jungleLvl?.before || step.context || '';
    const missionTxt = jungleLvl?.mission || step.objective || '';

    // ── Scene location badge (jungle only) ───────
    const locationBadge = jungleLvl?.location ? `
      <div class="story-location-badge" style="border-color:${color}40;color:${color}">
        <span>${jungleLvl.scene || jungleData.zoneEmoji}</span>
        <span>${escHtml(jungleLvl.location)}</span>
      </div>` : '';

    stage.innerHTML = `
      <div class="stage-story-v2">
        ${locationBadge}
        <div class="story-scene-title">${escHtml(step.title)}</div>

        <div class="story-bubble-row">
          <div class="story-char-col">
            <div class="story-avatar" style="border-color:${color}">${char.avatar}</div>
            <div class="story-char-name" style="color:${color}">${char.name}</div>
            <div class="story-char-role">${char.role}</div>
          </div>
          <div class="story-bubble" style="border-color:${color}20;background:${color}06">
            <div class="story-bubble-tail" style="border-right-color:${color}20"></div>
            <p class="story-bubble-text" id="story-typewriter"></p>
          </div>
        </div>

        ${missionTxt ? `
          <div class="story-objective-v2 jungle-mission" style="border-left-color:${color}">
            <span class="obj-icon">🎯</span>
            <span class="obj-text">${escHtml(missionTxt)}</span>
          </div>
        ` : ''}

        <div class="story-dots">
          ${currentLevelData.steps.map((_, i) =>
            `<div class="story-dot ${i < currentStepIndex ? 'done' : i === currentStepIndex ? 'active' : ''}" style="${i === currentStepIndex ? `background:${color}` : ''}"></div>`
          ).join('')}
        </div>
      </div>
    `;

    // Typewriter effect on the scene narrative
    typewriterEffect('story-typewriter', sceneText, 22);
  }

  function typewriterEffect(elId, text, speed) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.textContent = '';
    let i = 0;
    const tick = () => {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(tick, speed);
      }
    };
    tick();
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

    // Life-stage personalised example (from LIFESTAGE_EXAMPLES in data-commands.js)
    const lifeStage = state.lifeStage || 'working';
    const levelId   = currentLevelData?.id || '';
    const lsKey     = `${currentPersona}_${levelId}_${currentStepIndex}`;
    const lsText    = (typeof LIFESTAGE_EXAMPLES !== 'undefined')
      ? LIFESTAGE_EXAMPLES[lifeStage]?.[lsKey]
      : null;
    const lsIcons   = { school: '🏫', uni: '🎓', learner: '🌱', working: '💼' };
    const lsLabels  = { school: 'In Your Class', uni: 'In Your Team', learner: 'In Your Projects', working: 'In Your Job' };
    const lsExampleHtml = lsText ? `
      <div class="ls-example-box">
        <div class="ls-example-badge">${lsIcons[lifeStage] || '👤'} ${lsLabels[lifeStage] || 'Your World'}</div>
        <p class="ls-example-text">${escHtml(lsText)}</p>
      </div>
    ` : '';

    stage.innerHTML = `
      <div class="concept-box">
        <h3>${step.icon || '📚'} ${step.title}</h3>
        <div class="concept-text">${step.body.replace(/\n/g, '<br>')}</div>
      </div>
      ${diagramHtml}
      ${lsExampleHtml}
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
    const answered  = quizAnswered[stepIdx]  || {};
    const attempts  = quizAttempts[stepIdx]  || {};
    const color     = PERSONA_META[currentPersona]?.color || '#3fb950';

    const questionsHtml = step.questions.map((q, qi) => {
      const ans         = answered[qi];
      const tryCount    = attempts[qi] || 0;
      const isRevealed  = tryCount === 99;
      const isDone      = ans !== undefined;
      const isCorrect   = isDone && ans === q.correct && !isRevealed;

      // Attempt dots (3 max, filled = used attempt)
      const dotsHtml = !isDone ? `
        <div class="quiz-attempts">
          ${[0,1,2].map(i => `<span class="attempt-dot ${i < tryCount ? 'used' : ''}"></span>`).join('')}
          <span class="attempt-label">${3 - Math.min(tryCount, 3)} attempt${3 - Math.min(tryCount, 3) !== 1 ? 's' : ''} left</span>
        </div>` : '';

      // Hint logic (show after 1st wrong, stronger after 2nd)
      let hintHtml = '';
      if (!isDone && tryCount >= 1) {
        const hint = tryCount === 1
          ? (q.hint || `💡 Hint: Think about the command reference on the left panel.`)
          : (q.hint2 || q.hint || `💡 Stronger hint: The answer relates to "${q.options[q.correct].slice(0, 30)}…"`);
        hintHtml = `<div class="quiz-hint">${escHtml(hint)}</div>`;
      }

      return `
        <div class="quiz-question">
          <h4>Q${qi + 1}: ${q.q}</h4>
          ${dotsHtml}
          ${hintHtml}
          <div class="quiz-options">
            ${q.options.map((opt, oi) => {
              let cls = '';
              if (isDone) {
                if (oi === q.correct)                       cls = 'correct';
                else if (oi === ans && !isRevealed)         cls = 'wrong';
              }
              const disabled = isDone ? 'style="pointer-events:none"' : '';
              return `
                <div class="quiz-option ${cls}" ${disabled} onclick="App.selectAnswer(${stepIdx}, ${qi}, ${oi})">
                  <span class="quiz-option-letter">${String.fromCharCode(65 + oi)}</span>
                  ${opt}
                </div>
              `;
            }).join('')}
          </div>
          ${isDone ? `
            <div class="quiz-feedback show ${isCorrect ? 'correct' : isRevealed ? 'revealed' : 'wrong'}">
              ${isRevealed ? `<strong>Answer revealed after 3 attempts.</strong><br>` : ''}
              ${q.explanation}
              ${(!isCorrect && !isRevealed && q.wrongConsequences?.[ans]) ? `
                <div class="quiz-consequence">
                  <span class="consequence-label">⚠️ Real-world consequence:</span>
                  ${escHtml(q.wrongConsequences[ans])}
                </div>` : ''}
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    stage.innerHTML = `<div class="activity-quiz">${questionsHtml}</div>`;
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
    `;
  }

  // ══════════════════════════════════════════════
  // ══════════════════════════════════════════════
  //  TERMINAL PRACTICE RENDERER
  // ══════════════════════════════════════════════

  let terminalTasks     = [];
  let terminalTasksDone = [];
  let pendingBlockerIdx = -1;   // index of blocking task when pre-req choice is pending

  function renderTerminalPractice(stage, step) {
    terminalTasks     = step.tasks || [];
    terminalTasksDone = new Array(terminalTasks.length).fill(false);

    const color     = PERSONA_META[currentPersona]?.color || '#3fb950';
    const lifeStage = state.lifeStage || 'working';
    const context   = step.contexts?.[lifeStage] || step.context || '';

    const tasksHtml = terminalTasks.map((t, i) => `
      <div class="tp-task" id="tp-task-${i}">
        <div class="tp-task-check" id="tp-check-${i}">⬜</div>
        <div class="tp-task-body">
          <div class="tp-task-instruction">${escHtml(t.instruction)}</div>
          <code class="tp-task-cmd">${escHtml(t.command)}</code>
          <div class="tp-task-hint hidden" id="tp-hint-${i}">💡 ${escHtml(t.hint || '')}</div>
          <div class="tp-task-result hidden" id="tp-result-${i}" style="color:var(--green);font-size:.8rem;margin-top:4px">${escHtml(t.successMsg || '✅ Done!')}</div>
        </div>
        <button class="btn btn-sm btn-secondary tp-hint-btn" onclick="App.showTPHint(${i})" style="border-color:${color};color:${color}">Hint</button>
      </div>
    `).join('');

    stage.innerHTML = `
      <div class="tp-card">
        <div class="tp-header">
          <span class="tp-badge" style="background:${color}20;border:1px solid ${color}40;color:${color}">⌨️ COMMAND PRACTICE</span>
          <h3 class="tp-title">${escHtml(step.title)}</h3>
        </div>
        <div class="tp-context">${escHtml(context)}</div>
        <div class="tp-pointer">👇 Type each command below directly in the <strong>Terminal tab →</strong> on the right. Watch what Git prints back — those messages are real.</div>
        <div class="tp-tasks">${tasksHtml}</div>
        <div class="tp-progress-wrap">
          <div class="tp-progress-bar" id="tp-progress-bar" style="width:0%;background:${color}"></div>
        </div>
        <div id="tp-progress-label" class="tp-progress-label">0 / ${terminalTasks.length} completed</div>
        <div class="tp-complete hidden" id="tp-complete" style="border-color:${color}40">
          🎉 All commands completed! You can move to the next step.
        </div>
      </div>
    `;

    // Auto-switch to terminal tab
    switchVizTab('terminal', document.querySelector('.viz-tab[onclick*="terminal"]'));
  }

  function checkTerminalTask(rawCmd) {
    if (!terminalTasks.length) return;

    // Normalise: trim, collapse internal whitespace
    const norm = rawCmd.trim().replace(/\s+/g, ' ');

    // ── Pre-req check ───────────────────────────────────────────
    // If the typed command matches a LATER task but earlier tasks are still
    // pending, offer an interactive choice: continue anyway or scroll back.
    let skippedAhead = false;
    terminalTasks.forEach((task, i) => {
      if (terminalTasksDone[i]) return;
      const expected = task.command.trim().replace(/\s+/g, ' ');
      const prefix   = expected.split(' ').slice(0, 3).join(' ');
      const matches  = norm === expected || (task.acceptPartial && norm.startsWith(prefix));

      if (matches) {
        const firstPending = terminalTasks.findIndex((_, j) => j < i && !terminalTasksDone[j]);
        if (firstPending !== -1) {
          const blocker = terminalTasks[firstPending];
          pendingBlockerIdx = firstPending;
          // Delegate the choice message to Terminal so it can gate "continue"/"back"
          Terminal.blockWithChoice(rawCmd, blocker, firstPending);
          // Flash the blocking task in the UI
          const el = document.getElementById(`tp-task-${firstPending}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            el.classList.add('tp-highlight');
            setTimeout(() => el.classList.remove('tp-highlight'), 2000);
          }
          skippedAhead = true;
        }
      }
    });
    if (skippedAhead) return;

    // ── Normal task matching ────────────────────────────────────
    terminalTasks.forEach((task, i) => {
      if (terminalTasksDone[i]) return;
      const expected = task.command.trim().replace(/\s+/g, ' ');
      let matched = norm === expected;
      if (!matched && task.acceptPartial) {
        if (!expected.includes(' && ')) {
          const prefix = expected.split(' ').slice(0, 3).join(' ');
          matched = norm.startsWith(prefix);
        }
      }
      if (matched) markTaskDone(i);
    });
  }

  // Mark a single task index as done and update UI + progress bar
  function markTaskDone(i) {
    if (terminalTasksDone[i]) return; // already done
    terminalTasksDone[i] = true;
    const checkEl  = document.getElementById(`tp-check-${i}`);
    const resultEl = document.getElementById(`tp-result-${i}`);
    const taskEl   = document.getElementById(`tp-task-${i}`);
    if (checkEl)  checkEl.textContent = '✅';
    if (resultEl) resultEl.classList.remove('hidden');
    if (taskEl)   taskEl.classList.add('tp-done');

    const done  = terminalTasksDone.filter(Boolean).length;
    const total = terminalTasks.length;
    const bar   = document.getElementById('tp-progress-bar');
    const label = document.getElementById('tp-progress-label');
    if (bar)   bar.style.width = `${(done / total) * 100}%`;
    if (label) label.textContent = `${done} / ${total} completed`;

    if (done === total) {
      document.getElementById('tp-complete')?.classList.remove('hidden');
      showToast('⌨️', 'Command Practice Complete!');
    }
  }

  // Called by Terminal when the user types "continue" after a skip-ahead warning.
  // Re-runs the original command through the task tracker, bypassing the pre-req guard.
  function forceCompleteTask(rawCmd) {
    if (!terminalTasks.length) return;
    const norm = rawCmd.trim().replace(/\s+/g, ' ');
    terminalTasks.forEach((task, i) => {
      if (terminalTasksDone[i]) return;
      const expected = task.command.trim().replace(/\s+/g, ' ');
      let matched = norm === expected;
      if (!matched && task.acceptPartial) {
        const prefix = expected.split(' ').slice(0, 3).join(' ');
        matched = norm.startsWith(prefix);
      }
      if (matched) markTaskDone(i);
    });
  }

  // Called by Terminal when the user types "back" after a skip-ahead warning.
  // Scrolls to and highlights the blocking task.
  function scrollToBlockingTask() {
    const el = document.getElementById(`tp-task-${pendingBlockerIdx}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('tp-highlight');
      setTimeout(() => el.classList.remove('tp-highlight'), 2000);
    }
    pendingBlockerIdx = -1;
  }

  function showTPHint(i) {
    document.getElementById(`tp-hint-${i}`)?.classList.remove('hidden');
  }

  // ══════════════════════════════════════════════
  //  CRISIS & HOTFIX RENDERERS
  // ══════════════════════════════════════════════

  function renderCrisis(stage, step) {
    const urgencyColor = step.urgency === 'high' ? 'var(--red)' : 'var(--orange)';
    const urgencyLabel = step.urgency === 'high' ? '🔴 HIGH SEVERITY' : '🟠 MEDIUM SEVERITY';

    const choicesHtml = (step.choices || []).map((c, i) => `
      <button class="crisis-choice" id="crisis-choice-${i}"
              onclick="App.selectCrisisChoice(${i})"
              style="text-align:left">
        <div class="crisis-choice-label"><code>${escHtml(c.label)}</code></div>
        <div class="crisis-choice-desc">${escHtml(c.desc)}</div>
      </button>
    `).join('');

    stage.innerHTML = `
      <div class="crisis-card">
        <div class="crisis-banner" style="background:${urgencyColor}20;border-color:${urgencyColor}">
          <span class="crisis-badge" style="background:${urgencyColor}">${urgencyLabel}</span>
          <h3 class="crisis-title">${step.title}</h3>
        </div>
        <div class="crisis-situation">
          <div class="crisis-situation-label">📟 SITUATION</div>
          <p class="crisis-situation-text" id="crisis-typewriter"></p>
        </div>
        ${step.clue ? `
          <div class="crisis-clue">
            <span>💡</span> <span>${escHtml(step.clue)}</span>
          </div>
        ` : ''}
        <div class="crisis-question">What do you do?</div>
        <div class="crisis-choices" id="crisis-choices">${choicesHtml}</div>
        <div class="crisis-outcome hidden" id="crisis-outcome"></div>
      </div>
    `;

    typewriterEffect('crisis-typewriter', step.situation || '', 18);
  }

  function selectCrisisChoice(idx) {
    const step = currentLevelData.steps[currentStepIndex];
    const choice = (step.choices || [])[idx];
    if (!choice) return;

    // Disable all buttons
    document.querySelectorAll('.crisis-choice').forEach((btn, i) => {
      btn.disabled = true;
      if (i === idx) btn.classList.add(`crisis-selected-${choice.outcome}`);
    });

    const outcomeEl = document.getElementById('crisis-outcome');
    const isCorrect = choice.outcome === 'correct';
    const isDanger  = choice.outcome === 'danger';

    const icon  = isCorrect ? '✅' : isDanger ? '⚠️' : '❌';
    const label = isCorrect ? 'RESOLVED' : isDanger ? 'RISKY MOVE' : 'WRONG CHOICE';
    const color = isCorrect ? 'var(--green)' : isDanger ? 'var(--orange)' : 'var(--red)';

    outcomeEl.innerHTML = `
      <div class="crisis-outcome-inner" style="border-color:${color}">
        <div class="crisis-outcome-header" style="color:${color}">${icon} ${label}</div>
        <p class="crisis-outcome-text">${escHtml(choice.result)}</p>
        ${!isCorrect ? `<button class="btn btn-sm btn-secondary crisis-retry" onclick="App.retryCrisis()">↺ Try a different approach</button>` : `<div class="crisis-xp-bonus" style="color:${color}">+25 XP Bonus for correct resolution!</div>`}
      </div>
    `;
    outcomeEl.classList.remove('hidden');

    if (isCorrect) {
      const prog = state.progress[currentPersona];
      if (prog) { prog.xp = (prog.xp || 0) + 25; saveState(); }
      showToast('🚨', 'Incident Resolved!');
    }
  }

  function retryCrisis() {
    renderStep(currentStepIndex);
  }

  function renderHotfix(stage, step) {
    const color = PERSONA_META[currentPersona]?.color || '#3fb950';

    const stepsHtml = (step.steps || []).map((s, i) => `
      <div class="hotfix-step" id="hotfix-step-${i}">
        <div class="hotfix-step-num">${i + 1}</div>
        <div class="hotfix-step-body">
          <code class="hotfix-cmd">${escHtml(s.cmd)}</code>
          <div class="hotfix-desc">${escHtml(s.desc)}</div>
        </div>
        <button class="hotfix-run btn btn-sm" id="hotfix-btn-${i}"
                onclick="App.runHotfixStep(${i})" style="border-color:${color};color:${color}">
          Run ▶
        </button>
      </div>
    `).join('');

    stage.innerHTML = `
      <div class="hotfix-card">
        <div class="hotfix-banner">
          <span class="hotfix-fire">🔥</span>
          <div>
            <div class="hotfix-label">HOTFIX RUNBOOK</div>
            <h3 class="hotfix-title">${escHtml(step.title)}</h3>
          </div>
        </div>
        <div class="hotfix-scenario">${escHtml(step.scenario)}</div>
        <div class="hotfix-steps">${stepsHtml}</div>
        <div class="hotfix-outcome hidden" id="hotfix-outcome">
          <div class="hotfix-outcome-inner">
            <div class="hotfix-outcome-icon">✅</div>
            <p>${escHtml(step.outcome)}</p>
          </div>
        </div>
      </div>
    `;
  }

  function runHotfixStep(idx) {
    const step = currentLevelData.steps[currentStepIndex];
    const s = (step.steps || [])[idx];
    if (!s) return;

    const btn  = document.getElementById(`hotfix-btn-${idx}`);
    const row  = document.getElementById(`hotfix-step-${idx}`);
    if (btn)  { btn.textContent = '✓'; btn.disabled = true; btn.style.color = 'var(--green)'; btn.style.borderColor = 'var(--green)'; }
    if (row)  row.classList.add('hotfix-done');

    Terminal.print('cmd', s.cmd);

    // Check if all steps done
    const total = step.steps.length;
    const doneCount = document.querySelectorAll('.hotfix-done').length;
    if (doneCount >= total) {
      document.getElementById('hotfix-outcome').classList.remove('hidden');
      showToast('🔥', 'Hotfix Complete!');
    }
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
    // Already answered correctly — lock it
    if (quizAnswered[stepIdx]?.[qi] !== undefined) return;

    const q        = currentLevelData.steps[stepIdx].questions[qi];
    const isCorrect = oi === q.correct;

    if (!quizAttempts[stepIdx])    quizAttempts[stepIdx] = {};
    if (!quizAttempts[stepIdx][qi]) quizAttempts[stepIdx][qi] = 0;
    quizAttempts[stepIdx][qi]++;

    if (isCorrect) {
      if (!quizAnswered[stepIdx]) quizAnswered[stepIdx] = {};
      quizAnswered[stepIdx][qi] = oi;
      showToast('✅', 'Correct!');
      if (q.achievement) awardAchievement(q.achievement);
    } else {
      const attempts = quizAttempts[stepIdx][qi];
      if (attempts >= 3) {
        // Force-reveal after 3 wrong attempts
        if (!quizAnswered[stepIdx]) quizAnswered[stepIdx] = {};
        quizAnswered[stepIdx][qi] = q.correct; // mark as "revealed"
        quizAttempts[stepIdx][qi] = 99; // sentinel: revealed
      }
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
    const level   = currentLevelData;

    if (!state.progress[persona]) {
      state.progress[persona] = { xp: 0, completedLevels: [], skippedLevels: [], achievements: [] };
    }

    const prog    = state.progress[persona];
    const already = prog.completedLevels.includes(level.id) || prog.skippedLevels?.includes(level.id);

    // Work out if any quiz steps were skipped
    const quizSteps = level.steps
      .map((s, i) => ({ s, i }))
      .filter(({ s }) => s.type === 'quiz');
    const anyQuizSkipped = quizSteps.some(({ i }) => !quizAnswered[i] || Object.keys(quizAnswered[i]).length === 0);
    const fullXP   = level.xp;
    const earnedXP = anyQuizSkipped ? Math.floor(fullXP / 2) : fullXP;

    if (!already) {
      if (anyQuizSkipped) {
        if (!prog.skippedLevels) prog.skippedLevels = [];
        prog.skippedLevels.push(level.id);
      } else {
        prog.completedLevels.push(level.id);
        // If previously skipped, remove from skipped and award remaining XP
        prog.skippedLevels = (prog.skippedLevels || []).filter(id => id !== level.id);
      }
      prog.xp = (prog.xp || 0) + earnedXP;
      state.streak = (state.streak || 0) + 1;
      saveState();
    }

    const modal = document.getElementById('modal-levelcomplete');
    document.getElementById('modal-lesson-name').textContent = level.title;
    document.getElementById('modal-xp').textContent = already ? '+0' : `+${earnedXP}`;

    // Show skip notice if applicable
    const achEl = document.getElementById('modal-achievements');
    achEl.innerHTML = (!already && anyQuizSkipped)
      ? `<div class="modal-skip-notice">⚠️ Quiz skipped — you earned <strong>${earnedXP} XP</strong> (half). Come back to complete the quiz for the other <strong>${fullXP - earnedXP} XP</strong>.</div>`
      : '';

    // ── Jungle story beat ─────────────────────────
    const storyEl = document.getElementById('modal-story-beat');
    if (storyEl) {
      const lsKey      = state.lifeStage || 'working';
      const jungle     = (typeof JUNGLE_STORY !== 'undefined') ? JUNGLE_STORY[persona] : null;
      const jungleLS   = jungle ? (jungle[lsKey] || jungle.working || {}) : {};
      const jungleLvl  = jungleLS?.levels?.[level.id];
      const color      = PERSONA_META[persona]?.color || '#3fb950';

      if (jungle && jungleLvl?.after) {
        // Check if this level completes a chapter
        const nowCompleted = [...(prog.completedLevels || [])];
        const chComplete = (typeof isChapterComplete !== 'undefined')
          ? isChapterComplete(persona, level.id, nowCompleted, lsKey)
          : null;

        const chapterBanner = chComplete ? `
          <div class="story-beat-chapter" style="border-color:${color};background:${color}10">
            <span class="story-beat-ch-scene">${chComplete.scene}</span>
            <div>
              <div class="story-beat-ch-title" style="color:${color}">${escHtml(chComplete.title)} — Complete!</div>
              <div class="story-beat-ch-msg">${escHtml(chComplete.unlockMsg)}</div>
            </div>
          </div>` : '';

        const compAvatar = jungleLS.companion?.avatar || jungle.working?.companion?.avatar || '🧑‍💻';
        storyEl.innerHTML = `
          ${chapterBanner}
          <div class="story-beat-quote" style="border-left-color:${color}">
            <span class="story-beat-avatar">${compAvatar}</span>
            <span class="story-beat-text">${escHtml(jungleLvl.after)}</span>
          </div>
        `;
        storyEl.classList.remove('hidden');
      } else {
        storyEl.classList.add('hidden');
        storyEl.innerHTML = '';
      }
    }

    spawnConfetti();
    modal.classList.remove('hidden');
  }

  function goToMap() {
    closeModal('modal-levelcomplete');
    showScreen('worldmap');
  }

  function promptRestartLesson() {
    const name = currentLevelData?.title || 'this lesson';
    document.getElementById('modal-restart-lesson-name').textContent =
      `Reset "${name}" — your step progress resets to the beginning. Overall XP and other completed lessons are unaffected.`;
    document.getElementById('modal-restart-lesson').classList.remove('hidden');
  }

  function confirmRestartLesson() {
    closeModal('modal-restart-lesson');
    quizAnswered     = {};
    quizAttempts     = {};
    quizSkipped      = {};
    completedActions = {};
    stagedFiles      = [];
    challengeCompleted = {};
    renderStep(0);
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
    // Note: checkTerminalTask is called from terminal.js execute() for ALL commands (git + shell)
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
        beginner:     { xp: 0, completedLevels: [], skippedLevels: [], achievements: [] },
        intermediate: { xp: 0, completedLevels: [], skippedLevels: [], achievements: [] },
        expert:       { xp: 0, completedLevels: [], skippedLevels: [], achievements: [] }
      },
      streak: 0,
      lastPersona: null,
      lifeStage: 'working'
    };
  }

  function saveState() {
    try {
      localStorage.setItem('gitquest_state', JSON.stringify(state));
    } catch(e) {}
  }

  function resetGame() {
    document.getElementById('modal-reset').classList.remove('hidden');
  }

  function confirmReset() {
    localStorage.removeItem('gitquest_state');
    state = loadState();
    closeModal('modal-reset');
    showScreen('landing');
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
    resolveConflict, submitConflictResolution,
    resetGame, confirmReset,
    goToMap,
    promptRestartLesson, confirmRestartLesson,
    promptResetPath, confirmResetPath, promptResetLevel,
    selectLifeStage,
    startPathQuiz, answerPathQuiz, acceptPathQuizResult,
    selectCrisisChoice, retryCrisis,
    runHotfixStep,
    checkTerminalTask, showTPHint, forceCompleteTask, scrollToBlockingTask
  };
})();

// Boot
document.addEventListener('DOMContentLoaded', () => App.init());
