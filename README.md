# Groovepost SDK

Developer documentation and independent examples for the Groovepost platform.
SDK implementation is maintained privately. This repository contains documentation,
example application code and release metadata; it is not an implementation mirror.

## Start here

- [Getting started](docs/getting-started.md): registry access, installation and first API call.
- [Package inventory](docs/packages.md): current versions and responsibilities.
- [Component architecture](docs/architecture.md): shared components and tenant customization.
- [Examples](examples/README.md): REST client, hosted screen, themed React controls and the native Post List consumer.
- [Release process](docs/releases.md): versions, compatibility and registry limitations.
- [Troubleshooting](docs/troubleshooting.md) and [support](CONTRIBUTING.md).

## Developer guides

- [Configuration sources](docs/configuration.md): standalone environment inputs and tenant database configuration.

- [Tenant onboarding](docs/onboarding.md), [environments](docs/environments.md) and [app packages](docs/app-packages.md)
- [App authoring](docs/developer-contract.md), [hosted widgets](docs/hosted-apps.md) and [controls](docs/theming.md)
- [Authentication](docs/authentication.md), [data](docs/data-and-sessions.md), [forms](docs/forms-submissions.md) and [email](docs/submission-email.md)
- [Services](docs/services.md), [commerce](docs/commerce.md) and [advertising](docs/advertising.md)
- [Design authoring](docs/design-agent-kit.md), [layouts](docs/site-layouts.md) and [site transfer](docs/site-transfer.md)

These are the canonical consumer guides. Operator deployment procedures, credentials,
database implementation and release evidence stay in the private platform repository.
Configuration ownership and the offline CLI candidate are documented in [CLI and MCP](docs/tooling.md); hosted apps receive context rather than service credentials.
Published versions remain governed by `versions.json`; documentation consolidation
publishes no packages and changes no application behavior.

## Documentation development

Use Node 22 or newer. Run `npm ci`, `npm test`, then `npm run docs:dev`.
`npm run docs:build` creates the static documentation site. Documentation build
requires no private platform checkout or package credentials. Examples have their
own dependencies; see their READMEs for registry setup and verification commands.

## Current distribution status

SDK packages are currently distributed through GitHub Packages, which requires
package-read authentication. Token-free npmjs distribution is not yet available.
See the inventory for exact package versions. Newer platform APIs require their
own package release and hosted rollout.
The documentation v1 milestone does not mean the SDK has reached version 1.0.

## Feedback

Use issues for reproducible SDK integration problems and documentation corrections.
Never post credentials, private tenant data or implementation code. See SECURITY.md
for private security reporting instructions.

See [local packages and promotion](docs/app-packages.md) for the package-based deployment workflow and its current publication/acceptance status.

The current platform candidate replaces worker-based transfers with direct Theme/Full Site JSON export, preview and import. Media references remain unchanged; media files are not transported. See [the JSON transfer contract](docs/site-transfer.md) and its release-status note.

The coordinated cleanup candidate in platform PR #199 generates SDK/CLI/MCP contracts from registered OpenAPI, uses production ES-module extension bundles, and provides a public postal-code lookup. See [candidate package notes](docs/packages.md#cleanup-candidate); the package-only toolkit release is published; hosted cutover remains a separate review step.

- [Optional app diagnostics](docs/logging.md): scoped SDK logging and owner/admin review (source candidate, awaiting coordinated package publication).

The unpublished configuration-cleanup CLI candidate consolidates project scope
in a nonsecret binding and site-transfer authentication in its existing account
login store. See [configuration and rollout](docs/tooling.md#configuration-cleanup-candidate);
registry examples remain pinned to published versions.

### Configuration abstraction candidate

Platform #201 and starter #93 use 25 canonical names: 23 shared and 2 platform-only. Standalone hosts resolve service credentials from server environment variables; GroovePost resolves them from encrypted tenant/environment connections. Shared services receive the same validated configuration. Independent accounts and authentication realms remain separate. Hosted SDK consumers receive public capability/context DTOs, never provider credentials, signing roots or database/storage secrets. Shared submission lifecycle and attachment behavior is owned by publishing packages. These candidates are unpublished; hosted cutover is separate.

See [configuration sources](docs/configuration.md) for the server adapters, canonical inventory and client boundary.
