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

Include a `forms` array in the app manifest. A successfully activated repository
build registers definitions atomically with its output; it does not enable the
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
Responses expose `images`; SDK operations are `uploadImage` and `getImageURL`.
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
