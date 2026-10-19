# Elevate Branson

Persistent context for every later phase. Read this file before changing the app.

## Standing rules

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

## Context

Nonprofit: Elevate Branson. Core followers install the app to stay informed about ~10 programs, communicate with staff, give, schedule tours, and volunteer. Push notifications mirror the content of their email newsletter. Website: https://elevatebranson.org/

Feature list: docs/FEATURES.md. Stack: docs/DECISIONS.md. Open failures: docs/BLOCKERS.md. Human follow-ups: docs/HUMAN_TASKS.md.

Brand: the app must reflect the Elevate Branson branding from https://elevatebranson.org/ (logo, colors, fonts, imagery, tone). Extracted in Prompt 2 into docs/BRAND.md and src/theme/tokens.ts; all UI uses those tokens only. No hardcoded colors or fonts elsewhere.

Content: src/content. Starter copy until a real Sanity project id is set. Public read token only. Staff notes: docs/STAFF_GUIDE.md.

## Overrides to Prompt 4

No static map. Find Us uses an address card: address, main phone, hours, Open in Maps (iOS and Android deep links), and Call. No map API, no map key, no paid service.

Prompt 4 must call getOpenStatus and must not reimplement hours logic.

Prompt 4 must use Header, Hero, SectionHeader, Button, Card, StatTile, ActionTile, ListRow, and SeasonalBanner from src/components.
