# Versioned design agent kit

> These guides describe the current supported contracts. The [package inventory](packages.md)
> records verified published versions; newer source changes do not imply package publication
> or acceptance of your configured services. Check installed declarations and the selected
> environment's authenticated API documentation before using an operation.

Export the kit from the installed CLI:

```sh
groovepost design-kit export --output NEW_DIRECTORY
groovepost site validate --source NEW_DIRECTORY
groovepost site pack --source NEW_DIRECTORY --output site.tar
```

Export into a new directory, then author its site source before validating or
packing. The exported `START-HERE.md`, `AUTHORING.md`, `RENDERER.md`,
`capabilities.json` and examples are the versioned authoring reference. No private
platform checkout or personal skill is required. Read all four before promising
a design; the installed kit's capabilities define supported fields and behavior.

Read `kitVersion` and exact renderer/package compatibility from the installed
kit's `capabilities.json`. Use the kit shipped with that CLI and a matching host
renderer; package versions and kit versions are separate. Source snapshots and
historical package inventories do not establish what is published or deployed.
Verify required versions in the authenticated registry before installing them.
Local mocks may render with the shared publishing packages without importing
content. Honor the client's approval checkpoint before any managed-content write.

Supply `site.json`, original checksum-addressed assets and separate `design.json`
review metadata. Record faithful recreation versus modernization, source provenance,
viewport sizes, field mappings, assumptions and remaining differences. Validate
structural compatibility, then compare desktop/mobile captures of the actual
imported renderer. Packaging does not certify client approval.

Offline archives produced by `site pack` are authoring artifacts, not inputs to the
JSON Import / Export API. To apply supported JSON, use a running site export and the
[JSON transfer workflow](site-transfer.md): Theme changes visual settings; Full Site
replaces supported editorial content. First use a disposable development tenant, review removed/replaced counts,
then confirm the exact destination. Production application requires separate
approval. [Site transfer](site-transfer.md) explains execution prerequisites.

See [practical layouts](site-layouts.md) for reusable publishing controls. Contact
and newsletter presentation does not configure delivery; use [services](services.md).

For design briefs, supported theme/block choices and agent prompts, start with [Design a site](site-design.md).
