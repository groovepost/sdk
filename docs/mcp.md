# MCP setup and reference

`@groovepost/mcp@0.7.5` provides local stdio and an adapter for authenticated hosted
Streamable HTTP. Both expose supported REST operations with the caller’s permissions.
Start with the [operation reference](operations.md) and [authentication guide](authentication.md).

## Local stdio

Install the exact package through [GitHub Packages](getting-started.md). Point the
MCP client at the installed binary; use an absolute path so startup does not download packages.
A typical client configuration has this shape (client-specific secret injection varies):

```json
{
  "mcpServers": {
    "groovepost": {
      "command": "/absolute/project/node_modules/.bin/groovepost-mcp",
      "env": {
        "GROOVEPOST_API_URL": "https://your-platform.example/api/v1",
        "GROOVEPOST_TENANT": "example-site",
        "GROOVEPOST_ENVIRONMENT": "development"
      }
    }
  }
}
```

Supply `GROOVEPOST_ADMIN_TOKEN` or `GROOVEPOST_CUSTOMER_TOKEN` through the client’s
secret mechanism for the intended role. The JSON above deliberately contains no
credential. CLI login files/project bindings are not read by the stdio server.
Stdio accepts `development` or `production`; set the API URL and environment before
starting it. Tenant can be omitted for account discovery but is required for scoped tools.
Stdout is exclusively MCP protocol traffic. Diagnose startup failures through stderr.

## Hosted connection

In a client supporting OAuth and Streamable HTTP, add `https://YOUR_PLATFORM_ORIGIN/mcp`
using the configured platform origin, not the `/api/v1` base. Let the client discover
OAuth metadata, open consent and complete PKCE. The host must have MCP and its
resource-bound OAuth client enabled; installation alone does not configure these.
Refresh/revocation are host-owned. A missing provider, denied consent, missing tenant
membership or wrong OAuth resource must be resolved at the owning configuration boundary.

Hosted scoped calls include explicit `tenant` and `environment` arguments. Customer
operations additionally use the explicit `customerSession` capability when required;
developer OAuth never impersonates a customer. Consult `tools/list` for the selected
host’s exact schemas, since they include hosted scope fields absent from stdio tools.

## Discovery and calls

1. Initialize the MCP connection and send the initialized notification.
2. Call `tools/list`; select the exact registered name and inspect its input schema.
3. Call `tools/call` with that name and validated arguments.
4. Inspect both protocol errors and tool results with `isError: true`.

```json
{"jsonrpc":"2.0","id":2,"method":"tools/list","params":{}}
```

A read-only account discovery call (after initialization):

```json
{"jsonrpc":"2.0","id":3,"method":"tools/call","params":{"name":"tenant_list","arguments":{}}}
```

Generated REST tools use `api_` names and inputs grouped as `params`, `query` and
`body`. [Download the operation/tool schemas](operations.md) for the pinned release;
`tools/list` remains authoritative for a running server. Convenience tools additionally
cover tenant discovery, public developer settings, data entities, forms and submissions.
The reference includes each stdio tool’s description and complete input schema.

Successful calls return MCP content containing JSON text. Tool errors set `isError`
and include JSON with code/message and, for API errors, HTTP status. Unauthorized calls
do not acquire privileges; fix login/membership/scope. Reload and reconcile revision
conflicts. Reuse entity operation IDs only for identical retries. Binary generic
operation results use `{mimeType,dataBase64}`. Neither tokens nor service credentials
belong in tool descriptions or logs.

## Mutation workflow

Begin in Development. Read existing state, inspect permissions and record the selected
tenant/environment. Use revision checks and JSON preview/destination confirmation where
required. Obtain explicit approval for destructive operations, content publication and
Production changes; tool availability itself is not approval. See [agent guidance](agents.md).

Troubleshoot startup paths/registry access separately from OAuth and API permissions.
A successful mocked protocol test does not prove live OAuth, provider delivery or hosted acceptance.
