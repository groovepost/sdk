# Authentication and sessions

> These guides describe the current supported contracts. The [package inventory](packages.md)
> records verified published versions; newer source changes do not imply package publication
> or acceptance of your configured services. Check installed declarations and the selected
> environment's authenticated API documentation before using an operation.

Platform/developer accounts and tenant customer accounts use separate identity
realms. A platform login grants only current tenant memberships and roles, not
customer access. A customer identity in one environment does not grant access to
another. Provider settings and secrets remain on the platform.

## Developer access

Set `GROOVEPOST_API_URL` to the explicit `/api/v1` base and run
`groovepost auth login`. Browser consent uses PKCE and loopback redirection.
`auth status` reports the saved connection; `auth logout` revokes it and removes
local credentials. Tokens are private local files, resource-bound and refreshable.
Never embed administrator tokens or service-role credentials in an app bundle.

Hosted `/mcp` uses OAuth discovery, consent, refresh and revocation at the configured
platform origin. Stdio MCP uses the ordinary caller token supplied in the client's
secret configuration. Both retain REST membership and permission checks.

## Customer access

Hosted widgets request host-owned authentication through `createHostedClient`.
Use `session.authenticate({providers: ["google", "facebook"]})` when those providers
are configured. Authenticated customers can explicitly link a supported social
provider. Direct clients use the customer session API and handle their session
storage, expiry and recovery; see [REST client](client.md).

Owners configure approved Google/Facebook, email or Twilio Verify connections in
Services for the selected environment. Configure challenge protection for the real
app hosts. Missing configuration cannot be replaced by a platform-wide secret or
a sandbox code. Development pages are public; private operations still require
authorized customer/admin identity.

Contact-email verification is separate from login and does not merge accounts.
Verified Google/Facebook identity email can qualify as verified contact ownership;
a changed contact email can be verified through `session.verifyEmail(email)`.
Email-only forms do not require SMS. Forms declaring `phoneField` require verified
phone ownership matching that answer. Phone collection itself does not imply SMS.
Never infer successful delivery from provider acceptance or a local test fixture.

Verify login, canceled/expired sessions, recovery and each enabled provider against
real configured development resources before enabling a consumer workflow.
See [forms](forms-submissions.md) and [submission email](submission-email.md).
