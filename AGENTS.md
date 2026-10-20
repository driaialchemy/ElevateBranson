# Agent rules

Repository: `https://github.com/driaialchemy/ElevateBranson`, local project `C:\Users\msell\OneDrive\AIAlchemy\elevatebranson`, branch `main`.

## Standing rules (10)

1. If this folder is not a Git repository, initialize it and add the repository above as `origin`.
2. For each phase, run tests, lint, and typecheck. Commit as `phase-N: summary` (or the exact phase-specific message requested) and push to `origin main`.
3. Diagnose and fix failures for up to 3 attempts. If still failing, record the error and attempted fixes in `docs/BLOCKERS.md`, then continue independent work. Do not stop to ask unless a rule requires it.
4. Never commit secrets, API keys, or personal data. Keep `.env` gitignored and `.env.example` to placeholders. Run a secrets scan before every push.
5. Ignore `node_modules`, `.expo`, build output, logs, `.env*`, and generated local files that should not be committed. Keep installs lean for OneDrive.
6. Never force-push, run `git reset --hard`, or delete files outside this project.
7. Put tasks needing a person (store accounts, CMS, email/domain setup, CEO content, etc.) in the numbered `docs/HUMAN_TASKS.md` list. Do not block on them; use clearly marked placeholders.
8. Accessibility is mandatory: minimum 16pt text, dynamic type, 4.5:1 contrast, screen-reader labels, and 44pt tap targets. Consider people in housing crisis and older donors.
9. For prayer and volunteer forms, collect the minimum personal data, never log form bodies, send only to the configured staff email, and provide a privacy notice screen.
10. Keep responses short: do not re-explain or restate files.

## Quiet output (5 rules)

- Run tests, typecheck, and lint quietly; show only the last 30 lines or failures. Examples: `npm test -- --silent 2>&1 | tail -30`; `npx tsc --noEmit 2>&1 | tail -30`; `npm run lint -- --quiet 2>&1 | tail -30`.
- Never print whole files, lockfiles, or install logs. Read files by line range or grep.
- Use `git --no-pager` with `--stat`, short status, or `-n 5`; do not print full diffs.
- Never read or print anything under `assets/`, `content/`, or `node_modules/`.
- Read `docs/SITE_INVENTORY.md` only by section or grep for a page slug; never print it whole.

## Session state

Read `docs/STATE.md` first. Update it last in each phase so a fresh session can resume without rereading history.

Before building, read the phase section of docs/REMAINING.md and the code; extend what exists, never rebuild; skip items already DONE and say so; keep existing tests green.

## Project references

Read only when needed: `docs/FEATURES.md`, `docs/DECISIONS.md`, `docs/BLOCKERS.md`, `docs/HUMAN_TASKS.md`, `docs/BRAND.md`, `docs/NAVIGATION.md`, `docs/SITE_INVENTORY.md`, `docs/STAFF_GUIDE.md`, `docs/RULES_DETAIL.md`, and `docs/STATE.md`. App content is under `src/content`; the public Sanity read token only belongs in client configuration.
