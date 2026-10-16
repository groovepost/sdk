# CLI and MCP

Install exact verified versions through the configured GitHub registry:

```sh
npm install --save-dev --save-exact @groovepost/cli@0.6.7
```

Use project-local scripts or `npx --no-install groovepost` so an unexpected registry
version is not installed. Configure `GROOVEPOST_API_URL` including `/api/v1`,
`GROOVEPOST_TENANT` and `GROOVEPOST_ENVIRONMENT` for platform operations. Run
`groovepost doctor` to diagnose local application configuration.

`groovepost auth login` uses the platform authorization flow. Ordinary administrator
or customer credentials retain normal REST permissions. Do not use service-role
keys. See [repository setup and builds](repository-builds.md) for the new deployment contract and its publication status. The CLI also supports repository builds,
entity operations and content/design-kit tools. Some content tools depend on
additional shared publishing packages.

## MCP

`@groovepost/mcp@0.5.5` provides the `groovepost-mcp` stdio binary and explicitly
registered REST-backed tools. Configure the same API URL, environment and tenant,
and an ordinary administrator or customer token for the intended scope. Stdout
is reserved for MCP protocol output.

MCP is an adapter over supported REST operations; it grants no direct database or
storage access. A hosted `/mcp` endpoint also requires platform OAuth/provider
activation and acceptance; package installation does not prove it operational.
Keep tokens in the MCP client's secret configuration rather than public examples.
