# Blockers

- `/forms/13/` and `/forms/30/` on the source site return 404 or redirect outside the allowed host.
- Push tokens are stored in memory (`src/server/pushMemory.ts`) and the push and staff routes have no server host; see "Open defects" in `docs/QA_REPORT.md`.
- No worker config file in the repo; the runbook shows the `wrangler.toml` to create.
- CU-04: `assets/incoming/Elevate Logo Color.png` is missing. A file named `assets/brand/Elevate Logo Color.png` is 300 by 150, under the 1024 minimum, so icons were not replaced and the image was not upscaled.
