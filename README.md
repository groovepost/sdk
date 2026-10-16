# Groovepost SDK

Developer documentation and independent examples for the Groovepost platform.
SDK implementation is maintained privately. This repository contains documentation,
example application code and release metadata; it is not an implementation mirror.

## Start here

- [Getting started](docs/getting-started.md): registry access, installation and first API call.
- [Package inventory](docs/packages.md): verified published versions and responsibilities.
- [Component architecture](docs/architecture.md): shared components and tenant customization.
- [Examples](examples/README.md): REST client, hosted screen, and themed React controls.
- [Release process](docs/releases.md): versions, compatibility and registry limitations.
- [Troubleshooting](docs/troubleshooting.md) and [support](CONTRIBUTING.md).

## Documentation development

Use Node 22 or newer. Run `npm ci`, `npm test`, then `npm run docs:dev`.
`npm run docs:build` creates the static documentation site. Documentation build
requires no private platform checkout or package credentials. Examples have their
own dependencies; see their READMEs for registry setup and verification commands.

## Current distribution status

SDK packages are currently distributed through GitHub Packages, which requires
package-read authentication. Token-free npmjs distribution is not yet available.
See the inventory for verified versions; newer platform APIs may be unreleased.
The documentation v1 milestone does not mean the SDK has reached version 1.0.

## Feedback

Use issues for reproducible SDK integration problems and documentation corrections.
Never post credentials, private tenant data or implementation code. See SECURITY.md
for private security reporting instructions.

See [repository setup and builds](docs/repository-builds.md) for the repository-based deployment workflow and its current publication/acceptance status.
