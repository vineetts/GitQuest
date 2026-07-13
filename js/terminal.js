// ═══════════════════════════════════════════════
//  Git Energy — Simulated Git Terminal
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
  let branches = ['main'];              // all known local branch names
  let conflictBranches = new Set();     // branch names that produce a conflict on merge
  let pendingBlockedCmd = null;         // raw cmd awaiting continue/back choice from user
  let currentLesson = null;
  let challengeSteps = [];
  let completedChallengeSteps = [];

  // Tracks an active merge conflict in the simulated repo
  // null when no conflict is active
  // { branch: string, file: string, resolved: boolean }
  let conflictState = null;

  const PROMPT_CWD = '~/my-app';

  function init(lessonData) {
    currentLesson = lessonData;
    challengeSteps = [];
    completedChallengeSteps = [];
    resetState();

    // ── Auto-initialize repo for mid-workflow lessons ──────────
    // If the lesson's terminal-practice tasks don't include 'git init',
    // the scenario assumes a repo already exists — pre-set it up so
    // commands work without the user needing to run git init first.
    autoInitIfNeeded(lessonData);

    const output = document.getElementById('terminal-output');
    if (output) {
      output.innerHTML = '';
      print('info', `Git Energy Terminal — type 'help' for commands`);
      print('info', `Lesson: ${lessonData?.title || 'Free practice'}`);
      if (repoInitialized && commits.length > 0) {
        print('info', `Repository already set up — ${commits.length} commits on ${currentBranch}`);
      }
      print('', '');
    }
    updatePrompt();
  }

  // Scans lesson terminal-practice tasks. If none of them is 'git init',
  // the lesson starts mid-workflow → initialize the repo and set up any
  // branches that will be referenced by the tasks.
  // Also detects conflict-producing branches via pattern analysis.
  function autoInitIfNeeded(lessonData) {
    const tpStep = (lessonData?.steps || []).find(s => s.type === 'terminal-practice');
    if (!tpStep || !tpStep.tasks?.length) return;

    const allCmds = tpStep.tasks.map(t => (t.command || '').trim());
    const needsInit = allCmds.some(c => c === 'git init' || c.startsWith('git init '));
    if (needsInit) return; // lesson teaches init from scratch — don't pre-empt

    // Pre-initialize with realistic baseline state
    repoInitialized = true;
    commits = [
      { id: randSha(), msg: 'Initial commit',    branch: 'main' },
      { id: randSha(), msg: 'Add project files', branch: 'main' },
      { id: randSha(), msg: 'Update styles',     branch: 'main' }
    ];
    stagedFiles  = [];
    workingFiles = ['index.html', 'style.css', 'app.js'];

    // Pre-create branches referenced by 'git merge <branch>'
    // and detect which ones should produce conflicts
    allCmds.forEach((cmd, idx) => {
      const m = cmd.match(/^git merge ([\w\-\/\.]+)/);
      if (!m || !m[1]) return;
      const branchName = m[1];
      if (['--abort', '--continue', '--no-ff'].includes(branchName)) return;

      // Register this branch
      commits.push({ id: randSha(), msg: `Feature: ${branchName}`, branch: branchName });
      if (!branches.includes(branchName)) branches.push(branchName);

      // ── Conflict detection ────────────────────────────────
      // A branch produces a conflict if:
      // (a) its name contains "conflict", OR
      // (b) the tasks after this merge include a 'cat <file>' task AND
      //     a 'git add <file>' task — the classic resolve-and-stage pattern
      if (branchName.includes('conflict')) {
        conflictBranches.add(branchName);
        return;
      }
      const postMergeCmds = allCmds.slice(idx + 1);
      const hasCat = postMergeCmds.some(c => c.startsWith('cat '));
      const hasAdd = postMergeCmds.some(c => /^git add\s/.test(c));
      if (hasCat && hasAdd) {
        conflictBranches.add(branchName);
      }
    });

    // Pre-create branches for switch tasks too
    allCmds.forEach(cmd => {
      const switchM = cmd.match(/^git (?:switch|checkout) (?:-c\s+)?([\w\-\/\.]+)/);
      if (switchM && switchM[1] && !switchM[1].startsWith('-')) {
        if (!branches.includes(switchM[1])) branches.push(switchM[1]);
      }
    });

    // If tasks include a commit but no add, pre-stage files so commit works
    const hasStagingTask = allCmds.some(c => c.startsWith('git add'));
    const hasCommitTask  = allCmds.some(c => c.startsWith('git commit'));
    if (hasCommitTask && !hasStagingTask) {
      stagedFiles = ['app.js'];
    }
  }

  function resetState() {
    repoInitialized  = false;
    stagedFiles      = [];
    workingFiles     = ['index.html', 'style.css', 'app.js'];
    commits          = [];
    stashes          = [];
    tags             = [];
    branches         = ['main'];
    currentBranch    = 'main';
    conflictState    = null;
    conflictBranches = new Set();
    pendingBlockedCmd = null;
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
    // ── Handle pending pre-req interactive choice ─────────────
    // If the user previously typed a command that skipped ahead and we asked
    // "continue or back?", intercept the response here.
    if (pendingBlockedCmd !== null) {
      const lc = rawCmd.trim().toLowerCase();
      print('cmd', `${PROMPT_CWD} (${currentBranch}) $ ${rawCmd}`);
      if (lc === '1' || lc === 'continue' || lc === 'yes') {
        print('info', '↩  Proceeding — marking task complete.');
        const saved = pendingBlockedCmd;
        pendingBlockedCmd = null;
        setTimeout(() => { if (typeof App !== 'undefined') App.forceCompleteTask(saved); }, 20);
        return;
      }
      if (lc === '2' || lc === 'back' || lc === 'no') {
        print('info', '↩  Scrolling to the required step — complete it first.');
        pendingBlockedCmd = null;
        setTimeout(() => { if (typeof App !== 'undefined') App.scrollToBlockingTask(); }, 20);
        return;
      }
      // Any other input — clear the pending state and fall through to normal processing
      pendingBlockedCmd = null;
    }

    // Handle compound commands (cmd1 && cmd2)
    if (rawCmd.includes(' && ')) {
      // Check practice task with FULL compound string first
      setTimeout(() => { if (typeof App !== 'undefined') App.checkTerminalTask(rawCmd); }, 20);
      // Then execute each part individually in the terminal
      rawCmd.split(' && ').forEach(part => execute(part.trim()));
      return;
    }

    print('cmd', `${PROMPT_CWD} (${currentBranch}) $ ${rawCmd}`);
    // Notify terminal-practice tracker for ALL commands (git and shell)
    setTimeout(() => { if (typeof App !== 'undefined') App.checkTerminalTask(rawCmd); }, 20);

    const parts = rawCmd.trim().split(/\s+/);
    const cmd = parts[0];
    const sub = parts[1];
    const args = parts.slice(2);

    if (cmd === 'clear' || cmd === 'cls') { clear(); return; }
    if (cmd === 'help')  { showHelp(); return; }
    if (cmd === 'pwd')   { print('out', PROMPT_CWD); return; }
    if (cmd === 'ls')    { print('out', workingFiles.join('  ')); return; }
    if (cmd === 'echo')  {
      const rest = parts.slice(1).join(' ');
      // Simulate echo >> file (append redirect)
      const appendMatch = rest.match(/^"?([^"]*)"?\s*>>\s*(\S+)$/);
      if (appendMatch) {
        if (!workingFiles.includes(appendMatch[2])) workingFiles.push(appendMatch[2]);
        print('out', `(appended to ${appendMatch[2]})`);
      } else {
        print('out', rest.replace(/^["']|["']$/g, ''));
      }
      return;
    }
    if (cmd === 'mkdir') {
      const dir = parts[1] || 'new-folder';
      print('out', `Created directory: ${dir}/`);
      return;
    }
    if (cmd === 'cd')    {
      const dir = parts[1] || '~';
      print('out', `(changed to ${dir})`);
      return;
    }
    if (cmd === 'touch') {
      const files = parts.slice(1);
      files.forEach(f => { if (!workingFiles.includes(f)) workingFiles.push(f); });
      print('out', files.length ? `Created: ${files.join(', ')}` : '(no filename given)');
      return;
    }
    if (cmd === 'cat') {
      const file = parts[1];
      if (!file) { print('err', 'cat: missing file operand'); return; }

      // Show conflict markers when this file is actively conflicted
      if (conflictState && !conflictState.resolved && file === conflictState.file) {
        print('out', `<<<<<<< HEAD`);
        print('branch', `function getConfig() {`);
        print('branch', `  return { theme: 'dark', version: '2.0' };`);
        print('branch', `}`);
        print('out', `=======`);
        print('err',  `function getConfig() {`);
        print('err',  `  return { theme: 'light', timeout: 3000 };`);
        print('err',  `}`);
        print('out', `>>>>>>> ${conflictState.branch}`);
        return;
      }
      if (file && (workingFiles.includes(file) || (conflictState && file === conflictState.file))) {
        print('out', `[contents of ${file}]`);
      } else {
        print('err', `cat: ${file}: No such file or directory`);
      }
      return;
    }
    if (cmd === 'nano' || cmd === 'vim' || cmd === 'vi') {
      const file = parts[1] || 'file';
      print('info', `(Simulated: ${cmd} ${file} — edit the file in the conflict resolver above)`);
      return;
    }

    if (cmd !== 'git') {
      print('err', `command not found: ${cmd}. Type 'help' for git commands.`);
      return;
    }

    // Guard: if repo not initialized, guide the learner with interactive choice
    if (!repoInitialized && !['init', 'clone', 'config', 'help', 'version'].includes(sub)) {
      const tpStep = (currentLesson?.steps || []).find(s => s.type === 'terminal-practice');
      const initTask = (tpStep?.tasks || []).find(t => t.command?.startsWith('git init'));
      print('err', 'fatal: not a git repository (or any of the parent directories): .git');
      print('out', '');
      if (initTask) {
        print('info', '⚠️  No repository yet — you need to run  git init  first.');
        print('info', `    Look at Task 1 in the panel above and run:  git init`);
      } else {
        print('info', '⚠️  No repository detected in this directory.');
        print('info', `    Run  git init  to create one, or  git clone <url>  to copy an existing repo.`);
      }
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
        if (commits.length === 0) {
          print('out', `From https://github.com/you/my-app`);
          print('out', ` * branch            ${currentBranch}     -> FETCH_HEAD`);
        }
        print('out', 'Already up to date.');
        checkChallengeStep('pull');
        break;

      case 'fetch':
        print('out', `From https://github.com/you/my-app`);
        print('branch', `   ${randSha().slice(0,7)}..${randSha().slice(0,7)}  ${currentBranch} -> origin/${currentBranch}`);
        checkChallengeStep('fetch');
        break;

      case 'clone':
        print('out', `Cloning into '${args[0] || 'repo'}'...`);
        print('out', `remote: Enumerating objects: 10, done.`);
        print('out', `remote: Counting objects: 100% (10/10), done.`);
        print('out', `Receiving objects: 100% (10/10), 1.24 KiB | 1.24 MiB/s, done.`);
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
        const cpSha = randSha();
        commits.push({ id: cpSha, msg: `Cherry-picked commit`, branch: currentBranch });
        print('out', `[${currentBranch} ${cpSha.slice(0,7)}] Cherry-picked commit`);
        print('out', ` 1 file changed, 4 insertions(+)`);
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
        print('out', `${randSha().slice(0,7)} HEAD@{0}: commit: ${commits[commits.length-1]?.msg || 'Initial'}`);
        print('out', `${randSha().slice(0,7)} HEAD@{1}: checkout: moving to ${currentBranch}`);
        print('out', `${randSha().slice(0,7)} HEAD@{2}: rebase (start): checkout main`);
        print('out', `${randSha().slice(0,7)} HEAD@{3}: commit: Previous good state`);
        break;

      case 'bisect':
        gitBisect(args, parts);
        break;

      case 'blame':
        print('branch', `${randSha().slice(0,8)} (You   2026-05-11 09:00:00 +0000  1) function main() {`);
        print('branch', `${randSha().slice(0,8)} (Amara 2026-05-10 14:30:00 +0000  2)   console.log("hello");`);
        print('branch', `${randSha().slice(0,8)} (You   2026-05-11 09:00:00 +0000  3) }`);
        break;

      case 'shortlog':
        print('out', '   3  You\n   2  Amara\n   1  Raj');
        break;

      case 'rm':
        gitRm(args, parts);
        break;

      case 'mv':
        print('out', `${args[0] || 'file'} -> ${args[1] || 'newfile'}`);
        break;

      case 'clean':
        if (parts.includes('-f') || parts.includes('--force')) {
          print('out', 'Removing debug.log');
        } else {
          print('out', 'Would remove debug.log');
          print('info', 'hint: use -f to actually remove untracked files');
        }
        break;

      case 'submodule':
        if (args[0] === 'add') {
          print('out', `Cloning into '${args[1] || 'submodule'}'...`);
          print('out', `remote: Counting objects: 100% done.`);
        } else {
          print('out', 'Entering \'submodule\'');
        }
        break;

      default:
        print('err', `git: '${sub}' is not a git command. See 'git help'.`);
        print('info', `Common commands: init, status, add, commit, log, branch, switch, merge, push, pull, stash, rebase, cherry-pick, tag, reflog`);
    }

    // Update visualizer if game is active
    if (typeof App !== 'undefined') {
      App.onTerminalCommand(sub, args, parts);
    }
  }

  // ── Git subcommand implementations ────────────

  function gitStatus() {
    print('head', `On branch ${currentBranch}`);
    if (commits.length === 0) {
      print('info', 'No commits yet');
      print('out', '');
    } else {
      print('out', `Your branch is up to date with 'origin/${currentBranch}'.`);
      print('out', '');
    }

    // Show merge conflict state
    if (conflictState && !conflictState.resolved) {
      print('err', '\nYou have unmerged paths.');
      print('info', '  (fix conflicts and run "git add <file>", then "git commit")');
      print('info', '  (use "git merge --abort" to abort the merge)\n');
      print('out', 'Unmerged paths:');
      print('info', '  (use "git add <file>..." to mark resolution)');
      print('err', `\tboth modified:   ${conflictState.file}`);
      return;
    }
    if (conflictState?.resolved) {
      print('out', '\nAll conflicts fixed but you are still merging.');
      print('info', '  (use "git commit" to conclude the merge)\n');
      print('out', 'Changes to be committed:');
      print('branch', `\tmodified:   ${conflictState.file}`);
      return;
    }

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
    const target = args[0] || parts[2];

    if (target === '.' || target === '-A' || target === '--all') {
      stagedFiles = [...workingFiles];
      // Mark conflict resolved if active — this is the one case where we speak up
      if (conflictState && !conflictState.resolved) {
        conflictState = { ...conflictState, resolved: true };
        print('info', `hint: staged conflict resolution in ${conflictState?.file || 'file'}`);
        print('info', `hint: run "git commit" to complete the merge`);
      }
      // else: silent — real git add produces no output on success
    } else if (target) {
      // Accept the conflict file even if not in workingFiles list
      const isConflictFile = conflictState && !conflictState.resolved && target === conflictState.file;
      if (!isConflictFile && !workingFiles.includes(target)) {
        print('err', `fatal: pathspec '${target}' did not match any files`);
        return;
      }
      if (!stagedFiles.includes(target)) stagedFiles.push(target);
      if (isConflictFile) {
        conflictState = { ...conflictState, resolved: true };
        print('info', `hint: staged ${target} with conflict markers removed`);
        print('info', `hint: run "git commit" to complete the merge`);
      }
      // else: silent
    } else {
      print('err', 'Nothing specified, nothing added.');
      return;
    }

    checkChallengeStep('stage');
  }

  function gitCommit(parts) {
    // Block commit if conflict exists but hasn't been resolved yet
    if (conflictState && !conflictState.resolved) {
      print('err', 'error: Committing is not possible because you have unmerged files.');
      print('info', 'hint: Fix them up in the work tree, then use "git add <file>"');
      print('info', 'hint: to mark resolution, then commit.');
      return;
    }

    // Complete an in-progress merge (conflictState resolved)
    if (conflictState?.resolved) {
      const sha = randSha();
      const mergedBranch = conflictState.branch;
      conflictState = null;
      stagedFiles   = [];
      commits.push({ id: sha, msg: `Merge branch '${mergedBranch}'`, branch: currentBranch });
      print('out', `[${currentBranch} ${sha.slice(0,7)}] Merge branch '${mergedBranch}'`);
      print('out', ` 1 file changed`);
      checkChallengeStep('commit');
      return;
    }

    if (stagedFiles.length === 0) {
      print('err', 'nothing to commit, working tree clean');
      return;
    }

    const mFlag = parts.indexOf('-m');
    let msg = 'Update';
    if (mFlag !== -1 && parts[mFlag + 1]) {
      msg = parts.slice(mFlag + 1).join(' ').replace(/^"|"$/g, '').replace(/^'|'$/g, '');
    }

    const sha   = randSha();
    const count = stagedFiles.length;
    commits.push({ id: sha, msg, branch: currentBranch });
    stagedFiles = [];

    print('out', `[${currentBranch} ${sha.slice(0,7)}] ${msg}`);
    print('out', ` ${count} file${count > 1 ? 's' : ''} changed`);

    checkChallengeStep('commit');
    if (typeof App !== 'undefined') App.awardAchievement('first_commit');
  }

  function gitLog(parts) {
    if (commits.length === 0) { print('info', 'No commits yet.'); return; }

    const oneline  = parts.includes('--oneline');
    const limit    = parts.includes('-1') ? 1 : (parts.includes('-5') ? 5 : commits.length);
    const reversed = [...commits].reverse().slice(0, limit);

    reversed.forEach((c, i) => {
      // Only the very first (newest) commit gets the HEAD pointer
      const headDeco = i === 0 ? ` (HEAD -> ${currentBranch}, origin/${currentBranch})` : '';
      if (oneline) {
        print('branch', `${c.id.slice(0, 7)}${headDeco} ${c.msg}`);
      } else {
        print('head', `commit ${c.id}${headDeco}`);
        print('out', `Author: You <you@example.com>`);
        print('out', `Date:   ${new Date().toDateString()} ${new Date().toTimeString().slice(0,8)} +0000\n`);
        print('out', `    ${c.msg}\n`);
      }
    });
  }

  function gitBranch(args, parts) {
    const deleteFlag = parts.includes('-d') || parts.includes('-D');
    const allFlag    = parts.includes('-a') || parts.includes('--all');
    const verboseFlag = parts.includes('-v') || parts.includes('-vv');
    const branchName = args.find(a => !a.startsWith('-'));

    if (deleteFlag && branchName) {
      branches = branches.filter(b => b !== branchName);
      print('out', `Deleted branch ${branchName} (was ${randSha().slice(0, 7)}).`);
      return;
    }

    if (branchName) {
      if (!branches.includes(branchName)) branches.push(branchName);
      // silent — real git branch <name> produces no output on success
      checkChallengeStep('branch');
      return;
    }

    // List branches
    branches.forEach(b => {
      const sha = (commits[commits.length - 1]?.id || randSha()).slice(0, 7);
      const label = verboseFlag ? `${b === currentBranch ? '* ' : '  '}${b.padEnd(24)} ${sha} ${commits[commits.length - 1]?.msg || ''}` : (b === currentBranch ? `* ${b}` : `  ${b}`);
      b === currentBranch ? print('branch', label) : print('out', label);
    });
    if (allFlag) {
      branches.forEach(b => print('out', `  remotes/origin/${b}`));
    }
  }

  function gitSwitch(args, parts) {
    const createFlag = parts.includes('-c') || parts.includes('-C');
    const targetIdx  = args.findIndex(a => !a.startsWith('-'));
    const target     = args[targetIdx];

    if (!target) { print('err', 'fatal: no branch name given'); return; }

    if (createFlag) {
      if (!branches.includes(target)) branches.push(target);
      currentBranch = target;
      print('out', `Switched to a new branch '${target}'`);
      checkChallengeStep('branch');
    } else {
      if (!branches.includes(target)) branches.push(target);
      currentBranch = target;
      print('out', `Switched to branch '${target}'`);
    }
    updatePrompt();
  }

  function gitCheckout(args, parts) {
    const createFlag = parts.includes('-b') || parts.includes('-B');
    const target     = args.find(a => !a.startsWith('-'));
    if (!target) { print('err', 'fatal: no target given'); return; }

    if (createFlag) {
      if (!branches.includes(target)) branches.push(target);
      currentBranch = target;
      print('out', `Switched to a new branch '${target}'`);
      checkChallengeStep('branch');
    } else {
      if (!branches.includes(target)) branches.push(target);
      currentBranch = target;
      print('out', `Switched to branch '${target}'`);
    }
    updatePrompt();
  }

  function gitMerge(args) {
    // Handle --abort
    if (args[0] === '--abort' || args.includes('--abort')) {
      if (!conflictState) {
        print('err', 'fatal: There is no merge in progress (MERGE_HEAD missing).');
        return;
      }
      conflictState = null;
      print('out', 'Merge aborted.');
      return;
    }

    // Handle --continue (alias for git commit in merge context)
    if (args[0] === '--continue' || args.includes('--continue')) {
      if (!conflictState) { print('err', 'fatal: There is no merge in progress.'); return; }
      if (!conflictState.resolved) {
        print('err', 'error: Committing is not possible because you have unmerged files.');
        print('info', 'hint: Stage the resolved file first: git add ' + conflictState.file);
        return;
      }
      gitCommit([]);
      return;
    }

    const target = args.find(a => !a.startsWith('-'));
    if (!target) { print('err', 'error: No branch name given to merge.'); return; }

    // Simulate a merge conflict for known conflict-producing branches
    // (detected from lesson task patterns in autoInitIfNeeded)
    if (conflictBranches.has(target) || target.includes('conflict')) {
      conflictState = { branch: target, file: 'app.js', resolved: false };
      print('out', `Auto-merging app.js`);
      print('err', `CONFLICT (content): Merge conflict in app.js`);
      print('err', `Automatic merge failed; fix conflicts and then commit the result.`);
      checkChallengeStep('merge');
      return;
    }

    // Normal fast-forward / ort merge
    const sha = randSha();
    commits.push({ id: sha, msg: `Merge branch '${target}'`, branch: currentBranch });
    print('out', `Updating ${commits[commits.length-2]?.id.slice(0,7) || 'a1b2c3d'}..${sha.slice(0,7)}`);
    print('out', `Merge made by the 'ort' strategy.`);
    print('out', ` 1 file changed, 3 insertions(+), 1 deletion(-)`);
    checkChallengeStep('merge');
  }

  function gitRemote(args, parts) {
    if (args[0] === 'add') {
      // real git remote add is silent on success
    } else if (args[0] === '-v' || args[0] === 'show') {
      print('out', 'origin\thttps://github.com/you/my-app.git (fetch)');
      print('out', 'origin\thttps://github.com/you/my-app.git (push)');
    } else {
      print('out', 'origin');
    }
  }

  function gitPush(args, parts) {
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
    const staged = parts.includes('--staged');
    const file   = args.find(a => !a.startsWith('-'));

    if (staged) {
      if (file) {
        stagedFiles = stagedFiles.filter(f => f !== file);
      } else {
        stagedFiles = [];
      }
      // real git restore --staged is silent on success
    } else {
      // real git restore is silent on success
    }
    checkChallengeStep('restore');
  }

  function gitReset(args, parts) {
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
    if (args[0] === '--abort') { print('out', 'Rebase aborted. HEAD back to original.'); return; }
    if (args[0] === '--continue') { print('out', 'Continuing rebase after conflict resolution...'); return; }
    if (parts.includes('-i') || parts.includes('--interactive')) {
      print('info', '# Note: In real Git, this opens your $EDITOR with a list of commits.');
      print('info', '# Simulating interactive rebase with squash applied...');
      print('out', '');
      print('out', 'pick a1b2c3 Initial work');
      print('out', 'squash b2c3d4 WIP: more work');
      print('out', 'squash c3d4e5 fix typo');
      print('out', '');
      print('out', `Successfully rebased and updated refs/heads/${currentBranch}.`);
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
    print('head', '═══ Git Energy Terminal Commands ═══');
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

  // Called by App.checkTerminalTask when the user types a command that skips
  // ahead of an incomplete earlier task. Prints the interactive choice and
  // stores the original command so execute() can forward or cancel it.
  function blockWithChoice(rawCmd, blocker, blockerIdx) {
    pendingBlockedCmd = rawCmd;
    print('out', '');
    print('info', `⚠️  Task ${blockerIdx + 1} is not done yet:`);
    print('info', `    "${blocker.instruction}"`);
    print('info', `    Run:  ${blocker.command}`);
    print('out', '');
    print('info', `    Type  continue  to proceed anyway`);
    print('info', `    Type  back      to scroll to that task`);
  }

  function checkChallengeStep(action) {
    if (typeof App === 'undefined') return;
    App.onChallengeAction(action);
  }

  function randSha() {
    return Math.random().toString(16).slice(2, 10) +
           Math.random().toString(16).slice(2, 10);
  }

  function getCurrentBranch() { return currentBranch; }
  function getCommits() { return commits; }

  return { init, handleKey, execute, print, clear, getCurrentBranch, getCommits, blockWithChoice };
})();
