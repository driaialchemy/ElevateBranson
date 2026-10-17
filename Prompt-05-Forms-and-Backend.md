# Prompt 05: Forms and Backend (Volunteer, Tour, Prayer)

**Elevate Branson App Prompt Chain | Prompt 5 of 9**
**Run in:** Claude Code, `C:\Users\msell\OneDrive\AIAlchemy\elevatebranson`
**When:** Paste into Claude Code after the previous phase has committed and pushed.

Copy everything in the box below.

```
GOAL
Implement three forms plus a serverless endpoint that emails staff.

FORMAT
- Volunteer: select program (from CMS), name, email, phone optional, message. Emails the volunteer coordinator.
- Campus tour: name, email, phone, preferred dates and times, group size. Emails the tour contact. (If a scheduling tool exists per DECISIONS.md, deep link to it instead and keep the form as fallback.)
- Prayer request: request text, optional name and contact, "share publicly" toggle default OFF. Emails the prayer team.
Endpoint at /api/submit with a type field, input validation, per-IP rate limiting, honeypot field for spam, and a confirmation message in the app. Zod schemas shared between client and server.

GUARDRAILS
Rules from CLAUDE.md apply, especially #4 and #9. No form content in logs or analytics. Recipient emails come from server env vars only, never shipped in the app bundle. Tests: validation, rate limit, and a mocked email send. Include a retry queue so a submission made offline sends when connectivity returns.

CONTEXT
Staff follow up by conversation. Confirmation copy should set a realistic expectation ("Our coordinator will reach out").
```
