# ⎇ GitQuest

> **Learn Git by playing.** An interactive, browser-based game that takes you from zero to Git expert through story-driven lessons, real-world incident scenarios, IDE simulations, and personalised examples based on your background.

[![Live Demo](https://img.shields.io/badge/▶_Play_Now-GitQuest-3fb950?style=for-the-badge)](https://vineetsoppadandi.github.io/GitQuest)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![No dependencies](https://img.shields.io/badge/dependencies-zero-orange?style=for-the-badge)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)

---

## What is GitQuest?

GitQuest is a **zero-install, browser-only** Git learning game with four structured learning paths. It focuses on **real-world situations, IDE workflows, and hands-on problem solving** — not just command memorisation — so learners build intuition that transfers to any tool or team.

```
Open index.html → Tell us about yourself → Pick your path → Start learning
```

No Node.js. No npm. No build step. No sign-up. One folder, open in a browser.

---

## Why GitQuest?

- ✅ **Personalised from the start** — examples adapt to your background (school, uni, work, or self-taught)
- ✅ **Story-driven** — narrative characters guide you through each chapter with typewriter speech bubbles
- ✅ **Crisis scenarios** — real incidents with multiple resolution choices and live consequences
- ✅ **Honest quiz system** — 3 attempts per question, hints, and answer reveal after 3 wrong
- ✅ **Zero dependencies** — pure HTML, CSS, and vanilla JavaScript
- ✅ **Works offline** — after first load, everything runs in your browser

---

## Features

| Feature | Description |
|---|---|
| 🌍 **Life-Stage Personalisation** | Pick your background (school / uni / work / self-taught) — story examples adapt to your world |
| 🎭 **Story-Driven Narrative** | Characters guide each chapter with speech bubbles and typewriter animation |
| 🚨 **Crisis Scenarios** | Real incidents (secret exposed, wrong merge, bad rebase) with multiple choices and consequences |
| 🔥 **Hotfix Runbooks** | Step-by-step production runbooks — each step runs in the simulated terminal |
| 🌲 **Live Git Graph v2** | Animated SVG graph with glow on HEAD, arrowheads, hover tooltips, and animated edge draw-on |
| 💻 **Simulated Terminal** | Full git simulator — 25+ commands, history (↑↓), Tab autocomplete |
| 🖥️ **IDE Simulations** | VS Code SCM panel, GitHub PR interface, AI review panels, agent workflow steppers |
| 🖱️ **Drag & Drop Staging** | Physically move files into the staging area — teaches the three-area model viscerally |
| 🎯 **3-Attempt Quiz System** | Attempt dots, progressive hints, answer revealed after 3 wrong tries |
| 📉 **Skip = 50% XP** | Skip a quiz to keep moving — earn half XP. Come back to collect the rest |
| ↺ **Granular Reset** | Reset entire path, individual lesson, or all progress — confirmations protect accidents |
| 🏆 **19 Achievements** | First Commit, Conflict Hero, Bisect Detective, AI Reviewer, MCP Builder, and more |
| 📈 **XP + Streaks** | Progress saved to `localStorage` — pick up where you left off |
| 🎉 **Confetti + Toasts** | Satisfying feedback on every level complete and achievement unlock |

---

## Four Learning Paths

### 🌱 Explorer (Beginner) — 12 Lessons
*"I've never used Git before"*

| # | Lesson | Activity Type |
|---|---|---|
| 1 | What is Git & GitHub? | Visual + Quiz |
| 2 | Your First Repository (`git init`) | Interactive steps |
| 3 | The Three Areas: Working Dir → Staging → Repo | **Drag & Drop** |
| 4 | Your First Commit | Commit form + 🚨 Crisis |
| 5 | Branches — Parallel Universes | Interactive steps + 🚨 Crisis |
| 6 | Merging Branches | Interactive steps |
| 7 | Remote Repositories & GitHub | Interactive steps + 🚨 Crisis |
| 8 | `.gitignore` | Visual + Quiz |
| 9 | Git in VS Code | **IDE Simulation** |
| 10 | Beginner Challenge | Full workflow |

### 🔀 Adventurer (Intermediate) — 12 Lessons
*"I know the basics but struggle with team workflows"*

| # | Lesson | Activity Type |
|---|---|---|
| 1 | Branching Strategies (GitHub Flow vs GitFlow) | Visual + 🔥 Hotfix Runbook |
| 2 | Merge Conflicts | **Interactive resolver** |
| 3 | Rebase vs Merge | Visual + 🚨 Crisis |
| 4 | Stashing | Interactive steps |
| 5 | Pull Requests on GitHub | **GitHub PR Simulation** |
| 6 | Undoing Mistakes (reset, revert, restore) | Interactive steps |
| 7 | Cherry-Pick | Interactive steps |
| 8 | Tags & Releases | Interactive steps |
| 9 | VS Code Git Deep Dive | **VS Code Simulation** |
| 10 | Intermediate Challenge | Conflict → PR → Merge |

### ⚡ Master (Expert) — 10 Lessons
*"I use Git daily but want to level up to senior/lead level"*

| # | Lesson | Activity Type |
|---|---|---|
| 1 | Git Internals (blobs, trees, commits) | Visual + 🚨 Crisis |
| 2 | Interactive Rebase (squash, fixup, reorder) | Interactive steps |
| 3 | Git Bisect (binary search for bugs) | Interactive steps + 🚨 Crisis |
| 4 | Git Hooks (pre-commit, commit-msg) | Interactive steps + 🚨 Crisis |
| 5 | 🚨 Incident: Production Hotfix | **Real-world scenario** |
| 6 | Team Governance (branch protection, CODEOWNERS) | **GitHub Settings Sim** |
| 7 | IntelliJ/WebStorm Git Deep Dive | Concept |
| 8 | Expert Challenge: Salvage a Bad Rebase via `reflog` | **Incident scenario** |

### 🚀 Innovator (AI & Strategy) — 11 Lessons
*"I want to work the way elite teams ship software"*

| # | Lesson | Activity Type |
|---|---|---|
| 1 | Trunk-Based Development | Visual |
| 2 | Feature Flags | Interactive |
| 3 | GitOps (ArgoCD / Flux) | **GitOps Pipeline Sim** |
| 4 | Monorepos (Nx, Turborepo, Bazel) | Concept |
| 5 | Conventional Commits + Semantic Release | Interactive |
| 6 | Claude Code & AI Agents in Git | **Agent Workflow Sim** |
| 7 | GitHub Copilot & Cursor Workflows | **AI Review Panel** |
| 8 | MCP: Connect Claude to Your Repo | **MCP Builder** |
| 9 | AI Code Review (CodeRabbit, Copilot Review) | **AI Review Panel** |
| 10 | Merge Queues | Concept |
| 11 | Dependabot & Renovate at Scale | **Dependabot PR Sim** |

---

## Life-Stage Personalisation

When you start GitQuest you choose your background — and the story examples adapt:

| Stage | Who it's for | Example scenario |
|---|---|---|
| 🏫 **High School** | Students in CS or IT class | "Me and Jamie are editing the same file and now we have three versions…" |
| 🎓 **University** | Undergrads / postgrads | "Our 4-person team is all pushing to the same repo and things keep breaking…" |
| 💼 **Working Professional** | Developers in a team | "My manager said 'don't break main' and I have no idea what that means yet…" |
| 🌱 **Self-Taught / Hobbyist** | Personal projects, tutorials | "I deleted my entire project by accident. Never again." |

All 24 story lessons have three localised variants. You can change your background at any time from the Profile screen.

---

## Crisis Scenarios

GitQuest includes **7 real-world incident scenarios** that drop you into a crisis and ask: *what do you do?*

| Lesson | Incident |
|---|---|
| Beginner 4 | 🔑 AWS secret key committed to main — GitHub Secret Scanner fires 45 seconds later |
| Beginner 5 | 🕒 Three days of feature work done on main, no branch — lead is asking where the PR is |
| Beginner 7 | 💥 Wrong branch merged to main — homepage is blank, alerts firing |
| Intermediate 1 | 🔥 Production 500s on payments — full hotfix runbook (9 steps) |
| Intermediate 3 | 🔀 Interactive rebase squashed a colleague's commits — she's asking where they went |
| Expert 1 | 🔍 47 tests failing, 200 commits since last green — git bisect to the rescue |
| Expert 3 | 🪝 Pre-commit hook takes 4 minutes — whole team is using `--no-verify` |

Each crisis has **3–4 resolution choices**, each with a real-world outcome story (correct, dangerous, or wrong). Correct resolution awards a **+25 XP bonus**.

---

## Quiz System

- **3 attempts per question** — attempt dots show how many tries remain
- **Progressive hints** — hint appears after 1st wrong answer, stronger hint after 2nd
- **Answer reveal** — after 3 failed attempts, the correct answer is shown in a blue panel with full explanation
- **Real-world consequences** — wrong answers show what actually happens in a real codebase
- **Skip = 50% XP** — move past a quiz without answering to keep momentum; earn the other half when you return

---

## Getting Started

### Play Instantly (No Install)

```bash
git clone https://github.com/vineetsoppadandi/GitQuest.git
cd GitQuest
# Open index.html in your browser
open index.html          # macOS
start index.html         # Windows
xdg-open index.html      # Linux
```

Or just **double-click `index.html`**. That's it.

### Deploy to GitHub Pages (Share with your team)

1. Fork this repo
2. Go to **Settings → Pages**
3. Under **Build and deployment → Source**, select **GitHub Actions**
4. Click **Save** — the workflow in `.github/workflows/pages.yml` handles the rest
5. Your game is live at `https://<your-username>.github.io/GitQuest`

### Serve locally (optional, for development)

```bash
# Python
python -m http.server 8080

# Node (npx, no install needed)
npx serve .

# VS Code: install "Live Server" extension → right-click index.html → Open with Live Server
```

---

## Project Structure

```
GitQuest/
├── index.html              # App shell — all screens and modals
├── css/
│   └── style.css           # Full design system (dark theme, ~1200 lines)
├── js/
│   ├── data.js             # Core lesson content — 28 lessons across 3 paths
│   ├── data-innovator.js   # Innovator path — 11 AI & strategy lessons
│   ├── data-practical.js   # Crisis & hotfix scenarios (patches existing lessons)
│   ├── data-lifestage.js   # Life-stage story overrides (72 personalised variants)
│   ├── visualizer.js       # SVG git graph renderer v2 — glow, tooltips, animations
│   ├── terminal.js         # Simulated git terminal (25+ commands)
│   └── app.js              # Game engine — routing, state, step renderers, XP logic
├── .github/
│   ├── workflows/
│   │   └── pages.yml       # Auto-deploy to GitHub Pages on push to main
│   ├── ISSUE_TEMPLATE/     # Bug report & lesson suggestion templates
│   └── pull_request_template.md
├── CONTRIBUTING.md         # Full guide for adding lessons and crisis scenarios
├── LICENSE                 # MIT
└── README.md
```

**No build tools. No framework. No package.json.** Pure HTML + CSS + vanilla JavaScript.

---

## How to Add a New Lesson

Lessons are pure JavaScript objects in `js/data.js`. No tooling required.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full lesson schema and a step-by-step guide.

**Quick example — a minimal lesson:**

```javascript
{
  id: 'b11', num: 11, icon: '🔖', xp: 120,
  title: 'Git Aliases',
  subtitle: 'Create shortcuts for common commands',
  type: 'interactive',
  tip: 'git config --global alias.st status  →  now "git st" works!',
  commands: [
    { cmd: 'git config --global alias.st status', desc: 'Create an alias' }
  ],
  gitState: { commits: [], branches: { main: null }, HEAD: 'main' },
  steps: [
    {
      type: 'story',
      title: 'Working Smarter',
      context: 'You type git status 50 times a day. What if it was just git st?',
      objective: '🎯 Create git aliases to speed up your daily workflow'
    },
    {
      type: 'quiz',
      questions: [{
        q: 'How do you create a global alias "co" for "checkout"?',
        options: [
          'git alias co checkout',
          'git config --global alias.co checkout',
          'git shortcut co=checkout',
          'alias co="git checkout"'
        ],
        correct: 1,
        hint: 'Aliases live in ~/.gitconfig — the command that writes there starts with git config --global',
        explanation: '✅ git config --global alias.co checkout stores the alias in ~/.gitconfig'
      }]
    }
  ]
}
```

**Adding a crisis scenario** — inject into any existing lesson without touching `data.js`:

```javascript
// In js/data-practical.js
patch('beginner', 'b11', [{
  type: 'crisis',
  title: '🚨 INCIDENT: Wrong alias deleted all my commits',
  urgency: 'medium',
  situation: 'You aliased "git nuke" to "git reset --hard HEAD~10". A teammate ran it.',
  clue: 'git reflog shows every position HEAD has ever been at',
  choices: [
    { label: 'git reflog → git reset --hard HEAD@{1}', outcome: 'correct', result: '...' },
    { label: 'Panic and email the team', outcome: 'wrong', result: '...' }
  ]
}]);
```

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Structure | HTML5 | Single file, no framework overhead |
| Style | Vanilla CSS | Custom properties, grid, keyframe animations |
| Logic | Vanilla JS (IIFE modules) | No dependencies = no supply chain risk |
| Fonts | Google Fonts (JetBrains Mono + Inter) | CDN, no npm |
| Graphs | Inline SVG | Zero-dependency animated git graphs |
| Storage | `localStorage` | Zero-config persistence |
| Deployment | GitHub Pages + Actions | Free, instant, auto-deploys on push |

---

## Browser Support

| Browser | Supported |
|---|---|
| Chrome / Edge 90+ | ✅ |
| Firefox 88+ | ✅ |
| Safari 14+ | ✅ |
| Mobile Chrome/Safari | ✅ (tablet+) |

---

## Roadmap

- [ ] **Daily challenges** — one crisis scenario per day, leaderboard
- [ ] **Certificates** — downloadable completion badge per path
- [ ] **Multiplayer conflict** — resolve the same conflict race-style with a teammate
- [ ] **Custom lesson packs** — import a JSON lesson set via URL param
- [ ] **Dark/light theme toggle**
- [ ] **Keyboard navigation** — complete levels hands-free
- [ ] **GitLab & Bitbucket** variants of IDE simulations
- [ ] **GitHub Actions lesson** — CI/CD basics

See [open issues](https://github.com/vineetsoppadandi/GitQuest/issues) to contribute.

---

## Contributing

Contributions are warmly welcome! Whether it's:

- 🐛 Fixing a bug
- 📝 Adding or improving a lesson
- 🚨 Writing a new crisis scenario
- 🌍 Adding life-stage story variants for a new background
- 🎨 Improving UI/UX

Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

### Branch Workflow

`main` is the protected branch — all changes go through a PR:

```bash
# 1. Create a feature branch
git checkout -b feature/your-feature-name

# 2. Make changes, commit them
git add <files>
git commit -m "feat: describe what you did"

# 3. Push and open a PR
git push -u origin feature/your-feature-name
gh pr create   # requires GitHub CLI — cli.github.com
```

**Branch naming convention:**

| Prefix | Use for |
|---|---|
| `feature/` | New lessons, features, personas |
| `fix/` | Bug fixes |
| `content/` | Lesson text, crisis scenarios, life-stage variants |
| `style/` | CSS / visual changes only |
| `chore/` | CI, config, tooling |

---

## License

[MIT](LICENSE) — free to use, modify, and distribute. Attribution appreciated.

---

## Acknowledgements

Built with ❤️ by the GitQuest contributors. Inspired by:
- [Learn Git Branching](https://learngitbranching.js.org/) — the OG visual Git tool
- [Oh My Git!](https://ohmygit.org/) — the card-based Git game
- Every developer who has ever force-pushed to main and learned from it
