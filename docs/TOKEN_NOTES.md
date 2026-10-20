# Token and context notes

## Large committed files

Committed files over 200 KB outside `assets/site/`:

- `docs/brand-reference/website-1280.png` — 1,750,988 bytes.
- `docs/brand-reference/website-390.png` — 626,610 bytes.
- `package-lock.json` — 491,901 bytes.
- `Elevate-Branson-Prompts-docx.zip` — 388,737 bytes.
- `docs/brand-reference/after/home-1280.png` — 276,783 bytes.

`assets/site/` images are intentional optimized source assets. `content/pages/` and `content/manifest.json` are intentional importer seed data and should remain committed.

## Ignore coverage

`.gitignore` excludes dependency installs, Expo caches, native build output, web/build directories, coverage, local data/logs, environment files, and generated caches. Lockfiles and the app's imported content/assets stay tracked.

## Configured MCP servers

Available in this Codex environment: `artifact_session`, `aws_mcp`, `code_review`, `codex_app`, `codex_apps` (Document Control, Notion, Pets, Plugin Management, Safety Settings, Search Service), `cua_repl`, `gmail_digest`, `node_repl`, and `web`.

For this mobile-app project, keep `codex_app` and `code_review`; use `web` and `cua_repl` when source research or visual QA is needed. Consider disabling `aws_mcp`, Notion, Document Control, Pets, Plugin Management, Safety Settings, Gmail, `artifact_session`, and `node_repl` for this project. These are recommendations only; no global configuration was changed.

## Available skills

- Core: `imagegen`, `openai-docs`, `skill-creator`, `skill-installer`, `computer-use:computer-use`, `documents:documents`, `pdf:pdf`, `presentations:Presentations`, `spreadsheets:Spreadsheets`, `spreadsheets:excel-live-control`, `template-creator:template-creator`, `visualize:visualize`.
- AWS: `aws-core:amazon-bedrock`, `aws-core:aws-ai-ml`, `aws-core:aws-auth`, `aws-core:aws-billing-and-cost-management`, `aws-core:aws-blocks`, `aws-core:aws-cdk`, `aws-core:aws-cloudformation`, `aws-core:aws-compute`, `aws-core:aws-containers`, `aws-core:aws-database`, `aws-core:aws-deployment`, `aws-core:aws-iam`, `aws-core:aws-messaging-and-streaming`, `aws-core:aws-observability`, `aws-core:aws-sdk-js-v3-usage`, `aws-core:aws-sdk-python-usage`, `aws-core:aws-sdk-swift-usage`, `aws-core:aws-secrets-manager`, `aws-core:aws-security`, `aws-core:aws-serverless`, `aws-core:aws-storage`, `aws-core:launch-with-aws`, `aws-core:signing-in-to-aws`.
- Notion: `notion:notion-database-designer`, `notion:notion-meeting-intelligence`, `notion:notion-research-documentation`, `notion:notion-spec-to-implementation`, `notion:notion-weekly-project-digest`.
- Pets: `work-pets:create-pet`, `work-pets:pets`, `work-pets:update-pet`.

For routine app phases, keep only `computer-use:computer-use` when visual checks are needed. AWS, Notion, Pets, Office-document, spreadsheet, image-generation, and visualization skills are not needed unless a phase explicitly calls for them. Do not edit `~/.codex/config.toml`; change global setup only on a direct user request.
