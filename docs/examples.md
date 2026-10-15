# Examples

Each example is an independent consumer of released packages, with no workspace
links or private source imports. See `examples/` in the repository for full files.

| Example          | Demonstrates                                                             | Run after npm ci                              |
| ---------------- | ------------------------------------------------------------------------ | --------------------------------------------- |
| rest-client      | Scoped SDK requests with a fixture fetch; optional live customer session | npm test; npm start                           |
| countdown-screen | defineScreen, validated options, cleanup and frontend archive packaging  | npm run typecheck; npm test; npm run package  |
| themed-controls  | Shared Button/Field and a composed tenant wrapper                        | npm run typecheck; npm run build; npm run dev |

Configure package authentication first. Offline fixture tests make no live writes.
The REST example's `--live` flag creates a customer session against your configured
API; use a development tenant. Packaging does not deploy. The UI example is a
standalone preview; hosted context remains authoritative for production branding.
