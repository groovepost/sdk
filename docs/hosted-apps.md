# App layouts and widgets

> These guides describe the current supported contracts. The [package inventory](packages.md)
> records verified published versions; newer source changes do not imply package publication
> or acceptance of your configured services. Check installed declarations and the selected
> environment's authenticated API documentation before using an operation.

The repository owns custom widget code. App Builder owns the tenant/environment composition after an explicit import. `defineWidget` exports current schema-3 widgets with IDs, mount/cleanup functions and routes including `/`. App-specific UI stays in the independent consumer repository. GroovePost supplies tenant context, shared controls and platform services.

`app.config.json` supplies initial defaults for `layout: "tabs"`, `"master-detail"` or `"app-owned"`, a default destination and composed screens. The transport uses `tabs` for screens and `features` for widget instances. Feed, content and shop are built-in widgets. Packaged widgets come from the current build; developers do not supply digests or select historical packages. Options are checked against declared schemas. `app-owned` requires one packaged widget on one screen and preserves that app's own header, footer, navigation and content widths.

App Builder owns draft and published layout after an explicit import of initial defaults. Custom widget code can be built and uploaded locally through the CLI without connecting a repository; [app packages](app-packages.md) describe the supported upload/promotion workflow. Apps shows code deployment status; App Builder independently saves, previews and publishes composition. The current runtime replaces the earlier frame runtime.

## Trust and destinations

Custom JavaScript executes directly in the app document and must be trusted by the tenant. Server services enforce tenant/customer permissions, and app code never receives platform credentials. Named capabilities restrict service operations; they do not sandbox same-page JavaScript. Administrator surfaces remain on the central administration origin.

Declare exact HTTPS request/image origins in the manifest, either common or under environment declarations. The tenant administrator allows those origins in the corresponding environment's runtime settings. Activation rejects undeclared permissions or origins outside those settings. CSP permits platform services and declared destinations without wildcards, arbitrary frames or eval. Origin permissions do not grant HTTP/service authorization.

## Shopify

Shopify is configured under **Services** at `/admin/services`. Connect each environment using its store hostname, private Storefront token and exact product-image origins. Credentials remain encrypted and server-held; customer-owned carts remain tenant/environment scoped. Add the built-in shop widget in App Builder when required. Connecting a store does not silently add or change app screens. An unconfigured shop fails with a visible connection error.

## Verification

Package lifecycle tests cover authenticated upload, archive integrity, composition compatibility, stale requests, atomic promotion and cleanup. Runtime tests retain tenant/customer service and destination boundaries. Local test success is not hosted customer or production acceptance.

## Developer contract

See [app authoring and loading](developer-contract.md), [authentication](authentication.md),
[forms](forms-submissions.md), and [onboarding](onboarding.md).

## Editable App Builder (candidate implementation)

App Builder works without a repository. Add ordered screens and independent widget instances, save a draft, preview it, then explicitly publish in Development. Code builds update available plugins without replacing saved composition. Import Package Layout previews archive defaults and replaces the draft only after confirmation. Production displays its promoted composition read-only.

The built-in Feed is labeled **Post List** in the admin and supports per-instance `heading` and `limit` (1–100). It renders on web and in the native reference app. Page Content and Shop remain web widgets; Shop requires its service connection. Custom package widgets are web-only until they supply a native implementation. Custom widgets become available only after a validated package upload.

SDK source remains in the platform repository. The candidate composition client is `client.composition`: `read`, `save(revision, composition)`, `preview`, `publish(revision)`, `packageLayout` and `importPackage(revision, buildId)`. Writes require an owner/admin and use optimistic revisions. `/app-config` returns only published `configuration`; editor endpoints return separate `draft` and `published` values. Old builder/custom tab configuration is superseded rather than maintained as another runtime. These contracts require the candidate platform and SDK release; the package inventory records published versions separately.

See the [native reference app](https://github.com/groovepost/sdk/tree/main/examples/native-post-list). It exercises the same saved composition on iOS/Android; it does not port WBUR's app-owned web UI.
