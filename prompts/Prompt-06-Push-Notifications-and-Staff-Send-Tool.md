# Prompt 06: Push Notifications and Staff Send Tool

**Elevate Branson App Prompt Chain | Prompt 6 of 9**
**Run in:** Claude Code, `C:\Users\msell\OneDrive\AIAlchemy\elevatebranson`
**When:** Paste into Claude Code after the previous phase has committed and pushed.

Copy everything in the box below.

```
GOAL
Let staff send push notifications that mirror newsletter-style updates.

FORMAT
App: permission prompt with a value-first explanation screen (shown after first meaningful use, not at launch), token registration, topic preferences (News, Events, Programs, Giving, Housing), notification inbox screen, tap-to-deep-link to the relevant screen. Backend: token storage, send endpoint using Expo Push Service with batching and receipt checking, and a simple password-protected staff web page to compose and send to all or to a topic, with a preview and a test-send-to-me step.

GUARDRAILS
Rules from CLAUDE.md apply. Staff page needs authentication (single shared secret in env is acceptable for v1; log it in HUMAN_TASKS.md as upgrade-later). Never store personal data with tokens. Provide unsubscribe and per-topic controls. Add sending limits to prevent accidental spam (confirm dialog, cooldown).

CONTEXT
The CEO plans to use push for what the email newsletter covers. Start with the most recent newsletter format (I will forward it) as sample notification content in docs/NOTIFICATION_EXAMPLES.md.
```
