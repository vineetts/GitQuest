# Contributing to Git Energy

Thank you for wanting to improve Git Energy! This document explains how to add lessons, fix bugs, and get your changes merged.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Types of Contributions](#types-of-contributions)
- [Lesson Schema Reference](#lesson-schema-reference)
- [Step Types Reference](#step-types-reference)
- [Git State Format](#git-state-format)
- [Style Guide](#style-guide)
- [PR Checklist](#pr-checklist)

---

## Quick Start

```bash
# 1. Fork the repo on GitHub, then:
git clone https://github.com/YOUR-USERNAME/GitEnergy.git
cd GitEnergy

# 2. Create a branch for your contribution
git switch -c lesson/add-git-aliases
# or
git switch -c fix/quiz-answer-typo

# 3. Make changes (see schema below)
# 4. Test — just open index.html in your browser
open index.html

# 5. Commit and push
git add .
git commit -m "Add git aliases lesson to beginner path"
git push origin lesson/add-git-aliases

# 6. Open a PR on GitHub
```

No npm. No build step. Edit `js/data.js`, refresh browser, done.

---

## Types of Contributions

| Type | Where | Notes |
|---|---|---|
| **New lesson** | `js/data.js` | Add to `beginner`, `intermediate`, or `expert` levels array |
| **Fix lesson content** | `js/data.js` | Typos, wrong answers, unclear explanations |
| **New achievement** | `js/data.js` → `ACHIEVEMENTS` array + trigger in `js/app.js` | |
| **Bug fix** | `js/app.js`, `js/terminal.js`, `js/visualizer.js` | |
| **New step type** | `js/app.js` → add renderer + `js/data.js` for content | |
| **Styling** | `css/style.css` | Follow existing CSS custom property conventions |
| **Translation** | Create `js/data.{lang}.js` | Community-maintained |

---

## Lesson Schema Reference

All lessons live in `js/data.js` inside `GAME_DATA.beginner.levels`, `GAME_DATA.intermediate.levels`, or `GAME_DATA.expert.levels`.

### Lesson Object

```javascript
{
  // Required
  id:       'b11',                    // Unique string. Prefix: b=beginner, i=intermediate, e=expert
  num:      11,                       // Display number (1-based, sequential within the path)
  icon:     '🔖',                     // Emoji shown on world map and sidebar
  xp:       120,                      // XP awarded on first completion (80–350 range)
  title:    'Git Aliases',            // Short title (≤40 chars)
  subtitle: 'Create shortcuts for common commands',  // One-line description
  type:     'interactive',            // Primary activity type (see below)
  tip:      'git config --global alias.st status',  // Shown in sidebar hint box

  // Optional — shown in the command reference sidebar
  commands: [
    { cmd: 'git config --global alias.st status', desc: 'Create an alias' },
    { cmd: 'git st',                               desc: 'Use the alias' }
  ],

  // The git graph state shown in the visualizer for this lesson
  gitState: {
    commits: [
      { id: 'c0', msg: 'Initial commit', branch: 'main', parent: null },
      { id: 'c1', msg: 'Add feature',    branch: 'main', parent: 'c0' }
    ],
    branches: { main: 'c1' },
    HEAD: 'main'              // Which branch HEAD points to
  },

  // The lesson steps (ordered)
  steps: [ /* see Step Types below */ ]
}
```

### XP Guidelines

| Complexity | XP Range |
|---|---|
| Simple visual/quiz only | 80–120 |
| Interactive with terminal | 120–180 |
| Conflict resolver or IDE sim | 180–250 |
| Expert scenario / challenge | 250–500 |

---

## Step Types Reference

Each item in `steps[]` has a `type` field that controls how it renders.

---

### `story` — Scene-setting narrative

```javascript
{
  type: 'story',
  title: 'The Feature Request',           // Bold heading
  context: 'Priya asks you to add...',    // 2–4 sentences of narrative context
  objective: '🎯 Learn what X does'       // Single learning objective
}
```

**Rules:** Every lesson should start with a `story` step. Keep `context` under 100 words.

---

### `concept` — Explanation with optional diagram

```javascript
{
  type: 'concept',
  title: 'What is a Branch?',
  icon: '🌿',                            // Emoji prefix for the heading
  body: `A branch is simply a <strong>lightweight pointer</strong>...
         Use <code>git branch</code> to list them.`,
  // Optional visual diagram
  diagram: [
    { icon: '📝', label: 'Working Dir', sub: 'your edits' },
    { icon: '→',  label: 'git add' },    // '→' renders as an arrow connector
    { icon: '📋', label: 'Staging',  sub: 'draft commit' }
  ]
}
```

**Body formatting:** Use `<strong>`, `<code>`, `<br>`. No `<script>` or `<style>` tags.

**Diagram icons:** Arrows use `→`, `↔`, `➕`. Other icons get a box rendered.

---

### `interactive` — Step-by-step clickable actions

```javascript
{
  type: 'interactive',
  title: 'Initialize your repo',
  instructions: 'Click each step to execute it:',
  actions: [
    {
      id:          'init',          // Unique within the lesson
      label:       '1. git init',   // Shown as the step description
      result:      'Initialized empty Git repository in .git/',  // Output shown after clicking
      achievement: 'first_commit'   // Optional — award this achievement on completion
    },
    {
      id:     'status',
      label:  '2. git status',
      result: 'On branch main\nNo commits yet'
    }
  ]
}
```

**Rules:** Keep `result` to realistic git output. Use `\n` for newlines.

---

### `dragdrop` — File staging activity

```javascript
{
  type: 'dragdrop',
  title: 'Stage your files',
  instructions: 'Drag the files you want to commit into the Staging Area.',
  files: [
    { name: 'index.html', status: 'new',      stage: false, shouldStage: true  },
    { name: 'style.css',  status: 'modified', stage: false, shouldStage: true  },
    { name: 'debug.log',  status: 'new',      stage: false, shouldStage: false }
    // shouldStage: false = trap file (student should NOT stage this)
  ]
}
```

**Status values:** `'new'` | `'modified'` | `'deleted'`

---

### `commitform` — Write a commit message

```javascript
{
  type: 'commitform',
  title: 'Write your first commit',
  stagedFiles:  ['index.html', 'style.css'],   // Shown as staged
  placeholder:  'e.g. Add homepage with navigation',
  achievement:  'first_commit'                  // Awarded on valid submission
}
```

The game validates: non-empty, >5 chars, not just "fix"/"wip"/"update".

---

### `quiz` — Multiple choice questions

```javascript
{
  type: 'quiz',
  questions: [
    {
      q:           'What does git init create?',
      options:     ['A GitHub repo', 'A .git directory', 'A new branch', 'A commit'],
      correct:     1,           // Zero-based index of correct option
      explanation: '✅ git init creates the .git directory, which IS the repository.'
    }
  ]
}
```

**Rules:**
- 2–4 options per question
- `correct` is the zero-based index
- `explanation` shown after answering — always start with ✅ or ❌ emoji
- Ideally include one plausible wrong answer, not just obvious distractors

---

### `ide` — IDE/GitHub interface simulation

```javascript
// VS Code Source Control panel
{
  type: 'ide',
  mode: 'vscode-scm',
  title: 'Stage and commit in VS Code',
  changedFiles: [
    {
      name: 'app.js',
      status: 'M',   // M=Modified, A=Added, D=Deleted, U=Untracked
      content: [
        { ln: 1, text: 'function hello() {',   type: 'normal' },
        { ln: 2, text: '  return "Hi";',        type: 'normal' },
        { ln: 3, text: '  return "Hello!";',    type: 'add'    }  // 'add' = green highlight
      ]
    }
  ],
  instructions: [
    'Click app.js in the Changes section',
    'Click + to stage it',
    'Type a commit message and click ✓ Commit'
  ]
}

// GitHub PR interface
{
  type: 'ide',
  mode: 'github-pr',
  prData: {
    title:  'Add user login',
    branch: 'feature/login',
    base:   'main',
    checks: [
      { name: 'CI / test', status: 'pass' },
      { name: 'CI / lint', status: 'fail' }
    ],
    comments: [
      { author: 'Amara', avatar: '👩🏾', text: 'Add rate limiting please', file: 'auth.js', line: 42 }
    ]
  }
}

// VS Code feature overview
{
  type: 'ide',
  mode: 'vscode-advanced',
  features: [
    { icon: '🔵', name: 'Gutter Indicators', desc: 'Blue bars show modified lines.' }
  ]
}

// GitHub branch protection settings
{
  type: 'ide',
  mode: 'github-settings',
  settings: {
    branchProtection:  true,
    requiredReviewers: 2,
    requiredChecks:    ['CI/test', 'CI/lint'],
    codeowners:        '# CODEOWNERS\n/src/payments/ @payments-team'
  }
}
```

---

### `conflictresolver` — Live conflict resolution

```javascript
{
  type: 'conflictresolver',
  filename:   'app.js',
  context:    'Both branches changed the greeting function.',
  ours:       'function greet() {\n  return "Hello";\n}',
  theirs:     'function greet() {\n  return "Hi there";\n}',
  resolution: 'function greet() {\n  return "Hello, welcome!";\n}'
  // resolution = suggested answer shown via "Suggested Resolution" button
}
```

---

### `scenario` — Real-world incident

```javascript
{
  type: 'scenario',
  severity: 'critical',  // 'critical' | 'warning' | 'info'
  title:       '🔴 Production Service Down',
  description: 'Payments failing since 14:23. $12k/min revenue loss.',
  steps: [
    {
      step:   1,
      action: 'Branch from the v1.0.0 tag (NOT from main)',
      cmd:    'git switch -c hotfix/v1.0.1 v1.0.0',
      result: 'Switched to new branch \'hotfix/v1.0.1\' at v1.0.0'
    }
  ]
}
```

---

### `challenge` — Multi-step final assessment

```javascript
{
  type: 'challenge',
  title: 'Complete the full workflow',
  steps: [
    { id: 'ch1', instruction: 'Initialize a repo in a new folder', verify: 'init' },
    { id: 'ch2', instruction: 'Create index.html and stage it',     verify: 'stage' }
  ]
}
```

---

## Git State Format

The `gitState` object drives the animated SVG git graph:

```javascript
gitState: {
  commits: [
    {
      id:     'c0',           // Short unique string (used as reference)
      msg:    'Initial commit',
      branch: 'main',         // Which branch this commit is "on" (for lane coloring)
      parent: null,           // null for root commit; string ID for normal commits
      merge:  'c2',           // Optional: ID of second parent (merge commits)
      tag:    'v1.0.0'        // Optional: tag label displayed on node
    },
    { id: 'c1', msg: 'Add feature', branch: 'feature/x', parent: 'c0' }
  ],
  branches: {
    'main':      'c0',   // Branch name → commit ID it points to
    'feature/x': 'c1'
  },
  HEAD:  'main',         // Which branch HEAD currently points to
  tags:  { 'v1.0.0': 'c0' }  // Optional
}
```

**Ordering:** Put commits chronologically (oldest first). The visualizer reverses them for display (newest at top).

---

## Style Guide

### Writing Lessons

- **Narrative context first** — always open with a realistic workplace scenario. Avoid abstract examples.
- **Specific personas** — use named characters (Priya, Amara, Raj) consistently. They make it feel like a real team.
- **Active voice** — "Git creates a blob" not "a blob is created"
- **Avoid jargon without definition** — define terms the first time they appear in a concept step
- **Concept body length** — 80–200 words. Longer belongs in the README.
- **Quiz explanations** — always explain WHY the correct answer is right, not just that it is

### Code Style (JavaScript)

- Vanilla JS, no classes, no ES modules (must work as `<script src="...">`)
- `const` by default, `let` when reassigned, never `var`
- 2-space indent
- Single quotes for strings
- Semicolons: none (ASI)
- No trailing whitespace

### CSS

- Use existing custom properties (`--bg`, `--green`, `--text-muted`, etc.) — don't add raw colors
- New components go at the bottom of `style.css` with a comment header
- Mobile-first considerations: test at 768px width

---

## PR Checklist

Before submitting:

- [ ] Lesson has a `story` step as the first step
- [ ] All `quiz` answers have `explanation` strings
- [ ] `id` is unique across all lessons (search `js/data.js` for your chosen ID)
- [ ] `gitState` accurately reflects what the lesson teaches
- [ ] Tested in Chrome and Firefox by opening `index.html` directly
- [ ] No external dependencies added
- [ ] Commit message follows: `type(scope): description` e.g. `lesson(beginner): add git aliases`

---

## Questions?

Open a [GitHub Discussion](https://github.com/your-username/GitEnergy/discussions) or file an [issue](https://github.com/your-username/GitEnergy/issues).
