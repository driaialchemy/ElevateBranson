# Prompt 00: Foundation, Context, and Safety Rules (run once)

**Elevate Branson App Prompt Chain | Prompt 0 of 9**
**Run in:** Claude Code, `C:\Users\msell\OneDrive\AIAlchemy\elevatebranson`
**When:** Run once, first. Creates CLAUDE.md, which all later prompts depend on.

Copy everything in the box below.

```
GOAL
Initialize the Elevate Branson mobile app project. Create CLAUDE.md as the persistent context for all later phases.

FORMAT
Create: CLAUDE.md, docs/FEATURES.md, docs/DECISIONS.md, docs/BLOCKERS.md, .gitignore, README.md.

GUARDRAILS (write these verbatim into CLAUDE.md as standing rules)
1. Repo: https://github.com/driaialchemy/ElevateBranson, local path C:\Users\msell\OneDrive\AIAlchemy\elevatebranson. Branch main. If the folder is not a git repo, git init and add the remote.
2. After each phase: run lint, typecheck, tests. Commit with message "phase-N: summary". Push to origin main.
3. Auto-resolve failures: diagnose, fix, rerun, up to 3 attempts. If still failing, log it in docs/BLOCKERS.md with the error and attempted fixes, then continue with the next independent task. Never stop to ask unless a rule below requires it.
4. Never commit secrets, API keys, or personal data. Use .env (gitignored) plus .env.example with placeholder values. Run a secrets scan (grep for key patterns) before every push.
5. .gitignore must exclude node_modules, .expo, build output, .env*. (The folder is inside OneDrive; keep installs lean.)
6. Never use destructive git (force push, reset --hard) or delete files outside this project folder.
7. Anything needing a human (App Store, Google Play, Apple Developer, Expo, CMS, Resend, or domain accounts, plus the CEO's content) goes in docs/HUMAN_TASKS.md as a numbered checklist. Do not block on it. Use clearly marked placeholder content.
8. Accessibility is mandatory: minimum 16pt text, dynamic type, 4.5:1 contrast, screen-reader labels, 44pt tap targets. The audience includes people in housing crisis and older donors.
9. Privacy: prayer requests and volunteer forms contain personal data. Collect the minimum, never log form bodies, send only to the configured staff email, add a privacy notice screen.
10. Token discipline: no re-explaining, no restating files, short status lines only.

CONTEXT
Nonprofit: Elevate Branson. Core followers install the app to stay informed about ~10 programs, communicate with staff, give, schedule tours, and volunteer. Push notifications mirror the content of their email newsletter. Website: https://elevatebranson.org/
Save the 17 requested features into docs/FEATURES.md exactly as listed: 1 About Us; 2 Find Us (map/address, may sit under About); 3 Volunteer (list of ~10 programs and opportunities, simple form emailing the volunteer coordinator); 4 Resources (150+ partner orgs for referrals, key item is an affordable housing list); 5 Social links; 6 Submit a prayer request; 7 Merch (buy a t-shirt); 8 Schedule a campus tour; 9 Tiny House info/updates; 10 Newest newsletter (may sit under About); 11 Website link; 12 Upcoming events; 13 Programs (Elevate Kids, Elevate Work, Elevate Entrepreneurs, others); 14 Thrift Store; 15 Elevate Coffee (hours, offerings); 16 Give/donate; 17 Playground (hours, info).
Record the stack choices above in docs/DECISIONS.md.
```
