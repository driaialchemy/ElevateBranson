# Blockers

- `/forms/13/` and `/forms/30/` on the source site return 404 or redirect outside the allowed host.
- Push tokens are stored in memory (`src/server/pushMemory.ts`) and the push and staff routes have no server host; see "Open defects" in `docs/QA_REPORT.md`.
- No `eas.json` or worker config file yet (CC-07).
