// data-commands.js — Terminal practice steps, CLI quiz questions, and life-stage concept examples
// Patches GAME_DATA at runtime. Load after data-lifestage.js.

// ─── Life-stage concept examples ─────────────────────────────────────────────
// Shown as a coloured "Your World" box inside concept steps.
// Key: `${persona}_${levelId}_${stepIndex}`  (0-based step index within the lesson)
// renderConcept() reads this global when it renders.
window.LIFESTAGE_EXAMPLES = {
  school: {
    // b1 concept step (idx 1)
    'beginner_b1_1': 'You and Jamie are editing the same Google Doc for your history project and keep overwriting each other. Git tracks every version separately — no more "who deleted my paragraph?" moments.',
    // b2 — git init concept (idx 1)
    'beginner_b2_1': 'Imagine setting up a project notebook with a built-in "undo" button for every single change. git init gives your folder exactly that — an automatic history of every file, forever.',
    // b3 — three areas (idx 1)
    'beginner_b3_1': 'Think: rough notes → final answer sheet → teacher\'s folder. Your working directory is the rough copy, staging is reviewing before handing in, and committing is the teacher filing it away permanently.',
    // b4 — commits (idx 1)
    'beginner_b4_1': 'Every commit is like taking a dated photo of your project. Your teacher asks "show me what it looked like last Wednesday?" — git checkout <hash> goes back to exactly that photo.',
    // b5 — branches (idx 1)
    'beginner_b5_1': 'You and three friends each get a photocopy of the project. Everyone adds their section separately. At the end, you merge the best parts together. That\'s branching.',
    // b6 — merging (idx 1)
    'beginner_b6_1': 'You and Jamie both edited the intro paragraph. Git shows you BOTH versions side-by-side and asks: "which one wins, or do you want to combine them?" You\'re the editor.',
    // b7 — remotes (idx 1)
    'beginner_b7_1': 'GitHub is like a shared Google Drive for code — but with a full history of every change. Your whole group pulls the latest version, adds their work, pushes it back. No more emailing zips.',
    // b8 — gitignore (idx 1)
    'beginner_b8_1': 'Remember accidentally submitting your scratch notes with your essay? .gitignore is the rule that says "NEVER include .env or my personal notes when I push to GitHub."',
    // Intermediate
    'intermediate_i2_1': 'Two group members edited the same line in the shared README. Git shows <<<, ===, >>> markers and asks you to pick the winner — or write something better. No work is lost.',
    'intermediate_i4_1': 'Your teacher urgently needs a correction to yesterday\'s submission. Stash your current half-written draft, fix the correction, submit it, then pop your stash and pick up where you left off.',
    'intermediate_i6_1': 'You submitted the wrong version of your code project. git revert creates an "official correction" — the bad commit stays in the record, but this new commit cancels its effect.',
  },
  uni: {
    'beginner_b1_1': 'Your 4-person team is emailing "final_FINAL_v2.zip" back and forth. One source of truth, full history of every change, who did what and when — that\'s what Git provides.',
    'beginner_b2_1': 'Running git init in your assignment folder is like registering with a librarian who tracks every draft. Your lecturer can see every change from first line to final submission.',
    'beginner_b3_1': 'Staging is your "code review" before committing. Only commit the changes you meant to make — not the debug console.logs and TODO comments you left in by accident.',
    'beginner_b4_1': 'Every commit is a checkpoint you can return to. If your refactor breaks everything at 2am before the deadline: git checkout <hash> gets you back to the last working version in seconds.',
    'beginner_b5_1': 'Your team is adding a login page AND fixing the nav at the same time. Branches let each person work in isolation — no one breaks anyone else\'s code until you deliberately merge.',
    'beginner_b6_1': 'Two teammates edited the same component file. Git detects the clash, shows both versions, and asks you to resolve it. The resolution becomes a new commit — history stays intact.',
    'beginner_b7_1': 'GitHub is your team\'s shared remote. One person pushes a fix; everyone else pulls it. No more "send me the latest version" messages in the Discord server.',
    'beginner_b8_1': '.gitignore keeps node_modules (200MB+), .env secrets, and IDE config off GitHub. Your teammates\' git clone will be fast and their .env won\'t get overwritten by yours.',
    'intermediate_i2_1': 'PR review is done — you click merge and git reports a conflict. Two teammates edited the same line. Git shows both versions; you pick the right one, commit, and the PR merges cleanly.',
    'intermediate_i4_1': 'Deep into a refactor when a blocker bug is found in the main branch. Stash your WIP, fix the bug on a hotfix branch, merge and push, then pop the stash to resume exactly where you stopped.',
    'intermediate_i6_1': 'You pushed a broken test to the shared branch. git revert creates a new "undo" commit — safe to push because it doesn\'t rewrite history. Your teammates pull it and the CI goes green.',
  },
  learner: {
    'beginner_b1_1': 'You once deleted your entire project while "cleaning up". Never again — Git keeps every version of every file in the .git folder. You can always go back to any point in time.',
    'beginner_b2_1': 'git init takes any folder and turns it into a tracked project in 0.1 seconds. The hidden .git folder is your project\'s permanent memory — never delete it.',
    'beginner_b3_1': 'The staging area is your "final proof-read" before saving. Stage half your changes, review them, unstage anything that\'s not ready, commit only the good stuff.',
    'beginner_b4_1': 'A commit is a permanent save point with a message. Future-you will thank present-you for clear messages like "fix redirect bug after login" instead of "stuff".',
    'beginner_b5_1': 'Branches mean you can experiment freely without fear. Build a wild new feature on a branch — if it fails, delete the branch. If it works, merge it in. Zero risk.',
    'beginner_b6_1': 'Your dark-mode feature branch is done. git merge brings it into main. If you and a tutorial file both changed the same line, Git shows the conflict for you to resolve.',
    'beginner_b7_1': 'GitHub gives your project a public home. Access it from any machine, share it for feedback, or link it in a job application as proof of your work.',
    'beginner_b8_1': 'Never accidentally push your API keys again. Add .env to .gitignore and Git will forever ignore that file — even if you run git add . a hundred times.',
    'intermediate_i2_1': 'You tried to merge your feature branch and hit a conflict. Don\'t panic — Git is showing you two different versions of the same line and asking you to decide which is right.',
    'intermediate_i4_1': 'git stash is a clipboard for half-finished work. Stash it, switch branches to fix a quick bug, come back and pop — your in-progress changes are exactly where you left them.',
    'intermediate_i6_1': 'git revert is the safe undo — adds a new commit that cancels a previous one. Unlike git reset, it doesn\'t rewrite history, so it\'s safe even after you\'ve already pushed.',
  }
};

(function patchCommands() {
  // Add terminal-practice steps to levels
  function addSteps(persona, levelId, newSteps) {
    const lvl = GAME_DATA[persona].levels.find(l => l.id === levelId);
    if (!lvl) return;
    // Insert BEFORE the last step (which is usually a quiz)
    lvl.steps.splice(lvl.steps.length - 1, 0, ...newSteps);
  }

  // Add extra questions to the last quiz step in a level
  // (stepIdx is kept for compatibility but ignored — we always find the last quiz)
  function addQuizQuestions(persona, levelId, _stepIdx, newQuestions) {
    const lvl = GAME_DATA[persona].levels.find(l => l.id === levelId);
    if (!lvl) return;
    // Find last quiz step so it works regardless of addSteps ordering
    const quizStep = [...lvl.steps].reverse().find(s => s.type === 'quiz');
    if (!quizStep) return;
    quizStep.questions.push(...newQuestions);
  }


  // ══════════════════════════════════════════════════════════════
  //  BEGINNER — b2: Your First Repository
  // ══════════════════════════════════════════════════════════════

  addSteps('beginner', 'b2', [
    {
      type: 'terminal-practice',
      title: 'Practice: Initialize Your First Repo',
      context: 'You have an empty folder on your machine and want to start tracking it with Git. You need to create the project directory, move into it, initialise Git, and check what Git sees.',
      contexts: {
        school: 'You are starting your science fair project and want to track every change to your research notes and code so you never lose work again.',
        uni: 'Your software engineering coursework requires you to submit via a Git repository. You need to initialise one in your assignment folder before you write a single line of code.',
        learner: 'You just had a great idea for a personal side project. Before writing any code, you want Git watching from commit zero so nothing ever gets lost.',
        working: 'A new client has signed the contract. You are setting up the Git repository for their project before the first planning meeting even ends.'
      },
      tasks: [
        {
          instruction: 'Create a new project folder called my-project',
          command: 'mkdir my-project',
          acceptPartial: false,
          hint: 'Use the mkdir command followed by the folder name.',
          successMsg: '✅ Folder created. You now have an empty directory ready to become a Git repo.'
        },
        {
          instruction: 'Move into the new folder',
          command: 'cd my-project',
          acceptPartial: false,
          hint: 'Use the cd command to change into the directory you just created.',
          successMsg: '✅ You are now inside my-project. Any Git commands you run will apply here.'
        },
        {
          instruction: 'Initialise a new Git repository',
          command: 'git init',
          acceptPartial: false,
          hint: 'The command that starts every Git project is two words: git, then init.',
          successMsg: '✅ Initialized empty Git repository in my-project/.git/ — Git is now watching this folder.'
        },
        {
          instruction: 'Check the status of your brand-new repository',
          command: 'git status',
          acceptPartial: false,
          hint: 'git status tells you what Git currently sees — files, branches, staged changes.',
          successMsg: '✅ "No commits yet — nothing to commit." That\'s exactly right. A fresh repo with no files staged and no history.'
        }
      ]
    }
  ]);

  addQuizQuestions('beginner', 'b2', 3, [
    {
      q: 'What does `git status` show in a brand-new repository that has no commits and no files?',
      options: [
        'fatal: not a git repository',
        'No commits yet — nothing to commit',
        'HEAD detached at origin/main',
        'On branch master, nothing to push'
      ],
      correct: 1,
      hint: 'Think about what Git knows at this point: the branch exists but there is no history yet.',
      hint2: 'Git reports the branch state even before any files are staged. The key phrase is "No commits yet".',
      explanation: '✅ In a fresh repo, git status says "No commits yet — nothing to commit." Git has initialised the branch but has nothing in its history.',
      wrongConsequences: [
        null,
        'That error only appears when you run a git command outside any git repository — but git init just created one.',
        '"HEAD detached" means you checked out a commit SHA directly, not relevant to a brand-new repo.',
        'Git uses "main" by default now, and "nothing to push" is not the message shown before any commits exist.'
      ]
    },
    {
      q: 'Which command creates the hidden .git folder that stores all of Git\'s history and configuration?',
      options: [
        'git start',
        'git create',
        'git init',
        'git new'
      ],
      correct: 2,
      hint: 'The command name is short for "initialise".',
      hint2: 'You run this command once per project, at the very beginning.',
      explanation: '✅ git init is the command that bootstraps a repository. It creates the .git directory where Git stores objects, branches, HEAD, and all configuration.',
      wrongConsequences: [
        null,
        'git start is not a real Git command.',
        'git create is not a real Git command.',
        'git new is not a real Git command.'
      ]
    }
  ]);


  // ══════════════════════════════════════════════════════════════
  //  BEGINNER — b3: The Three Areas (staging)
  // ══════════════════════════════════════════════════════════════

  addSteps('beginner', 'b3', [
    {
      type: 'terminal-practice',
      title: 'Practice: Stage Your First File',
      context: 'You have just created a new file in your project. You need to see it appear as untracked, stage it, and then confirm that Git has queued it for your next commit.',
      contexts: {
        school: 'You have written the introduction to your history essay in a file called essay.txt and want to checkpoint it in Git before you keep writing.',
        uni: 'You have started coding your assignment in main.py. Before the lab session ends you want to stage it so your next commit captures a clean starting point.',
        learner: 'You have created index.html for your portfolio site. You want to add it to staging so your first commit only includes the skeleton structure, not yet any half-finished CSS.',
        working: 'You have scaffolded the new feature file feature-auth.js. You need to stage it separately from the unrelated style tweaks you also have sitting in your working directory.'
      },
      tasks: [
        {
          instruction: 'Create a new file called notes.txt',
          command: 'touch notes.txt',
          acceptPartial: false,
          hint: 'Use the touch command to create an empty file.',
          successMsg: '✅ notes.txt created. It exists on disk but Git has never seen it — it is "untracked".'
        },
        {
          instruction: 'Check what Git sees in your working directory',
          command: 'git status',
          acceptPartial: false,
          hint: 'git status always tells you the current state of tracked, untracked, and staged files.',
          successMsg: '✅ Git reports notes.txt as an untracked file — shown in red. It is in your working directory but not yet in the staging area.'
        },
        {
          instruction: 'Stage notes.txt so it is ready to commit',
          command: 'git add notes.txt',
          acceptPartial: false,
          hint: 'git add followed by the filename moves a file from the working directory into the staging area.',
          successMsg: '✅ notes.txt is now staged. It moved from the working directory into the staging area — ready to be committed.'
        },
        {
          instruction: 'Run git status again to confirm the file is staged',
          command: 'git status',
          acceptPartial: false,
          hint: 'After git add, git status should show the file in green under "Changes to be committed".',
          successMsg: '✅ notes.txt now appears in green as a "new file" staged for commit. It is in the staging area, waiting.'
        },
        {
          instruction: 'Inspect what is in the staging area with git diff --staged',
          command: 'git diff --staged',
          acceptPartial: false,
          hint: 'git diff --staged (also written git diff --cached) shows only the changes that are staged, not unstaged ones.',
          successMsg: '✅ You can see the diff of exactly what will go into your next commit. This is your last chance to review before git commit.'
        }
      ]
    }
  ]);

  addQuizQuestions('beginner', 'b3', 3, [
    {
      q: 'You ran `git add style.css`. What is the correct next command to permanently save that snapshot into Git\'s history?',
      options: [
        'git save -m "Add styles"',
        'git push -m "Add styles"',
        'git commit -m "Add styles"',
        'git store -m "Add styles"'
      ],
      correct: 2,
      hint: 'The command that creates a permanent snapshot from the staging area starts with "git com…".',
      hint2: 'There are three steps: edit → git add → git commit. The -m flag lets you write the message inline.',
      explanation: '✅ git commit -m "message" takes everything in the staging area and writes it as a permanent snapshot into the repository. git save and git store are not real commands.',
      wrongConsequences: [
        null,
        'git save is not a real Git command.',
        'git push sends commits to a remote — it does not create them. You must commit first.',
        'git store is not a real Git command.'
      ]
    },
    {
      q: 'What is the difference between `git diff` and `git diff --staged`?',
      options: [
        'They are identical — both show all changes',
        'git diff shows unstaged changes; git diff --staged shows what is already staged',
        'git diff shows committed changes; git diff --staged shows uncommitted changes',
        'git diff --staged only works after a push'
      ],
      correct: 1,
      hint: 'Think about which area each command is inspecting: working directory or staging area.',
      hint2: '"Staged" means the changes that have been git add-ed and are waiting to be committed.',
      explanation: '✅ git diff compares your working directory to the staging area (unstaged changes only). git diff --staged compares the staging area to the last commit (what WILL be committed). Use both together to get the full picture.',
      wrongConsequences: [
        null,
        'They show different scopes — one is working directory changes, the other is staged changes.',
        'git diff does not show committed changes — use git log or git show for that.',
        'git diff --staged is a purely local command and has nothing to do with pushing.'
      ]
    }
  ]);


  // ══════════════════════════════════════════════════════════════
  //  BEGINNER — b4: Your First Commit
  // ══════════════════════════════════════════════════════════════

  addSteps('beginner', 'b4', [
    {
      type: 'terminal-practice',
      title: 'Practice: Commit, Log, and Inspect',
      context: 'Your files are staged and ready. You will commit them, then use git log and git show to understand what Git just stored.',
      contexts: {
        school: 'You have finished the first draft of your science project report. You want to commit it so you can always return to this exact version even after making further edits.',
        uni: 'Your lab code is at a working state before you start the next experiment. You commit it now so your supervisor can see a clean checkpoint when they review your repo.',
        learner: 'Your portfolio homepage is looking good enough to show people. You commit this version so that even if tomorrow\'s experiments break everything, today\'s progress is safe.',
        working: 'You have completed the first slice of the new feature and it passes all tests. You commit it as a stable checkpoint before tackling the next slice.'
      },
      tasks: [
        {
          instruction: 'Stage all changed files at once',
          command: 'git add .',
          acceptPartial: false,
          hint: 'The dot (.) means "everything in the current directory and below". Use it carefully.',
          successMsg: '✅ All modified and new files are now staged. The dot is a shortcut — in production you often prefer to stage files individually for more precise commits.'
        },
        {
          instruction: 'Create your first commit with a clear message',
          command: 'git commit -m "Add project homepage"',
          acceptPartial: true,
          hint: 'Use git commit -m followed by a short, imperative description in quotes. Imperative means "Add…" not "Added…".',
          successMsg: '✅ Commit created! Git assigned it a unique SHA hash and stored the snapshot permanently. Your working directory is now clean.'
        },
        {
          instruction: 'View the commit history in compact form',
          command: 'git log --oneline',
          acceptPartial: false,
          hint: 'git log shows full history; --oneline compresses each commit to a single line showing the SHA and message.',
          successMsg: '✅ You can see your commit listed with its short SHA and message. As your project grows, this view lets you scan history at a glance.'
        },
        {
          instruction: 'Inspect the full details of the most recent commit',
          command: 'git show HEAD',
          acceptPartial: false,
          hint: 'HEAD is a pointer to your latest commit. git show HEAD displays the commit metadata and the full diff of what changed.',
          successMsg: '✅ git show HEAD reveals the author, date, message, and exact diff — every line added or removed. This is what Git permanently stored.'
        }
      ]
    }
  ]);

  addQuizQuestions('beginner', 'b4', 3, [
    {
      q: 'What is wrong with using "stuff" as a commit message?',
      options: [
        'Nothing — short messages are best practice',
        'Git will reject messages shorter than 10 characters',
        'It is not descriptive — future you and teammates will not know what changed or why',
        'It will corrupt the repository index'
      ],
      correct: 2,
      hint: 'Think about reading that message six months from now when you are hunting a bug.',
      hint2: 'The whole point of a commit message is to communicate intent. "stuff" communicates nothing.',
      explanation: '✅ Good commit messages explain WHAT changed and ideally WHY. "stuff" leaves future readers (including yourself) completely in the dark. Git does not reject it technically, but your team will not thank you for it.',
      wrongConsequences: [
        null,
        'Short messages are fine — "Fix typo in README" is excellent. The problem is vagueness, not length.',
        'Git has no minimum length requirement for commit messages — the quality issue is human, not technical.',
        'A bad message does not corrupt anything — it just makes the history useless for debugging and code review.'
      ]
    },
    {
      q: 'After running `git commit`, where do your staged changes go?',
      options: [
        'They are pushed to GitHub automatically',
        'They stay in the staging area until you push',
        'They are stored as a permanent snapshot in the local repository',
        'They are deleted from your working directory'
      ],
      correct: 2,
      hint: 'Remember the three areas: working directory, staging area, and repository.',
      hint2: 'git commit moves changes from the staging area into the .git repository — locally, not remotely.',
      explanation: '✅ git commit writes the staged snapshot into your local repository as a permanent, addressable commit. Nothing is sent to GitHub — that requires git push. Your working directory files are untouched.',
      wrongConsequences: [
        null,
        'git commit never automatically contacts a remote. You must explicitly run git push.',
        'After a commit, the staging area is cleared — those changes now live in the repository, not the index.',
        'Your working directory files are not deleted. Only the staging area is cleared; files on disk remain exactly as they are.'
      ]
    }
  ]);


  // ══════════════════════════════════════════════════════════════
  //  BEGINNER — b5: Branches
  // ══════════════════════════════════════════════════════════════

  addSteps('beginner', 'b5', [
    {
      type: 'terminal-practice',
      title: 'Practice: Create and Work on a Branch',
      context: 'You need to add a new feature without risking the stable code on main. You will create a dedicated branch, switch to it, make a change, and commit — all while main stays untouched.',
      contexts: {
        school: 'You are writing a group essay and want a separate draft branch for your own section so you do not overwrite your classmates\' paragraphs until everyone is ready to combine.',
        uni: 'Your team has split the coursework into modules. You each work on a separate branch — one per team member — so your code never clashes until the final integration sprint.',
        learner: 'You want to try a completely different navigation layout for your portfolio but keep the working version safe on main in case the experiment does not pan out.',
        working: 'The sprint board has a ticket for a new search feature. You create a feature branch so your experimental work is isolated from the production-ready code on main.'
      },
      tasks: [
        {
          instruction: 'List all existing branches to see where you are',
          command: 'git branch',
          acceptPartial: false,
          hint: 'git branch with no arguments lists all local branches. The asterisk (*) marks the current branch.',
          successMsg: '✅ You can see all local branches with * marking the active one. Right now you are on main with a clean history.'
        },
        {
          instruction: 'Create a new branch AND switch to it in one command',
          command: 'git checkout -b feature/my-branch',
          acceptPartial: true,
          hint: 'git checkout -b <name> creates the branch and switches to it in a single step. Alternatively: git switch -c <name>.',
          successMsg: '✅ Switched to a new branch "feature/my-branch". HEAD now points here instead of main. Any commits you make will build on this branch only.'
        },
        {
          instruction: 'List branches again to confirm the asterisk moved',
          command: 'git branch',
          acceptPartial: false,
          hint: 'Run git branch again — the asterisk should now be next to your new branch, not main.',
          successMsg: '✅ The asterisk is now next to feature/my-branch. main is listed but you are no longer on it.'
        },
        {
          instruction: 'Make a small change — create a new file on this branch',
          command: 'touch feature.txt',
          acceptPartial: false,
          hint: 'Use touch to create an empty file. This simulates the work you would do on your feature.',
          successMsg: '✅ feature.txt exists only in your working directory on this branch. main has no idea it exists yet.'
        },
        {
          instruction: 'Stage and commit the change on the feature branch',
          command: 'git add feature.txt && git commit -m "Add feature file"',
          acceptPartial: true,
          hint: 'Chain git add and git commit with &&. Your commit lands on feature/my-branch, not on main.',
          successMsg: '✅ Committed on feature/my-branch. Switch back to main with git checkout main — you will see feature.txt is gone. That is branch isolation working perfectly.'
        }
      ]
    }
  ]);

  addQuizQuestions('beginner', 'b5', 3, [
    {
      q: 'Which command creates a new branch AND switches to it in a single step?',
      options: [
        'git branch -switch feature/login',
        'git new feature/login',
        'git checkout -b feature/login',
        'git branch feature/login --activate'
      ],
      correct: 2,
      hint: 'The flag that means "create and switch" is -b.',
      hint2: 'The modern equivalent using git switch is: git switch -c feature/login. Both work.',
      explanation: '✅ git checkout -b feature/login (or git switch -c feature/login) creates the branch and immediately checks it out. Without the flag, git branch only creates without switching.',
      wrongConsequences: [
        null,
        'git branch -switch is not valid syntax — -switch is not a recognised flag.',
        'git new is not a real Git command.',
        'git branch feature/login --activate is not valid syntax.'
      ]
    },
    {
      q: 'You are on main and run `git branch feature`. What happens?',
      options: [
        'Git creates the branch and automatically switches to it',
        'Git creates the branch but you are still on main',
        'Git throws an error because you must use checkout',
        'Git creates the branch and pushes it to origin'
      ],
      correct: 1,
      hint: 'git branch <name> (without -c or -b) only creates — it does not switch.',
      hint2: 'To also switch, you need git switch -c feature or git checkout -b feature.',
      explanation: '✅ git branch feature creates the branch pointer but leaves HEAD on main. You would still need to run git switch feature (or git checkout feature) to move to it.',
      wrongConsequences: [
        null,
        'Automatic switching only happens with git checkout -b or git switch -c.',
        'git branch is a perfectly valid command — the error assumption is wrong.',
        'git branch is a purely local operation and never contacts a remote.'
      ]
    }
  ]);


  // ══════════════════════════════════════════════════════════════
  //  BEGINNER — b6: Merging
  // ══════════════════════════════════════════════════════════════

  addSteps('beginner', 'b6', [
    {
      type: 'terminal-practice',
      title: 'Practice: Merge and Clean Up',
      context: 'Your feature branch is finished and tested. You switch back to main, merge the work in, inspect the resulting history, and then delete the now-redundant branch.',
      contexts: {
        school: 'Each group member wrote their section on a separate branch. You are the one merging everyone\'s contributions into the final document branch before the submission deadline.',
        uni: 'Your teammate finished the database module on their branch. You are the integration lead: you merge it into main so the whole team can build on top of the completed module.',
        learner: 'Your experimental dark-mode branch turned out great. You merge it into your main portfolio branch so visitors see the new design when they visit your GitHub Pages site.',
        working: 'The feature passed code review and all CI checks are green. You merge the feature branch into main — the final step before it ships to production in tonight\'s deployment.'
      },
      tasks: [
        {
          instruction: 'Switch back to the main branch',
          command: 'git checkout main',
          acceptPartial: true,
          hint: 'You must be ON the branch you want to merge INTO. Use git checkout main or git switch main.',
          successMsg: '✅ Switched to branch "main". You are now on the integration branch — merges always go INTO the branch you are currently on.'
        },
        {
          instruction: 'Merge the feature branch into main',
          command: 'git merge feature/my-branch',
          acceptPartial: true,
          hint: 'git merge <branch> brings the commits from that branch into whichever branch you are currently on.',
          successMsg: '✅ Merge successful! Git replayed the commits from feature/my-branch onto main. If it was a fast-forward, the history is linear — no merge commit needed.'
        },
        {
          instruction: 'View the commit graph to understand what happened',
          command: 'git log --oneline --graph',
          acceptPartial: false,
          hint: '--graph draws an ASCII art tree of the branch and merge structure next to each commit.',
          successMsg: '✅ The graph shows whether Git did a fast-forward (straight line) or a 3-way merge (fork and reunion). Either way, your feature commits are now part of main\'s history.'
        },
        {
          instruction: 'Delete the feature branch now that it has been merged',
          command: 'git branch -d feature/my-branch',
          acceptPartial: true,
          hint: 'The -d flag deletes a branch that has been fully merged. Git will refuse if there are unmerged commits.',
          successMsg: '✅ Branch deleted. The commits are still in main\'s history — you only removed the label. Keeping your branch list tidy prevents confusion as the project grows.'
        }
      ]
    }
  ]);

  addQuizQuestions('beginner', 'b6', 3, [
    {
      q: 'You are on main and run `git merge feature`. The merge succeeds. Where are you now?',
      options: [
        'Switched to the feature branch automatically',
        'Still on main, with feature\'s commits now added to main\'s history',
        'On a new detached HEAD at the merge commit',
        'On main but the working directory now shows the feature files as staged'
      ],
      correct: 1,
      hint: 'Merging never moves you to a different branch.',
      hint2: 'You merge INTO your current branch. You stay on it throughout.',
      explanation: '✅ git merge brings the target branch\'s commits INTO your current branch. You remain on main. The feature commits are now part of main\'s history and your working directory reflects the merged state.',
      wrongConsequences: [
        null,
        'git merge never switches your active branch — you stay wherever you were.',
        'Detached HEAD happens when you check out a commit hash directly, not during a normal merge.',
        'After a successful merge the working directory is clean — there is nothing staged unless there was a conflict.'
      ]
    },
    {
      q: 'Which flag makes `git log` draw an ASCII graph of the branch and merge history?',
      options: [
        '--tree',
        '--visual',
        '--graph',
        '--branches'
      ],
      correct: 2,
      hint: 'The flag name describes exactly what it draws.',
      hint2: 'Combined with --oneline it gives you a compact, visual history: git log --oneline --graph.',
      explanation: '✅ git log --graph renders an ASCII art branch-and-merge diagram alongside each commit. Pair it with --oneline for a compact overview of your full branching history.',
      wrongConsequences: [
        null,
        '--tree is not a valid git log flag.',
        '--visual is not a valid git log flag.',
        '--branches is not a valid git log flag.'
      ]
    }
  ]);


  // ══════════════════════════════════════════════════════════════
  //  BEGINNER — b7: Remotes & GitHub
  // ══════════════════════════════════════════════════════════════

  addSteps('beginner', 'b7', [
    {
      type: 'terminal-practice',
      title: 'Practice: Connect and Push to GitHub',
      context: 'Your project lives only on your laptop. You need to connect it to a remote repository on GitHub, verify the connection, push your commits up, and then pull down any changes a collaborator made.',
      contexts: {
        school: 'Your teacher wants everyone to submit projects via GitHub. You have your local repo ready — now you need to connect it to the class organisation and push your work before the deadline.',
        uni: 'Your coursework must be on the university GitLab instance. You connect your local repo to the remote, push your commits, and make sure your lab partner can clone and run it.',
        learner: 'You want a backup of your portfolio on GitHub and a public URL to share with potential employers. You push your local commits to a new GitHub repository you created just now.',
        working: 'Your local feature work needs to land on the team\'s shared remote so CI can run, reviewers can read the diff, and the branch can eventually be merged via a pull request.'
      },
      tasks: [
        {
          instruction: 'Link your local repo to the remote GitHub URL',
          command: 'git remote add origin https://github.com/you/my-project.git',
          acceptPartial: true,
          hint: 'git remote add <name> <url> — "origin" is the conventional name for your primary remote.',
          successMsg: '✅ Remote "origin" added. Your local repo now knows where to push and pull. No data has moved yet — this just saved the address.'
        },
        {
          instruction: 'Verify the remote is configured correctly',
          command: 'git remote -v',
          acceptPartial: false,
          hint: 'git remote -v (verbose) shows the fetch and push URLs for every remote you have configured.',
          successMsg: '✅ You can see origin listed for both fetch and push. Two lines — one for each direction. Everything looks correct.'
        },
        {
          instruction: 'Push your commits to GitHub and set the upstream tracking branch',
          command: 'git push -u origin main',
          acceptPartial: false,
          hint: 'The -u flag (short for --set-upstream) connects your local main to origin/main so future pushes just need "git push".',
          successMsg: '✅ Branch "main" set up to track "origin/main". Your commits are now on GitHub. From now on, just run git push — Git knows where to send them.'
        },
        {
          instruction: 'Pull the latest changes from the remote (simulating a teammate\'s update)',
          command: 'git pull',
          acceptPartial: false,
          hint: 'git pull fetches remote commits and merges them into your current branch in one step.',
          successMsg: '✅ Fast-forward merge applied. Your local main now includes the commit your teammate pushed. You are up to date.'
        }
      ]
    }
  ]);

  addQuizQuestions('beginner', 'b7', 3, [
    {
      q: 'What does `git push -u origin main` do that a plain `git push` would not?',
      options: [
        'It pushes faster using compression',
        'It creates a new branch on the remote',
        'It sets origin/main as the upstream tracking branch so future pushes only need `git push`',
        'It forces the push even if it would overwrite remote history'
      ],
      correct: 2,
      hint: 'The -u flag stands for --set-upstream. Think about what "tracking" means for future convenience.',
      hint2: 'After -u is set once, git push and git pull know which remote branch to target without you specifying it every time.',
      explanation: '✅ The -u flag links your local branch to the remote branch (origin/main). Once that tracking relationship exists, bare git push and git pull use it automatically. Without -u you would need to type the full git push origin main each time.',
      wrongConsequences: [
        null,
        '-u has nothing to do with compression or transfer speed.',
        'The remote branch is created by the push itself if it does not exist — -u adds the tracking relationship on top of that.',
        'Force pushing requires --force or -f, not -u. -u is safe and non-destructive.'
      ]
    },
    {
      q: 'What is the key difference between `git fetch` and `git pull`?',
      options: [
        'fetch is for branches, pull is for tags',
        'fetch downloads remote commits without merging; pull downloads AND merges them into your current branch',
        'pull only works when you have the -u upstream set; fetch always works',
        'They are identical — pull is just a newer alias for fetch'
      ],
      correct: 1,
      hint: 'git pull = git fetch + git merge. One does both steps; the other does only the download.',
      hint2: 'Use fetch when you want to see what changed remotely before deciding to integrate it.',
      explanation: '✅ git fetch safely downloads remote commits into origin/main without touching your working branch. git pull does the same download then immediately merges into your current branch. Fetch-then-inspect is safer in a busy shared repo.',
      wrongConsequences: [
        null,
        'Both fetch and pull work with branches, commits, and tags — the distinction is about merging, not content type.',
        'Both commands work regardless of upstream tracking — the -u flag only affects convenience, not capability.',
        'They are not identical. pull always triggers a merge (or rebase with --rebase); fetch never does.'
      ]
    }
  ]);


  // ══════════════════════════════════════════════════════════════
  //  BEGINNER — b8: .gitignore
  // ══════════════════════════════════════════════════════════════

  addSteps('beginner', 'b8', [
    {
      type: 'terminal-practice',
      title: 'Practice: Create and Commit a .gitignore',
      context: 'Your project has files that should never go to GitHub — dependency folders, compiled output, secrets. You will write a .gitignore, confirm Git respects it, and commit the file so the whole team benefits from the same rules.',
      contexts: {
        school: 'You keep a personal notes.txt with rough ideas you do not want graded. You add it to .gitignore so it stays on your laptop and never appears in the repo the teacher reviews.',
        uni: 'Your Python assignment produces __pycache__/ and *.pyc compiled files. You ignore them so the repo stays clean and the marker does not have to wade through build artefacts.',
        learner: 'Your Node.js portfolio project has a node_modules/ folder with 200 MB of packages. You ignore it so git status stays readable and GitHub never stores a 200 MB upload.',
        working: 'Your project has a .env file with database credentials and API keys. Committing it would be a serious security incident. You ignore it immediately and verify it before the first push.'
      },
      tasks: [
        {
          instruction: 'Append node_modules/ to a .gitignore file (creates the file if it does not exist)',
          command: 'echo "node_modules/" >> .gitignore',
          acceptPartial: true,
          hint: 'The >> operator appends to a file. If .gitignore does not exist yet, it creates it. The trailing slash tells Git this is a directory pattern.',
          successMsg: '✅ .gitignore now contains "node_modules/". Git will ignore that directory — it will not show up in git status even if the folder exists on disk.'
        },
        {
          instruction: 'Check git status to see .gitignore appear as a new untracked file',
          command: 'git status',
          acceptPartial: false,
          hint: 'The .gitignore file itself is a normal file that Git tracks. You will see it listed as untracked — ready to be staged.',
          successMsg: '✅ git status shows .gitignore as a new untracked file. Notice that node_modules/ does NOT appear — the ignore rule is already working.'
        },
        {
          instruction: 'Stage and commit the .gitignore so the whole team shares the same ignore rules',
          command: 'git add .gitignore && git commit -m "Add .gitignore"',
          acceptPartial: true,
          hint: 'Chain git add and git commit with &&. Use a descriptive message so teammates know what rules are being established.',
          successMsg: '✅ .gitignore committed. Every developer who clones or pulls this repo will automatically ignore node_modules/ — keeping the repository clean for everyone.'
        }
      ]
    }
  ]);

  addQuizQuestions('beginner', 'b8', 2, [
    {
      q: 'You already committed `secrets.env` in a previous commit. You now add it to `.gitignore`. Is it ignored?',
      options: [
        'Yes — .gitignore now prevents Git from tracking it',
        'No — .gitignore only prevents untracked files from being tracked; already-tracked files must be un-tracked first with `git rm --cached`',
        'Yes, but only after you push the .gitignore',
        'No — you would need to delete the whole repository and re-clone'
      ],
      correct: 1,
      hint: '.gitignore has no effect on files Git is already tracking.',
      hint2: 'The fix is: git rm --cached secrets.env, then commit that removal, and add secrets.env to .gitignore.',
      explanation: '✅ .gitignore only prevents UNTRACKED files from entering the index. If a file is already committed, Git continues to track changes to it regardless of .gitignore. Use git rm --cached <file> to un-track it without deleting it from disk, then commit that change.',
      wrongConsequences: [
        null,
        'Adding to .gitignore AFTER a file is tracked does nothing to stop Git from tracking future changes to it.',
        'Pushing has no bearing on when .gitignore rules take effect — the tracking vs untracking distinction is entirely local.',
        'Deleting the whole repository is a drastic and unnecessary step. git rm --cached is the precise surgical fix.'
      ]
    },
    {
      q: 'Which pattern in `.gitignore` ignores ALL `.log` files in any folder at any depth?',
      options: [
        '/logs/*.log',
        'logs/',
        '*.log',
        '.log'
      ],
      correct: 2,
      hint: 'The asterisk (*) is a wildcard that matches any sequence of characters except a slash.',
      hint2: 'A pattern without a leading slash matches anywhere in the directory tree.',
      explanation: '✅ *.log matches every file whose name ends in .log, regardless of which subfolder it lives in. /logs/*.log only matches log files directly inside a top-level logs/ directory. logs/ ignores a directory named logs. .log is not valid glob syntax.',
      wrongConsequences: [
        null,
        '/logs/*.log only applies to the top-level logs/ directory — it misses log files in src/logs/ or any other subdirectory.',
        'logs/ ignores a directory literally named "logs" — it does not match files with a .log extension.',
        '.log is not a standard glob pattern and would only match a file literally named ".log", if anything.'
      ]
    }
  ]);


  // ══════════════════════════════════════════════════════════════
  //  INTERMEDIATE — i2: Merge Conflicts
  // ══════════════════════════════════════════════════════════════

  addSteps('intermediate', 'i2', [
    {
      type: 'terminal-practice',
      title: 'Practice: Trigger, Read, and Resolve a Conflict',
      context: 'A merge conflict has stopped your git merge mid-way. You need to understand the conflict markers, edit the file to produce the correct final version, stage the resolution, and complete the merge.',
      contexts: {
        school: 'You and your classmate both edited the conclusion paragraph of your group essay at the same time. Git cannot pick which version is right — you have to read both and write the final paragraph together.',
        uni: 'Two developers on your team both modified the same database connection function in config.js. The merge has paused and left conflict markers. You need to combine both changes correctly and commit.',
        learner: 'You were experimenting on a branch and also made a quick fix directly on main. Now both branches edited the same line of index.html and Git needs you to decide which version wins.',
        working: 'Two features both touched the app config file. The merge stopped with a conflict in production.config.js. You need to incorporate both sets of changes and ensure nothing is lost before completing the merge.'
      },
      tasks: [
        {
          instruction: 'Merge the conflicting branch to trigger the conflict',
          command: 'git merge feature/conflicting-branch',
          acceptPartial: true,
          hint: 'Run git merge as normal. If there is an overlapping edit, Git will pause and report "CONFLICT (content): Merge conflict in <filename>".',
          successMsg: '✅ Automatic merge failed. Conflict in app.js. Git has inserted conflict markers into the file and stopped — it is waiting for you to make the decision it cannot.'
        },
        {
          instruction: 'Open the conflicted file and read the conflict markers',
          command: 'cat app.js',
          acceptPartial: true,
          hint: 'Use cat or your editor to view the file. You will see <<<<<<< HEAD, =======, and >>>>>>> markers dividing the two conflicting versions.',
          successMsg: '✅ You can see the three-part structure: <<<<<<< HEAD is your version, ======= separates the two, and >>>>>>> feature/conflicting-branch is the incoming version. Everything outside the markers merged cleanly.'
        },
        {
          instruction: 'Edit the file to remove all conflict markers and write the correct final version',
          command: 'nano app.js',
          acceptPartial: true,
          hint: 'Open the file in any editor. Delete the <<<<<<, =======, and >>>>>>> lines. Keep, combine, or rewrite the content between them to the correct final state.',
          successMsg: '✅ Conflict markers removed. The file now contains the resolved content with no Git markup. It is clean and ready to be staged.'
        },
        {
          instruction: 'Stage the resolved file to tell Git the conflict is handled',
          command: 'git add app.js',
          acceptPartial: true,
          hint: 'git add on a previously conflicted file marks it as resolved. Git tracks which files still have unresolved conflicts via git status.',
          successMsg: '✅ app.js marked as resolved. If there were other conflicted files, you would git add each one. git status now shows "All conflicts fixed but you are still merging".'
        },
        {
          instruction: 'Complete the merge with a commit',
          command: 'git commit',
          acceptPartial: true,
          hint: 'Run git commit with no arguments — Git will pre-fill the merge commit message. You can edit it or accept the default.',
          successMsg: '✅ Merge commit created. The conflict is resolved and the full history of both branches is preserved. Well handled — conflicts feel scary but they are just a structured conversation between two sets of changes.'
        }
      ]
    }
  ]);

  addQuizQuestions('intermediate', 'i2', 3, [
    {
      q: 'What do the three conflict markers `<<<<<<<`, `=======`, and `>>>>>>>` represent in a conflicted file?',
      options: [
        '<<<<<<< marks the remote version, ======= is Git\'s suggestion, >>>>>>> is your local version',
        '<<<<<<< is your current branch\'s version, ======= separates the two, >>>>>>> is the incoming branch\'s version',
        'All three mark lines that should be deleted entirely',
        '<<<<<<< and >>>>>>> mark file boundaries; ======= marks the middle of the file'
      ],
      correct: 1,
      hint: 'HEAD = current branch = yours. The branch name after >>>>>>> = incoming = theirs.',
      hint2: 'Everything from <<<<<<< HEAD to ======= is what YOUR branch had. Everything from ======= to >>>>>>> is what the OTHER branch had.',
      explanation: '✅ <<<<<<< HEAD to ======= shows your version (current branch). ======= to >>>>>>> branch-name shows the incoming version. You choose which to keep, or write something new, then remove all three marker lines.',
      wrongConsequences: [
        null,
        'The positions are reversed in this option — HEAD is always YOUR current branch, not the remote.',
        'The markers delimit the conflicting sections — they do not mean both sections should be deleted.',
        'The markers are not file boundaries — they appear inline within the file wherever Git found overlapping edits.'
      ]
    },
    {
      q: 'After manually editing a file to resolve conflict markers, which TWO commands complete the merge?',
      options: [
        'git merge --continue, then git push',
        'git resolve <file>, then git merge --finish',
        'git add <file>, then git commit',
        'git checkout --theirs <file>, then git commit'
      ],
      correct: 2,
      hint: 'You need to tell Git the conflict is resolved (stage it), then finalise the merge (commit it).',
      hint2: 'git merge --continue is valid but it is equivalent to git commit here — staging first is the required step.',
      explanation: '✅ After editing: (1) git add <file> marks the conflict resolved and stages the fix; (2) git commit finalises the merge and creates the merge commit. Both steps are mandatory — staging alone is not enough.',
      wrongConsequences: [
        null,
        'git merge --continue is valid but you still must stage the file first. git push comes after, not during, conflict resolution.',
        'git resolve is not a real Git command.',
        'git checkout --theirs would overwrite your manual resolution with the incoming branch\'s entire version — you would lose your edit.'
      ]
    }
  ]);


  // ══════════════════════════════════════════════════════════════
  //  INTERMEDIATE — i4: Stashing
  // ══════════════════════════════════════════════════════════════

  addSteps('intermediate', 'i4', [
    {
      type: 'terminal-practice',
      title: 'Practice: Stash, Switch, and Restore',
      context: 'You are in the middle of writing code when an urgent task demands your full attention. You need to stash your incomplete changes, switch context, handle the urgent work, and then restore exactly where you left off.',
      contexts: {
        school: 'You are halfway through your essay rewrite when your teacher asks to see your submission folder right now. You stash the draft so the repo looks clean, show the teacher, then pop the stash to keep writing.',
        uni: 'You are deep in a half-finished refactor when a critical bug is found in your just-submitted lab. You stash your WIP, switch to main, patch the bug, then pop the stash to resume the refactor.',
        learner: 'You are experimenting with a new CSS animation on your branch when you notice a broken link on the deployed main branch. You stash your experiment, fix the link on main, push, and then pop your stash.',
        working: 'You are halfway through a new API endpoint when PagerDuty fires. A payment gateway is down. You stash your half-done feature, hotfix on main, deploy, and then pop back into the feature without losing a line.'
      },
      tasks: [
        {
          instruction: 'Make some changes to a file so there is something to stash',
          command: 'echo "work in progress" >> feature.js',
          acceptPartial: true,
          hint: 'Any modification to a tracked file will do. This simulates half-finished work you cannot commit yet.',
          successMsg: '✅ feature.js is now modified. git status will show it as "Changes not staged for commit". You have something to stash.'
        },
        {
          instruction: 'Stash all uncommitted changes to get a clean working tree',
          command: 'git stash',
          acceptPartial: false,
          hint: 'git stash with no arguments saves all tracked modified files (staged and unstaged) to the stash stack.',
          successMsg: '✅ Saved working directory and index state. Your changes are on the stash stack and the working directory is now clean — you can safely switch branches.'
        },
        {
          instruction: 'Confirm the working tree is clean after stashing',
          command: 'git status',
          acceptPartial: false,
          hint: 'After git stash, git status should report "nothing to commit, working tree clean".',
          successMsg: '✅ "nothing to commit, working tree clean". Your half-finished work is safely stored in the stash. Do your urgent task now — switch branches, fix the bug, push the hotfix.'
        },
        {
          instruction: 'Restore your stashed changes back to the working directory',
          command: 'git stash pop',
          acceptPartial: false,
          hint: 'git stash pop applies the most recent stash entry and removes it from the stash stack.',
          successMsg: '✅ Your changes are back exactly as you left them. The stash entry has been removed from the stack. You can pick up right where you left off — not a single line was lost.'
        }
      ]
    }
  ]);

  addQuizQuestions('intermediate', 'i4', 3, [
    {
      q: 'You have unstaged changes to two files and you run `git stash`. What does `git status` show immediately after?',
      options: [
        'Changes not staged for commit: (the two files)',
        'Changes to be committed: (the two files)',
        'nothing to commit, working tree clean',
        'Stash conflict: please resolve before continuing'
      ],
      correct: 2,
      hint: 'The whole point of git stash is to give you a clean slate.',
      hint2: 'git stash moves your changes off the working tree and onto an internal stack — they vanish from git status.',
      explanation: '✅ git stash takes all dirty changes (staged and unstaged) off the working tree and index, stores them on the stash stack, and leaves everything clean. git status then shows a pristine working tree.',
      wrongConsequences: [
        null,
        'The whole point of stashing is that those changes are no longer in the working directory — they are tucked away.',
        '"Changes to be committed" would mean the files are staged — stash removes them from both the index and the working directory.',
        '"Stash conflict" is not a real git status message — stash conflicts only occur when you pop a stash onto a dirty working tree.'
      ]
    },
    {
      q: 'What is the difference between `git stash pop` and `git stash apply`?',
      options: [
        'They are identical — pop is just a shorter alias',
        'pop applies the stash and removes it from the stack; apply applies the stash but keeps it in the stack',
        'apply only works on named stashes; pop works on any stash',
        'pop always takes the oldest stash; apply always takes the newest'
      ],
      correct: 1,
      hint: 'Think of a stack of papers: pop takes the top one away; apply copies the top one without removing it.',
      hint2: 'Use apply when you want to apply the same stash to multiple branches. Use pop for the common one-and-done case.',
      explanation: '✅ git stash pop = git stash apply + git stash drop. It restores the stash and removes it from the list. git stash apply restores the stash but leaves it on the stack — useful if you want to apply the same changes to another branch.',
      wrongConsequences: [
        null,
        'They are not identical — pop removes the stash entry after applying; apply does not.',
        'Both pop and apply can target any stash entry by index (e.g., stash@{2}) — the named/unnamed distinction is not relevant here.',
        'Both pop and apply default to stash@{0} (the most recent). You specify an index to target an older one.'
      ]
    }
  ]);


  // ══════════════════════════════════════════════════════════════
  //  INTERMEDIATE — i6: Undoing Mistakes
  // ══════════════════════════════════════════════════════════════

  addSteps('intermediate', 'i6', [
    {
      type: 'terminal-practice',
      title: 'Practice: Safely Undo a Pushed Commit',
      context: 'A commit landed on main that should not be there. Because it is already pushed to a shared remote, you cannot rewrite history — you need to create a new commit that undoes it, then push that safely.',
      contexts: {
        school: 'You accidentally committed and pushed your rough notes file to the shared class repo. Your teacher can see it. You revert the commit so the repo goes back to the clean version without touching anyone else\'s work.',
        uni: 'A broken test file was pushed to the shared coursework repo an hour before the demo. You run git revert to create an undo commit and push it — the repo is clean again and the commit history shows exactly what happened.',
        learner: 'You pushed a commit that broke your portfolio\'s homepage layout and shared the link. You revert the commit, push the revert, and the site is fixed for anyone who visits — all in under two minutes.',
        working: 'A bad config change hit the production branch. You cannot force-push — the whole team is on that branch. You git revert the offending commit and push the revert as a hotfix, preserving the full audit trail.'
      },
      tasks: [
        {
          instruction: 'View recent history to identify the commit you need to undo',
          command: 'git log --oneline',
          acceptPartial: false,
          hint: 'Find the short SHA of the commit you want to revert. You will pass it to git revert.',
          successMsg: '✅ You can see the commit history. Note the short SHA (7 characters) of the bad commit — something like a1b2c3d. That is what you will pass to git revert.'
        },
        {
          instruction: 'Revert the bad commit by creating a new undo commit',
          command: 'git revert HEAD',
          acceptPartial: true,
          hint: 'git revert HEAD reverts the most recent commit. You can also use the specific SHA. Git will open an editor for the commit message — save and close it.',
          successMsg: '✅ Revert commit created. Git wrote a new commit that does the exact opposite of the bad commit. The original bad commit is still in history — nothing was erased.'
        },
        {
          instruction: 'Verify the revert commit appears in history',
          command: 'git log --oneline',
          acceptPartial: false,
          hint: 'Run git log --oneline again and look for a new commit at the top prefixed with "Revert".',
          successMsg: '✅ The revert commit is at the top of the log: "Revert: <original message>". The original bad commit is still visible beneath it. History is preserved — that is the point.'
        },
        {
          instruction: 'Push the revert commit to the remote so everyone gets the fix',
          command: 'git push',
          acceptPartial: false,
          hint: 'Because git revert created a new commit (not a history rewrite), git push works with no flags.',
          successMsg: '✅ Pushed. The remote now has the revert commit. Anyone who pulls will get the fix automatically. No force-push required, no history rewritten, no colleague disrupted.'
        }
      ]
    }
  ]);

  addQuizQuestions('intermediate', 'i6', 3, [
    {
      q: 'What is the key difference between `git revert` and `git reset`?',
      options: [
        'They are identical — revert is just a safer alias for reset',
        'reset is for local changes only; revert only works on remote commits',
        'revert creates a new commit that undoes the change, preserving history; reset moves the branch pointer back, rewriting history',
        'revert permanently deletes the bad commit; reset keeps it in reflog only'
      ],
      correct: 2,
      hint: 'One adds a new commit to fix the past; the other moves a pointer to pretend the past did not happen.',
      hint2: 'For a commit already pushed to a shared branch, revert is always the safe choice because it does not rewrite history that others already have.',
      explanation: '✅ git revert creates a new "undo" commit — history grows by one and is never rewritten. git reset moves the branch pointer backward — it removes commits from the visible history and should only be used on local, unpushed commits. Rewriting pushed history causes diverged history for every collaborator who already pulled.',
      wrongConsequences: [
        null,
        'They are fundamentally different operations. Both can be used locally or on pushed commits — the distinction is about history rewriting, not locality.',
        'This description reverses the actual danger: reset rewrites history; revert never does.',
        'git revert does not delete anything — the original commit remains in history. git reset does not "keep" the commit in a meaningful way if you use --hard.'
      ]
    },
    {
      q: 'You accidentally staged the wrong file. Which command un-stages it WITHOUT discarding your changes?',
      options: [
        'git reset --hard HEAD',
        'git checkout -- <file>',
        'git restore --staged <file>',
        'git clean -f <file>'
      ],
      correct: 2,
      hint: 'You want to move the file back from the staging area to the working directory — keeping the edits on disk.',
      hint2: 'The --staged flag tells git restore to target the index (staging area) rather than the working directory.',
      explanation: '✅ git restore --staged <file> moves the file from the staging area back to the working directory — your edits are untouched. git reset --hard HEAD would discard all uncommitted changes entirely. git checkout -- <file> also discards working directory changes (old syntax). git clean removes untracked files.',
      wrongConsequences: [
        null,
        'git reset --hard HEAD resets BOTH the index and the working directory to the last commit — you would lose your changes entirely.',
        'git checkout -- <file> discards all uncommitted changes to the file in the working directory — it is destructive, not just un-staging.',
        'git clean -f removes untracked files from disk — it does not operate on staged files at all.'
      ]
    }
  ]);

})();
