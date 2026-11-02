# REST client

`createGroovePostClient` accepts an explicit `apiUrl`, `tenantSlug` and optional
`environment`, customer capability and administrator token. Select environment
explicitly in every deployment; reads may otherwise default to Production; scoped mutations require an explicit environment.

```ts
import { createGroovePostClient, GroovePostError } from "@groovepost/app-sdk";
const api = createGroovePostClient({
  apiUrl: configuration.apiUrl,
  tenantSlug: configuration.tenant,
  environment: "development",
});
try {
  const session = await api.createCustomerSession();
  // Store session.token using your application's session policy.
} catch (error) {
  if (error instanceof GroovePostError) {
    console.error(error.status, error.code);
  } else {
    throw error;
  }
}
```

Do not put privileged administrator tokens in public browser bundles. A customer
capability and an administrator login have separate permissions. Hosted apps
should use the bridge rather than receive platform credentials.

The client appends request paths to the configured API URL and sends tenant
scope in `x-groovepost-tenant`. The URL must include `/api/v1`. A custom `fetch`
implementation supports fixtures and integration testing. Requests reject
redirects; fix the configured URL rather than relying on a redirect.

Methods cover data, versioned form drafts, images, verification, submissions, developer
onboarding and hosted app lifecycle. Consult installed declarations for exact
request/response shapes. REST remains authoritative for permissions and validation.

See [authentication](authentication.md), [data](data-and-sessions.md) and
[forms](forms-submissions.md) for scope, validation and lifecycle contracts.

## Postal-code reference data

`client.reference.postalCodeUS("02108")` uses the public cacheable `GET /api/v1/reference/postal-codes/us/{zip}` endpoint. It returns `{country:"US",postalCode,places:[{city,state}]}`; unknown ZIPs return an empty list and malformed ZIPs are rejected. The hosted client exposes the same operation without customer authentication. These are suggestions, not address verification; keep manual entry available.

## Candidate: lightweight runtime and separate discovery

The coordinated PR #199 candidate keeps `api.operations.invoke(name, input)` in
`@groovepost/app-sdk`. Import full schemas and CLI/MCP tool metadata separately:

```ts
import { operationCatalog } from "@groovepost/app-sdk/operations";
```

The candidate removes the root `operationCatalog` export and client-bound
`operations.list()`. Update discovery consumers together; browser/native apps
should use only the runtime entry point. The generated compact invocation map
and full catalog share the reviewed OpenAPI exposure inventory. Runtime clients
reuse one transport while retaining injected fetch, current customer tokens,
explicit mutation environments, binary responses and structured errors.

This API change is a source candidate, not a statement of registry availability.
Package publication and exact consumer-pin updates require the release gate.
