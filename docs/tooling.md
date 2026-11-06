# CLI and MCP

Install exact versions through the configured GitHub registry:

```sh
npm install --save-dev --save-exact @groovepost/cli@0.9.6
```

Use project-local scripts or `npx --no-install groovepost` so an unexpected registry
version is not installed. Configure `GROOVEPOST_API_URL` including `/api/v1`,
`GROOVEPOST_TENANT` and `GROOVEPOST_ENVIRONMENT` for platform operations. Run
the locally installed CLI's supported configuration checks. The unpublished
configuration-cleanup CLI candidate makes `groovepost doctor` an offline check of
the explicit `/api/v1` origin, environment, and tenant or local project binding.
It does not log in, refresh tokens or prove hosted access. Do not add a public
tenant variable as a runtime requirement to satisfy an older doctor's output.
Use `auth login` separately for authenticated operations.

`groovepost auth login` uses the platform authorization flow. Ordinary administrator
or customer credentials retain normal REST permissions. Do not use service-role
keys. See [local packages and promotion](app-packages.md) for the new deployment contract and its publication status. The CLI also supports local package verification and uploads,
entity operations and content/design-kit tools. Some content tools depend on
additional shared publishing packages.

## MCP

`@groovepost/mcp@0.7.4` provides the `groovepost-mcp` stdio binary and explicitly
registered REST-backed tools. Configure the same API URL, environment and tenant,
and an ordinary administrator or customer token for the intended scope. Stdout
is reserved for MCP protocol output.

MCP is an adapter over supported REST operations; it grants no direct database or
storage access. A hosted `/mcp` endpoint also requires platform OAuth/provider
activation and acceptance; package installation does not prove it operational.
Keep tokens in the MCP client's secret configuration rather than public examples.

## Configuration-cleanup candidate

Unpublished CLI 0.9.7 uses a schema-2 `.groovepost/project.json` binding as the
shared source of API URL, tenant and environment for scoped commands. Conflicting
explicit values fail before credentials are loaded. Unbound automation still
selects all three explicitly. Initial onboarding needs API URL and environment;
recreate an older binding explicitly with `apps init --tenant SLUG --directory
PATH --adopt` after reviewing the directory. Server public settings retain their
existing schema; no credential enters the project binding or public settings.

Site export/import uses the same origin-bound `auth login` store, replacing
`GROOVEPOST_SITE_CONNECTIONS`. Optional tenant/environment flags must match a
bound project. Use separate bound directories or explicit unbound commands for
cross-environment transfers. MCP continues to use its own client configuration;
this CLI change does not change MCP input or token storage. The install command
above stays pinned to the verified published release until candidate publication.
