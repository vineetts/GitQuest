// ═══════════════════════════════════════════════
//  GitQuest — Jungle Storyline  (life-stage aware)
//
//  Writing rules for non-tech audience:
//  1. Story text creates the NEED — the lesson teaches the term.
//     Never use technical jargon in 'before' narrative text.
//  2. Use analogies from the learner's world first.
//     (Word docs, Google Docs, shared folders, notebooks...)
//  3. Commands only appear in 'mission' text — one at most.
//  4. Companion voices are warm and human, never tutorial-tone.
//
//  Structure: JUNGLE_STORY[persona][lifeStage]
//  Life stages: school | uni | working | learner
//  Personas:    beginner | intermediate | expert | innovator
// ═══════════════════════════════════════════════

window.JUNGLE_STORY = {

  // ══════════════════════════════════════════════
  //  BEGINNER — The Jungle's Edge
  // ══════════════════════════════════════════════
  beginner: {
    zone:       "The Jungle's Edge",
    zoneEmoji:  '🌅',
    atmosphere: 'Dawn light through the canopy. Every step forward reveals something new.',

    // ── SCHOOL ──────────────────────────────────
    school: {
      companion: { name: 'Mr. Chen', role: 'CS Teacher · Expedition Lead', avatar: '👨‍🏫', color: '#3fb950' },
      chapters: [
        {
          levels:    ['b1', 'b2', 'b3'],
          title:     'Chapter 1: The Group Project Problem',
          scene:     '🏫',
          location:  'The Classroom Clearing',
          narrative: "Week one. Mr. Chen puts the group project brief on the board. Three people, one shared project, four weeks until exhibition day. Last term your group ended up with five files all called 'FINAL' and submitted the wrong one. This time, Mr. Chen has a plan. 'There is a tool,' he says, 'that solves this problem completely. Once you know it, you'll use it forever.'",
          unlockMsg: "The group project chaos is behind you. The real jungle trail begins now."
        },
        {
          levels:    ['b4', 'b5', 'b6'],
          title:     'Chapter 2: Two People, One Project',
          scene:     '🌿',
          location:  'The Forking Trails',
          narrative: "Jamie wants to add an animation to the project. You want to add a dark theme. Both pieces are half-finished and the deadline is Friday. If you both edit the same file tonight, one of you will overwrite the other's work — and nobody will know until it's too late. Mr. Chen draws two forking trails on the whiteboard. 'The jungle taught us how to fix this,' he says.",
          unlockMsg: "You and Jamie both finished your pieces without touching each other's work. The jungle calls that teamwork."
        },
        {
          levels:    ['b7', 'b8'],
          title:     'Chapter 3: The Exhibition',
          scene:     '🏆',
          location:  'The School Exhibition Stage',
          narrative: "Exhibition day is one week away. Your project lives on your school laptop and nowhere else. Jamie can't access it from home. The judges need a link. And you just realised your project folder contains a few private files that should never be seen publicly. Mr. Chen is already standing by the door: 'The jungle's last lesson. Let's get this project online — properly.'",
          unlockMsg: "🏆 Your project is online. The judges have a link. Mr. Chen gives a rare smile. Explorer complete."
        }
      ],
      levels: {
        b1: {
          scene: '🏫', location: 'The Classroom Clearing',
          before:  "Mr. Chen draws a diagram on the board. A document. Five copies of it: 'essay_v1', 'essay_v2', 'essay_FINAL', 'essay_FINAL_real', 'essay_FINAL_real_THIS_ONE'. He looks at the class. 'Last year's group submitted the wrong version and lost 20 marks. They had no way of knowing which file was newest.' He circles the chaos. 'There is a tool that makes this impossible. It's called Git. And once you understand it, you will never go back.'",
          mission: '"Before you write a single line of code this term, understand what Git is and why it exists. The \'why\' matters more than the commands."',
          after:   '"You now understand the problem Git solves. That\'s actually the hardest part — most people skip it." — Mr. Chen 👨‍🏫'
        },
        b2: {
          scene: '🏕️', location: 'Your Project Folder',
          before:  "You've created a folder for the project. It's empty — just a name and a blank space. Mr. Chen walks past and nods. 'Good start. Now you need to tell Git that THIS folder is the one it should watch and remember. Think of it like planting a flag: this is your base camp, this is where the history begins. From this point on, every change you make gets recorded.'",
          mission: '"Run `git init` inside your project folder. This one command turns an ordinary folder into a project with a permanent memory."',
          after:   '"That folder now has a memory. Every change from this moment will be tracked — forever." — Mr. Chen 👨‍🏫'
        },
        b3: {
          scene: '🌿', location: 'The Staging Area',
          before:  "You have three parts of your project. The home page — finished and looking great. The colour scheme — done. And an interactive graph that you've been trying to fix all afternoon and it still crashes. Mr. Chen says: 'Save the finished parts right now. But don't include the broken graph yet — leave it out. Git lets you choose exactly what goes into each save point, so your record is always clean.'",
          mission: '"Choose which finished pieces to save. Leave the broken part out. You control what gets recorded."',
          after:   '"Saving only what\'s finished — that\'s the habit that separates organised developers from messy ones." — Mr. Chen 👨‍🏫'
        },
        b4: {
          scene: '📍', location: 'The Save Point',
          before:  "The project is working. Really working — the way you imagined it. Jamie leans over: 'Save it RIGHT NOW before you touch anything else.' It's the same instinct as saving your game before a boss fight. If you experiment tomorrow and something breaks, you can come back to exactly this moment. But only if you save it now, with a note that says what it was.",
          mission: '"Save this moment with a message that describes what you just built. Not \"update\" — something future-you will actually understand."',
          after:   '"Future you just thanked present you. A good save-point note is worth more than you think." — Mr. Chen 👨‍🏫'
        },
        b5: {
          scene: '🔀', location: 'The Forking Trails',
          before:  "Jamie wants to add a spinning logo. You want a completely different colour scheme. Both ideas are risky — they might not work. And the deadline is tomorrow. The worst thing you could do right now is experiment on the main copy of the project and break it. Mr. Chen explains the solution: make yourself a personal copy to experiment on. If it works, bring it back. If it doesn't, throw it away. The main project stays safe the whole time.",
          mission: '"Make a personal copy to experiment on — one that won\'t affect the main project. Try your idea safely."',
          after:   '"You tried something risky without putting the main project at risk. That is exactly the right habit." — Mr. Chen 👨‍🏫'
        },
        b6: {
          scene: '🌊', location: 'The River Confluence',
          before:  "Your colour scheme experiment worked. Jamie's spinning logo worked. You both made your changes on separate copies — and now it's time to bring them back together into one finished project. This is the moment two separate lines of work become one. Mr. Chen calls it 'merging'. 'The jungle trail splits to let both explorers work freely,' he says, 'and then it meets again at the river.'",
          mission: '"Bring your separate copy back into the main project. Two trails meet at the river."',
          after:   '"Two pieces of work, one finished project, nothing lost. That\'s exactly how teams are supposed to work." — Mr. Chen 👨‍🏫'
        },
        b7: {
          scene: '📋', location: 'The School Exhibition Board',
          before:  "Exhibition day is one week away. Your project exists in one place: your school laptop. Jamie can't access it from home. If the laptop breaks, the project disappears. And the judges need a link — they're not coming to look at your screen. Mr. Chen pulls up GitHub on the projector. 'This is like Dropbox for code,' he says, 'except it remembers every change that ever happened, and your whole team can access it from anywhere.'",
          mission: '"Put your project online so the whole team and the judges can access it from anywhere."',
          after:   '"The project is online. Jamie can work from home. The laptop can\'t touch it now." — Mr. Chen 👨‍🏫'
        },
        b8: {
          scene: '🚫', location: 'The Private Files Clearing',
          before:  "You put your project online and Mr. Chen sends a message: 'Your project folder contains some private things that are now publicly visible — including a password and 30,000 temporary files the computer created automatically.' Your stomach drops. The good news: there's a simple fix. You can tell Git exactly which things to always ignore — private passwords, temporary junk, anything that should never leave your computer.",
          mission: '"Tell Git which files to always ignore and never upload — passwords, temporary files, private settings."',
          after:   '"Private things stay private. Junk files stay off the internet. That\'s a clean, professional project." — Mr. Chen 👨‍🏫'
        }
      }
    },

    // ── UNIVERSITY ───────────────────────────────
    uni: {
      companion: { name: 'Prof. Okafor', role: 'Module Supervisor · Expedition Chief', avatar: '👩‍🏫', color: '#3fb950' },
      chapters: [
        {
          levels:    ['b1', 'b2', 'b3'],
          title:     'Chapter 1: The Module Begins',
          scene:     '🎓',
          location:  'The Module Lab',
          narrative: "First lecture of the semester. Prof. Okafor's opening slide has one sentence: 'All coursework must be submitted via GitLab. No submission link, no marks.' Your group of four needs to share work, avoid overwriting each other, and hand in a clean project history. Dev has done this before. 'Don't worry,' they say. 'It looks scary for about 20 minutes. Then it clicks.'",
          unlockMsg: "Week one foundations done. The module trail is open — and Dev says it gets easier from here."
        },
        {
          levels:    ['b4', 'b5', 'b6'],
          title:     'Chapter 2: The Group Project',
          scene:     '🌿',
          location:  'The Group Project Jungle',
          narrative: "Four group members. Four pieces of the project to build. One shared copy everyone can see. The problem: you're all working at the same time, and if two people change the same file at once, one of you will overwrite the other. 'This is the group project nightmare,' Dev says. 'And there's a clean solution. Each person works on their own trail — nobody steps on anyone else.'",
          unlockMsg: "Four people, four pieces, no collisions. The group project is actually working."
        },
        {
          levels:    ['b7', 'b8'],
          title:     'Chapter 3: Submission Week',
          scene:     '📤',
          location:  'The GitLab Submission Portal',
          narrative: "Submission is in 48 hours. The project needs to be online, the history needs to look professional, and there's a file in your project folder that contains your database password — which absolutely cannot be made public. Prof. Okafor is checking every submission personally. 'The history tells me everything about how your group worked,' she says.",
          unlockMsg: "🏆 Submitted cleanly. Prof. Okafor reviewed the history and sent a positive note. Explorer complete."
        }
      ],
      levels: {
        b1: {
          scene: '🎓', location: 'The Module Lab',
          before:  "First session. Prof. Okafor shows a slide of a shared Google Doc that four people edited at the same time — different versions of the same paragraph, nobody knows whose is newest, two people's work missing entirely. 'This is what happens without version control,' she says. 'Git solves this problem completely. It tracks every single change, who made it, and when — so nothing is ever lost and nothing is ever accidentally overwritten.'",
          mission: '"Understand what Git is and the specific problem it solves before you write a single line of code."',
          after:   '"You understand the WHY. That means the HOW will make sense when you see it." — Prof. Okafor 👩‍🏫'
        },
        b2: {
          scene: '🏕️', location: 'The Project Folder',
          before:  "Lab sheet for week one: create a project folder and turn it into something Git can track. Dev leans over: 'Think of it like registering your project with a system that will remember everything from this point forward. One command and your folder goes from a normal folder to one with a complete history attached.' Prof. Okafor is walking the room. She stops at anyone who hasn't started yet.",
          mission: '"Run `git init` to register your project folder. This is step one of every project you\'ll ever build."',
          after:   '"Folder registered. Git is watching. Every change from now on is part of the record." — Prof. Okafor 👩‍🏫'
        },
        b3: {
          scene: '🌿', location: 'The Staging Area',
          before:  "You have three parts of the coursework done: the login screen (finished), the user dashboard (finished), and a data chart that keeps crashing. Dev says: 'Save the finished parts now — but leave the broken chart out. You get to choose exactly what goes into each save point. Don't save the broken stuff just because it's there. Save what's actually done.'",
          mission: '"Choose the finished pieces to save. Leave out the broken chart. You control what gets recorded."',
          after:   '"Intentional saves. Every checkpoint should be something you\'re proud of, not just everything you touched." — Dev 🧑‍💻'
        },
        b4: {
          scene: '📍', location: 'The Working Build',
          before:  "For the first time all week, everything is working. Dev messages immediately: 'Save it RIGHT NOW.' A save point in Git isn't just a backup — it's a labelled moment in history you can return to at any time. If the next change breaks everything, you don't have to panic. You just go back to this exact moment. But you have to save it first, with a clear note about what it is.",
          mission: '"Save this working version with a note that describes what you just built. Make the note useful — you\'ll read it later."',
          after:   '"Checkpoint saved. If anything breaks next session, this is your safety net." — Dev 🧑‍💻'
        },
        b5: {
          scene: '🔀', location: 'The Feature Branch Forest',
          before:  "Four people in the group. All working on the project at the same time. The problem: you're all editing the same shared files. Every time someone saves their version, they risk overwriting someone else's work. Prof. Okafor explains the solution in the lab: each person works on their own personal copy of the project. When your piece is done, you bring it back. Nobody's work disappears.",
          mission: '"Make your own personal copy to work on. Your changes stay separate until you\'re ready to bring them back."',
          after:   '"Your copy, your changes, your trail. Nobody else touches it until you decide to share it." — Dev 🧑‍💻'
        },
        b6: {
          scene: '🌊', location: 'The Integration Point',
          before:  "Your piece of the project and Dev's piece are both done and tested. Now they need to become one combined project. This is the moment Git earns its reputation: it takes two separate copies of work and figures out how to combine them automatically. Usually it works perfectly. Occasionally two people changed the same thing — and in that case Git asks you to decide which version is correct.",
          mission: '"Bring your personal copy back into the shared project. Two separate pieces become one."',
          after:   '"Combined. Both pieces intact. No work lost. That\'s the whole point of working this way." — Dev 🧑‍💻'
        },
        b7: {
          scene: '📤', location: 'The GitLab Portal',
          before:  "Your project exists only on your university laptop. Dev can't access it from home. The automated marking system needs a link to it online. If your laptop breaks before submission, the project is gone. Prof. Okafor's marking system checks GitLab — not your local machine. The project needs to live online, where everyone in the group can reach it and where it's safe.",
          mission: '"Put your project online so everyone can access it and the submission system can find it."',
          after:   '"Online, accessible to the group, backed up. Prof. Okafor\'s system can see it now." — Prof. Okafor 👩‍🏫'
        },
        b8: {
          scene: '🚫', location: 'The Private Files Zone',
          before:  "You've put the project online and Prof. Okafor messages: 'I can see your database password in your project files. And your project folder contains 30,000 temporary files that your computer generated — please remove them.' This happens to nearly every group in week one. The fix is straightforward: tell Git which things to always skip — private passwords, auto-generated junk, anything that shouldn't leave your computer.",
          mission: '"Tell Git which files to always ignore. Passwords and temporary files should never go online."',
          after:   '"Private things offline. Junk excluded. Prof. Okafor removed the note from your submission." — Prof. Okafor 👩‍🏫'
        }
      }
    },

    // ── WORKING PROFESSIONAL ─────────────────────
    working: {
      companion: { name: 'Priya', role: 'Senior Developer · Your Guide', avatar: '👩‍💻', color: '#3fb950' },
      chapters: [
        {
          levels:    ['b1', 'b2', 'b3'],
          title:     'Chapter 1: First Week at TechStart',
          scene:     '🌅',
          location:  'The TechStart Office Jungle',
          narrative: "First day. Priya walks you through the office and stops at a wall of monitors. 'Every change anyone has ever made to this product lives in one place,' she says. 'Three years of history. You can see exactly who changed what, when, and why. That's Git.' She hands you a laptop. 'Don't worry — you're going to understand this faster than you think.'",
          unlockMsg: "Week one done. Priya says you're picking this up faster than most. The trail continues."
        },
        {
          levels:    ['b4', 'b5', 'b6'],
          title:     'Chapter 2: Your First Solo Task',
          scene:     '🌿',
          location:  'The Feature Trail',
          narrative: "Priya slides a task across the desk. 'Your first solo piece of work. Build it, save your progress as you go, and bring it back into the main product when it's done.' She adds: 'The key rule is simple — never experiment on the live version. Make yourself a safe space to work. That's what the next three lessons are about.'",
          unlockMsg: "First solo task delivered cleanly. Priya tells the team you're already working like a pro."
        },
        {
          levels:    ['b7', 'b8'],
          title:     'Chapter 3: The Team Way',
          scene:     '🏕️',
          location:  'The Shared Codebase',
          narrative: "Everyone on the team works from the same shared copy of the product — online, accessible from anywhere, backed up automatically. Priya explains the last two rules: 'Everything goes through the shared system — your laptop isn't safe enough on its own. And some files must never go online — especially passwords. That's your last two lessons.'",
          unlockMsg: "🏆 You're a full member of the team's workflow now. Priya stops double-checking your work. Explorer complete."
        }
      ],
      levels: {
        b1: {
          scene: '🌅', location: 'The TechStart Office',
          before:  "Priya opens the product's full change history on screen. 'Every change, back three years. Every person who touched it, every reason why, every time something broke and how it was fixed.' She scrolls slowly. 'Before Git, teams managed this with shared folders and email attachments — and they lost work constantly. Git made this kind of history possible. Let me show you what it actually is.'",
          mission: '"Understand what Git is and why professional teams couldn\'t function without it."',
          after:   '"That\'s the foundation. Everything else you learn this week builds on exactly that understanding." — Priya 👩‍💻'
        },
        b2: {
          scene: '🏕️', location: 'Your Dev Environment',
          before:  "Priya sets up a practice project on your laptop. 'Before you do anything else — before you write one line — you tell Git to start watching this folder. Once you do that, it remembers everything. Every file you add, every change you make, every version.' She taps the screen. 'This is the very first thing, every single time, for every project.'",
          mission: '"Tell Git to start watching your project folder with `git init`. Do this before writing anything."',
          after:   '"Your project has a memory now. Nothing you do from this point will ever be lost unless you want it to be." — Priya 👩‍💻'
        },
        b3: {
          scene: '🌿', location: 'Your First Task',
          before:  "You've made changes to three different parts of the project. Two are polished and ready. One is rough and definitely not ready to share. Priya explains: 'When you save a checkpoint, you choose exactly what goes into it. Don't save everything just because it's there. Save what's finished and intentional. Leave the rough stuff out until it's ready.'",
          mission: '"Choose which finished pieces to include in your save point. Leave the rough work out."',
          after:   '"Every checkpoint should represent something deliberate. That\'s what separates a clean history from a messy one." — Priya 👩‍💻'
        },
        b4: {
          scene: '📍', location: 'The Checkpoint Moment',
          before:  "Your piece of work is in good shape — everything is doing what it should. Priya appears behind you: 'Save it now. Seriously. Right now, before you do anything else.' She explains: 'A save point in Git is permanent. You can go back to it in five minutes, five months, or five years. But only if you save it properly with a note that explains what it was. Write the note for the version of you who has completely forgotten this day.'",
          mission: '"Save this working state with a clear note. Describe what you built, not just that you built something."',
          after:   '"That note will mean something to someone someday — probably you at 11pm six months from now." — Priya 👩‍💻'
        },
        b5: {
          scene: '🔀', location: 'The Safe Experiment Zone',
          before:  "There's a feature you want to try — but it's experimental. It might work, it might not. The one thing you definitely cannot do is try it on the live product and break something real. Priya explains the golden rule: 'Make a personal working copy first. Try whatever you want on it. If it works, bring it back. If it doesn't, throw it away. The real product never knew the experiment happened.'",
          mission: '"Make a personal copy to experiment on safely. The main project stays untouched."',
          after:   '"You just did something that would terrify most new developers: tried something risky, safely. Good instinct." — Priya 👩‍💻'
        },
        b6: {
          scene: '🌊', location: 'The Merge Point',
          before:  "Your experiment worked. Now your separate working copy needs to be brought back into the main product. This is the step that makes the whole system work: two separate lines of work becoming one. 'Git handles this automatically in most cases,' Priya says. 'It figures out what changed and combines everything. The only time it needs your help is when two people changed the same exact thing — and then it asks you to decide.'",
          mission: '"Bring your working copy back into the main project. Your experiment becomes permanent."',
          after:   '"Merged in. The product is better because of your work. That\'s the whole loop." — Priya 👩‍💻'
        },
        b7: {
          scene: '📋', location: 'The Shared System',
          before:  "Everything you've done so far lives only on your laptop. The team can't see it. If your laptop broke today, it would disappear. Priya: 'The team works from a shared online copy — think of it like a shared Google Drive, but for code, with full history. When you put your work there, everyone can see it, work from it, and you always have a backup.' She pulls up GitHub. 'This is where it lives.'",
          mission: '"Put your work in the shared online system. Your laptop isn\'t a safe enough home for team work."',
          after:   '"Online, backed up, visible to the team. This is how real professional development works." — Priya 👩‍💻'
        },
        b8: {
          scene: '🚫', location: 'The Private Files Wall',
          before:  "Priya sends a message: 'Your upload included a file with the database password — that's now visible to anyone with the link. Also a folder with 400,000 temporary files.' Her tone is calm. 'This happens to everyone once. Here's the fix: you tell Git which things to always ignore — passwords, private settings, temporary files your computer generates automatically. One setup, and it never happens again.'",
          mission: '"Tell Git what to always ignore. Passwords and auto-generated files must never go online."',
          after:   '"Credentials removed, junk excluded. Never again, right?" — Priya 👩‍💻'
        }
      }
    },

    // ── SELF-TAUGHT / LEARNER ────────────────────
    learner: {
      companion: { name: 'Alex', role: 'Online Mentor · Your Tutorial Guide', avatar: '📺', color: '#3fb950' },
      chapters: [
        {
          levels:    ['b1', 'b2', 'b3'],
          title:     'Chapter 1: Stop Losing Your Work',
          scene:     '🌱',
          location:  'Your Personal Project',
          narrative: "You've been building things for a while. Projects on your desktop, backups emailed to yourself, versions with names like 'portfolio_backup_FINAL_actually_final'. And then one day you accidentally overwrite three hours of work and can't get it back. Alex opens the tutorial: 'I've been there. There's a tool that makes this impossible. Let me show you.'",
          unlockMsg: "You'll never lose work to an accidental overwrite again. The jungle's memory is yours now."
        },
        {
          levels:    ['b4', 'b5', 'b6'],
          title:     'Chapter 2: Build Without Fear',
          scene:     '🌿',
          location:  'The Experiment Trails',
          narrative: "Alex's second tutorial section: 'The reason most self-taught developers are scared to experiment is they have no safety net. Break something on your only copy and it's gone. The next three lessons give you that safety net — save points, personal copies, bringing experiments back. After this, you'll try things you'd never have risked before.'",
          unlockMsg: "You tried a risky experiment, it worked, you brought it back. That's what fearless development feels like."
        },
        {
          levels:    ['b7', 'b8'],
          title:     'Chapter 3: Your Public Portfolio',
          scene:     '🌐',
          location:  'Your GitHub Profile',
          narrative: "'GitHub is your portfolio,' Alex says in the final section. 'Every project you put there is evidence of what you can build. Employers look at it. Collaborators find you through it. And it means your work is backed up online — your laptop can die and your projects survive.' One important note: some files should never go online. Alex has a lesson for that too.",
          unlockMsg: "🏆 Your work is online, clean, and public. Your portfolio just got its first real entry. Explorer complete."
        }
      ],
      levels: {
        b1: {
          scene: '🌱', location: 'Your Project Folder',
          before:  "Alex starts the tutorial with a story: 'I was three weeks into a personal project. Refactoring one file. Saved over the original. Lost everything.' A pause. 'That was the day I learned Git. It's a tool that remembers every version of every file you've ever worked on — so going back to any previous state takes ten seconds. No matter what you accidentally delete, overwrite, or break, it's always there.'",
          mission: '"Understand what Git is and why it exists. The concept comes before the commands."',
          after:   '"That accident I described? With Git it doesn\'t happen. Ever. You just learned the most important reason to use it." — Alex 📺'
        },
        b2: {
          scene: '🏕️', location: 'Your Project Folder',
          before:  "Alex: 'Step one of every project I start — before I write a single thing — is turning the folder into a Git project. One command. It takes two seconds. And from that moment, the folder has a memory. Everything I do from now on gets tracked.' He looks at the camera. 'I used to skip this step. I lost projects because of it. Now it's automatic. Let me show you.'",
          mission: '"Run `git init` in your project folder. This is now step one of every project you build."',
          after:   '"Your folder has a memory now. Nothing you build in it will ever disappear unless you choose to delete it." — Alex 📺'
        },
        b3: {
          scene: '🌿', location: 'The Staging Area',
          before:  "You've been working for two hours. Three different parts of the project changed. Two of them are exactly how you want them. One is still a mess. Alex: 'When you save a checkpoint in Git, you choose what goes in it. Don\'t save everything because it\'s there. Save the finished pieces. Leave the messy bit until it\'s ready. That way every checkpoint in your history is clean and intentional.'",
          mission: '"Choose only the finished pieces for this save point. Leave the work-in-progress out."',
          after:   '"Clean saves, clean history. Every checkpoint tells a clear story about what you built." — Alex 📺'
        },
        b4: {
          scene: '📍', location: 'The Save Point',
          before:  "The project looks exactly how you imagined it. Alex always says the same thing in this situation: 'Commit it right now. Before you touch anything else. This is your save point.' He explains: 'Think of it like saving a game — except the save is permanent and labelled. Mess everything up tomorrow? Load this save. But only if you saved it today, with a note that actually describes what it is.'",
          mission: '"Save this working version with a note that describes what you built — something your future self will understand."',
          after:   '"Save point locked in. Future you will load this one day and be very grateful present you wrote a proper note." — Alex 📺'
        },
        b5: {
          scene: '🔀', location: 'The Experiment Branch',
          before:  "You want to try a completely different layout — but the current one already looks great. The problem: if you experiment directly on your working version and it goes wrong, you've ruined the good one. Alex calls branches 'parallel universes for your project'. 'Make a copy to experiment on,' he says. 'Try anything. If it works, bring it back. If it doesn't, delete it. The original never changes.'",
          mission: '"Make an experimental copy to try your new layout. The original stays safe and untouched."',
          after:   '"You just tried something that could have broken your project — and it couldn\'t touch the original. That\'s the whole magic." — Alex 📺'
        },
        b6: {
          scene: '🌊', location: 'The Merge River',
          before:  "The experimental layout worked even better than you hoped. Now you want to make it the real version. Alex explains what happens next: 'You bring the experiment back into the main project. Git takes your experimental copy and combines it with the original — keeping everything from both. Your test succeeded, and now the improvement is permanent.'",
          mission: '"Bring your experiment back into the main project. The improvement is about to become permanent."',
          after:   '"Experiment brought home. The project is better and nothing was lost. That\'s how good ideas make it into real projects." — Alex 📺'
        },
        b7: {
          scene: '🌐', location: 'Your GitHub Portfolio',
          before:  "Your project lives on your laptop. Just your laptop. If it breaks, the project is gone. And nobody can see what you've built. Alex: 'GitHub is the solution to both problems at once. Your project goes online — backed up, safe, and visible to the world. Potential employers look at GitHub profiles. Collaborators find projects there. And your work survives any laptop failure, ever.'",
          mission: '"Put your project on GitHub. Get it online, backed up, and visible."',
          after:   '"Your project is online. Backed up. Accessible. Put that GitHub link on your CV today." — Alex 📺'
        },
        b8: {
          scene: '🚫', location: 'The Private Files Lesson',
          before:  "Alex: 'This is the lesson I wish someone had told me on day one.' After putting a project online, he found that a private password he'd saved in a settings file was now publicly visible to anyone. 'Your project folder contains things that should never be online — passwords, private settings, temporary files your computer creates automatically. There\'s a simple way to tell Git to always ignore these. Set it up once, use it on every project.'",
          mission: '"Set up a list of files Git should always ignore — passwords and temporary files must never go online."',
          after:   '"Private things private, junk files gone. Your online project is clean and safe." — Alex 📺'
        }
      }
    }
  }, // end beginner

  // ══════════════════════════════════════════════
  //  INTERMEDIATE — The Deep Jungle
  //  Learners now know the basics. The story
  //  introduces harder situations — still through
  //  relatable scenarios, not technical lectures.
  // ══════════════════════════════════════════════
  intermediate: {
    zone:       'The Deep Jungle',
    zoneEmoji:  '🌿',
    atmosphere: 'The path gets narrower. The jungle is less forgiving. Real problems have real consequences here.',

    school: {
      companion: { name: 'Mr. Chen', role: 'CS Teacher · Deep Jungle Guide', avatar: '👨‍🏫', color: '#58a6ff' },
      chapters: [
        {
          levels:    ['i1', 'i2', 'i3'],
          title:     'Chapter 1: The Hackathon',
          scene:     '⚔️',
          location:  'The Hackathon Jungle',
          narrative: "School hackathon weekend. Six people, one project, no rules. By Saturday morning, someone had saved over Jamie's work without realising. Another person saved over that. Mr. Chen surveys the damage. 'Before anyone else touches this project, we need rules. The deep jungle does not forgive teams that don't have a plan.'",
          unlockMsg: "Rules set, damage undone, team running properly. The hackathon jungle is survivable."
        },
        {
          levels:    ['i4', 'i5'],
          title:     'Chapter 2: Deadlines and Emergencies',
          scene:     '⏱️',
          location:  'The Deadline Trail',
          narrative: "Presentation in 20 minutes and the submit button is broken. You're halfway through adding a new feature and can't just abandon it — but you can't present a half-built project either. Mr. Chen has seen this before. 'Git has two tools you need right now,' he says. 'One parks your half-finished work safely. The other fixes the emergency.'",
          unlockMsg: "Emergency fixed. Half-finished work recovered. Presentation went fine."
        },
        {
          levels:    ['i6'],
          title:     'Chapter 3: The Peer Review',
          scene:     '🔍',
          location:  'The Review Clearing',
          narrative: "New rule from Mr. Chen: 'Nobody adds their work to the main project alone. You share it for someone else to check first. That's how professional teams catch mistakes before they affect everyone.' Your piece is ready. Time to share it properly and invite Jamie to review.",
          unlockMsg: "Work reviewed, approved, and added properly. Adventurer complete."
        }
      ],
      levels: {
        i1: {
          scene: '⚔️', location: 'The Hackathon War Room',
          before:  "Six people working on the same project all weekend with no agreement about how to do it. By Sunday morning, work had been overwritten three times, nobody was sure which version was newest, and two people had been adding things to different copies without realising. Mr. Chen: 'This is the most common group project failure. The fix isn't technical — it's agreeing on rules before you start. Who works on what, how you share changes, what the main copy is.'",
          mission: '"Agree on a clear set of rules for how your team works together. Write them down."',
          after:   '"Rules written, team briefed. The project is recoverable now." — Mr. Chen 👨‍🏫'
        },
        i2: {
          scene: '⚔️', location: 'The Conflict Clearing',
          before:  "You and Jamie both worked on the same part of the project last night — you changed one thing, Jamie changed something else in the same place. Now Git is stopping you from combining your work because it can't figure out which version is right without your help. 'This isn't a disaster,' Mr. Chen says. 'Git is just asking you a question: which version should we keep? Read both, understand both, pick the right one.'",
          mission: '"Read both versions of the conflicting change. Decide which one (or which combination) is correct."',
          after:   '"Conflict resolved by understanding — not by just picking randomly. That\'s the right approach." — Mr. Chen 👨‍🏫'
        },
        i3: {
          scene: '🔁', location: 'The History Tidy Path',
          before:  "You look at the record of your changes before showing Mr. Chen your work. It reads like a stream of consciousness: 'trying something', 'maybe this', 'ugh ok', 'finally'. Mr. Chen raises an eyebrow. 'Before you share your work with the team, the record of your changes should tell a clear story — not a live commentary of your afternoon. Git can help you tidy it up retrospectively.'",
          mission: '"Tidy up your recent changes into a clean, clear record before sharing your work."',
          after:   '"Clear record. Anyone reading it knows exactly what you built and why." — Mr. Chen 👨‍🏫'
        },
        i4: {
          scene: '🎒', location: 'The Emergency Cache',
          before:  "You're halfway through adding a search feature when Jamie panics: 'The submit button is broken and we're presenting in 20 minutes!' The problem: you can't abandon your half-finished work — that would ruin it. But you also can't save it as-is because it's not ready. Mr. Chen: 'Git has a way to temporarily park work. You set it aside, fix the emergency, and come back to exactly where you left off.'",
          mission: '"Park your half-finished work temporarily, fix the emergency, then come back and continue."',
          after:   '"Emergency fixed. Half-finished work exactly where you left it. Presentation survived." — Mr. Chen 👨‍🏫'
        },
        i5: {
          scene: '🔍', location: 'The Review Board',
          before:  "Mr. Chen introduces a new rule: 'Before any piece of work joins the main project, someone else has to look at it first. Not just glance — actually review it, ask questions, and give the green light. This is how professional teams catch problems before they affect the whole group.' Your work is ready. Write a proper note about what you built and invite Jamie to check it.",
          mission: '"Share your work for review: write a clear description of what you built and what you changed."',
          after:   '"Reviewed, approved, added properly. That\'s the quality gate that keeps the project clean." — Mr. Chen 👨‍🏫'
        },
        i6: {
          scene: '⏮️', location: 'The Undo Trail',
          before:  "You saved and shared a file that contained a password — and now it's visible to everyone in the group. 'Don't panic,' Mr. Chen says. 'But we do need to act fast, and correctly.' There are several ways to undo things in Git, and they're not all the same. Some remove the change entirely. Some add a new step that cancels the old one. Picking the wrong tool can make the situation worse. Mr. Chen walks you through the right one.",
          mission: '"Use the right Git undo tool to properly remove the sensitive file — not just hide it."',
          after:   '"Removed correctly. Private things stay private when you use the right approach." — Mr. Chen 👨‍🏫'
        }
      }
    },

    uni: {
      companion: { name: 'Prof. Okafor', role: 'Module Supervisor · Deep Jungle Chief', avatar: '👩‍🏫', color: '#58a6ff' },
      chapters: [
        {
          levels:    ['i1', 'i2', 'i3'],
          title:     'Chapter 1: The Eight-Person Project',
          scene:     '⚔️',
          location:  'The Group Repo Jungle',
          narrative: "Prof. Okafor's email arrives at 8am: 'Someone saved directly to the main shared copy and broke the build for the entire group. I need a written team workflow in your CONTRIBUTING.md by Friday — who works on what, how changes are reviewed, and what the rules are.' Eight people in a jungle without rules is chaos. That changes today.",
          unlockMsg: "Team workflow documented. The build is green. Prof. Okafor's follow-up email is warmer in tone."
        },
        {
          levels:    ['i4', 'i5'],
          title:     'Chapter 2: Demo Day Pressure',
          scene:     '⏱️',
          location:  'The Demo Sprint',
          narrative: "Supervisor meeting in 30 minutes. The demo isn't working. You're halfway through a big improvement to a different part of the project. Dev is requesting an urgent fix to the broken piece. 'Two things at once,' Dev says. 'Park the improvement, fix the demo, come back. We can do this.'",
          unlockMsg: "Demo working. Improvement resumed. Supervisor meeting passed. Deep jungle composure."
        },
        {
          levels:    ['i6'],
          title:     'Chapter 3: The Merge Request',
          scene:     '🔍',
          location:  'The Review Chamber',
          narrative: "Prof. Okafor's marking system requires that every piece of work goes through a formal review process before it joins the main project. 'I want a written description of what you built, evidence that it was reviewed, and the reviewer's approval — all in GitLab,' she says. Your part of the project is done. Time to go through the proper process.",
          unlockMsg: "Approved through the proper process. Prof. Okafor marks it as complete. Adventurer path done."
        }
      ],
      levels: {
        i1: {
          scene: '⚔️', location: 'The Group Project Rules Meeting',
          before:  "Eight people working on one shared project without rules. Somebody worked directly on the main shared copy and broke it for everyone. Prof. Okafor's email is firm: 'Document how your team works before anyone touches the project again.' The fix isn't just technical — it's about deciding: who can change what, when, and how does new work get reviewed before it affects everyone else.",
          mission: '"Write down your team\'s workflow rules. Who works on what. How changes are reviewed. No more working directly on the main shared copy."',
          after:   '"Rules written, team briefed, main copy protected. This is what a well-run project looks like." — Prof. Okafor 👩‍🏫'
        },
        i2: {
          scene: '⚔️', location: 'The Conflict Point',
          before:  "You and Dev both worked on the same file last night — different parts of the same thing. When you tried to combine your work this morning, Git stopped and said: 'I can see two different versions of the same section. I don't know which one you want. You need to decide.' Dev explains: 'Read both versions carefully. Understand what each change does. Then write the version that's actually correct — which might be a combination of both.'",
          mission: '"Read both conflicting versions. Decide what the correct version should be. Save your decision."',
          after:   '"Conflict resolved thoughtfully. The project is better for having two people check the same thing." — Dev 🧑‍💻'
        },
        i3: {
          scene: '🔁', location: 'The Clean History Path',
          before:  "Before you submit your work for review, you look at your change record. It reads: 'attempt 1', 'try again', 'finally working', 'small fix', 'another small fix'. Dev says: 'Prof. Okafor looks at commit history when marking. A clean, clear record shows you worked methodically. Git lets you reorganise and tidy your history before you share it — like editing a rough draft before submission.'",
          mission: '"Tidy up your change history into a clear, professional record before sharing it for review."',
          after:   '"Clean history. The record reads like someone who knew what they were doing." — Dev 🧑‍💻'
        },
        i4: {
          scene: '🎒', location: 'The Emergency Stash',
          before:  "You're halfway through a significant improvement to the authentication system when Dev messages: 'The demo server is down and our supervisor meeting is in 30 minutes — can you fix it?' The problem: your half-finished work can't be shared — it would break things. But you can't just abandon it. Dev: 'Park your work in a temporary holding place. Fix the server. Come back to exactly where you left off.'",
          mission: '"Park your unfinished work temporarily, fix the urgent issue, then pick up exactly where you left off."',
          after:   '"Demo fixed in time. Improvement continued exactly where you paused it. That\'s professional composure." — Dev 🧑‍💻'
        },
        i5: {
          scene: '🔍', location: 'The Merge Request Review',
          before:  "Prof. Okafor's module requirement: every piece of work must be submitted for review before it joins the main project. 'Not just a comment saying done — a proper written description: what you built, how you tested it, and what could potentially break.' Dev adds: 'Think of it like a covering letter for your code. Make it easy for the reviewer to understand what they're looking at.'",
          mission: '"Submit your work for review with a clear written description of what you built and how it was tested."',
          after:   '"Reviewed, approved, and merged properly. That\'s the full professional loop." — Prof. Okafor 👩‍🏫'
        },
        i6: {
          scene: '⏮️', location: 'The Undo Ruins',
          before:  "A private database password was accidentally saved in the project files and pushed to the shared online copy. The whole group can see it. Dev: 'This needs to be fixed correctly, not just quickly. There are different ways to undo things in Git and they work differently — one removes it from history entirely, one adds a step that cancels it, one just changes the current version but leaves the history intact. Wrong choice and the password is still findable.'",
          mission: '"Remove the sensitive file from the project history completely — not just from the current version."',
          after:   '"Removed from history, not just hidden. Password rotated. Incident properly resolved." — Prof. Okafor 👩‍🏫'
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
          location:  'The War Room',
          narrative: "The product went down at 2am because someone saved an experimental change directly to the live version. Alex pulls up the history on screen. 'No team rules. Everyone doing whatever they feel like. This is the outcome.' He closes the laptop. 'We fix the immediate problem. Then we write the rules that stop this happening again. That's today's work.'",
          unlockMsg: "Production stable. Team rules written. Alex went back to sleeping through the night."
        },
        {
          levels:    ['i4', 'i5'],
          title:     'Chapter 2: The Sprint',
          scene:     '⏱️',
          location:  'The Sprint Jungle',
          narrative: "You're halfway through a large piece of work when an urgent problem appears in the live product. Alex: 'You can't abandon what you're doing — that would ruin it. But the live issue can't wait either. Git has a way to pause your current work, deal with the emergency, and come back to exactly where you were. That's what we're doing right now.'",
          unlockMsg: "Live issue fixed. In-progress work resumed. Sprint continues on schedule."
        },
        {
          levels:    ['i6'],
          title:     'Chapter 3: The Review Process',
          scene:     '🔍',
          location:  'The Code Review Room',
          narrative: "'From now on,' Alex says, 'nothing goes into the live product without someone else looking at it first. Not because I don't trust you — but because two sets of eyes catch things one misses. This is how all professional teams work.' Your piece is done. Time to go through the proper process.",
          unlockMsg: "Reviewed and approved. Alex says this is now the standard for every piece of work. Adventurer complete."
        }
      ],
      levels: {
        i1: {
          scene: '⚔️', location: 'The Branching Strategy Session',
          before:  "Someone saved an experiment directly to the live product and it went down. Alex traces through what happened. 'No rules. People saving wherever they felt like it. No way to review changes before they went live.' He turns to the whiteboard. 'We're writing the rules today. Who can save where. How new work gets reviewed before it affects the live product. What the process is when something urgent needs to be fixed. These rules protect everyone, including you.'",
          mission: '"Document how your team handles changes: who works where, how work is reviewed, what the process is."',
          after:   '"Written, agreed, and followed. Alex stopped getting 2am calls." — Alex 🧑‍💻'
        },
        i2: {
          scene: '⚔️', location: 'The Conflict Resolution Room',
          before:  "Two team members changed the same part of the product at the same time. When they tried to combine their work, Git stopped and flagged it: 'Two different versions of the same thing. I need you to decide.' Alex: 'This isn't a failure — it's Git doing its job. Read both changes carefully. Understand what each one is trying to do. Then write the version that's actually correct, which might be a combination of both.'",
          mission: '"Read both conflicting changes. Write the version that correctly combines the best of both."',
          after:   '"Resolved by understanding the intent of both changes. That\'s how to do it right." — Alex 🧑‍💻'
        },
        i3: {
          scene: '🔁', location: 'The History Clean-Up',
          before:  "You look at your change record before sharing it for review: 'trying fix', 'maybe', 'actually this', 'oops', 'ok now'. Alex looks at it too. 'I know the work is good. But the record looks chaotic. Before you share this, tidy up the history — reorganise your saves into a clear, logical story of what you built. Git lets you do this before you share. Use it.'",
          mission: '"Reorganise your recent saves into a clean, clear story before sharing for review."',
          after:   '"Clear record. The reviewer can see exactly what changed and why. That\'s a professional submission." — Alex 🧑‍💻'
        },
        i4: {
          scene: '🎒', location: 'The Emergency Stash',
          before:  "You're halfway through a significant improvement to the payment system when Alex messages: 'Critical bug on live — checkout is crashing, customers can\'t buy anything. Need it fixed now.' You can't save your half-finished work — it's not ready and would cause more problems. Alex: 'Park your work. Git has a way to set it aside without losing anything. Fix the live issue. Come back exactly where you left off.'",
          mission: '"Park your unfinished improvement temporarily. Fix the live issue. Return to your parked work after."',
          after:   '"Live fix deployed in 8 minutes. Improvement picked up exactly where you left it." — Alex 🧑‍💻'
        },
        i5: {
          scene: '🔍', location: 'The Pull Request Process',
          before:  "'Nothing goes live without a review,' Alex says. 'Not because your work isn't good — but because that's the rule that keeps the product stable.' He explains what a proper review request looks like: 'A clear description of what you built. What you changed. How you tested it. What could potentially go wrong. Make it easy for the reviewer to understand what they're looking at. Then ask someone specific to review it.'",
          mission: '"Submit your work for review with a clear description. Request a specific person to review it."',
          after:   '"Reviewed, approved, live. No surprises, no rollbacks. That\'s the goal every time." — Alex 🧑‍💻'
        },
        i6: {
          scene: '⏮️', location: 'The Undo Room',
          before:  "A team member accidentally put a private credential file into the shared online copy of the project. Alex's voice is calm but direct: 'We fix this now, correctly. There are several ways to undo things in Git — and they work differently. Some remove from the full history, some just change the current state. We need the right one, or the credential might still be findable even after it looks like it's gone.'",
          mission: '"Remove the credential from the full project history — not just from the latest version."',
          after:   '"Removed from history. Credential reset. Incident properly handled." — Alex 🧑‍💻'
        }
      }
    },

    learner: {
      companion: { name: 'Alex', role: 'Advanced Tutorial · Deep Jungle Series', avatar: '📺', color: '#58a6ff' },
      chapters: [
        {
          levels:    ['i1', 'i2', 'i3'],
          title:     'Chapter 1: Working With Others',
          scene:     '🌿',
          location:  'The Collaboration Jungle',
          narrative: "You posted your project on Reddit and someone offered to help. Two people on the same project without rules broke everything within the first weekend. Alex's advanced tutorial: 'This is the moment every solo developer hits. The tools that kept your project safe for one person need some adjustment for two. Let me show you what changes.'",
          unlockMsg: "Collaboration rules set. Two people working cleanly on the same project. That's the milestone."
        },
        {
          levels:    ['i4', 'i5'],
          title:     'Chapter 2: The Safety Toolkit',
          scene:     '⏱️',
          location:  'The Toolkit Cave',
          narrative: "Alex's next section: 'Every developer — even solo ones — needs these two tools. The ability to pause current work and deal with something urgent without losing anything. And the habit of doing a formal review before adding new work to the main project, even if you're reviewing your own work. These are the habits that make projects last.'",
          unlockMsg: "Safety toolkit acquired. Your project has professional-grade habits now."
        },
        {
          levels:    ['i6'],
          title:     'Chapter 3: The Open Source Door',
          scene:     '🔍',
          location:  'The Open Source Trail',
          narrative: "'If you ever want to contribute to an open source project,' Alex says, 'or work with a team, this is the skill that opens the door. The formal review process — sharing your work, writing a description, getting approval — is how all serious collaborative projects work. Let me show you how it's done.'",
          unlockMsg: "First proper review process completed. The open source door is now open. Adventurer complete."
        }
      ],
      levels: {
        i1: {
          scene: '🌿', location: 'The Two-Person Project',
          before:  "A contributor joined your project. First weekend: they saved something that overwrote your recent work. You weren't even sure it had happened until you looked at the history. Alex: 'Solo projects and team projects need different rules. Not complicated rules — just agreed ones. Who works on what. How you combine work without overwriting each other. That conversation needs to happen before anyone touches the project next.'",
          mission: '"Write down the rules for how you and your contributor will work together."',
          after:   '"Rules agreed. No more overwriting. That\'s what makes collaboration possible." — Alex 📺'
        },
        i2: {
          scene: '⚔️', location: 'The Conflict Point',
          before:  "You were working on two different features of your project on two separate copies. When you tried to bring them together, Git stopped: 'Both copies changed the same section. I don't know which version you want.' It looks alarming, but Alex has a calming perspective: 'This is just Git asking you a question. Read both versions. Understand what each one is trying to do. Then write the version that should actually be there.'",
          mission: '"Read both conflicting versions. Write the correct combined version."',
          after:   '"Resolved. Both features intact. The jungle asked a question and you answered it correctly." — Alex 📺'
        },
        i3: {
          scene: '🔁', location: 'The Clean Slate',
          before:  "You want to share your work but the save history is embarrassing — it's the record of you figuring things out, not a clean account of what you built. Alex: 'Before you share anything with a collaborator or the world, you can tidy up the record. Reorganise your saves into a clean story. The work is the same — but the record reads like someone who knew what they were doing.'",
          mission: '"Tidy up your save history into a clean, clear record before sharing your work."',
          after:   '"Clean record. Anyone reading it will understand what you built." — Alex 📺'
        },
        i4: {
          scene: '🎒', location: 'The Stash Point',
          before:  "You're halfway through building a new page for your portfolio when you notice something is broken on the live version — a bug that visitors can see right now. The problem: you can't save your half-finished page because it would break things. Alex: 'Park your work. Git lets you set unfinished work aside completely safely. Fix the live bug. Come back and continue exactly where you stopped.'",
          mission: '"Park your unfinished work. Fix the live bug. Resume where you left off."',
          after:   '"Bug fixed live. New page continues. Zero work lost." — Alex 📺'
        },
        i5: {
          scene: '🔍', location: 'The Review Habit',
          before:  "Alex: 'Even solo developers benefit from the review habit. Before adding anything to your main project, write a clear note about what it is and what it changes. Then review it — even if you're reviewing your own work. The act of writing the description catches mistakes. This is one of those habits that feels excessive until the day it saves you from shipping something broken.'",
          mission: '"Before adding your new feature to the main project, write a clear description of what it does and review it."',
          after:   '"Review habit established. You\'ll catch things in the description that you missed in the work." — Alex 📺'
        },
        i6: {
          scene: '⏮️', location: 'The Undo Lesson',
          before:  "You accidentally put a private file — one containing an API password — into your public GitHub project. Alex: 'This is the thing that nobody tells you about until it happens. There are several ways to undo things in Git and they\'re not equivalent. Some just change the current state. Some remove things from the full history. For sensitive information, you need full removal — not just hiding it in the current version.'",
          mission: '"Remove the sensitive file from the complete project history — then update your ignore list."',
          after:   '"Removed from history. Key updated. Ignore list updated. Lesson officially learned." — Alex 📺'
        }
      }
    }
  }, // end intermediate

  // ══════════════════════════════════════════════
  //  EXPERT — The Ancient Temple Zone
  // ══════════════════════════════════════════════
  expert: {
    zone:       'The Ancient Temple Zone',
    zoneEmoji:  '🏛️',
    atmosphere: 'Stone corridors. Ancient records. Every technique here was carved out of painful experience.',

    working: {
      companion: { name: 'Sam', role: 'Staff Engineer · The Jungle Sage', avatar: '🧙‍♂️', color: '#f0883e' },
      chapters: [
        {
          levels:    ['e1', 'e2'],
          title:     'Chapter 1: The Mystery Regression',
          scene:     '🕵️',
          location:  'The Corrupted Archive',
          narrative: "Something in the product stopped working — nobody knows exactly when it broke, just that it worked fine at some point in the past. Sam is already looking at the change history. 'We don't guess,' he says. 'We search. There's a method for this that turns a month of uncertainty into six targeted checks. It's called bisect.'",
          unlockMsg: "The broken change found. History cleaned up properly. The temple reveals its next room."
        },
        {
          levels:    ['e3', 'e4'],
          title:     'Chapter 2: The Automated Guardians',
          scene:     '🏗️',
          location:  "The Temple's Inner Sanctum",
          narrative: "Sam explains the philosophy of this section: 'Manual processes fail. People forget, people rush, people have bad days. The best teams build automatic checks that run every time something changes — without anyone having to remember to run them. That's what we're building today.'",
          unlockMsg: "Automatic checks running. The team's quality improved without anyone having to remember to check."
        },
        {
          levels:    ['e5'],
          title:     'Chapter 3: The Workflow Design',
          scene:     '🗺️',
          location:  'The War Room',
          narrative: "Sam sits at the table. 'You know every technique. Now design the system. How should the whole team work? What are the rules? How do changes get reviewed? How are releases handled?' He pushes a blank document across. 'When you finish this, it becomes the law of the jungle for everyone who joins after you.'",
          unlockMsg: "⚡ The workflow is written. Master status earned. The frontier opens ahead."
        }
      ],
      levels: {
        e1: {
          scene: '🕵️', location: 'The Regression Hunt',
          before:  "Something in the product is broken. It wasn't broken six weeks ago — you know that much. Between then and now, 200 changes were made. Checking each one manually would take all week. Sam: 'We use a smarter method. We mark the current broken state as bad. We mark a known-good point in history as good. Then Git does a binary search — cutting the possibilities in half each time. You'll find the exact change that broke it in about six steps.'",
          mission: '"Find the exact change that introduced the problem by systematically halving the possibilities."',
          after:   '"Found in six steps, not two hundred guesses. The method always beats intuition." — Sam 🧙‍♂️'
        },
        e2: {
          scene: '📜', location: 'The History Chamber',
          before:  "The change history for this feature looks like someone's internal monologue: 'trying this', 'nope', 'what if', 'ok maybe', 'finally'. Sam: 'This goes into the permanent record. Other engineers will read it. Future versions of you will read it. Before it becomes permanent, clean it up — combine the messy attempts into clear, logical chapters. The work is the same. The record should tell a story worth reading.'",
          mission: '"Reorganise and combine your recent changes into a clear, well-told story of what you built."',
          after:   '"History that reads like documentation. That\'s the standard." — Sam 🧙‍♂️'
        },
        e3: {
          scene: '🪝', location: 'The Automatic Checks Corridor',
          before:  "The team keeps accidentally saving things that break the automatic quality checks — mostly because they forgot to run the checks before saving. Sam: 'Stop relying on people to remember. Build the check into the saving process itself. Every time anyone saves anything, the check runs automatically. If it fails, the save is blocked until they fix it. One setup, permanent improvement, no more relying on memory.'",
          mission: '"Set up an automatic check that runs every time someone saves a change and blocks bad saves."',
          after:   '"The check runs automatically now. The team\'s quality improved without anyone having to think about it." — Sam 🧙‍♂️'
        },
        e4: {
          scene: '🗺️', location: 'The Nested Projects Library',
          before:  "Your project depends on a shared library — another project that other teams also use. Sam: 'The question is: when that shared library updates, does your project automatically update too? Or do you control when you adopt the changes?' He explains the solution: 'You link to a specific version of the library. It's always clear exactly what version you're using. Unexpected changes to the library can't break your project without your knowledge.'",
          mission: '"Link your project to a specific version of the shared library. Control when you adopt changes."',
          after:   '"Specific version pinned. No more surprise changes from the shared library." — Sam 🧙‍♂️'
        },
        e5: {
          scene: '⚡', location: 'The Strategy Session',
          before:  "Sam puts a blank document in front of you. 'You know the tools. Now design how the whole team should use them. What are the rules for saving changes? How does work get reviewed before it goes live? How are releases announced? What happens when something urgent needs fixing?' He pauses. 'When fifty people all do their own thing, the result is chaos. When they all follow a clear system, the result is remarkable.'",
          mission: '"Design the full team workflow: rules for saving, reviewing, releasing, and handling emergencies."',
          after:   '"The system is designed. Others will follow it for years. That\'s the expert contribution." — Sam 🧙‍♂️'
        }
      }
    },

    learner: {
      companion: { name: 'Alex', role: 'Expert Series · Temple Expedition', avatar: '📺', color: '#f0883e' },
      chapters: [
        {
          levels:    ['e1', 'e2'],
          title:     'Chapter 1: The Detective Work',
          scene:     '🕵️',
          location:  'The Broken History Archive',
          narrative: "Alex's expert tutorial opens on a broken project: 'Something worked two weeks ago. Now it doesn't. There are 50 changes between then and now.' He closes the editor. 'Here's the thing — you don't need to check all 50. There's a method that finds the problem in about six steps, every time. And there's a way to clean up history so it reads like a professional document, not a development diary.'",
          unlockMsg: "Problem found by method, not guessing. History clean. The temple respects the systematic approach."
        },
        {
          levels:    ['e3', 'e4'],
          title:     'Chapter 2: Making Things Automatic',
          scene:     '🏗️',
          location:  'The Automation Room',
          narrative: "Alex: 'At this level, the goal is to stop doing things manually that could happen automatically. Forget to do a quality check? Make it automatic. Unsure which version of a library you're using? Pin it explicitly. The best developers I know spend time setting up systems that make future mistakes impossible — not just fixing current mistakes.'",
          unlockMsg: "Automatic systems in place. Future-you will thank present-you."
        },
        {
          levels:    ['e5'],
          title:     'Chapter 3: The Professional Standard',
          scene:     '⚡',
          location:  'The Expert Summit',
          narrative: "Alex: 'This is the thing that gets self-taught developers hired: documenting how you work. A clear workflow document in your project — how you save changes, how you review work, how you handle releases — tells employers you think like a professional. The techniques you've learned mean nothing without the system that puts them together.'",
          unlockMsg: "⚡ Workflow documented. Expert standard reached. Master complete."
        }
      ],
      levels: {
        e1: {
          scene: '🕵️', location: 'The Broken Build Hunt',
          before:  "Your project's dark mode stopped working. You've no idea when — it was fine two weeks ago, and you've made about 50 changes since. Alex: 'Don't check them one by one — that's the slow way. There's a smarter method. You mark the current broken state, mark a known-good point, and then the tool guides you through a search that cuts the possibilities in half each step. Six rounds and you know exactly which change caused it.'",
          mission: '"Find the exact change that broke the feature by systematically narrowing the possibilities."',
          after:   '"Found in six steps. Not fifty. Method beats guessing every time." — Alex 📺'
        },
        e2: {
          scene: '📜', location: 'The History Clean-Up',
          before:  "You want to share your project openly or show it to potential employers. But the save history is essentially a stream of consciousness: 'trying', 'fix', 'fix2', 'hopefully this'. Alex: 'Before you make something public or put it in a portfolio, the history should tell a clean story. You can reorganise and combine your saves into clear, logical chapters. Same work — professional presentation.'",
          mission: '"Reorganise your project history into a clean, clear record that reads like documentation."',
          after:   '"Clean history. This project now looks like it was built by someone who knew what they were doing." — Alex 📺'
        },
        e3: {
          scene: '🪝', location: 'The Automatic Safety Check',
          before:  "You keep accidentally committing certain things you don't mean to — debug notes left in, private variables, test settings. Alex: 'Stop relying on yourself to remember. Build an automatic check that runs every time you save. If the check fails, the save is blocked. One evening of setup, permanent improvement. The mistake literally becomes impossible.'",
          mission: '"Set up an automatic check that runs every time you save and blocks common mistakes."',
          after:   '"The accidental mistakes are now impossible to make. That\'s better than remembering to check." — Alex 📺'
        },
        e4: {
          scene: '🗺️', location: 'The Dependency Map',
          before:  "Your project uses a library someone else built. Alex: 'The question nobody asks until something breaks: which version of that library are you using? If they update their library and it's not compatible with your project, things silently break.' He explains the solution: 'Pin your project to a specific version of any library it depends on. Then you control when you adopt changes — on your terms, tested first.'",
          mission: '"Pin your project dependencies to specific versions. Take control of when you adopt changes."',
          after:   '"Versions pinned. No more surprise breakages from external updates." — Alex 📺'
        },
        e5: {
          scene: '⚡', location: 'The Portfolio Summit',
          before:  "Alex: 'Here's what gets self-taught developers their first professional role: evidence that they think systematically. Not just writing code — but documenting how they work. How do you save changes? How do you review your own work before sharing it? How do you handle releases? Write that down in your project. It tells interviewers more about your thinking than the code itself does.'",
          mission: '"Write a clear workflow document for your project. Make it readable by someone joining the project cold."',
          after:   '"Workflow documented. Your project now looks like something a professional built and maintains." — Alex 📺'
        }
      }
    },

    school: null,
    uni:    null
  }, // end expert

  // ══════════════════════════════════════════════
  //  INNOVATOR — The Frontier Beyond
  // ══════════════════════════════════════════════
  innovator: {
    zone:       'The Frontier Beyond',
    zoneEmoji:  '🚀',
    atmosphere: 'The jungle ends. Something new begins. These are the tools being invented right now.',

    working: {
      companion: { name: 'Jordan', role: 'Principal Engineer · Frontier Mapper', avatar: '🚀', color: '#d2a8ff' },
      chapters: [
        {
          levels:    ['n1', 'n2', 'n3'],
          title:     'Chapter 1: The New Way of Working',
          scene:     '🚀',
          location:  'The Edge of the Known',
          narrative: "Jordan just got back from a conference. 'Everything is changing,' they say. 'The best teams aren't working the way we worked five years ago. Faster releases. More automation. Less ceremony. I want us to move in this direction — and you're going to lead it.' No existing maps. You're making this one.",
          unlockMsg: "The new way of working is in motion. The frontier gate is open."
        },
        {
          levels:    ['n4', 'n5', 'n6'],
          title:     'Chapter 2: AI as a Teammate',
          scene:     '🤖',
          location:  'The AI Collaboration Zone',
          narrative: "Jordan pulls up a terminal. 'Meet your new teammate.' An AI coding assistant starts working alongside you — writing code, reviewing changes, making suggestions. 'The skill isn't the AI,' Jordan says. 'The skill is directing it clearly, reviewing what it produces critically, and knowing what it can't understand about your specific situation.'",
          unlockMsg: "AI teammate productive. You're directing the work, not just doing it."
        },
        {
          levels:    ['n7', 'n8', 'n9'],
          title:     'Chapter 3: The Platform',
          scene:     '🏗️',
          location:  'The Infrastructure Summit',
          narrative: "Jordan: 'You're not building features anymore — you're building the system that lets other people build features safely, quickly, and confidently.' Automated releases. Quality gates that run without human intervention. Dependency management that doesn't require weekly manual checks. When this works, the team barely notices it — until the day it catches something important.",
          unlockMsg: "The platform runs. The team ships faster and safer. That's the invisible success."
        },
        {
          levels:    ['n10', 'n11'],
          title:     'Chapter 4: The Absolute Edge',
          scene:     '🌐',
          location:  'The Frontier Edge',
          narrative: "Jordan: 'This is where the documentation runs out. The tools in this chapter are for teams working at extreme scale — thousands of changes a week, hundreds of contributors. After this, you're one of the people writing the guides for others.'",
          unlockMsg: "🎉 Innovator complete. You're writing the maps now."
        }
      ],
      levels: {
        n1: {
          scene: '🚀', location: 'The New Way Station',
          before:  "Jordan explains the problem with the current way: 'Every developer works on a separate copy for days or weeks. When they try to combine everyone's work, it's a nightmare — conflicts everywhere, integration problems, half a day lost just combining things. The alternative: everyone works on a single shared version, protected by feature flags and fast automatic checks. Scary at first. Dramatically more productive once you see it work.'",
          mission: '"Set up a working practice where everyone contributes to one shared version, protected by feature flags."',
          after:   '"Shipping ten times today. No conflicts, no integration nightmare. The old way feels very far away now." — Jordan 🚀'
        },
        n2: {
          scene: '🔄', location: 'The Infrastructure-as-Code Station',
          before:  "Jordan: 'Here's a question: when you change how the product works, you use the change history to see exactly what changed, when, and why — right? Why doesn't your infrastructure — your servers, your databases, your settings — have the same history?' They open a file. 'Everything that runs the product should be defined in files, managed the same way as code. Change it? That change is reviewed, recorded, reversible.'",
          mission: '"Define your infrastructure in files managed with the same review process as your code."',
          after:   '"Infrastructure changes are now as auditable as code changes. That\'s a major shift." — Jordan 🚀'
        },
        n3: {
          scene: '📦', location: 'The Monorepo Hub',
          before:  "The team has twenty separate projects, each in its own place. Jordan: 'When a change in one project needs to affect five others, you end up coordinating across twenty different processes. Some teams solve this by keeping everything in one place — one shared home for all their projects. The history is shared. A single change can touch all of them at once. The tooling needs to be set up correctly, but the benefit is significant.'",
          mission: '"Bring multiple related projects under one shared home with unified tooling."',
          after:   '"One home. Twenty projects. Coordinated changes without the coordination nightmare." — Jordan 🚀'
        },
        n4: {
          scene: '🤖', location: 'The AI Workstation',
          before:  "Jordan opens a terminal. 'This is Claude Code — an AI that works alongside you. It can write code, explain code, suggest improvements, and help you think through problems.' A pause. 'The skill is not using it. The skill is using it well. Being specific about what you want. Reviewing what it produces critically. Knowing when to trust it and when to question it.'",
          mission: '"Work with an AI coding assistant to plan and build a feature. Review everything it produces."',
          after:   '"You directed it clearly and reviewed its output critically. That\'s the right relationship with AI." — Jordan 🚀'
        },
        n5: {
          scene: '💬', location: 'The AI Review Station',
          before:  "Jordan: 'AI tools can now review code changes — automatically flagging potential security issues, performance problems, and common mistakes before a human even looks at it. The important thing to understand: the AI knows patterns, but it doesn't know your business. It doesn't know your regulations, your specific users, your unwritten rules. Its job is to catch the obvious things. Your job is to catch what it can't know.'",
          mission: '"Use an AI review tool on a recent change. Note what it caught and what it missed."',
          after:   '"AI caught three things. You caught what it couldn\'t possibly know. That\'s the human-AI review partnership." — Jordan 🚀'
        },
        n6: {
          scene: '🔌', location: 'The Connected AI Station',
          before:  "Jordan: 'Right now, when you ask an AI for help with code, you describe the situation and it answers in the abstract. What if the AI could see your actual project — your files, your recent changes, your test results? That\'s what MCP does. It connects the AI directly to your project context. Instead of describing the problem, the AI can see it.'",
          mission: '"Set up a connection between your AI assistant and your project so it can see your actual context."',
          after:   '"The AI can see your project now. That changes what it\'s able to help with." — Jordan 🚀'
        },
        n7: {
          scene: '🔀', location: 'The Merge Queue',
          before:  "Jordan: 'Thirty people have submitted changes for review. All approved. But if you add them to the main project one at a time, by the time you're on the tenth one, the project has changed so much that the approval for the first one is no longer valid.' She explains: 'A merge queue tests every combination together before any of it goes live. The CI checks the real merged result, not each change in isolation.'",
          mission: '"Set up a queue that tests all pending approved changes together before they go live."',
          after:   '"Thirty changes landed cleanly, all tested in combination. The queue handled what manual checking couldn\'t." — Jordan 🚀'
        },
        n8: {
          scene: '🤖', location: 'The Automated Maintenance Station',
          before:  "Jordan: 'Your project depends on dozens of external libraries. Each one releases updates — some small and safe, some major and potentially breaking, some fixing serious security vulnerabilities. Manually keeping track of all of this is a full-time job. Automated tools can monitor every dependency, flag vulnerabilities immediately, and even automatically update the safe ones while flagging the risky ones for human review.'",
          mission: '"Set up automated dependency monitoring with smart rules for what to update automatically vs manually."',
          after:   '"Vulnerabilities flagged in hours, not weeks. Safe updates automated. The risky ones queued for review." — Jordan 🚀'
        },
        n9: {
          scene: '🚀', location: 'The Automated Release Station',
          before:  "Jordan: 'How does a new version of the product go live at your company right now?' After hearing the answer: 'Anything manual in that process is a risk. A person forgets a step. A person does it differently on a Friday evening than on a Tuesday morning. The goal is a release process where the action of approving a change automatically starts everything — building, testing, announcing, deploying, and verifying — without any further human steps.'",
          mission: '"Build an automated release process: approve, build, test, deploy, verify — no manual steps."',
          after:   '"Every release identical. No forgotten steps. No late-night manual deployments." — Jordan 🚀'
        },
        n10: {
          scene: '🌐', location: 'The Extreme Scale Station',
          before:  "Jordan: 'The tools in this section exist because some organisations have thousands of people contributing hundreds of changes per day. At that scale, standard approaches break down. Partial downloads — only getting the parts of the project you're actually working on. Multiple working versions on the same machine. Techniques that most developers never need — but when you need them, nothing else works.'",
          mission: '"Apply large-scale project techniques to a project that would otherwise be impractical to work with."',
          after:   '"Operating at a scale most developers only read about." — Jordan 🚀'
        },
        n11: {
          scene: '🎯', location: 'The Final Summit',
          before:  "Jordan looks back from the final summit. 'You've been through every level of this — the fundamentals, the team skills, the advanced techniques, the cutting-edge tools. Now put it all together. Design the complete system: how a team of this size saves changes, reviews work, releases software, handles emergencies, and uses AI. This document becomes the playbook.'",
          mission: '"Design the complete development workflow: saving, reviewing, releasing, handling incidents, AI integration."',
          after:   '"🎉 Innovator complete. You\'re not learning from maps anymore. You\'re making them." — Jordan 🚀'
        }
      }
    },

    learner: {
      companion: { name: 'Alex', role: 'Innovator Series · Beyond the Tutorials', avatar: '📺', color: '#d2a8ff' },
      chapters: [
        {
          levels:    ['n1', 'n2', 'n3'],
          title:     'Chapter 1: How the Best Teams Work',
          scene:     '🚀',
          location:  'The Advanced Practice Zone',
          narrative: "Alex opens the innovator series: 'If you're here, the basics are second nature. What we're covering now is how the highest-performing teams actually work day-to-day. Faster releases. More automation. AI assistance. These aren't for big companies only — a solo developer with these habits is more productive than a team of ten without them.'",
          unlockMsg: "Professional-grade working practices acquired. The gap between self-taught and professionally trained just narrowed significantly."
        },
        {
          levels:    ['n4', 'n5', 'n6'],
          title:     'Chapter 2: Working With AI',
          scene:     '🤖',
          location:  'The AI Integration Zone',
          narrative: "'This is the section I get asked about most,' Alex says. 'How do you actually use AI tools effectively in development? Not just asking it questions — having it as a genuine working partner. Writing code with it, having it review your work, connecting it to your actual project context. The skill is direction and critical review, not just using it.'",
          unlockMsg: "AI working partnership established. You're directing, reviewing, and using it effectively."
        },
        {
          levels:    ['n7', 'n8', 'n9'],
          title:     'Chapter 3: Production-Grade Habits',
          scene:     '🏗️',
          location:  'The Professional Habits Lab',
          narrative: "Alex: 'Here's what gets self-taught developers hired: their personal projects look like production software, not experiments. Automated quality checks. Managed dependencies. Proper release processes. When a recruiter or technical interviewer looks at your GitHub, they see a person who thinks like a professional — not just someone who can write code.'",
          unlockMsg: "Your projects now have the habits that make employers take notice."
        },
        {
          levels:    ['n10', 'n11'],
          title:     'Chapter 4: The Frontier',
          scene:     '🌐',
          location:  'The Self-Taught Frontier',
          narrative: "Alex: 'We've covered everything the formal courses skip. Advanced search techniques. AI workflows. Automated systems. Scalability techniques. You didn't learn this from a classroom — you built this understanding yourself.' He looks at the camera. 'That's not a lesser version of professional. That's a different kind of professional. Welcome to the frontier.'",
          unlockMsg: "🎉 Innovator complete. Self-taught to frontier. That's the real achievement."
        }
      ],
      levels: {
        n1: {
          scene: '🚀', location: 'The Advanced Workflow Lab',
          before:  "Alex: 'Most tutorials teach you to work on a separate copy of the project until it's done, then combine it back. That works. But the best-performing solo developers and teams do something different: they work on the main version directly, protected by automated checks and feature flags that hide unfinished work from users. The result: less time combining work, more time actually building things.'",
          mission: '"Set up a working practice where you contribute to the main version directly, protected by feature flags."',
          after:   '"Working directly on the main version, protected by flags. The integration overhead is gone." — Alex 📺'
        },
        n11: {
          scene: '🎯', location: 'The Portfolio Capstone',
          before:  "Alex's final tutorial in the series: 'This is the capstone. Everything you've learned in this series — bring it together in one document: your personal development workflow. How you save changes. How you review your own work. How you release. How you use AI. How you handle problems. Put this in your GitHub profile. It tells people more about you than your code does.'",
          mission: '"Write your complete personal development workflow document. Make it something worth showing to an employer."',
          after:   '"🎉 Innovator complete. Self-taught doesn\'t mean less than. It means you chose your own path — all the way to the frontier." — Alex 📺'
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

/** Get story data for a specific lesson, with life-stage fallback. */
window.getJungleLevelData = function(persona, levelId, lifeStage) {
  const story = window.JUNGLE_STORY?.[persona];
  if (!story) return null;
  const ls = (lifeStage && story[lifeStage]) ? story[lifeStage] : story.working;
  return ls?.levels?.[levelId] ?? null;
};

/** Get current chapter — first with any incomplete levels. */
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

/** Get companion for a persona + life stage. */
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
