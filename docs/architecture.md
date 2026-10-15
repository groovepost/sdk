# Component architecture

Decision: compose shared components in layers and keep tenant applications small.

```text
Shopify commerce primitives (where needed)
                 ↓
Groovepost shared behavior and presentation
                 ↓
Tenant branding, configuration and specialized UI
```

## Ownership

Shopify supplies commerce primitives. Groovepost owns reusable app contracts,
shared controls and platform integration. Tenant apps such as Digger's Union own
specialized experiences and consume tenant branding from platform context.

Use composition and configuration instead of class inheritance. Prefer strong
defaults, then theme tokens, documented props, child composition, and explicit
component overrides where supported. Add reusable behavior to shared packages
before duplicating it across tenants. Avoid a separate component copy per app.

## Implemented today

The UI package reuses shared publishing controls and styles. Hosts supply tenant
theme variables and public presentation metadata. REST/hosted SDK boundaries keep
credentials and platform policy in the host. Apps can use shared controls or author
custom presentation against the same services.

## Direction, not a current API promise

A full Shopify-wrapped product-card/cart component set and a uniform slot/override
API are not shipped by this documentation. Current controls expose their actual
React props and children. Automatic interaction analytics and uniform async states
remain planned. No `ThemeProvider`, generic `slots` prop or global component
registry is promised unless it appears in your released package's declarations.

## Tenant customization

Read tenant branding from hosted context or CLI-synced settings. Keep deployment
URLs and tenant identifiers in configuration. Compose a tenant wrapper around the
shared control, pass supported props and keep business rules in app code. Only
replace a shared view when its supported extension points are insufficient.

This is the public design decision. Internal implementation ownership remains in
the private platform repository; SDK packages and examples are versioned separately.
