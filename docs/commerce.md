# Commerce and Shopify

SDK 0.6.0 contains tenant/environment-scoped product and cart
operations and hosted bridge operations for commerce. Commerce requires a configured Shopify tenant integration; package publication alone
does not demonstrate live Shopify acceptance.

The source contract exposes product listing/detail, cart reads, and cart line
add/update/remove operations with typed Product and Cart responses. Checkout uses
the returned checkout destination. Shopify credentials belong in platform tenant
configuration, never in a custom app bundle or this public repository.

The design direction is Shopify primitives → Groovepost reusable commerce views →
tenant customization. The current shared UI package does not provide a complete
Shopify-derived product card/cart component library. No Shopify SDK dependency is
required by the examples in this documentation milestone.

Commerce UI should eventually follow the same branding, composition and override
principles as other shared controls. Read the [architecture decision](./architecture.md)
before introducing duplicate tenant components.
