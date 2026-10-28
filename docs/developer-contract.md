# App developer experience

> These guides describe the current supported contracts. The [package inventory](packages.md)
> records verified published versions; newer source changes do not imply package publication
> or acceptance of your configured services. Check installed declarations and the selected
> environment's authenticated API documentation before using an operation.

Developers own their app’s design, screens and navigation. Shared controls are the
convenient default, not a restriction on custom frontend design.

App authoring uses four terms: a **layout** (tabs or master/detail) opens
**screens** composed of **widgets**, and SDK **plugins** supply extra widgets.
Use widgets consistently in app authoring and developer APIs; components refer to
internal React implementation details. Both layouts share the same screen
composer and widget runtime. See [the current app model](hosted-apps.md).

- Tenant records own branding and public configuration. Hosted apps receive them
  through SDK context; local previews use CLI-synced settings. Keep fixture themes
  explicitly labeled as fallbacks, never a competing source of truth.
- Shared controls should provide tenant theming, accessibility, loading/error
  states and standard interaction analytics by default. Custom controls can use
  the same public theme tokens and supported analytics operations.
- Groovepost supplies authentication, persistence, uploads and repository-based app
  deployment through supported REST services, SDK, CLI and MCP adapters. Widgets
  execute trusted code in the app document. Named capabilities and
  server-side tenant/customer authorization restrict service operations; they do
  not isolate JavaScript from the surrounding app.
- Reusable presentation belongs in shared publishing packages; app-specific UI
  belongs in the independent consumer repository. Hosts remain policy adapters.

## Current capability versus target

Themed Button/Field controls, shared funnel layouts/choice/upload cards, fonts,
host theme context, public presentation metadata and settings sync are
available in the shared controls. Field provides label association and hint/error
presentation; authors still implement complete screen accessibility and async
states. Funnel analytics and explicit SDK analytics operations exist. Automatic
control interaction analytics and uniform loading/error behavior across controls
are targets, not shipped guarantees. Capture only intentional events and approved
metadata; do not automatically record field values, contact details or images.

Independent apps exercise this contract through their own checks.

Authentication is host-owned for trusted hosted widgets. Independent starters host the
shared auth runtime with separate customer/editor realms. See [authentication](authentication.md)
for the current realm boundaries and hosted acceptance requirements.

Development apps are publicly viewable without a preview code. Customer/admin
authorization still applies. Verify the configured identity/contact providers
through real hosted delivery. Email verification does not require SMS; forms that
declare `phoneField` require verified phone ownership. Sandbox SMS codes are local-only.

A single packaged widget can use `layout: "app-owned"` with the current widget runtime to retain its own header, footer, content widths and navigation. It must
be the only widget on the only screen. GroovePost adds no app chrome in this
layout; shared customer services, capability checks and routes still apply.
Host-owned authentication uses the shared FunnelLayout and tenant presentation.
Tabs and master/detail remain the composition choices for multiple widgets.

### Initial screen loading

Feature `mount()` must commit its initial screen synchronously before returning its cleanup function. React apps wrap their first `root.render()` in `flushSync` from `react-dom`. Load business data within that committed screen, using shared loading primitives and reserving the content geometry. The hosted runtime waits for JavaScript and CSS before mounting.

The platform includes shared loading styles in its initial page CSS and uses `LoadingRegion` for the asset-to-app handoff. Shared regions provide a brief 160ms ready-content reveal automatically, disabled for reduced-motion preferences. Apps choose their placeholder geometry and set `loading` to false when their screen is usable; they do not need animation code or a separate readiness API. Cross-domain website-to-app navigation remains a normal document navigation.

Forms and submissions use optional tenant/environment installations and immutable
form versions. Custom answers use JSONB payloads, not platform columns or reserved
generic collection names. See [forms/submissions](forms-submissions.md).

## Project agent instructions

New `groovepost apps init` projects put repository-wide agent rules in
`.instructions/shared.md`. Root `AGENTS.md` and `CLAUDE.md` are identical bare
shims that direct agents there. Customize the shared file with project conventions
and references to relevant documentation or installed skills; keep directory rules
scoped to their directory.

For existing projects, run `groovepost apps instructions [directory]` with CLI
0.8.4 or newer. This local command needs no login. It keeps existing shared rules,
moves custom root AGENTS.md/CLAUDE.md content into the shared file, then replaces
both root files with identical shims. Original content is preserved before either
root file changes; identical content is included once and bare agent-file imports
are replaced without creating circular references. Review the resulting diff,
especially repository-relative paths and any conflicting project conventions.
Symlinked instruction files or directories are rejected without changing files.
Rerunning the command does not duplicate migrated content. `apps sync` continues
to update public settings only. New template versions do not overwrite existing
shared rules; review and merge relevant convention changes explicitly. No skills
are installed automatically.

Content-addressed hosted `app.js` and `app.css` assets cache publicly for one year with `immutable`; activating a new build changes their digest URLs. Asset reads still enforce the tenant app origin, environment binding, and active output integrity. Authenticated bearer/preview requests, errors, and private customer, draft, photo, and submission endpoints remain `no-store`.

Release conventions and adoption are documented in [builds and releases](releases.md).
