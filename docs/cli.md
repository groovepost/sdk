# CLI reference

Install `@groovepost/cli@0.9.7` after [registry setup](getting-started.md).
Run commands through a local script or `npx --no-install groovepost`.

## Configuration and first use

```sh
export GROOVEPOST_API_URL=https://your-platform.example/api/v1
export GROOVEPOST_TENANT=example-site
export GROOVEPOST_ENVIRONMENT=development
npx --no-install groovepost doctor
npx --no-install groovepost auth login
npx --no-install groovepost auth status
npx --no-install groovepost api list > operations.json
```

The example origin is a placeholder. Use your configured platform origin. For bound projects,
[project configuration](tooling.md#project-configuration) supplies scope and rejects conflicts.
`doctor` is offline. Browser login uses consent and PKCE; credentials stay in the private,
origin-bound user login store. CI may supply an approved `GROOVEPOST_ADMIN_TOKEN` explicitly.
Customer capability tokens remain separate; an administrator login does not grant customer access.

## Commands

Arguments in brackets are optional. JSON_FILE means a UTF-8 JSON document on disk.
The operation reference supplies exact API input schemas and required permissions.

| Command | Purpose / input | Output and access |
| --- | --- | --- |
| `--help` | List top-level command groups | Text; subcommand-specific help is limited in this release |
| `doctor` | Validate selected API and scope | Text; no hosted/authentication check |
| `auth login`, `auth status`, `auth logout` | Connect, inspect or revoke account login | JSON; login may open a browser; account login tokens are not printed |
| `tenants list` | List accessible tenants | JSON; authenticated account |
| `apps init --tenant SLUG --directory PATH [--adopt]` | Bind a new/reviewed existing directory | JSON; tenant access; creates local files |
| `apps sync [DIRECTORY]` | Refresh public tenant settings | JSON; preserves application source |
| `apps instructions [DIRECTORY]` | Consolidate local agent instructions | JSON; offline; review the resulting diff |
| `apps preview [MANIFEST] [PORT]` | Preview the linked application on loopback | Local server; services require hosted Development or an explicit simulation |
| `apps build MANIFEST OUTPUT.tar.gz` | Build declared ES-module application entries | JSON; offline archive build |
| `apps verify ARCHIVE` | Validate an app package | JSON; offline, no security certification |
| `apps deploy ARCHIVE` | Upload validated code to Development | JSON; owner/admin; does not publish a layout |
| `apps promote` | Promote current Development code and published composition | JSON; owner/admin; explicit Production effect |
| `api list` | Discover registered operations and schemas | JSON catalog; no mutation |
| `api OPERATION [JSON_FILE]` | Invoke one registered operation | JSON; permission/scope from the operation reference |
| `data …` | Work with declared app entity collections | JSON; collection/customer/admin access rules |
| `forms …` | Manage customer drafts and administrator submission workflows | JSON; permissions vary by command |
| `logs list`, `logs get ID` | Query scoped diagnostics | JSON; owner/admin; `--platform` requires platform administration |
| `design-kit export --output NEW_DIRECTORY` | Export the versioned offline authoring reference | Files; no login; destination must be new |
| `site validate --source DIRECTORY` | Validate offline design source | Text; not hosted acceptance |
| `site pack --source DIRECTORY --output site.tar` | Package offline design source | Archive; not accepted by JSON Import / Export |
| `site export --tenant SLUG --environment ENV --package theme\|full --output FILE` | Export supported site JSON | JSON file; owner/admin |
| `site import --tenant SLUG --environment ENV --package theme\|full --file FILE` | Preview a replacement JSON import | Preview; add exact destination confirmation and backup to apply |

See [app packages](app-packages.md), [design authoring](design-agent-kit.md) and
[JSON transfer](site-transfer.md) before commands that replace content or deploy code.
Build archives and offline design archives are different artifacts.

## Entity commands

```text
data list COLLECTION [OPTIONS_JSON_FILE]
data get COLLECTION ID
data create COLLECTION DATA_JSON_FILE
data upsert COLLECTION ID DATA_JSON_FILE EXPECTED_VERSION [OPERATION_UUID]
data patch COLLECTION ID DATA_JSON_FILE EXPECTED_VERSION [OPERATION_UUID]
data delete COLLECTION ID EXPECTED_VERSION [OPERATION_UUID]
```

List options include filter, limit, cursor and sort. Writes require the current version;
zero creates an absent ID. Reuse an explicit operation UUID only for identical retries.
A conflict requires reloading/reconciling; never blindly increment the version.

## Forms commands

| Command after `forms` | Arguments | Access |
| --- | --- | --- |
| `config` | None | Available form configuration |
| `session` | `[RESUME_TOKEN]` | Create/resume customer capability; returned token is sensitive |
| `logout` | None | Current customer session |
| `draft-create` | `FORM_ID [DATA_JSON_FILE]` | Customer |
| `draft-get` | `DRAFT_ID` | Owning customer |
| `draft-save` | `DRAFT_ID DATA_JSON_FILE EXPECTED_REVISION` | Owning customer |
| `draft-discard` | `DRAFT_ID EXPECTED_REVISION` | Owning customer; permanent deletion including private attachments |
| `image-upload` | `DRAFT_ID SLOT IMAGE_PATH` | Owning customer; slot 1–12, at most 10 MiB |
| `verify-start` | `PHONE` | Current customer; initiates provider verification |
| `verify-check` | `CODE` | Current customer |
| `submit` | `DRAFT_ID` | Owning customer; explicit submission |
| `status` | None | Current customer submissions |
| `opt-out` | `SUBMISSION_ID` | Owning customer; consent revocation |
| `inbox` | `[PAGE]` | Owner/admin |
| `review` | `SUBMISSION_ID STATUS MESSAGE EXPECTED_REVISION` | Owner/admin |
| `analytics` | None | Owner/admin |
| `configure` | `true\|false [MANIFEST_JSON_FILE]` | Owner/admin; array or object with forms array |
| `settings` | None | Owner/admin |
| `doctor` | None | Configuration plus hosted form read; differs from top-level offline doctor |

See [forms](forms-submissions.md) for lifecycle, revision checks and policy.
For other operations, use `api OPERATION JSON_FILE` with the [generated schemas](operations.md).
Do not log session output or verification codes.

## Logs and results

`logs list|get` supports `--from`, `--to`, `--level`, `--source`, `--event`,
`--request-id`, `--search`, `--cursor` and `--limit` (1–100). See [logging](logging.md).

Successful API commands emit JSON to stdout; failures normally emit structured JSON
to stderr and exit 1. `doctor`, help, and design/site authoring commands may emit text;
design/site failures may also be plain text. Success exits 0. Parse according to the
command, inspect the exit status and never treat arbitrary stdout as proof of deployment.
API errors preserve available status/code/message/request correlation. Validation,
401/403 authorization, 409 revision conflicts and ambiguous network failures need
different recovery; do not automatically retry destructive or externally visible operations.
