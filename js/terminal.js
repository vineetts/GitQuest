// ═══════════════════════════════════════════════
//  GitQuest — Simulated Git Terminal
// ═══════════════════════════════════════════════

const Terminal = (() => {

  let history = [];
  let historyIndex = -1;
  let currentBranch = 'main';
  let repoInitialized = false;
  let stagedFiles = [];
  let workingFiles = ['index.html', 'style.css', 'app.js'];
  let commits = [];
  let stashes = [];
  let tags = [];
  let currentLesson = null;
  let challengeSteps = [];
  let completedChallengeSteps = [];

  const PROMPT_CWD = '~/my-app';

  function init(lessonData) {
    currentLesson = lessonData;
    challengeSteps = [];
    completedChallengeSteps = [];
    resetState();
    const output = document.getElementById('terminal-output');
    if (output) {
      output.innerHTML = '';
      print('info', `GitQuest Terminal — type 'help' for commands`);
      print('info', `Lesson context loaded: ${lessonData?.title || 'Free practice'}`);
      print('', '');
    }
    updatePrompt();
  }

  function resetState() {
    repoInitialized = false;
    stagedFiles = [];
    workingFiles = ['index.html', 'style.css', 'app.js'];
    commits = [];
    stashes = [];
    tags = [];
    currentBranch = 'main';
  }

  function handleKey(e) {
    const input = document.getElementById('terminal-input');
    if (!input) return;

    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      if (cmd) {
        history.unshift(cmd);
        historyIndex = -1;
        execute(cmd);
        input.value = '';
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex] || '';
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = history[historyIndex] || '';
      } else {
        historyIndex = -1;
        input.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      autocomplete(input);
    }
  }

  function execute(rawCmd) {
    print('cmd', `${PROMPT_CWD} (${currentBranch}) $ ${rawCmd}`);

    const parts = rawCmd.trim().split(/\s+/);
    const cmd = parts[0];
    const sub = parts[1];
    const args = parts.slice(2);

    if (cmd === 'clear' || cmd === 'cls') { clear(); return; }
    if (cmd === 'help')  { showHelp(); return; }
    if (cmd === 'pwd')   { print('out', PROMPT_CWD); return; }
    if (cmd === 'ls')    { print('out', workingFiles.join('  ')); return; }
    if (cmd === 'echo')  { print('out', parts.slice(1).join(' ')); return; }

    if (cmd !== 'git') {
      print('err', `command not found: ${cmd}. Type 'help' for git commands.`);
      return;
    }

    handleGit(sub, args, parts);
  }

  function handleGit(sub, args, parts) {
    switch (sub) {

      case 'init':
        repoInitialized = true;
        currentBranch = 'main';
        print('out', `Initialized empty Git repository in ${PROMPT_CWD}/.git/`);
        checkChallengeStep('init');
        break;

      case 'status':
        gitStatus();
        break;

      case 'add':
        gitAdd(args, parts);
        break;

      case 'commit':
        gitCommit(parts);
        break;

      case 'log':
        gitLog(parts);
        break;

      case 'branch':
        gitBranch(args, parts);
        break;

      case 'switch':
        gitSwitch(args, parts);
        break;

      case 'checkout':
        gitCheckout(args, parts);
        break;

      case 'merge':
        gitMerge(args);
        break;

      case 'remote':
        gitRemote(args, parts);
        break;

      case 'push':
        gitPush(args, parts);
        break;

      case 'pull':
        print('out', 'Already up to date.  (simulated)');
        break;

      case 'fetch':
        print('out', 'From https://github.com/you/my-app\n  main  ->  origin/main  (simulated)');
        break;

      case 'clone':
        print('out', `Cloning into '${args[0] || 'repo'}'...  (simulated)\ndone.`);
        break;

      case 'stash':
        gitStash(args, parts);
        break;

      case 'diff':
        gitDiff(args, parts);
        break;

      case 'restore':
        gitRestore(args, parts);
        break;

      case 'reset':
        gitReset(args, parts);
        break;

      case 'revert':
        if (commits.length === 0) { print('err', 'fatal: no commits to revert'); return; }
        const last = commits[commits.length - 1];
        commits.pop();
        commits.push({ id: randSha(), msg: `Revert "${last.msg}"`, branch: currentBranch });
        print('out', `[${currentBranch} ${commits[commits.length-1].id.slice(0,7)}] Revert "${last.msg}"\n 1 file changed`);
        checkChallengeStep('revert');
        break;

      case 'cherry-pick':
        print('out', `[${currentBranch} ${randSha().slice(0,7)}] Cherry-picked commit\n 1 file changed  (simulated)`);
        checkChallengeStep('cherry-pick');
        break;

      case 'rebase':
        gitRebase(args, parts);
        break;

      case 'tag':
        gitTag(args, parts);
        break;

      case 'show':
        gitShow(args);
        break;

      case 'config':
        gitConfig(args, parts);
        break;

      case 'reflog':
        print('head', 'Reflog (simulated):');
        print('out', `${randSha().slice(0,7)} HEAD@{0}: commit: ${commits[commits.length-1]?.msg || 'Initial'}`);
        print('out', `${randSha().slice(0,7)} HEAD@{1}: checkout: moving to ${currentBranch}`);
        print('out', `${randSha().slice(0,7)} HEAD@{2}: rebase (start): checkout main`);
        print('out', `${randSha().slice(0,7)} HEAD@{3}: commit: Previous good state`);
        break;

      case 'bisect':
        gitBisect(args, parts);
        break;

      case 'blame':
        print('head', `git blame output (simulated):`);
        print('branch', `a1b2c3d4 (You  2026-05-11 09:00:00 +0000  1) function main() {`);
        print('branch', `b2c3d4e5 (Amara 2026-05-10 14:30:00 +0000  2)   console.log("hello");`);
        print('branch', `a1b2c3d4 (You  2026-05-11 09:00:00 +0000  3) }`);
        break;

      case 'shortlog':
        print('out', '   3  You\n   2  Amara\n   1  Raj');
        break;

      case 'rm':
        gitRm(args, parts);
        break;

      case 'mv':
        print('out', `Renamed ${args[0] || 'file'} -> ${args[1] || 'newfile'}  (simulated)`);
        break;

      case 'clean':
        print('out', 'Would remove debug.log\nRun with -f to actually remove  (simulated)');
        break;

      case 'submodule':
        print('out', 'Submodule management  (simulated)\nUse: git submodule add <url>');
        break;

      default:
        print('err', `git: '${sub}' is not a git command. See 'git help'.`);
        print('info', `Common commands: init, status, add, commit, log, branch, switch, merge, push, pull, stash, rebase, cherry-pick, tag, reflog`);
    }

    // Update visualizer if game is active
    if (window.App) {
      App.onTerminalCommand(sub, args, parts);
    }
  }

  // ── Git subcommand implementations ────────────

  function gitStatus() {
    if (!repoInitialized) { print('err', 'fatal: not a git repository'); return; }
    print('head', `On branch ${currentBranch}`);
    if (commits.length === 0) print('info', '\nNo commits yet\n');

    if (stagedFiles.length > 0) {
      print('out', '\nChanges to be committed:');
      print('info', '  (use "git restore --staged <file>" to unstage)');
      stagedFiles.forEach(f => print('branch', `\tnew file:   ${f}`));
    }

    const unstaged = workingFiles.filter(f => !stagedFiles.includes(f));
    if (unstaged.length > 0) {
      print('out', '\nUntracked files:');
      print('info', '  (use "git add <file>..." to include in what will be committed)');
      unstaged.forEach(f => print('err', `\t${f}`));
    }

    if (stagedFiles.length === 0 && unstaged.length === 0) {
      print('out', 'nothing to commit, working tree clean');
    }
  }

  function gitAdd(args, parts) {
    if (!repoInitialized) { print('err', 'fatal: not a git repository'); return; }
    const target = args[0] || parts[2];

    if (target === '.' || target === '-A' || target === '--all') {
      stagedFiles = [...workingFiles];
      print('out', '');
    } else if (target) {
      if (!workingFiles.includes(target)) {
        print('err', `fatal: pathspec '${target}' did not match any files`);
        return;
      }
      if (!stagedFiles.includes(target)) stagedFiles.push(target);
      print('out', '');
    } else {
      print('err', 'Nothing specified, nothing added.');
      return;
    }

    checkChallengeStep('stage');
  }

  function gitCommit(parts) {
    if (!repoInitialized) { print('err', 'fatal: not a git repository'); return; }
    if (stagedFiles.length === 0) { print('err', 'nothing to commit, working tree clean'); return; }

    const mFlag = parts.indexOf('-m');
    let msg = 'Update';
    if (mFlag !== -1 && parts[mFlag + 1]) {
      msg = parts.slice(mFlag + 1).join(' ').replace(/^"|"$/g, '').replace(/^'|'$/g, '');
    }

    const sha = randSha();
    commits.push({ id: sha, msg, branch: currentBranch });
    const count = stagedFiles.length;
    stagedFiles = [];

    print('out', `[${currentBranch} ${sha.slice(0,7)}] ${msg}`);
    print('out', ` ${count} file${count > 1 ? 's' : ''} changed`);

    checkChallengeStep('commit');
    if (window.App) App.awardAchievement('first_commit');
  }

  function gitLog(parts) {
    if (!repoInitialized) { print('err', 'fatal: not a git repository'); return; }
    if (commits.length === 0) { print('info', 'No commits yet.'); return; }

    const oneline = parts.includes('--oneline') || parts.includes('-1');

    [...commits].reverse().forEach(c => {
      if (oneline) {
        print('branch', `${c.id.slice(0,7)} (HEAD -> ${c.branch}) ${c.msg}`);
      } else {
        print('head', `commit ${c.id}`);
        print('out', `Author: You <you@email.com>`);
        print('out', `Date:   ${new Date().toUTCString()}\n`);
        print('out', `    ${c.msg}\n`);
      }
    });
  }

  function gitBranch(args, parts) {
    if (!repoInitialized) { print('err', 'fatal: not a git repository'); return; }

    const deleteFlag = parts.includes('-d') || parts.includes('-D');
    const branchName = args.find(a => !a.startsWith('-'));

    if (deleteFlag && branchName) {
      print('out', `Deleted branch ${branchName}`);
      return;
    }

    if (branchName) {
      print('out', `Branch '${branchName}' created`);
      checkChallengeStep('branch');
    } else {
      print('branch', `* ${currentBranch}`);
      print('out', '  main');
    }
  }

  function gitSwitch(args, parts) {
    if (!repoInitialized) { print('err', 'fatal: not a git repository'); return; }

    const createFlag = parts.includes('-c') || parts.includes('-C');
    const targetIdx = args.findIndex(a => !a.startsWith('-'));
    const target = args[targetIdx];

    if (!target) { print('err', 'fatal: no branch name given'); return; }

    if (createFlag) {
      currentBranch = target;
      print('out', `Switched to a new branch '${target}'`);
      checkChallengeStep('branch');
    } else {
      currentBranch = target;
      print('out', `Switched to branch '${target}'`);
    }
    updatePrompt();
  }

  function gitCheckout(args, parts) {
    if (!repoInitialized) { print('err', 'fatal: not a git repository'); return; }

    const createFlag = parts.includes('-b') || parts.includes('-B');
    const target = args.find(a => !a.startsWith('-'));
    if (!target) { print('err', 'fatal: no target given'); return; }

    if (createFlag) {
      currentBranch = target;
      print('out', `Switched to a new branch '${target}'`);
      checkChallengeStep('branch');
    } else {
      currentBranch = target;
      print('out', `Switched to branch '${target}'`);
    }
    updatePrompt();
  }

  function gitMerge(args) {
    if (!repoInitialized) { print('err', 'fatal: not a git repository'); return; }
    const target = args.find(a => !a.startsWith('-'));
    if (!target) { print('err', 'Merge requires a branch name'); return; }

    if (target === '--abort') { print('out', 'Merge aborted.'); return; }

    const sha = randSha();
    commits.push({ id: sha, msg: `Merge branch '${target}'`, branch: currentBranch });
    print('out', `Merge made by the 'ort' strategy.\n 1 file changed, 3 insertions(+)`);
    checkChallengeStep('merge');
  }

  function gitRemote(args, parts) {
    if (args[0] === 'add') {
      print('out', `Remote '${args[1] || 'origin'}' added  (simulated)`);
    } else if (args[0] === '-v' || args[0] === 'show') {
      print('out', 'origin  https://github.com/you/my-app.git (fetch)\norigin  https://github.com/you/my-app.git (push)');
    } else {
      print('out', 'origin');
    }
  }

  function gitPush(args, parts) {
    if (!repoInitialized) { print('err', 'fatal: not a git repository'); return; }
    if (commits.length === 0) { print('err', 'error: nothing to push'); return; }

    const force = parts.includes('--force') || parts.includes('-f');
    const forceLease = parts.includes('--force-with-lease');

    if (force && !forceLease) {
      print('err', '⚠️  Warning: --force rewrites remote history. Consider --force-with-lease instead.');
    }

    print('out', `Enumerating objects: ${commits.length * 3}, done.`);
    print('out', `To https://github.com/you/my-app.git`);
    print('branch', `   ${randSha().slice(0,7)}..${randSha().slice(0,7)}  ${currentBranch} -> ${currentBranch}`);
    checkChallengeStep('push');
  }

  function gitStash(args, parts) {
    if (!repoInitialized) { print('err', 'fatal: not a git repository'); return; }

    const sub = args[0];
    if (!sub || sub === 'push') {
      if (stagedFiles.length === 0 && workingFiles.length === 0) {
        print('info', 'No local changes to save');
        return;
      }
      const mIdx = parts.indexOf('-m');
      const label = mIdx !== -1 ? parts.slice(mIdx + 1).join(' ').replace(/"/g, '') : `stash@{${stashes.length}}`;
      stashes.push({ label, files: [...stagedFiles] });
      stagedFiles = [];
      print('out', `Saved working directory and index state On ${currentBranch}: ${label}`);
      checkChallengeStep('stash');
      App?.awardAchievement('stash_ninja');
    } else if (sub === 'pop') {
      if (stashes.length === 0) { print('info', 'No stash entries found.'); return; }
      const s = stashes.pop();
      stagedFiles = s.files;
      print('out', `On branch ${currentBranch}`);
      print('out', `Changes not staged for commit:`);
      s.files.forEach(f => print('out', `\tmodified: ${f}`));
      print('out', `Dropped stash@{0}`);
    } else if (sub === 'list') {
      if (stashes.length === 0) { print('info', 'No stash entries.'); return; }
      stashes.forEach((s, i) => print('out', `stash@{${i}}: WIP on ${currentBranch}: ${s.label}`));
    } else if (sub === 'drop') {
      stashes.pop();
      print('out', 'Dropped stash@{0}');
    } else if (sub === 'apply') {
      if (stashes.length === 0) { print('info', 'No stash entries found.'); return; }
      print('out', 'Applied stash (files restored, stash kept)');
    } else {
      print('err', `git stash: unknown subcommand: ${sub}`);
    }
  }

  function gitDiff(args, parts) {
    if (!repoInitialized) { print('err', 'fatal: not a git repository'); return; }
    const staged = parts.includes('--staged') || parts.includes('--cached');
    const files = staged ? stagedFiles : workingFiles;

    if (files.length === 0) { print('out', '(no changes to show)'); return; }

    files.slice(0,1).forEach(f => {
      print('head', `diff --git a/${f} b/${f}`);
      print('out', `--- a/${f}\n+++ b/${f}`);
      print('out', `@@ -1,3 +1,4 @@`);
      print('branch', ` function main() {`);
      print('branch', `+  // New line added`);
      print('branch', `   console.log("hello");`);
      print('branch', ` }`);
    });
  }

  function gitRestore(args, parts) {
    if (!repoInitialized) { print('err', 'fatal: not a git repository'); return; }
    const staged = parts.includes('--staged');
    const file = args.find(a => !a.startsWith('-'));

    if (staged) {
      if (file) {
        stagedFiles = stagedFiles.filter(f => f !== file);
        print('out', `Unstaged ${file}`);
      } else {
        stagedFiles = [];
        print('out', 'All files unstaged');
      }
    } else {
      print('out', `Restored ${file || 'files'} from HEAD`);
    }
  }

  function gitReset(args, parts) {
    if (!repoInitialized) { print('err', 'fatal: not a git repository'); return; }
    const hard = parts.includes('--hard');
    const soft = parts.includes('--soft');

    if (commits.length === 0) { print('info', 'Nothing to reset — no commits yet.'); return; }

    if (hard) {
      commits.pop();
      stagedFiles = [];
      print('err', '⚠️  HEAD is now at ' + (commits[commits.length-1]?.id.slice(0,7) || 'initial') + ' (destructive reset)');
    } else {
      const c = commits.pop();
      print('out', `Unstaged changes after reset:\nM\t${stagedFiles[0] || 'files'}`);
    }
    checkChallengeStep('reset');
    App?.awardAchievement('time_traveler');
  }

  function gitRebase(args, parts) {
    if (!repoInitialized) { print('err', 'fatal: not a git repository'); return; }

    if (args[0] === '--abort') { print('out', 'Rebase aborted. HEAD back to original.'); return; }
    if (args[0] === '--continue') { print('out', 'Continuing rebase after conflict resolution...'); return; }
    if (parts.includes('-i') || parts.includes('--interactive')) {
      print('head', 'Interactive rebase (simulated — in real Git this opens your $EDITOR)');
      print('out', 'pick a1b2c3d First commit\nsquash b2c3d4e WIP more work\nsquash c3d4e5f fix typo\n\n# Reorder and save to apply');
      print('info', '(Simulate: changed to squash — all commits combined into one)');
      print('out', `\nSuccessfully rebased and updated refs/heads/${currentBranch}`);
      App?.awardAchievement('rebaser');
      return;
    }

    const target = args.find(a => !a.startsWith('-')) || 'main';
    print('out', `Successfully rebased and updated refs/heads/${currentBranch} onto ${target}.`);
    checkChallengeStep('rebase');
  }

  function gitTag(args, parts) {
    const annotated = parts.includes('-a');
    const tagName = args.find(a => !a.startsWith('-'));

    if (!tagName) {
      if (tags.length === 0) { print('info', '(no tags)'); return; }
      tags.forEach(t => print('out', t));
      return;
    }

    tags.push(tagName);
    print('out', `Tag '${tagName}' created`);
  }

  function gitShow(args) {
    const target = args[0] || 'HEAD';
    const c = commits[commits.length - 1];
    if (!c) { print('info', 'No commits to show.'); return; }

    print('head', `commit ${c.id}`);
    print('out', `Author: You <you@email.com>\nDate:   ${new Date().toUTCString()}\n\n    ${c.msg}\n`);
    print('out', 'diff --git a/app.js b/app.js\n--- a/app.js\n+++ b/app.js\n@@ -1 +1,2 @@\n function main() {}\n+// updated');
  }

  function gitConfig(args, parts) {
    if (args[0] === '--global' || args[0] === '--local') {
      const key = args[1];
      const val = args.slice(2).join(' ').replace(/"/g, '');
      if (key && val) {
        print('out', `Set ${key} = ${val}`);
      } else if (key) {
        print('out', `${key}: <not set>`);
      } else {
        print('info', 'Usage: git config --global user.name "Your Name"');
      }
    } else if (args[0] === '--list' || args[0] === '-l') {
      print('out', 'user.name=Git Developer\nuser.email=dev@example.com\ncore.editor=vim\ncore.autocrlf=false');
    } else {
      print('info', 'Usage: git config [--global] <key> <value>');
    }
  }

  function gitRm(args, parts) {
    const cached = parts.includes('--cached');
    const file = args.find(a => !a.startsWith('-'));
    if (cached) {
      print('out', `rm '${file}' (untracked from git, file kept on disk)`);
    } else {
      print('out', `rm '${file}'`);
    }
  }

  function gitBisect(args, parts) {
    const sub = args[0];
    if (sub === 'start') { print('out', 'Status: waiting for both good and bad commits'); return; }
    if (sub === 'bad')   { print('out', 'Status: waiting for good commit(s), bad commit known'); return; }
    if (sub === 'good')  {
      print('out', `Bisecting: ~7 revisions left to test\n[${randSha().slice(0,7)}] Midpoint commit`);
      return;
    }
    if (sub === 'reset') { print('out', `HEAD is now at ${commits[commits.length-1]?.id.slice(0,7) || 'HEAD'}`); return; }
    if (sub === 'run')   { print('out', `Running: ${args.slice(1).join(' ')}\n...binary search in progress...\n${randSha().slice(0,7)} is the first bad commit`); App?.awardAchievement('bisect_detective'); return; }
    print('info', 'Usage: git bisect start | bad | good <sha> | reset | run <cmd>');
  }

  // ── UI helpers ────────────────────────────────

  function print(type, text) {
    const out = document.getElementById('terminal-output');
    if (!out) return;

    const classMap = {
      cmd: 't-cmd', out: 't-out', err: 't-err',
      info: 't-info', head: 't-head', branch: 't-branch',
      '': 't-prompt'
    };

    const div = document.createElement('div');
    div.className = `t-line ${classMap[type] || ''}`;
    div.textContent = text;
    out.appendChild(div);
    out.scrollTop = out.scrollHeight;
  }

  function clear() {
    const out = document.getElementById('terminal-output');
    if (out) out.innerHTML = '';
  }

  function updatePrompt() {
    const p = document.getElementById('terminal-prompt');
    if (p) p.textContent = `${PROMPT_CWD} (${currentBranch}) $ `;
  }

  function autocomplete(input) {
    const val = input.value;
    const cmds = ['git init', 'git status', 'git add .', 'git add', 'git commit -m ""',
                   'git log', 'git log --oneline', 'git branch', 'git switch -c ',
                   'git switch main', 'git merge', 'git push', 'git pull', 'git stash',
                   'git stash pop', 'git stash list', 'git rebase', 'git rebase -i',
                   'git cherry-pick', 'git tag', 'git diff', 'git restore', 'git reset',
                   'git revert', 'git remote add origin', 'git reflog', 'git bisect'];
    const match = cmds.find(c => c.startsWith(val) && c !== val);
    if (match) input.value = match;
  }

  function showHelp() {
    print('head', '═══ GitQuest Terminal Commands ═══');
    print('out', '');
    print('info', 'SETUP');
    print('out', '  git init                     Initialize a repository');
    print('out', '  git config --global user.name "Name"');
    print('out', '');
    print('info', 'STAGING & COMMITTING');
    print('out', '  git status                   Show working tree status');
    print('out', '  git add <file>               Stage a file');
    print('out', '  git add .                    Stage all changes');
    print('out', '  git commit -m "message"      Create a commit');
    print('out', '  git log / git log --oneline  View history');
    print('out', '  git diff [--staged]          Show changes');
    print('out', '');
    print('info', 'BRANCHES');
    print('out', '  git branch                   List branches');
    print('out', '  git switch -c <name>         Create + switch branch');
    print('out', '  git merge <branch>           Merge a branch');
    print('out', '');
    print('info', 'REMOTE');
    print('out', '  git remote add origin <url>  Add remote');
    print('out', '  git push -u origin main      Push with upstream');
    print('out', '  git pull                     Pull changes');
    print('out', '');
    print('info', 'ADVANCED');
    print('out', '  git stash / stash pop        Save/restore WIP');
    print('out', '  git rebase -i HEAD~N         Interactive rebase');
    print('out', '  git cherry-pick <sha>        Apply specific commit');
    print('out', '  git revert <sha>             Undo a commit safely');
    print('out', '  git reset HEAD~1             Undo last commit');
    print('out', '  git reflog                   History of HEAD movements');
    print('out', '  git bisect start/bad/good    Binary search for bugs');
    print('out', '  git tag -a v1.0 -m "msg"     Create release tag');
    print('out', '');
    print('info', 'UTILITY');
    print('out', '  clear                        Clear terminal');
    print('out', '  help                         Show this help');
  }

  function checkChallengeStep(action) {
    if (!window.App) return;
    App.onChallengeAction(action);
  }

  function randSha() {
    return Math.random().toString(16).slice(2, 10) +
           Math.random().toString(16).slice(2, 10);
  }

  function getCurrentBranch() { return currentBranch; }
  function getCommits() { return commits; }

  return { init, handleKey, execute, print, clear, getCurrentBranch, getCommits };
})();
