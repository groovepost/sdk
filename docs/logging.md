# App diagnostics

> Available in the [verified package set](packages.md). Hosted collection and review
> require the matching platform API and environment permissions.

Logging is optional. It works without a repository connection or customer sign-in and does not change ordinary console behavior.

```ts
import { createGroovePostClient } from '@groovepost/app-sdk'
import { createAppLogger } from '@groovepost/app-sdk/logging'

const client = createGroovePostClient({ apiUrl, tenantSlug, environment })
const logger = createAppLogger(client, { releaseId, captureBrowserErrors: true })
logger.info('screen.opened', 'Screen opened', { screenId: 'news' })
logger.captureError(error)
await logger.flush()
logger.dispose()
```

The separate logging entry point keeps Pino out of apps that do not use it. Hosted widgets use `createHostedClient` with the same logger; the existing `logs.write` bridge supplies the host release identity. React Native apps use explicit logger calls and their own error boundaries. Browser uncaught-error capture is opt-in; no React Native global exception handler or console methods are replaced.

Remote collection defaults to `info` and above; `debug` stays local unless `remoteLevel: 'debug'` is selected. Failed uploads are dropped without retries. The in-memory queue is bounded to 100 events and sends at most 10 per batch. Flush at a safe lifecycle checkpoint; closing/backgrounding an app may lose its last events. Logging does not replace submission history or audit delivery.

Never send form answers, files, contact information, sessions, credentials or arbitrary customer objects. Structured metadata is filtered and bounded server-side, but personal information embedded in message text cannot be reliably removed automatically. Prefer event names and screen/widget IDs. `GroovePostError.requestId` is available for API correlation; `captureError` preserves it as `apiRequestId` metadata.

Owners/admins can review seven days of logs in their selected environment's **Logs** screen. App-submitted messages, client timestamps and reported release IDs are untrusted diagnostics. Internal platform diagnostics remain restricted to platform administrators.

```sh
groovepost logs list --source app --level error
groovepost logs list --request-id REQUEST_UUID
groovepost logs get EVENT_UUID
```

CLI login and existing tenant/environment permissions apply. MCP clients use generated `api_logs_list` and `api_logs_get` operations. Read the environment's authenticated OpenAPI documentation for filters and admission limits; no database or provider credentials belong in an app.
