# Site transfer

> These guides describe the current supported contracts. The [package inventory](packages.md)
> records verified published versions; newer source changes do not imply package publication
> or acceptance of your configured services. Check installed declarations and the selected
> environment's authenticated API documentation before using an operation.

Site transfer replaces supported editorial content between resource environments
of the same tenant account inside one platform instance. Environment membership
and administrator access are checked when requesting and executing each operation.
Source environments come from the tenant environment registry; there is no manual
pairing or remote peer configuration.

Shared publishing packages own archive validation, relationship remapping, original
media, draft/published separation and atomic replacement. The platform supplies
resource scope, private storage, authorization and durable jobs. Domains,
credentials, integrations, access and billing stay with the destination.

## Availability

Transfer execution requires operator-provisioned storage and an explicitly run
worker. Background scheduling is deferred. Confirm execution availability with
the operator before starting an import; do not assume a queued request will run.
Offline validation and packing need neither credentials nor a running worker.

The admin interface and `groovepost site` support export, import, transfer, status, apply
and restore. CLI requests use the configured platform connection and explicit tenant
environment. A transfer selects `--from` and `--to` environments of that account.
Imports, transfers and restores stop at a preview. Applying requires the exact
`environment:tenant-slug` destination confirmation. Changed destinations or packages
require a fresh preview. A backup and committed receipt protect replacement and
retry; restore creates another preview requiring confirmation.

Only full supported editorial replacement is documented here. Content-only and
settings-only template modes are future scope. Customer data, forms/submissions,
credentials, domains and billing are excluded. See [design authoring](design-agent-kit.md).
