// ═══════════════════════════════════════════════
//  GitQuest — Innovator Path
//  Real-world strategies + Agentic AI in Git
//  Extends GAME_DATA and ACHIEVEMENTS from data.js
// ═══════════════════════════════════════════════

// ── Additional achievements ────────────────────
ACHIEVEMENTS.push(
  { id: 'trunk_master',    icon: '🌳', name: 'Trunk Master',      desc: 'Understood trunk-based development' },
  { id: 'gitops_engineer', icon: '🔄', name: 'GitOps Engineer',   desc: 'Simulated a GitOps pipeline' },
  { id: 'cc_author',       icon: '📐', name: 'Commit Crafter',    desc: 'Wrote a conventional commit' },
  { id: 'ai_reviewer',     icon: '🤖', name: 'AI Reviewer',       desc: 'Used an AI code review tool' },
  { id: 'agent_pilot',     icon: '🚀', name: 'Agent Pilot',       desc: 'Guided an agentic coding workflow' },
  { id: 'mcp_builder',     icon: '🔌', name: 'MCP Builder',       desc: 'Connected Claude to a Git repo via MCP' },
  { id: 'innovator',       icon: '💡', name: 'Innovator',         desc: 'Completed the Innovator path' }
);

// ── Innovator path ─────────────────────────────
GAME_DATA.innovator = {
  title:    'Innovator Path',
  subtitle: 'Real-world strategies and AI-augmented Git workflows',
  color:    '#d2a8ff',
  icon:     '🚀',
  levels: [

    // ── Level 1 ─────────────────────────────────
    {
      id: 'n1', num: 1, icon: '🌳', xp: 200,
      title: 'Trunk-Based Development',
      subtitle: 'How Google, Meta, and Netflix ship 10× a day',
      type: 'visual',
      tip: 'In TBD, every commit goes directly to trunk (main). Feature flags hide unfinished work — not long-lived branches.',
      commands: [
        { cmd: 'git switch -c short/login-button', desc: 'Short-lived branch (< 2 days)' },
        { cmd: 'git push origin short/login-button && gh pr create', desc: 'PR same day' }
      ],
      gitState: {
        focus: 'All features land on trunk — flags hide them until ready',
        commits: [
          { id: 'c0', msg: 'Trunk: stable base', branch: 'main', parent: null },
          { id: 'c1', msg: 'feat: login button (behind flag)', branch: 'main', parent: 'c0' },
          { id: 'c2', msg: 'fix: nav padding', branch: 'main', parent: 'c1' },
          { id: 'c3', msg: 'feat: search bar (behind flag)', branch: 'main', parent: 'c2' }
        ],
        branches: { main: 'c3' }, HEAD: 'main'
      },
      steps: [
        {
          type: 'story',
          title: 'The 10× Deployment Team',
          context: 'Google deploys to production over 50,000 times per day. Netflix deploys thousands of times. They don\'t use GitFlow with long-lived develop and release branches. They use Trunk-Based Development — one shared main branch, feature flags, and ruthless automation.',
          objective: '🎯 Understand TBD and why leading engineering teams have abandoned long-lived branches'
        },
        {
          type: 'concept',
          title: '🌳 Trunk-Based Development (TBD)',
          icon: '🌳',
          body: `<strong>Core rule:</strong> Every developer integrates to <code>main</code> (the "trunk") at least once per day. Feature branches live at most 1–2 days.

<strong>How unfinished features stay hidden:</strong>
<strong>Feature flags</strong> (LaunchDarkly, Split.io, Unleash) — wrap new code in a flag:
<code>if (featureFlags.isEnabled('new-checkout')) {
  renderNewCheckout();
} else {
  renderOldCheckout();
}</code>

The code is in production but inactive. You control rollout: 1% of users → 10% → 50% → 100%.

<strong>Why TBD beats GitFlow for fast teams:</strong>
✅ No merge hell — you integrate daily, so diffs stay small
✅ Main is always deployable — no "integration branch" chaos
✅ Faster feedback — your code meets teammates' code the same day
✅ Simpler branching model — one rule to understand

<strong>Who uses it:</strong> Google, Meta, Netflix, Amazon, Shopify, GitHub itself.
<strong>Who shouldn't:</strong> Projects with strict versioned releases (device firmware, game consoles) where GitFlow still has merit.`
        },
        {
          type: 'concept',
          title: '🚦 Feature Flags in Practice',
          icon: '🚦',
          body: `A feature flag system lets you <strong>separate deployment from release</strong>.

<strong>Deployment</strong> = pushing code to production servers
<strong>Release</strong> = making a feature visible to users

With flags, you can deploy <em>every hour</em> and release <em>when the business is ready</em>.

<strong>Flag lifecycle:</strong>
1. Create flag: <code>new-payment-flow</code> (default: OFF)
2. Code behind flag, merge to main
3. Enable for internal team → test in production
4. Gradual rollout: 5% → 25% → 100%
5. <strong>Remove the flag</strong> once fully shipped (critical — flag debt accumulates)

<strong>Tools:</strong>
• LaunchDarkly — enterprise, SDKs for every language
• Unleash — open source self-hostable
• Split.io — built-in A/B testing
• GrowthBook — open source with experiment support
• Flagsmith — open source with an API
• Simple env variables — for small teams (but loses gradual rollout)

<strong>Real incident:</strong> Knight Capital Group lost $440M in 45 minutes in 2012 partly because a feature flag wasn't toggled off on one server. <em>Always audit your flag states before major deployments.</em>`
        },
        {
          type: 'interactive',
          title: 'Ship a feature using TBD',
          instructions: 'Walk through how a TBD team ships the new checkout flow:',
          actions: [
            { id: 'n1_flag',   label: '1. Create feature flag: "new-checkout" → OFF in LaunchDarkly',  result: 'Flag created. Default: OFF for all users.' },
            { id: 'n1_code',   label: '2. Wrap code in flag check, commit directly to main',             result: '[main a1b2c3d] Wrap new checkout in feature flag\n 1 file changed', achievement: 'trunk_master' },
            { id: 'n1_deploy', label: '3. Deploy to production (flag is OFF — users see nothing)',       result: '✅ Deployed to prod. New checkout code live but invisible.' },
            { id: 'n1_test',   label: '4. Enable flag for internal team only → test in real production', result: 'Flag: ON for users with @company.com email. QA testing begins.' },
            { id: 'n1_roll',   label: '5. Gradual rollout: 5% → 25% → 100% over 3 days',               result: '✅ Day 3: 100% rollout. Zero incidents. Flag scheduled for cleanup.' }
          ]
        },
        {
          type: 'quiz',
          questions: [
            {
              q: 'In trunk-based development, how does a team ship a half-finished feature to production safely?',
              options: [
                'They create a long-lived feature branch and merge only when done',
                'They wrap the feature in a feature flag so it\'s deployed but invisible to users',
                'They use a separate staging environment and never touch main',
                'They commit directly to main but delete those commits before deploying'
              ],
              correct: 1,
              explanation: '✅ Feature flags decouple deployment from release. Code ships to production behind a flag — invisible until the team chooses to enable it. This enables daily integration to main while unfinished work stays hidden.'
            },
            {
              q: 'Your feature flag for "new-dashboard" is fully rolled out to 100% of users. What should you do next?',
              options: [
                'Leave the flag in place permanently as a kill switch',
                'Remove the flag code — it\'s now dead code that adds complexity and risk',
                'Set it back to 50% as a safety measure',
                'Archive it on the feature flag service but keep the code'
              ],
              correct: 1,
              explanation: '✅ "Flag debt" is real. Once a flag is 100% rolled out and stable, delete the flag AND the conditional code. Accumulated flags make codebases unreadable and can cause incidents (like the Knight Capital story).'
            }
          ]
        }
      ]
    },

    // ── Level 2 ─────────────────────────────────
    {
      id: 'n2', num: 2, icon: '♾️', xp: 220,
      title: 'GitOps — Git as Infrastructure',
      subtitle: 'Your repo is the source of truth for everything',
      type: 'visual',
      tip: 'In GitOps, you never SSH into a server to make changes. You commit to Git. The automation pulls the desired state and applies it.',
      commands: [
        { cmd: 'git commit -m "feat: scale api replicas to 5"', desc: 'Infrastructure change via git commit' },
        { cmd: 'kubectl apply -f k8s/ (done by ArgoCD)', desc: 'ArgoCD syncs automatically' }
      ],
      gitState: {
        focus: 'git push triggers k8s deployment automatically',
        commits: [
          { id: 'c0', msg: 'Initial k8s manifests', branch: 'main', parent: null },
          { id: 'c1', msg: 'scale: api replicas 3→5', branch: 'main', parent: 'c0' },
          { id: 'c2', msg: 'feat: add redis cache config', branch: 'feature/redis', parent: 'c1' },
          { id: 'c3', msg: 'Merge: add redis cache config', branch: 'main', parent: 'c1', merge: 'c2' }
        ],
        branches: { main: 'c3', 'feature/redis': 'c2' }, HEAD: 'main'
      },
      steps: [
        {
          type: 'story',
          title: 'The Infra That Lives in Git',
          context: 'At 3am, your production Kubernetes cluster is running the wrong config because someone SSHed in last week and "temporarily" changed something they forgot to document. Sound familiar? GitOps eliminates this class of problem entirely — Git becomes the single source of truth for ALL infrastructure, and automated tools enforce it.',
          objective: '🎯 Understand GitOps, how ArgoCD/Flux work, and why pull-based deployments are safer'
        },
        {
          type: 'concept',
          title: '♾️ What is GitOps?',
          icon: '♾️',
          body: `GitOps applies Git workflows to infrastructure management. The key principles:

<strong>1. Declarative</strong> — describe desired state, not imperative steps. YAML files in a repo say "I want 5 replicas of the API pod." You don't say HOW to get there.

<strong>2. Versioned and immutable</strong> — all infrastructure changes go through git. Full audit trail. Every change is a commit with author, timestamp, and message.

<strong>3. Pulled automatically</strong> — a GitOps agent (ArgoCD, Flux) runs in the cluster. It watches the Git repo. When the repo changes, it pulls and applies the new state. You never push to the cluster.

<strong>4. Continuously reconciled</strong> — if someone manually changes the cluster, the agent detects drift and reverts to what Git says. "If it's not in Git, it doesn't exist."

<strong>Push-based (old way) vs Pull-based (GitOps):</strong>
Push: CI pipeline runs kubectl apply → needs cluster credentials → security risk
Pull: Agent in cluster watches Git → no external credentials needed → much safer`
        },
        {
          type: 'concept',
          title: '🔄 GitOps Tools: ArgoCD vs Flux',
          icon: '🔄',
          body: `<strong>ArgoCD</strong> — most popular. Web UI + CLI. Visualises app deployment tree. Syncs Kubernetes resources from Git. Supports Helm, Kustomize, plain YAML.
<strong>Best for:</strong> teams that want visibility and a polished UI.

<strong>Flux v2</strong> — CLI-first, Kubernetes-native (GitOps Toolkit). More composable. Supports OCI registries, not just Git.
<strong>Best for:</strong> teams comfortable with CLI and wanting flexibility.

<strong>Typical GitOps repo structure:</strong>
<code>infra-repo/
├── apps/
│   ├── api/
│   │   ├── deployment.yaml   ← 5 replicas, image: api:v2.1
│   │   └── service.yaml
│   └── frontend/
│       └── deployment.yaml
└── clusters/
    └── production/
        └── kustomization.yaml</code>

To scale the API: edit <code>replicas: 5</code> in deployment.yaml, commit, push. ArgoCD detects the change and applies it within ~3 minutes.

<strong>Rollback = git revert</strong>: Bad deploy? <code>git revert HEAD</code> and push. ArgoCD applies the previous state. Zero manual cluster intervention needed.`
        },
        {
          type: 'interactive',
          title: 'GitOps workflow: scale a service',
          actions: [
            { id: 'n2_edit',  label: '1. Edit k8s/api/deployment.yaml: replicas: 3 → 5',               result: 'File saved: replicas changed to 5' },
            { id: 'n2_commit',label: '2. Commit: git commit -m "scale: api replicas 3→5 for Black Friday"', result: '[main b2c3d4e] scale: api replicas 3→5 for Black Friday\n 1 file changed', achievement: 'gitops_engineer' },
            { id: 'n2_push',  label: '3. Push: git push origin main',                                   result: 'To origin/main\n   a1b..b2c  main -> main\n\n⏳ ArgoCD detected change...' },
            { id: 'n2_sync',  label: '4. ArgoCD auto-syncs: applies deployment.yaml to cluster',         result: 'ArgoCD Sync: api/deployment → Synced ✅\nPods: 5/5 Running\nNo manual kubectl needed.' },
            { id: 'n2_drift', label: '5. Someone manually scales to 3 via kubectl (drift detected)',     result: '⚠️ ArgoCD: OutOfSync detected\nExpected: 5 replicas | Actual: 3\nAuto-healing... restored to 5 ✅' }
          ]
        },
        {
          type: 'quiz',
          questions: [{
            q: 'A production incident occurs. The on-call engineer SSHes into the server and makes a config change to fix it. Under GitOps, what should happen next?',
            options: [
              'Nothing — the fix is in production, job done',
              'The GitOps agent will revert the change because it doesn\'t match Git — the engineer must commit the fix to Git',
              'Disable GitOps temporarily to prevent the revert',
              'The engineer should snapshot the server state and update Git tomorrow'
            ],
            correct: 1,
            explanation: '✅ GitOps continuously reconciles cluster state to Git state. An out-of-band change WILL be reverted. The engineer must immediately commit the fix to Git so ArgoCD can apply the intended state. This is by design — it prevents "hidden" changes.'
          }]
        }
      ]
    },

    // ── Level 3 ─────────────────────────────────
    {
      id: 'n3', num: 3, icon: '🏗️', xp: 200,
      title: 'Monorepo at Scale',
      subtitle: 'One repo for everything — Google, Meta, Microsoft do it',
      type: 'visual',
      tip: 'The hardest part of a monorepo isn\'t the code — it\'s CI. You need "affected" detection so you only test what changed.',
      commands: [
        { cmd: 'npx nx affected --target=test', desc: 'Only test apps affected by changes' },
        { cmd: 'npx nx graph',                  desc: 'Visualize the dependency graph' }
      ],
      gitState: {
        focus: 'One commit touches packages in ui-lib and web-app',
        commits: [
          { id: 'c0', msg: 'chore: init monorepo with Nx', branch: 'main', parent: null },
          { id: 'c1', msg: 'feat(ui-lib): Button component', branch: 'main', parent: 'c0' },
          { id: 'c2', msg: 'feat(web-app): use new Button', branch: 'main', parent: 'c1' }
        ],
        branches: { main: 'c2' }, HEAD: 'main'
      },
      steps: [
        {
          type: 'story',
          title: 'One Repo to Rule Them All',
          context: 'Google stores ALL their code — Search, Maps, Gmail, Android, everything — in a single repository. 86 terabytes, 2 billion lines of code, 50,000 engineers. Microsoft moved Windows development to a monorepo. Why? And should your team do it?',
          objective: '🎯 Understand monorepo trade-offs and the tools that make them viable at scale'
        },
        {
          type: 'concept',
          title: '🏗️ Monorepo vs Polyrepo',
          icon: '🏗️',
          body: `<strong>Polyrepo</strong> (traditional): each service/library in its own git repository.
<strong>Monorepo</strong>: all projects in one repository, with clear folder boundaries.

<code>monorepo/
├── apps/
│   ├── web-app/      ← Next.js frontend
│   ├── mobile-app/   ← React Native
│   └── api-service/  ← Node.js backend
└── libs/
    ├── ui-components/ ← Shared design system
    ├── auth-lib/      ← Shared auth utilities
    └── data-models/   ← Shared types/schemas</code>

<strong>Monorepo advantages:</strong>
✅ <strong>Atomic commits</strong> — one commit changes the shared library AND updates all consumers
✅ <strong>Easy refactoring</strong> — rename a function, update all callers in one PR
✅ <strong>Shared tooling</strong> — one ESLint, one Prettier, one CI config
✅ <strong>Dependency graph visibility</strong> — see exactly what depends on what
✅ <strong>No versioning hell</strong> — no internal npm package semver gymnastics

<strong>Monorepo challenges:</strong>
❌ <strong>CI naivety</strong> — running all tests on every commit is slow → need "affected" detection
❌ <strong>Git performance</strong> — large repos need git sparse-checkout and partial clone
❌ <strong>Access control</strong> — CODEOWNERS and GitHub branch protection become critical
❌ <strong>Tooling investment</strong> — need Nx, Turborepo, or Bazel to manage it properly`
        },
        {
          type: 'concept',
          title: '⚡ Monorepo Tools: Nx, Turborepo, Bazel',
          icon: '⚡',
          body: `<strong>Nx</strong> (by Nrwl) — most mature. Works for JS/TS, but also Go, Python, .NET via plugins. Key features: affected detection, computation caching, code generation, dependency graph visualisation.
<code>npx nx affected --target=test  # only test what changed</code>
<code>npx nx graph                   # open browser with dep graph</code>

<strong>Turborepo</strong> (by Vercel) — faster to set up than Nx. Excellent for JS/TS monorepos. Remote caching via Vercel. Simpler mental model.
<code>turbo run build test lint --affected</code>

<strong>Bazel</strong> (by Google, open sourced) — what Google actually uses internally. Language-agnostic. Extremely fast incremental builds. Steep learning curve. Used at Stripe, Dropbox, Twitter.

<strong>Changesets</strong> — for monorepos that still publish npm packages. Tracks what changed, generates changelogs, automates versioning.

<strong>Git features that help at scale:</strong>
<code>git sparse-checkout</code> — check out only the folders you need
<code>git partial-clone --filter=blob:none</code> — clone without file content initially (fetch on demand)
<code>git maintenance</code> — background repo optimisation`
        },
        {
          type: 'quiz',
          questions: [{
            q: 'Your monorepo CI runs 45 minutes of tests on every commit because it tests all 30 apps. What\'s the right fix?',
            options: [
              'Split into a polyrepo so each repo has fewer tests',
              'Use "affected" detection (Nx/Turborepo) to only test apps whose dependency graph was touched',
              'Only run tests on main, not on feature branches',
              'Reduce test coverage so the suite runs faster'
            ],
            correct: 1,
            explanation: '✅ "Affected" detection analyses which projects depend on the changed code. If you edited a shared library, only that library and its consumers are tested. An unrelated app\'s 15-minute test suite is skipped entirely. This is the killer feature of monorepo tooling.'
          }]
        }
      ]
    },

    // ── Level 4 ─────────────────────────────────
    {
      id: 'n4', num: 4, icon: '📐', xp: 180,
      title: 'Conventional Commits & Semantic Release',
      subtitle: 'Let your commit messages drive versioning and changelogs automatically',
      type: 'interactive',
      tip: 'semantic-release reads your commit history and automatically determines the next version: fix: → patch, feat: → minor, BREAKING CHANGE → major.',
      commands: [
        { cmd: 'git commit -m "feat(auth): add OAuth2 login"',      desc: 'Minor version bump (new feature)' },
        { cmd: 'git commit -m "fix(api): handle null user session"', desc: 'Patch version bump (bug fix)' },
        { cmd: 'git commit -m "feat!: redesign API response format"',desc: 'Major version bump (breaking change)' }
      ],
      gitState: {
        focus: 'Commits auto-bump semver: fix→patch, feat→minor, feat!→major',
        commits: [
          { id: 'c0', msg: 'chore: setup semantic-release', branch: 'main', parent: null, tag: 'v1.0.0' },
          { id: 'c1', msg: 'fix(api): null session fix', branch: 'main', parent: 'c0', tag: 'v1.0.1' },
          { id: 'c2', msg: 'feat(auth): add OAuth2 login', branch: 'main', parent: 'c1', tag: 'v1.1.0' },
          { id: 'c3', msg: 'feat!: redesign API format', branch: 'main', parent: 'c2', tag: 'v2.0.0' }
        ],
        branches: { main: 'c3' }, HEAD: 'main',
        tags: { 'v1.0.0': 'c0', 'v1.0.1': 'c1', 'v1.1.0': 'c2', 'v2.0.0': 'c3' }
      },
      steps: [
        {
          type: 'story',
          title: 'Automation Through Convention',
          context: 'Every time you ship, someone manually updates the version number, writes the CHANGELOG, creates a GitHub release, and publishes the npm package. It takes 30 minutes and introduces human error. What if a commit message like "feat: add dark mode" automatically bumped the version, updated the changelog, and triggered the release pipeline?',
          objective: '🎯 Write Conventional Commits and set up semantic-release to fully automate versioning'
        },
        {
          type: 'concept',
          title: '📐 The Conventional Commits Standard',
          icon: '📐',
          body: `<strong>Conventional Commits</strong> is a specification for structured commit messages. Format:
<code>type(scope): description

[optional body]

[optional footer — BREAKING CHANGE: description]</code>

<strong>Types and their semver impact:</strong>
<code>fix:</code>     — bug fix → <strong>PATCH</strong> bump (1.0.0 → 1.0.1)
<code>feat:</code>   — new feature → <strong>MINOR</strong> bump (1.0.0 → 1.1.0)
<code>BREAKING CHANGE:</code> in footer, or <code>feat!:</code> — <strong>MAJOR</strong> bump (1.0.0 → 2.0.0)
<code>chore:</code>  — maintenance, no version bump
<code>docs:</code>   — documentation, no version bump
<code>test:</code>   — tests, no version bump
<code>refactor:</code> — no behaviour change, no version bump
<code>perf:</code>   — performance improvement → PATCH

<strong>Real examples:</strong>
<code>feat(payments): add Apple Pay support</code>
<code>fix(auth): prevent session fixation on login</code>
<code>feat!: remove deprecated /v1 API endpoints

BREAKING CHANGE: /v1/* routes removed. Migrate to /v2/*.</code>

<strong>Tooling:</strong>
• <code>commitlint</code> — validates commit messages in a pre-commit hook
• <code>commitizen</code> — interactive CLI that prompts for type/scope/description`
        },
        {
          type: 'interactive',
          title: 'Write conventional commits that drive automation',
          actions: [
            { id: 'n4_fix',   label: '1. Bug fix: git commit -m "fix(checkout): prevent duplicate order submission"', result: '✅ Type: fix → PATCH bump queued\n   Next version: 1.2.3 → 1.2.4', achievement: 'cc_author' },
            { id: 'n4_feat',  label: '2. Feature: git commit -m "feat(notifications): add email digest option"',      result: '✅ Type: feat → MINOR bump queued\n   Next version: 1.2.4 → 1.3.0' },
            { id: 'n4_break', label: '3. Breaking: git commit -m "feat!: migrate auth to JWT\n\nBREAKING CHANGE: cookie-based auth removed"', result: '✅ BREAKING CHANGE → MAJOR bump queued\n   Next version: 1.3.0 → 2.0.0' },
            { id: 'n4_ci',    label: '4. Push triggers semantic-release in CI (simulated)',                            result: '🤖 semantic-release running...\n   Analysed 3 commits\n   Publishing v2.0.0...\n   ✅ GitHub Release created: v2.0.0\n   ✅ CHANGELOG.md updated\n   ✅ npm publish complete\n   ✅ Slack notification sent' }
          ]
        },
        {
          type: 'quiz',
          questions: [{
            q: 'Your team merges: fix(api): correct typo in error message. What version bump does semantic-release apply?',
            options: [
              'No bump — typo fixes don\'t warrant a release',
              'PATCH (1.4.2 → 1.4.3) — fix: always triggers a patch release',
              'MINOR (1.4.2 → 1.5.0) — any user-visible change is a feature',
              'MAJOR — error message changes are breaking for users who parse them'
            ],
            correct: 1,
            explanation: '✅ Any commit with type fix: triggers a patch version bump in semantic-release, regardless of the size of the fix. Even a typo correction deserves a published version — downstream consumers can decide whether to upgrade.'
          }]
        }
      ]
    },

    // ── Level 5 ─────────────────────────────────
    {
      id: 'n5', num: 5, icon: '🤖', xp: 240,
      title: 'AI Commit Messages & PR Descriptions',
      subtitle: 'GitHub Copilot and Claude write better commit messages than most humans',
      type: 'ide',
      tip: 'AI-generated commit messages are a starting point, not the end. Always review and edit — AI doesn\'t know the business context behind a change.',
      commands: [
        { cmd: 'gh copilot suggest "write a commit message for this diff"', desc: 'GitHub Copilot CLI' }
      ],
      gitState: {
        focus: 'AI wrote both messages — humans review the diff',
        commits: [
          { id: 'c0', msg: 'fix(auth): session fixation fix', branch: 'main', parent: null },
          { id: 'c1', msg: 'feat(ui): skeleton loading widgets', branch: 'main', parent: 'c0' }
        ],
        branches: { main: 'c1' }, HEAD: 'main'
      },
      steps: [
        {
          type: 'story',
          title: 'The AI Writing Your Git History',
          context: 'You changed 8 files, fixed a race condition, updated 3 tests, and refactored a utility function. Writing a good commit message for all that takes thought. AI tools can read your diff and suggest structured, accurate messages — faster than you can type "fix stuff".',
          objective: '🎯 Use AI tools to generate commit messages and PR descriptions, then learn when to override them'
        },
        {
          type: 'concept',
          title: '🤖 AI Tools for Git Writing',
          icon: '🤖',
          body: `<strong>GitHub Copilot (in VS Code/JetBrains)</strong>
• Source Control panel → ✨ sparkle icon → generates commit message from staged diff
• Reads the actual code changes and writes a descriptive message
• Supports Conventional Commit format with the right VS Code setting

<strong>GitHub Copilot CLI</strong>
<code>gh copilot suggest "commit message for this diff"</code>

<strong>Claude (via Cursor, Windsurf, or Claude.ai)</strong>
• Paste a diff → ask "write a conventional commit message"
• Ask "write a PR description with what changed, why, and how to test"
• Understands semantic meaning, not just text similarity

<strong>Commitgpt, aicommits, autodoc</strong> — smaller CLI tools that call OpenAI/Claude APIs and pipe your <code>git diff</code> output into the prompt.

<strong>When AI commit messages shine:</strong>
✅ Large diffs with multiple concerns
✅ Consistent commit message style across the team
✅ First draft for a PR description

<strong>When to override the AI:</strong>
⚠️ AI doesn't know WHY you made the change (business context, ticket number, regulatory requirement)
⚠️ AI can hallucinate — always read what it wrote
⚠️ AI won't know if a change is a BREAKING CHANGE unless the diff makes it obvious`
        },
        {
          type: 'ide',
          mode: 'ai-commit',
          diff: `diff --git a/src/auth/session.ts b/src/auth/session.ts
@@ -42,7 +42,12 @@ export async function loginUser(email, password) {
   const user = await db.users.findByEmail(email);
   if (!user || !bcrypt.compare(password, user.hash)) {
     throw new AuthError('Invalid credentials');
   }
+  // Regenerate session ID after authentication to prevent session fixation
+  await session.regenerate();
+  session.userId = user.id;
+  session.createdAt = Date.now();
   return createToken(user);
 }`,
          aiMessages: [
            { tool: 'GitHub Copilot', msg: 'fix(auth): regenerate session ID after successful login to prevent session fixation attacks' },
            { tool: 'Claude',         msg: 'fix(auth): prevent session fixation vulnerability on login\n\nRegenerate session ID after authentication to ensure an attacker who\nset a known session cookie cannot hijack the authenticated session.\n\nSecurity: resolves OWASP A07:2021 (Identification and Authentication Failures)' },
            { tool: 'Human (bad)',    msg: 'fix auth bug' }
          ]
        },
        {
          type: 'quiz',
          questions: [{
            q: 'AI generates the commit message: "fix(checkout): update payment logic". What\'s missing?',
            options: [
              'Nothing — it follows conventional commit format',
              'It\'s too vague — "update payment logic" doesn\'t say what was fixed or why. A reviewer can\'t understand the change without reading the diff.',
              'It should use "feat:" not "fix:" for payment changes',
              'It needs a ticket number'
            ],
            correct: 1,
            explanation: '✅ Good commit messages explain WHAT changed and WHY — not just that something was "updated". Better: "fix(checkout): prevent double-charge when payment webhook retries". AI gives a starting point; you add the business context it doesn\'t know.'
          }]
        }
      ]
    },

    // ── Level 6 ─────────────────────────────────
    {
      id: 'n6', num: 6, icon: '🔍', xp: 260,
      title: 'AI Code Review: CodeRabbit, Copilot & Claude',
      subtitle: 'Every PR reviewed by AI before a human sees it',
      type: 'ide',
      tip: 'AI reviewers are best at catching security issues, style violations, and missing edge cases. They\'re weak at understanding business context — that\'s what human reviewers are for.',
      commands: [
        { cmd: '# .github/workflows/ai-review.yml', desc: 'Add AI review to CI pipeline' }
      ],
      gitState: {
        focus: 'CodeRabbit reviews the PR before any human sees it',
        commits: [
          { id: 'c0', msg: 'feat(api): user export endpoint', branch: 'feature/export', parent: null },
          { id: 'c1', msg: 'test(api): export endpoint tests', branch: 'feature/export', parent: 'c0' }
        ],
        branches: { main: null, 'feature/export': 'c1' }, HEAD: 'feature/export'
      },
      steps: [
        {
          type: 'story',
          title: 'The Reviewer That Never Sleeps',
          context: 'Your team\'s senior engineer Priya reviews every PR. But she\'s in Melbourne, you\'re in London, and your PR lands at 11pm her time. By the time she reviews it tomorrow, you\'ve been blocked for 18 hours. What if an AI reviewed it instantly — catching obvious issues before Priya even opens it?',
          objective: '🎯 Configure AI code review and understand how to act on its feedback'
        },
        {
          type: 'concept',
          title: '🔍 AI Code Review Tools',
          icon: '🔍',
          body: `<strong>CodeRabbit</strong> — most popular AI PR reviewer. Install GitHub App → every PR gets automated line-by-line review. Understands context across files. Customisable with <code>.coderabbit.yaml</code>. Free for open source.

<strong>GitHub Copilot Code Review</strong> (2025+) — native GitHub integration. Reviews on demand or auto-triggered. Understands repo context via embeddings.

<strong>Sourcery</strong> — Python specialist. Suggests refactors, detects anti-patterns, flags complexity.

<strong>Claude via GitHub Actions</strong> — call Claude API in a workflow. Pass the diff + context. Post comments via GitHub API. Fully customisable prompt. Good for domain-specific rules.

<strong>What AI reviewers catch well:</strong>
✅ Security vulnerabilities (SQL injection, missing input validation, exposed secrets)
✅ Missing null checks / edge cases
✅ Code style and naming consistency
✅ Missing error handling
✅ Obvious logic bugs
✅ Documentation gaps

<strong>What they miss:</strong>
❌ Business logic correctness (does this code do what the ticket intended?)
❌ Architectural decisions (should this be a service or a library?)
❌ Team conventions not in the codebase
❌ Subtle performance issues at production scale

<strong>Best practice:</strong> AI review runs first (blocking), human review second (contextual).`
        },
        {
          type: 'ide',
          mode: 'ai-review',
          prTitle: 'feat(api): add user data export endpoint',
          reviewComments: [
            {
              tool: 'CodeRabbit',
              icon: '🐰',
              severity: 'critical',
              file: 'api/export.ts',
              line: 28,
              comment: '**Security: Missing authorization check** — The endpoint returns all user data but only checks `req.user.isLoggedIn`. It does not verify that the requester is fetching their OWN data or has admin rights. Any authenticated user could export any other user\'s data by changing the `userId` query param.',
              suggestion: 'Add: `if (req.user.id !== userId && !req.user.isAdmin) throw new ForbiddenError()`'
            },
            {
              tool: 'CodeRabbit',
              icon: '🐰',
              severity: 'warning',
              file: 'api/export.ts',
              line: 45,
              comment: '**Missing rate limiting** — Data export endpoints are commonly abused for scraping. Consider adding rate limiting (e.g., max 3 exports/hour per user).'
            },
            {
              tool: 'GitHub Copilot',
              icon: '🐙',
              severity: 'suggestion',
              file: 'api/export.ts',
              line: 62,
              comment: '**Potential memory issue** — `getAllUserRecords()` loads all records into memory before streaming. For users with >100k records this will exhaust heap. Consider using a database cursor and streaming the response.'
            },
            {
              tool: 'CodeRabbit',
              icon: '🐰',
              severity: 'info',
              file: 'api/export.test.ts',
              line: 12,
              comment: '**Missing test case** — No test for the case where `userId` doesn\'t belong to the authenticated user. This is the exact case that the security issue above would cover.'
            }
          ]
        },
        {
          type: 'quiz',
          questions: [{
            q: 'CodeRabbit flags a critical security issue: missing authorization on an endpoint. Your human reviewer approves the PR anyway. What should you do?',
            options: [
              'Merge — the human reviewer\'s judgment overrides the AI',
              'Dismiss — AI reviewers have too many false positives',
              'Treat it as seriously as a human review comment — fix the auth check before merging, or explicitly document why it\'s a false positive',
              'File it as a follow-up ticket and merge now'
            ],
            correct: 2,
            explanation: '✅ Critical security findings from AI reviewers should be treated with the same weight as human review comments. Either fix them or explicitly justify why the finding is incorrect. "The AI flagged it but the human approved" is not an audit-safe response to a security issue.'
          }]
        }
      ]
    },

    // ── Level 7 ─────────────────────────────────
    {
      id: 'n7', num: 7, icon: '🚀', xp: 280,
      title: 'Agentic Coding: Cursor, Copilot Workspace & Claude Code',
      subtitle: 'From describing a problem to a merged PR — without writing the code yourself',
      type: 'ide',
      tip: 'The shift: you become the architect and reviewer, not the typist. Your value is in direction, judgment, and context — not keystrokes.',
      commands: [
        { cmd: 'claude "implement the export endpoint with auth"', desc: 'Claude Code CLI agent' }
      ],
      gitState: {
        focus: 'AI authored feature, tests, and fix — all reviewed by CodeRabbit',
        commits: [
          { id: 'c0', msg: 'feat(api): export endpoint [AI]', branch: 'feature/export', parent: null },
          { id: 'c1', msg: 'test(api): export tests [AI]', branch: 'feature/export', parent: 'c0' },
          { id: 'c2', msg: 'fix(api): auth finding fix [AI]', branch: 'feature/export', parent: 'c1' }
        ],
        branches: { main: null, 'feature/export': 'c2' }, HEAD: 'feature/export'
      },
      steps: [
        {
          type: 'story',
          title: 'The Agent That Writes, Tests, and Commits',
          context: 'A new class of coding tool has emerged: AI agents that don\'t just suggest — they act. They create files, write tests, run them, fix failures, and commit. Tools like Claude Code, Cursor, Windsurf, and GitHub Copilot Workspace can take a task description and produce a working, tested PR. Your role shifts from author to director.',
          objective: '🎯 Understand agentic coding workflows and how to effectively collaborate with AI agents on Git tasks'
        },
        {
          type: 'concept',
          title: '🚀 The Agentic Tool Landscape',
          icon: '🚀',
          body: `<strong>Claude Code</strong> (Anthropic) — CLI agent that runs in your terminal. Has full access to your filesystem, can run tests, execute git commands, and iterate. You describe the task, it builds. Works with any codebase, any language.
<code>claude "add rate limiting to the export endpoint, write tests"</code>

<strong>Cursor / Windsurf</strong> — AI-native IDEs. "Composer" mode lets you describe a multi-file change and the agent implements it across your entire codebase. Has access to your codebase graph.

<strong>GitHub Copilot Workspace</strong> — describe an issue → get a full implementation plan → agent writes code → you review a diff → one-click PR. Entirely in the browser, no local setup.

<strong>How agentic tools interact with Git:</strong>
1. Agent creates a branch (or you specify one)
2. Agent writes code across multiple files
3. Agent runs tests → fixes failures autonomously
4. Agent stages and commits with descriptive messages
5. Agent can push and even open a PR
6. You review the diff and request changes

<strong>The workflow shift:</strong>
Old: Write code → Review your own code → Open PR → Wait for review
New: Describe task → Agent writes code → You review → Request changes → Merge

Your value becomes: <em>knowing what to build, spotting what the agent got wrong, and adding business context it can\'t know.</em>`
        },
        {
          type: 'ide',
          mode: 'agent-workflow',
          task: 'Add rate limiting to the /api/export endpoint: max 3 requests per user per hour. Return 429 with retry-after header. Write tests.',
          agentSteps: [
            { step: 1, action: 'Reading codebase structure…',        output: 'Found: api/export.ts, api/middleware/, tests/api/' },
            { step: 2, action: 'Installing rate-limit library…',     output: 'npm install express-rate-limit  ✅' },
            { step: 3, action: 'Writing rate limit middleware…',     output: 'Created: api/middleware/rateLimit.ts' },
            { step: 4, action: 'Applying middleware to route…',      output: 'Modified: api/export.ts (3 lines changed)' },
            { step: 5, action: 'Writing tests…',                     output: 'Created: tests/api/export.ratelimit.test.ts (4 test cases)' },
            { step: 6, action: 'Running tests…',                     output: '✅ 4/4 tests passing' },
            { step: 7, action: 'Staging and committing…',            output: 'git add -A && git commit -m "feat(api): add rate limiting to export endpoint\\n\\nMax 3 requests/user/hour. Returns 429 with Retry-After header."' },
            { step: 8, action: 'Opening PR…',                       output: 'PR #247 created: "feat(api): add rate limiting to export endpoint"' }
          ],
          achievement: 'agent_pilot'
        },
        {
          type: 'quiz',
          questions: [{
            q: 'An AI agent opens a PR that passes all tests and CI checks. Should you merge it without reviewing the code?',
            options: [
              'Yes — if tests pass, the implementation is correct',
              'No — you must review the diff. Agents make subtle logical errors, choose wrong abstractions, or miss business constraints not expressed in tests.',
              'Only for small PRs under 50 lines',
              'Yes, but run it in staging for 24 hours first'
            ],
            correct: 1,
            explanation: '✅ Passing tests only verify what was tested. Agents can implement the wrong thing correctly — if the tests don\'t cover an edge case, the agent won\'t either. Always review the diff. Your judgment on correctness, security, and design is what adds value.'
          }]
        }
      ]
    },

    // ── Level 8 ─────────────────────────────────
    {
      id: 'n8', num: 8, icon: '🔌', xp: 300,
      title: 'MCP: Connecting Claude to Your Git Repo',
      subtitle: 'Model Context Protocol — give AI agents real tools, not just text',
      type: 'interactive',
      tip: 'MCP is the standard that lets AI assistants call real tools. Instead of pasting diffs into chat, the AI reads your repo directly.',
      commands: [
        { cmd: '# .mcp.json — configure MCP server', desc: 'MCP config in repo root' },
        { cmd: 'claude mcp add github-server',        desc: 'Add GitHub MCP to Claude Code' }
      ],
      gitState: {
        focus: "MCP gives Claude live access to this repo's git history",
        commits: [
          { id: 'c0', msg: 'chore: add .mcp.json config', branch: 'main', parent: null },
          { id: 'c1', msg: 'feat: Claude reads repo via MCP', branch: 'main', parent: 'c0' }
        ],
        branches: { main: 'c1' }, HEAD: 'main'
      },
      steps: [
        {
          type: 'story',
          title: 'AI That Can Actually See Your Repo',
          context: 'You ask Claude "what changed this sprint?" — but Claude doesn\'t have access to your GitHub repo. You paste in git logs and Claude answers from the text. That\'s a workaround. MCP (Model Context Protocol) is the solution: a standard that lets AI models call real tools — read your repo, list PRs, search commits, open issues — without you copying and pasting anything.',
          objective: '🎯 Understand MCP and configure Claude to directly interact with your Git repository'
        },
        {
          type: 'concept',
          title: '🔌 What is MCP?',
          icon: '🔌',
          body: `<strong>Model Context Protocol (MCP)</strong> is an open standard created by Anthropic that allows AI models to securely call external tools and data sources.

Think of it as a <strong>USB-C standard for AI tools</strong>: instead of every AI having custom integrations for every tool, MCP defines a common protocol. Any MCP-compatible AI (Claude, others) can use any MCP server.

<strong>How it works:</strong>
1. An <strong>MCP server</strong> wraps a tool (GitHub, filesystem, database, Jira…)
2. Claude Code (or any MCP client) discovers the server's available "tools"
3. When you ask Claude a question, it calls the tool to get real data
4. Claude answers with actual information, not hallucinations

<strong>Available MCP servers for Git workflows:</strong>
• <code>@modelcontextprotocol/server-github</code> — read repos, issues, PRs, commits, file contents
• <code>@modelcontextprotocol/server-filesystem</code> — read/write local files
• <code>@modelcontextprotocol/server-git</code> — run git operations directly
• <code>@modelcontextprotocol/server-gitlab</code> — GitLab equivalent
• Third-party: Linear, Jira, Slack, Datadog — connect your whole workflow

<strong>Configuration:</strong>
<code>// .mcp.json (project-level)
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_..." }
    }
  }
}</code>`
        },
        {
          type: 'interactive',
          title: 'Set up MCP and query your repo',
          actions: [
            { id: 'n8_install', label: '1. Install GitHub MCP server: npm install -g @modelcontextprotocol/server-github', result: 'installed @modelcontextprotocol/server-github@0.6.2' },
            { id: 'n8_config',  label: '2. Create .mcp.json with GitHub token config',                                      result: '.mcp.json created. Claude Code will auto-discover this server.' },
            { id: 'n8_ask1',    label: '3. Ask Claude: "What PRs were merged this week?"',                                  result: 'Claude [via MCP/github]: Fetching merged PRs...\n\nPRs merged this week:\n• #241 feat(auth): add OAuth2 — merged Mon by Amara\n• #244 fix(api): null session — merged Tue by Raj\n• #247 feat(api): rate limiting — merged Thu by You\n\n3 PRs, 847 lines changed across 12 files.', achievement: 'mcp_builder' },
            { id: 'n8_ask2',    label: '4. Ask Claude: "Which commits touched checkout.js in the last month?"',             result: 'Claude [via MCP/git]: Running git log --follow -- src/checkout.js...\n\nb3c4d5e feat(checkout): add Apple Pay (Amara, 5 days ago)\na2b3c4d fix(checkout): prevent double-charge (You, 12 days ago)\n9f8e7d6 refactor(checkout): extract payment utils (Raj, 23 days ago)' },
            { id: 'n8_ask3',    label: '5. Ask Claude: "Summarise the changes in PR #241 for the weekly report"',           result: 'Claude [via MCP/github]: Reading PR #241 diff and comments...\n\n**PR #241 Summary for Weekly Report:**\nAdded OAuth2 authentication (Google + GitHub) as alternatives to email/password login. Users can now sign in with existing accounts. Security reviewed by Priya. 3 conversation threads resolved. All CI checks passing. Impact: reduces friction for new user signup.' }
          ]
        },
        {
          type: 'quiz',
          questions: [{
            q: 'Without MCP, you ask Claude to "summarise what changed in the repo this week." What does Claude do?',
            options: [
              'Automatically queries GitHub API',
              'Returns a hallucinated summary based on training data about your project',
              'Asks you to paste the relevant information, or generates a plausible-sounding but fabricated answer',
              'Refuses to answer since it has no internet access'
            ],
            correct: 2,
            explanation: '✅ Without tools, Claude has no access to your actual repo. It might ask you to paste the data, or worse, generate a confident-sounding but fabricated summary. MCP gives Claude real access to real data — turning it from a guesser into a genuinely useful assistant.'
          }]
        }
      ]
    },

    // ── Level 9 ─────────────────────────────────
    {
      id: 'n9', num: 9, icon: '🧠', xp: 280,
      title: 'AI-Assisted Conflict Resolution & Merge Queues',
      subtitle: 'Beyond <<<<<<< — AI understands INTENT, not just lines',
      type: 'interactive',
      tip: 'Merge queues (GitHub, GitLab) serialize PRs and test each one in its merged order — eliminating the "passes individually, breaks together" problem.',
      commands: [
        { cmd: 'gh pr merge --merge --auto', desc: 'Queue PR for auto-merge when checks pass' }
      ],
      gitState: {
        focus: 'Merge queue combines PRs, runs CI together, then merges both',
        commits: [
          { id: 'c0', msg: 'Base: stable main', branch: 'main', parent: null },
          { id: 'c1', msg: 'PR #1: refactor payment', branch: 'feature/pay-refactor', parent: 'c0' },
          { id: 'c2', msg: 'PR #2: payment retry logic', branch: 'feature/pay-retry', parent: 'c0' },
          { id: 'c3', msg: 'Merge queue: PR#1+PR#2 → merged', branch: 'main', parent: 'c0', merge: 'c2' }
        ],
        branches: { main: 'c3', 'feature/pay-refactor': 'c1', 'feature/pay-retry': 'c2' }, HEAD: 'main'
      },
      steps: [
        {
          type: 'story',
          title: 'Smarter Merging Through AI',
          context: 'Two PRs each pass CI individually. After merging both, tests fail — they had a semantic conflict Git didn\'t detect (same function, different intentions). Meanwhile, 12 PRs are queued to merge and developers are refreshing GitHub every 5 minutes. AI-assisted conflict resolution and merge queues solve both problems.',
          objective: '🎯 Use AI for semantic conflict resolution and set up merge queues to eliminate merge chaos'
        },
        {
          type: 'concept',
          title: '🧠 Semantic Conflicts: The Invisible Problem',
          icon: '🧠',
          body: `Git detects <strong>textual conflicts</strong> — two branches edited the same lines. But it can't detect <strong>semantic conflicts</strong>:

<strong>Example:</strong>
• PR A: Renames <code>processPayment(amount)</code> to <code>processPayment(amount, currency)</code>
• PR B: Adds a new call to <code>processPayment(total)</code>

Git merges both cleanly — no conflict markers. But at runtime: <code>processPayment</code> now expects 2 arguments and PR B's call only passes 1. Crash in production.

<strong>AI-assisted resolution helps with genuine text conflicts:</strong>
Tools like <strong>GitButler</strong> understand BOTH branches' intent. Instead of "pick ours or theirs", it synthesises:
"You renamed the function AND they added a new call to it — I'll update the new call to use the new signature."

<strong>Tools:</strong>
• <strong>GitButler</strong> — AI-native git client, virtual branches, AI merge suggestions
• <strong>Graphite</strong> — stacked PRs with merge intelligence
• <strong>Claude</strong> — paste both versions and ask it to resolve semantically

<strong>Merge Queues:</strong>
Instead of 12 PRs racing to merge and each needing to rebase after every merge, a merge queue:
1. Takes PRs in order
2. Creates a "test branch" = main + PR1 + PR2 + PR3 merged together
3. Runs CI on this combined state
4. If green, merges all at once
5. If red, identifies which PR caused the failure

GitHub Merge Queue (native), Graphite, and Merge Queue by Aviator implement this.`
        },
        {
          type: 'interactive',
          title: 'Configure and use a merge queue',
          actions: [
            { id: 'n9_enable', label: '1. Enable Merge Queue: GitHub → Settings → Branches → Merge Queue ON', result: 'Merge queue enabled for main.\nAll PRs must pass CI in merge order before landing.' },
            { id: 'n9_pr1',    label: '2. PR #248 approved: gh pr merge --auto --squash',                     result: 'PR #248 added to merge queue.\nQueue position: 1 of 3\nBuilding combined test branch: main + #248...' },
            { id: 'n9_pr2',    label: '3. PR #249 approved while queue running: auto-queued',                 result: 'PR #249 added to merge queue.\nQueue position: 2 of 3\nBuilding combined test branch: main + #248 + #249...' },
            { id: 'n9_result', label: '4. Queue results: both PRs tested in merge order',                     result: '✅ #248 + #249 combined CI: PASS\n\nMerged #248 → main (09:41:22)\nMerged #249 → main (09:41:24)\n\n0 conflicts. 0 reverts. Developers unblocked.' }
          ]
        },
        {
          type: 'quiz',
          questions: [{
            q: 'PR A and PR B both pass CI independently. After merging A, B\'s CI fails. With a merge queue, when would this failure be caught?',
            options: [
              'Never — merge queues can\'t detect semantic conflicts',
              'After B is merged to main (same as without a queue)',
              'During the queue run, before either PR is merged — the queue tests them in combined order',
              'Only if you use AI-assisted review alongside the queue'
            ],
            correct: 2,
            explanation: '✅ The merge queue builds a test branch that combines both PRs in order and runs CI on that combined state. If the combination fails, neither PR merges and you know exactly which combination caused the problem — before any code lands on main.'
          }]
        }
      ]
    },

    // ── Level 10 ────────────────────────────────
    {
      id: 'n10', num: 10, icon: '🤖', xp: 280,
      title: 'Dependabot, Renovate & Autonomous Dependency Management',
      subtitle: 'AI agents that keep your dependencies updated — automatically',
      type: 'ide',
      tip: 'Renovate groups related updates (all ESLint packages) into one PR — reducing noise vs Dependabot\'s one-PR-per-package approach.',
      commands: [
        { cmd: '# .github/dependabot.yml', desc: 'Configure Dependabot in your repo' },
        { cmd: '# renovate.json',          desc: 'Configure Renovate bot' }
      ],
      gitState: {
        focus: 'Two bots opened parallel dep PRs from the same stable base',
        commits: [
          { id: 'base', msg: 'Stable main branch',              branch: 'main',         parent: null },
          { id: 'c0',   msg: 'Bump express 4.18→4.19 [Bot]',   branch: 'deps/express', parent: 'base' },
          { id: 'c1',   msg: 'Bump @types/node 20.10→20.14 [Bot]', branch: 'deps/types', parent: 'base' }
        ],
        branches: { main: 'base', 'deps/express': 'c0', 'deps/types': 'c1' }, HEAD: 'main'
      },
      steps: [
        {
          type: 'story',
          title: 'The Bot That Minds Your Dependencies',
          context: 'Your package.json has 80 dependencies. Each has security patches, minor updates, and occasional major breaking changes. Manually tracking and updating them is a part-time job — and teams that neglect it end up with Log4Shell-scale security incidents when a critical CVE hits an outdated library they forgot about. Dependabot and Renovate do this automatically.',
          objective: '🎯 Configure automated dependency management and handle bot-generated PRs like a pro'
        },
        {
          type: 'concept',
          title: '🤖 Dependabot vs Renovate',
          icon: '🤖',
          body: `<strong>Dependabot</strong> (GitHub native, free):
• Built into GitHub — enable with a <code>.github/dependabot.yml</code> file
• Creates one PR per package update
• Automatically rebases PRs when main changes
• Groups security patches in one PR (new feature)
• Supports npm, pip, Maven, Go, Docker, GitHub Actions

<code># .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"     # daily | weekly | monthly
    groups:
      production-dependencies:
        dependency-type: "production"</code>

<strong>Renovate</strong> (open source, more powerful):
• Groups related updates (all ESLint packages → 1 PR)
• Semantic versioning awareness — knows major vs minor vs patch
• Auto-merges patch and minor updates (configurable)
• Dashboard PR that shows all pending updates in one view
• Supports 90+ package managers

<code>// renovate.json
{
  "extends": ["config:recommended"],
  "automerge": true,
  "automergeType": "pr",
  "packageRules": [
    {
      "matchUpdateTypes": ["patch", "minor"],
      "automerge": true
    },
    {
      "matchUpdateTypes": ["major"],
      "automerge": false,
      "assignees": ["@lead-dev"]
    }
  ]
}</code>

<strong>Security alerts:</strong>
GitHub's Dependabot security alerts detect CVEs in your dependencies and create priority PRs automatically, even outside your update schedule.`
        },
        {
          type: 'ide',
          mode: 'dependabot-prs',
          prs: [
            { num: 301, type: 'security', pkg: 'express', from: '4.18.1', to: '4.19.2', severity: 'HIGH', cve: 'CVE-2024-29041', autoMerge: false },
            { num: 302, type: 'patch',    pkg: 'lodash',  from: '4.17.20', to: '4.17.21', severity: null, autoMerge: true },
            { num: 303, type: 'minor',    pkg: 'typescript', from: '5.3.3', to: '5.4.5', severity: null, autoMerge: true },
            { num: 304, type: 'major',    pkg: 'jest',    from: '28.1.3', to: '29.7.0', severity: null, autoMerge: false }
          ]
        },
        {
          type: 'quiz',
          questions: [{
            q: 'Renovate is configured with automerge: true for patch updates. PR #302 updates lodash 4.17.20 → 4.17.21, all CI passes. What happens?',
            options: [
              'Renovate still waits for a human to approve',
              'Renovate auto-merges the PR without human review — this is intended for low-risk patch updates',
              'Renovate merges but sends a Slack notification first',
              'Auto-merge only works for security patches, not regular updates'
            ],
            correct: 1,
            explanation: '✅ With automerge configured for patches, Renovate merges automatically once CI is green. This is the whole point — patch updates are low-risk and auto-merging frees humans to focus on major version upgrades that need judgment. Your CI suite is the safety net.'
          }]
        }
      ]
    },

    // ── Level 11 ────────────────────────────────
    {
      id: 'n11', num: 11, icon: '🏆', xp: 400,
      title: 'Innovator Challenge: Design the AI-Augmented Workflow',
      subtitle: 'Combine everything to architect a world-class team workflow',
      type: 'scenario',
      tip: 'The best workflows are invisible — developers focus on solving problems, automation handles the rest.',
      commands: [],
      gitState: {
        focus: 'Commit → AI tests → Renovate updates → ship: all automated',
        commits: [
          { id: 'c0', msg: 'Workflow: full automation pipeline', branch: 'main', parent: null },
          { id: 'c1', msg: 'feat(pay): Apple Pay [AI]', branch: 'main', parent: 'c0' },
          { id: 'c2', msg: 'chore(deps): stripe 14→15 [Bot]', branch: 'main', parent: 'c1' }
        ],
        branches: { main: 'c2' }, HEAD: 'main'
      },
      steps: [
        {
          type: 'story',
          title: '🏆 Final Challenge: Architect the Full Workflow',
          context: 'TechStart has 80 engineers, ships to 2M users, and needs to deploy 20× per day with zero incidents. You\'ve been hired as Staff Engineer to design the Git workflow from scratch. Combine everything you\'ve learned: TBD, feature flags, conventional commits, AI agents, MCP, code review, merge queues, GitOps, and Dependabot.',
          objective: '🎯 Design and configure a complete AI-augmented Git workflow for an 80-engineer team'
        },
        {
          type: 'concept',
          title: '🏆 The Complete AI-Augmented Workflow',
          icon: '🏆',
          body: `<strong>The full developer loop at TechStart:</strong>

<strong>1. Write (AI-assisted)</strong>
Developer describes feature → Claude Code/Cursor writes initial implementation → developer reviews and refines → conventional commit

<strong>2. Push</strong>
Pre-commit hooks (Husky):
• <code>commitlint</code> validates conventional commit format
• <code>eslint --fix</code> auto-fixes style issues
• Fast unit tests (< 5 seconds)

<strong>3. PR Opens</strong>
Automatically triggered:
• CodeRabbit posts AI review within 60 seconds
• Claude via GitHub Actions writes PR description from diff
• CI: test, lint, build, security scan
• Dependabot/Renovate: any dependency drift flagged

<strong>4. Review & Iterate</strong>
• CODEOWNERS auto-assigns domain reviewers
• Developer uses MCP + Claude to answer reviewer questions
• Agent fixes CodeRabbit comments autonomously

<strong>5. Merge Queue</strong>
• Squash and merge into main
• Queue tests combined state with other queued PRs
• semantic-release determines version bump and publishes CHANGELOG

<strong>6. Deploy (GitOps)</strong>
• GitHub Actions builds Docker image, tags with version
• Pushes to infra-repo manifest (automated commit)
• ArgoCD detects change, deploys to staging → production
• Feature flag gates new functionality

<strong>7. Monitor</strong>
• MCP + Claude answers "what changed in the last deploy?"
• git bisect + Claude diagnoses production regressions
• Dependabot keeps the shipped image secure`
        },
        {
          type: 'scenario',
          severity: 'info',
          title: '🏆 Configure the workflow',
          description: 'Walk through setting up each component of the complete workflow:',
          steps: [
            { step: 1, action: 'Configure TBD: branch protection + Merge Queue on main', cmd: '# Settings → Branches → Enable merge queue\n# Require: 1 approval + CI pass + CodeRabbit review', result: '✅ TBD workflow enforced. No long-lived branches permitted.' },
            { step: 2, action: 'Set up conventional commits + semantic-release', cmd: 'npm install -D @commitlint/cli semantic-release\n# commitlint.config.js: extends conventional\n# .releaserc: branches: [main]', result: '✅ Every commit typed. Versions generated automatically.' },
            { step: 3, action: 'Install CodeRabbit + configure Claude Code review action', cmd: '# GitHub Marketplace → CodeRabbit → Install\n# .github/workflows/ai-review.yml → Claude API', result: '✅ AI review posts within 60s of PR open.' },
            { step: 4, action: 'Set up MCP for team GitHub access', cmd: 'npm install -g @modelcontextprotocol/server-github\n# .mcp.json: github server + filesystem server', result: '✅ Claude can query PRs, commits, issues in real time.' },
            { step: 5, action: 'Configure Renovate for automated dependency updates', cmd: '# renovate.json: automerge patches, review majors\n# Schedule: weekdays, off-peak hours', result: '✅ Patch/minor updates merged automatically. Major updates assigned to lead.' },
            { step: 6, action: 'Set up GitOps with ArgoCD', cmd: '# infra-repo: k8s manifests\n# ArgoCD: watch infra-repo/apps/*\n# GitHub Actions: push manifest on release', result: '✅ Every merge to main auto-deploys within 5 minutes. Rollback = git revert.' }
          ]
        },
        {
          type: 'quiz',
          questions: [
            {
              q: 'A developer asks: "Why do we need feature flags if we use PRs and code review?" What\'s the best answer?',
              options: [
                'We don\'t — PRs are sufficient for quality control',
                'Feature flags decouple deployment from release. A PR merges code; a flag controls when users see it. You can deploy 10 times a day and release when the business decides.',
                'Feature flags replace code review — the flag is the safety net',
                'Feature flags are only needed for A/B testing'
              ],
              correct: 1,
              explanation: '✅ PRs and feature flags solve different problems. PRs are about code quality and collaboration. Feature flags are about deployment safety and business control of releases. Together they enable continuous deployment while preserving release control.'
            },
            {
              q: 'The AI agent opened a PR that passes all checks. A human reviewer approves. The merge queue runs and CI passes on the combined state. Is it now safe to merge?',
              options: [
                'Yes — all gates have passed',
                'Only if the PR is under 200 lines',
                'Yes, but run in staging for 24 hours first',
                'Yes — this is exactly what the process is designed to validate'
              ],
              correct: 3,
              explanation: '✅ This is the workflow working as designed. AI review + human review + CI + merge queue combined-state testing is a robust multi-layer safety net. Trust the process you\'ve built. If an issue slips through, improve the tests — don\'t add more blocking gates.',
              achievement: 'innovator'
            }
          ]
        }
      ]
    }
  ]
};
