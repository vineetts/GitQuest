// ═══════════════════════════════════════════════
//  GitQuest — Jungle Storyline  (life-stage aware)
//
//  Structure: JUNGLE_STORY[persona][lifeStage]
//  Each life stage travels through THE SAME Code
//  Jungle, but with their own guide, scenarios,
//  and narrative beats that match their real world.
//
//  Life stages: school | uni | working | learner
//  Personas:    beginner | intermediate | expert | innovator
// ═══════════════════════════════════════════════

window.JUNGLE_STORY = {

  // ══════════════════════════════════════════════
  //  BEGINNER — The Jungle's Edge
  //  Zone is shared; companion + story varies
  //  by life stage.
  // ══════════════════════════════════════════════
  beginner: {
    zone:       "The Jungle's Edge",
    zoneEmoji:  '🌅',
    atmosphere: 'Dawn light through the canopy. Every step crunches with possibility.',

    // ── School ──────────────────────────────────
    school: {
      companion: { name: 'Mr. Chen', role: 'CS Teacher · Expedition Lead', avatar: '👨‍🏫', color: '#3fb950' },
      chapters: [
        {
          levels:    ['b1', 'b2', 'b3'],
          title:     'Chapter 1: The Group Project Crisis',
          scene:     '🏫',
          location:  'The Classroom Clearing',
          narrative: "Mr. Chen posted the brief on the board: group project, three people, one codebase, submission in four weeks. Last term Jamie accidentally emailed 'the final version' and you ended up with four files called project_FINAL_v2_real.html. \"This time,\" Mr. Chen says, \"we do it properly. Welcome to the Code Jungle.\"",
          unlockMsg: "The classroom chaos is behind you. The real jungle trail begins."
        },
        {
          levels:    ['b4', 'b5', 'b6'],
          title:     'Chapter 2: Parallel Paths',
          scene:     '🌿',
          location:  'The Forking Trails',
          narrative: "Jamie wants to add the animation. You want to add dark mode. Both due by Friday. \"This is the classic group project problem,\" Mr. Chen says, drawing forked lines on the whiteboard. \"You need to work in parallel without destroying each other's code. That's what branches are for.\"",
          unlockMsg: "You and Jamie worked in parallel and neither broke the other. That's the whole point."
        },
        {
          levels:    ['b7', 'b8'],
          title:     'Chapter 3: The Exhibition',
          scene:     '🏆',
          location:  'The School GitHub Stage',
          narrative: "Exhibition day. The code is on your school laptop and nowhere else. Jamie's at home. The judges need a link. Mr. Chen gestures at the GitHub page on the projector: \"Your code should live HERE — not on one laptop. Push it, ignore the junk files, and let the world see what you built.\"",
          unlockMsg: "🏆 Your project is on GitHub. Mr. Chen gives a rare nod of approval. Explorer complete."
        }
      ],
      levels: {
        b1: {
          scene: '🏫', location: 'The Classroom Clearing',
          before:  "Mr. Chen draws a diagram on the board: five different versions of the same Word document, all called 'FINAL'. \"This,\" he says, tapping the board, \"is what happens when a team doesn't use version control. Last year's group submitted the wrong file and lost 20 marks. The Code Jungle rewards those who keep records.\"",
          mission: '"Before you write one line of code this term, you need to understand what Git is and why every developer on the planet uses it."',
          after:   '"You now understand the WHY. That\'s the lesson most students skip. Don\'t be most students." — Mr. Chen 👨‍🏫'
        },
        b2: {
          scene: '🏕️', location: 'Your Project Folder',
          before:  "The assignment sheet is on the desk: build a personal webpage, track every change with Git. Mr. Chen walks past your screen. \"No repo yet?\" he says. \"In the jungle, you pitch your tent before you start exploring. Run `git init` — that's your base camp.\"",
          mission: '"Initialize the repository first. Every project starts here, no exceptions."',
          after:   '"Base camp pitched. Your project has a home that will never forget a single change." — Mr. Chen 👨‍🏫'
        },
        b3: {
          scene: '🌿', location: 'The Staging Area',
          before:  "You have three files: the HTML (finished), the CSS (finished), and a JavaScript animation that still crashes. Mr. Chen says to commit the finished work and leave the broken JS out. \"The staging area is Git's draft tray,\" he explains. \"You decide exactly what goes into each commit. The jungle doesn't care what you've written — only what you record.\"",
          mission: '"Stage the files you\'re happy with. Leave the broken code out. Commit only what\'s ready."',
          after:   '"Selective commits. That\'s discipline. The jungle rewards disciplined explorers." — Mr. Chen 👨‍🏫'
        },
        b4: {
          scene: '📍', location: 'The Save Point',
          before:  "Your science-fair project finally works — all tests passing, no console errors. Jamie leans over: \"Commit it right NOW before you touch anything else.\" It's the developer equivalent of saving your game before a boss fight. If tomorrow's changes break everything, this commit is your checkpoint.",
          mission: '"Write a commit message that actually means something. Not \"stuff\" — tell future-you exactly what this save point contains."',
          after:   '"Future you just sent a thank-you note from next Friday. Good commit message." — Mr. Chen 👨‍🏫'
        },
        b5: {
          scene: '🔀', location: 'The Forking Trails',
          before:  "Jamie wants to add a CSS animation. You want a dark-mode toggle. Deadline is tomorrow and neither feature is done. \"If you both edit main.js at the same time,\" Mr. Chen warns, \"you will destroy each other's work. Branches are how you work in parallel — your trail and Jamie's trail, side by side, without collision.\"",
          mission: '"Create your own branch and explore it safely. Jamie\'s trail is over there — yours is here."',
          after:   '"You walked your own trail without touching Jamie\'s. The jungle calls that professional." — Mr. Chen 👨‍🏫'
        },
        b6: {
          scene: '🌊', location: 'The River Confluence',
          before:  "Dark mode: done. Jamie's animation: done. Both branches tested. \"Now we merge,\" Mr. Chen says. \"Two trails, one project. Everything you built on your branch becomes part of the main codebase. The jungle reunites both paths at the river.\"",
          mission: '"Merge your dark-mode branch into main. Two separate trails — one finished project."',
          after:   '"Two trails, one project, zero lost work. That\'s the whole point of branching and merging." — Mr. Chen 👨‍🏫'
        },
        b7: {
          scene: '📋', location: 'The School GitHub Board',
          before:  "Exhibition day is next week. The code only exists on your school laptop. Jamie can't access it from home. If the laptop gets wiped, the project is gone. Mr. Chen points at the GitHub link on the projector: \"This is the Village Notice Board. Every group's code lives here. Push yours — before the laptop incident I won't mention again.\"",
          mission: '"Push your repository to GitHub. Your code needs to live somewhere everyone can reach it."',
          after:   '"It\'s on the board. Jamie can pull from home, the judges have a link, and the laptop can\'t hurt you now." — Mr. Chen 👨‍🏫'
        },
        b8: {
          scene: '🚫', location: 'The Forbidden Files',
          before:  "You pushed to GitHub and immediately got a message from Mr. Chen: \"Why is your node_modules folder in the repo? That's 30,000 files. And is that your API key in .env?\". The jungle has rules about what goes on the shared map — and secrets are never posted. Time to set up .gitignore before anything else gets out.",
          mission: '"Tell Git exactly what to ignore. The jungle doesn\'t need your node_modules, .DS_Store, or your secrets."',
          after:   '"No secrets on the map. No junk in the repo. Now that\'s a clean jungle trail." — Mr. Chen 👨‍🏫'
        }
      }
    },

    // ── University ────────────────────────────────
    uni: {
      companion: { name: 'Prof. Okafor', role: 'Module Supervisor · Expedition Chief', avatar: '👩‍🏫', color: '#3fb950' },
      chapters: [
        {
          levels:    ['b1', 'b2', 'b3'],
          title:     'Chapter 1: Week One Lab',
          scene:     '🎓',
          location:  'The Module Lab',
          narrative: "Prof. Okafor opened the semester with one slide: 'All coursework goes through GitLab. No repo link — no marks.' Your group of four needs to share code, track history, and submit a clean repository. The Code Jungle starts with the foundations — and the foundations start today.",
          unlockMsg: "Week one lab: complete. The module's jungle trail is now open."
        },
        {
          levels:    ['b4', 'b5', 'b6'],
          title:     'Chapter 2: Group Assignment Territory',
          scene:     '🌿',
          location:  'The Group Project Jungle',
          narrative: "Four group members, four modules to build, one shared codebase. Dev is working on the backend, you're on the frontend, and nobody wants to break the integration build. \"Each person owns a feature branch,\" Prof. Okafor said in the stand-up. \"No more pushing directly to main.\"",
          unlockMsg: "Four trails, one codebase, no collisions. The group project jungle is navigable."
        },
        {
          levels:    ['b7', 'b8'],
          title:     'Chapter 3: Submission Week',
          scene:     '📤',
          location:  'The GitLab Submission Portal',
          narrative: "Submission deadline is in 48 hours. The repo needs to be on GitLab, the history needs to be clean, and the .env file with the database password absolutely cannot be public. Prof. Okafor is checking every submission personally.",
          unlockMsg: "🏆 Repository submitted. Prof. Okafor approves. Explorer path complete."
        }
      ],
      levels: {
        b1: {
          scene: '🎓', location: 'The Module Lab',
          before:  "Prof. Okafor's Software Engineering module opens with a single rule: 'All submissions via GitLab — no exceptions, no extensions for repo problems.' Four people sharing code without Git means zip file chaos. Dev has done this before: \"Git is the tool that makes group projects survivable.\"",
          mission: '"Before we write code, we understand the tool. Prof. Okafor tests this in week two. Don\'t be the one who didn\'t prepare."',
          after:   '"Understanding Git conceptually is half the mark. You\'ve cleared week one." — Prof. Okafor 👩‍🏫'
        },
        b2: {
          scene: '🏕️', location: 'The Project Repository',
          before:  "Lab sheet, week one: 'Initialize a Git repository for your coursework folder and push to GitLab before end of session.' Prof. Okafor is walking the room checking. Dev already has theirs running. You open the terminal — you've never run `git init` before, but the jungle begins with this command.",
          mission: '"Run `git init` and create your repository. Everything this module builds starts here."',
          after:   '"Repository initialized, linked to GitLab, and pushed. Week one: done." — Prof. Okafor 👩‍🏫'
        },
        b3: {
          scene: '🌿', location: 'The Staging Area',
          before:  "Three files: the auth module (working), the UI component (working), and a parser that crashes on startup. Dev says: \"Stage the finished ones, leave the parser. The staging area is Git's draft tray — you choose precisely what goes into each commit. Prof. Okafor checks commit quality, not just commit count.\"",
          mission: '"Stage only the finished modules. The broken parser stays out. Commit clean work only."',
          after:   '"Selective staging is a skill. Most first-years add everything with -A. You didn\'t." — Dev 🧑‍💻'
        },
        b4: {
          scene: '📍', location: 'The Green Build',
          before:  "Unit tests: all passing. First time all week. Dev pings you: \"Commit it NOW before you touch anything else — future you will be grateful.\" A commit is a permanent checkpoint. If the next refactor breaks everything, you roll back to this green state. In the module jungle, green builds are gold.",
          mission: '"Write a meaningful commit message. The marker reads your history. \"wip\" costs marks."',
          after:   '"Green build, committed, good message. That\'s the discipline Prof. Okafor rewards." — Dev 🧑‍💻'
        },
        b5: {
          scene: '🔀', location: 'The Feature Branch Forest',
          before:  "Four group members, four modules. Prof. Okafor's instruction: \"Each person owns a feature branch. No direct pushes to main.\" You've never created a branch before and the first stand-up is in ten minutes. Dev pulls you aside: \"It's one command. Then you're on your own trail. Nobody touches yours; you don't touch theirs.\"",
          mission: '"Create your feature branch. Your trail diverges from main right here."',
          after:   '"Your branch, your trail, your commits. The group project jungle has rules now." — Dev 🧑‍💻'
        },
        b6: {
          scene: '🌊', location: 'The Integration River',
          before:  "Your frontend module and Dev's backend are both done and tested. Integration deadline: tomorrow. \"Merging is just Git combining two lines of work,\" Dev says. \"It handles most of it automatically. Where it can't decide, it asks you. Read the conflict markers carefully and it's fine.\"",
          mission: '"Merge your feature branch into main. The integration tests need both modules together."',
          after:   '"Frontend + backend, merged clean. The integration build is green. That\'s teamwork." — Dev 🧑‍💻'
        },
        b7: {
          scene: '📤', location: 'The GitLab Portal',
          before:  "Your repo is on your university laptop. Dev messages: \"I can't clone your work from home — it's not on GitLab.\" Then Prof. Okafor messages: \"Reminder: all group members need push access and the repo must be pushed before Thursday.\" The code needs to live in the cloud — not on one person's machine.",
          mission: '"Push to GitLab. The whole group needs access, and so does the automated marker."',
          after:   '"On GitLab, group access confirmed, automated tests running. Prof. Okafor approved." — Dev 🧑‍💻'
        },
        b8: {
          scene: '🚫', location: 'The Secrets Hazard Zone',
          before:  "You push and immediately get Prof. Okafor's email: 'Your node_modules is in the repo (200MB) and I can see a database password in .env.' Academic integrity violation if secrets leak publicly. The jungle has strict rules about what goes on the shared map. .gitignore is not optional.",
          mission: '"Set up .gitignore immediately. The database password, node_modules, and .DS_Store never go on GitLab."',
          after:   '"Secrets out of the repo, junk files excluded. Prof. Okafor removed the flag on your submission." — Prof. Okafor 👩‍🏫'
        }
      }
    },

    // ── Working Professional ──────────────────────
    working: {
      companion: { name: 'Priya', role: 'Senior Dev · Your Jungle Guide', avatar: '👩‍💻', color: '#3fb950' },
      chapters: [
        {
          levels:    ['b1', 'b2', 'b3'],
          title:     'Chapter 1: Day One at TechStart',
          scene:     '🌅',
          location:  'The TechStart Codebase Jungle',
          narrative: "You just landed your first dev job at TechStart Inc. Priya hands you a laptop: \"All code lives in Git. Don't break main.\" You nod confidently. The Code Jungle stretches out ahead — new, unfamiliar, and full of runes left by developers who came before you.",
          unlockMsg: "Day one foundations locked in. Priya trusts you with the keyboard now."
        },
        {
          levels:    ['b4', 'b5', 'b6'],
          title:     'Chapter 2: The First Feature',
          scene:     '🌿',
          location:  'The Feature Branch Territory',
          narrative: "\"Your first solo task,\" Priya says, sliding a Jira ticket across. \"Branch off main, build it, commit clean messages, merge it back.\" The team is watching whether you branch properly or push directly to main like the intern who shall not be named.",
          unlockMsg: "Feature shipped on a branch, merged clean. The team noticed — in a good way."
        },
        {
          levels:    ['b7', 'b8'],
          title:     'Chapter 3: The Team Codebase',
          scene:     '🏕️',
          location:  'The GitHub Village',
          narrative: "The team's work all lives on GitHub. Pull requests, code reviews, push access. Priya explains the rules: \"You push to your branch. You open a PR. Someone reviews. Then it merges. And you NEVER commit node_modules or .env files — ever.\"",
          unlockMsg: "🏆 You're a proper team contributor now. Priya stops checking your commits. Explorer complete."
        }
      ],
      levels: {
        b1: {
          scene: '🌅', location: 'The TechStart Codebase Jungle',
          before:  "First day. Priya hands you the laptop, already loaded with the codebase. \"Every change anyone has ever made to this product is in this repo,\" she says. \"Three years of commits. Git is why we can trace any bug back to the exact day it was introduced.\" The jungle is old. You're new. Time to learn its language.",
          mission: '"Before you touch a single file, understand what Git is and why every developer on earth uses it."',
          after:   '"Good. You understand the WHY. Most people skip that and wonder why they keep making mistakes." — Priya 👩‍💻'
        },
        b2: {
          scene: '🏕️', location: 'Your Local Dev Environment',
          before:  "\"Initialize a repo for your playground project,\" Priya says. \"Every professional codebase you'll ever work on started with `git init`. You'll do it dozens of times. Do it properly once and it becomes second nature.\"",
          mission: '"Run `git init` on your project folder. Every journey starts with base camp."',
          after:   '"Base camp set up. Now it remembers every change you make — forever." — Priya 👩‍💻'
        },
        b3: {
          scene: '🌿', location: 'The Staging Desk',
          before:  "You've edited three files: the fixed bug (done), a new UI component (done), and a refactor that's half broken. Priya explains the staging area: \"Don't commit everything at once. Stage what's done. Leave what's broken. Each commit should be one logical piece of work — not everything you touched today.\"",
          mission: '"Stage only the finished work. The broken refactor stays out of this commit."',
          after:   '"Atomic commits. One logical change per commit. The team can read your history now." — Priya 👩‍💻'
        },
        b4: {
          scene: '📍', location: 'The Commit Wall',
          before:  "Your feature is working. Priya says: \"Don't touch anything else. Commit it now with a proper message. Your commit message is a letter to the next developer — it might be you in six months with no memory of writing this.\"",
          mission: '"Write a commit message that explains WHY, not just what. Future engineers read these."',
          after:   '"The team can read that commit and know exactly what you changed and why. That\'s professional." — Priya 👩‍💻'
        },
        b5: {
          scene: '🔀', location: 'The Feature Branch Fork',
          before:  "Priya pulls up the Git history on the projector. \"See this mess? That's what happens when a developer pushes experimental work directly to main.\" She points to a red annotation: 'broke production for 2hrs'. \"Branches protect everyone. Your work, your trail — main stays clean.\"",
          mission: '"Branch off main. Build your feature there. Main stays untouched until the PR is approved."',
          after:   '"Your experiment is isolated. Main is safe. The team thanks you." — Priya 👩‍💻'
        },
        b6: {
          scene: '🌊', location: 'The Merge Point',
          before:  "Feature done, reviewed, approved. \"Now we merge,\" Priya says. \"This is the moment your work joins the team's shared history. Git merges the two trails automatically where possible. Where it can't, it asks you. Read the conflict markers carefully — they're not scary, just instructions.\"",
          mission: '"Merge your feature branch into main. Your work is part of the product now."',
          after:   '"Merged, deployed, and no one had to stay late fixing it. Good feature work." — Priya 👩‍💻'
        },
        b7: {
          scene: '📋', location: 'The GitHub Village Board',
          before:  "\"You've been working locally,\" Priya says. \"But the team can't see your commits. GitHub is the Village Board — everyone's work goes there. You push your branch, open a PR, the team reviews, then it merges to main. That's the full loop.\"",
          mission: '"Push your branch to GitHub. Open your first Pull Request. The team is reviewing."',
          after:   '"On GitHub, PR open, review requested. You\'re in the team\'s workflow now." — Priya 👩‍💻'
        },
        b8: {
          scene: '🚫', location: 'The .gitignore Wall',
          before:  "Priya sends a Slack message: \"Your PR has node_modules in it (400MB) and I can see a database connection string in .env. That gets rejected immediately.\" It's not personal — every new developer does it once. But only once. .gitignore is the first file you create on every project from now on.",
          mission: '"Set up .gitignore before any more commits. node_modules, .env, and OS junk never touch the repo."',
          after:   '"Clean repo, no secrets, no 400MB uploads. PR approved." — Priya 👩‍💻'
        }
      }
    },

    // ── Self-taught / Learner ────────────────────
    learner: {
      companion: { name: 'Alex', role: 'Online Mentor · Tutorial Guide', avatar: '📺', color: '#3fb950' },
      chapters: [
        {
          levels:    ['b1', 'b2', 'b3'],
          title:     'Chapter 1: The Lost Code Problem',
          scene:     '🌱',
          location:  'Your Personal Project Jungle',
          narrative: "You keep losing code. Overwrote a working version while experimenting. Deleted something you needed. Ended up with three files called portfolio_final_REAL.html. Alex's tutorial thumbnail read: 'Stop losing code forever — learn Git in 20 minutes.' You clicked. The Code Jungle begins.",
          unlockMsg: "You'll never lose code to an accidental overwrite again. The jungle remembers everything now."
        },
        {
          levels:    ['b4', 'b5', 'b6'],
          title:     'Chapter 2: Fearless Experiments',
          scene:     '🌿',
          location:  'The Experiment Trails',
          narrative: "Alex's tutorial: \"The reason most beginners are scared to experiment is they have no safety net. Git IS the safety net. Branch before you try anything risky. If it works — merge it. If it doesn't — delete the branch. Nothing is ever lost.\"",
          unlockMsg: "You tried something risky, it worked, you merged it. That's fearless development."
        },
        {
          levels:    ['b7', 'b8'],
          title:     'Chapter 3: Your Public Portfolio',
          scene:     '🌐',
          location:  'GitHub Portfolio Stage',
          narrative: "\"GitHub is your portfolio,\" Alex says in the final tutorial. \"Every project you push there tells employers what you can build. Clean repos with good commit history look professional. Cluttered repos with .env files and node_modules tell a different story.\"",
          unlockMsg: "🏆 Your portfolio is on GitHub. Clean, committed, professional. Explorer complete."
        }
      ],
      levels: {
        b1: {
          scene: '🌱', location: 'Your Personal Project Folder',
          before:  "You've been overwriting working code every time you try something new. Alex's tutorial starts with a story: \"I deleted my entire project trying to refactor it. Lost three weeks of work. That's the day I learned Git.\" The Code Jungle has a law: nothing is ever truly lost if you know the right commands.",
          mission: '"Understand what Git is and why it exists before touching a single command. The WHY comes first."',
          after:   '"You\'ll never lose a working version to an accident again. That alone is worth the next 20 minutes." — Alex 📺'
        },
        b2: {
          scene: '🏕️', location: 'Your Project Folder',
          before:  "Alex's series starts with: \"Before you write one line of code — on any project, ever — you run `git init`. This turns your folder into a jungle base camp that tracks everything.\" You've got your portfolio project folder open. Let's claim this clearing.",
          mission: '"Run `git init`. This is the first command on every project you\'ll ever build."',
          after:   '"Base camp established. Your project has a permanent memory now." — Alex 📺'
        },
        b3: {
          scene: '🌿', location: 'The Staging Area',
          before:  "You've got three files: the HTML (good), the CSS (good), and a JavaScript animation that crashes. Alex explains: \"The staging area is Git's draft tray. You don't have to commit everything at once. Save what works, leave what doesn't. That's how clean commits happen.\"",
          mission: '"Stage only the files you\'re happy with. Leave the broken animation for later."',
          after:   '"Selective commits. That\'s how professionals do it — not just `git add .` on everything." — Alex 📺'
        },
        b4: {
          scene: '📍', location: 'The Save Point',
          before:  "Your portfolio homepage finally looks the way you imagined it. Alex always says: \"Commit early, commit often — treat each commit like a save point in a video game. If you break something tomorrow, you load this save.\" The jungle's memory is only as useful as what you put into it.",
          mission: '"Commit your working homepage with a message that describes what you built, not just \"update\"."',
          after:   '"Save point locked in. Future you can load this any time." — Alex 📺'
        },
        b5: {
          scene: '🔀', location: 'The Experiment Branch',
          before:  "You want to try a completely different layout for your portfolio — but you don't want to risk the version that already looks great. Alex's video calls branches \"parallel universes for your code.\" Try anything. If it fails, the original universe is still intact. If it works — merge it in.",
          mission: '"Create a branch for your layout experiment. Your current design is safe on main."',
          after:   '"You can try ANYTHING on a branch. Nothing is ever at risk. That\'s the power." — Alex 📺'
        },
        b6: {
          scene: '🌊', location: 'The Merge River',
          before:  "The experimental layout turned out better than the original. Time to make it permanent. Alex explains: \"Merging brings the two timelines back together. The experiment becomes the main reality. Your old safe version is still in history — you can always go back.\"",
          mission: '"Merge your experiment branch into main. The improvement becomes permanent."',
          after:   '"Experiment succeeded, merged in, nothing lost. That\'s how pros iterate." — Alex 📺'
        },
        b7: {
          scene: '🌐', location: 'Your GitHub Portfolio',
          before:  "Your project only exists on your laptop. Alex: \"GitHub is your public portfolio. Push your projects there — you get free cloud backup AND a URL you can put on your CV. Future employers will Google you and find your GitHub before your LinkedIn.\"",
          mission: '"Push your portfolio to GitHub. Your work deserves to be seen."',
          after:   '"It\'s live. Anyone can see it. Put the URL on your CV today." — Alex 📺'
        },
        b8: {
          scene: '🚫', location: 'The Forbidden Files Zone',
          before:  "You pushed to GitHub and realized your .env file — with the API key for your weather widget — is sitting there public. Alex warned about this in the setup video: \"The absolute first thing on any project is .gitignore. Before your first commit, before anything. An exposed API key is a real security issue.\"",
          mission: '"Set up .gitignore now. API keys, node_modules, and OS junk never touch GitHub."',
          after:   '"Secrets off GitHub, junk excluded. Your repo looks professional now." — Alex 📺'
        }
      }
    }
  }, // end beginner

  // ══════════════════════════════════════════════
  //  INTERMEDIATE — The Deep Jungle
  // ══════════════════════════════════════════════
  intermediate: {
    zone:       'The Deep Jungle',
    zoneEmoji:  '🌿',
    atmosphere: 'Dense canopy. Strange sounds. Ancient ruins through the vines.',

    school: {
      companion: { name: 'Mr. Chen', role: 'CS Teacher · Deep Jungle Guide', avatar: '👨‍🏫', color: '#58a6ff' },
      chapters: [
        {
          levels:    ['i1', 'i2', 'i3'],
          title:     'Chapter 1: Hackathon Chaos',
          scene:     '⚔️',
          location:  'The Hackathon Jungle',
          narrative: "School hackathon weekend. Six people, one repo, no rules. \"Someone pushed broken code directly to main and it wiped Jamie's work,\" Mr. Chen says, arms crossed. \"Before tomorrow morning, we need a strategy. The deep jungle doesn't forgive disorganised teams.\"",
          unlockMsg: "Team strategy established. The hackathon jungle is navigable now."
        },
        {
          levels:    ['i4', 'i5'],
          title:     'Chapter 2: Deadlines and Decisions',
          scene:     '⏱️',
          location:  'The Deadline Trail',
          narrative: "Presentation in 20 minutes and the submit button is broken. \"Git has time controls,\" Mr. Chen says. \"Stash your unfinished work, fix the emergency, come back for it. And when it's all done — tag the final version so the judges can find it.\"",
          unlockMsg: "Emergency handled. Version tagged. Presentation survived."
        },
        {
          levels:    ['i6'],
          title:     'Chapter 3: The Code Review',
          scene:     '🔍',
          location:  'The Review Chamber',
          narrative: "New rule from Mr. Chen: \"Nobody merges their own code. Pull Requests only, with at least one peer review. Your dark-mode feature is ready — now convince Jamie to approve it.\"",
          unlockMsg: "PR approved. Your code survived the review. Adventurer complete."
        }
      ],
      levels: {
        i1: {
          scene: '⚔️', location: 'The Hackathon Clearing',
          before:  "Six people pushed to main all weekend. The build is broken. Mr. Chen walks in and looks at the commit history. \"This is why teams have branching strategies,\" he says quietly. \"GitHub Flow, GitFlow, trunk-based — each is a set of rules for who touches what and when. Without rules, the deep jungle eats you.\"",
          mission: '"Agree on a branching strategy for the group. Document it in CONTRIBUTING.md before anyone writes more code."',
          after:   '"Branching rules established. The team just became a team." — Mr. Chen 👨‍🏫'
        },
        i2: {
          scene: '⚔️', location: 'The Conflict Clearing',
          before:  "You and Jamie both edited the same line in index.html last night — different changes. Git is showing conflict markers and refusing to merge. \"This is a merge conflict,\" Mr. Chen says. \"Stay calm. Read both versions. Decide what the code should actually be. Then commit the resolution.\"",
          mission: '"Read both conflicting versions. Decide what the correct code is. Resolve it and commit."',
          after:   '"Conflict resolved by choosing the right answer, not just accepting theirs. That\'s the skill." — Mr. Chen 👨‍🏫'
        },
        i3: {
          scene: '🔁', location: 'The Rebase Trail',
          before:  "Your branch diverged from main three days ago. Jamie's latest commits are on main but not on your branch. Mr. Chen: \"Before you show me your PR, your branch needs to look like it was built on TOP of the latest main. Rebase replays your commits on the updated baseline. It looks cleaner than a merge commit tangle.\"",
          mission: '"Rebase your branch onto the latest main. Replay your commits on the freshest foundation."',
          after:   '"Clean linear history. That\'s what the PR should look like." — Mr. Chen 👨‍🏫'
        },
        i4: {
          scene: '🎒', location: 'The Emergency Cache',
          before:  "You're halfway through the search bar feature. Jamie messages: \"The submit button is broken — presenting in 20 minutes!\" You can't commit half-finished code. You can't lose it either. Mr. Chen appears: \"Stash it. Stash your work in the hollow tree, fix the emergency, come back and unstash. The jungle remembers.\"",
          mission: '"Stash your in-progress work, switch branches to fix the emergency, then pop your stash."',
          after:   '"Emergency fixed, stash restored, search bar continues. The deep jungle tests your composure." — Mr. Chen 👨‍🏫'
        },
        i5: {
          scene: '🔍', location: 'The Review Board',
          before:  "New rule: nobody merges their own code. \"Open a Pull Request,\" Mr. Chen says. \"Write a description that explains what you changed and why. Invite Jamie to review. Respond to every comment. Only then does it merge.\" Your dark-mode feature is ready. Time to face the review.",
          mission: '"Open a Pull Request for your dark-mode feature. Write a clear description. Request Jamie\'s review."',
          after:   '"PR merged after a proper review. That\'s how professional code gets shipped." — Mr. Chen 👨‍🏫'
        },
        i6: {
          scene: '⏮️', location: 'The Undo Trail',
          before:  "You committed passwords.txt and pushed it to the school GitHub. Heart drops. \"Everyone makes this mistake once,\" Mr. Chen says. \"But the right undo tool matters — git reset? git revert? git rm? Each one does something different. Wrong choice makes it worse. Let's think carefully.\"",
          mission: '"Use the correct git undo tool to remove the sensitive file from history."',
          after:   '"Credential removed correctly, history corrected. Never again — .gitignore." — Mr. Chen 👨‍🏫'
        }
      }
    },

    uni: {
      companion: { name: 'Prof. Okafor', role: 'Module Supervisor · Deep Jungle Chief', avatar: '👩‍🏫', color: '#58a6ff' },
      chapters: [
        {
          levels:    ['i1', 'i2', 'i3'],
          title:     'Chapter 1: Dissertation Chaos',
          scene:     '⚔️',
          location:  'The Eight-Person Repo Jungle',
          narrative: "\"Someone pushed directly to main and broke the build.\" Prof. Okafor's email landed at 8am. Eight contributors, one repo, no documented strategy. \"By Friday: branching strategy in your CONTRIBUTING.md. By Monday: the main branch builds cleanly or the group loses marks.\"",
          unlockMsg: "Strategy documented. Build fixed. Prof. Okafor's email tone improved."
        },
        {
          levels:    ['i4', 'i5'],
          title:     'Chapter 2: Demo Day Prep',
          scene:     '⏱️',
          location:  'The Demo Jungle',
          narrative: "Supervisor meeting in 30 minutes and the demo server is down. You're mid-refactor. Dev needs the hotfix. \"This,\" Dev says, \"is why we stash and cherry-pick.\" The jungle doesn't pause for deadlines — you adapt.",
          unlockMsg: "Demo survived. Hotfix deployed. Refactor restored. That's mid-project survival."
        },
        {
          levels:    ['i6'],
          title:     'Chapter 3: Merge Request Rules',
          scene:     '🔍',
          location:  'The GitLab Review Chamber',
          narrative: "Prof. Okafor's module requires a code review trail for every feature. Merge Requests with at least one approval before anything touches main. Your authentication module is ready — write a proper MR description and request Dev's review.",
          unlockMsg: "MR approved, module integrated. Adventurer path complete."
        }
      ],
      levels: {
        i1: {
          scene: '⚔️', location: 'The Group Repo Jungle',
          before:  "Prof. Okafor sent a stern email: someone pushed directly to main and broke the integration build for all eight group members. \"You need a defined branching strategy in your CONTRIBUTING.md by Friday.\" GitHub Flow or GitFlow — pick one, document it, enforce it. The deep dissertation jungle requires coordination.",
          mission: '"Agree on and document a branching strategy. No more direct pushes to main."',
          after:   '"Written, committed, and followed. The build is green." — Prof. Okafor 👩‍🏫'
        },
        i2: {
          scene: '⚔️', location: 'The Conflict Clearing',
          before:  "You and Dev both edited the database schema last night for different features. Git stops with conflict markers everywhere. \"Stay calm and read them,\" Dev says. \"They're not errors — they're Git asking you to make a decision. Both versions are shown. You pick the correct one, commit the resolution.\"",
          mission: '"Read the conflict markers. Understand both changes. Commit the correct resolution."',
          after:   '"Conflict resolved. Schema works. Both features intact." — Dev 🧑‍💻'
        },
        i3: {
          scene: '🔁', location: 'The Rebase Path',
          before:  "Your feature branch diverged from main four days ago. The module's coding standards require a clean linear history in MRs. Prof. Okafor's guidelines specifically mention rebase. Dev warns: \"Don't rebase anything already pushed to GitLab — it rewrites history and confuses collaborators. Local-only rebases are fine.\"",
          mission: '"Rebase your local feature branch onto the latest main before opening the MR."',
          after:   '"Linear history, clean diff, good MR. That\'s dissertation-level Git." — Prof. Okafor 👩‍🏫'
        },
        i4: {
          scene: '🎒', location: 'The Emergency Stash',
          before:  "Mid-refactor on the authentication module when Dev messages: \"Demo server is down — supervisor meeting in 30 minutes, can you hotfix the broken endpoint?\" You can't commit half-finished auth code. Stash it. Handle the emergency. Come back. The deep jungle throws crises — composure wins.",
          mission: '"Stash your in-progress auth refactor, checkout to hotfix the endpoint, then restore your stash."',
          after:   '"Hotfix done, refactor restored, supervisor met. Deep jungle composure." — Dev 🧑‍💻'
        },
        i5: {
          scene: '🔍', location: 'The MR Review Chamber',
          before:  "Prof. Okafor requires: every feature goes through a Merge Request with at least one approval, a clear description, and a linked ticket. \"Not just 'done',\" she said in the lecture. \"Tell me what changed, why it changed, and how you tested it.\" Your auth module is ready. Open the MR properly.",
          mission: '"Open a Merge Request: clear description, linked ticket, requested Dev\'s review."',
          after:   '"MR approved after one round of comments. That\'s the professional standard." — Prof. Okafor 👩‍🏫'
        },
        i6: {
          scene: '⏮️', location: 'The Undo Ruins',
          before:  "Database credentials committed and pushed to the private GitLab repo. The whole group can see them. \"This is the most common serious mistake,\" Dev says. \"And the most important one to fix correctly. Git reset? Git revert? Remove the file from history entirely? Each option has consequences. Choose wrong and you make it worse.\"",
          mission: '"Use the correct git command to remove the credentials from history — not just the file."',
          after:   '"Credentials purged from history. .gitignore updated. Academic integrity flag removed." — Prof. Okafor 👩‍🏫'
        }
      }
    },

    working: {
      companion: { name: 'Alex', role: 'Tech Lead · Deep Jungle Tactician', avatar: '🧑‍💻', color: '#58a6ff' },
      chapters: [
        {
          levels:    ['i1', 'i2', 'i3'],
          title:     'Chapter 1: The Production Incident',
          scene:     '⚔️',
          location:  'The Production Jungle',
          narrative: "Production is down. Alex looks at the commit history and says three words: \"No branching strategy.\" PRs piling up, conflicts everywhere, someone force-pushed to main. \"This ends today,\" Alex says. \"We're setting up the rules before we touch another line of code.\"",
          unlockMsg: "Production is stable. The team has rules now. Alex is less stressed."
        },
        {
          levels:    ['i4', 'i5'],
          title:     'Chapter 2: Crisis Management',
          scene:     '⏱️',
          location:  'The Sprint Jungle',
          narrative: "Mid-sprint. A critical bug in production. You're deep in a refactor. Alex pings: \"Drop it — hotfix needed, now.\" The deep jungle throws real crises. Stash, switch, fix, come back. That's the professional cadence.",
          unlockMsg: "Hotfix deployed, refactor restored, sprint continues. Crisis managed."
        },
        {
          levels:    ['i6'],
          title:     'Chapter 3: The PR Review Loop',
          scene:     '🔍',
          location:  'The Code Review Chamber',
          narrative: "Alex introduces the rule: \"Everything through a PR. No exceptions. Branch, push, review, merge. Your feature is ready — now open a proper PR and put it through the process.\"",
          unlockMsg: "PR merged after review. That's how the team ships features. Adventurer complete."
        }
      ],
      levels: {
        i1: {
          scene: '⚔️', location: 'The Branching Strategy Table',
          before:  "Production went down because someone pushed an experiment directly to main. Alex pulls up the team's commit graph: \"Look at this. Spaghetti. No strategy, no rules, everyone doing whatever they feel.\" Trunk-based? GitFlow? GitHub Flow? The team needs to pick one and document it as law.",
          mission: '"Agree on a branching strategy for the team. Document it. Enforce it from today."',
          after:   '"Written rules. Main is protected. Alex stopped waking up at 3am." — Alex 🧑‍💻'
        },
        i2: {
          scene: '⚔️', location: 'The Conflict Resolution Room',
          before:  "You and another developer both modified the same configuration file. Git stops at the conflict markers. Alex: \"Don't panic. Don't just accept theirs. Read both versions, understand what each change does, and commit the correct resolution. Wrong resolution here breaks the deploy pipeline.\"",
          mission: '"Read both conflicting changes. Understand the impact of each. Commit the correct merge."',
          after:   '"Conflict resolved correctly. Pipeline green." — Alex 🧑‍💻'
        },
        i3: {
          scene: '🔁', location: 'The Rebase Station',
          before:  "Your feature branch diverged from main a week ago. Main now has 12 new commits from the team. Alex: \"Rebase before you open the PR. Replay your commits on top of the latest main. The reviewer sees a clean diff, not a tangled merge commit. And never rebase shared branches — local feature branches only.\"",
          mission: '"Rebase your feature branch onto the latest main. Clean diff for the reviewer."',
          after:   '"Linear history. Clean diff. Reviewer approved without comments." — Alex 🧑‍💻'
        },
        i4: {
          scene: '🎒', location: 'The Emergency Stash',
          before:  "You're mid-refactor of the payment module when Alex pings: \"Production bug — crash on checkout, urgent.\" You can't commit half-finished payment code. Stash it. Checkout to main. Fix the crash. Deploy. Come back to the refactor. The jungle throws real emergencies.",
          mission: '"Stash your refactor, hotfix the production crash, then unstash and continue."',
          after:   '"Hotfix deployed in 8 minutes. Refactor intact. That\'s the professional response." — Alex 🧑‍💻'
        },
        i5: {
          scene: '🔍', location: 'The PR Review Loop',
          before:  "\"Open a PR with a real description,\" Alex says. \"Not 'updates stuff'. Tell me what changed, what you tested, what could break. Link the Jira ticket. Request two reviewers. Address every comment before merging.\" The feature is done — now it needs to earn its place in main.",
          mission: '"Open a PR: clear description, Jira link, two reviewers, address all comments."',
          after:   '"PR approved on first review. No back-and-forth. That\'s a well-documented change." — Alex 🧑‍💻'
        },
        i6: {
          scene: '⏮️', location: 'The Undo Room',
          before:  "A developer accidentally committed and pushed the staging .env file with production credentials. Alex's face: calm but serious. \"We fix this now and we fix it correctly. Git reset, git revert, or remove from history entirely — each is different. Wrong choice and we're calling security. Right choice and we're done in ten minutes.\"",
          mission: '"Use the correct tool to remove the credentials from git history completely."',
          after:   '"History purged, secret rotated, incident closed. That\'s crisis response." — Alex 🧑‍💻'
        }
      }
    },

    learner: {
      companion: { name: 'Alex', role: 'Advanced Tutorial · Deep Jungle Series', avatar: '📺', color: '#58a6ff' },
      chapters: [
        {
          levels:    ['i1', 'i2', 'i3'],
          title:     'Chapter 1: The Open Source Problem',
          scene:     '🌿',
          location:  'Your Side Project Jungle',
          narrative: "You posted your project on Reddit and someone offered to contribute. Two people, one repo, no rules. It broke within 48 hours. Alex's advanced series: \"This is where most self-taught developers hit a wall. The tools you need are branching strategies, conflict resolution, and rebase.\"",
          unlockMsg: "Your contributor workflow is set up. Collaboration without chaos is real."
        },
        {
          levels:    ['i4', 'i5'],
          title:     'Chapter 2: The Safety Toolkit',
          scene:     '⏱️',
          location:  'The Stash Cave',
          narrative: "\"Every solo developer needs this toolkit,\" Alex says in the tutorial. \"Stash for context switching. Tags for milestone marking. These are the tools that separate hobbyist projects from professional ones.\"",
          unlockMsg: "Safety toolkit acquired. Your project history is intentional now."
        },
        {
          levels:    ['i6'],
          title:     'Chapter 3: Contributing to Others',
          scene:     '🔍',
          location:  'The Open Source Trail',
          narrative: "Alex: \"If you ever want to contribute to open source — or work on a team — Pull Requests are the gate. This is how you submit work for review, how you get feedback, and how you prove your code belongs in the project.\"",
          unlockMsg: "First PR opened and merged. The open source trail is yours now. Adventurer complete."
        }
      ],
      levels: {
        i1: {
          scene: '🌿', location: 'The Contributor Jungle',
          before:  "Someone offered to help with your side project. Two people pushing to the same repo without rules broke everything within 48 hours. Alex's tutorial: \"This is the classic solo-to-team transition. You need a branching strategy — even for two people. Especially for two people.\"",
          mission: '"Set up a branching strategy for your project. Document it so contributors know the rules."',
          after:   '"Contributor strategy set. No more random pushes to main." — Alex 📺'
        },
        i2: {
          scene: '⚔️', location: 'The Conflict Zone',
          before:  "You were working on two features on two branches. When you merged them, Git threw conflict markers all over your main component. \"It looks terrifying,\" Alex says, \"but it's just Git asking: which version is correct? Both are shown. You decide. Then commit.\"",
          mission: '"Read both conflict versions. Choose the correct one. Commit the resolution."',
          after:   '"Conflict resolved. Both features intact. The jungle just tested you." — Alex 📺'
        },
        i3: {
          scene: '🔁', location: 'The Clean Trail',
          before:  "Your feature branch has a tangled history — 'wip', 'fix', 'fix again'. Before you show the work to your contributor, Alex recommends: \"Rebase. Replay your commits on a clean foundation. The diff looks deliberate, not like you were figuring it out as you went. Because actually, you were — and that's fine. Just hide the evidence.\"",
          mission: '"Rebase your feature branch onto main. Present clean, intentional commits."',
          after:   '"Clean commits, clean diff. Your contributor can actually review this now." — Alex 📺'
        },
        i4: {
          scene: '🎒', location: 'The Stash Point',
          before:  "Mid-feature on your portfolio when you find a broken link on the live version. Visitors can see it. You can't commit half-finished feature code. Alex: \"`git stash` — pack up your current work, fix the bug on main, come back and restore it. Two minutes. Nothing lost.\"",
          mission: '"Stash your in-progress feature, fix the live bug, then restore your stash."',
          after:   '"Bug fixed on live, feature continuing. Zero work lost." — Alex 📺'
        },
        i5: {
          scene: '🔍', location: 'The PR Trail',
          before:  "Your contributor wants to add a feature to your project. Alex: \"Pull Requests aren't just for big teams. Even on a two-person project, PRs create a review step, a conversation record, and a chance to catch mistakes before they hit main. Open one — even if you approve it yourself the first time.\"",
          mission: '"Open a Pull Request for a feature. Review it as if someone else wrote it."',
          after:   '"PR reviewed, approved, merged. Even solo, PRs make you think twice." — Alex 📺'
        },
        i6: {
          scene: '⏮️', location: 'The Undo Cave',
          before:  "You pushed your .env file to GitHub. Your API key is public. Alex: \"This happens to everyone — but only once if you handle it correctly. Git has multiple undo tools. The wrong one can make it worse. The right one removes the file from history entirely.\"",
          mission: '"Remove the .env file from git history and set up .gitignore immediately after."',
          after:   '"Key rotated, file purged from history, .gitignore updated. Lesson learned." — Alex 📺'
        }
      }
    }
  }, // end intermediate

  // ══════════════════════════════════════════════
  //  EXPERT — The Ancient Temple Zone
  //  Most experts are working or advanced learners.
  //  School/uni use working as fallback.
  // ══════════════════════════════════════════════
  expert: {
    zone:       'The Ancient Temple Zone',
    zoneEmoji:  '🏛️',
    atmosphere: 'Stone corridors etched with ancient glyphs. Each rune holds a command no modern explorer has mastered.',

    working: {
      companion: { name: 'Sam', role: 'Staff Engineer · The Jungle Sage', avatar: '🧙‍♂️', color: '#f0883e' },
      chapters: [
        {
          levels:    ['e1', 'e2'],
          title:     'Chapter 1: The Detective',
          scene:     '🕵️',
          location:  'The Corrupted Archive',
          narrative: "\"Something broke in production weeks ago and nobody knows when,\" Sam says, barely above a whisper. \"The symptoms are recent but the cause is old. We find the commit.\" The ancient temple's archive holds every state this codebase has ever been in. The method is bisect.",
          unlockMsg: "The regression is found. The history is clean. The temple reveals its next secret."
        },
        {
          levels:    ['e3', 'e4'],
          title:     'Chapter 2: The Architect',
          scene:     '🏗️',
          location:  "The Temple's Inner Sanctum",
          narrative: "\"The masters didn't just write code,\" Sam says, tracing a stone mechanism. \"They built systems so the codebase would protect itself. Hooks that fire before bad commits land. Submodules that reference exact versions of dependencies.\" You're not debugging anymore. You're designing.",
          unlockMsg: "The temple's guardians are awake. The codebase enforces its own rules."
        },
        {
          levels:    ['e5'],
          title:     'Chapter 3: The Workflow Law',
          scene:     '🗺️',
          location:  'The War Room',
          narrative: "Sam spreads a map across the stone table. \"You know every technique. Now design the system. Branching strategy, naming conventions, review policies — the complete workflow for a team of fifty. When you leave this room, this map is law.\"",
          unlockMsg: "⚡ The law is written. Master status earned."
        }
      ],
      levels: {
        e1: {
          scene: '🕵️', location: 'The Corrupted Archive',
          before:  "A performance regression appeared in production. Sam already has the commit graph up. \"We don't randomly check commits — that's 200 in the last month. Bisect uses binary search. Mark the current state 'bad', mark a known-good commit 'good', and Git halves the search space each step. Six steps to find the culprit.\"",
          mission: '"Use `git bisect` to pinpoint the exact commit that introduced the regression."',
          after:   '"Found in six steps. Not twenty guesses. The ancient method works." — Sam 🧙‍♂️'
        },
        e2: {
          scene: '📜', location: 'The Rewriting Chamber',
          before:  "The feature branch has 40 commits: 'wip', 'fix', 'actually fix', 'for real this time'. Sam puts down the tablet. \"Before this joins the permanent archive, the history must tell a clean story. Interactive rebase: squash noise, reorder logic, reword messages. The future reads this. Make it worthy.\"",
          mission: '"Use `git rebase -i` to squash noise commits into clean, logical units."',
          after:   '"Clean history. That\'s respect for every engineer who reads it after us." — Sam 🧙‍♂️'
        },
        e3: {
          scene: '🪝', location: 'The Hook Corridor',
          before:  "The team keeps accidentally committing debug statements and failing the lint check in CI. Every failed pipeline wastes 8 minutes. Sam: \"Build the prevention into the workflow itself. A pre-commit hook catches lint errors locally. A pre-push hook runs tests before anything reaches the remote. Automate the quality gate once — everyone benefits permanently.\"",
          mission: '"Set up pre-commit and pre-push hooks that catch quality issues before they reach CI."',
          after:   '"Hooks live in .git/hooks. CI failures from lint and tests: zero this week." — Sam 🧙‍♂️'
        },
        e4: {
          scene: '🗺️', location: 'The Submodule Library',
          before:  "The team depends on an internal shared library — its own repo, its own history. Sam explains: \"Submodules let your repo reference an exact commit of another repo. Their history is separate. You choose when to update the reference. The consuming team never gets surprise breaking changes from upstream.\"",
          mission: '"Add a git submodule for the shared library. Pin it to a specific commit."',
          after:   '"Shared library pinned. No surprise breaking changes. Dependency managed." — Sam 🧙‍♂️'
        },
        e5: {
          scene: '⚡', location: 'The War Room',
          before:  "\"You know the commands,\" Sam says. \"Now design the system. Branching model, commit message convention, PR template, required reviewer count, merge strategy, release tagging. Fifty engineers will follow this. Make the rules clear enough that the right answer is obvious and the wrong answer is hard.\"",
          mission: '"Document a complete git workflow strategy: branching, PRs, reviews, releases."',
          after:   '"The law is written. Engineers follow it. That\'s mastery — not just skill." — Sam 🧙‍♂️'
        }
      }
    },

    learner: {
      companion: { name: 'Alex', role: 'Expert Series · Temple Expedition', avatar: '📺', color: '#f0883e' },
      chapters: [
        {
          levels:    ['e1', 'e2'],
          title:     'Chapter 1: The Debugger\'s Temple',
          scene:     '🕵️',
          location:  'The Broken Build Archive',
          narrative: "Your project was working two weeks ago. Now it's not. Fifty commits between then and now. Alex's expert series: \"This is the moment every serious developer hits. You need tools, not guesswork. Git bisect. Interactive rebase. The temple's ancient methods work.\"",
          unlockMsg: "Bug found with precision. History cleaned. The temple rewards method over luck."
        },
        {
          levels:    ['e3', 'e4'],
          title:     'Chapter 2: Automation and Architecture',
          scene:     '🏗️',
          location:  'The Automation Sanctum',
          narrative: "Alex: \"At this level, you stop doing things manually that could be automated. Hooks enforce quality. Submodules manage dependencies. You're not just writing code anymore — you're designing the system that protects your code.\"",
          unlockMsg: "Quality is automated. Dependencies are managed. Your project runs itself."
        },
        {
          levels:    ['e5'],
          title:     'Chapter 3: The Professional Standard',
          scene:     '⚡',
          location:  'The Expert Summit',
          narrative: "Alex's final expert tutorial: \"This is where self-taught meets professional. A complete Git workflow: branching strategy, commit conventions, PR process, release tagging. Build it for your project and it becomes your portfolio proof of professional-level thinking.\"",
          unlockMsg: "⚡ Expert standard achieved. Your portfolio just levelled up. Master complete."
        }
      ],
      levels: {
        e1: {
          scene: '🕵️', location: 'The Broken Build Archive',
          before:  "Your project's dark mode was working two weeks ago. Now it's completely broken — 50 commits since then. Alex: \"Don't check them one by one. Git bisect runs a binary search. Mark now as bad, mark two weeks ago as good. Git picks the midpoint each time. You test, mark good or bad, and it halves the search. Six steps to the culprit.\"",
          mission: '"Use `git bisect` to find the exact commit that broke dark mode."',
          after:   '"Found in six steps. Not fifty guesses. That\'s the expert method." — Alex 📺'
        },
        e2: {
          scene: '📜', location: 'The Clean History Chamber',
          before:  "Your commit history: 'wip', 'fix', 'fix2', 'ok NOW it works'. Alex: \"Before you show this to a potential employer or contribute it to open source, clean up the story. Interactive rebase — squash the mess into logical commits with clear messages. The history should read like documentation, not a live reaction feed.\"",
          mission: '"Use `git rebase -i` to squash and rewrite your commits into a clean story."',
          after:   '"Clean history. Employers read commit logs. This one reads well." — Alex 📺'
        },
        e3: {
          scene: '🪝', location: 'The Hook Setup',
          before:  "You keep accidentally committing debug console.log statements and .env files. Alex: \"Stop relying on memory. Build the prevention into the workflow. A pre-commit hook checks for console.log and .env before any commit goes through. Run it once and it works forever.\"",
          mission: '"Set up a pre-commit hook that catches console.log and .env files before they commit."',
          after:   '"Hook installed. The accident can\'t happen anymore." — Alex 📺'
        },
        e4: {
          scene: '🗺️', location: 'The Dependency Map',
          before:  "Your project uses a UI library you built separately. Alex: \"Submodules let you reference another repo at a specific commit. When you update the submodule, you choose when — not automatically, not blindly. You get stability AND the option to upgrade on your terms.\"",
          mission: '"Add your UI library as a git submodule. Pin it to a specific version."',
          after:   '"Your project and your library: separate histories, controlled dependency." — Alex 📺'
        },
        e5: {
          scene: '⚡', location: 'The Professional Standard',
          before:  "Alex's final expert tutorial: \"Document your git workflow. Branching strategy, commit message format, PR process, release tagging. This might be a solo project — but documenting these decisions is what separates a hobbyist repo from a portfolio piece that impresses technical interviewers.\"",
          mission: '"Document your complete git workflow strategy — as if other developers will follow it."',
          after:   '"Workflow documented. Portfolio polished. Expert standard reached." — Alex 📺'
        }
      }
    },

    // school + uni fall back to working variant
    school: null,
    uni:    null
  }, // end expert

  // ══════════════════════════════════════════════
  //  INNOVATOR — The Frontier Beyond
  //  Primarily for working professionals.
  // ══════════════════════════════════════════════
  innovator: {
    zone:       'The Frontier Beyond',
    zoneEmoji:  '🚀',
    atmosphere: 'The canopy thins. The jungle meets the future. No maps exist for what comes next.',

    working: {
      companion: { name: 'Jordan', role: 'Principal Engineer · Frontier Mapper', avatar: '🚀', color: '#d2a8ff' },
      chapters: [
        {
          levels:    ['n1', 'n2', 'n3'],
          title:     'Chapter 1: The New Paradigm',
          scene:     '🚀',
          location:  'The Edge of the Known',
          narrative: "Jordan just returned from KubeCon. \"We're going trunk-based, GitOps, monorepo. Starting now. You're leading the migration.\" Beyond the ancient temple, past the deep jungle, lies uncharted territory. No maps. Nobody has been here before — or if they have, they didn't document it.",
          unlockMsg: "The new paradigm is real. The frontier gate is open."
        },
        {
          levels:    ['n4', 'n5', 'n6'],
          title:     'Chapter 2: The AI Teammates',
          scene:     '🤖',
          location:  'The AI Encampment',
          narrative: "Jordan gestures at a cluster of glowing terminals. Claude Code. Copilot. Cursor. \"They're not replacing engineers — they're multiplying what one engineer can do. The skill is direction: write clear prompts, review the diff critically, understand what the AI can't know about your business context.\"",
          unlockMsg: "Your AI teammates are productive. You're directing, not just typing."
        },
        {
          levels:    ['n7', 'n8', 'n9'],
          title:     'Chapter 3: The Platform',
          scene:     '🏗️',
          location:  'The Platform Summit',
          narrative: "\"You're not shipping features anymore,\" Jordan says. \"You're building the infrastructure that lets 200 engineers ship safely every day. Merge queues, automated releases, Dependabot pipelines. When this chapter ends, the platform runs without you.\"",
          unlockMsg: "The platform is live. 200 engineers depend on your infrastructure."
        },
        {
          levels:    ['n10', 'n11'],
          title:     'Chapter 4: The Absolute Frontier',
          scene:     '🌐',
          location:  'The Absolute Edge',
          narrative: "Jordan: \"This is where the documentation ends. MCP servers. Self-healing repos. Autonomous Dependabot. After this chapter, you are the documentation for the next generation.\"",
          unlockMsg: "🎉 Innovator complete. You're writing the maps now."
        }
      ],
      levels: {
        n1: {
          scene: '🚀', location: 'The Trunk-Based Station',
          before:  "\"Feature branches for everything is slowing us down,\" Jordan says. \"Trunk-based development: everyone commits to main, protected by feature flags and fast CI. It sounds terrifying until you understand that ten daily deploys with no incidents is LESS risky than weekly releases with three-day merge marathons.\"",
          mission: '"Set up trunk-based development with feature flags and sub-day CI cycles."',
          after:   '"Deploying to trunk ten times today. Zero incidents. The old model couldn\'t do this." — Jordan 🚀'
        },
        n2: {
          scene: '🔄', location: 'The GitOps Gateway',
          before:  "Jordan traces a diagram: git commit → CI → deploy. \"GitOps means git is the source of truth for everything — code, infrastructure, configuration. Every change is a commit. Reviewed, audited, reversible. The same workflow you use for code now governs your entire stack.\"",
          mission: '"Configure a GitOps pipeline where git commits drive infrastructure deployments."',
          after:   '"Every infrastructure change is now a git commit. Auditable. Reversible. That\'s GitOps." — Jordan 🚀'
        },
        n3: {
          scene: '📦', location: 'The Monorepo Citadel',
          before:  "Hundreds of services, each in their own repo. Dependency hell. Jordan: \"We're going monorepo. One repo for everything — atomic cross-service commits, unified CI, shared tooling. It scales to two thousand engineers if you get the governance right. Workspace tooling and scoped CI make it manageable.\"",
          mission: '"Structure a monorepo with workspace tooling, shared packages, and scoped CI."',
          after:   '"One repo, two hundred services, zero spaghetti. The governance makes it scale." — Jordan 🚀'
        },
        n4: {
          scene: '🤖', location: 'The AI Encampment',
          before:  "Claude Code is running in your terminal. Jordan: \"Your job is no longer to write every line — it's to direct. Write the right prompt, review the diff critically, guide the refactor. The engineer who learns to work WITH AI ships faster than a team of ten who won't.\"",
          mission: '"Use Claude Code to plan and implement a feature. Review the AI-generated diff critically."',
          after:   '"You directed it. You didn\'t just accept the output. That\'s the difference." — Jordan 🚀'
        },
        n5: {
          scene: '💬', location: 'The AI Review Forge',
          before:  "\"AI review tools catch security patterns, performance issues, style violations — at scale, instantly,\" Jordan says. \"But they can't know your business context, your regulatory constraints, your unwritten rules. Your job: understand what the AI flagged, assess what it missed, and make the final call.\"",
          mission: '"Use AI-assisted code review on a PR diff. Identify what the AI caught and what it missed."',
          after:   '"AI caught three real issues. You caught what the AI couldn\'t know. That\'s the partnership." — Jordan 🚀'
        },
        n6: {
          scene: '🔌', location: 'The MCP Node',
          before:  "A glowing node pulses at the frontier. Jordan touches it. \"MCP — Model Context Protocol. This connects Claude directly to your repository, your CI results, your issue tracker. Your AI doesn't just see the code file — it sees the entire living context of your codebase. This changes what AI-assisted development means.\"",
          mission: '"Configure an MCP server that connects Claude to your repository and CI context."',
          after:   '"Claude sees your whole codebase context now. That\'s a teammate, not a tool." — Jordan 🚀'
        },
        n7: {
          scene: '🔀', location: 'The Merge Queue',
          before:  "Thirty PRs queued, all touching core services. Jordan: \"If you merge them one by one you'll have integration failures all afternoon. A merge queue tests each PR against the combined result of all PRs ahead of it in the queue. CI runs against the real merged state, not the isolated branch.\"",
          mission: '"Configure a merge queue that validates PRs against each other before landing on main."',
          after:   '"Thirty PRs landed clean via the queue. CI ran 30 times, not 900." — Jordan 🚀'
        },
        n8: {
          scene: '🤖', location: 'The Dependabot Station',
          before:  "\"Forty-two dependencies with known vulnerabilities,\" Jordan says. \"Dependabot opens automated PRs when vulnerabilities appear. But untuned, it creates noise — fifty PRs a week, each needing a human decision. Smart grouping, auto-merge for patch updates, manual review for major changes.\"",
          mission: '"Configure Dependabot with smart grouping and auto-merge rules. Signal vs noise."',
          after:   '"Supply chain maintained automatically. Critical CVEs fixed within hours now." — Jordan 🚀'
        },
        n9: {
          scene: '🚀', location: 'The Release Pipeline',
          before:  "\"Manual releases are a liability,\" Jordan says. \"With git tags, semantic versioning, automated changelogs, and release pipelines, every release is consistent, documented, and rollback-ready within minutes. The jungle doesn't accept 'it worked on my machine' at release time.\"",
          mission: '"Build a fully automated release pipeline: tag, changelog, deploy, verify, rollback-ready."',
          after:   '"Every release: tagged, documented, deployed automatically. Zero manual steps." — Jordan 🚀'
        },
        n10: {
          scene: '🌐', location: 'The Absolute Edge',
          before:  "Jordan: \"This is where standard docs end. Sparse checkout — clone only the parts of a massive monorepo you need. Partial clone — defer downloading large blobs until needed. Worktrees — multiple working trees from one repo. Performance at extreme scale.\"",
          mission: '"Apply sparse checkout, partial clone, and worktrees for a large-scale repo."',
          after:   '"Operating at the scale most developers will never see." — Jordan 🚀'
        },
        n11: {
          scene: '🎯', location: 'The Final Summit',
          before:  "Jordan looks back across the whole jungle from the final summit. \"You've been through the edge, the deep jungle, the temple, and the frontier. Now build the complete production-grade system: the kind that scales to hundreds of engineers and lasts for years.\"",
          mission: '"Design a complete, production-grade git strategy — branching, CI, releases, AI tooling."',
          after:   '"🎉 Innovator complete. You\'re not following maps anymore. You\'re writing them." — Jordan 🚀'
        }
      }
    },

    learner: {
      companion: { name: 'Alex', role: 'Expert / Innovator Series', avatar: '📺', color: '#d2a8ff' },
      chapters: [
        {
          levels:    ['n1', 'n2', 'n3'],
          title:     'Chapter 1: Beyond the Tutorials',
          scene:     '🚀',
          location:  'The Frontier of Self-Teaching',
          narrative: "Alex's innovator series opens: \"If you're here, you're beyond tutorials. Trunk-based development, GitOps, monorepos — this is how serious teams work. You're not learning concepts anymore. You're learning the systems.\"",
          unlockMsg: "Beyond tutorials. Into the systems. The frontier opens."
        },
        {
          levels:    ['n4', 'n5', 'n6'],
          title:     'Chapter 2: AI-Augmented Development',
          scene:     '🤖',
          location:  'The AI Toolkit',
          narrative: "\"The self-taught developer who masters AI tooling ships faster than most employed engineers,\" Alex says. \"Claude Code, AI review, MCP — not magic, not a replacement. A multiplier. The question is whether you know how to direct it.\"",
          unlockMsg: "AI toolkit configured. You're multiplied."
        },
        {
          levels:    ['n7', 'n8', 'n9'],
          title:     'Chapter 3: Production Thinking',
          scene:     '🏗️',
          location:  'The Production Mindset',
          narrative: "Alex: \"Personal projects that look professional attract jobs. Production thinking — merge queues, automated releases, dependency management — is what separates portfolio projects that get interviews from ones that don't.\"",
          unlockMsg: "Your projects run like production systems now. That's the portfolio advantage."
        },
        {
          levels:    ['n10', 'n11'],
          title:     'Chapter 4: The Expert Horizon',
          scene:     '🌐',
          location:  'The Self-Taught Summit',
          narrative: "\"You've covered everything the tutorials skip,\" Alex says. \"The advanced git techniques, the AI workflows, the production systems. There's no 'self-taught' ceiling here — just the frontier. And you're on it.\"",
          unlockMsg: "🎉 Innovator complete. Self-taught to frontier. That's the real journey."
        }
      ],
      levels: {
        n1: {
          scene: '🚀', location: 'The Advanced Workflow Station',
          before:  "Alex's advanced series: \"Trunk-based development is how high-output teams actually work. Feature branches per developer create merge queues and integration delays. Short-lived branches, feature flags, fast CI — that's the model.\"",
          mission: '"Set up trunk-based development with feature flags for your personal project."',
          after:   '"Trunk-based. Shipping daily. The tutorial model is behind you." — Alex 📺'
        },
        n11: {
          scene: '🎯', location: 'The Portfolio Summit',
          before:  "Alex: \"You've covered everything the courses skip. Put it all together — a complete, documented, production-grade git strategy for your portfolio project. This document alone, added to your GitHub, tells employers more than most CVs.\"",
          mission: '"Document a complete git strategy for your portfolio project. Make it employer-readable."',
          after:   '"🎉 Innovator complete. Self-taught doesn\'t mean less-than. It means you chose your own path." — Alex 📺'
        }
      }
    },

    school: null,
    uni:    null
  } // end innovator

}; // end JUNGLE_STORY


// ══════════════════════════════════════════════
//  Helper functions — all life-stage aware
// ══════════════════════════════════════════════

/** Get the story data for a specific lesson, falling back to 'working'. */
window.getJungleLevelData = function(persona, levelId, lifeStage) {
  const story = window.JUNGLE_STORY?.[persona];
  if (!story) return null;
  const ls = (lifeStage && story[lifeStage]) ? story[lifeStage] : story.working;
  if (!ls) return null;
  return ls.levels?.[levelId] ?? null;
};

/** Get the current chapter for a persona + lifeStage, first incomplete chapter. */
window.getJungleChapter = function(persona, completedLevels, lifeStage) {
  const story = window.JUNGLE_STORY?.[persona];
  if (!story) return null;
  const ls = (lifeStage && story[lifeStage]) ? story[lifeStage] : story.working;
  if (!ls?.chapters) return null;
  for (const ch of ls.chapters) {
    if (ch.levels.some(id => !completedLevels.includes(id))) return ch;
  }
  return ls.chapters[ls.chapters.length - 1];
};

/** Get the companion for a persona + lifeStage. */
window.getJungleCompanion = function(persona, lifeStage) {
  const story = window.JUNGLE_STORY?.[persona];
  if (!story) return null;
  const ls = (lifeStage && story[lifeStage]) ? story[lifeStage] : story.working;
  return ls?.companion ?? null;
};

/** Returns the chapter if completing levelId finishes it, else null. */
window.isChapterComplete = function(persona, levelId, allCompletedLevels, lifeStage) {
  const story = window.JUNGLE_STORY?.[persona];
  if (!story) return null;
  const ls = (lifeStage && story[lifeStage]) ? story[lifeStage] : story.working;
  if (!ls?.chapters) return null;
  const ch = ls.chapters.find(c => c.levels.includes(levelId));
  if (!ch) return null;
  const nowComplete = [...allCompletedLevels, levelId];
  return ch.levels.every(id => nowComplete.includes(id)) ? ch : null;
};
