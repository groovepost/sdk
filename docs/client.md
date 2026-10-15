# REST client

`createGroovePostClient` accepts an explicit `apiUrl`, `tenantSlug` and optional
`environment`, customer capability and administrator token. Select environment
explicitly in every deployment; operations may otherwise default to production.

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

Methods cover data, seller drafts, photos, verification, submissions, developer
onboarding and hosted app lifecycle. Consult installed declarations for exact
request/response shapes. REST remains authoritative for permissions and validation.
