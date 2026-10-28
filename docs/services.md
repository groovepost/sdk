# Core services

> These guides describe the current supported contracts. The [package inventory](packages.md)
> records verified published versions; newer source changes do not imply package publication
> or acceptance of your configured services. Check installed declarations and the selected
> environment's authenticated API documentation before using an operation.

Tenant administrators configure connections in **Services** (`/admin/services`).
The selected tenant environment owns its credentials; development and production
never inherit each other's connections. Twilio, Resend and social identity
connections use the existing encrypted, realm-bound provider store. Shopify's
existing commerce connection controls live on the same Services screen. Customer
accounts and suspension remain under Customer authentication.

Configuration API: `GET` and `PATCH /api/v1/services/{slug}/connections`, with the
SDK's selected environment header. Reads return status only. Omitted provider
groups preserve their credentials; null removes a connection; a supplied group
replaces that group's full settings.

## Twilio

Configure an Account SID and Auth Token, plus either or both:

- **Verify Service SID** (`VA…`): enables real customer phone verification through
  Better Auth. Apps use the shared customer authentication workflow;
  neither its app nor its SDK receives Twilio credentials or OTP secrets.
- **Messaging Service SID** (`MG…`): enables outbound SMS using that service's
  configured sender pool. Verify and Messaging are independent capabilities.

The identity delivery factory adapts the core connection to provider-independent
send/verify callbacks. Twilio owns OTP validation. Hosted dev never exposes a
sandbox code. Missing SMS configuration shows an unavailable message instead of
an empty authentication screen.

## SDK messaging

Use a tenant-authorized owner/administrator client in trusted server code:

```ts
const client = createGroovePostClient({
  apiUrl: configuredPlatformAPI,
  tenantSlug: "example-site",
  environment: "development",
  administratorToken: platformAccessToken,
});
const receipt = await client.services.messaging.sendSMS({
  to: recipientInE164Format,
  body: "Your collection has been reviewed.",
});
```

`POST /api/v1/services/{slug}/messaging/sms` also appears in the generated SDK,
CLI and MCP operation inventory. Customer capability tokens and editor membership
cannot send arbitrary outbound messages. Never ship administrator tokens to a
hosted widget. Callers own recipient permission and message purpose; App-specific
follow-up consent remains separate from verification and must be honored.

The API validates destination/body, selects only the environment's configured
sender, and limits each tenant/operator to 30 requests per minute. Receipts expose
provider message ID/status, never credentials, recipient or message content.
Provider acceptance does not prove carrier delivery. Ambiguous failures are not
automatically retried; check Twilio before retrying to avoid duplicate messages.
Provider errors are sanitized. No message-body logging or new queue is introduced.

The transport follows Twilio's [Messages API](https://www.twilio.com/docs/messaging/api/message-resource)
and existing [Verify API](https://www.twilio.com/docs/verify/api/verification).

## Hosted acceptance

Configure an authorized disposable tenant environment and verify real phone login,
session recovery and module operations with an operator-owned phone. Check outbound
messaging separately with a permitted recipient. Record provider acceptance
separately from delivery. Simulated tests do not establish hosted acceptance;
production configuration and deployment require their own authorized release.

Dynamically loaded service plugins and arbitrary public outbound email are deferred. Submission email is available through the [submission email service](submission-email.md). Trusted
server integrations expose their implemented capabilities as described below.

## Typed services and newsletter destinations

Services report their type (`email`, `sms`, `newsletter`) and supported operations
through `GET /api/v1/service-capabilities` / `client.services.capabilities()`.
Capabilities describe configured operations; they never grant permissions. Resend
identity delivery (`email.identity`) and public contact delivery (`contact.send`)
are distinct. Twilio Verify (`sms.verify`) and administrator-only outbound messaging
(`sms.send`) are distinct too. Arbitrary public email/SMS sending is not enabled by
newsletter support. New trusted server providers declare their type and implement
the corresponding operations; dynamically loaded service plugins remain deferred.

MailerLite connections are separate encrypted records per tenant environment.
Create any number in **Services → Newsletter**, enter an API key and Turnstile
secret, and enable each connection. The matching public Turnstile site key belongs
in site settings. **Verify connection and load groups** probes MailerLite without
subscribing anyone. Create named destinations mapping a connection to one of its
groups; optionally select one site default. Group membership is checked on save.
Blank secrets preserve an existing connection; supplying secrets replaces both.
Disable connections or destinations to stop signup. Disabling the default does not
silently route forms elsewhere.

The existing CTA offers `ctaType: newsletter`, reusing the footer's shared signup
form. Both select an available destination or leave it blank for the explicit site
default. Destination IDs are portable content; provider group IDs and credentials
stay in environment configuration. Missing configuration disables signup in the
form and rejects submissions on the server. A saved unavailable destination never
falls back to a different connection. Development cannot inherit production keys.

Independent applications use the same operation as the first-party site:

```ts
const { destinations } = await client.services.newsletter.destinations();
await client.services.newsletter.subscribe({
  destinationId: selectedDestinationId, // omit to use the site default
  email,
  firstName,
  lastName,
  turnstileToken,
});
```

Hosted widgets use `createHostedClient(...).services.newsletter` and declare
`newsletter.subscribe` in their manifest capabilities. The host checks the
manifest; the API checks the destination's current tenant/environment and enabled
connection at submission time. Signup requires a valid `newsletter` Turnstile
action and shares an environment limit of 60 provider subscriptions per minute.
MailerLite subscriber upserts do not force existing subscriber status to active.
Provider failures are sanitized and not automatically retried.

Management uses `client.services.newsletterConfiguration` (`get`, `saveConnection`,
`groups`, `saveDestination`), also exposed in OpenAPI and generated CLI/MCP
operations. Newsletter connections are independent of the identity/SMS enable switch.

### Setup and acceptance

Configure newsletter connections and destinations explicitly through Services in each
selected environment. Footer content areas preserve destination IDs and each block's
newsletter/contact settings; there is no historical footer-group conversion path.

1. Verify the connection in Services and check the default destination plus any
   CTA or footer-block overrides.
2. Submit an operator-controlled signup and confirm the intended MailerLite group.
3. Verify disabled and cross-environment destinations fail closed. Record the tested app version and provider result. Local mocked delivery does not establish hosted
   MailerLite acceptance. The standalone starter configures its own destinations.
