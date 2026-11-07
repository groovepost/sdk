# GroovePost SDK

Documentation and independent examples for the GroovePost SDK, CLI, MCP and site design.
Implementation lives in the private platform repository; this is the canonical consumer documentation.

## Start here

- [Design a site](docs/site-design.md): supported themes/layouts, design briefs and agent workflows.
- [Agent quickstart](docs/agents.md): discovery, permissions and safe changes.
- [Getting started](docs/getting-started.md) and [SDK client](docs/client.md).
- [CLI reference](docs/cli.md), [MCP setup/reference](docs/mcp.md) and [operation schemas](docs/operations.md).
- [Package inventory](docs/packages.md), [examples](examples/README.md) and [troubleshooting](docs/troubleshooting.md).

## Guides

[Architecture](docs/architecture.md), [onboarding](docs/onboarding.md),
[environments](docs/environments.md), [authentication](docs/authentication.md),
[configuration](docs/configuration.md), [hosted apps](docs/hosted-apps.md),
[developer contract](docs/developer-contract.md), [controls](docs/theming.md),
[data](docs/data-and-sessions.md), [forms](docs/forms-submissions.md),
[email](docs/submission-email.md), [services](docs/services.md),
[commerce](docs/commerce.md), [advertising](docs/advertising.md),
[diagnostics](docs/logging.md), [app packages](docs/app-packages.md),
[site JSON transfer](docs/site-transfer.md) and [releases](docs/releases.md).

## Documentation development

Use Node 22+; CI uses Node 24. Run `npm ci`, `npm test` and `npm run docs:build`.
`npm run docs:dev` starts the local site. Ordinary docs builds require no private
checkout or package credentials. Examples require authenticated GitHub Packages access.

`versions.json` records verified registry releases. To intentionally update pins,
edit the inventory/example manifests and regenerate locks with package-read access.
Run `npm run reference:generate` to regenerate the operation and MCP references from
exact installed releases; authenticated CI runs `npm run reference:check` to detect drift.

Packages remain 0.x and require GitHub Packages read authentication. npmjs distribution
is not available. Package availability and hosted/customer/provider acceptance are separate.
Operator procedures, credentials and release evidence stay outside this consumer repository.
See [contributing](CONTRIBUTING.md) and [security reporting](SECURITY.md).
