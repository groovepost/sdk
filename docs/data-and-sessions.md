# App entity persistence

> These guides describe the current supported contracts. The [package inventory](packages.md)
> records verified published versions; newer source changes do not imply package publication
> or acceptance of your configured services. Check installed declarations and the selected
> environment's authenticated API documentation before using an operation.

The SDK, CLI and MCP expose a shared REST persistence interface. The entity includes its
JSON data when loaded. There is no second data fetch and no database migration
for each custom collection. Platform workflow state stays protected.

```ts
const notes = api.data.collection<{ text: string }>("notes");
const entity = await notes.create({ text: "Saved on the server" });
entity.data.text; // Already loaded
await entity.upsert({ text: "Replace the complete document" });
await entity.patch({ text: "Change a top-level field" });
await entity.delete();
```

`get(id)` loads an entity once. `list({ filter, limit, cursor, sort })` includes
data and entity methods on every result. `from(record)` attaches methods to an
already-loaded record without fetching. Writes update that same in-memory entity
with the returned data, version and timestamps. Failed writes leave it unchanged.
The API is asynchronous; reading `entity.data` is synchronous. Editing that local
object alone does not save it.

## Declare custom collections

Add `dataCollections` to a repository app manifest:

```json
{
  "dataCollections": [
    {
      "name": "notes",
      "access": "customer",
      "schema": {
        "type": "object",
        "properties": {
          "text": { "type": "string", "maxLength": 2000 }
        }
      }
    }
  ]
}
```

This is an excerpt, not a complete app manifest. The server validates declarations
from the active repository build, never a caller-supplied schema or access policy.

`customer` collections are private to the customer session and follow its supported
identity and ownership-recovery flow. Phone verification is required only when
the selected workflow declares it; email-only verification does not require SMS. Anonymous records expire after 30 days;
verification removes that expiry. `administrator` collections are shared among
the tenant's authenticated owners/admins. Customer capabilities never grant
administrator access. Tenant and environment boundaries apply in development too. Public or arbitrary
per-record sharing is not supported in this version.

Schemas support object, array, string, number, integer, boolean and null types;
properties, required fields, enums, numeric bounds, string lengths and array
lengths. Unknown object fields are rejected unless `additionalProperties` is
explicitly true. Arrays require an item schema. References, remote schemas and
executable validators are rejected. Limits: 16 collections per manifest, 64
properties per object, eight schema levels, 64 KiB per saved JSON document, 16
document levels, and the schema-3 64 KiB manifest limit. Reserved prototype keys
are rejected. JSON strings must be valid Unicode without null characters, matching
Postgres JSONB storage. Files use the upload service; save file references in JSON.

## Save, patch, delete and retries

`upsert` creates an absent ID or replaces all JSON on an existing entity. `patch`
performs a shallow merge: nested objects and arrays are replaced, and null is an
ordinary value. Use upsert to remove fields. Saving `{}` clears the JSON while
keeping the entity, provided its schema allows an empty object.

`delete` removes the entity from reads and lists and clears its JSON. The ID remains unavailable to delayed writes so retries cannot recreate
deleted records. Use a new ID
for a new entity. Deleted SDK entities have `deleted: true` and empty local data;
their write methods reject further use.

Loaded entity methods automatically send the current version. Collection-level
writes require `expectedVersion` explicitly; use zero to create an absent ID.
Conflicting writes return 409. Reload and reconcile rather than silently
overwriting another tab's changes.

Every REST write requires a UUID `Idempotency-Key`. SDK methods generate it and
retry a dropped response once using the identical ID, version and body. For
explicit retries across processes, provide `operationId` to collection-level
methods. Receipts retain only operation metadata for seven days, never a second
copy of the document. A reused key with changed input is rejected. A retry whose
result has since changed returns a conflict; it does not replay an old write.

```ts
await notes.upsert(
  id,
  { text: "Saved" },
  {
    expectedVersion: 4,
    operationId: persistedOperationUUID,
  },
);
```

## Authoritative REST and tools

Base: `/api/v1/data/{tenantSlug}/{environment}/{collection}`.

| Method | Path      | Behavior                                                                              |
| ------ | --------- | ------------------------------------------------------------------------------------- |
| GET    | base      | List with JSON-containment `filter`, UUID `cursor`, `limit` 1–100 and `sort` asc/desc |
| GET    | base/{id} | Entity, data, version and timestamps                                                  |
| PUT    | base/{id} | Upsert `{ data, expectedVersion }`                                                    |
| PATCH  | base/{id} | Shallow patch `{ data, expectedVersion }`                                             |
| DELETE | base/{id} | Delete with `{ expectedVersion }` body                                                |

Pagination uses stable UUID ordering; the returned `nextCursor` is used with the
same filter and sort. It is not a chronological or snapshot listing. Requests
are bounded and private responses are never cached. Writes are rate-limited to
200 per minute per tenant/environment/principal. Auth uses the same ordinary
customer capability or administrator JWT as the existing supported API. Tables
are inaccessible directly to browser roles; service-role credentials
are never required by developers.

CLI: `groovepost data get|list|create|upsert|patch|delete`. MCP:
`data_get`, `data_list`, `data_upsert`, `data_patch`, `data_delete`.

## Submission lifecycle ownership

Generic entity persistence does not know about forms, submissions, app-specific
fields, or reserved collection names. A collection named `collections` behaves
like any other app-declared collection. Identity is an independent shared service.

Use [Forms and submissions](forms-submissions.md) when records require drafts,
submission, attachments, consent auditing, statuses or administrator review.
That module owns its lifecycle storage. Each consumer repository declares its own
versioned form definition and supplies its own screens and business rules.
There is no sell service or generic-data adapter for submission records.

See [authentication](authentication.md) for customer sessions and [forms](forms-submissions.md) for draft and submission lifecycle.
