# Packages and versions

This inventory records the current platform package set. Examples pin these
versions together and install through authenticated GitHub Packages access.
Authenticated registry metadata and clean installations were verified on November 7, 2026.
See `versions.json` for the reviewed package set.

| Package                   | Version | Purpose                                                     |
| ------------------------- | ------- | ----------------------------------------------------------- |
| `@groovepost/app-sdk`     | 0.6.6   | REST client, hosted widgets, data/session operations        |
| `@groovepost/app-package` | 0.4.1   | Current app build contracts and tooling                     |
| `@groovepost/ui`          | 0.3.6   | Shared web controls, tenant theming and styles              |
| `@groovepost/app-native`  | 0.1.1   | Native tab/Post List rendering                              |
| `@groovepost/cli`         | 0.9.7   | Developer login, package upload/promotion and content tools |
| `@groovepost/mcp`         | 0.7.5   | Explicit REST-backed MCP tools                              |

All use GitHub Packages today. UI and some CLI features also depend on
shared `@danielmarkland` packages there. Configure both scopes. `@groovepost/app-web` is a
private application package, not a public SDK dependency.

The checked-in version inventory (`versions.json` in the repository root) is the example pin source.
Installed `.d.ts` files are the exact reference for your package version.

## Import boundaries

- REST and hosted definitions: `@groovepost/app-sdk`.
- Theme foundations: `@groovepost/ui`.
- React controls: `@groovepost/ui/web`.
- Control/font styles: `@groovepost/ui/controls.css`.
- CLI binary: `groovepost`; MCP binary: `groovepost-mcp`.

Do not import internal `src` paths or depend on private platform files.

## Forms image contract

The greenfield platform cleanup introduces the app-sdk 0.6.0 and CLI 0.9.0
contracts. Form submission responses expose `images`; direct clients use
`uploadImage` and `getImage`, hosted clients use `forms.uploadImage` and
`forms.image`, REST paths use `/images/{slot}`, and the CLI uses `image-upload`.
Attachments accept JPEG, PNG and WebP images and normalize them to JPEG.

Update and rebuild affected consumers together with the platform. Registry
installation and CI checks do not establish hosted customer-flow acceptance.

## Framework boundaries

The REST client is framework-independent. Hosted widgets and shared React controls
target the web. Native Expo apps use the separate app-native tab/Post List renderer;
shared web components are not React Native components. Upgrading a native app requires
checking that boundary as well as updating its package pins and explicit API origin.

The package runtime serves photo bytes through the authorized API. `getImage` returns an ArrayBuffer; hosted `forms.image` retains that same byte contract. Generic CLI/MCP operation adapters return `{mimeType,dataBase64}`. Storage endpoints and signed storage links are not exposed by these photo operations. These contracts are included in the package-only release above.

## Released toolkit

The table and versions.json record verified published packages. The configuration binding,
separate operation discovery entry point, optional logging and ES-module extension builds
are available in this package set. Hosted behavior still depends on the configured environment.

This release retires tab-types, defineTabType/createGroovePostApp and the UI root groovePostTheme export. Use canonical App Builder compositions, defineWidget, and tenant settings. Next.js is required only for Next-specific publishing UI entrypoints; basic extension controls do not require the Next peer.

## Shared configuration release

The [2026-11-05 package-only publication](https://github.com/danielmarkland/expo-payload-starter/actions/runs/42129981675) released publishing-contracts 0.15.0, publishing-core 0.20.0, publishing-ui 0.15.0, auth-runtime 0.3.0. `versions.json` records its source and versions separately from the developer package release above. Examples pin applicable shared transitive dependencies with npm overrides; no unpublished developer SDK or CLI version is required.

## Dependency audit status

On November 7, 2026, `npm audit` reports no vulnerabilities in the documentation
build or REST example. The published CLI/countdown and controls dependency trees
still report a critical DOMPurify advisory and high-severity transitive advisories;
the native example also reports high-severity transitives. These are not resolved
by the documentation build’s patched Vite 6.4.5 override.

Affected published dependency chains include publishing-core → Payload/Lexical,
CLI → Vite, and app-package → Zod. Remediation requires reviewed changes and
new releases from the owning package repositories, followed by clean consumer
installation and compatibility checks. This documentation update does not claim
those packages are vulnerability-free or silently force incompatible transitive upgrades.
Run `npm audit` in the exact example directory for current advisory details.
