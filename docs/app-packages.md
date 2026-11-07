# Local packages and Production promotion

Use the [verified CLI release](packages.md) for local builds and validation.
Uploads and promotion require the matching configured host and owner/admin access.

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

The archive includes manifest, minified production ES-module JavaScript/styles and initial `app.config.json` layout defaults. The API independently checks uploaded bytes, checksum, bounded archive, safe paths, manifest/SDK compatibility, origins and saved/published layout compatibility. The API parses syntax and actual module exports and rejects runtime module imports. It never executes code during admission; validation does not prove code harmless.

In Development App Builder, import package layout defaults explicitly if wanted. Save Draft, Preview and Publish are separate from uploading code. Built-in Post List apps need no package. Later uploads preserve compatible admin composition and reject missing/changed widgets with actionable errors.

`groovepost apps promote` copies the exact current Development package and published layout to Production after explicit operator authorization and revision checks. Draft changes, content, media, credentials and service configuration are excluded. Configure Production origins and required services independently. Direct Production upload and layout writes are rejected. Failure preserves the current app; successful retries are idempotent. Only current Development/Production package bytes are retained.

No repository connection, GitHub App, deployment branch or custom Action is required. Ordinary source hosting, CI and package registry credentials remain unrelated. Source hosting and registry access remain separate from the app upload workflow.

SDK `createDeploymentOperations` covers summaries, runtime settings and promotion. The authenticated operation catalog exposes upload admission, byte upload and completion to SDK, CLI and MCP; scoped mutations require tenant and environment. See the [platform contract](https://github.com/groovepost/platform/blob/main/docs/app-packages.md) for the API and limits.

Current builds use ES modules instead of global/IIFE packages; rebuild extensions with the verified CLI. Previously built IIFE artifacts must be rebuilt before use with this runtime. Public postal suggestions are available through `client.reference.postalCodeUS(zip)` (including the hosted client), with editable city/state choices and manual entry on failure.
