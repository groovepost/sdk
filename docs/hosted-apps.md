# App layouts and widgets

> These guides describe the current supported contracts. The [package inventory](packages.md)
> records verified published versions; newer source changes do not imply package publication
> or acceptance of your configured services. Check installed declarations and the selected
> environment's authenticated API documentation before using an operation.

The repository owns its app code and composition. `defineWidget` exports current schema-3 widgets with IDs, mount/cleanup functions and routes including `/`. App-specific UI stays in the independent consumer repository. GroovePost supplies tenant context, shared controls and platform services.

`app.config.json` chooses `layout: "tabs"`, `"master-detail"` or `"app-owned"`, a default destination and composed screens. The transport uses `tabs` for screens and `features` for widget instances. Feed, content and shop are built-in widgets. Packaged widgets come from the current build; developers do not supply digests or select historical packages. Options are checked against declared schemas. `app-owned` requires one packaged widget on one screen and preserves that app's own header, footer, navigation and content widths.

Use [repository builds](repository-builds.md) to connect GitHub and configure branches. App deployments shows repository, branch settings, live commit and build history. Layout editing happens in source control. Manual import, package versions, structure preview, acceptance records, promotion and restore are removed. The current runtime replaces the earlier frame runtime; it does not add a compatibility path.

## Trust and destinations

Custom JavaScript executes directly in the app document and must be trusted by the tenant. Server services enforce tenant/customer permissions, and app code never receives platform credentials. Named capabilities restrict service operations; they do not sandbox same-page JavaScript. Administrator surfaces remain on the central administration origin.

Declare exact HTTPS request/image origins in the manifest, either common or under environment declarations. The tenant administrator allows those origins in the corresponding environment's repository settings. Activation rejects undeclared permissions or origins outside those settings. CSP permits platform services and declared destinations without wildcards, arbitrary frames or eval. Origin permissions do not grant HTTP/service authorization.

## Shopify

Shopify is configured under **Services** at `/admin/services`. Connect each environment using its store hostname, private Storefront token and exact product-image origins. Credentials remain encrypted and server-held; customer-owned carts remain tenant/environment scoped. Add the built-in shop widget in source-controlled composition when required. Connecting a store does not silently add or change app screens. An unconfigured shop fails with a visible connection error.

## Verification

Repository lifecycle tests cover authorization, webhook/Actions identity, exact commit dispatch, current output integrity, failed/stale build isolation and cleanup. Runtime tests retain tenant/customer service and destination boundaries. Run app-specific browser checks for the app's design and flow. Local or CI success is not proof of real hosted SMS, commerce or production acceptance.

## Developer contract

See [app authoring and loading](developer-contract.md), [authentication](authentication.md),
[forms](forms-submissions.md), and [onboarding](onboarding.md).
