# CLI and MCP

Choose the interface that fits your workflow. All retain the caller’s REST permissions.

| Interface | Start here | Discovery |
| --- | --- | --- |
| SDK | [REST and hosted clients](client.md) | Typed declarations and [operation reference](operations.md) |
| CLI | [CLI reference](cli.md) | `groovepost --help`, `groovepost api list` |
| MCP | [MCP setup and reference](mcp.md) | MCP `tools/list` |
| Site design | [Design a site](site-design.md) | Versioned [design kit](design-agent-kit.md) |
| Agents | [Agent quickstart](agents.md) | [Machine-readable operation schemas](operations.md) |

Install exact [verified package versions](packages.md) through authenticated GitHub Packages.
Local project scripts or `npx --no-install` use the reviewed installation; they do not fetch an unexpected release.
No interface grants direct database/storage access or additional permissions.

## Project configuration

CLI 0.9.7 reads a nonsecret schema-2 `.groovepost/project.json` containing API URL,
tenant ID/slug and environment. `apps init` creates the binding; explicit conflicting
values fail before credentials load. Unbound automation supplies `GROOVEPOST_API_URL`
(including `/api/v1`), `GROOVEPOST_TENANT` and `GROOVEPOST_ENVIRONMENT` explicitly.
CLI scoped environments are `development` or `production`.

`doctor` checks configuration offline. It does not log in, refresh a token or prove
hosted availability. Use `auth login` separately. Site JSON transfers share that
origin-bound login store; `GROOVEPOST_SITE_CONNECTIONS` is retired. Older bindings
must be reviewed and explicitly recreated with `apps init --tenant SLUG --directory PATH --adopt`.
MCP keeps its own client configuration and token storage; it does not inherit the CLI binding.
