# Elevate Branson

Mobile app for [Elevate Branson](https://elevatebranson.org/). Followers use it to stay informed about programs, talk with staff, give, schedule tours, and volunteer.

## Docs

- [CLAUDE.md](CLAUDE.md) — standing rules for every phase
- [docs/FEATURES.md](docs/FEATURES.md) — the 17 requested features
- [docs/DECISIONS.md](docs/DECISIONS.md) — stack choices
- [docs/BLOCKERS.md](docs/BLOCKERS.md) — failures that still need a fix
- [docs/HUMAN_TASKS.md](docs/HUMAN_TASKS.md) — accounts and content that need a person
- [docs/NAVIGATION.md](docs/NAVIGATION.md) — where each feature lives
- [docs/BRAND.md](docs/BRAND.md) — colors and type taken from the website
- [docs/STAFF_GUIDE.md](docs/STAFF_GUIDE.md) — how staff update programs, hours, and lists

## Setup

```bash
cp .env.example .env
npm install
npm start
```

Fill `.env` locally. Do not commit it.

`npm run web` opens the shell in a browser. `npm test`, `npm run lint`, and `npm run typecheck` check the project.
