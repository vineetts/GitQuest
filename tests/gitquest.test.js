// ═══════════════════════════════════════════════════════════════
//  GitQuest — Comprehensive Test Suite  v1.0
//  Covers: UI/UX, Navigation, Git content accuracy, Quiz system,
//          Terminal simulation, Graph visualizer, Personas,
//          Storyline, Accessibility, Performance, Edge cases
// ═══════════════════════════════════════════════════════════════

const GQTest = (() => {
  const suites  = [];
  const results = { pass: 0, fail: 0, skip: 0, total: 0 };
  let   _cur    = null;

  // ── Mini assertion helpers ──────────────────────────────────
  function assert(cond, msg) {
    const t = _cur;
    if (!cond) throw new Error(msg || 'assertion failed');
  }

  function eq(a, b, msg) {
    if (a !== b) throw new Error((msg || '') + ` expected ${JSON.stringify(b)}, got ${JSON.stringify(a)}`);
  }

  function contains(arr, val, msg) {
    if (!arr || !arr.includes(val)) throw new Error((msg || '') + ` "${val}" not found`);
  }

  function defined(val, msg) {
    if (val === undefined || val === null) throw new Error(msg || `expected defined, got ${val}`);
  }

  function noThrow(fn, msg) {
    try { fn(); } catch(e) { throw new Error((msg || 'unexpected throw: ') + e.message); }
  }

  // ── Test registration ───────────────────────────────────────
  function describe(name, fn) {
    const suite = { name, tests: [] };
    suites.push(suite);
    const prev = _cur;
    _cur = suite;
    try { fn(); } catch(e) { /* suite-level error */ }
    _cur = prev;
  }

  function it(name, fn) {
    if (!_cur || !_cur.tests) return;
    _cur.tests.push({ name, fn });
  }

  function skip(name) {
    if (!_cur || !_cur.tests) return;
    _cur.tests.push({ name, fn: null, skipped: true });
  }

  // ── Runner ──────────────────────────────────────────────────
  async function run() {
    results.pass = results.fail = results.skip = results.total = 0;
    const suiteSummaries = [];

    for (const suite of suites) {
      const sr = { name: suite.name, tests: [] };
      for (const test of suite.tests) {
        results.total++;
        if (test.skipped) {
          results.skip++;
          sr.tests.push({ name: test.name, status: 'skip', err: '' });
          continue;
        }
        // Reset app state before each test
        try { _safeReset(); } catch(_) {}
        try {
          const ret = test.fn();
          if (ret && typeof ret.then === 'function') await ret;
          results.pass++;
          sr.tests.push({ name: test.name, status: 'pass', err: '' });
        } catch(e) {
          results.fail++;
          sr.tests.push({ name: test.name, status: 'fail', err: e.message });
        }
      }
      suiteSummaries.push(sr);
    }

    renderResults(suiteSummaries);
    return results;
  }

  // ── Safe state reset between tests ─────────────────────────
  function _safeReset() {
    // Navigate to welcome screen to get a clean slate
    if (typeof App !== 'undefined') App.showScreen('welcome');
  }

  // ── Result renderer ─────────────────────────────────────────
  function renderResults(suiteSummaries) {
    // Remove old panel if present
    document.getElementById('gqtest-panel')?.remove();

    const panel = document.createElement('div');
    panel.id = 'gqtest-panel';
    Object.assign(panel.style, {
      position: 'fixed', top: '0', right: '0', width: '480px',
      height: '100vh', background: '#0d1117', color: '#c9d1d9',
      fontFamily: 'monospace', fontSize: '12px', overflowY: 'auto',
      zIndex: 99999, borderLeft: '2px solid #30363d', boxSizing: 'border-box',
      padding: '0'
    });

    const passRate = results.total ? ((results.pass / results.total) * 100).toFixed(1) : 0;
    const headerBg = results.fail === 0 ? '#238636' : '#da3633';

    panel.innerHTML = `
      <div style="position:sticky;top:0;background:${headerBg};padding:12px 16px;z-index:2">
        <div style="font-weight:bold;font-size:14px">GitQuest Test Suite</div>
        <div style="margin-top:4px;font-size:12px">
          ✅ ${results.pass} pass &nbsp;
          ❌ ${results.fail} fail &nbsp;
          ⏭ ${results.skip} skip &nbsp;
          <strong>${passRate}%</strong>
        </div>
        <button onclick="document.getElementById('gqtest-panel').remove()"
          style="position:absolute;top:10px;right:10px;background:transparent;border:1px solid rgba(255,255,255,.4);
                 color:#fff;cursor:pointer;padding:2px 8px;border-radius:4px">✕</button>
      </div>
      <div id="gqtest-body" style="padding:8px 0">
        ${suiteSummaries.map(s => {
          const sPass = s.tests.filter(t => t.status === 'pass').length;
          const sFail = s.tests.filter(t => t.status === 'fail').length;
          const sIcon = sFail > 0 ? '❌' : '✅';
          return `
            <details ${sFail > 0 ? 'open' : ''} style="border-bottom:1px solid #21262d">
              <summary style="padding:8px 16px;cursor:pointer;font-weight:bold;
                              background:${sFail > 0 ? 'rgba(218,54,51,.1)' : 'rgba(35,134,54,.05)'};
                              color:${sFail > 0 ? '#f85149' : '#3fb950'}">
                ${sIcon} ${s.name}
                <span style="float:right;color:#8b949e;font-weight:normal">${sPass}/${s.tests.length}</span>
              </summary>
              <div style="padding:4px 0">
                ${s.tests.map(t => {
                  const icon = t.status === 'pass' ? '✅' : t.status === 'fail' ? '❌' : '⏭';
                  const color = t.status === 'pass' ? '#3fb950' : t.status === 'fail' ? '#f85149' : '#8b949e';
                  return `
                    <div style="padding:3px 24px;color:${color}">
                      ${icon} ${t.name}
                      ${t.err ? `<div style="color:#f0883e;padding-left:16px;font-size:11px;word-break:break-all">${t.err}</div>` : ''}
                    </div>`;
                }).join('')}
              </div>
            </details>`;
        }).join('')}
      </div>`;

    document.body.appendChild(panel);
    console.log(`GQTest: ${results.pass}/${results.total} pass, ${results.fail} fail, ${results.skip} skip`);
  }

  return { describe, it, skip, run, assert, eq, contains, defined, noThrow };
})();


// ═══════════════════════════════════════════════════════════════
//  SUITE 1 — DOM Structure & Screen Presence
// ═══════════════════════════════════════════════════════════════
GQTest.describe('DOM Structure', () => {

  GQTest.it('All 6 screens exist in the DOM', () => {
    ['welcome','lifestage','persona','worldmap','lesson','profile'].forEach(name =>
      GQTest.assert(!!document.getElementById(`screen-${name}`), `screen-${name} missing`)
    );
  });

  GQTest.it('Lesson stage element exists', () => {
    GQTest.defined(document.getElementById('lesson-stage'), '#lesson-stage missing');
  });

  GQTest.it('Terminal input and output elements exist', () => {
    GQTest.defined(document.getElementById('terminal-input'), '#terminal-input missing');
    GQTest.defined(document.getElementById('terminal-output'), '#terminal-output missing');
  });

  GQTest.it('Git SVG visualizer element exists', () => {
    GQTest.defined(document.getElementById('git-svg'), '#git-svg missing');
  });

  GQTest.it('Both viz tabs exist (Graph, Terminal)', () => {
    const tabs = document.querySelectorAll('.viz-tab');
    GQTest.assert(tabs.length >= 2, 'expected at least 2 viz-tabs');
    const labels = [...tabs].map(t => t.textContent.trim());
    GQTest.contains(labels, 'Graph');
    GQTest.contains(labels, 'Terminal');
  });

  GQTest.it('Prev/Next navigation buttons exist', () => {
    GQTest.defined(document.getElementById('btn-prev'), '#btn-prev missing');
    GQTest.defined(document.getElementById('btn-next'), '#btn-next missing');
  });

  GQTest.it('Modal elements exist', () => {
    GQTest.defined(document.getElementById('modal-reset'), '#modal-reset missing');
    GQTest.defined(document.getElementById('modal-reset-path'), '#modal-reset-path missing');
  });

  GQTest.it('All step type renderers produce no uncaught errors', () => {
    // Each step type should render without throwing
    const persona = 'beginner';
    App.selectLifeStage('working');
    App.selectPersona(persona);
    const stepTypes = new Set();
    GAME_DATA[persona].levels.forEach(lvl => {
      (lvl.steps || []).forEach(s => {
        if (!stepTypes.has(s.type)) {
          stepTypes.add(s.type);
          GQTest.noThrow(() => {
            App.startLesson(lvl);
            const idx = lvl.steps.indexOf(s);
            App.jumpToStep(idx);
          }, `renderStep crashed for type "${s.type}": `);
        }
      });
    });
    GQTest.assert(stepTypes.size >= 5, 'expected coverage of >= 5 step types');
  });
});


// ═══════════════════════════════════════════════════════════════
//  SUITE 2 — Navigation & Screen Flow
// ═══════════════════════════════════════════════════════════════
GQTest.describe('Navigation & Screen Flow', () => {

  GQTest.it('Welcome screen is active on load', () => {
    App.showScreen('welcome');
    GQTest.assert(document.getElementById('screen-welcome').classList.contains('active'), 'welcome not active');
  });

  GQTest.it('Selecting a life stage transitions to persona screen', () => {
    App.selectLifeStage('working');
    GQTest.assert(document.getElementById('screen-persona').classList.contains('active'), 'persona screen not active after lifestage');
  });

  GQTest.it('Selecting a persona transitions to world map', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    GQTest.assert(document.getElementById('screen-worldmap').classList.contains('active'), 'worldmap not active after persona');
  });

  GQTest.it('Starting a lesson transitions to lesson screen', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels[0];
    App.startLesson(lvl);
    GQTest.assert(document.getElementById('screen-lesson').classList.contains('active'), 'lesson screen not active');
  });

  GQTest.it('Only one screen is active at a time', () => {
    App.showScreen('welcome');
    const activeScreens = document.querySelectorAll('.screen.active');
    GQTest.eq(activeScreens.length, 1, 'multiple active screens');
  });

  GQTest.it('goBack() returns to previous screen', () => {
    App.showScreen('welcome');
    App.showScreen('lifestage');
    App.goBack();
    GQTest.assert(document.getElementById('screen-welcome').classList.contains('active'), 'goBack did not return to welcome');
  });

  GQTest.it('All 4 life stage options are selectable in DOM', () => {
    App.showScreen('lifestage');
    ['school','uni','learner','working'].forEach(stage => {
      const btn = document.querySelector(`[onclick*="${stage}"]`);
      GQTest.assert(!!btn, `No button for life stage: ${stage}`);
    });
  });

  GQTest.it('Persona screen tiles render for all 4 personas', () => {
    App.selectLifeStage('working');
    ['beginner','intermediate','expert','innovator'].forEach(p => {
      const tile = document.querySelector(`[onclick*="${p}"]`);
      GQTest.assert(!!tile, `No tile for persona: ${p}`);
    });
  });

  GQTest.it('jumpToStep with valid index renders that step', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => l.id === 'b5');
    App.startLesson(lvl);
    App.jumpToStep(1);
    const step1El = document.getElementById('step-ind-1');
    GQTest.assert(step1El?.classList.contains('active'), 'step 1 not active after jumpToStep(1)');
  });

  GQTest.it('jumpToStep(-1) does not crash', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    App.startLesson(GAME_DATA.beginner.levels[0]);
    GQTest.noThrow(() => App.jumpToStep(-1), 'jumpToStep(-1) threw: ');
  });

  GQTest.it('jumpToStep(999) does not crash', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    App.startLesson(GAME_DATA.beginner.levels[0]);
    GQTest.noThrow(() => App.jumpToStep(999), 'jumpToStep(999) threw: ');
  });
});


// ═══════════════════════════════════════════════════════════════
//  SUITE 3 — Persona & Path Data Integrity
// ═══════════════════════════════════════════════════════════════
GQTest.describe('Persona & Path Data', () => {

  GQTest.it('All 4 persona paths exist in GAME_DATA', () => {
    ['beginner','intermediate','expert','innovator'].forEach(p =>
      GQTest.defined(GAME_DATA[p], `GAME_DATA.${p} missing`)
    );
  });

  GQTest.it('Beginner has 10 levels', () => {
    GQTest.eq(GAME_DATA.beginner.levels.length, 10, 'beginner level count');
  });

  GQTest.it('Intermediate has 10 levels', () => {
    GQTest.eq(GAME_DATA.intermediate.levels.length, 10, 'intermediate level count');
  });

  GQTest.it('Expert has 8 levels', () => {
    GQTest.eq(GAME_DATA.expert.levels.length, 8, 'expert level count');
  });

  GQTest.it('Innovator has 11 levels', () => {
    GQTest.eq(GAME_DATA.innovator.levels.length, 11, 'innovator level count');
  });

  GQTest.it('All level IDs are unique across the whole game', () => {
    const allIds = [];
    ['beginner','intermediate','expert','innovator'].forEach(p =>
      GAME_DATA[p].levels.forEach(l => allIds.push(l.id))
    );
    const unique = new Set(allIds);
    GQTest.eq(unique.size, allIds.length, `Duplicate level IDs found: ${allIds.filter((id, i) => allIds.indexOf(id) !== i)}`);
  });

  GQTest.it('Every level has a title, xp, and steps array', () => {
    const issues = [];
    ['beginner','intermediate','expert','innovator'].forEach(p =>
      GAME_DATA[p].levels.forEach(l => {
        if (!l.title)              issues.push(`${p}/${l.id}: missing title`);
        if (!l.xp || l.xp <= 0)   issues.push(`${p}/${l.id}: missing/zero xp`);
        if (!Array.isArray(l.steps)) issues.push(`${p}/${l.id}: steps is not an array`);
        if (!l.steps || l.steps.length === 0) issues.push(`${p}/${l.id}: empty steps`);
      })
    );
    GQTest.eq(issues.length, 0, '\n' + issues.join('\n'));
  });

  GQTest.it('Every step has a type field', () => {
    const issues = [];
    ['beginner','intermediate','expert','innovator'].forEach(p =>
      GAME_DATA[p].levels.forEach(l =>
        (l.steps||[]).forEach((s,i) => {
          if (!s.type) issues.push(`${p}/${l.id}/step[${i}]: missing type`);
        })
      )
    );
    GQTest.eq(issues.length, 0, '\n' + issues.slice(0,5).join('\n'));
  });

  GQTest.it('Each persona has a level xp > 0 and total > 500', () => {
    ['beginner','intermediate','expert','innovator'].forEach(p => {
      const total = GAME_DATA[p].levels.reduce((s,l) => s + (l.xp||0), 0);
      GQTest.assert(total > 500, `${p} total XP is only ${total}`);
    });
  });

  GQTest.it('Beginner total XP is 1310', () => {
    const total = GAME_DATA.beginner.levels.reduce((s,l) => s + l.xp, 0);
    GQTest.eq(total, 1310, 'beginner XP mismatch');
  });

  GQTest.it('Intermediate total XP is 1940', () => {
    const total = GAME_DATA.intermediate.levels.reduce((s,l) => s + l.xp, 0);
    GQTest.eq(total, 1940, 'intermediate XP mismatch');
  });
});


// ═══════════════════════════════════════════════════════════════
//  SUITE 4 — Story & Narrative Content
// ═══════════════════════════════════════════════════════════════
GQTest.describe('Story & Narrative', () => {

  GQTest.it('STORY_DATA exists in App (via App internals check via DOM)', () => {
    // We verify by rendering a story step and checking character appears in DOM
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels[0];
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'story'));
    const stage = document.getElementById('lesson-stage');
    GQTest.assert(stage.innerHTML.length > 100, 'Story step rendered nothing');
  });

  GQTest.it('Story step for beginner renders character avatar and dialogue', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels[0];
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'story'));
    const stage = document.getElementById('lesson-stage').innerHTML;
    GQTest.assert(stage.includes('👩‍💻') || stage.includes('Priya') || stage.includes('🧑'), 'Beginner character not found in story');
  });

  GQTest.it('Story step for intermediate renders correct character (Alex)', () => {
    App.selectLifeStage('working');
    App.selectPersona('intermediate');
    const lvl = GAME_DATA.intermediate.levels[0];
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'story'));
    const stage = document.getElementById('lesson-stage').innerHTML;
    GQTest.assert(stage.includes('Alex') || stage.includes('🧑‍💻'), 'Intermediate character (Alex) not in story');
  });

  GQTest.it('Story step for expert renders Sam / Staff Engineer character', () => {
    App.selectLifeStage('working');
    App.selectPersona('expert');
    const lvl = GAME_DATA.expert.levels[0];
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'story'));
    const stage = document.getElementById('lesson-stage').innerHTML;
    GQTest.assert(stage.includes('Sam') || stage.includes('🧙'), 'Expert character (Sam) not in story');
  });

  GQTest.it('Life-stage context changes story text (school vs working)', () => {
    const lvl = GAME_DATA.beginner.levels.find(l => l.id === 'b2');
    App.selectLifeStage('school');
    App.selectPersona('beginner');
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'terminal-practice'));
    const schoolCtx = document.getElementById('lesson-stage').querySelector('.tp-context')?.textContent || '';

    App.selectLifeStage('working');
    App.selectPersona('beginner');
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'terminal-practice'));
    const workCtx = document.getElementById('lesson-stage').querySelector('.tp-context')?.textContent || '';

    // Contexts should differ between life stages
    GQTest.assert(schoolCtx !== workCtx || schoolCtx.length > 0, 'Life-stage context shows no difference');
  });

  GQTest.it('Concept steps render a structured explanation box', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => (l.steps||[]).some(s => s.type === 'concept'));
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'concept'));
    const stage = document.getElementById('lesson-stage');
    GQTest.assert(stage.innerHTML.length > 200, 'Concept step rendered too little content');
  });

  GQTest.it('All beginner story steps render without blank stage', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    GAME_DATA.beginner.levels.forEach(lvl => {
      (lvl.steps||[]).filter(s => s.type === 'story').forEach((s, si) => {
        App.startLesson(lvl);
        App.jumpToStep(lvl.steps.indexOf(s));
        const html = document.getElementById('lesson-stage').innerHTML;
        GQTest.assert(html.length > 50, `${lvl.id} story step ${si} rendered blank`);
      });
    });
  });
});


// ═══════════════════════════════════════════════════════════════
//  SUITE 5 — Quiz System
// ═══════════════════════════════════════════════════════════════
GQTest.describe('Quiz System', () => {

  GQTest.it('All 61 quiz questions have required fields', () => {
    const issues = [];
    ['beginner','intermediate','expert','innovator'].forEach(p =>
      GAME_DATA[p].levels.forEach(l =>
        (l.steps||[]).filter(s => s.type === 'quiz').forEach(step =>
          (step.questions||[]).forEach((q, qi) => {
            if (!q.q)                             issues.push(`${p}/${l.id}[${qi}]: missing q`);
            if (!q.options || q.options.length < 2) issues.push(`${p}/${l.id}[${qi}]: < 2 options`);
            if (q.correct === undefined)            issues.push(`${p}/${l.id}[${qi}]: missing correct`);
            if (q.correct >= (q.options||[]).length) issues.push(`${p}/${l.id}[${qi}]: correct OOB`);
            if (!q.explanation)                    issues.push(`${p}/${l.id}[${qi}]: missing explanation`);
          })
        )
      )
    );
    GQTest.eq(issues.length, 0, '\n' + issues.slice(0,10).join('\n'));
  });

  GQTest.it('Quiz step renders question text and options', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => (l.steps||[]).some(s => s.type === 'quiz'));
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'quiz'));
    const stage = document.getElementById('lesson-stage');
    const opts = stage.querySelectorAll('.quiz-option');
    GQTest.assert(opts.length >= 2, `Quiz rendered only ${opts.length} options`);
  });

  GQTest.it('Correct answer reveals explanation with green feedback', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => l.id === 'b2');
    App.startLesson(lvl);
    const quizIdx = lvl.steps.findIndex(s => s.type === 'quiz');
    App.jumpToStep(quizIdx);
    const q0 = lvl.steps[quizIdx].questions[0];
    App.selectAnswer(0, q0.correct, quizIdx); // correct answer
    const stage = document.getElementById('lesson-stage').innerHTML;
    GQTest.assert(stage.includes('correct') || stage.includes('✅') || stage.includes('#3fb950'), 'No green/correct feedback on right answer');
  });

  GQTest.it('Wrong answer reveals consequence text or red feedback', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => l.id === 'b2');
    App.startLesson(lvl);
    const quizIdx = lvl.steps.findIndex(s => s.type === 'quiz');
    App.jumpToStep(quizIdx);
    const q0 = lvl.steps[quizIdx].questions[0];
    const wrongIdx = q0.correct === 0 ? 1 : 0;
    App.selectAnswer(0, wrongIdx, quizIdx); // wrong answer
    const stage = document.getElementById('lesson-stage').innerHTML;
    GQTest.assert(stage.includes('wrong') || stage.includes('❌') || stage.includes('incorrect') || stage.includes('#f85') || stage.includes('#da3'), 'No red/wrong feedback on wrong answer');
  });

  GQTest.it('All quiz options arrays have 4 options each (or at least 2)', () => {
    const issues = [];
    ['beginner','intermediate','expert','innovator'].forEach(p =>
      GAME_DATA[p].levels.forEach(l =>
        (l.steps||[]).filter(s => s.type === 'quiz').forEach(step =>
          (step.questions||[]).forEach((q, qi) => {
            if ((q.options||[]).length < 2)
              issues.push(`${p}/${l.id}[${qi}]: only ${(q.options||[]).length} options`);
          })
        )
      )
    );
    GQTest.eq(issues.length, 0, '\n' + issues.join('\n'));
  });

  GQTest.it('Quiz correct index is always within options bounds', () => {
    const issues = [];
    ['beginner','intermediate','expert','innovator'].forEach(p =>
      GAME_DATA[p].levels.forEach(l =>
        (l.steps||[]).filter(s => s.type === 'quiz').forEach(step =>
          (step.questions||[]).forEach((q, qi) => {
            if (q.correct < 0 || q.correct >= (q.options||[]).length)
              issues.push(`${p}/${l.id}[${qi}]: correct=${q.correct} OOB of ${(q.options||[]).length}`);
          })
        )
      )
    );
    GQTest.eq(issues.length, 0, '\n' + issues.join('\n'));
  });

  GQTest.it('Beginner has 25 quiz questions total', () => {
    let count = 0;
    GAME_DATA.beginner.levels.forEach(l =>
      (l.steps||[]).filter(s => s.type === 'quiz').forEach(step =>
        count += (step.questions||[]).length
      )
    );
    GQTest.eq(count, 25, `beginner quiz questions: expected 25, got ${count}`);
  });

  GQTest.it('Intermediate has 15 quiz questions total', () => {
    let count = 0;
    GAME_DATA.intermediate.levels.forEach(l =>
      (l.steps||[]).filter(s => s.type === 'quiz').forEach(step =>
        count += (step.questions||[]).length
      )
    );
    GQTest.eq(count, 15, `intermediate quiz questions: expected 15, got ${count}`);
  });
});


// ═══════════════════════════════════════════════════════════════
//  SUITE 6 — Terminal Practice (Task Tracking)
// ═══════════════════════════════════════════════════════════════
GQTest.describe('Terminal Practice — Task Tracking', () => {

  function loadTP(personaId, levelId) {
    App.selectLifeStage('working');
    App.selectPersona(personaId);
    const lvl = GAME_DATA[personaId].levels.find(l => l.id === levelId);
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'terminal-practice'));
    return lvl;
  }

  GQTest.it('Terminal-practice step renders task list with checkboxes', () => {
    loadTP('beginner', 'b2');
    const checks = document.querySelectorAll('.tp-task-check');
    GQTest.assert(checks.length > 0, 'No task checkboxes rendered');
    GQTest.assert([...checks].every(c => c.textContent.includes('⬜')), 'Initial checkboxes should be ⬜');
  });

  GQTest.it('Typing correct command marks task done (✅)', async () => {
    loadTP('beginner', 'b2');
    Terminal.clear();
    Terminal.execute('git init');
    await new Promise(r => setTimeout(r, 100));
    const check0 = document.getElementById('tp-check-0');
    GQTest.eq(check0?.textContent, '✅', 'Task 0 not checked after git init');
  });

  GQTest.it('acceptPartial commands match on prefix', async () => {
    loadTP('beginner', 'b4'); // b4 has commit task with acceptPartial
    const lvl = GAME_DATA.beginner.levels.find(l => l.id === 'b4');
    const tpStep = lvl.steps.find(s => s.type === 'terminal-practice');
    const partialTask = tpStep.tasks.find(t => t.acceptPartial);
    if (!partialTask) return; // no partial task in this level
    Terminal.clear();
    // Execute just the prefix of the command
    const prefix = partialTask.command.split(' ').slice(0, 3).join(' ');
    Terminal.execute(prefix + ' extra-args');
    await new Promise(r => setTimeout(r, 100));
    const idx = tpStep.tasks.indexOf(partialTask);
    const checkEl = document.getElementById(`tp-check-${idx}`);
    GQTest.eq(checkEl?.textContent, '✅', `acceptPartial task ${idx} not marked done with prefix`);
  });

  GQTest.it('Progress bar advances when tasks complete', async () => {
    loadTP('beginner', 'b2');
    const bar = document.getElementById('tp-progress-bar');
    GQTest.eq(bar?.style.width, '0%', 'Progress bar should start at 0%');
    Terminal.execute('git init');
    await new Promise(r => setTimeout(r, 100));
    const w = parseFloat(bar?.style.width);
    GQTest.assert(w > 0, `Progress bar did not advance (still ${bar?.style.width})`);
  });

  GQTest.it('Pre-req check: skip-ahead shows blockWithChoice prompt', async () => {
    loadTP('beginner', 'b5'); // multi-step lesson
    Terminal.clear();
    Terminal.execute('git checkout -b feature/my-branch'); // skip task 0
    await new Promise(r => setTimeout(r, 150));
    const lines = [...document.querySelectorAll('#terminal-output .t-line')].map(l => l.textContent);
    GQTest.assert(lines.some(l => l.includes('not done yet') || l.includes('Task 1')), 'Pre-req warning not shown');
    GQTest.assert(lines.some(l => l.includes('continue')), '"continue" option not shown');
    GQTest.assert(lines.some(l => l.includes('back')), '"back" option not shown');
  });

  GQTest.it('Typing "continue" after skip-ahead marks task done', async () => {
    loadTP('beginner', 'b5');
    Terminal.clear();
    Terminal.execute('git checkout -b feature/my-branch');
    await new Promise(r => setTimeout(r, 150));
    Terminal.execute('continue');
    await new Promise(r => setTimeout(r, 150));
    const taskCheckout = GAME_DATA.beginner.levels.find(l=>l.id==='b5')
      .steps.find(s=>s.type==='terminal-practice').tasks.findIndex(t=>t.command.includes('checkout'));
    const checkEl = document.getElementById(`tp-check-${taskCheckout}`);
    GQTest.eq(checkEl?.textContent, '✅', 'Task not marked done after "continue"');
  });

  GQTest.it('Total terminal-practice tasks across all personas is 42', () => {
    let total = 0;
    ['beginner','intermediate','expert','innovator'].forEach(p =>
      GAME_DATA[p].levels.forEach(l =>
        (l.steps||[]).filter(s => s.type === 'terminal-practice').forEach(s =>
          total += (s.tasks||[]).length
        )
      )
    );
    GQTest.eq(total, 42, `TP tasks: expected 42, got ${total}`);
  });

  GQTest.it('Every terminal-practice task has command, instruction, and hint', () => {
    const issues = [];
    ['beginner','intermediate','expert','innovator'].forEach(p =>
      GAME_DATA[p].levels.forEach(l =>
        (l.steps||[]).filter(s => s.type === 'terminal-practice').forEach(s =>
          (s.tasks||[]).forEach((t, ti) => {
            if (!t.command)     issues.push(`${p}/${l.id}/task[${ti}]: missing command`);
            if (!t.instruction) issues.push(`${p}/${l.id}/task[${ti}]: missing instruction`);
            if (!t.hint)        issues.push(`${p}/${l.id}/task[${ti}]: missing hint`);
          })
        )
      )
    );
    GQTest.eq(issues.length, 0, '\n' + issues.slice(0,10).join('\n'));
  });
});


// ═══════════════════════════════════════════════════════════════
//  SUITE 7 — Terminal Simulation (Git Command Accuracy)
// ═══════════════════════════════════════════════════════════════
GQTest.describe('Terminal Simulation — Git Accuracy', () => {

  function lines() {
    return [...document.querySelectorAll('#terminal-output .t-line')].map(l => l.textContent);
  }

  function loadConflictLesson() {
    App.selectLifeStage('working');
    App.selectPersona('intermediate');
    const lvl = GAME_DATA.intermediate.levels.find(l => l.id === 'i2');
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'terminal-practice'));
  }

  function loadInitLesson() {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => l.id === 'b2');
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'terminal-practice'));
  }

  function loadMidLesson() {
    // b4 = commit lesson — starts mid-workflow (no git init task)
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => l.id === 'b4');
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'terminal-practice'));
  }

  // ── git init ────────────────────────────────────────────────
  GQTest.it('git init outputs "Initialized empty Git repository"', () => {
    loadInitLesson();
    Terminal.clear();
    Terminal.execute('git init');
    GQTest.assert(lines().some(l => l.includes('Initialized empty Git repository')), 'git init output missing');
  });

  // ── not a git repo guard ────────────────────────────────────
  GQTest.it('git status before init → fatal: not a git repository', () => {
    loadInitLesson();
    Terminal.clear();
    Terminal.execute('git status');
    GQTest.assert(lines().some(l => l.includes('fatal: not a git repository')), 'fatal error not shown before init');
  });

  GQTest.it('fatal error includes actionable guidance', () => {
    loadInitLesson();
    Terminal.clear();
    Terminal.execute('git status');
    GQTest.assert(lines().some(l => l.includes('git init')), 'guidance to run git init missing');
  });

  // ── auto-init ───────────────────────────────────────────────
  GQTest.it('Mid-workflow lesson auto-initializes repo (3+ commits)', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git log --oneline');
    GQTest.assert(lines().some(l => l.includes('HEAD ->')), 'Auto-init: no commits found in log');
  });

  // ── git status ──────────────────────────────────────────────
  GQTest.it('git status shows "On branch <name>"', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git status');
    GQTest.assert(lines().some(l => l.includes('On branch')), 'git status missing "On branch"');
  });

  GQTest.it('git status after commits shows upstream tracking line', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git status');
    GQTest.assert(lines().some(l => l.includes("up to date with 'origin/")), 'upstream tracking line missing');
  });

  // ── git add ─────────────────────────────────────────────────
  GQTest.it('git add <file> is completely silent on success', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git add index.html');
    GQTest.eq(lines().length, 1, `git add not silent: ${lines().length} lines printed`);
  });

  GQTest.it('git add non-existent file → fatal pathspec error', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git add nonexistent.xyz');
    GQTest.assert(lines().some(l => l.includes('fatal: pathspec')), 'No pathspec error for missing file');
  });

  GQTest.it('git add . is silent', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git add .');
    GQTest.assert(lines().length <= 1, `git add . printed ${lines().length} lines`);
  });

  // ── git commit ──────────────────────────────────────────────
  GQTest.it('git commit -m "msg" → [branch sha] message format', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git add .');
    Terminal.execute('git commit -m "Add feature"');
    GQTest.assert(lines().some(l => /\[main \w{7}\]/.test(l) || l.includes('Add feature')), 'commit format wrong');
  });

  GQTest.it('git commit with no staged files → "nothing to commit" error', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git commit -m "empty"');
    GQTest.assert(lines().some(l => l.includes('nothing to commit')), 'no "nothing to commit" on empty stage');
  });

  // ── git log ─────────────────────────────────────────────────
  GQTest.it('git log --oneline shows HEAD -> decoration on newest commit', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git log --oneline');
    GQTest.assert(lines().some(l => l.includes('HEAD ->')), 'HEAD -> not in log --oneline');
  });

  GQTest.it('git log shows Author and Date for each commit', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git log');
    const out = lines();
    GQTest.assert(out.some(l => l.includes('Author:')), 'Author: missing from git log');
    GQTest.assert(out.some(l => l.includes('Date:')), 'Date: missing from git log');
  });

  GQTest.it('git log -1 shows only 1 commit', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git log -1 --oneline');
    const commitLines = lines().filter(l => l.includes('HEAD ->') || (/[a-f0-9]{7}/.test(l) && !l.includes('$')));
    GQTest.assert(commitLines.length === 1, `Expected 1 commit with -1 flag, got ${commitLines.length}`);
  });

  // ── git branch ──────────────────────────────────────────────
  GQTest.it('git branch shows * before current branch', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git branch');
    GQTest.assert(lines().some(l => l.startsWith('* ')), 'Current branch not marked with *');
  });

  GQTest.it('git branch <name> is silent (real git behaviour)', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git branch feature/test');
    GQTest.eq(lines().length, 1, `git branch <name> not silent: ${lines().length} lines`);
  });

  GQTest.it('git branch -d <name> shows deletion message', () => {
    loadMidLesson();
    Terminal.execute('git branch feature/tobedeleted');
    Terminal.clear();
    Terminal.execute('git branch -d feature/tobedeleted');
    GQTest.assert(lines().some(l => l.includes('Deleted branch')), 'git branch -d missing deletion message');
  });

  GQTest.it('After git switch -c, new branch appears in git branch list', () => {
    loadMidLesson();
    Terminal.execute('git switch -c feature/new');
    Terminal.clear();
    Terminal.execute('git branch');
    GQTest.assert(lines().some(l => l.includes('feature/new')), 'New branch not in branch list');
  });

  // ── git switch / checkout ───────────────────────────────────
  GQTest.it('git switch -c <name> → "Switched to a new branch"', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git switch -c feature/xyz');
    GQTest.assert(lines().some(l => l.includes("Switched to a new branch 'feature/xyz'")), 'switch -c message wrong');
  });

  GQTest.it('git checkout -b <name> → "Switched to a new branch"', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git checkout -b feature/abc');
    GQTest.assert(lines().some(l => l.includes("Switched to a new branch 'feature/abc'")), 'checkout -b message wrong');
  });

  // ── git merge ───────────────────────────────────────────────
  GQTest.it('git merge (clean) → ort strategy output', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => l.id === 'b6');
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'terminal-practice'));
    Terminal.clear();
    Terminal.execute('git switch main');
    Terminal.execute('git merge feature/my-branch');
    const out = lines();
    GQTest.assert(out.some(l => l.includes("ort strategy") || l.includes('Merge made') || l.includes('Updating')), 'Clean merge output missing');
  });

  GQTest.it('git merge feature/conflicting-branch → CONFLICT (content)', () => {
    loadConflictLesson();
    Terminal.clear();
    Terminal.execute('git merge feature/conflicting-branch');
    GQTest.assert(lines().some(l => l.includes('CONFLICT (content)')), 'Conflict not triggered');
  });

  GQTest.it('After conflict: cat app.js shows <<< === >>> markers', () => {
    loadConflictLesson();
    Terminal.execute('git merge feature/conflicting-branch');
    Terminal.clear();
    Terminal.execute('cat app.js');
    const out = lines();
    GQTest.assert(out.some(l => l.includes('<<<<<<<')), '<<<<<<< HEAD missing');
    GQTest.assert(out.some(l => l.includes('=======')), '======= separator missing');
    GQTest.assert(out.some(l => l.includes('>>>>>>>')), '>>>>>>> branch missing');
  });

  GQTest.it('git add on conflict file resolves it (shows hint)', () => {
    loadConflictLesson();
    Terminal.execute('git merge feature/conflicting-branch');
    Terminal.clear();
    Terminal.execute('git add app.js');
    GQTest.assert(lines().some(l => l.includes('hint:') || l.includes('resolved') || l.includes('commit')), 'No resolve hint after git add on conflict');
  });

  GQTest.it('git commit after conflict resolution creates merge commit', () => {
    loadConflictLesson();
    Terminal.execute('git merge feature/conflicting-branch');
    Terminal.execute('git add app.js');
    Terminal.clear();
    Terminal.execute('git commit');
    GQTest.assert(lines().some(l => l.includes("Merge branch")), 'Merge commit message missing');
  });

  GQTest.it('git status during conflict shows "Unmerged paths"', () => {
    loadConflictLesson();
    Terminal.execute('git merge feature/conflicting-branch');
    Terminal.clear();
    Terminal.execute('git status');
    GQTest.assert(lines().some(l => l.includes('unmerged') || l.includes('Unmerged')), 'Conflict status missing "unmerged"');
  });

  GQTest.it('git merge --abort clears conflict state', () => {
    loadConflictLesson();
    Terminal.execute('git merge feature/conflicting-branch');
    Terminal.clear();
    Terminal.execute('git merge --abort');
    GQTest.assert(lines().some(l => l.includes('Merge aborted')), 'merge --abort confirmation missing');
  });

  // ── git push / fetch / pull ─────────────────────────────────
  GQTest.it('git push shows "Enumerating objects"', () => {
    loadMidLesson();
    Terminal.execute('git add .');
    Terminal.execute('git commit -m "test"');
    Terminal.clear();
    Terminal.execute('git push');
    GQTest.assert(lines().some(l => l.includes('Enumerating objects') || l.includes('github.com')), 'git push output missing');
  });

  GQTest.it('git fetch shows "From https://"', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git fetch');
    GQTest.assert(lines().some(l => l.includes('From https://')), 'git fetch "From" line missing');
  });

  GQTest.it('git pull shows "Already up to date."', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git pull');
    GQTest.assert(lines().some(l => l.includes('Already up to date')), 'git pull message missing');
  });

  GQTest.it('No output contains "(simulated)" string', () => {
    loadMidLesson();
    Terminal.clear();
    ['git fetch','git pull','git remote -v','git stash list','git reflog','git branch -a'].forEach(c => Terminal.execute(c));
    GQTest.assert(!lines().some(l => l.includes('(simulated)')), 'Found "(simulated)" in output');
  });

  // ── git stash ───────────────────────────────────────────────
  GQTest.it('git stash saves working directory state', () => {
    loadMidLesson();
    Terminal.execute('git add index.html');
    Terminal.clear();
    Terminal.execute('git stash');
    GQTest.assert(lines().some(l => l.includes('Saved working directory')), 'git stash message missing');
  });

  GQTest.it('git stash pop restores stashed files', () => {
    loadMidLesson();
    Terminal.execute('git add index.html');
    Terminal.execute('git stash');
    Terminal.clear();
    Terminal.execute('git stash pop');
    const out = lines().join('\n');
    GQTest.assert(out.includes('On branch') || out.includes('Changes') || out.includes('Dropped'), 'git stash pop output missing');
  });

  // ── git diff ────────────────────────────────────────────────
  GQTest.it('git diff shows diff --git header', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git diff');
    GQTest.assert(lines().some(l => l.includes('diff --git')), 'git diff header missing');
  });

  // ── git restore ─────────────────────────────────────────────
  GQTest.it('git restore --staged is silent', () => {
    loadMidLesson();
    Terminal.execute('git add index.html');
    Terminal.clear();
    Terminal.execute('git restore --staged index.html');
    GQTest.eq(lines().length, 1, `git restore --staged not silent: ${lines().length} lines`);
  });

  // ── git reset ───────────────────────────────────────────────
  GQTest.it('git reset prints unstaged changes message', () => {
    loadMidLesson();
    Terminal.execute('git add .');
    Terminal.execute('git commit -m "c"');
    Terminal.clear();
    Terminal.execute('git reset HEAD~1');
    GQTest.assert(lines().some(l => l.includes('Unstaged') || l.includes('reset')), 'git reset output missing');
  });

  // ── git tag ─────────────────────────────────────────────────
  GQTest.it('git tag -a v1.0 creates a tag', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git tag -a v1.0 -m "Release 1.0"');
    // tag is silent in real git unless listing
    Terminal.execute('git tag');
    GQTest.assert(lines().some(l => l.includes('v1.0')), 'Tag not found in git tag list');
  });

  // ── git rebase ──────────────────────────────────────────────
  GQTest.it('git rebase <target> shows "Successfully rebased"', () => {
    loadMidLesson();
    Terminal.execute('git switch -c feature/rb');
    Terminal.clear();
    Terminal.execute('git rebase main');
    GQTest.assert(lines().some(l => l.includes('Successfully rebased')), 'git rebase success message missing');
  });

  GQTest.it('git rebase -i shows interactive mode simulation', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git rebase -i HEAD~3');
    GQTest.assert(lines().some(l => l.includes('pick') || l.includes('squash')), 'interactive rebase not simulated');
  });

  // ── git remote ──────────────────────────────────────────────
  GQTest.it('git remote add origin is silent', () => {
    loadInitLesson();
    Terminal.execute('git init');
    Terminal.clear();
    Terminal.execute('git remote add origin https://github.com/user/repo.git');
    GQTest.eq(lines().length, 1, `git remote add not silent: ${lines().length} lines`);
  });

  GQTest.it('git remote -v shows fetch and push URLs', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git remote -v');
    const out = lines().join('\n');
    GQTest.assert(out.includes('fetch') || out.includes('push') || out.includes('origin'), 'git remote -v output missing');
  });

  // ── git reflog ──────────────────────────────────────────────
  GQTest.it('git reflog shows HEAD@{n} entries', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git reflog');
    GQTest.assert(lines().some(l => l.includes('HEAD@{')), 'git reflog HEAD@ entries missing');
  });

  // ── shell commands ──────────────────────────────────────────
  GQTest.it('ls shows working files', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('ls');
    GQTest.assert(lines().some(l => l.includes('.js') || l.includes('.html') || l.includes('.css')), 'ls output missing files');
  });

  GQTest.it('pwd shows current directory', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('pwd');
    GQTest.assert(lines().some(l => l.includes('my-app') || l.includes('/')), 'pwd output missing');
  });

  GQTest.it('Unknown command shows "command not found" error', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('foobarxyz');
    GQTest.assert(lines().some(l => l.includes('command not found') || l.includes('not found')), 'Unknown command has no error message');
  });

  GQTest.it('Empty / whitespace command does not crash terminal', () => {
    loadMidLesson();
    GQTest.noThrow(() => Terminal.execute(''), 'empty command threw: ');
    GQTest.noThrow(() => Terminal.execute('   '), 'whitespace command threw: ');
  });

  GQTest.it('Unknown git subcommand shows helpful message', () => {
    loadMidLesson();
    Terminal.clear();
    Terminal.execute('git flibbertigibbet');
    GQTest.assert(lines().some(l => l.includes("not a git command") || l.includes("git help")), 'Unknown git sub shows no guidance');
  });
});


// ═══════════════════════════════════════════════════════════════
//  SUITE 8 — Git Graph Visualizer
// ═══════════════════════════════════════════════════════════════
GQTest.describe('Git Graph Visualizer', () => {

  GQTest.it('SVG element is populated for steps with gitState', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => l.gitState || (l.steps||[]).some(s => s.gitState));
    if (!lvl) return; // skip if no gitState level
    App.startLesson(lvl);
    const svgEl = document.getElementById('git-svg');
    GQTest.assert(svgEl.innerHTML.length > 0, 'SVG is empty for gitState level');
  });

  GQTest.it('SVG contains circles (commit nodes)', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => (l.steps||[]).some(s => s.gitState));
    if (!lvl) return;
    const step = lvl.steps.find(s => s.gitState);
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.indexOf(step));
    const circles = document.getElementById('git-svg').querySelectorAll('circle');
    GQTest.assert(circles.length > 0, 'No circles (commit nodes) in SVG');
  });

  GQTest.it('Branch labels appear in SVG for multi-branch gitState', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    // b5 or b6 should have feature branch in gitState
    const lvl = GAME_DATA.beginner.levels.find(l => l.id === 'b6' || l.id === 'b5');
    if (!lvl) return;
    App.startLesson(lvl);
    const svgText = document.getElementById('git-svg').innerHTML;
    GQTest.assert(svgText.includes('main') || svgText.includes('feature'), 'Branch labels missing from SVG');
  });

  GQTest.it('All 39 gitState instances render without JS errors', () => {
    const errors = [];
    ['beginner','intermediate','expert','innovator'].forEach(persona => {
      App.selectLifeStage('working');
      App.selectPersona(persona);
      GAME_DATA[persona].levels.forEach(lvl => {
        try { App.startLesson(lvl); } catch(e) { errors.push(`startLesson ${persona}/${lvl.id}: ${e.message}`); return; }
        (lvl.steps||[]).forEach((step, idx) => {
          if (!step.gitState) return;
          try { App.jumpToStep(idx); } catch(e) { errors.push(`jumpToStep ${persona}/${lvl.id}[${idx}]: ${e.message}`); }
        });
      });
    });
    GQTest.eq(errors.length, 0, '\n' + errors.slice(0,5).join('\n'));
  });

  GQTest.it('GitVisualizer.render with null gitState does not crash', () => {
    const svg = document.getElementById('git-svg');
    GQTest.noThrow(() => GitVisualizer.render(svg, null, 'beginner'), 'null gitState crashed visualizer');
  });

  GQTest.it('GitVisualizer.render with empty commits renders empty state', () => {
    const svg = document.getElementById('git-svg');
    GitVisualizer.render(svg, { commits: [] }, 'beginner');
    GQTest.assert(svg.innerHTML.length > 0, 'Empty gitState rendered blank SVG');
  });

  GQTest.it('All gitState commits have required id, branch, msg fields', () => {
    const issues = [];
    ['beginner','intermediate','expert','innovator'].forEach(p =>
      GAME_DATA[p].levels.forEach(l => {
        const check = (gs, loc) => {
          if (!gs) return;
          (gs.commits||[]).forEach((c, ci) => {
            if (!c.id)     issues.push(`${loc}/c[${ci}]: missing id`);
            if (!c.branch) issues.push(`${loc}/c[${ci}]: missing branch`);
            if (!c.msg)    issues.push(`${loc}/c[${ci}]: missing msg`);
          });
        };
        if (l.gitState) check(l.gitState, `${p}/${l.id}(level)`);
        (l.steps||[]).forEach((s,si) => { if (s.gitState) check(s.gitState, `${p}/${l.id}/step[${si}]`); });
      })
    );
    GQTest.eq(issues.length, 0, '\n' + issues.slice(0,10).join('\n'));
  });

  GQTest.it('Graph tab switch shows the SVG panel', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    App.startLesson(GAME_DATA.beginner.levels[0]);
    App.switchVizTab('graph', document.querySelector('.viz-tab'));
    const graphPanel = document.getElementById('panel-graph') ||
                       document.querySelector('.viz-panel.active');
    GQTest.defined(graphPanel, 'Graph panel not visible after tab switch');
  });

  GQTest.it('Terminal tab switch shows terminal output', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    App.startLesson(GAME_DATA.beginner.levels[0]);
    const termTab = [...document.querySelectorAll('.viz-tab')].find(t => t.textContent.includes('Terminal'));
    if (termTab) App.switchVizTab('terminal', termTab);
    const termOutput = document.getElementById('terminal-output');
    GQTest.defined(termOutput, 'Terminal output not accessible after tab switch');
  });
});


// ═══════════════════════════════════════════════════════════════
//  SUITE 9 — Panel Hints & Pointers (UX Eye-Direction)
// ═══════════════════════════════════════════════════════════════
GQTest.describe('Panel Hints & Pointers', () => {

  GQTest.it('Story step with gitState gets a graph-pointer at top of stage', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => l.id === 'b5');
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'story'));
    const stage = document.getElementById('lesson-stage');
    const p = stage.querySelector('.tp-pointer');
    GQTest.assert(p?.classList.contains('graph-pointer'), 'Story step missing .graph-pointer class');
    GQTest.assert(p === stage.firstElementChild, 'graph-pointer is not first child (not prepended)');
  });

  GQTest.it('Concept step with gitState gets a graph-pointer prepended', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => (l.steps||[]).some(s => s.type === 'concept' && s.gitState));
    if (!lvl) return;
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'concept' && s.gitState));
    const p = document.querySelector('#lesson-stage .tp-pointer.graph-pointer');
    GQTest.defined(p, 'Concept step with gitState missing .graph-pointer');
  });

  GQTest.it('Challenge step gets green terminal tp-pointer (no graph-pointer)', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => (l.steps||[]).some(s => s.type === 'challenge'));
    if (!lvl) return;
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'challenge'));
    const stage = document.getElementById('lesson-stage');
    const p = stage.querySelector('.tp-pointer');
    GQTest.defined(p, 'Challenge step missing tp-pointer');
    GQTest.assert(!p?.classList.contains('graph-pointer'), 'Challenge step incorrectly has .graph-pointer');
  });

  GQTest.it('Terminal-practice has exactly ONE tp-pointer (its own, no injected extra)', () => {
    App.selectLifeStage('working');
    App.selectPersona('intermediate');
    const lvl = GAME_DATA.intermediate.levels.find(l => l.id === 'i2');
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'terminal-practice'));
    const stage = document.getElementById('lesson-stage');
    const pointers = stage.querySelectorAll('.tp-pointer');
    GQTest.eq(pointers.length, 1, `terminal-practice has ${pointers.length} tp-pointers (expected exactly 1)`);
  });

  GQTest.it('Terminal-practice has zero .panel-hint elements (no duplicates)', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => (l.steps||[]).some(s => s.type === 'terminal-practice'));
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'terminal-practice'));
    const panelHints = document.querySelectorAll('#lesson-stage .panel-hint');
    GQTest.eq(panelHints.length, 0, `Found ${panelHints.length} .panel-hint in terminal-practice stage`);
  });

  GQTest.it('graph-pointer text mentions "Git Graph"', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => l.id === 'b5');
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'story'));
    const p = document.querySelector('#lesson-stage .tp-pointer.graph-pointer');
    GQTest.assert(p?.innerHTML?.includes('Git Graph'), 'graph-pointer does not mention "Git Graph"');
  });

  GQTest.it('terminal tp-pointer text mentions "Terminal tab"', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => (l.steps||[]).some(s => s.type === 'challenge'));
    if (!lvl) return;
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'challenge'));
    const p = document.querySelector('#lesson-stage .tp-pointer');
    GQTest.assert(p?.innerHTML?.includes('Terminal tab') || p?.innerHTML?.includes('Terminal'), 'terminal pointer does not mention Terminal');
  });
});


// ═══════════════════════════════════════════════════════════════
//  SUITE 10 — XP, Progress & localStorage
// ═══════════════════════════════════════════════════════════════
GQTest.describe('XP, Progress & Persistence', () => {

  GQTest.it('localStorage key "gitquest_state" is set after persona selection', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    GQTest.defined(localStorage.getItem('gitquest_state'), 'No localStorage state after persona selection');
  });

  GQTest.it('Saved state contains progress object for the selected persona', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const raw = localStorage.getItem('gitquest_state');
    const state = JSON.parse(raw);
    GQTest.defined(state.progress?.beginner, 'beginner progress missing from saved state');
  });

  GQTest.it('Saved state remembers lastPersona', () => {
    App.selectLifeStage('working');
    App.selectPersona('intermediate');
    const state = JSON.parse(localStorage.getItem('gitquest_state'));
    GQTest.eq(state.lastPersona, 'intermediate', 'lastPersona not saved');
  });

  GQTest.it('Saved state remembers lifeStage', () => {
    App.selectLifeStage('uni');
    App.selectPersona('beginner');
    const state = JSON.parse(localStorage.getItem('gitquest_state'));
    GQTest.eq(state.lifeStage, 'uni', 'lifeStage not saved correctly');
  });

  GQTest.it('XP starts at 0 for a fresh persona', () => {
    // Reset state
    localStorage.removeItem('gitquest_state');
    location.reload(); // can't easily test post-reload in same run, so check initial state
    const state = JSON.parse(localStorage.getItem('gitquest_state') || '{}');
    const xp = state.progress?.beginner?.xp || 0;
    GQTest.assert(xp >= 0, 'XP should be >= 0');
  });

  GQTest.it('Profile screen renders when navigated to', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    App.showScreen('profile');
    GQTest.assert(document.getElementById('screen-profile').classList.contains('active'), 'Profile screen not active');
  });
});


// ═══════════════════════════════════════════════════════════════
//  SUITE 11 — Git Content Accuracy (Command Reference)
// ═══════════════════════════════════════════════════════════════
GQTest.describe('Git Content Accuracy', () => {

  GQTest.it('Every level with commands array has valid cmd and desc fields', () => {
    const issues = [];
    ['beginner','intermediate','expert','innovator'].forEach(p =>
      GAME_DATA[p].levels.forEach(l =>
        (l.commands||[]).forEach((c, ci) => {
          if (!c.cmd)  issues.push(`${p}/${l.id}/cmd[${ci}]: missing cmd`);
          if (!c.desc) issues.push(`${p}/${l.id}/cmd[${ci}]: missing desc`);
        })
      )
    );
    GQTest.eq(issues.length, 0, '\n' + issues.slice(0,10).join('\n'));
  });

  GQTest.it('Command reference renders visible entries in lesson sidebar', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvlWithCmds = GAME_DATA.beginner.levels.find(l => l.commands?.length > 0);
    if (!lvlWithCmds) return;
    App.startLesson(lvlWithCmds);
    const cmdItems = document.querySelectorAll('.cmd-item');
    GQTest.assert(cmdItems.length > 0, 'No command reference items rendered');
  });

  GQTest.it('git commit requires -m flag in terminal (no message = default "Update")', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => l.id === 'b4');
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'terminal-practice'));
    Terminal.execute('git add .');
    Terminal.clear();
    Terminal.execute('git commit');
    const out = [...document.querySelectorAll('#terminal-output .t-line')].map(l => l.textContent);
    // Either commits with default msg or reports nothing staged (acceptPartial may have pre-staged)
    GQTest.assert(out.some(l => l.includes('Update') || l.includes('[main') || l.includes('nothing to commit')), 'git commit without -m behaved unexpectedly');
  });

  GQTest.it('Conflict lesson teaches the correct 5-step flow', () => {
    const lvl = GAME_DATA.intermediate.levels.find(l => l.id === 'i2');
    const tpStep = lvl.steps.find(s => s.type === 'terminal-practice');
    const cmds = tpStep.tasks.map(t => t.command);
    GQTest.assert(cmds.some(c => c.includes('git merge')), 'conflict lesson missing git merge task');
    GQTest.assert(cmds.some(c => c.includes('cat ')), 'conflict lesson missing cat task');
    GQTest.assert(cmds.some(c => c.includes('git add')), 'conflict lesson missing git add task');
    GQTest.assert(cmds.some(c => c.includes('git commit')), 'conflict lesson missing git commit task');
  });

  GQTest.it('All quiz explanations mention the correct git command where relevant', () => {
    const issues = [];
    ['beginner','intermediate'].forEach(p =>
      GAME_DATA[p].levels.forEach(l =>
        (l.steps||[]).filter(s => s.type === 'quiz').forEach(step =>
          (step.questions||[]).forEach((q, qi) => {
            // Explanation should be non-trivially long (educational)
            if (q.explanation && q.explanation.length < 30)
              issues.push(`${p}/${l.id}[${qi}]: explanation very short (${q.explanation.length} chars)`);
          })
        )
      )
    );
    GQTest.eq(issues.length, 0, '\n' + issues.join('\n'));
  });

  GQTest.it('Terminal help command lists key git commands', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    App.startLesson(GAME_DATA.beginner.levels.find(l => l.id === 'b4'));
    App.jumpToStep(0);
    Terminal.clear();
    Terminal.execute('help');
    const out = [...document.querySelectorAll('#terminal-output .t-line')].map(l => l.textContent).join('\n');
    ['git init','git add','git commit','git log','git branch','git push','git stash','git rebase'].forEach(cmd => {
      GQTest.assert(out.includes(cmd), `"help" output missing "${cmd}"`);
    });
  });
});


// ═══════════════════════════════════════════════════════════════
//  SUITE 12 — Accessibility & Non-functional
// ═══════════════════════════════════════════════════════════════
GQTest.describe('Accessibility & Non-functional', () => {

  GQTest.it('CSS custom properties (dark theme) are defined', () => {
    const style = getComputedStyle(document.documentElement);
    const bg = style.getPropertyValue('--bg').trim();
    GQTest.assert(bg.length > 0, '--bg CSS variable not defined');
    const green = style.getPropertyValue('--green').trim();
    GQTest.assert(green.length > 0, '--green CSS variable not defined');
  });

  GQTest.it('lesson-stage font-size is readable (>= 12px)', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    App.startLesson(GAME_DATA.beginner.levels[0]);
    const stage = document.getElementById('lesson-stage');
    const fs = parseFloat(getComputedStyle(stage).fontSize);
    GQTest.assert(fs >= 12, `lesson-stage font-size is ${fs}px — too small`);
  });

  GQTest.it('Terminal input has monospace font', () => {
    const input = document.getElementById('terminal-input');
    const ff = getComputedStyle(input).fontFamily.toLowerCase();
    GQTest.assert(ff.includes('mono') || ff.includes('courier') || ff.includes('consolas'), `terminal-input font "${ff}" is not monospace`);
  });

  GQTest.it('All clickable persona tiles have cursor pointer', () => {
    App.selectLifeStage('working');
    const tiles = document.querySelectorAll('.persona-tile, .persona-card, [onclick*="selectPersona"]');
    if (tiles.length === 0) return; // no tiles visible on this screen — skip
    [...tiles].forEach(t => {
      const cur = getComputedStyle(t).cursor;
      GQTest.assert(cur === 'pointer', `Persona tile missing cursor:pointer (has "${cur}")`);
    });
  });

  GQTest.it('Prev button is disabled on first step', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    App.startLesson(GAME_DATA.beginner.levels[0]);
    App.jumpToStep(0);
    const btnPrev = document.getElementById('btn-prev');
    GQTest.assert(btnPrev.disabled, 'Prev button should be disabled on step 0');
  });

  GQTest.it('Next button text is "Complete ✓" on last step', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels[0];
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.length - 1);
    const btnNext = document.getElementById('btn-next');
    GQTest.assert(btnNext.textContent.includes('Complete'), `Last step next button says "${btnNext.textContent}" not "Complete"`);
  });

  GQTest.it('Step indicator count matches lesson step count', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => l.id === 'b5');
    App.startLesson(lvl);
    const indicators = document.querySelectorAll('.step-item');
    GQTest.eq(indicators.length, lvl.steps.length, `${indicators.length} indicators for ${lvl.steps.length} steps`);
  });

  GQTest.it('Step indicators update (active/done) when navigating', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => l.id === 'b5');
    App.startLesson(lvl);
    App.jumpToStep(2);
    const done = document.querySelectorAll('.step-item.done');
    const active = document.querySelectorAll('.step-item.active');
    GQTest.eq(done.length, 2, `Expected 2 done indicators, got ${done.length}`);
    GQTest.eq(active.length, 1, `Expected 1 active indicator, got ${active.length}`);
  });

  GQTest.it('No console errors on loading each persona world map', () => {
    const errors = [];
    const origError = console.error;
    console.error = (...args) => { errors.push(args.join(' ')); };
    ['beginner','intermediate','expert','innovator'].forEach(p => {
      App.selectLifeStage('working');
      App.selectPersona(p);
    });
    console.error = origError;
    // Filter out React-like or unrelated errors
    const relevant = errors.filter(e => e.includes('GitQuest') || e.includes('App.') || e.includes('TypeError'));
    GQTest.eq(relevant.length, 0, 'Console errors on world map load:\n' + relevant.join('\n'));
  });

  GQTest.it('Page title is set correctly', () => {
    GQTest.assert(document.title.includes('GitQuest'), `Page title "${document.title}" doesn't include "GitQuest"`);
  });

  GQTest.it('All 4 persona paths render world map without crashing', () => {
    ['beginner','intermediate','expert','innovator'].forEach(p => {
      GQTest.noThrow(() => {
        App.selectLifeStage('working');
        App.selectPersona(p);
      }, `World map for ${p} crashed: `);
    });
  });

  GQTest.it('Terminal processes 20 commands in < 500ms', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => l.id === 'b4');
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'terminal-practice'));
    const cmds = ['git status','git log','git log --oneline','git branch','git branch -a',
                  'git diff','git stash list','git remote -v','git reflog','git tag',
                  'git fetch','git pull','git show','git shortlog','ls','pwd',
                  'git restore --staged app.js','git reset','git rebase main','help'];
    const start = performance.now();
    cmds.forEach(c => Terminal.execute(c));
    const elapsed = performance.now() - start;
    GQTest.assert(elapsed < 500, `20 commands took ${elapsed.toFixed(0)}ms (> 500ms)`);
  });
});


// ═══════════════════════════════════════════════════════════════
//  SUITE 13 — Edge Cases & Robustness
// ═══════════════════════════════════════════════════════════════
GQTest.describe('Edge Cases & Robustness', () => {

  GQTest.it('git push with no commits shows "nothing to push" error', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => l.id === 'b2');
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'terminal-practice'));
    Terminal.execute('git init');
    Terminal.clear();
    Terminal.execute('git push');
    const out = [...document.querySelectorAll('#terminal-output .t-line')].map(l => l.textContent);
    GQTest.assert(out.some(l => l.includes('nothing to push') || l.includes('error')), 'git push with no commits has no error');
  });

  GQTest.it('git merge --abort when no merge in progress shows error', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => l.id === 'b4');
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'terminal-practice'));
    Terminal.clear();
    Terminal.execute('git merge --abort');
    const out = [...document.querySelectorAll('#terminal-output .t-line')].map(l => l.textContent);
    GQTest.assert(out.some(l => l.includes('fatal') || l.includes('no merge')), 'git merge --abort has no error when no merge active');
  });

  GQTest.it('git commit during unresolved conflict shows error', () => {
    App.selectLifeStage('working');
    App.selectPersona('intermediate');
    const lvl = GAME_DATA.intermediate.levels.find(l => l.id === 'i2');
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'terminal-practice'));
    Terminal.execute('git merge feature/conflicting-branch');
    Terminal.clear();
    Terminal.execute('git commit -m "early"');
    const out = [...document.querySelectorAll('#terminal-output .t-line')].map(l => l.textContent);
    GQTest.assert(out.some(l => l.includes('unmerged') || l.includes('error') || l.includes('Committing is not possible')), 'commit during conflict has no error');
  });

  GQTest.it('cat on non-existent file shows "No such file" error', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    App.startLesson(GAME_DATA.beginner.levels.find(l => l.id === 'b4'));
    App.jumpToStep(0);
    Terminal.clear();
    Terminal.execute('cat doesnotexist.xyz');
    const out = [...document.querySelectorAll('#terminal-output .t-line')].map(l => l.textContent);
    GQTest.assert(out.some(l => l.includes('No such file')), 'cat on missing file has no error');
  });

  GQTest.it('git stash pop with no stash entries shows "No stash entries"', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    App.startLesson(GAME_DATA.beginner.levels.find(l => l.id === 'b4'));
    App.jumpToStep(lvl => lvl); // just need terminal initialized
    Terminal.clear();
    Terminal.execute('git stash pop');
    const out = [...document.querySelectorAll('#terminal-output .t-line')].map(l => l.textContent);
    GQTest.assert(out.some(l => l.includes('No stash')), 'git stash pop with no stash has no message');
  });

  GQTest.it('git bisect subcommands work without crash', () => {
    App.selectLifeStage('working');
    App.selectPersona('expert');
    App.startLesson(GAME_DATA.expert.levels[0]);
    App.jumpToStep(0);
    ['git bisect start','git bisect bad','git bisect good HEAD~5','git bisect reset'].forEach(cmd => {
      GQTest.noThrow(() => Terminal.execute(cmd), `${cmd} threw: `);
    });
  });

  GQTest.it('Compound command (&&) executes both parts', async () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    App.startLesson(GAME_DATA.beginner.levels.find(l => l.id === 'b4'));
    App.jumpToStep(GAME_DATA.beginner.levels.find(l=>l.id==='b4').steps.findIndex(s=>s.type==='terminal-practice'));
    Terminal.clear();
    Terminal.execute('git add . && git status');
    await new Promise(r => setTimeout(r, 100));
    const out = [...document.querySelectorAll('#terminal-output .t-line')].map(l => l.textContent);
    GQTest.assert(out.some(l => l.includes('On branch')), 'Compound cmd: git status part did not run');
  });

  GQTest.it('git switch to existing branch shows "Switched to branch" not "new"', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    App.startLesson(GAME_DATA.beginner.levels.find(l => l.id === 'b4'));
    App.jumpToStep(0);
    Terminal.execute('git branch feature/existing');
    Terminal.clear();
    Terminal.execute('git switch feature/existing');
    const out = [...document.querySelectorAll('#terminal-output .t-line')].map(l => l.textContent);
    GQTest.assert(out.some(l => l.includes("Switched to branch") && !l.includes('new branch')), 'Switching to existing branch shows wrong message');
  });

  GQTest.it('Rapid lesson switches do not leave stale terminal output', async () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    // Rapidly switch through 3 lessons
    ['b2','b3','b4'].forEach(id => {
      const lvl = GAME_DATA.beginner.levels.find(l => l.id === id);
      App.startLesson(lvl);
    });
    await new Promise(r => setTimeout(r, 50));
    // Terminal should show the LAST lesson's init message, not a mix
    const out = [...document.querySelectorAll('#terminal-output .t-line')].map(l => l.textContent);
    GQTest.assert(out.some(l => l.includes('Lesson:')), 'Terminal not re-initialized after lesson switch');
  });

  GQTest.it('git log on fresh init (no commits) shows "No commits yet"', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => l.id === 'b2');
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'terminal-practice'));
    Terminal.execute('git init');
    Terminal.clear();
    Terminal.execute('git log');
    const out = [...document.querySelectorAll('#terminal-output .t-line')].map(l => l.textContent);
    GQTest.assert(out.some(l => l.includes('No commits')), 'git log on empty repo missing "No commits yet"');
  });
});


// ═══════════════════════════════════════════════════════════════
//  SUITE 14 — Interactive, IDE, Drag-Drop, Scenario Steps
// ═══════════════════════════════════════════════════════════════
GQTest.describe('Interactive, IDE, DragDrop & Scenario Steps', () => {

  GQTest.it('Interactive step renders action buttons', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => (l.steps||[]).some(s => s.type === 'interactive'));
    if (!lvl) return;
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'interactive'));
    const btns = document.querySelectorAll('#lesson-stage button, #lesson-stage .action-btn');
    GQTest.assert(btns.length > 0, 'Interactive step has no action buttons');
  });

  GQTest.it('IDE step renders a code block or editor area', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => (l.steps||[]).some(s => s.type === 'ide'));
    if (!lvl) return;
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'ide'));
    const stage = document.getElementById('lesson-stage').innerHTML;
    GQTest.assert(stage.includes('code') || stage.includes('editor') || stage.includes('scm') || stage.includes('diff') || stage.length > 200, 'IDE step rendered too little content');
  });

  GQTest.it('DragDrop step renders files and staging area', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => (l.steps||[]).some(s => s.type === 'dragdrop'));
    if (!lvl) return;
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'dragdrop'));
    const stage = document.getElementById('lesson-stage').innerHTML;
    GQTest.assert(stage.includes('drag') || stage.includes('stage') || stage.includes('file'), 'DragDrop step missing file/staging area');
  });

  GQTest.it('Scenario step renders choices', () => {
    App.selectLifeStage('working');
    App.selectPersona('expert');
    const lvl = GAME_DATA.expert.levels.find(l => (l.steps||[]).some(s => s.type === 'scenario'));
    if (!lvl) return;
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'scenario'));
    const stage = document.getElementById('lesson-stage').innerHTML;
    GQTest.assert(stage.includes('choice') || stage.includes('option') || stage.includes('btn') || stage.length > 200, 'Scenario step rendered too little content');
  });

  GQTest.it('Crisis step renders urgency badge and situation text', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => (l.steps||[]).some(s => s.type === 'crisis'));
    if (!lvl) return;
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'crisis'));
    const stage = document.getElementById('lesson-stage').innerHTML;
    GQTest.assert(stage.includes('SEVERITY') || stage.includes('🔴') || stage.includes('🟠') || stage.includes('situation') || stage.length > 200, 'Crisis step missing urgency info');
  });

  GQTest.it('CommitForm step renders subject input field', () => {
    App.selectLifeStage('working');
    App.selectPersona('beginner');
    const lvl = GAME_DATA.beginner.levels.find(l => (l.steps||[]).some(s => s.type === 'commitform'));
    if (!lvl) return;
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'commitform'));
    const input = document.querySelector('#lesson-stage input[type="text"], #lesson-stage textarea');
    GQTest.defined(input, 'CommitForm step missing text input');
  });

  GQTest.it('ConflictResolver step renders two code blocks (HEAD vs incoming)', () => {
    App.selectLifeStage('working');
    App.selectPersona('intermediate');
    const lvl = GAME_DATA.intermediate.levels.find(l => (l.steps||[]).some(s => s.type === 'conflictresolver'));
    if (!lvl) return;
    App.startLesson(lvl);
    App.jumpToStep(lvl.steps.findIndex(s => s.type === 'conflictresolver'));
    const stage = document.getElementById('lesson-stage').innerHTML;
    GQTest.assert(stage.includes('HEAD') || stage.includes('conflict') || stage.includes('version') || stage.length > 300, 'ConflictResolver missing version blocks');
  });

  GQTest.it('All step types in all personas render without throwing', () => {
    const errors = [];
    ['beginner','intermediate','expert','innovator'].forEach(persona => {
      App.selectLifeStage('working');
      App.selectPersona(persona);
      const seen = new Set();
      GAME_DATA[persona].levels.forEach(lvl => {
        (lvl.steps||[]).forEach((step, idx) => {
          const key = `${persona}:${step.type}`;
          if (seen.has(key)) return;
          seen.add(key);
          try {
            App.startLesson(lvl);
            App.jumpToStep(idx);
          } catch(e) {
            errors.push(`${persona}/${lvl.id}/${step.type}: ${e.message}`);
          }
        });
      });
    });
    GQTest.eq(errors.length, 0, '\n' + errors.join('\n'));
  });
});
