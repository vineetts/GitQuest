// data-lifestage.js — Life-stage-specific story contexts
// Loaded after data.js. Provides LIFESTAGE_CONTEXTS global.
// Keys are: personaId_levelId_stepIndex (e.g. beginner_b1_0)
// Each entry: { context, character? }

const LIFESTAGE_CONTEXTS = {

  // ════════════════════════════════════════════════════════
  //  SCHOOL — High school student
  // ════════════════════════════════════════════════════════
  school: {

    // ── BEGINNER ────────────────────────────────────────

    // b1 — What is Git?
    beginner_b1_0: {
      context: "Mr. Chen just announced the end-of-term group project — three people sharing the same code files. Last time, Jamie accidentally deleted two hours of your work when he emailed you 'the final version'. You ended up with four files called project_FINAL_v2_real.html on your desktop. There has to be a better way.",
      character: { name: 'Mr. Chen', role: 'CS Teacher', avatar: '👨‍🏫' }
    },

    // b2 — Your First Repository
    beginner_b2_0: {
      context: "Mr. Chen set your first real coding assignment: build a personal webpage and track every change you make to it with Git. You've created the folder on your school laptop and now need to initialize a repository before you can start tracking anything.",
      character: { name: 'Mr. Chen', role: 'CS Teacher', avatar: '👨‍🏫' }
    },

    // b3 — The Three Areas
    beginner_b3_0: {
      context: "You've written the HTML, the CSS, and half a JavaScript file for your science-fair entry. Mr. Chen said to commit only the finished pieces and leave the JS for later — but you've never staged files selectively before. Turns out Git has three distinct areas that let you do exactly that.",
      character: { name: 'Mr. Chen', role: 'CS Teacher', avatar: '👨‍🏫' }
    },

    // b4 — Your First Commit
    beginner_b4_0: {
      context: "Your science-fair project is finally working. Before you change another thing, Mr. Chen says to save a checkpoint — a commit — so that if tomorrow's edits break everything you can always come back to today's working version. Think of it like saving your game before a boss fight.",
      character: { name: 'Mr. Chen', role: 'CS Teacher', avatar: '👨‍🏫' }
    },

    // b5 — Branches
    beginner_b5_0: {
      context: "Jamie wants to add an animation to your group project, and you want to add a dark-mode toggle — but the deadline is tomorrow and neither feature is done yet. If you both edit main.js at the same time you'll definitely break each other's work. Branches let you work in parallel without stepping on each other.",
      character: { name: 'Jamie', role: 'Classmate', avatar: '🧑‍🎓' }
    },

    // b6 — Merging
    beginner_b6_0: {
      context: "Your dark-mode branch is done and tested. Jamie's animation branch is done too. Now it's time to combine both into the main project before you submit. Merging brings two separate lines of work back together — like joining two essay sections into one document.",
      character: { name: 'Jamie', role: 'Classmate', avatar: '🧑‍🎓' }
    },

    // b7 — Remotes & GitHub
    beginner_b7_0: {
      context: "Your project only exists on your school laptop. If the laptop gets wiped over the holidays — or Jamie needs to pull your latest code from home — you have a problem. Pushing to GitHub means the code lives in the cloud and every group member can access it.",
      character: { name: 'Jamie', role: 'Classmate', avatar: '🧑‍🎓' }
    },

    // b8 — .gitignore
    beginner_b8_0: {
      context: "You run git status and see your node_modules folder (thousands of files), your .env file with your secret API key for the weather widget, and a bunch of .DS_Store junk your Mac added. None of that should go on GitHub — especially not the API key. Time to set up .gitignore.",
      character: { name: 'Jamie', role: 'Classmate', avatar: '🧑‍🎓' }
    },

    // b9 — VS Code
    beginner_b9_0: {
      context: "You've been typing git commands in the terminal, but Mr. Chen showed the class that VS Code has a built-in Source Control panel that does staging, committing, and branching with just a few clicks. For day-to-day work, knowing both the CLI and the GUI makes you twice as fast.",
      character: { name: 'Mr. Chen', role: 'CS Teacher', avatar: '👨‍🏫' }
    },

    // b10 — Beginner Challenge
    beginner_b10_0: {
      context: "End-of-term assessment: Mr. Chen wants you to demonstrate the full Git workflow from scratch — create a repo, make commits on a feature branch, merge it, and push to GitHub. Everything you've learned this term, end to end. You've got this.",
      character: { name: 'Mr. Chen', role: 'CS Teacher', avatar: '👨‍🏫' }
    },

    // ── INTERMEDIATE ────────────────────────────────────

    // i1 — Branching Strategies
    intermediate_i1_0: {
      context: "Your group has grown to six people for the school hackathon. Without any rules, people are pushing broken code directly to main and breaking each other's work every hour. You need an agreed branching strategy before the event starts tomorrow morning.",
      character: { name: 'Jamie', role: 'Classmate', avatar: '🧑‍🎓' }
    },

    // i2 — Merge Conflicts
    intermediate_i2_0: {
      context: "You and Jamie both edited the same line in index.html last night — you changed the title to 'Science Fair 2026' and Jamie changed it to 'Our Awesome Project'. Now Git is refusing to merge and showing those scary conflict markers. This is your first real merge conflict.",
      character: { name: 'Jamie', role: 'Classmate', avatar: '🧑‍🎓' }
    },

    // i3 — Rebase vs Merge
    intermediate_i3_0: {
      context: "Your feature branch forked from main three days ago. The main branch now has Jamie's latest commits. Before you show Mr. Chen your PR, you want your branch to look like it was built on top of the newest code — no messy fork in the graph. Should you merge or rebase?",
      character: { name: 'Mr. Chen', role: 'CS Teacher', avatar: '👨‍🏫' }
    },

    // i4 — Stashing
    intermediate_i4_0: {
      context: "You're halfway through adding a search bar to the project when Jamie pings you: 'The submit button is broken and we're presenting in 20 minutes!' You can't commit your half-finished search code, but you can't lose it either. git stash is exactly what you need right now.",
      character: { name: 'Jamie', role: 'Classmate', avatar: '🧑‍🎓' }
    },

    // i5 — Pull Requests
    intermediate_i5_0: {
      context: "Mr. Chen introduced a new rule: nobody merges their own code — you must open a Pull Request and get at least one classmate to review it before it goes to main. Your dark-mode feature is ready. Time to open your first PR and invite Jamie to review.",
      character: { name: 'Mr. Chen', role: 'CS Teacher', avatar: '👨‍🏫' }
    },

    // i6 — Undoing Mistakes
    intermediate_i6_0: {
      context: "You committed your passwords.txt file by accident and pushed it to the public school GitHub repo. Your heart drops. Mr. Chen says everyone makes this mistake at least once — but you need to act fast. Git has several undo tools and choosing the wrong one makes things worse.",
      character: { name: 'Mr. Chen', role: 'CS Teacher', avatar: '👨‍🏫' }
    },

    // i7 — Cherry-Pick
    intermediate_i7_0: {
      context: "On your dark-mode branch you fixed a broken navigation link that's also broken on main — but dark mode itself isn't ready to submit yet. You want just that one fix on main before the presentation. Cherry-pick lets you grab a single commit without merging the whole branch.",
      character: { name: 'Jamie', role: 'Classmate', avatar: '🧑‍🎓' }
    },

    // i8 — Tags
    intermediate_i8_0: {
      context: "Mr. Chen wants you to tag the exact version you submitted for the science fair so the judges can check out that snapshot even after you keep developing. Tags are permanent bookmarks in Git history — the committed-for-real version, not whatever you change next week.",
      character: { name: 'Mr. Chen', role: 'CS Teacher', avatar: '👨‍🏫' }
    },

    // i9 — VS Code Deep Dive
    intermediate_i9_0: {
      context: "You spend hours every evening in VS Code writing code for your portfolio project. You know the basics of the Source Control panel, but there are gutter indicators, inline blame, and a three-way merge editor that would save you so much time if you knew how to use them.",
      character: { name: 'Jamie', role: 'Classmate', avatar: '🧑‍🎓' }
    },

    // i10 — Intermediate Challenge
    intermediate_i10_0: {
      context: "Final project submission week. You need to rebase your feature onto the latest main, resolve the conflict in styles.css, open a proper PR, respond to Jamie's review comment, and merge — all before the 11:59 PM deadline. Real pressure, real workflow.",
      character: { name: 'Jamie', role: 'Classmate', avatar: '🧑‍🎓' }
    },

    // ── EXPERT ──────────────────────────────────────────

    // e1 — Git Internals
    expert_e1_0: {
      context: "Mr. Chen challenged the top of the class: 'Can anyone tell me what actually happens inside .git when you commit?' You've been using Git for months but you've never looked under the hood. Understanding the object model — blobs, trees, commits — will make you genuinely dangerous with this tool.",
      character: { name: 'Mr. Chen', role: 'CS Teacher', avatar: '👨‍🏫' }
    },

    // e2 — Interactive Rebase
    expert_e2_0: {
      context: "Before you demo your hackathon project, you look at your commit history: 'wip', 'fix', 'actually fix', 'omg finally'. You want to squash it into two clean logical commits before the judges look at your GitHub. Interactive rebase is how the pros tidy up history before sharing it.",
      character: { name: 'Jamie', role: 'Classmate', avatar: '🧑‍🎓' }
    },

    // e3 — Git Bisect
    expert_e3_0: {
      context: "Your project was working perfectly two weeks ago. Now the chart on the results page is completely broken and you have no idea which of your 40 commits broke it. Checking each one manually would take all night. git bisect does a binary search — you only need to check about 6 commits to find the culprit.",
      character: { name: 'Mr. Chen', role: 'CS Teacher', avatar: '👨‍🏫' }
    },

    // e4 — Git Hooks
    expert_e4_0: {
      context: "Mr. Chen keeps reminding the class not to commit .env files or leave console.log statements in final submissions. Wouldn't it be great if Git automatically stopped you before committing those mistakes? Git hooks let you run scripts at key points in the workflow — like a safety net you set up once.",
      character: { name: 'Mr. Chen', role: 'CS Teacher', avatar: '👨‍🏫' }
    }
  },

  // ════════════════════════════════════════════════════════
  //  UNI — University / College student
  // ════════════════════════════════════════════════════════
  uni: {

    // ── BEGINNER ────────────────────────────────────────

    // b1 — What is Git?
    beginner_b1_0: {
      context: "Prof. Okafor's Software Engineering module starts today with one slide: 'All coursework submissions go through GitLab. No repo link, no marks.' Your study group of four people needs to share code without emailing zip files back and forth — apparently that's what Git is for.",
      character: { name: 'Prof. Okafor', role: 'Module Supervisor', avatar: '👩‍🏫' }
    },

    // b2 — Your First Repository
    beginner_b2_0: {
      context: "The lab sheet for week one says: 'Initialize a Git repository for your coursework folder and push it to GitLab before the end of the session.' Prof. Okafor is walking around checking. You open the terminal and realize you've never actually run git init before.",
      character: { name: 'Prof. Okafor', role: 'Module Supervisor', avatar: '👩‍🏫' }
    },

    // b3 — The Three Areas
    beginner_b3_0: {
      context: "You've written three files for your software engineering coursework. Your lab partner Dev says you should stage only the finished module and leave the broken parser for later. The staging area is what makes that possible — it's Git's draft tray between your edits and your committed history.",
      character: { name: 'Prof. Okafor', role: 'Module Supervisor', avatar: '👩‍🏫' }
    },

    // b4 — Your First Commit
    beginner_b4_0: {
      context: "Your unit tests are passing for the first time all week. Dev says: 'Commit it NOW before you touch anything else — future you will thank present you.' A commit is a permanent checkpoint; if the next refactor goes wrong, you can always roll back to this green state.",
      character: { name: 'Dev', role: 'Lab Partner', avatar: '🧑‍💻' }
    },

    // b5 — Branches
    beginner_b5_0: {
      context: "Your group assignment has four modules to build and four group members. Prof. Okafor said each person should own a feature branch so parallel work doesn't break the integration build. You've never created a branch before and the group's first stand-up is in ten minutes.",
      character: { name: 'Prof. Okafor', role: 'Module Supervisor', avatar: '👩‍🏫' }
    },

    // b6 — Merging
    beginner_b6_0: {
      context: "You and Dev both finished your respective modules on separate branches. The group deadline is tomorrow and you need to combine both into main so the integration tests can run. Merging two branches sounds scary but Git handles most of it automatically.",
      character: { name: 'Dev', role: 'Lab Partner', avatar: '🧑‍💻' }
    },

    // b7 — Remotes & GitHub
    beginner_b7_0: {
      context: "Your coursework repo only exists on your university laptop. If the hard drive fails before submission — which happens — you lose everything. More urgently, your group members can't pull your latest code from home. Pushing to GitLab fixes both problems at once.",
      character: { name: 'Dev', role: 'Lab Partner', avatar: '🧑‍💻' }
    },

    // b8 — .gitignore
    beginner_b8_0: {
      context: "You push your coursework and immediately get a message from Prof. Okafor: 'Why is your node_modules folder in the repo? That's 30,000 files and 200MB.' Your .env file with the database password is also in there. You need .gitignore — now.",
      character: { name: 'Prof. Okafor', role: 'Module Supervisor', avatar: '👩‍🏫' }
    },

    // b9 — VS Code
    beginner_b9_0: {
      context: "You've been using the terminal for Git but the lab machines all have VS Code with the Source Control panel. Dev showed you that you can stage individual lines — not just files — right inside the editor. That level of precision is going to change how you write commits.",
      character: { name: 'Dev', role: 'Lab Partner', avatar: '🧑‍💻' }
    },

    // b10 — Beginner Challenge
    beginner_b10_0: {
      context: "Week 5 lab assessment: Prof. Okafor wants a complete Git workflow demonstrated — init, branch, commit, merge, push — and the commit history will be marked. Messy history with 'wip' and 'fix' messages costs marks. Show her you understand the full cycle.",
      character: { name: 'Prof. Okafor', role: 'Module Supervisor', avatar: '👩‍🏫' }
    },

    // ── INTERMEDIATE ────────────────────────────────────

    // i1 — Branching Strategies
    intermediate_i1_0: {
      context: "Your dissertation group has eight contributors. Prof. Okafor sent a stern email after someone pushed directly to main and broke the build: 'You need a defined branching strategy in your CONTRIBUTING.md by Friday.' GitHub Flow or GitFlow — you need to pick one and document it.",
      character: { name: 'Prof. Okafor', role: 'Module Supervisor', avatar: '👩‍🏫' }
    },

    // i2 — Merge Conflicts
    intermediate_i2_0: {
      context: "You and Dev both edited the database schema file last night for different features. When you try to merge this morning, Git stops with conflict markers everywhere. This is the merge conflict your lecturer warned about in week two. Staying calm and reading the markers carefully is the only way through.",
      character: { name: 'Dev', role: 'Lab Partner', avatar: '🧑‍💻' }
    },

    // i3 — Rebase vs Merge
    intermediate_i3_0: {
      context: "Your feature branch diverged from main four days ago. The module's coding standards require a clean linear history in merge requests, not a tangle of merge commits. Prof. Okafor specifically mentioned rebase in the MR guidelines. But Dev warned you not to rebase anything already pushed.",
      character: { name: 'Prof. Okafor', role: 'Module Supervisor', avatar: '👩‍🏫' }
    },

    // i4 — Stashing
    intermediate_i4_0: {
      context: "You're in the middle of refactoring the authentication module for your dissertation when Dev messages: 'The demo server is down and our supervisor meeting is in 30 minutes — can you hotfix the broken endpoint?' You can't commit half-refactored code. You need to stash your work and come back to it later.",
      character: { name: 'Dev', role: 'Lab Partner', avatar: '🧑‍💻' }
    },

    // i5 — Pull Requests
    intermediate_i5_0: {
      context: "Prof. Okafor's module requires a code review trail: every feature must come in via a Merge Request on GitLab with at least one approval before it touches main. Your authentication module is ready. You need to open your first proper MR with a clear description, not just 'done'.",
      character: { name: 'Prof. Okafor', role: 'Module Supervisor', avatar: '👩‍🏫' }
    },

    // i6 — Undoing Mistakes
    intermediate_i6_0: {
      context: "You accidentally committed your database credentials to the GitLab repo. It's a private repo, but your entire study group can see it. Prof. Okafor's module policy is clear about not storing secrets in version control — and the commit is already pushed. You need the right undo tool, not just any undo tool.",
      character: { name: 'Dev', role: 'Lab Partner', avatar: '🧑‍💻' }
    },

    // i7 — Cherry-Pick
    intermediate_i7_0: {
      context: "On your experimental branch you fixed a critical null-pointer bug that's crashing the demo server right now. But the experimental branch also has half-finished code that isn't ready for review. You need just that one bug fix on main — without merging the unfinished work. That's what cherry-pick is built for.",
      character: { name: 'Dev', role: 'Lab Partner', avatar: '🧑‍💻' }
    },

    // i8 — Tags
    intermediate_i8_0: {
      context: "Your dissertation submission requires a tagged release on GitLab so your supervisor can check out the exact version you submitted, even if you keep developing afterwards. Prof. Okafor specified semantic versioning: v1.0.0 for the first hand-in. Tags are permanent bookmarks that never move.",
      character: { name: 'Prof. Okafor', role: 'Module Supervisor', avatar: '👩‍🏫' }
    },

    // i9 — VS Code Deep Dive
    intermediate_i9_0: {
      context: "Dev has been resolving merge conflicts in 30 seconds using VS Code's three-way merge editor while you're still manually editing conflict markers in a text file. The inline blame view is also revealing who wrote every line without leaving the editor. Time to level up your tooling.",
      character: { name: 'Dev', role: 'Lab Partner', avatar: '🧑‍💻' }
    },

    // i10 — Intermediate Challenge
    intermediate_i10_0: {
      context: "The group assignment deadline is in 48 hours. Main has moved since you branched. There's a conflict in the API module. You need to rebase, resolve the conflict, open a Merge Request with a proper description, respond to your supervisor's code review comment, and merge — all before the submission portal closes.",
      character: { name: 'Prof. Okafor', role: 'Module Supervisor', avatar: '👩‍🏫' }
    },

    // ── EXPERT ──────────────────────────────────────────

    // e1 — Git Internals
    expert_e1_0: {
      context: "Prof. Okafor's advanced module set a deep-dive assignment: explain Git's object model — blobs, trees, commits — using git cat-file. Most students have used Git for two years without ever opening .git/objects. Understanding the internals makes you dramatically better at reasoning about complex operations and debugging corrupted repos.",
      character: { name: 'Prof. Okafor', role: 'Module Supervisor', avatar: '👩‍🏫' }
    },

    // e2 — Interactive Rebase
    expert_e2_0: {
      context: "Your dissertation supervisor commented on your GitLab history: 'The commit log reads like a stream of consciousness — wip, fix, fix again, FINALLY. Please clean this up before final submission.' Interactive rebase lets you squash, reorder, and reword commits so the history tells a coherent story of what you built.",
      character: { name: 'Prof. Okafor', role: 'Module Supervisor', avatar: '👩‍🏫' }
    },

    // e3 — Git Bisect
    expert_e3_0: {
      context: "Your dissertation demo worked perfectly two weeks ago. Today it's broken — the recommendation engine returns empty results. There are 60 commits between then and now, mostly from Dev. Going through them manually would take all day. git bisect runs a binary search and narrows it down to the culprit commit in about 6 steps.",
      character: { name: 'Dev', role: 'Lab Partner', avatar: '🧑‍💻' }
    },

    // e4 — Git Hooks
    expert_e4_0: {
      context: "Your team keeps accidentally committing debug print statements and failing the linting check in the CI pipeline. Every failed pipeline wastes 8 minutes. A pre-commit hook can catch lint errors locally before anything is pushed — automating the quality gate that everyone keeps forgetting to run manually.",
      character: { name: 'Dev', role: 'Lab Partner', avatar: '🧑‍💻' }
    }
  },

  // ════════════════════════════════════════════════════════
  //  LEARNER — Self-taught / hobbyist developer
  // ════════════════════════════════════════════════════════
  learner: {

    // ── BEGINNER ────────────────────────────────────────

    // b1 — What is Git?
    beginner_b1_0: {
      context: "You've been watching YouTube tutorials and building small projects for fun. Every time you try something new you overwrite working code and can't get back to it. Alex mentioned in a tutorial: 'You need Git — it's the version control system every developer uses.' Time to find out what that actually means.",
      character: { name: 'Alex', role: 'YouTube Tutorial', avatar: '📺' }
    },

    // b2 — Your First Repository
    beginner_b2_0: {
      context: "Alex's tutorial series starts with: 'Before we write a single line of code, we git init.' You've created the project folder for your portfolio site and you're ready to turn it into a proper Git repository so every change you make is tracked from the start.",
      character: { name: 'Alex', role: 'YouTube Tutorial', avatar: '📺' }
    },

    // b3 — The Three Areas
    beginner_b3_0: {
      context: "You're building your portfolio site and you have an HTML file, a CSS file, and a half-working JavaScript animation. You want to save a checkpoint of the HTML and CSS but leave the JS out because it's still broken. Alex's tutorial explains this is exactly what the staging area is designed for.",
      character: { name: 'Alex', role: 'YouTube Tutorial', avatar: '📺' }
    },

    // b4 — Your First Commit
    beginner_b4_0: {
      context: "Your portfolio homepage finally looks the way you imagined it. Alex always says: 'Commit early, commit often — treat each commit like a save point in a video game.' If you experiment and break something, you can always load this save. Time to make your first commit.",
      character: { name: 'Alex', role: 'YouTube Tutorial', avatar: '📺' }
    },

    // b5 — Branches
    beginner_b5_0: {
      context: "You want to experiment with a completely different layout for your portfolio without risking the version that currently looks great. Alex's video on branches calls them 'parallel universes for your code' — you can try anything on a branch and simply delete it if the experiment fails.",
      character: { name: 'Alex', role: 'YouTube Tutorial', avatar: '📺' }
    },

    // b6 — Merging
    beginner_b6_0: {
      context: "Your experimental dark-theme branch turned out great. Now you want to bring those changes back into your main portfolio. You've been working in isolation on the branch — merging is the moment the two timelines reunite and the improvement becomes permanent.",
      character: { name: 'You', role: 'Solo Developer', avatar: '🧑‍💻' }
    },

    // b7 — Remotes & GitHub
    beginner_b7_0: {
      context: "Your portfolio project only exists on your laptop. You've been dreaming about sharing it with potential employers, but there's also the terrifying thought that a laptop failure could delete months of work. Pushing to GitHub solves both: free cloud backup and a public URL you can put on your CV.",
      character: { name: 'You', role: 'Solo Developer', avatar: '🧑‍💻' }
    },

    // b8 — .gitignore
    beginner_b8_0: {
      context: "You pushed your project to GitHub and then realized your .env file — with the API key for your weather widget — is sitting there public for anyone to find. Alex warned about this in a tutorial: 'The first thing you set up on any project is .gitignore. Do it before your first commit.' Lesson learned.",
      character: { name: 'Alex', role: 'YouTube Tutorial', avatar: '📺' }
    },

    // b9 — VS Code
    beginner_b9_0: {
      context: "You spend most of your learning time in VS Code and you just discovered the Source Control panel in the sidebar. Alex's tutorial showed that you can stage files, write commit messages, and switch branches without ever opening a terminal. Let's master the tool you're already in.",
      character: { name: 'Alex', role: 'YouTube Tutorial', avatar: '📺' }
    },

    // b10 — Beginner Challenge
    beginner_b10_0: {
      context: "You've been learning Git for a few weeks and now it's time to put it all together. Start a brand new project, track it with Git, build a feature on a branch, merge it, and push to GitHub — the complete workflow, no hand-holding. Your portfolio deserves a proper repo.",
      character: { name: 'You', role: 'Solo Developer', avatar: '🧑‍💻' }
    },

    // ── INTERMEDIATE ────────────────────────────────────

    // i1 — Branching Strategies
    intermediate_i1_0: {
      context: "You started an open-source side project and someone on Reddit offered to contribute. Two people working on the same repo without any rules is chaos — you found that out fast. Alex's advanced Git series covers branching strategies: how to structure branches so contributions don't step on each other.",
      character: { name: 'Alex', role: 'YouTube Tutorial', avatar: '📺' }
    },

    // i2 — Merge Conflicts
    intermediate_i2_0: {
      context: "You broke your own project. You were working on two different features across two branches and when you merged them together Git threw conflict markers all over your main component file. It looks terrifying, but Alex says conflicts are just Git asking you to make a decision — not a disaster.",
      character: { name: 'You', role: 'Solo Developer', avatar: '🧑‍💻' }
    },

    // i3 — Rebase vs Merge
    intermediate_i3_0: {
      context: "Your feature branch is three weeks old and has fallen behind main. You've seen two different YouTube videos — one swears by merge, one swears by rebase — and now you're confused about which to use. The answer depends on whether the branch is private or shared, and what kind of history you want.",
      character: { name: 'Alex', role: 'YouTube Tutorial', avatar: '📺' }
    },

    // i4 — Stashing
    intermediate_i4_0: {
      context: "You're halfway through redesigning the home page of your personal project when you notice a critical bug on the live site you deployed last week. You can't commit the half-finished redesign, but you also can't just throw it away. git stash is like a clipboard for your work-in-progress — save it, fix the bug, restore it.",
      character: { name: 'You', role: 'Solo Developer', avatar: '🧑‍💻' }
    },

    // i5 — Pull Requests
    intermediate_i5_0: {
      context: "You want to contribute to an open-source project you've been using. Their CONTRIBUTING.md says: 'Fork the repo, make your changes on a branch, and open a Pull Request.' You've never opened a PR before. Alex has a whole video on PR etiquette — turns out the description matters as much as the code.",
      character: { name: 'Alex', role: 'YouTube Tutorial', avatar: '📺' }
    },

    // i6 — Undoing Mistakes
    intermediate_i6_0: {
      context: "You accidentally committed and pushed your API keys to your public GitHub portfolio repo. You deleted the file immediately but the commit is still there in history, visible to anyone. Alex's emergency tutorial covers exactly this situation: git revert is safer than git reset for commits that are already on the remote.",
      character: { name: 'You', role: 'Solo Developer', avatar: '🧑‍💻' }
    },

    // i7 — Cherry-Pick
    intermediate_i7_0: {
      context: "On your experimental 'new-design' branch you also fixed a typo in the navigation that's embarrassingly wrong on the live site. The new design itself isn't ready, but you want just that one fix deployed today. Cherry-pick lets you take a single commit from any branch and apply it wherever you need it.",
      character: { name: 'You', role: 'Solo Developer', avatar: '🧑‍💻' }
    },

    // i8 — Tags
    intermediate_i8_0: {
      context: "You finished the first complete version of your portfolio project and want to mark it permanently so you can always come back to 'v1.0' even as you keep building. Alex's video on releases explains how tags are permanent named points in history — unlike branches, they never move.",
      character: { name: 'You', role: 'Solo Developer', avatar: '🧑‍💻' }
    },

    // i9 — VS Code Deep Dive
    intermediate_i9_0: {
      context: "You've been using VS Code for months but you just discovered the gutter indicators that show which lines you've changed since the last commit. Alex's video on VS Code Git features goes even further: inline blame, the Timeline view for file history, and a built-in three-way merge editor. All of it, without leaving the editor.",
      character: { name: 'Alex', role: 'YouTube Tutorial', avatar: '📺' }
    },

    // i10 — Intermediate Challenge
    intermediate_i10_0: {
      context: "Time to test yourself. Your side project has a feature branch that's behind main, a merge conflict to resolve, and a PR to open against your own repo. Walk through the full intermediate workflow — rebase, resolve, PR, review, merge — as if you were contributing to a real team project.",
      character: { name: 'You', role: 'Solo Developer', avatar: '🧑‍💻' }
    },

    // ── EXPERT ──────────────────────────────────────────

    // e1 — Git Internals
    expert_e1_0: {
      context: "You've been using Git for over a year but you hit a weird situation — a corrupted object — and had no idea what was happening inside .git. Alex's deep-dive series on Git internals starts with the object model: blobs, trees, commits, and tags. Once you understand how Git stores data, nothing about it feels magical or mysterious again.",
      character: { name: 'Alex', role: 'YouTube Tutorial', avatar: '📺' }
    },

    // e2 — Interactive Rebase
    expert_e2_0: {
      context: "You look at your project's commit history and cringe: 'fix', 'fix again', 'why is this broken', 'ok now it works', 'lol forgot a semicolon'. Before you share this repo in a job application, you want to squash those 12 commits into 3 clean ones. Interactive rebase is the history-editing tool for exactly this.",
      character: { name: 'You', role: 'Solo Developer', avatar: '🧑‍💻' }
    },

    // e3 — Git Bisect
    expert_e3_0: {
      context: "Your personal project's dark mode was working two weeks ago. Now it's broken and you've made 50 commits since then. You have no idea which change broke it. git bisect does a binary search through those commits — you mark each midpoint as 'good' or 'bad' and Git narrows it down to the exact culprit in about 6 rounds.",
      character: { name: 'You', role: 'Solo Developer', avatar: '🧑‍💻' }
    },

    // e4 — Git Hooks
    expert_e4_0: {
      context: "You keep pushing code to GitHub and then noticing linting errors in the CI check afterwards. It takes three minutes to push, watch the check fail, fix it, and push again. A pre-commit hook runs your linter automatically before every commit — catching the mistake locally in milliseconds instead of minutes later in the pipeline.",
      character: { name: 'You', role: 'Solo Developer', avatar: '🧑‍💻' }
    }
  },

  // ════════════════════════════════════════════════════════
  //  WORKING — uses data.js defaults for all story steps
  // ════════════════════════════════════════════════════════
  working: {}

};
