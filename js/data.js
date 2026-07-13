// ═══════════════════════════════════════════════
//  Git Energy — Lesson Data
// ═══════════════════════════════════════════════

const ACHIEVEMENTS = [
  { id: 'first_commit',    icon: '🌱', name: 'First Commit',      desc: 'Made your first git commit' },
  { id: 'branch_out',      icon: '🌿', name: 'Branch Out',        desc: 'Created your first branch' },
  { id: 'merge_master',    icon: '🔀', name: 'Merge Master',      desc: 'Completed your first merge' },
  { id: 'conflict_hero',   icon: '⚔️',  name: 'Conflict Hero',    desc: 'Resolved a merge conflict' },
  { id: 'time_traveler',   icon: '⏮️',  name: 'Time Traveler',    desc: 'Used git reset or revert' },
  { id: 'stash_ninja',     icon: '🥷',  name: 'Stash Ninja',      desc: 'Stashed your work' },
  { id: 'pr_hero',         icon: '🔍',  name: 'PR Hero',          desc: 'Completed a pull request' },
  { id: 'cherry_picker',   icon: '🍒',  name: 'Cherry Picker',    desc: 'Used git cherry-pick' },
  { id: 'bisect_detective',icon: '🕵️',  name: 'Bisect Detective', desc: 'Found a bug with git bisect' },
  { id: 'hook_architect',  icon: '🪝',  name: 'Hook Architect',   desc: 'Set up a git hook' },
  { id: 'rebaser',         icon: '🔁',  name: 'Rebaser',          desc: 'Mastered interactive rebase' },
  { id: 'git_master',      icon: '⚡',  name: 'Git Master',       desc: 'Completed the Expert path' },
];

const XP_PER_LEVEL = 500;

const GAME_DATA = {

  // ══════════════════════════════════════════
  //  BEGINNER PATH
  // ══════════════════════════════════════════
  beginner: {
    title: 'Explorer Path',
    subtitle: 'Git foundations through visual, hands-on lessons',
    color: '#3fb950',
    icon: '🌱',
    levels: [

      // ── Level 1 ─────────────────────────────
      {
        id: 'b1', num: 1, icon: '📖', xp: 80,
        title: 'What is Git?',
        subtitle: 'Version control explained simply',
        type: 'visual',
        tip: 'Git tracks CHANGES to files, not full copies. That\'s what makes it fast.',
        commands: [],
        gitState: { commits: [], branches: {}, HEAD: null },
        steps: [
          {
            type: 'story',
            title: 'Welcome to TechStart Inc.!',
            context: 'You just landed your first dev job. On day one, your manager Priya hands you a laptop and says: "All code lives in Git. Don\'t break main." You nod confidently — but what exactly IS Git?',
            objective: '🎯 Learn what Git is and why every developer needs it'
          },
          {
            type: 'concept',
            title: '🗂️ The Problem Git Solves',
            icon: '🗂️',
            body: `Imagine working on a document and saving versions like <code>report_v1.docx</code>, <code>report_v2_FINAL.docx</code>, <code>report_v2_FINAL_really.docx</code>. Now multiply that across a team of 20 developers writing thousands of files simultaneously.

<strong>Git</strong> is a Version Control System (VCS) — a tool that tracks every change to every file, lets multiple people work at once, and lets you rewind to any point in history.

Think of it like a <strong>save system for code</strong>, except it saves every version forever, remembers who changed what, and lets you merge work from different people automatically.`,
            diagram: [
              { icon: '👤', label: 'Developer A', sub: 'writes feature' },
              { icon: '➕', label: '' },
              { icon: '👤', label: 'Developer B', sub: 'fixes bug' },
              { icon: '→', label: '' },
              { icon: '⎇', label: 'Git', sub: 'merges both' }
            ]
          },
          {
            type: 'concept',
            title: '☁️ Git vs GitHub — Not the same thing!',
            icon: '☁️',
            body: `This trips up almost everyone at first.

<strong>Git</strong> is the tool — it runs on your local machine and manages history. Free, open source, created by Linus Torvalds in 2005.

<strong>GitHub</strong> is a website — a cloud host for Git repositories. It adds collaboration features like pull requests, issues, and code review. Alternatives include GitLab and Bitbucket.

You can use Git without GitHub. But GitHub without Git is just a website.`,
            diagram: [
              { icon: '💻', label: 'Your Computer', sub: 'Git lives here' },
              { icon: '↔', label: '' },
              { icon: '☁️', label: 'GitHub', sub: 'shared online repo' }
            ]
          },
          {
            type: 'quiz',
            questions: [
              {
                q: 'A teammate says "push your code to GitHub." What does this mean?',
                options: [
                  'Copy your files manually to a shared drive',
                  'Upload your local Git commits to the remote GitHub repository',
                  'Email your code to the team',
                  'Deploy your code to production'
                ],
                correct: 1,
                explanation: '✅ "Push" means sending your local commits up to the remote repository on GitHub so others can see and use your work.'
              },
              {
                q: 'Which of the following best describes Git?',
                options: [
                  'A code hosting website',
                  'A programming language',
                  'A version control system that tracks changes to files',
                  'A deployment tool'
                ],
                correct: 2,
                explanation: '✅ Git is a distributed version control system. It tracks the full history of changes to files over time.'
              }
            ]
          }
        ]
      },

      // ── Level 2 ─────────────────────────────
      {
        id: 'b2', num: 2, icon: '🏗️', xp: 100,
        title: 'Your First Repository',
        subtitle: 'git init and the hidden .git folder',
        type: 'interactive',
        tip: 'Every Git repo has a hidden .git folder — that\'s where all the history lives. Never delete it!',
        commands: [
          { cmd: 'git init',        desc: 'Initialize a new repository' },
          { cmd: 'git status',      desc: 'Show working tree status' },
          { cmd: 'git config --global user.name "Name"', desc: 'Set your name' }
        ],
        gitState: { commits: [], branches: { main: null }, HEAD: 'main' },
        steps: [
          {
            type: 'story',
            title: 'Your First Project',
            context: 'Priya gives you your first task: "Set up the Git repo for our new web app." You open VS Code, create a folder called my-app, and now need to initialize Git inside it.',
            objective: '🎯 Initialize a Git repository and understand what git init creates'
          },
          {
            type: 'concept',
            title: '🏗️ git init — Creating a Repo',
            icon: '🏗️',
            body: `Running <code>git init</code> in a folder does one thing: creates a hidden <code>.git</code> directory inside it.

That <code>.git</code> folder IS the repository. Inside it, Git stores:
<strong>objects/</strong> — every file version, ever committed
<strong>refs/</strong> — branch pointers (like bookmarks to commits)
<strong>HEAD</strong> — which branch you're currently on
<strong>config</strong> — repository-level configuration

<strong>Before init:</strong> just a regular folder
<strong>After init:</strong> Git is watching every change inside it

You only ever run <code>git init</code> once per project. After that, Git is silently tracking everything.`
          },
          {
            type: 'interactive',
            title: 'Initialize your repository',
            instructions: 'Click each step to set up your first Git repo, just as you would in a real terminal.',
            actions: [
              { label: '1. Create project folder: mkdir my-app && cd my-app', id: 'mkdir', result: 'Created directory my-app' },
              { label: '2. Initialize git: git init', id: 'init', result: 'Initialized empty Git repository in my-app/.git/', achievement: null },
              { label: '3. Set your name: git config --global user.name "Your Name"', id: 'config_name', result: '' },
              { label: '4. Set your email: git config --global user.email "you@email.com"', id: 'config_email', result: '' },
              { label: '5. Check status: git status', id: 'status', result: 'On branch main\n\nNo commits yet\n\nnothing to commit (create/copy files to work with)' }
            ]
          },
          {
            type: 'quiz',
            questions: [
              {
                q: 'What does git init actually create?',
                options: [
                  'A new file called git.config',
                  'A hidden .git directory containing the repository database',
                  'A connection to GitHub',
                  'A new branch called main'
                ],
                correct: 1,
                explanation: '✅ git init creates the .git directory. This is where Git stores all history, branches, and configuration for the project.'
              }
            ]
          }
        ]
      },

      // ── Level 3 ─────────────────────────────
      {
        id: 'b3', num: 3, icon: '📦', xp: 120,
        title: 'The Three Areas',
        subtitle: 'Working Directory → Staging → Repository',
        type: 'dragdrop',
        tip: 'The staging area (index) is like a draft tray — you decide exactly which changes go into each commit.',
        commands: [
          { cmd: 'git add <file>',  desc: 'Stage a specific file' },
          { cmd: 'git add .',       desc: 'Stage all changes' },
          { cmd: 'git status',      desc: 'See what\'s staged vs unstaged' },
          { cmd: 'git diff',        desc: 'See unstaged changes' },
          { cmd: 'git diff --staged', desc: 'See staged changes' }
        ],
        gitState: { commits: [], branches: { main: null }, HEAD: 'main' },
        steps: [
          {
            type: 'story',
            title: 'Making Your Mark',
            context: 'You\'ve written three new files for the web app. But before you "save" them with Git, you discover there are actually three distinct areas in Git\'s world — and understanding them is the key to mastering Git.',
            objective: '🎯 Understand the three areas: Working Directory, Staging Area, and Repository'
          },
          {
            type: 'concept',
            title: '📦 The Three-Area Model',
            icon: '📦',
            body: `Every file in a Git project lives in one of three states at any moment:

<strong>1. Working Directory</strong> — your actual files on disk. You edit here freely. Git sees changes but hasn't stored them yet.

<strong>2. Staging Area (Index)</strong> — a "draft" of your next commit. You explicitly move files here with <code>git add</code>. This lets you craft precise commits — e.g., only stage the bug fix, not the unrelated refactor you did alongside it.

<strong>3. Repository (.git)</strong> — permanent history. Once you run <code>git commit</code>, staged changes are saved forever with a unique ID (SHA hash).

The staging area is Git's superpower. Unlike most VCS tools, it gives you fine-grained control over exactly what each commit contains.`,
            diagram: [
              { icon: '📝', label: 'Working Dir', sub: 'your edits' },
              { icon: '→', label: 'git add' },
              { icon: '📋', label: 'Staging Area', sub: 'draft commit' },
              { icon: '→', label: 'git commit' },
              { icon: '🗄️', label: 'Repository', sub: 'permanent history' }
            ]
          },
          {
            type: 'dragdrop',
            title: 'Stage your files',
            instructions: 'Drag the files you want to commit into the Staging Area. Leave files you\'re not ready to commit in the Working Directory.',
            files: [
              { name: 'index.html',  status: 'new',      stage: false, shouldStage: true },
              { name: 'style.css',   status: 'new',      stage: false, shouldStage: true },
              { name: 'debug.log',   status: 'new',      stage: false, shouldStage: false },
              { name: 'app.js',      status: 'modified', stage: false, shouldStage: true }
            ]
          },
          {
            type: 'quiz',
            questions: [
              {
                q: 'You edited 5 files but only want to commit 3 of them. What do you do?',
                options: [
                  'Git automatically picks the right files',
                  'Run git add on the 3 files you want, then commit',
                  'You must commit all changed files at once',
                  'Copy the 3 files to a separate folder first'
                ],
                correct: 1,
                explanation: '✅ Use git add to selectively stage only the files you want. The staging area gives you precise control over commit contents.'
              },
              {
                q: 'What command shows you which files are staged vs unstaged?',
                options: ['git log', 'git diff', 'git status', 'git show'],
                correct: 2,
                explanation: '✅ git status shows three categories: staged changes (ready to commit), unstaged changes (modified but not staged), and untracked files.'
              }
            ]
          }
        ]
      },

      // ── Level 4 ─────────────────────────────
      {
        id: 'b4', num: 4, icon: '💾', xp: 120,
        title: 'Your First Commit',
        subtitle: 'Saving a snapshot in history',
        type: 'interactive',
        tip: 'A good commit message is: short imperative subject (50 chars), then optionally a blank line and longer explanation.',
        commands: [
          { cmd: 'git commit -m "message"', desc: 'Commit with inline message' },
          { cmd: 'git log',                 desc: 'View commit history' },
          { cmd: 'git log --oneline',       desc: 'Compact history view' }
        ],
        gitState: {
          focus: 'One commit = one snapshot: author, message, and what changed',
          commits: [{ id: 'a1b2c3d', msg: 'Add homepage', author: 'You', time: 'just now', branch: 'main' }],
          branches: { main: 'a1b2c3d' }, HEAD: 'main'
        },
        steps: [
          {
            type: 'story',
            title: 'Saving Your First Snapshot',
            context: 'You\'ve staged your files. Now it\'s time to commit — creating a permanent snapshot with a message that will help future-you (and your teammates) understand what this change was about.',
            objective: '🎯 Create your first commit and learn what makes a great commit message'
          },
          {
            type: 'concept',
            title: '💾 What is a Commit?',
            icon: '💾',
            body: `A <strong>commit</strong> is a snapshot of your staged files at a point in time. Each commit contains:

• A unique <strong>SHA hash</strong> (like <code>a1b2c3d</code>) — an ID you can always reference
• The <strong>author</strong> and <strong>timestamp</strong>
• A <strong>commit message</strong> describing the change
• A pointer to its <strong>parent commit</strong> (forming a chain of history)
• The <strong>actual file contents</strong> (stored efficiently as diffs)

<strong>Writing good commit messages</strong> is a professional skill:
✅ <code>Add login form validation</code>
✅ <code>Fix null pointer in user service</code>
❌ <code>fix stuff</code>
❌ <code>WIP</code>
❌ <code>asdfghjkl</code>

Use the imperative mood — "Add feature" not "Added feature". Imagine completing the sentence: "If applied, this commit will _____."`,
          },
          {
            type: 'commitform',
            title: 'Write your first commit',
            stagedFiles: ['index.html', 'style.css', 'app.js'],
            placeholder: 'e.g. Add homepage with navigation',
            achievement: 'first_commit'
          },
          {
            type: 'quiz',
            questions: [
              {
                q: 'Which commit message follows best practices?',
                options: [
                  'stuff',
                  'Add user authentication with email and password',
                  'I added the login thing finally',
                  'auth'
                ],
                correct: 1,
                explanation: '✅ Good commit messages are imperative ("Add..."), descriptive but concise, and tell the reader what the commit does without needing to read the diff.'
              }
            ]
          }
        ]
      },

      // ── Level 5 ─────────────────────────────
      {
        id: 'b5', num: 5, icon: '🌿', xp: 130,
        title: 'Branches — Parallel Universes',
        subtitle: 'Work in isolation, merge when ready',
        type: 'visual',
        tip: 'A branch is just a pointer to a commit. Creating one is instant — Git doesn\'t copy any files.',
        commands: [
          { cmd: 'git branch',             desc: 'List all branches' },
          { cmd: 'git branch <name>',      desc: 'Create a new branch' },
          { cmd: 'git switch <name>',      desc: 'Switch to a branch' },
          { cmd: 'git switch -c <name>',   desc: 'Create and switch in one step' },
          { cmd: 'git checkout <name>',    desc: 'Older way to switch branches' }
        ],
        gitState: {
          focus: 'feature/nav is isolated from main until you choose to merge',
          commits: [
            { id: 'c0', msg: 'Initial commit', branch: 'main', parent: null },
            { id: 'c1', msg: 'Add homepage', branch: 'main', parent: 'c0' },
            { id: 'c2', msg: 'Add nav menu (feature)', branch: 'feature/nav', parent: 'c1' },
          ],
          branches: { main: 'c1', 'feature/nav': 'c2' },
          HEAD: 'feature/nav'
        },
        steps: [
          {
            type: 'story',
            title: 'The Feature Request',
            context: 'Priya asks you to add a navigation menu, but warns: "Don\'t break main — the site is live." The answer is branches: a parallel line of work that doesn\'t touch main until you\'re ready.',
            objective: '🎯 Create a feature branch and understand how Git branches work'
          },
          {
            type: 'concept',
            title: '🌿 What is a Branch?',
            icon: '🌿',
            body: `A branch is simply a <strong>lightweight pointer</strong> to a commit. That's it. When you create a branch, Git creates a tiny file with a commit ID — no copying of files, no duplication.

<strong>Why branch?</strong>
• Work on a feature without affecting the main codebase
• Multiple developers work simultaneously without conflicts
• Experiment freely — if it fails, delete the branch
• The production code on <code>main</code> stays stable

<strong>HEAD</strong> is a special pointer that says "you are here." When you switch branches, HEAD moves to the new branch, and your working directory updates to match.

Most teams use a naming convention:
<code>feature/add-login</code>
<code>bugfix/null-pointer</code>
<code>hotfix/payment-crash</code>`,
          },
          {
            type: 'interactive',
            title: 'Create your feature branch',
            instructions: 'Follow these steps to create and switch to a new feature branch:',
            actions: [
              { label: '1. Check current branch: git branch', id: 'b_list', result: '* main' },
              { label: '2. Create feature branch: git switch -c feature/nav-menu', id: 'b_create', result: 'Switched to a new branch \'feature/nav-menu\'', achievement: 'branch_out' },
              { label: '3. Confirm you switched: git branch', id: 'b_confirm', result: '  main\n* feature/nav-menu' },
              { label: '4. Make a change (simulated): echo nav > nav.html', id: 'b_change', result: '' },
              { label: '5. Stage and commit: git add . && git commit -m "Add nav menu"', id: 'b_commit', result: '[feature/nav-menu a2b3c4d] Add nav menu\n 1 file changed, 1 insertion(+)' }
            ]
          },
          {
            type: 'quiz',
            questions: [
              {
                q: 'You\'re on main and want to create and immediately switch to a branch called "feature/login". What\'s the one-line command?',
                options: [
                  'git branch feature/login && git checkout feature/login',
                  'git switch -c feature/login',
                  'git new feature/login',
                  'git branch -switch feature/login'
                ],
                correct: 1,
                explanation: '✅ git switch -c creates and switches in one step. The older equivalent is git checkout -b.'
              }
            ]
          }
        ]
      },

      // ── Level 6 ─────────────────────────────
      {
        id: 'b6', num: 6, icon: '🔀', xp: 150,
        title: 'Merging Branches',
        subtitle: 'Bring your work back together',
        type: 'interactive',
        tip: 'Fast-forward merges happen when there\'s a straight line of commits — no merge commit is needed.',
        commands: [
          { cmd: 'git merge <branch>',    desc: 'Merge a branch into current' },
          { cmd: 'git branch -d <name>', desc: 'Delete a merged branch' },
          { cmd: 'git log --graph --oneline', desc: 'Visualize branch history' }
        ],
        gitState: {
          focus: 'Merge commit reunites feature/nav with main\'s history',
          commits: [
            { id: 'c0', msg: 'Initial commit', branch: 'main', parent: null },
            { id: 'c1', msg: 'Add homepage', branch: 'main', parent: 'c0' },
            { id: 'c2', msg: 'Add nav menu', branch: 'feature/nav', parent: 'c1' },
            { id: 'c3', msg: 'Merge feature/nav → main', branch: 'main', parent: 'c1', merge: 'c2' }
          ],
          branches: { main: 'c3', 'feature/nav': 'c2' },
          HEAD: 'main'
        },
        steps: [
          {
            type: 'story',
            title: 'Bringing it Home',
            context: 'Your nav menu feature is done and tested on the feature branch. Now it\'s time to merge it into main so the rest of the team can use it and it goes live.',
            objective: '🎯 Merge a feature branch into main and clean up'
          },
          {
            type: 'concept',
            title: '🔀 How Merging Works',
            icon: '🔀',
            body: `<strong>Merging</strong> combines the work from two branches. Git is smart — it finds the common ancestor commit and replays the differences.

<strong>Fast-forward merge</strong>: If main hasn't moved since you branched off, Git simply moves the main pointer forward. No merge commit, clean linear history.

<strong>3-way merge</strong>: If both branches have new commits, Git creates a new "merge commit" that has two parents. The history shows a fork and a reunion.

After merging, it's good practice to delete the feature branch — it's done its job:
<code>git branch -d feature/nav-menu</code>

The commits from the branch are still in history. The branch pointer itself was just a label — deleting it doesn't lose any work.`,
          },
          {
            type: 'interactive',
            title: 'Merge your feature branch',
            actions: [
              { label: '1. Switch back to main: git switch main', id: 'm_switch', result: 'Switched to branch \'main\'' },
              { label: '2. Merge feature: git merge feature/nav-menu', id: 'm_merge', result: 'Updating c1a2b3d..d4e5f6a\nFast-forward\n nav.html | 1 +\n 1 file changed, 1 insertion(+)', achievement: 'merge_master' },
              { label: '3. View history: git log --oneline', id: 'm_log', result: 'd4e5f6a (HEAD -> main) Add nav menu\nc1a2b3d Add homepage\na0b1c2d Initial commit' },
              { label: '4. Clean up: git branch -d feature/nav-menu', id: 'm_delete', result: 'Deleted branch feature/nav-menu (was d4e5f6a).' }
            ]
          },
          {
            type: 'quiz',
            questions: [
              {
                q: 'A fast-forward merge occurs when:',
                options: [
                  'There are conflicts between branches',
                  'The target branch has no new commits since the feature branch was created',
                  'You have more than 10 commits on the feature branch',
                  'You use git merge --fast'
                ],
                correct: 1,
                explanation: '✅ Fast-forward happens when the base branch hasn\'t moved — Git just slides the pointer forward along the linear chain of commits.'
              }
            ]
          }
        ]
      },

      // ── Level 7 ─────────────────────────────
      {
        id: 'b7', num: 7, icon: '☁️', xp: 150,
        title: 'Remote Repositories',
        subtitle: 'Push, pull, and collaborate via GitHub',
        type: 'visual',
        tip: 'origin is just an alias for your remote URL. You can have multiple remotes — useful for open source forks.',
        commands: [
          { cmd: 'git remote add origin <url>', desc: 'Link to a remote repo' },
          { cmd: 'git push -u origin main',     desc: 'Push and set upstream' },
          { cmd: 'git pull',                    desc: 'Fetch + merge from remote' },
          { cmd: 'git clone <url>',             desc: 'Copy a remote repo locally' },
          { cmd: 'git fetch',                   desc: 'Download without merging' }
        ],
        gitState: {
          focus: 'origin/main mirrors GitHub; local main is your working copy',
          commits: [
            { id: 'c0', msg: 'Initial commit', branch: 'main', parent: null },
            { id: 'c1', msg: 'Add homepage', branch: 'main', parent: 'c0' }
          ],
          branches: { main: 'c1', 'origin/main': 'c1' },
          HEAD: 'main'
        },
        steps: [
          {
            type: 'story',
            title: 'Going Remote',
            context: 'Your repo lives only on your laptop. What if your laptop dies? What if your teammate needs your code? You need to push to GitHub — a remote copy everyone can access.',
            objective: '🎯 Connect your local repo to GitHub and understand push/pull'
          },
          {
            type: 'concept',
            title: '☁️ Local vs Remote',
            icon: '☁️',
            body: `Your computer has the <strong>local</strong> repository. GitHub hosts the <strong>remote</strong> repository. They can stay in sync via push and pull.

<code>git push</code> — sends your local commits to the remote. Others can now see your work.

<code>git pull</code> — downloads new commits from the remote and merges them into your local branch. Keeps you up to date with teammates.

<code>git fetch</code> — downloads remote commits but does NOT merge. Good for previewing what's changed before integrating.

<strong>origin</strong> is the conventional name for your main remote. When you clone a repo, origin is set automatically. The full flow for a new repo:
<code>git remote add origin https://github.com/you/repo.git</code>
<code>git push -u origin main</code>

The <code>-u</code> flag sets the "upstream" — after this, bare <code>git push</code> and <code>git pull</code> know where to go.`,
          },
          {
            type: 'interactive',
            title: 'Connect to GitHub',
            actions: [
              { label: '1. Add remote origin: git remote add origin https://github.com/you/my-app.git', id: 'r_add', result: '' },
              { label: '2. Verify remote: git remote -v', id: 'r_verify', result: 'origin  https://github.com/you/my-app.git (fetch)\norigin  https://github.com/you/my-app.git (push)' },
              { label: '3. Push to GitHub: git push -u origin main', id: 'r_push', result: 'Enumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nBranch \'main\' set up to track \'origin/main\'.\nTo https://github.com/you/my-app.git\n * [new branch]  main -> main' },
              { label: '4. Simulate teammate change, then pull: git pull', id: 'r_pull', result: 'remote: Enumerating objects: 3, done.\nUpdating c1a2b3d..e5f6a7b\nFast-forward\n README.md | 3 +++\n 1 file changed, 3 insertions(+)' }
            ]
          },
          {
            type: 'quiz',
            questions: [
              {
                q: 'What is the difference between git fetch and git pull?',
                options: [
                  'They are identical',
                  'fetch downloads changes but doesn\'t merge; pull downloads AND merges',
                  'fetch is for branches, pull is for tags',
                  'pull is faster than fetch'
                ],
                correct: 1,
                explanation: '✅ git fetch lets you see what\'s on the remote without changing your local branches. git pull = fetch + merge. Use fetch when you want to review changes before integrating.'
              }
            ]
          }
        ]
      },

      // ── Level 8 ─────────────────────────────
      {
        id: 'b8', num: 8, icon: '🙈', xp: 100,
        title: '.gitignore',
        subtitle: 'Tell Git what to ignore',
        type: 'visual',
        tip: 'Once a file is tracked by Git, adding it to .gitignore won\'t untrack it. Use git rm --cached <file> first.',
        commands: [
          { cmd: 'touch .gitignore', desc: 'Create the gitignore file' },
          { cmd: 'git rm --cached <file>', desc: 'Untrack a file without deleting it' }
        ],
        gitState: { focus: '.gitignore prevents node_modules and .env from ever being tracked', commits: [{ id: 'c0', msg: 'Add .gitignore', branch: 'main', parent: null }], branches: { main: 'c0' }, HEAD: 'main' },
        steps: [
          {
            type: 'story',
            title: 'The Accidental Secret',
            context: 'You run git status and see node_modules/ (200MB of dependencies), .env (with your API keys!), and .DS_Store (Mac system file). None of these should ever go to GitHub. Time to set up .gitignore.',
            objective: '🎯 Create a .gitignore file to exclude files from Git tracking'
          },
          {
            type: 'concept',
            title: '🙈 .gitignore Rules',
            icon: '🙈',
            body: `The <code>.gitignore</code> file tells Git which files and folders to completely ignore. Put one at the root of your project.

<strong>Common patterns:</strong>
<code>node_modules/</code>   — dependency folder (never commit dependencies)
<code>.env</code>            — environment variables / secrets
<code>*.log</code>           — all log files
<code>dist/</code>           — build output
<code>.DS_Store</code>       — macOS system files
<code>*.pyc</code>           — Python compiled files

<strong>Important rule:</strong> Patterns ending with <code>/</code> match directories only.
A <code>#</code> starts a comment.
A <code>!</code> prefix negates (un-ignores) a pattern.

<strong>Pro tip:</strong> GitHub provides templates for every language and framework at github.com/github/gitignore. Always use one when starting a project.`
          },
          {
            type: 'quiz',
            questions: [
              {
                q: 'Your .gitignore has "*.log" but git status still shows error.log. Why?',
                options: [
                  '.gitignore syntax is wrong',
                  'error.log was already committed/tracked before you added .gitignore',
                  'You need to restart Git',
                  'The file is too large to ignore'
                ],
                correct: 1,
                explanation: '✅ .gitignore only ignores UNTRACKED files. If Git already tracks a file, you must run git rm --cached <file> to untrack it, then .gitignore will work.'
              }
            ]
          }
        ]
      },

      // ── Level 9 ─────────────────────────────
      {
        id: 'b9', num: 9, icon: '🖥️', xp: 160,
        title: 'Git in VS Code',
        subtitle: 'Use the Source Control panel like a pro',
        type: 'ide',
        tip: 'In VS Code, M = Modified, A = Added, D = Deleted, U = Untracked. Click any file to see its diff.',
        commands: [],
        gitState: {
          focus: 'Two commits — VS Code shows diff, blame, and history for each',
          commits: [
            { id: 'c0', msg: 'Initial commit', branch: 'main', parent: null },
            { id: 'c1', msg: 'Add styles', branch: 'main', parent: 'c0' }
          ],
          branches: { main: 'c1' }, HEAD: 'main'
        },
        steps: [
          {
            type: 'story',
            title: 'Working in the IDE',
            context: 'Command lines are powerful, but most of your daily Git workflow happens in VS Code. The Source Control panel does staging, committing, branching, and more — all with clicks. Let\'s learn it.',
            objective: '🎯 Use VS Code\'s Source Control panel for a complete commit workflow'
          },
          {
            type: 'ide',
            title: 'VS Code Source Control',
            mode: 'vscode-scm',
            changedFiles: [
              { name: 'app.js', status: 'M', content: [
                { ln: 1, text: 'function greet(name) {', type: 'normal' },
                { ln: 2, text: '  return "Hello " + name;', type: 'normal' },
                { ln: 3, text: '  return `Hello, ${name}!`;', type: 'add' },
              ]},
              { name: 'style.css', status: 'M', content: [] },
              { name: 'debug.log', status: 'A', content: [] }
            ],
            instructions: [
              'Click app.js in the Changes section to see the diff',
              'Click the + icon next to app.js to stage it',
              'Type a commit message in the text box',
              'Click the ✓ Commit button'
            ]
          },
          {
            type: 'quiz',
            questions: [
              {
                q: 'In VS Code\'s Source Control panel, you see a file with "U" next to it. What does this mean?',
                options: [
                  'The file is Unstaged',
                  'The file has Uncommitted changes',
                  'The file is Untracked — new and not yet added to Git',
                  'There is an Upload error'
                ],
                correct: 2,
                explanation: '✅ U = Untracked. Git has never seen this file before. You need to stage it with git add (or click +) before it can be committed.'
              }
            ]
          }
        ]
      },

      // ── Level 10 ────────────────────────────
      {
        id: 'b10', num: 10, icon: '🏁', xp: 200,
        title: 'Beginner Challenge',
        subtitle: 'End-to-end workflow from scratch',
        type: 'challenge',
        tip: 'Real Git usage is muscle memory. The more you do the full loop, the more natural it becomes.',
        commands: [
          { cmd: 'git init', desc: 'Initialize repo' },
          { cmd: 'git add .', desc: 'Stage all' },
          { cmd: 'git commit -m ""', desc: 'Commit' },
          { cmd: 'git switch -c <branch>', desc: 'New branch' },
          { cmd: 'git merge <branch>', desc: 'Merge' },
          { cmd: 'git push -u origin main', desc: 'Push' }
        ],
        gitState: {
          focus: 'Full workflow: branch → commit → merge → push to origin',
          commits: [
            { id: 'c0', msg: 'Initial commit', branch: 'main', parent: null },
            { id: 'c1', msg: 'Add index.html', branch: 'main', parent: 'c0' },
            { id: 'c2', msg: 'Add contact page', branch: 'feature/contact', parent: 'c1' },
            { id: 'c3', msg: 'Merge feature/contact', branch: 'main', parent: 'c1', merge: 'c2' }
          ],
          branches: { main: 'c3', 'origin/main': 'c3' },
          HEAD: 'main'
        },
        steps: [
          {
            type: 'story',
            title: '🏁 Final Challenge: Build and Ship a Feature',
            context: 'Priya just assigned you a real ticket: "Add a Contact Us page." Complete the full workflow — from init to push — just like you would on the job.',
            objective: '🎯 Complete all 8 steps of the full Git workflow'
          },
          {
            type: 'challenge',
            title: 'Complete the full workflow',
            steps: [
              { id: 'ch1', instruction: 'Initialize a repo in a new folder', verify: 'init' },
              { id: 'ch2', instruction: 'Create index.html and stage it', verify: 'stage' },
              { id: 'ch3', instruction: 'Commit with message: "Add index.html"', verify: 'commit' },
              { id: 'ch4', instruction: 'Create branch: feature/contact', verify: 'branch' },
              { id: 'ch5', instruction: 'Create contact.html and commit it', verify: 'commit2' },
              { id: 'ch6', instruction: 'Switch back to main and merge', verify: 'merge' },
              { id: 'ch7', instruction: 'Delete the feature branch', verify: 'delete' },
              { id: 'ch8', instruction: 'Push to remote: git push -u origin main', verify: 'push' }
            ]
          }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════
  //  INTERMEDIATE PATH
  // ══════════════════════════════════════════
  intermediate: {
    title: 'Adventurer Path',
    subtitle: 'Real team workflows, conflicts, and PRs',
    color: '#58a6ff',
    icon: '🔀',
    levels: [

      // ── Level 1 ─────────────────────────────
      {
        id: 'i1', num: 1, icon: '🗺️', xp: 150,
        title: 'Branching Strategies',
        subtitle: 'GitHub Flow vs GitFlow — pick the right one',
        type: 'visual',
        tip: 'For most teams today, GitHub Flow (one main branch + short-lived feature branches + PRs) is simpler and better than GitFlow.',
        commands: [
          { cmd: 'git switch -c feature/xyz', desc: 'Start a feature branch' },
          { cmd: 'git push origin feature/xyz', desc: 'Push feature to remote' }
        ],
        gitState: {
          focus: 'Two teams work in parallel — both branch from the same main commit',
          commits: [
            { id: 'c0', msg: 'Initial commit', branch: 'main', parent: null },
            { id: 'c1', msg: 'Release v1.0', branch: 'main', parent: 'c0' },
            { id: 'c2', msg: 'Add login feature', branch: 'feature/login', parent: 'c1' },
            { id: 'c3', msg: 'Fix nav bug', branch: 'feature/nav-fix', parent: 'c1' },
          ],
          branches: { main: 'c1', 'feature/login': 'c2', 'feature/nav-fix': 'c3' },
          HEAD: 'main'
        },
        steps: [
          {
            type: 'story',
            title: 'The Team Scales Up',
            context: 'TechStart now has 8 developers. Without a branching strategy, it\'s chaos — people committing directly to main, overwriting each other\'s work. You need a system.',
            objective: '🎯 Understand GitHub Flow and when to use GitFlow'
          },
          {
            type: 'concept',
            title: '🗺️ GitHub Flow (Recommended for most teams)',
            icon: '🗺️',
            body: `<strong>GitHub Flow</strong> — simple, fast, works for continuous delivery:
1. <code>main</code> is always deployable
2. Create a short-lived feature branch for every change
3. Open a Pull Request when done
4. Review, discuss, and iterate
5. Merge into main
6. Deploy immediately

<strong>GitFlow</strong> — more complex, for versioned software with scheduled releases:
Has <code>main</code>, <code>develop</code>, <code>feature/*</code>, <code>release/*</code>, <code>hotfix/*</code> branches.
Overkill for most web apps but useful for mobile apps or libraries that ship version numbers.

<strong>Rule of thumb:</strong> If you deploy multiple times a day → GitHub Flow. If you ship versioned releases every few weeks → GitFlow.`
          },
          {
            type: 'quiz',
            questions: [
              {
                q: 'Your team deploys to production 5 times a day. Which strategy fits best?',
                options: ['GitFlow with develop and release branches', 'GitHub Flow with feature branches and PRs', 'Commit everything directly to main', 'Create a new repo for each feature'],
                correct: 1,
                explanation: '✅ GitHub Flow is designed for continuous delivery. Short-lived feature branches merged via PRs lets you ship fast while maintaining code review.'
              }
            ]
          }
        ]
      },

      // ── Level 2 ─────────────────────────────
      {
        id: 'i2', num: 2, icon: '⚔️', xp: 200,
        title: 'Merge Conflicts',
        subtitle: 'Stay calm — conflicts are just conversations',
        type: 'conflict',
        tip: 'A merge conflict means two people edited the same lines. Git can\'t guess which version to keep — you decide.',
        commands: [
          { cmd: 'git merge <branch>', desc: 'Triggers conflict if overlapping changes' },
          { cmd: 'git status',         desc: 'Shows conflicted files (both modified)' },
          { cmd: 'git add <file>',     desc: 'Mark conflict as resolved' },
          { cmd: 'git commit',         desc: 'Complete the merge' },
          { cmd: 'git merge --abort',  desc: 'Cancel the merge entirely' }
        ],
        gitState: {
          focus: 'Both branches edited the same line — only one version can win',
          commits: [
            { id: 'c0', msg: 'Initial', branch: 'main', parent: null },
            { id: 'c1', msg: 'Add greeting', branch: 'main', parent: 'c0' },
            { id: 'c2', msg: 'Change greeting (main)', branch: 'main', parent: 'c1' },
            { id: 'c3', msg: 'Change greeting (feature)', branch: 'feature/hello', parent: 'c1' },
          ],
          branches: { main: 'c2', 'feature/hello': 'c3' },
          HEAD: 'main'
        },
        steps: [
          {
            type: 'story',
            title: 'The Inevitable Conflict',
            context: 'You and Amara both edited app.js line 3. You changed the greeting to "Hello" — she changed it to "Hi there". Git merged everything else automatically but stopped on line 3 and said: "You two need to figure this out."',
            objective: '🎯 Understand conflict markers and resolve a merge conflict'
          },
          {
            type: 'concept',
            title: '⚔️ Reading Conflict Markers',
            icon: '⚔️',
            body: `When Git can't auto-merge, it inserts <strong>conflict markers</strong> into the file:

<code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code>
<code>  return "Hello";</code>
<code>=======</code>
<code>  return "Hi there";</code>
<code>&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature/hello</code>

Everything between <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD</code> and <code>=======</code> is YOUR version (current branch).
Everything between <code>=======</code> and <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code> is THEIR version (incoming branch).

To resolve: <strong>edit the file to look exactly how you want it</strong>, removing all conflict markers. Then <code>git add</code> it and <code>git commit</code>.

You have 3 options:
• Keep yours (delete their section + markers)
• Keep theirs (delete your section + markers)
• Keep both / write something new (combine sections + remove markers)`,
          },
          {
            type: 'conflictresolver',
            filename: 'app.js',
            context: 'You\'re merging feature/hello into main. Both branches edited the same line.',
            ours:   'function greet() {\n  return "Hello";\n}',
            theirs: 'function greet() {\n  return "Hi there";\n}',
            resolution: 'function greet() {\n  return "Hello, welcome!";\n}'
          },
          {
            type: 'quiz',
            questions: [
              {
                q: 'After resolving conflict markers in a file, what are the next steps?',
                options: [
                  'Just save the file — Git detects it automatically',
                  'Run git add <file> then git commit to complete the merge',
                  'Run git merge --continue',
                  'Delete the branch that caused the conflict'
                ],
                correct: 1,
                explanation: '✅ After editing the file to remove markers, you must explicitly stage it with git add, then git commit. This tells Git the conflict is resolved.'
              }
            ]
          }
        ]
      },

      // ── Level 3 ─────────────────────────────
      {
        id: 'i3', num: 3, icon: '🔁', xp: 200,
        title: 'Rebase vs Merge',
        subtitle: 'Two ways to integrate — very different histories',
        type: 'visual',
        tip: 'Never rebase commits that have already been pushed to a shared remote branch — you\'ll rewrite history others depend on.',
        commands: [
          { cmd: 'git rebase main',        desc: 'Rebase current branch onto main' },
          { cmd: 'git rebase --abort',     desc: 'Cancel a rebase' },
          { cmd: 'git rebase --continue',  desc: 'Continue after resolving conflict' },
          { cmd: 'git merge --no-ff',      desc: 'Force a merge commit' }
        ],
        gitState: {
          focus: 'Rebase replays feature/search on top of latest main for clean history',
          commits: [
            { id: 'c0', msg: 'Initial', branch: 'main', parent: null },
            { id: 'c1', msg: 'Main: update footer', branch: 'main', parent: 'c0' },
            { id: 'c2', msg: 'Feature: add search', branch: 'feature/search', parent: 'c0' },
            { id: 'c3', msg: 'Feature: style search', branch: 'feature/search', parent: 'c2' }
          ],
          branches: { main: 'c1', 'feature/search': 'c3' },
          HEAD: 'feature/search'
        },
        steps: [
          {
            type: 'story',
            title: 'Clean History vs Accurate History',
            context: 'Your feature branch diverged from main 3 days ago. Main now has 5 new commits. You need to update your feature branch with main\'s changes before opening a PR. Should you merge or rebase?',
            objective: '🎯 Understand the trade-offs between merge and rebase'
          },
          {
            type: 'concept',
            title: '🔁 Merge vs Rebase',
            icon: '🔁',
            body: `<strong>Merge</strong>: Creates a merge commit with two parents. The true history of what happened is preserved — you can see exactly when branches diverged and reunited. Non-destructive.

<strong>Rebase</strong>: Replays your commits on top of the target branch, as if you had branched off it today. Creates NEW commit IDs. The result is a clean, linear history — but it rewrites history.

<strong>When to use rebase:</strong>
• Updating a local feature branch with changes from main before a PR
• Cleaning up messy work-in-progress commits (interactive rebase)

<strong>When NOT to rebase:</strong>
• Any branch that others have pulled from (rewriting shared history causes problems)
• Established release or integration branches

<strong>Team rule of thumb:</strong> "Rebase local, merge shared." Rebase your private feature branches; merge into shared branches.`
          },
          {
            type: 'quiz',
            questions: [
              {
                q: 'You pushed feature/search to GitHub yesterday and your colleague pulled it. Should you rebase feature/search now?',
                options: [
                  'Yes, always rebase for clean history',
                  'No — rebasing rewrites commit IDs, which will break your colleague\'s local copy',
                  'Yes, but only if there are no conflicts',
                  'It doesn\'t matter either way'
                ],
                correct: 1,
                explanation: '✅ Once others have pulled your branch, rebasing rewrites history they\'ve built on. This causes diverged histories and is a major headache. Use merge instead, or coordinate carefully.'
              }
            ]
          }
        ]
      },

      // ── Level 4 ─────────────────────────────
      {
        id: 'i4', num: 4, icon: '🥷', xp: 150,
        title: 'Stashing',
        subtitle: 'Safely set aside work-in-progress',
        type: 'interactive',
        tip: 'git stash is a stack. git stash pop takes the most recent. git stash list shows all. Name stashes with git stash push -m "name".',
        commands: [
          { cmd: 'git stash',                  desc: 'Stash all dirty changes' },
          { cmd: 'git stash pop',              desc: 'Apply most recent stash' },
          { cmd: 'git stash list',             desc: 'Show all stashes' },
          { cmd: 'git stash push -m "desc"',   desc: 'Named stash' },
          { cmd: 'git stash apply stash@{2}',  desc: 'Apply a specific stash' }
        ],
        gitState: {
          focus: 'Stash saves WIP aside so you can switch context instantly',
          commits: [{ id: 'c0', msg: 'Last stable commit', branch: 'main', parent: null }],
          branches: { main: 'c0' }, HEAD: 'main'
        },
        steps: [
          {
            type: 'story',
            title: 'The Interruption',
            context: 'You\'re halfway through a complex feature. Suddenly Priya messages: "Production is down! Drop everything and fix the login bug NOW." You can\'t commit half-done code to main. You need to stash it.',
            objective: '🎯 Use git stash to save and restore work in progress'
          },
          {
            type: 'concept',
            title: '🥷 The Stash — Your Temp Storage',
            icon: '🥷',
            body: `<code>git stash</code> takes all your uncommitted changes (staged and unstaged) and saves them in a temporary storage area. Your working directory becomes clean again.

Think of it as a clipboard: you copy your WIP aside, do urgent work, then paste it back.

<strong>Common workflow:</strong>
<code>git stash</code>                    — save WIP
<code>git switch main</code>              — switch to fix the bug
... fix bug, commit, push ...
<code>git switch feature/my-work</code>   — come back
<code>git stash pop</code>               — restore your WIP

<strong>Multiple stashes?</strong> Git stash is a stack. Each stash gets an index (<code>stash@{0}</code>, <code>stash@{1}</code>...). Name them for sanity:
<code>git stash push -m "half-done login UI"</code>`
          },
          {
            type: 'interactive',
            title: 'Stash, fix, restore',
            actions: [
              { label: '1. Stash your WIP: git stash push -m "half-done nav feature"', id: 's_stash', result: 'Saved working directory and index state On main: half-done nav feature', achievement: 'stash_ninja' },
              { label: '2. Confirm clean state: git status', id: 's_status', result: 'On branch main\nnothing to commit, working tree clean' },
              { label: '3. Switch & fix: git switch main && git commit -m "Fix login bug"', id: 's_fix', result: '[main 9fa3b2c] Fix login bug\n 1 file changed, 2 insertions(+)' },
              { label: '4. Go back to feature: git switch feature/nav', id: 's_back', result: 'Switched to branch \'feature/nav\'' },
              { label: '5. Restore your WIP: git stash pop', id: 's_pop', result: 'On branch feature/nav\nChanges not staged for commit:\n  modified: nav.js\nDropped stash@{0}' }
            ]
          },
          { type: 'quiz', questions: [{ q: 'git stash pop vs git stash apply — what\'s the difference?', options: ['They are identical', 'pop restores AND removes the stash; apply restores but keeps the stash in the list', 'apply only works on named stashes', 'pop always applies stash@{0}, apply lets you choose'], correct: 1, explanation: '✅ pop = apply + drop. Use apply when you want to restore the stash to multiple branches without deleting it from the stack.' }] }
        ]
      },

      // ── Level 5 ─────────────────────────────
      {
        id: 'i5', num: 5, icon: '🔍', xp: 220,
        title: 'Pull Requests on GitHub',
        subtitle: 'The collaboration heartbeat of modern teams',
        type: 'ide',
        tip: 'A PR is a conversation, not just code. Good PR descriptions save reviewers time and get you faster approvals.',
        commands: [
          { cmd: 'git push origin feature/xyz', desc: 'Push branch to trigger PR creation' },
          { cmd: 'gh pr create',                desc: 'Create PR from GitHub CLI' }
        ],
        gitState: {
          focus: 'feature/login awaits review — CI checks must pass before merge',
          commits: [
            { id: 'c0', msg: 'Initial commit', branch: 'main', parent: null },
            { id: 'c1', msg: 'Add login feature', branch: 'feature/login', parent: 'c0' },
            { id: 'c2', msg: 'Add input validation', branch: 'feature/login', parent: 'c1' }
          ],
          branches: { main: 'c0', 'feature/login': 'c2' },
          HEAD: 'feature/login'
        },
        steps: [
          {
            type: 'story',
            title: 'Code Review Culture',
            context: 'Your feature/login branch is ready. At TechStart, no one merges their own code to main — you open a Pull Request and get at least one reviewer to approve. This catches bugs and spreads knowledge.',
            objective: '🎯 Open a Pull Request and understand the review workflow'
          },
          {
            type: 'concept',
            title: '🔍 The Pull Request Lifecycle',
            icon: '🔍',
            body: `A <strong>Pull Request</strong> (PR) — called a Merge Request on GitLab — is a formal request to merge your branch into another branch (usually main).

<strong>The lifecycle:</strong>
1. Push your feature branch to GitHub
2. Open a PR: title, description, reviewers, labels
3. Automated checks run (CI/CD: tests, linting, build)
4. Reviewers leave comments — you address them with new commits
5. Approvals received
6. Merge (squash, merge commit, or rebase — team choice)
7. Branch auto-deleted

<strong>What makes a great PR description:</strong>
• What changed and why (not just what)
• How to test it
• Screenshots for UI changes
• Link to the issue/ticket

<strong>PR size tip:</strong> Keep PRs small (~200-400 lines changed). Large PRs get rubber-stamped reviews. Small PRs get real feedback.`
          },
          {
            type: 'ide',
            mode: 'github-pr',
            prData: {
              title: 'Add user login with email/password',
              branch: 'feature/login',
              base: 'main',
              checks: [
                { name: 'CI / test', status: 'pass' },
                { name: 'CI / lint', status: 'pass' },
                { name: 'Codecov', status: 'pass' }
              ],
              comments: [
                { author: 'Amara', avatar: '👩🏾', text: 'Consider adding rate limiting on the login endpoint — we don\'t want brute force attacks.', file: 'auth.js', line: 42 },
                { author: 'Raj', avatar: '👨🏽', text: 'LGTM! Nice clean implementation. Left one inline comment.', file: null }
              ]
            }
          },
          { type: 'quiz', questions: [{ q: 'What does it mean when a CI check fails on your PR?', options: ['The PR is automatically closed', 'Your automated tests, linting, or build failed — fix the issues before requesting review', 'You must delete the branch and start over', 'GitHub has a server error'], correct: 1, explanation: '✅ CI checks run automatically on every push. A failure means the pipeline found problems (failing tests, lint errors, etc.). Fix them and push — the checks re-run automatically.' }] }
        ]
      },

      // ── Level 6 ─────────────────────────────
      {
        id: 'i6', num: 6, icon: '⏮️', xp: 200,
        title: 'Undoing Mistakes',
        subtitle: 'reset, revert, restore — choose wisely',
        type: 'interactive',
        tip: 'git reflog is your ultimate safety net — it records every HEAD movement, even after a "destructive" reset.',
        commands: [
          { cmd: 'git restore <file>',      desc: 'Discard unstaged changes to a file' },
          { cmd: 'git restore --staged <file>', desc: 'Unstage a file' },
          { cmd: 'git reset HEAD~1',        desc: 'Undo last commit, keep changes' },
          { cmd: 'git reset --hard HEAD~1', desc: 'Undo last commit, DISCARD changes' },
          { cmd: 'git revert <sha>',        desc: 'Create new commit that undoes a commit' },
          { cmd: 'git reflog',              desc: 'History of HEAD movements' }
        ],
        gitState: {
          focus: 'git revert adds a new commit to undo, keeping full history intact',
          commits: [
            { id: 'c0', msg: 'Working state', branch: 'main', parent: null },
            { id: 'c1', msg: 'Oops: wrong file committed', branch: 'main', parent: 'c0' }
          ],
          branches: { main: 'c1' }, HEAD: 'main'
        },
        steps: [
          {
            type: 'story',
            title: 'Everyone Makes Mistakes',
            context: 'It happens to everyone: you committed the wrong file, your commit message has a typo, or you accidentally pushed sensitive data. Git has multiple ways to undo — but each has different consequences.',
            objective: '🎯 Know which "undo" command to use in each situation'
          },
          {
            type: 'concept',
            title: '⏮️ The Undo Toolkit',
            icon: '⏮️',
            body: `<strong>git restore &lt;file&gt;</strong> — discard uncommitted changes to a file. Permanent (no undo for this one!).

<strong>git restore --staged &lt;file&gt;</strong> — move file back from staging to working directory. Changes are kept.

<strong>git reset HEAD~1</strong> (soft/mixed) — move the branch pointer back one commit. Commits are removed but changes stay in your working directory. Safe.

<strong>git reset --hard HEAD~1</strong> — move back AND discard all changes. Commits AND file changes gone. Dangerous (but reflog can recover).

<strong>git revert &lt;sha&gt;</strong> — creates a NEW commit that undoes a past commit. The safest option for commits already pushed to a shared branch — history is preserved, nothing is rewritten.

<strong>Decision tree:</strong>
• Unstaged change? → <code>git restore</code>
• Staged, not committed? → <code>git restore --staged</code>
• Committed, not pushed? → <code>git reset HEAD~1</code>
• Committed AND pushed? → <code>git revert &lt;sha&gt;</code>`
          },
          {
            type: 'interactive',
            title: 'Undo a pushed commit safely',
            actions: [
              { label: '1. Find the bad commit: git log --oneline', id: 'u_log', result: 'a1b2c3d (HEAD -> main) Oops: wrong file committed\n9f8e7d6 Working state' },
              { label: '2. Revert it safely: git revert a1b2c3d', id: 'u_revert', result: '[main b2c3d4e] Revert "Oops: wrong file committed"\n 1 file changed, 5 deletions(-)', achievement: 'time_traveler' },
              { label: '3. Verify history preserved: git log --oneline', id: 'u_verify', result: 'b2c3d4e (HEAD -> main) Revert "Oops: wrong file committed"\na1b2c3d Oops: wrong file committed\n9f8e7d6 Working state' },
              { label: '4. Push safely: git push', id: 'u_push', result: 'To origin/main\n   a1b2c3d..b2c3d4e  main -> main' }
            ]
          },
          { type: 'quiz', questions: [{ q: 'A colleague tells you to run git reset --hard to undo a commit you already pushed. What\'s the risk?', options: ['None, reset --hard is always safe', 'It deletes your local changes but history on GitHub is fine', 'Rewriting pushed history will conflict with anyone who pulled that commit, causing diverged history', 'Your local machine might crash'], correct: 2, explanation: '✅ git reset --hard rewrites history. If others pulled the commit you\'re removing, they\'ll have a diverged history. Use git revert for pushed commits — it creates a new undo commit rather than rewriting history.' }] }
        ]
      },

      // ── Level 7 ─────────────────────────────
      {
        id: 'i7', num: 7, icon: '🍒', xp: 180,
        title: 'Cherry-Pick',
        subtitle: 'Grab one commit from another branch',
        type: 'interactive',
        tip: 'Cherry-pick creates a NEW commit with a new SHA. The original commit stays on its branch.',
        commands: [
          { cmd: 'git cherry-pick <sha>',      desc: 'Apply a specific commit' },
          { cmd: 'git cherry-pick a1b..d4e',   desc: 'Apply a range of commits' },
          { cmd: 'git cherry-pick --abort',    desc: 'Cancel if conflict' }
        ],
        gitState: {
          focus: 'Cherry-pick copies the typo fix to main without merging dark mode',
          commits: [
            { id: 'c0', msg: 'Initial', branch: 'main', parent: null },
            { id: 'c1', msg: 'main: add footer', branch: 'main', parent: 'c0' },
            { id: 'c2', msg: 'feature: add dark mode', branch: 'feature/dark', parent: 'c0' },
            { id: 'c3', msg: 'feature: fix critical typo', branch: 'feature/dark', parent: 'c2' },
            { id: 'c4', msg: 'cherry-picked: fix critical typo', branch: 'main', parent: 'c1' }
          ],
          branches: { main: 'c4', 'feature/dark': 'c3' },
          HEAD: 'main'
        },
        steps: [
          {
            type: 'story',
            title: 'The Selective Pick',
            context: 'On feature/dark you fixed a critical typo that\'s also wrong on main — but the dark mode feature itself isn\'t ready to merge yet. You only want THAT ONE FIX on main. Enter cherry-pick.',
            objective: '🎯 Apply a single commit from one branch to another with cherry-pick'
          },
          {
            type: 'interactive',
            title: 'Cherry-pick the fix',
            actions: [
              { label: '1. Find the commit SHA on feature branch: git log feature/dark --oneline', id: 'cp_log', result: 'f3a4b5c (feature/dark) fix critical typo\na1b2c3d feature: add dark mode\nc0d1e2f Initial' },
              { label: '2. Switch to main: git switch main', id: 'cp_switch', result: 'Switched to branch \'main\'' },
              { label: '3. Cherry-pick the fix: git cherry-pick f3a4b5c', id: 'cp_pick', result: '[main g4h5i6j] fix critical typo\n 1 file changed, 1 insertion(+), 1 deletion(-)', achievement: 'cherry_picker' },
              { label: '4. Verify: git log --oneline', id: 'cp_verify', result: 'g4h5i6j (HEAD -> main) fix critical typo\nf8a9b0c main: add footer\nc0d1e2f Initial' }
            ]
          },
          { type: 'quiz', questions: [{ q: 'After cherry-picking commit abc123 from feature to main, what is the relationship between them?', options: ['They share the same SHA — it\'s the same commit', 'The cherry-picked commit on main has a NEW SHA — it\'s a copy with same changes', 'feature branch is automatically updated too', 'The original commit abc123 is deleted'], correct: 1, explanation: '✅ Cherry-pick creates a new commit with a new SHA. Same changes, different history. The original commit remains unchanged on its branch.' }] }
        ]
      },

      // ── Level 8 ─────────────────────────────
      {
        id: 'i8', num: 8, icon: '🏷️', xp: 140,
        title: 'Tags & Releases',
        subtitle: 'Mark important points in history',
        type: 'interactive',
        tip: 'Annotated tags (git tag -a) store tagger name, date and message. Use them for releases. Lightweight tags are just pointers.',
        commands: [
          { cmd: 'git tag v1.0.0',              desc: 'Create a lightweight tag' },
          { cmd: 'git tag -a v1.0.0 -m "msg"',  desc: 'Create an annotated tag' },
          { cmd: 'git push origin v1.0.0',      desc: 'Push a specific tag' },
          { cmd: 'git push origin --tags',      desc: 'Push all tags' },
          { cmd: 'git tag',                     desc: 'List all tags' }
        ],
        gitState: {
          focus: 'Tag v1.0.0 pins this exact commit for audits and rollbacks',
          commits: [
            { id: 'c0', msg: 'Initial', branch: 'main', parent: null },
            { id: 'c1', msg: 'v1.0.0 Release', branch: 'main', parent: 'c0', tag: 'v1.0.0' }
          ],
          branches: { main: 'c1' }, HEAD: 'main', tags: { 'v1.0.0': 'c1' }
        },
        steps: [
          {
            type: 'story',
            title: 'Shipping v1.0',
            context: 'TechStart is launching today. You need to mark the exact commit that goes to production so if anything breaks, you can instantly find and roll back to this exact state.',
            objective: '🎯 Create a release tag and push it to GitHub'
          },
          {
            type: 'interactive',
            title: 'Tag your release',
            actions: [
              { label: '1. Create annotated tag: git tag -a v1.0.0 -m "First production release"', id: 't_create', result: '' },
              { label: '2. List tags: git tag', id: 't_list', result: 'v1.0.0' },
              { label: '3. Inspect tag: git show v1.0.0', id: 't_show', result: 'tag v1.0.0\nTagger: You <you@email.com>\nDate: Mon May 11 09:00:00 2026\n\nFirst production release\n\ncommit a1b2c3d...\nAdd login feature' },
              { label: '4. Push tag to GitHub: git push origin v1.0.0', id: 't_push', result: 'To origin\n * [new tag]  v1.0.0 -> v1.0.0' }
            ]
          },
          { type: 'quiz', questions: [{ q: 'You run git push but your new tag doesn\'t appear on GitHub. Why?', options: ['Tags are always pushed automatically', 'You need git push --tags or git push origin <tagname> — tags don\'t push with regular git push', 'Only GitHub admins can create tags', 'You need to create a release on GitHub first'], correct: 1, explanation: '✅ Tags are local by default. git push only sends commits, not tags. Push tags explicitly: git push origin v1.0.0 or push all tags at once with git push origin --tags.' }] }
        ]
      },

      // ── Level 9 ─────────────────────────────
      {
        id: 'i9', num: 9, icon: '🖥️', xp: 200,
        title: 'VS Code Git Deep Dive',
        subtitle: 'Gutter indicators, inline blame, and merge tool',
        type: 'ide',
        tip: 'GitLens extension (free) adds inline blame, history explorer, and remote tracking — highly recommended.',
        commands: [],
        gitState: {
          focus: 'IntelliJ shows inline blame for every line in the diff',
          commits: [
            { id: 'c0', msg: 'Initial', branch: 'main', parent: null },
            { id: 'c1', msg: 'Refactor auth', branch: 'main', parent: 'c0' }
          ],
          branches: { main: 'c1' }, HEAD: 'main'
        },
        steps: [
          {
            type: 'story',
            title: 'Mastering VS Code Git',
            context: 'You spend 8 hours a day in VS Code. Knowing every Git feature in the editor saves clicks and keeps you in flow. Let\'s go beyond basic commits.',
            objective: '🎯 Use VS Code\'s advanced Git features: gutter indicators, inline blame, timeline, merge tool'
          },
          {
            type: 'ide',
            mode: 'vscode-advanced',
            features: [
              { icon: '🔵', name: 'Gutter Indicators', desc: 'Blue bars on modified lines, green on added, red triangles on deleted. Click to see inline diff.' },
              { icon: '👤', name: 'Inline Git Blame', desc: 'Hover over any line to see who changed it, when, and which commit. Install GitLens for permanent inline blame.' },
              { icon: '⏰', name: 'Timeline View', desc: 'In Explorer panel → Timeline tab, see every commit that touched the current file.' },
              { icon: '⚔️', name: '3-Way Merge Editor', desc: 'When conflicts occur, VS Code opens a 3-panel merge editor: Incoming | Result | Current. Click Accept buttons to resolve.' },
              { icon: '🌿', name: 'Branch Switcher', desc: 'Click the branch name in the status bar to instantly create or switch branches.' }
            ]
          },
          { type: 'quiz', questions: [{ q: 'You see a red triangle in VS Code\'s editor gutter. What does it indicate?', options: ['A syntax error in your code', 'Lines were deleted at that position compared to the last commit', 'The file has a merge conflict', 'The line has a breakpoint set'], correct: 1, explanation: '✅ VS Code\'s gutter indicators: blue bar = modified lines, green bar = added lines, red triangle = lines were deleted above/below that point.' }] }
        ]
      },

      // ── Level 10 ────────────────────────────
      {
        id: 'i10', num: 10, icon: '🏁', xp: 300,
        title: 'Intermediate Challenge',
        subtitle: 'Conflict → PR → Review → Merge',
        type: 'challenge',
        tip: 'In the real world, conflicts are opportunities to communicate. Talk to your teammate before deciding how to resolve.',
        commands: [],
        gitState: {
          focus: 'feature/payments merges back to main after the conflict is resolved',
          commits: [
            { id: 'c0', msg: 'Initial', branch: 'main', parent: null },
            { id: 'c1', msg: 'Your feature', branch: 'feature/payments', parent: 'c0' },
            { id: 'c2', msg: 'Teammate commit', branch: 'main', parent: 'c0' },
            { id: 'c3', msg: 'Merge after conflict resolved', branch: 'main', parent: 'c2', merge: 'c1' }
          ],
          branches: { main: 'c3', 'feature/payments': 'c1' },
          HEAD: 'main'
        },
        steps: [
          {
            type: 'story',
            title: '🏁 Final Challenge: Real-World PR Workflow',
            context: 'You built the payments feature on feature/payments. Main has moved on. There\'s a conflict. Resolve it, open a PR, respond to review comments, and merge.',
            objective: '🎯 Complete the full intermediate workflow: rebase, resolve conflict, PR, and merge'
          },
          {
            type: 'challenge',
            steps: [
              { id: 'ch1', instruction: 'Rebase feature/payments onto latest main' },
              { id: 'ch2', instruction: 'Resolve the conflict in payments.js' },
              { id: 'ch3', instruction: 'Commit the resolution and push' },
              { id: 'ch4', instruction: 'Open a PR with a clear description' },
              { id: 'ch5', instruction: 'Respond to the reviewer\'s comment' },
              { id: 'ch6', instruction: 'Get approval and merge via Squash and Merge' }
            ]
          }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════
  //  EXPERT PATH
  // ══════════════════════════════════════════
  expert: {
    title: 'Master Path',
    subtitle: 'Production incidents, advanced internals, team governance',
    color: '#f0883e',
    icon: '⚡',
    levels: [

      // ── Level 1 ─────────────────────────────
      {
        id: 'e1', num: 1, icon: '🧬', xp: 250,
        title: 'Git Internals',
        subtitle: 'Blobs, trees, commits — what .git actually stores',
        type: 'visual',
        tip: 'Every git object is content-addressable: its SHA is computed from its content. Identical content = same SHA across all repos.',
        commands: [
          { cmd: 'git cat-file -t <sha>',  desc: 'Show object type (blob/tree/commit)' },
          { cmd: 'git cat-file -p <sha>',  desc: 'Pretty-print object content' },
          { cmd: 'git ls-tree HEAD',        desc: 'List tree of current commit' }
        ],
        gitState: { focus: 'Every commit points to a tree which points to blobs (file content)', commits: [{ id: 'abc123', msg: 'Add homepage', branch: 'main', parent: null }], branches: { main: 'abc123' }, HEAD: 'main' },
        steps: [
          {
            type: 'story',
            title: 'Under the Hood',
            context: 'You\'ve used Git for years. But do you know what actually happens when you commit? Understanding internals makes you dramatically faster at debugging weird Git situations and mental modelling complex operations.',
            objective: '🎯 Understand Git\'s object model: blobs, trees, and commits'
          },
          {
            type: 'concept',
            title: '🧬 The Git Object Model',
            icon: '🧬',
            body: `Git has exactly 4 types of objects, all stored in <code>.git/objects/</code> and identified by SHA-1 hash:

<strong>Blob</strong> — raw file content. No filename, no metadata. Same content = same blob.
<strong>Tree</strong> — a directory listing: maps filenames to blob/tree SHAs. Like a directory.
<strong>Commit</strong> — points to a tree (snapshot), parent commit(s), author, timestamp, message.
<strong>Tag</strong> — annotated tag object with metadata.

When you commit:
1. Git creates blobs for all changed files
2. Builds a tree object representing the current directory
3. Creates a commit pointing to that tree and the parent commit

This is why Git is so efficient: unchanged files reuse the same blobs. A commit isn't a diff — it's a snapshot, but stored efficiently through sharing.

<strong>Try it:</strong>
<code>git cat-file -p HEAD</code>       → see the commit object
<code>git cat-file -p HEAD^{tree}</code> → see the tree object
<code>git cat-file -p &lt;blob-sha&gt;</code>  → see raw file content`
          },
          { type: 'quiz', questions: [{ q: 'Two different files in your project have exactly the same content. How many blob objects does Git create?', options: ['Two — one per file', 'One — Git deduplicates by content hash', 'It depends on the file size', 'Zero — Git stores diffs not content'], correct: 1, explanation: '✅ Git objects are content-addressable. Same content = same SHA = same blob. Git automatically deduplicates, which is part of why repos with lots of similar files are small.' }] }
        ]
      },

      // ── Level 2 ─────────────────────────────
      {
        id: 'e2', num: 2, icon: '✂️', xp: 280,
        title: 'Interactive Rebase',
        subtitle: 'Rewrite history before sharing it',
        type: 'interactive',
        tip: 'Squashing 10 WIP commits into 1 clean commit before a PR makes code review much easier.',
        commands: [
          { cmd: 'git rebase -i HEAD~4',     desc: 'Interactively rebase last 4 commits' },
          { cmd: 'git rebase -i main',       desc: 'Rebase all commits since branching' },
          { cmd: 'git commit --fixup <sha>', desc: 'Mark a commit as a fixup for sha' },
          { cmd: 'git rebase -i --autosquash', desc: 'Auto-squash fixup commits' }
        ],
        gitState: {
          focus: '3 WIP commits squashed into 1 clean commit before the PR',
          commits: [
            { id: 'c0', msg: 'Last main commit', branch: 'main', parent: null },
            { id: 'c1', msg: 'WIP: start feature', branch: 'feature/search', parent: 'c0' },
            { id: 'c2', msg: 'WIP: more work', branch: 'feature/search', parent: 'c1' },
            { id: 'c3', msg: 'fix typo', branch: 'feature/search', parent: 'c2' },
            { id: 'c4', msg: 'Add search feature', branch: 'feature/search', parent: 'c0' }
          ],
          branches: { main: 'c0', 'feature/search': 'c4' },
          HEAD: 'feature/search'
        },
        steps: [
          {
            type: 'story',
            title: 'The Messy History',
            context: 'You have 8 commits on your feature branch: "WIP", "fix", "typo", "more fixes", "actually working now". Before opening a PR, you want to squash these into 2 clean, logical commits. Time for interactive rebase.',
            objective: '🎯 Use interactive rebase to squash, reorder, and reword commits'
          },
          {
            type: 'concept',
            title: '✂️ Interactive Rebase Commands',
            icon: '✂️',
            body: `<code>git rebase -i HEAD~N</code> opens your editor with a list of the last N commits. Each line starts with a command:

<code>pick</code>   — keep this commit as-is
<code>reword</code> — keep commit but edit the message
<code>edit</code>   — pause here to amend the commit
<code>squash</code> — meld into previous commit, combine messages
<code>fixup</code>  — meld into previous commit, discard this message
<code>drop</code>   — delete this commit entirely
<code>reorder</code>— change line order to reorder commits

<strong>Workflow for a messy branch:</strong>
1. <code>git rebase -i main</code> — shows all commits since branching
2. Change "pick" to "squash" for WIP/fix commits
3. Leave one "pick" per logical unit of work
4. Save and close — Git replays and combines

<strong>Remember:</strong> only do this on commits you haven't pushed, or on a branch only you use.`,
          },
          {
            type: 'interactive',
            title: 'Squash your WIP commits',
            actions: [
              { label: '1. Start interactive rebase of last 4 commits: git rebase -i HEAD~4', id: 'ir_start', result: '# In your editor:\npick c1a2b3d WIP: start feature\npick d4e5f6a WIP: more work  \npick f7a8b9c fix typo\npick a1b2c3d actually working now\n\n# Commands: pick, reword, squash, fixup, drop...' },
              { label: '2. Change to: pick first, squash rest (simulated)', id: 'ir_squash', result: 'Successfully rebased and updated refs/heads/feature/search\n\n# Result: 1 clean commit combining all 4' },
              { label: '3. Verify clean history: git log --oneline', id: 'ir_verify', result: 'e9f0a1b (HEAD -> feature/search) Add search feature with filtering\nc0d1e2f (main) Last main commit', achievement: 'rebaser' },
              { label: '4. Force push (your private branch only!): git push --force-with-lease', id: 'ir_push', result: 'To origin\n + c1a2b3d...e9f0a1b feature/search -> feature/search (forced update)' }
            ]
          },
          { type: 'quiz', questions: [{ q: 'When is it safe to force push after an interactive rebase?', options: ['Always', 'Never — force push is always dangerous', 'Only when it\'s a private branch that no one else has pulled from', 'Only when the repo owner approves it'], correct: 2, explanation: '✅ Force pushing after rebase is safe only on branches you own exclusively. If anyone else pulled the branch, their history diverges from yours and force pushing causes major pain.' }] }
        ]
      },

      // ── Level 3 ─────────────────────────────
      {
        id: 'e3', num: 3, icon: '🕵️', xp: 280,
        title: 'Git Bisect',
        subtitle: 'Binary search your way to the bug',
        type: 'interactive',
        tip: 'git bisect can automatically test commits with a script: git bisect run npm test. Git does binary search on your behalf.',
        commands: [
          { cmd: 'git bisect start',     desc: 'Begin bisect session' },
          { cmd: 'git bisect bad',       desc: 'Mark current commit as bad' },
          { cmd: 'git bisect good <sha>',desc: 'Mark known-good commit' },
          { cmd: 'git bisect run <cmd>', desc: 'Automate with a test script' },
          { cmd: 'git bisect reset',     desc: 'End bisect, restore HEAD' }
        ],
        gitState: {
          focus: 'Bisect checks midpoints to find the bad commit in ~7 steps, not 80',
          commits: [
            { id: 'c0', msg: 'v1.0 — known good', branch: 'main', parent: null },
            { id: 'c4', msg: 'current — broken', branch: 'main', parent: 'c0' }
          ],
          branches: { main: 'c4' }, HEAD: 'main'
        },
        steps: [
          {
            type: 'story',
            title: 'The Regression Hunt',
            context: 'Production broke somewhere between v1.0 (2 weeks ago) and today. There are 80 commits in between. Manually checking each would take hours. git bisect does a binary search — you only check ~7 commits to find the culprit in 80.',
            objective: '🎯 Use git bisect to identify the exact commit that introduced a bug'
          },
          {
            type: 'concept',
            title: '🕵️ Binary Search on Commits',
            icon: '🕵️',
            body: `<code>git bisect</code> uses binary search to find the commit that introduced a bug:

1. Tell Git the current commit is <strong>bad</strong> (has the bug)
2. Tell Git a past commit is <strong>good</strong> (didn't have the bug)
3. Git checks out the commit halfway between them
4. You test: is this commit good or bad?
5. Repeat until Git finds the exact first bad commit

<strong>Math:</strong> 80 commits takes log₂(80) ≈ 7 steps. For 1000 commits: ~10 steps.

<strong>Automated bisect:</strong>
<code>git bisect run npm test</code>
Git runs your test suite at each midpoint. Exit code 0 = good, non-zero = bad. Fully automated!

<strong>After finding the bug commit:</strong>
<code>git show &lt;sha&gt;</code> — see exactly what changed
<code>git bisect reset</code> — return to HEAD`
          },
          {
            type: 'interactive',
            title: 'Bisect the regression',
            actions: [
              { label: '1. Start bisect: git bisect start', id: 'bs_start', result: 'Status: waiting for both good and bad commits' },
              { label: '2. Mark current as bad: git bisect bad', id: 'bs_bad', result: 'Status: waiting for good commit(s), bad commit known' },
              { label: '3. Mark v1.0 as good: git bisect good v1.0.0', id: 'bs_good', result: 'Bisecting: 39 revisions left to test after this (roughly 5 steps)\n[c4d5e6f] Add payment integration' },
              { label: '4. Test — it\'s bad: git bisect bad', id: 'bs_bad2', result: 'Bisecting: 19 revisions left to test\n[b3c4d5e] Update user model' },
              { label: '5. Test — it\'s good: git bisect good', id: 'bs_good2', result: 'Bisecting: 9 revisions left to test\n[c1b2a3d] Change decimal rounding in checkout' },
              { label: '6. Test — it\'s bad: git bisect bad', id: 'bs_found', result: 'c1b2a3d is the first bad commit\nauthor: Raj <raj@techstart.io>\nDate: Fri May 8 14:22:11 2026\n\nChange decimal rounding in checkout\n\n:100644 100644 aaa bbb M checkout.js', achievement: 'bisect_detective' },
              { label: '7. Reset: git bisect reset', id: 'bs_reset', result: 'HEAD is now at e9f0a1b current commit' }
            ]
          },
          { type: 'quiz', questions: [{ q: 'git bisect good v1.0 tells Git that v1.0 is confirmed to not have the bug. What does Git do next?', options: ['Delete all commits after v1.0', 'Check out the commit halfway between v1.0 and the bad commit for you to test', 'Automatically fix the bug', 'Revert all commits back to v1.0'], correct: 1, explanation: '✅ Bisect performs binary search. After knowing good (v1.0) and bad (HEAD), Git checks out the midpoint and waits for you to mark it good or bad, halving the search space each round.' }] }
        ]
      },

      // ── Level 4 ─────────────────────────────
      {
        id: 'e4', num: 4, icon: '🪝', xp: 260,
        title: 'Git Hooks',
        subtitle: 'Automate quality gates in the Git workflow',
        type: 'interactive',
        tip: 'Hooks in .git/hooks/ are not committed to the repo. Use a tool like Husky (Node) or pre-commit (Python) to share hooks with your team.',
        commands: [
          { cmd: 'ls .git/hooks/', desc: 'See available hook samples' },
          { cmd: 'chmod +x .git/hooks/pre-commit', desc: 'Make hook executable' }
        ],
        gitState: { focus: 'Pre-commit hook runs lint before every commit — blocks bad code', commits: [{ id: 'c0', msg: 'Setup hooks', branch: 'main', parent: null }], branches: { main: 'c0' }, HEAD: 'main' },
        steps: [
          {
            type: 'story',
            title: 'Enforcing Standards Automatically',
            context: 'The team keeps committing broken tests and console.log statements. Instead of code-review comments, you want to block bad commits before they happen. Git hooks run scripts automatically at key points in the Git lifecycle.',
            objective: '🎯 Set up a pre-commit hook that runs linting before every commit'
          },
          {
            type: 'concept',
            title: '🪝 Key Git Hooks',
            icon: '🪝',
            body: `Git hooks are scripts in <code>.git/hooks/</code> that execute at lifecycle events:

<strong>Client-side hooks:</strong>
<code>pre-commit</code> — runs before the commit is created. Exit 1 to abort.
<code>commit-msg</code> — validates the commit message. Great for enforcing Jira ticket format.
<code>pre-push</code> — runs before pushing. Block pushes that fail tests.
<code>post-merge</code> — runs after a merge. E.g., auto-run npm install if package.json changed.

<strong>Server-side hooks (GitHub/GitLab managed):</strong>
<code>pre-receive</code> — runs on server when you push. Enforce rules centrally.

<strong>Example pre-commit hook:</strong>
<code>#!/bin/bash
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Lint failed. Fix errors before committing."
  exit 1
fi</code>

<strong>Sharing hooks:</strong> .git/hooks/ is not tracked. Use <strong>Husky</strong> (npm) or <strong>pre-commit</strong> (pip) to define hooks in the repo and install them automatically.`
          },
          {
            type: 'interactive',
            title: 'Set up a pre-commit lint hook',
            actions: [
              { label: '1. Create the hook file: touch .git/hooks/pre-commit', id: 'h_create', result: '' },
              { label: '2. Write lint check (simulated): echo "#!/bin/bash\\nnpm run lint" > .git/hooks/pre-commit', id: 'h_write', result: '' },
              { label: '3. Make executable: chmod +x .git/hooks/pre-commit', id: 'h_chmod', result: '' },
              { label: '4. Test: try to commit broken code (simulated)', id: 'h_test', result: '> my-app@1.0.0 lint\n> eslint src/\n\napp.js\n  12:5  error  no-console  Unexpected console statement\n\n❌ Lint failed. Fix errors before committing.\n\nCommit aborted.', achievement: 'hook_architect' },
              { label: '5. Fix the code and commit again — hook passes', id: 'h_pass', result: '[main a1b2c3d] Add feature (clean code)\n 1 file changed' }
            ]
          },
          { type: 'quiz', questions: [{ q: 'A new developer joins the team and clones the repo. Do they get the git hooks in .git/hooks/?', options: ['Yes, all hooks clone automatically', 'No — .git/ is not cloned. They need to set up hooks separately, or use a hook manager like Husky', 'Yes, but they need to run git pull --hooks first', 'Hooks are stored on GitHub and download automatically'], correct: 1, explanation: '✅ The .git directory is local only and never pushed. For team-wide hooks, use Husky (define hooks in package.json), pre-commit framework, or lefthook — all store hook config in the repo itself.' }] }
        ]
      },

      // ── Level 5 ─────────────────────────────
      {
        id: 'e5', num: 5, icon: '🚨', xp: 350,
        title: 'Incident: Production Hotfix',
        subtitle: 'Real-world emergency workflow under pressure',
        type: 'scenario',
        tip: 'The golden rule of hotfixes: branch from the tag, not from wherever main currently is. You only want the fix — not unreleased features.',
        commands: [
          { cmd: 'git switch -c hotfix/v1.0.1 v1.0.0', desc: 'Branch from a specific tag' },
          { cmd: 'git tag -a v1.0.1 -m "Hotfix"',      desc: 'Tag the hotfix' },
          { cmd: 'git cherry-pick <sha>',               desc: 'Port fix to develop too' }
        ],
        gitState: {
          focus: 'Hotfix branches from v1.0.0 tag, not from main with unreleased features',
          commits: [
            { id: 'c0', msg: 'v1.0.0 — production', branch: 'main', parent: null, tag: 'v1.0.0' },
            { id: 'c1', msg: 'Feature A (unreleased)', branch: 'main', parent: 'c0' },
            { id: 'c2', msg: 'hotfix: fix payment crash', branch: 'hotfix/v1.0.1', parent: 'c0' },
            { id: 'c3', msg: 'v1.0.1 hotfix deployed', branch: 'main', parent: 'c1', merge: 'c2', tag: 'v1.0.1' }
          ],
          branches: { main: 'c3', 'hotfix/v1.0.1': 'c2' },
          HEAD: 'main', tags: { 'v1.0.0': 'c0', 'v1.0.1': 'c3' }
        },
        steps: [
          {
            type: 'story',
            title: '🚨 INCIDENT: Payment Service Down',
            context: 'It\'s 2:47 PM. Slack explodes: "Payments are failing for all EU customers. Revenue is bleeding at $12k/min." You\'re on call. main has 3 unreleased features that aren\'t tested. You cannot push those to production. You need to branch from v1.0.0, fix, deploy as v1.0.1, then port the fix to main.',
            objective: '🎯 Execute a production hotfix safely and efficiently'
          },
          {
            type: 'scenario',
            severity: 'critical',
            title: '🔴 CRITICAL: EU Payment Processor Failing',
            description: 'Error logs show a null pointer in checkout.js:142 introduced by the decimal rounding commit. All EU transactions failing since 14:23.',
            steps: [
              { step: 1, action: 'Create hotfix branch from v1.0.0 tag (NOT from main!)', cmd: 'git switch -c hotfix/v1.0.1 v1.0.0', result: 'Switched to new branch \'hotfix/v1.0.1\' at tag v1.0.0' },
              { step: 2, action: 'Apply the minimal fix to checkout.js', cmd: '# Fix null check on line 142\ngit add checkout.js\ngit commit -m "Fix null pointer in EU payment processing"', result: '[hotfix/v1.0.1 fix3a2b] Fix null pointer in EU payment processing' },
              { step: 3, action: 'Tag the hotfix release', cmd: 'git tag -a v1.0.1 -m "Emergency fix: EU payment null pointer"', result: '' },
              { step: 4, action: 'Merge to main (so main has the fix too)', cmd: 'git switch main && git merge hotfix/v1.0.1', result: 'Merge made by the \'ort\' strategy.' },
              { step: 5, action: 'Push everything', cmd: 'git push origin main v1.0.1', result: '✅ Deployed v1.0.1. EU payments restored at 15:02. Incident duration: 39 minutes.' }
            ]
          },
          { type: 'quiz', questions: [{ q: 'Why did you branch the hotfix from the v1.0.0 tag instead of from current main?', options: ['Tags are faster to branch from', 'main contains unreleased features — branching from the tag gives you the exact production state so the hotfix only contains the fix', 'You can\'t branch from main during an incident', 'It\'s just a convention with no technical difference'], correct: 1, explanation: '✅ Your main branch may have unreleased, untested features since v1.0.0. A hotfix must be surgical: only the fix, nothing else. Branching from the tag gives you the exact production codebase.' }] }
        ]
      },

      // ── Level 6 ─────────────────────────────
      {
        id: 'e6', num: 6, icon: '🏛️', xp: 280,
        title: 'Team Git Governance',
        subtitle: 'Branch protection, CODEOWNERS, and team standards',
        type: 'ide',
        tip: 'Branch protection rules on GitHub are the ultimate enforcement mechanism — they can\'t be bypassed by accident (or laziness).',
        commands: [],
        gitState: { focus: 'Branch protection enforces PR reviews — even admins can\'t bypass it', commits: [{ id: 'c0', msg: 'main protected', branch: 'main', parent: null }], branches: { main: 'c0' }, HEAD: 'main' },
        steps: [
          {
            type: 'story',
            title: 'Scaling to 50 Developers',
            context: 'TechStart grew. There are now 50 engineers across 8 teams. Without governance, main breaks weekly. You need to define and enforce standards at the infrastructure level — not just cultural conventions.',
            objective: '🎯 Configure branch protection rules, CODEOWNERS, and team merge strategies on GitHub'
          },
          {
            type: 'concept',
            title: '🏛️ GitHub Branch Protection Rules',
            icon: '🏛️',
            body: `Go to <strong>GitHub → Settings → Branches → Branch protection rules</strong> → Add rule for <code>main</code>:

✅ <strong>Require pull request before merging</strong> — nobody pushes directly to main
✅ <strong>Require approvals (2)</strong> — minimum N reviewers must approve
✅ <strong>Dismiss stale approvals</strong> — new pushes reset approvals
✅ <strong>Require status checks</strong> — CI must pass (tests, lint, build)
✅ <strong>Require conversation resolution</strong> — all review comments addressed
✅ <strong>Restrict who can push</strong> — only admins in emergencies

<strong>CODEOWNERS file</strong> (<code>.github/CODEOWNERS</code>):
<code># Payments team owns anything in /src/payments/
/src/payments/ @techstart/payments-team

# Frontend lead must review all CSS
*.css @amara-css-lead</code>

When a PR touches owned files, the CODEOWNERS are automatically added as required reviewers.

<strong>Squash strategy</strong>: Settings → General → "Allow squash merging" only. This keeps main history clean: one commit per PR.`
          },
          {
            type: 'ide',
            mode: 'github-settings',
            settings: {
              branchProtection: true,
              requiredReviewers: 2,
              requiredChecks: ['CI/test', 'CI/lint'],
              codeowners: '# CODEOWNERS\n/src/payments/ @payments-team\n/src/auth/     @security-team\n*.css          @frontend-team\nDockerfile     @devops-team'
            }
          },
          { type: 'quiz', questions: [{ q: 'A senior engineer says "I\'ll just push directly to main this one time." What does branch protection do?', options: ['Warns them but allows the push', 'GitHub rejects the push, even for admins (unless bypass is configured)', 'Sends an email to the repo owner', 'Creates a PR automatically from their push'], correct: 1, explanation: '✅ Branch protection rules are enforced by GitHub\'s server. Even repo owners are blocked unless they explicitly have admin bypass configured. This is the whole point — no "just this once."' }] }
        ]
      },

      // ── Level 7 ─────────────────────────────
      {
        id: 'e7', num: 7, icon: '🔬', xp: 300,
        title: 'Advanced IDE: IntelliJ Git',
        subtitle: 'Annotations, log graph, partial commits',
        type: 'ide',
        tip: 'IntelliJ\'s Git tool window (Alt+9 / Cmd+9) has the best visual log graph of any IDE — use it for complex merges.',
        commands: [],
        gitState: {
          focus: 'feature/pay branches from main while auth is added — both tracked',
          commits: [
            { id: 'c0', msg: 'Initial', branch: 'main', parent: null },
            { id: 'c1', msg: 'Add auth', branch: 'main', parent: 'c0' },
            { id: 'c2', msg: 'Add payments', branch: 'feature/pay', parent: 'c1' }
          ],
          branches: { main: 'c1', 'feature/pay': 'c2' }, HEAD: 'main'
        },
        steps: [
          {
            type: 'story',
            title: 'IDE Power User: IntelliJ/WebStorm',
            context: 'IntelliJ IDEA (and its siblings: WebStorm, PyCharm, GoLand) has one of the most powerful built-in Git integrations. Let\'s explore features that go beyond what VS Code offers out of the box.',
            objective: '🎯 Use IntelliJ\'s advanced Git features: interactive log, annotations, and partial commit'
          },
          {
            type: 'concept',
            title: '🔬 IntelliJ Git Power Features',
            icon: '🔬',
            body: `<strong>Git Tool Window (Alt+9 / Cmd+9)</strong>:
Full visual branch graph with filtering, branch comparison, and one-click cherry-pick.

<strong>Annotate with Git Blame (right-click gutter → Annotate)</strong>:
Full inline blame with author, date, and commit message. Click any annotation to see the full diff for that commit.

<strong>Partial Commits (Changelist)</strong>:
IntelliJ lets you organize changed files into named "changelists" — like named staging areas. Stage exactly which lines of a file to commit (line-level staging!) via the Commit dialog → Show Diff → select hunks.

<strong>Git Interactive Rebase Tool</strong>:
Menu: Git → Rebase → Interactively. Opens a visual drag-and-drop rebase editor — no need to remember pick/squash/fixup commands.

<strong>Resolve Conflicts</strong>:
3-way merge dialog: Left (yours), Middle (result), Right (theirs). Click arrows to accept changes line by line.

<strong>GitHub PR Integration</strong>:
Install the GitHub plugin → create/review PRs without leaving the IDE. Comments appear inline in the editor.`
          },
          { type: 'quiz', questions: [{ q: 'In IntelliJ, you want to commit only 3 lines of a 20-line changed file. How do you do this?', options: ['You can\'t — IntelliJ commits entire files', 'Use the Commit dialog → Show Diff → uncheck the line hunks you don\'t want', 'Split the file into two files first', 'Use git add -p in the built-in terminal'], correct: 1, explanation: '✅ IntelliJ\'s commit dialog shows a diff view where you can select individual hunks (or even individual lines) to include or exclude. This is equivalent to git add -p but visual.' }] }
        ]
      },

      // ── Level 8 ─────────────────────────────
      {
        id: 'e8', num: 8, icon: '⚡', xp: 500,
        title: 'Expert Final Challenge',
        subtitle: 'Multi-incident scenario: salvage a bad rebase',
        type: 'scenario',
        tip: 'git reflog never forgets. Even after a bad rebase or reset, your original commits are still there for ~30 days.',
        commands: [
          { cmd: 'git reflog',              desc: 'See all HEAD movements' },
          { cmd: 'git reset --hard HEAD@{3}', desc: 'Go back to 3 HEAD positions ago' },
          { cmd: 'git rebase --abort',      desc: 'Cancel a rebase gone wrong' }
        ],
        gitState: {
          focus: 'reflog recovered the "lost" commits — nothing is ever truly gone',
          commits: [
            { id: 'c0', msg: 'Good state (pre-rebase)', branch: 'main', parent: null },
            { id: 'c1', msg: 'After recovery via reflog', branch: 'feature/xyz', parent: 'c0' }
          ],
          branches: { main: 'c0', 'feature/xyz': 'c1' }, HEAD: 'feature/xyz'
        },
        steps: [
          {
            type: 'story',
            title: '⚡ Scenario: Rebase Gone Wrong',
            context: 'A junior dev rebased their feature branch but it went sideways — conflicts everywhere, they panicked and now 2 days of work looks "gone." They\'ve come to you. You have git reflog. Stay calm.',
            objective: '🎯 Use git reflog to recover from a destructive rebase and restore lost commits'
          },
          {
            type: 'scenario',
            severity: 'warning',
            title: '⚠️ Developer: "I think I lost 2 days of work"',
            description: 'They ran git rebase main, got conflicts, panicked, ran git rebase --abort, then git reset --hard... now their commits appear gone.',
            steps: [
              { step: 1, action: 'Check reflog — nothing is ever truly lost', cmd: 'git reflog', result: 'a1b2c3d HEAD@{0}: reset: moving to HEAD\nb2c3d4e HEAD@{1}: rebase --abort: HEAD\nc3d4e5f HEAD@{2}: rebase (start): checkout main\nd4e5f6a HEAD@{3}: commit: Add payment UI (2 days of work!)\ne5f6a7b HEAD@{4}: commit: Add cart logic\nf6a7b8c HEAD@{5}: checkout: moving from main to feature/xyz' },
              { step: 2, action: 'The commits are still there! Restore to pre-rebase state', cmd: 'git reset --hard HEAD@{3}', result: 'HEAD is now at d4e5f6a Add payment UI' },
              { step: 3, action: 'Verify all work is back', cmd: 'git log --oneline', result: 'd4e5f6a (HEAD -> feature/xyz) Add payment UI\ne5f6a7b Add cart logic\nf6a7b8c Initial cart setup' },
              { step: 4, action: 'Now do the rebase properly', cmd: 'git rebase main', result: 'Successfully rebased and updated refs/heads/feature/xyz.' },
              { step: 5, action: 'Push cleanly', cmd: 'git push --force-with-lease origin feature/xyz', result: '✅ Branch restored and rebased. All 2 days of work recovered. Crisis averted.' }
            ]
          },
          { type: 'quiz', questions: [{ q: 'git reflog shows HEAD@{0} through HEAD@{N}. What does HEAD@{3} refer to?', options: ['The 3rd branch in the repo', 'Where HEAD was 3 movements ago in your local history', 'The 3rd commit on main', 'HEAD 3 hours ago'], correct: 1, explanation: '✅ Reflog records every movement of HEAD: checkouts, resets, rebases, commits. HEAD@{3} means "where HEAD was 3 operations ago." This is local-only history — not shared with remotes.' }]
          }
        ]
      }
    ]
  }
};
