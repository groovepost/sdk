# Design a site

Start here when designing a GroovePost website, whether you are a person or an agent.
Use [the installed design kit](design-agent-kit.md) and [practical layouts](site-layouts.md)
to map a design to supported editable content. No starter or private platform checkout is required.

## Workflow

1. Agree on audience, page inventory, brand assets and faithful recreation versus modernization.
2. Read the installed kit’s START-HERE.md, AUTHORING.md, RENDERER.md and capabilities.json.
3. Map every section to supported fields and blocks; record unsupported requirements explicitly.
4. Prepare desktop/mobile mockups and the handoff below; obtain design approval.
5. Apply reviewed content through supported CMS/API operations in Development. Preview and compare
   the actual renderer in light/dark modes, at mobile/desktop widths and with realistic content.
6. Review the destination and backup before a replacement import; obtain separate approval for Production.

The installed kit defines exact field names and enums; UI labels below describe their intent.
When a guide and installed capabilities disagree, report the gap and use the matching version’s contract.
Provider setup, delivery acceptance and customer authentication remain separate from visual design.

## Theme and editable content

### Sources of truth and precedence

The design system has four layers. Prefer the highest layer that can express a
requirement without making the design less coherent.

1. **Payload Site settings** hold deployment-specific identity and curated
   runtime theme values. These override the packaged defaults and are the right
   place for most rebrands.
2. **Page content and Appearance controls** compose pages from supported blocks
   and apply responsive spacing, width, and surface variants without custom
   code.
3. **Page-scoped custom CSS** is a trusted-editor escape hatch for an isolated
   presentation requirement. Scope every selector beneath
   `[data-page="page-slug"]`; do not use it to create a second design system.
4. **Packaged design tokens and assets** are fallbacks and shared application
   defaults. Changes to these defaults are platform implementation work; site design agents should use supported runtime controls.


### Runtime theme capabilities

Payload's **Site settings** Global manages the site/app titles, short name,
description, favicon, mode-specific header logos, and the following theme
controls:

| Control        | Supported values                            | Design effect                                                                  |
| -------------- | ------------------------------------------- | ------------------------------------------------------------------------------ |
| Default mode   | System, light, dark                         | Initial appearance when the visitor has no saved preference.                   |
| Visitor toggle | Allowed or hidden                           | Whether visitors may override the default; choices persist per browser/device. |
| Font preset    | System, Poppins, Inter, IBM Plex Mono                        | Runtime font family for both web and app.                                      |
| Shape preset   | Square, soft, rounded                       | Scales non-pill radii to `0`, `1`, or `1.5` times the packaged values.         |
| Button shape   | Square, soft, rounded, pill                 | Controls public action corners independently; square is the default.           |
| Density preset | Compact, comfortable, spacious              | Scales the spacing system to `0.8`, `1`, or `1.2` times the packaged values.   |
| Light palette  | Eight required six-digit hexadecimal colors | Curated semantic colors for light mode.                                        |
| Dark palette   | Eight required six-digit hexadecimal colors | Curated semantic colors for dark mode.                                         |

The core semantic palette uses `primary`, `primaryInk`, `accent`, `surface`,
`surfaceRaised`, `ink`, `inkMuted`, and `border`. Primary is the dominant action
color; Accent supports links, highlights, focus indicators, and decoration.
The runtime resolver derives hover, soft accent, input, footer, section,
strong-line, and supporting-text colors from those eight values. A design brief
should therefore specify semantic roles, not a separate arbitrary color for
every component. Payload enforces WCAG AA contrast for the core text and
background pairs in both modes.

Public actions use four boxed variants: **Primary Filled**, **Primary Outline**,
**Secondary Filled**, and **Secondary Outline**. Primary variants use the
primary palette pair; secondary variants use the accent color and its
contrast-validated inverse. Exact control dimensions and styling follow the installed renderer. Page editors choose a
variant for each CMS action and form submit button. Styled actions and form submits
also support an optional curated icon with left/right placement. New and legacy
contact forms default to Primary Filled, as does search.

When a mode-specific logo is absent, the header displays the site title. Native
app icons, splash artwork, Expo slug/scheme, and iOS/Android identifiers are
build-time values and require a new app build; they are not runtime Site
settings.

### Page composition capabilities

Pages are ordered arrays of Payload blocks. Use the existing block whose
content semantics match the design; do not choose a block only because its
current styling happens to look similar. Every block also supports an optional
in-page anchor and eyebrow; anchors target the section wrapper, and eyebrows
appear above the section content.

| Block          | Intended use                              | Supported content and variants                                                                 |
| -------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Hero           | Primary or secondary page introduction    | Eyebrow, rich headline with accent spans, secondary heading, body, two styled actions, image.  |
| Rich text      | Editorial copy                            | Optional heading and Lexical rich text.                                                        |
| Image          | Standalone editorial image                | Media upload and optional caption.                                                             |
| Feature grid   | Repeated benefits or capabilities         | Eyebrow, heading, intro, card or stacked layout, title/description items, and optional action. |
| Split content  | Copy paired with media                    | Anchor, eyebrow, heading, rich text, image, left/right image position, and optional action.    |
| Link grid      | Resource or destination list              | Anchor, heading content, linked items with optional icons, and an optional action.             |
| Portfolio grid | Projects, people, or case-study summaries | Anchor, heading content, linked name/role/description cards, and an optional action.           |
| Call to action | Focused conversion prompt                 | Heading, body, and one required styled action.                                                 |
| Testimonials   | Social proof                              | Optional heading and quote/name/role items.                                                    |
| Logo cloud     | Clients, partners, or tools               | Anchor, heading, intro, and linked logo uploads.                                               |
| Contact form   | Built-in contact workflow                 | Anchor, eyebrow, heading, body, submit label, and success message.                             |
| Statistics     | Compact quantitative proof                | Optional heading and value/label items.                                                        |
| FAQ            | Expandable questions                      | Optional heading and question/answer items.                                                    |
| Latest posts   | Dynamic published-post listing            | Optional heading and a limit from 1 through 12.                                                |

Every block includes an optional **Appearance** group:

- Per-side padding: none, small (16px base), medium (40px), large (72px), or
  extra large (120px).
- Per-side margin uses the same presets; blank preserves that side's
  design-system default.
- Section width: inherit Page, Full or Padded. Page width inherits Site or selects Full/Padded; Site defaults to Padded.
- Background: default, raised surface, primary accent, or fixed dark treatment.
- Per-side borders: none, default, or accent, with a shared thin (1px), medium
  (2px), or thick (4px) width.
- Rounded container: on or off, using the active shape preset.

Appearance values are presets rather than arbitrary CSS measurements and remain
responsive automatically. The spacing values follow the Site settings density
preset: compact scales them by 0.8, comfortable uses their base values, and
spacious scales them by 1.2. Border widths remain fixed at 1px, 2px, and 4px.
Blank controls preserve each block's design-system default. The fixed dark
background intentionally stays dark in either mode; use it only when the design
calls for a mode-independent dark section.
Explicit left or right spacing overrides background padding and content-width
margins on that side, including when the selected value is none.

Other CMS-owned design surfaces are **Header navigation**, **Footer navigation**,
Media, Pages, Posts, Authors, Categories, Tags, Redirects, and SEO metadata.
Header and footer links share the searchable brand and general-purpose icon picker
and support optional icon-only display; the header may also be sticky. Post SEO images also
serve as featured images on article and listing views. Editors can enable a
generated table of contents for an individual post; it links level-two and
level-three headings. Content designs must account for draft/preview behavior
and use Media relationships rather than embedding untracked asset URLs.

### Design brief for agents

Before producing a visual direction, collect or explicitly mark assumptions for:

- Product purpose, target audience, primary conversions, and accessibility
  requirements.
- Page inventory, navigation hierarchy, content status, and which content must
  remain editor-managed.
- Brand personality, reference designs, required light/dark behavior, font and
  density preferences, and approved colors.
- Available logos, icons, photography, illustrations, and their usage rights,
  crops, alt text, and mode-specific variants.
- Responsive priorities, expected content extremes, and whether the Expo app
  must share the change.

An implementation-ready design handoff must include:

1. A Site settings manifest containing identity, mode behavior, presets, and
   the eight semantic colors for both modes.
2. A page-by-page block map with real or clearly labeled placeholder content,
   block order, Appearance values, anchors, links, and media requirements.
3. Header/footer navigation, SEO metadata, redirects, and shared content that
   the design assumes.
4. Desktop and mobile behavior, focus/hover states, content-overflow cases, and
   contrast expectations for both modes.
5. A capability-gap list classifying every unmet requirement as a new reusable
   block, a field on an existing block, a semantic theme token, renderer/CSS
   behavior, or a platform-specific change.

Prefer the existing system, but do not distort a design to avoid a justified
extension. New capabilities must be semantic and reusable: update the Payload
configuration, renderer, styles, generated types, tests, and migration together.
A one-page visual exception usually belongs in scoped custom CSS; repeated or
editor-controlled behavior belongs in the schema and renderer.

### Agent prompt examples

Use this prompt to generate a design direction that is constrained by the
starter before implementation begins:

```text
Generate a responsive site mockup for [organization/product] that conforms to
the theme system and Payload page-building capabilities documented here:
https://github.com/groovepost/sdk/blob/main/docs/site-design.md

Goals and audience:
- [primary audience]
- [business/user goal]
- [primary conversion]

Brand and content inputs:
- [brand personality and visual references]
- [required pages and navigation]
- [available copy, logo, imagery, and other assets]
- [light/dark preference and accessibility requirements]

Use only the documented Site settings, semantic colors, presets, existing
Payload blocks, and block Appearance options. Design desktop and mobile states
and show both light and dark modes when both are enabled. Do not invent CMS
fields or components. If a requirement cannot be represented, list it as a
capability gap instead of silently adding a new primitive.

Alongside the mockup, provide the Site settings manifest, page-by-page block
map, Appearance values, navigation/SEO assumptions, asset list, responsive and
interaction notes, and any capability gaps described by the README.
```

Use this prompt to assess an existing site built with Elementor or another page
builder before promising design parity or estimating a migration:

```text
Audit [existing site URL] for conversion into this repository. The target theme
system, Payload content model, and migration rules are documented here:
https://github.com/groovepost/sdk/blob/main/docs/site-design.md

This is a read-only discovery and gap-analysis task. Do not modify the source
site or target repository. Inspect the publicly accessible site and any supplied
sitemap, CMS export, analytics, design files, or content inventory. State what
you could not access and do not infer hidden pages or functionality as fact.

Inventory and quantify:
- Unique public URLs, page templates, recurring sections/widgets, posts and
  taxonomies, navigation items, forms, search, redirects, and integrations.
- Site identity, fonts, semantic colors, spacing/shape patterns, light/dark
  behavior, responsive breakpoints, interactive states, and reusable assets.
- Images, video, downloadable files, embeds, structured data, SEO metadata,
  analytics, consent tooling, and accessibility concerns.
- Elementor or other builder-specific widgets, global styles, templates,
  shortcodes, plugins, and dynamic-content dependencies.

Map every discovered page and recurring section to an existing Payload block,
Appearance setting, Site setting, collection, or Global. Classify each item as:
1. Direct fit: can be represented without design or content changes.
2. Adaptation: supported after an explicitly described content/layout change.
3. Extension: requires a reusable block, field, semantic token, renderer/style
   behavior, integration, or platform change.
4. Excluded/manual: should not be migrated automatically, with the reason.

Produce two coordinated reports:

Client impact summary:
- Executive summary of expected visual/content parity and notable compromises.
- Counts and percentages for pages and recurring sections in each fit category.
- A table of visible differences, lost or changed behavior, client decisions,
  content/asset work, SEO or redirect risk, and third-party dependencies.
- A phased estimate using relative sizes (S/M/L/XL) and explicit assumptions;
  separate discovery, reusable template work, content migration, manual QA, and
  client review instead of inventing precise hours without evidence.

Technical conversion appendix:
- URL-by-URL inventory and proposed target slug/template.
- Source component/widget to target block mapping, including occurrence counts.
- Proposed Site settings manifest and shared navigation/content structures.
- Exact capability gaps and the minimum target changes needed for each one,
  naming affected Payload schemas, renderers/styles, contracts, assets, tests,
  and schema migrations where applicable.
- Content migration plan using stable keys and Payload Local APIs, including
  media acquisition, relationship resolution, drafts/publication status,
  idempotency, non-destructive rollback, and what requires manual entry.
- Redirect and SEO preservation plan plus responsive, accessibility, form, and
  integration test coverage.
- Risks, blockers, unanswered questions, and a recommended implementation order.

End with a reconciliation table whose totals match the inventories above, so
the technical scope and client-facing quantities cannot drift apart. Cite the
source URL or supplied artifact for every material finding.
```


## Apply an approved design

Use the CMS or the documented [JSON transfer workflow](site-transfer.md). An offline kit archive
is an authoring artifact, not an input accepted by JSON Import / Export. Do not invent media IDs,
write directly to database tables or treat mockups as publication approval. Existing media references
must resolve in the target environment; the JSON transfer does not upload media bytes.

Preserve unrelated editorial content. Full Site import replaces supported content in its scope;
Theme import changes visual settings only. Review preview counts/digests, save a backup and confirm
the exact destination before applying. Unsupported blocks, schema changes or reusable renderer
features require a separate platform implementation; agents must report these before promising parity.

Acceptance includes working navigation, focus/hover states, contrast, responsive content extremes,
real assets, forms with verified service configuration, and a list of remaining differences.

## Additional shared layout controls

Independent heading/body/label fonts, heading weights and typography presets are available
alongside section width, heading spacing and card padding. Feature grids support explicit
responsive columns, joined cards, metadata, rich-text bodies and numbered steps. FAQs can
use disclosure or visible rows; CTAs can use bordered containers or full-width bands.
Headers support social/accent links and standard/minimal modes. Footer content areas use
one to four columns with reusable blocks. Match the installed kit’s exact fields; it can
expose a narrower authoring subset than the running host. Never invent unsupported fields.
