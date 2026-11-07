# Agent quickstart

For website design, start with [Design a site](site-design.md). For implementation,
choose the [SDK](client.md), [CLI](cli.md) or [MCP](mcp.md); no private source checkout is required.

1. Read [package versions](packages.md), [configuration](tooling.md#project-configuration)
   and [authentication](authentication.md). Use the installed release’s declarations/schemas.
2. Select the explicit API origin, tenant and Development environment. Keep customer
   capabilities separate from administrator access and keep credentials out of code/output.
3. Discover operations using `groovepost api list`, `@groovepost/app-sdk/operations`
   or MCP `tools/list`. The [operation reference](operations.md) records pinned schemas.
4. Read existing state and validate inputs. For design, produce a supported block map,
   assumptions, capability gaps and desktop/mobile comparisons before applying changes.
5. For mutations, preserve unrelated records, use the current revision/version, retain
   operation IDs for identical retries and reconcile conflicts. Preview replacement imports,
   retain backups and confirm the exact destination. Request explicit authorization for
   destructive changes, publication and Production operations.
6. Report exact commands/checks, selected scope, changes, remaining gaps and hosted
   verification limits. A build, package install or mocked test does not establish live acceptance.

## SDK discovery example

```ts
import { operationCatalog } from '@groovepost/app-sdk/operations'
const reads = operationCatalog.filter(operation => operation.method === 'GET')
```

Use the root SDK entry point for runtime clients and the separate operations entry point
for schema discovery. Do not scrape private implementation files or invent operation names.
