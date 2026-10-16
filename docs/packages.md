# Packages and versions

Registry lookups on October 15, 2026 returned the versions below. This verifies
availability to the configured authenticated publisher account, not universal
package access or hosted production acceptance.

| Package                   | Verified version | Purpose                                                           |
| ------------------------- | ---------------- | ----------------------------------------------------------------- |
| `@groovepost/app-sdk`     | 0.4.5            | REST client, hosted widgets, data/session operations |
| `@groovepost/app-package` | 0.2.2            | Current app build contracts and tooling                  |
| `@groovepost/ui`          | 0.2.3            | Shared web controls, tenant theming and styles                    |
| `@groovepost/tab-types`   | 0.2.6            | Standard application tab definitions                              |
| `@groovepost/cli`         | 0.6.8            | Developer login, repository builds and content tools      |
| `@groovepost/mcp`         | 0.5.5            | Explicit REST-backed MCP tools                                    |

All use GitHub Packages today. UI/tab-types and some CLI features also depend on
shared `@danielmarkland` packages there. Configure both scopes. `sell-web` is a
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
