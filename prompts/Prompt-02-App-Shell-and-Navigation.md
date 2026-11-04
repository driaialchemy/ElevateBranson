# Prompt 02: App Shell and Navigation

**Elevate Branson App Prompt Chain | Prompt 2 of 9**
**Run in:** Claude Code, `C:\Users\msell\OneDrive\AIAlchemy\elevatebranson`
**When:** Paste into Claude Code after the previous phase has committed and pushed.

Copy everything in the box below.

```
GOAL
Scaffold the Expo TypeScript app with navigation and theme. Read CLAUDE.md and docs/DECISIONS.md.

FORMAT
Expo Router with 5 bottom tabs: Home, Programs, Events, Get Involved (Volunteer, Tour, Prayer, Give, Merch), More (About, Find Us, Resources, Social, Website, Newsletter, Privacy). Home surfaces quick actions, latest news, and next event. Place each of the 17 features in the structure and show the mapping in docs/NAVIGATION.md.

GUARDRAILS
Rules from CLAUDE.md apply. Brand theme from supplied assets, otherwise neutral warm placeholder with TODO in HUMAN_TASKS.md. Shared components: Screen, Card, Button, ListItem, ErrorState, EmptyState, OfflineBanner. Every screen works offline with cached content and shows a friendly error if the network fails. No feature logic yet, only stub screens.

CONTEXT
Followers are everyday people, many on older phones. Keep it fast, simple, and obvious. Max two taps to any feature from Home.
```
