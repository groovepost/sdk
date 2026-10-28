# Shopify customer accounts

> These guides describe the current supported contracts. The [package inventory](packages.md)
> records verified published versions; newer source changes do not imply package publication
> or acceptance of your configured services. Check installed declarations and the selected
> environment's authenticated API documentation before using an operation.

The existing Storefront connection supplies catalog and visitor carts. Customer
Account API credentials are separate, encrypted configuration on that same
connection. No Admin API credential or copied order database is required.

The typed client supports product listing/detail, cart reads and line add/update/remove.
Catalog and carts use the selected environment's Storefront configuration. Independent
apps own their screens and may compose shared themed controls. No Shopify SDK is
required in the frontend. `ProductWidget` is a shared card; a complete Shopify-derived
component library or generic slot/override API is not promised.

Owners configure `/apps/{slug}/{environment}/commerce/account/configuration` with
`settings: {clientId, clientSecret, trustedOrigins}` or `settings: null` to disable.
GET returns configuration status and the exact callback URL without credentials.
Use a confidential Headless customer account client. Register the returned HTTPS
callback in Shopify. API version is pinned to 2026-10. Discovery accepts only
explicit first-party Shopify HTTPS origins; custom customer-account domains are
currently unsupported. Never add a customer-supplied discovery destination.

The host uses its tenant customer cookie session for account operations. Connect
and disconnect require authentication within the last 15 minutes. Anonymous or
suspended users cannot connect. A link proves control of both accounts and never
matches customers by email or phone. A customer must explicitly disconnect before
replacing a linked Shopify identity; duplicate links return account recovery errors.

Account callbacks are short-lived, single-use and bound to the initiating customer,
session and environment. Configuration changes invalidate pending links and carts.
Expired grants require reconnecting. Logout prevents session access but does not
unlink the account. Disconnect removes the local link; it does not promise global
Shopify logout or provider-side revocation. Tokens never reach app code.

Order reads use the authenticated customer's Customer Account token. Pagination
uses opaque cursors; order detail is authorized by Shopify, never by a client
customer ID. Access and refresh tokens are never returned by REST or the bridge.

## Checkout

Owners may configure a country/language market and exact HTTPS checkout origins
on the Storefront connection. Catalog queries and carts use the same configured
market. `/commerce/checkout` prepares the current visitor cart, applies discount
codes and, for a linked customer, sets Shopify buyer identity with the server-only
Customer Account access token. Failed or expired links require reconnecting;
they never silently become guest checkout. Guests without a link can check out.

Buyer-bound cart references are scoped to the current customer and session.
Logout, suspension, deletion and credential changes clear them. Local ownership
is committed even if an external buyer-identity update has an ambiguous failure.
Cart IDs and buyer credentials never leave the service. Checkout destinations
must match the configured shop or explicit owner-approved checkout origins.

Shopify warnings are shown before the customer continues; rejected discounts
return an actionable error. Changing the cart, discounts or authentication
invalidates a prepared checkout. A redirect is not evidence of payment completion.
OAuth callbacks return to a validated originating app path with a generic status.

## Hosted widgets and acceptance

Declare `commerce.account` or `commerce.checkout` for corresponding hosted operations.
The host owns authorization and checkout navigation. Widget code receives neither
provider tokens nor the checkout redirect URL. Same-document widgets are trusted
code; capabilities are not a browser sandbox.

Catalog/guest checkout can work without customer sign-in. Verify real customer
login, two distinct order histories, expired links, logout/reconnect, and both
guest/authenticated checkout using a configured development shop before activation.
A redirect is not payment evidence. Local fixtures do not establish provider acceptance.
