# ⎇ GitQuest

> **Learn Git by playing.** An interactive, browser-based game that takes you from zero to Git expert through visual lessons, IDE simulations, and real-world incident scenarios.

[![Live Demo](https://img.shields.io/badge/▶_Play_Now-GitQuest-3fb950?style=for-the-badge)](https://your-username.github.io/GitQuest)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![No dependencies](https://img.shields.io/badge/dependencies-zero-orange?style=for-the-badge)]()
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=for-the-badge)](CONTRIBUTING.md)

---

## What is GitQuest?

GitQuest is a **zero-install, browser-only** Git learning game with three structured learning paths. It focuses on **concepts and IDE workflows** — not just command memorisation — so learners build intuition that transfers to any tool.

```
Open index.html → Pick your path → Start learning
```

No Node.js. No npm. No build step. One folder, open in a browser.

---

## Features

| Feature | Description |
|---|---|
| 🌲 **Live Git Graph** | Animated SVG commit tree that updates as you progress |
| 💻 **Simulated Terminal** | Full git command simulator with 25+ commands, history (↑↓), and Tab autocomplete |
| 🖥️ **IDE Mockups** | Interactive VS Code SCM panel and GitHub PR interface simulations |
| 🖱️ **Drag & Drop** | Physically stage files by dragging them — teaches the three-area model viscerally |
| 🏆 **12 Achievements** | First Commit, Conflict Hero, Bisect Detective, Git Master, and more |
| 📈 **XP + Streaks** | Progress saved to `localStorage` — pick up where you left off |
| 🎉 **Confetti + Toasts** | Satisfying feedback on every level complete and achievement unlock |
| 📱 **Responsive** | Works on tablet screens too |

---

## Three Learning Paths

### 🌱 Explorer (Beginner) — 10 Lessons
*"I've never used Git before"*

| # | Lesson | Activity Type |
|---|---|---|
| 1 | What is Git & GitHub? | Visual + Quiz |
| 2 | Your First Repository (`git init`) | Interactive steps |
| 3 | The Three Areas: Working Dir → Staging → Repo | **Drag & Drop** |
| 4 | Your First Commit | Commit form |
| 5 | Branches — Parallel Universes | Interactive steps |
| 6 | Merging Branches | Interactive steps |
| 7 | Remote Repositories & GitHub | Interactive steps |
| 8 | .gitignore | Visual + Quiz |
| 9 | Git in VS Code | **IDE Simulation** |
| 10 | Beginner Challenge | Full workflow |

### 🔀 Adventurer (Intermediate) — 10 Lessons
*"I know the basics but struggle with team workflows"*

| # | Lesson | Activity Type |
|---|---|---|
| 1 | Branching Strategies (GitHub Flow vs GitFlow) | Visual |
| 2 | Merge Conflicts | **Interactive resolver** |
| 3 | Rebase vs Merge | Visual |
| 4 | Stashing | Interactive steps |
| 5 | Pull Requests on GitHub | **GitHub PR Simulation** |
| 6 | Undoing Mistakes (reset, revert, restore) | Interactive steps |
| 7 | Cherry-Pick | Interactive steps |
| 8 | Tags & Releases | Interactive steps |
| 9 | VS Code Git Deep Dive | **VS Code Simulation** |
| 10 | Intermediate Challenge | Conflict → PR → Merge |

### ⚡ Master (Expert) — 8 Lessons
*"I use Git daily but want to level up to senior/lead level"*

| # | Lesson | Activity Type |
|---|---|---|
| 1 | Git Internals (blobs, trees, commits) | Visual |
| 2 | Interactive Rebase (squash, fixup, reorder) | Interactive steps |
| 3 | Git Bisect (binary search for bugs) | Interactive steps |
| 4 | Git Hooks (pre-commit, commit-msg) | Interactive steps |
| 5 | 🚨 Incident: Production Hotfix | **Real-world scenario** |
| 6 | Team Governance (branch protection, CODEOWNERS) | **GitHub Settings Sim** |
| 7 | IntelliJ/WebStorm Git Deep Dive | Concept |
| 8 | Expert Challenge: Salvage a Bad Rebase via `reflog` | **Incident scenario** |

---

## Getting Started

### Play Instantly (No Install)

```bash
git clone https://github.com/your-username/GitQuest.git
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
3. Source: **Deploy from a branch** → `main` → `/ (root)`
4. Click **Save**
5. Your game is live at `https://<your-username>.github.io/GitQuest`

### Serve locally (optional, for development)

Any static file server works:

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
├── index.html          # App shell — all screens and modals
├── css/
│   └── style.css       # Full design system (~800 lines, dark theme)
├── js/
│   ├── data.js         # All lesson content for 28 lessons (~100 KB)
│   ├── visualizer.js   # SVG git graph renderer with animations
│   ├── terminal.js     # Simulated git terminal (25+ commands)
│   └── app.js          # Game engine — routing, state, interactions
├── .github/
│   ├── ISSUE_TEMPLATE/ # Bug report & lesson suggestion templates
│   └── pull_request_template.md
├── CONTRIBUTING.md     # Guide for adding lessons
├── LICENSE             # MIT
└── README.md
```

**No build tools. No framework. No package.json.** Pure HTML + CSS + vanilla JavaScript.

---

## How to Add a New Lesson

Lessons are pure JavaScript objects in `js/data.js`. Adding one requires no tooling knowledge.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full lesson schema and a step-by-step guide.

**Quick example — a minimal lesson:**

```javascript
// In GAME_DATA.beginner.levels (or intermediate / expert)
{
  id: 'b11', num: 11, icon: '🔖', xp: 120,
  title: 'Git Aliases',
  subtitle: 'Create shortcuts for common commands',
  type: 'interactive',
  tip: 'git config --global alias.st status  →  now git st works!',
  commands: [
    { cmd: 'git config --global alias.st status', desc: 'Create an alias' },
    { cmd: 'git st', desc: 'Use the alias' }
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
      type: 'concept',
      title: '🔖 Git Aliases',
      icon: '🔖',
      body: `Git aliases are custom shortcuts...`
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
        explanation: '✅ git config --global alias.co checkout stores the alias in ~/.gitconfig'
      }]
    }
  ]
}
```

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Structure | HTML5 | Single file, no framework overhead |
| Style | Vanilla CSS | Custom properties, grid, animations |
| Logic | Vanilla JS | No dependencies = no supply chain risk |
| Fonts | Google Fonts (JetBrains Mono + Inter) | CDN, no npm |
| Storage | `localStorage` | Zero-config persistence |
| Deployment | GitHub Pages | Free, instant, no CI needed |

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

- [ ] **Multiplayer mode** — race a teammate through a level
- [ ] **Custom lesson packs** — import a JSON lesson set via URL
- [ ] **Dark/light theme toggle**
- [ ] **Keyboard navigation** — complete levels hands-free
- [ ] **GitLab & Bitbucket** variants of IDE simulations
- [ ] **GitHub Actions lesson** — CI/CD basics

See [open issues](https://github.com/your-username/GitQuest/issues) to contribute.

---

## Contributing

Contributions are warmly welcome! Whether it's:

- 🐛 Fixing a bug
- 📝 Adding or improving a lesson
- 🌍 Translating content
- 🎨 Improving UI/UX

Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

---

## License

[MIT](LICENSE) — free to use, modify, and distribute. Attribution appreciated.

---

## Acknowledgements

Built with ❤️ by the GitQuest contributors. Inspired by:
- [Learn Git Branching](https://learngitbranching.js.org/) — the OG visual Git tool
- [Oh My Git!](https://ohmygit.org/) — the card-based Git game
- Countless Stack Overflow answers that explained git reset for the hundredth time
