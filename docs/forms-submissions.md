# Forms and submissions

> These guides describe the current supported contracts. The [package inventory](packages.md)
> records verified published versions; newer source changes do not imply package publication
> or acceptance of your configured services. Check installed declarations and the selected
> environment's authenticated API documentation before using an operation.

GroovePost owns versioned forms, tenant/environment enablement, private attachments,
customer ownership, draft persistence and the review inbox. Consumer apps own their
screens, questions and business-specific status names.

## Data contract

Definitions are immutable and scoped by tenant, environment, form ID and version.
Drafts contain answers and context; images remain private. Partial drafts save
without final-field validation; submit validates the pinned definition and image
policy. A declared `phoneField` requires verified ownership matching that answer.
Forms with `emailField` require sign-in and verified contact-email ownership.

Declarations use the SDK's `FormDefinition`: `id`, `version`, `title`, `statuses`
(including `submitted`), optional `schema`, `defaults`, `labels`, `phoneField`,
`consentField`, `emailField`, `emailCopy` and `attachments`. A schema uses the
existing bounded JSON Schema subset. Changing any definition requires a higher version. Existing drafts,
submissions, and reviews continue using their original definition. Custom code
and third-party server validators are not executed.

## Install and enable

Include a `forms` array in the app manifest. A successfully activated package registers definitions atomically with its output; it does not enable the
module. Owners/admins enable each tenant/environment through **Forms settings**
(`/admin/forms`) or `groovepost forms configure true manifest.json`. Definitions
can also be registered through that command without building a custom app.

New environments start disabled. Enabling requires an installed form. Disabling
hides the inbox and rejects submission operations without deleting records.
Settings and documentation remain available to authorized administrators.
The global sell flag and fixed renderer deployment operations are removed.

## API and SDK

The base path is `/api/v1/tenants/{slug}/environments/{environment}/submissions`.
Use `/forms`, `/drafts`, `/drafts/{id}`, `/drafts/{id}/submit`, attachment operations,
and `/inbox` for administrator review. `/settings` manages definitions/enablement.
All operations enforce tenant and environment binding independently of docs/UI.
Customer authentication uses the independent `/tenants/{slug}/environments/{environment}/customer/sessions`
service; enabling forms never changes customer or administrator permissions.

The direct SDK exposes `getForms`, `createDraft(formId, metadata)`, `saveDraft`,
`submitDraft`, `revokeSubmissionConsent`, `submissionInbox`, and `reviewSubmission`. Hosted apps use
`createHostedClient(...).forms`, with named `forms.*` capabilities. No reserved
`collections` alias exists in the generic data API. CLI and MCP use the same REST
contracts and authorization. Revision conflicts require reloading before saving.

Tenant Swagger is at `/api/v1/tenants/{slug}/environments/{environment}/docs`, with
`openapi.json` beside it. It requires owner/admin authentication, binds the tenant
and environment, includes enabled submission operations and pinned form-version payload
schemas, and projects relevant publishing/deployed-app/data/commerce contracts.
Platform-management and worker operations are excluded. Documentation does not
replace authorization.

## Images

Form attachments are images only: JPEG, PNG or WebP, up to 10 MiB each. The service
normalizes them to JPEG and applies the pinned definition's count, minimum image
dimensions and distinctness requirements. It does not accept arbitrary files.
Responses expose `images`; SDK operations are `uploadImage` and `getImage`.
Hosted operations are `forms.uploadImage` and `forms.image`; REST routes use
`/images/{slot}` and the CLI uses `image-upload`.

Configure the selected environment's identity and submission-email services before
acceptance. New environments have no consumer forms installed and submissions
start disabled. Consumers register definitions through supported build/settings
operations; no database access is needed.

## Draft deletion and upgrades

Customers can permanently discard an owned draft with `DELETE /drafts/{id}` and
an `expectedRevision` equal to the draft’s current revision. The service locks ownership
and rejects stale revisions or any submitted status. Draft data and private attachment references are removed; failed object cleanup
is handled by the platform. SDK clients expose `discardDraft(id, expectedRevision)`;
hosted apps call `forms.discardDraft` under `forms.drafts`. CLI: `forms draft-discard <id> <expected-revision>`. MCP: `draft_discard`.

Forms may declare `emailField` to enable authenticated, verified-contact submission email notifications. See [submission email](submission-email.md). Drafts can explicitly upgrade to the newest installed version at their current revision; previous answers are archived and submitted definitions remain pinned.

The package runtime serves photo bytes through the authorized API. `getImage` returns an ArrayBuffer; hosted `forms.image` retains that same byte contract. Generic CLI/MCP operation adapters return `{mimeType,dataBase64}`. Storage endpoints and signed storage links are not exposed by these photo operations. This contract ships in SDK 0.6.4 and the coordinated toolkit release.

## Form selection in App Builder

Client discovery uses `client.getForms()` (direct SDK) or
`createHostedClient(api, context).forms.getForms()` (hosted widgets, capability
`forms.read`). It returns enabled, tenant/environment-scoped forms with stable
IDs, titles, optional descriptions, versions and validation/attachment requirements.
Administrator email copy is excluded. Disabled submissions reject discovery;
existing drafts and submissions retain their pinned form/version.

A custom widget declares a form option and a packaged validation contract:

```json
{
  "options": {"type":"object","properties":{"submissionFormId":{"type":"string"}}},
  "formBindings": [{"option":"submissionFormId","label":"Submission form","required":true,"formId":"offers"}]
}
```

Include `offers` in the manifest's `forms` and declare `forms.read` alongside the
widget's write capabilities. The binding's `formId` identifies the packaged
**contract**; the selected destination ID lives in each widget instance's
`options.submissionFormId`. App Builder presents configured compatible forms by
title, ID and version. No environment variable selects the form. Apps discover
metadata by the selected ID, then call `forms.createDraft(selectedId)`.

Compatibility conservatively requires equal schema, attachment policy, statuses,
and email/phone/consent field bindings. Names, IDs, descriptions, versions and
administrative email copy can differ. This does not infer JSON Schema subtyping.
Incomplete selections can be saved as drafts; preview/publication and candidate
activation reject missing or incompatible destinations without replacing the live
app. Administrative definition changes cannot invalidate a published binding.

Existing manifests may reject new widget options, so existing compositions use
an explicit operator migration before the new package is uploaded. From the
platform checkout, prepare reviewed JSON containing `revision` and `selections`
(`screen`, `widget`, `option`, `formId`). Run the command below against the intended
Development database; it is a dry run unless `--apply` is supplied:

```sh
pnpm --filter @groovepost/web exec tsx --env-file=.env src/scripts/migrateFormBindings.ts --tenant example --environment development --package /absolute/path/app.tar.gz --selections /absolute/path/selections.json
```

Review the mapping, then repeat with `--apply`. The operator tool validates the
new package and form contracts, locks the tenant, checks the expected revision,
and adds only previously unbound selections to the saved draft and published
composition. It preserves pending edits, layout, other options, IDs and submission
records; stale revisions, conflicting selections or unsupported records stop the
operation. Repeating an already applied mapping is a no-op with the current
revision. It does not activate code or create a database schema migration. Upload
the new package afterward, review its selector and promote separately. Production
destination forms must also be compatible. Do not import an entire replacement
layout merely to add a binding.

## Save Draft Submissions (PR #199 follow-up)

A form definition can opt into `saveDraftSubmissions: true`. The Forms editor exposes **Save Draft Submissions** and saves changes as a new immutable form version. The latest version controls admin visibility for all unexpired drafts of that form, including older pinned versions. The default is off. This admin-only policy is omitted from public form discovery.

Enabled drafts appear in Submissions with Draft status and last activity. Administrators may inspect partial answers and authorized photos but cannot review or submit a draft. Viewing a draft sends no submission notification. Customer recovery remains unchanged; expiration and cleanup still occur after 30 days of inactivity. Turning the setting off hides drafts without deleting recovery data. WBUR seller form version 6 enables it.
