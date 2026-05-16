// data-practical.js
// Patches GAME_DATA at runtime to inject crisis and hotfix steps into existing levels.
// Must load after data.js and data-innovator.js.

(function patchPractical() {
  function patch(persona, levelId, newSteps) {
    const lvl = GAME_DATA[persona].levels.find(l => l.id === levelId);
    if (lvl) lvl.steps.push(...newSteps);
  }

  // ─── PATCH 1 — beginner / b4 — Secret committed to main ─────────────────────
  patch('beginner', 'b4', [
    {
      type: 'crisis',
      title: '🚨 INCIDENT: AWS Secret Pushed to Main',
      urgency: 'high',
      situation: 'GitHub just emailed you: "Secret scanning found a potential AWS access key in commit a3f91bc on main." The commit went up 45 seconds ago. Your manager is already in your DMs. The key is `AKIAIOSFODNN7EXAMPLE` sitting right there in `config.env`.',
      clue: 'The file is already tracked by Git. Deleting it from disk won\'t remove it from history. Think: how do you un-track a file without deleting its contents?',
      choices: [
        {
          label: 'git rm --cached config.env → add to .gitignore → commit → rotate the key',
          desc: 'Un-tracks the file from Git without deleting it locally, commits the removal, and rotates the compromised key in AWS IAM.',
          outcome: 'correct',
          result: 'You un-track the file, push the clean commit, and immediately rotate the key in the AWS console. GitHub closes the secret scanning alert within two minutes. Your manager replies "Nice catch and fast response." The key was only live for three minutes — short enough that CloudTrail shows zero unauthorized API calls. You add a pre-commit hook to block `.env` files going forward.'
        },
        {
          label: 'git push --force origin main',
          desc: 'Overwrites remote history to erase the commit.',
          outcome: 'danger',
          result: 'The force-push goes through, but GitHub\'s secret scanning already captured the key from the original push event. The alert stays open. Worse, two teammates who pulled in the last minute now have diverged histories — Monday morning is going to be painful. The key is still valid and must be rotated immediately regardless. Force-pushing history is not the same as erasing the exposure.'
        },
        {
          label: 'Delete the repo and recreate it',
          desc: 'Nuclear option — wipe the remote repo and start fresh.',
          outcome: 'wrong',
          result: 'GitHub keeps forks and cached views of public repos. Other services that mirror or index code may have already scraped the key. The secret is out in the world the moment it was pushed. Deleting the repo costs you your entire history and solves nothing. You still need to rotate the AWS key — that is the only action that actually closes the risk.'
        },
        {
          label: 'Just add config.env to .gitignore',
          desc: 'Tell Git to ignore the file from now on.',
          outcome: 'wrong',
          result: '`.gitignore` only prevents untracked files from being added. `config.env` is already tracked — it will keep getting committed on every future `git add .`. The secret stays in history. You need `git rm --cached` to un-track it first, then update `.gitignore`. And rotate the key. Always rotate the key.'
        }
      ]
    }
  ]);

  // ─── PATCH 2 — beginner / b5 — Three days coding on main ───────────────────
  patch('beginner', 'b5', [
    {
      type: 'crisis',
      title: '🚨 INCIDENT: Three Days of Work on Main',
      urgency: 'medium',
      situation: 'Your lead pings you: "Hey, where\'s the feature branch for the login work? PR should have gone up yesterday." You\'ve been coding directly on main for three days. The login feature is half-done — uncommitted changes everywhere. Team policy is strict: no direct commits to main, ever.',
      clue: 'You need to get your uncommitted changes off main and onto a feature branch — without losing a single line. There\'s a Git command designed exactly for temporarily shelving changes.',
      choices: [
        {
          label: 'git stash → git checkout -b feature/login → git stash pop',
          desc: 'Stash your changes, create the proper branch, then restore your work on it.',
          outcome: 'correct',
          result: 'You stash your three days of work in under a second, create `feature/login`, and pop the stash back. Your editor looks exactly as it did — every file, every half-written function intact. You push the branch and open a draft PR. Your lead responds: "Perfect, thanks for fixing that." Nobody ever needs to know it wasn\'t always a branch. This is the move.'
        },
        {
          label: 'git checkout -b feature/login',
          desc: 'Create a new branch directly — Git carries uncommitted changes with you.',
          outcome: 'correct',
          result: 'Git moves your uncommitted changes to the new branch automatically since they haven\'t been committed yet. This works cleanly when you have only unstaged edits. You\'re now on `feature/login` with all your work intact. Stash is the safer habit when you also have staged changes, but in this case you\'re good. Push the branch and open that PR.'
        },
        {
          label: 'git commit -m "wip" && git push origin main',
          desc: 'Commit everything and push to main to save it.',
          outcome: 'wrong',
          result: 'Unreviewed, half-finished login code is now live on main. The branch protection rule triggers a failed status check. Your lead gets a notification. The CI pipeline runs the login tests — they fail because the feature isn\'t done. Slack lights up. You\'ve broken the build for the whole team. Never push WIP directly to main.'
        },
        {
          label: 'Copy files to desktop, git reset --hard, paste back',
          desc: 'Manually back up your changes, reset main, restore files by hand.',
          outcome: 'wrong',
          result: 'You spend 20 minutes copying files, resetting, and pasting them back — praying you didn\'t miss a file. You did miss one. The utility function you wrote Tuesday is gone. Git has had `git stash` since 2007. This is exactly the problem it was built to solve.'
        }
      ]
    }
  ]);

  // ─── PATCH 3 — beginner / b7 — Bad merge on main ────────────────────────────
  patch('beginner', 'b7', [
    {
      type: 'crisis',
      title: '🚨 INCIDENT: Broken Merge on Main',
      urgency: 'high',
      situation: 'You ran `git merge experimental-ui` on main five minutes ago. Alex from QA just pinged: "Homepage is down, getting a blank white screen." The monitoring dashboard turns red. Three automated Slack alerts land in #incidents. Tests are red across the board.',
      clue: 'You need to undo the merge on a branch that teammates may have already pulled. A command that creates a new "undo" commit is safer than rewriting history.',
      choices: [
        {
          label: 'git revert -m 1 HEAD',
          desc: 'Creates a new commit that undoes the merge, leaving history intact.',
          outcome: 'correct',
          result: 'The revert commit lands in 30 seconds. You push it, CI goes green on the next run, and the homepage comes back up. Because you used `revert` instead of `reset`, teammates who already pulled don\'t get history conflicts. Alex marks the incident resolved. In the post-mortem you add a branch protection rule: merges to main require a passing CI run. Never again.'
        },
        {
          label: 'git reset --hard HEAD~1',
          desc: 'Moves main back one commit, erasing the merge from history.',
          outcome: 'danger',
          result: 'It works — if you haven\'t pushed yet. But you already pushed the merge. Now your local main is behind the remote, and anyone who pulled is on a different timeline. When they push, the merge comes back. When you push, you\'ll need `--force`, which breaks everyone else. `git revert` is the right tool here. `reset --hard` is for local-only mistakes.'
        },
        {
          label: 'Manually delete the broken files and commit a fix',
          desc: 'Open the files causing errors, remove the bad code, and commit a patch.',
          outcome: 'wrong',
          result: 'Twenty minutes of hunting through unfamiliar experimental-ui code while the homepage is still down. You accidentally delete a CSS file that wasn\'t part of the problem. The site comes back up but looks broken in a different way. The git history now shows a "fix: remove broken stuff" commit with no context. The post-mortem is awkward. `git revert` would have taken 10 seconds.'
        },
        {
          label: 'Just push hotfix code on top to cover the breakage',
          desc: 'Write new code to paper over whatever the merge broke.',
          outcome: 'wrong',
          result: 'You spend an hour writing patches for code you don\'t fully understand. The site mostly works, but three edge cases are still broken. The experimental-ui code is now entangled with main in ways nobody mapped. Future developers will hit mysterious bugs and have no idea why. Reverting the merge cleanly would have taken less than a minute.'
        }
      ]
    }
  ]);

  // ─── PATCH 4 — intermediate / i1 — Production 500s hotfix ───────────────────
  patch('intermediate', 'i1', [
    {
      type: 'hotfix',
      title: '🔥 Hotfix Challenge: Production 500s on Payments',
      scenario: 'It\'s 2:47 PM on a Tuesday. Production is returning HTTP 500 on every checkout. Sentry shows a null reference exception in `api/payments.js`. Your `feature/checkout` branch has three hours of uncommitted work. You need to ship a fix to main without losing a single line of your feature work.',
      steps: [
        { cmd: 'git stash', desc: 'Shelve your feature work-in-progress instantly — nothing is lost' },
        { cmd: 'git checkout main', desc: 'Switch to main where the bug is live' },
        { cmd: 'git pull origin main', desc: 'Grab any commits that landed since you last synced' },
        { cmd: 'git checkout -b hotfix/payment-null-check', desc: 'Isolate the fix — never commit hotfixes directly to main' },
        { cmd: '# Edit api/payments.js — add null guard before amount.toFixed(2)', desc: 'Make the surgical fix in your editor (one function, one guard clause)' },
        { cmd: 'git add api/payments.js', desc: 'Stage only the file you touched — no accidental extras' },
        { cmd: 'git commit -m "fix: null check on payment amount before formatting"', desc: 'Precise, descriptive commit — future you will be grateful' },
        { cmd: 'git push origin hotfix/payment-null-check', desc: 'Push the branch and open a PR immediately' },
        { cmd: 'git checkout feature/checkout && git stash pop', desc: 'Return to your feature branch and restore every line of your work' }
      ],
      outcome: 'Production recovers in 8 minutes. The PR gets a fast review and merges in 12. Sentry clears the alert. Your feature branch is exactly as you left it — three hours of work, untouched. In the incident channel, your lead writes: "Great response time." This is what professional Git workflow looks like under pressure.'
    }
  ]);

  // ─── PATCH 5 — intermediate / i3 — Botched interactive rebase ───────────────
  patch('intermediate', 'i3', [
    {
      type: 'crisis',
      title: '🚨 INCIDENT: Interactive Rebase Destroyed Colleagues\' Commits',
      urgency: 'high',
      situation: 'You ran `git rebase -i HEAD~5` to clean up your commits before a PR. In the interactive editor you squashed everything into one commit — but two of those commits were from Maria, who pushed them to this shared branch this morning. The branch log now shows her work folded into your commit, or missing entirely. She\'s asking why her commits disappeared.',
      clue: 'Git keeps a log of every position HEAD has been at. If the rebase is still in progress, there\'s an abort command. If it\'s already done, `git reflog` can take you back to before it happened.',
      choices: [
        {
          label: 'git rebase --abort (if in progress) OR git reflog → git reset --hard HEAD@{2}',
          desc: 'Abort a rebase mid-flight, or use reflog to jump back to the pre-rebase state.',
          outcome: 'correct',
          result: '`git reflog` shows every position HEAD has been — you find the entry just before the rebase started and reset hard to it. The branch snaps back to exactly where it was. Maria\'s commits reappear. You push (with --force-with-lease to be safe) and let Maria know it\'s resolved. Lesson learned: `git rebase -i` on shared branches requires a team conversation first.'
        },
        {
          label: 'git push --force origin branch-name',
          desc: 'Force-push the rebased history to the remote.',
          outcome: 'wrong',
          result: 'The mangled history is now on the remote. Maria does a `git pull` and gets a "diverged histories" error. She has to run `git pull --rebase` and manually reconcile her work. Two of her commits show up as duplicate entries in the log. The PR diff is a mess. Your senior dev asks for a meeting. Force-pushing rebased history to a shared branch is one of Git\'s cardinal sins.'
        },
        {
          label: 'Delete the branch and recreate it from main',
          desc: 'Start fresh — abandon the branch entirely.',
          outcome: 'wrong',
          result: 'You lose all your own work too — everything you\'ve built on this branch since it diverged from main. Maria\'s work is gone from the branch as well. You\'d need to cherry-pick commits manually from reflog anyway, which is more work than just using reflog to undo the rebase in the first place. `git reflog` is the undo button for situations exactly like this.'
        },
        {
          label: 'git cherry-pick each missing commit back onto the branch',
          desc: 'Manually re-apply the commits that got squashed.',
          outcome: 'danger',
          result: 'It can work, but you\'re navigating by memory and reflog trying to identify exactly which commits were Maria\'s and which were already in your squash. Cherry-picking the wrong SHAs creates duplicate commits. If you pick the right ones in the right order it resolves cleanly — but this is a 20-minute manual process when `git reset --hard HEAD@{2}` would have taken 10 seconds.'
        }
      ]
    }
  ]);

  // ─── PATCH 6 — expert / e1 — 200 commits broke CI ───────────────────────────
  patch('expert', 'e1', [
    {
      type: 'crisis',
      title: '🚨 INCIDENT: 47 Tests Failing, 200 Commits Since Last Green',
      urgency: 'high',
      situation: 'It\'s Monday morning. CI was fully green when the team left Friday. Now 47 tests are failing across three suites. The last known-good release is tagged `v2.3.0`. Since then, 200 commits have landed from eight different developers across four feature branches. Nobody knows what broke it. The CEO is pinging the tech lead asking about the customer-facing regression.',
      clue: '200 commits sounds overwhelming but binary search cuts it to 8 targeted checkouts. Git has a built-in command for this exact workflow — it can literally guide you step by step.',
      choices: [
        {
          label: 'git bisect start → git bisect bad → git bisect good v2.3.0',
          desc: 'Let Git binary-search the commit range — it finds the culprit in ~8 steps.',
          outcome: 'correct',
          result: 'You start bisect, mark HEAD as bad and `v2.3.0` as good. Git checks out commit #100. Tests pass — you mark it good. Git jumps to #150. Tests fail — bad. Seven rounds later Git prints: "d4e89f1 is the first bad commit." The message reads "refactor: extract auth middleware." You find a missing `await` in one line of the new middleware. The fix is three characters. You patch it, tests go green, and the tech lead closes the CEO thread before lunch. Total time: 40 minutes.'
        },
        {
          label: 'Read through all 200 commit diffs manually',
          desc: 'Open each commit in the log and scan for suspicious changes.',
          outcome: 'wrong',
          result: 'Three hours in, you\'ve read 60 commits. Your eyes are glazing. You\'ve flagged four "suspicious" commits and argued with two developers about their code style. You haven\'t found the bug. The tech lead escalates to P0. You\'ll retire before you find it this way. `git bisect` does this in 8 automated steps. This is exactly the problem it was designed to solve.'
        },
        {
          label: 'Revert the entire sprint merge — undo the last two weeks of work',
          desc: 'Mass-revert all changes since `v2.3.0`.',
          outcome: 'wrong',
          result: 'Two weeks of work from eight developers disappears from main. Four features that were already live for customers stop working. The customer impact just tripled. You\'ve traded one regression for eight. The bug was one missing `await` in one file. Bisect would have found it in 40 minutes and the fix would have been three characters.'
        },
        {
          label: 'Blame the last committer and ask them to investigate',
          desc: 'Look at who committed last and assume it\'s their fault.',
          outcome: 'danger',
          result: 'Sarah committed last — a CSS tweak to the dashboard button color. The failing tests are all in the auth suite. You\'ve just accused someone innocent of a bug they didn\'t write, cost yourself goodwill with a colleague, and still haven\'t found the root cause. The tech lead watches this play out in Slack. Run `git bisect`. Find the actual commit. You owe Sarah a coffee.'
        }
      ]
    }
  ]);

  // ─── PATCH 7 — expert / e3 — Pre-commit hook too slow ───────────────────────
  patch('expert', 'e3', [
    {
      type: 'crisis',
      title: '🚨 INCIDENT: Pre-Commit Hook Drives Developers to --no-verify',
      urgency: 'medium',
      situation: 'Last sprint the team added a pre-commit hook that runs the entire 4-minute test suite before every commit. Within a week, five of eight developers have aliased `git commit` to `git commit --no-verify`. A bug that the tests would have caught just shipped to staging. The hook designed to enforce quality is now actively bypassed by the people it was meant to protect.',
      clue: 'Git hooks fire at different stages — commit, push, merge. A 4-minute wait before every commit is the wrong hook for the wrong stage. Think about when developers can tolerate a longer wait.',
      choices: [
        {
          label: 'Move heavy tests to pre-push; keep pre-commit fast (lint + format, under 3s)',
          desc: 'Right tests, right hook: instant feedback on commit, full suite before the code leaves the machine.',
          outcome: 'correct',
          result: 'You move the test suite to the pre-push hook and trim pre-commit down to ESLint and Prettier — runs in 1.8 seconds. Developers stop using `--no-verify` within two days because the commit hook no longer interrupts their flow. The pre-push hook still catches regressions before they hit the remote. Next sprint, zero bugs escape to staging that the test suite would have caught. Fast hooks get respected. Slow hooks get bypassed.'
        },
        {
          label: 'Remove the hook entirely — let CI handle quality gates',
          desc: 'Delete the pre-commit hook and rely on the CI pipeline alone.',
          outcome: 'wrong',
          result: 'CI catches bugs, but only after the code is pushed and a pipeline runs — 8 minutes later on a good day. Developers get no local feedback. Broken commits pile up in the remote. PR reviews get clogged with CI failures that could have been caught in 2 seconds locally. The hook existed for a reason. The solution isn\'t no hook — it\'s the right hook at the right speed.'
        },
        {
          label: 'Standardize git commit --no-verify as the team\'s normal workflow',
          desc: 'Accept that --no-verify is now the default and document it.',
          outcome: 'danger',
          result: 'All hooks are now permanently bypassed for every developer on every commit. The pre-commit hook, the commit-msg hook enforcing conventional commits, the secret-scanning hook — all gone. Three weeks later a developer accidentally commits an API key. It\'s caught by GitHub Secret Scanning 90 seconds after push rather than locally before it ever left the machine. The hooks existed for real reasons.'
        },
        {
          label: 'Enforce the hook in CI — block merges if tests weren\'t run locally',
          desc: 'Add a CI check that verifies the pre-commit hook was not skipped.',
          outcome: 'wrong',
          result: 'CI can\'t reliably detect whether a local hook ran. Developers find workarounds in 20 minutes. You\'ve added CI complexity without solving the actual problem: the hook takes 4 minutes and interrupts focus flow. The fix is making the hook fast, not making bypassing it harder. Friction that can be avoided will be avoided. Design for the humans using the tool.'
        }
      ]
    }
  ]);

})();
