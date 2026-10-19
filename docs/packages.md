# Packages and versions

The versions below are unpublished release candidates for the current platform
contract. Examples target these versions together. Registry publication and a clean
authenticated installation are required before external use.

| Package                   | Candidate version | Purpose                                                           |
| ------------------------- | ---------------- | ----------------------------------------------------------------- |
| `@groovepost/app-sdk`     | 0.6.0            | REST client, hosted widgets, data/session operations |
| `@groovepost/app-package` | 0.4.0            | Current app build contracts and tooling                  |
| `@groovepost/ui`          | 0.3.3            | Shared web controls, tenant theming and styles                    |
| `@groovepost/tab-types`   | 0.4.0            | Standard application tab definitions                              |
| `@groovepost/cli`         | 0.8.0            | Developer login, repository builds and content tools      |
| `@groovepost/mcp`         | 0.7.0            | Explicit REST-backed MCP tools                                    |

All use GitHub Packages today. UI/tab-types and some CLI features also depend on
shared `@danielmarkland` packages there. Configure both scopes. `@groovepost/app-web` is a
private application package, not a public SDK dependency.

The checked-in version inventory (`versions.json` in the repository root) is the example pin source.
Updated platform versions are release candidates until registry checks pass.
Installed `.d.ts` files are the exact reference for your package version.

## Import boundaries

- REST and hosted definitions: `@groovepost/app-sdk`.
- Theme foundations: `@groovepost/ui`.
- React controls: `@groovepost/ui/web`.
- Control/font styles: `@groovepost/ui/controls.css`.
- CLI binary: `groovepost`; MCP binary: `groovepost-mcp`.

Do not import internal `src` paths or depend on private platform files.

## Forms image contract candidate

The greenfield platform cleanup introduces the app-sdk 0.6.0 and CLI 0.8.0
contracts. Form submission responses expose `images`; direct clients use
`uploadImage` and `getImageURL`, hosted clients use `forms.uploadImage` and
`forms.image`, REST paths use `/images/{slot}`, and the CLI uses `image-upload`.
Attachments accept JPEG, PNG and WebP images and normalize them to JPEG.

These are unpublished candidates. Update and rebuild affected consumers together
with the platform after a separately authorized package release; the inventory and examples target the same candidate contract.
