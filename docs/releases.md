# Releases and compatibility

SDK implementation, builds, tests and publication stay in the private platform
monorepo. This public repository contains documentation and examples only.

## Current release path

The controlled platform release publishes immutable versions to GitHub Packages.
All six public package candidates are built/tested and audited for original source
files, maps, embedded maps and development files. Declarations, compiled JavaScript,
styles, assets and notices are expected distribution content.

Published JavaScript is inspectable. Keeping the implementation repository private
does not make distributed runtime code secret. Existing package license metadata
is unchanged; public repository visibility alone grants no new SDK license.

Versions are semantic package versions, currently 0.x. Pin exact versions and lock
files, review changes, test in development, then upgrade deliberately. Manifest SDK
compatibility and package versions are separate contracts. Do not infer stability
1.0 from this documentation milestone.

## Public documentation release checklist

1. Verify package availability and immutable registry contents after platform release.
2. Update `versions.json`, package table and exact example dependency pins together.
3. Install each example from the registry in an independent directory; run its checks.
4. Run documentation tests/build and update changelog/migration notes.
5. Review public changes for secrets/private source; publish through a docs PR.
6. Record hosted acceptance separately from local and registry checks.

The public CI checks docs and example metadata without private secrets. Registry
example smoke is explicitly dispatched with a package-read secret. Fork PRs never
receive that secret. The Pages workflow deploys main automatically and also supports manual dispatch.
The public site is https://groovepost.github.io/sdk/.

## npmjs migration

npmjs packages are not available yet. Shared presentation dependencies currently
exist in GitHub Packages and block comprehensive token-free npm installation.
Before switching, publish licensed compiled upstream artifacts (or a deliberate
bundled distribution), establish npm scope ownership and publishing authentication,
update registry configuration throughout the release pipeline, and verify an
unauthenticated installation of every package/example. Do not advertise npmjs
availability until those checks pass.

For independent apps, follow [branch package setup](./branch-packages.md) to publish
develop prereleases and promote the same package through main and GroovePost.
