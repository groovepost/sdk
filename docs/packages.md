# Packages and versions

This inventory records the current platform package set. Examples pin these
versions together and install through authenticated GitHub Packages access.
The [2026-10-21 production publication](https://github.com/groovepost/platform/actions/runs/39680586199)
verified immutable archives and a clean registry installation.

| Package                   | Version | Purpose                                              |
| ------------------------- | ------- | ---------------------------------------------------- |
| `@groovepost/app-sdk`     | 0.6.2   | REST client, hosted widgets, data/session operations |
| `@groovepost/app-package` | 0.4.0   | Current app build contracts and tooling              |
| `@groovepost/ui`          | 0.3.3   | Shared web controls, tenant theming and styles       |
| `@groovepost/tab-types`   | 0.4.3   | Standard application tab definitions                 |
| `@groovepost/cli`         | 0.9.3   | Developer login, repository builds and content tools |
| `@groovepost/mcp`         | 0.7.2   | Explicit REST-backed MCP tools                       |

All use GitHub Packages today. UI/tab-types and some CLI features also depend on
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
`uploadImage` and `getImageURL`, hosted clients use `forms.uploadImage` and
`forms.image`, REST paths use `/images/{slot}`, and the CLI uses `image-upload`.
Attachments accept JPEG, PNG and WebP images and normalize them to JPEG.

Update and rebuild affected consumers together with the platform. Registry
installation and CI checks do not establish hosted customer-flow acceptance.

## Framework boundaries

The REST client is framework-independent. Hosted widgets, shared web controls and
standard tab views target the web. Native Expo apps own their native presentation;
shared web tab views are not React Native components. Upgrading a native app requires
checking that boundary as well as updating its package pins and explicit API origin.
