# Prompt 08: Quality Gate (Fact Check List + Reflection)

**Elevate Branson App Prompt Chain | Prompt 8 of 9**
**Run in:** Claude Code, `C:\Users\msell\OneDrive\AIAlchemy\elevatebranson`
**When:** Paste into Claude Code after the previous phase has committed and pushed.

Copy everything in the box below.

```
GOAL
Audit the whole app against docs/FEATURES.md and CLAUDE.md rules, then auto-fix.

FORMAT
Produce docs/QA_REPORT.md: feature coverage table (17 rows, pass/fail), accessibility results, security and privacy checks, performance notes, and a "facts to verify" list (hours, addresses, links, program names, emails, donation and store URLs). Fix all fixable failures automatically (max 3 attempts each), re-run checks, and update the report.

GUARDRAILS
- Run: lint, typecheck, tests, expo-doctor, dependency audit, secrets scan.
- Test on small-screen and large-text configurations.
- Confirm no secrets in git history (git log -p search).
- Do not mark a feature pass without a test or a documented manual check.

CONTEXT
Treat unverified organizational facts as defects until the human checklist confirms them.
```
