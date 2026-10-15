# Data and sessions

Customer capabilities are separate from platform administrator identity. New
customer sessions can own drafts; phone verification allows supported recovery.
Hosted apps request authentication through the host bridge. Session storage,
expiry handling and UI recovery belong to the consumer application.

## Entity operations

```ts
const notes = api.data.collection<{ text: string }>("notes");
const entity = await notes.create({ text: "Saved" });
console.log(entity.data.text);
await entity.patch({ text: "Updated" });
await entity.delete();
```

Declare collection schemas and access in an active validated package. Data reads
are hydrated; no separate `getData()` is required. Entity writes carry current
versions. Collection-level writes require `expectedVersion`; zero creates an
absent ID. Handle a 409 by reloading and reconciling, not overwriting blindly.
Patch shallow-merges, upsert replaces the document, and nested values are replaced.

The SDK generates operation IDs and retries a dropped write response once with
identical input. Persist explicit IDs for cross-process retries; reuse them only
for the same operation. Receipts expire after seven days. Limits include 64 KiB
JSON and bounded schema/depth sizes; files use upload references.

Tenant/environment/customer ownership stays enforced by REST. Customer collections
are session-private, administrator collections are tenant-shared among authorized
roles, and the reserved collection-draft workflow has additional constraints.

## Seller flow

Supported methods include drafts, photo upload, phone verification, final
submission and status. Finalization requires server validation, verified identity
and required uploads. Submission is idempotent per draft. Incomplete uploads can
be retried; browser file handles and background uploads are not preserved after
closing a page. Never claim SMS delivery or upload success from a local fixture.
