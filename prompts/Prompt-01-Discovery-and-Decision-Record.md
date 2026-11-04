# Prompt 01: Discovery and Decision Record (Cognitive Verifier + Flipped Interaction)

**Elevate Branson App Prompt Chain | Prompt 1 of 9**
**Run in:** Claude Code, `C:\Users\msell\OneDrive\AIAlchemy\elevatebranson`
**When:** Paste into Claude Code after the previous phase has committed and pushed.

Copy everything in the box below.

```
GOAL
Resolve open questions before building. Read CLAUDE.md and docs/FEATURES.md.

FORMAT
Write docs/OPEN_QUESTIONS.md, a table with: question, why it matters, recommended default, who answers. Then ask me ONLY the questions that cannot be defaulted, max 7, in one message.

GUARDRAILS
- Defaults must keep the build unblocked. Mark each default "assumed" in docs/DECISIONS.md.
- Verify via web search, then cite in DECISIONS.md: current Apple App Store rules for nonprofit donations and external payment links; Expo push notification setup requirements; current free-tier limits of the chosen CMS and email service. Flag anything uncertain as "verify".

CONTEXT
Questions to consider: official 10-program list; staff who maintain content (technical level); existing donation platform; existing merch store; tour scheduling tool; how housing list is maintained (spreadsheet? PDF?); newsletter platform (Mailchimp, Constant Contact, etc.) and whether it has an RSS feed or API; brand assets (logo, colors, fonts); developer accounts (Apple $99/yr, Google $25 once; nonprofit fee waivers may apply to Apple); volunteer coordinator email; privacy policy URL.
```
