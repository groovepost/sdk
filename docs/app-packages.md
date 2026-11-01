# Local packages and Production promotion

This is the package-based App Builder candidate coordinated with platform PR #199. Use its source CLI for validation until the changed packages have been released; registry pins must be verified before adoption.

```sh
groovepost auth login
groovepost apps init --tenant YOUR_TENANT --directory ./app
cd app
npm install
npm run build
groovepost apps verify dist/app.tar.gz
# Set GROOVEPOST_API_URL, GROOVEPOST_TENANT and GROOVEPOST_ENVIRONMENT=development.
groovepost apps deploy dist/app.tar.gz
```

The archive includes manifest, compiled JavaScript/styles, export inventory and initial `app.config.json` layout defaults. The API independently checks uploaded bytes, checksum, bounded archive, safe paths, manifest/SDK compatibility, origins and saved/published layout compatibility. It never executes code during admission; validation does not prove code harmless.

In Development App Builder, import package layout defaults explicitly if wanted. Save Draft, Preview and Publish are separate from uploading code. Built-in Post List apps need no package. Later uploads preserve compatible admin composition and reject missing/changed widgets with actionable errors.

`groovepost apps promote` copies the exact current Development package and published layout to Production after confirmation and revision checks. Draft changes, content, media, credentials and service configuration are excluded. Configure Production origins and required services independently. Direct Production upload and layout writes are rejected. Failure preserves the current app; successful retries are idempotent. Only current Development/Production package bytes are retained.

No repository connection, GitHub App, deployment branch or custom Action is required. Ordinary source hosting, CI and package registry credentials remain unrelated. Existing hosted build integrations retire only after a separately authorized cutover; this candidate does not delete hosted state.

SDK `createDeploymentOperations` covers summaries, runtime settings and promotion. The authenticated operation catalog exposes upload admission, byte upload and completion to SDK, CLI and MCP; scoped mutations require tenant and environment. See the [platform contract](https://github.com/groovepost/platform/blob/codex/admin-editor-polish/docs/app-packages.md) for the candidate API and limits.
