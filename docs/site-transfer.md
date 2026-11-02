# JSON Import / Export

These contracts are implemented in the current platform PR #199 candidate. Shared package source changes are local previews, not a published release. Consult the selected environment’s authenticated API docs and installed package declarations before using the new operations.

Import / Export is an immediate, authenticated owner/admin API workflow. It needs
no transfer worker, archive bucket, signed storage URL or scheduled job.

- **Theme** exports only Site Settings `theme` and `buttons`: colors, typography,
  appearance and button styles. Import updates the existing settings document.
- **Full Site** exports supported editorial content, current/published draft
  states, taxonomy, navigation and site settings. Import replaces those resources
  transactionally and remaps relationships between imported records.
- Media files and media records are never exported, uploaded, deleted or copied.
  Existing media references (including rich-text uploads) remain unchanged. They
  must be valid for the destination: native validation rejects missing or cross-tenant media IDs. Import never clears references or relocates assets.
- Domains, accounts, memberships, credentials, integrations, billing, forms,
  submissions and app packages/composition remain environment-specific.

## Admin flow

Export downloads a `.json` file directly. Import reads a `.json` file, validates
it through the API and shows incoming/replaced counts and the destination. Type
the exact environment/site confirmation before applying. The API rechecks the
file and current destination fingerprint under the editorial lock. Invalid or
stale imports fail without changing the site; native validation/hooks and
transaction rollback remain active. On success, a JSON copy of the previous
content/settings downloads for manual recovery through the same import flow.
No server-side backup or operation history is stored by this workflow.

JSON documents and HTTP request bodies are bounded to 4 MiB. Oversized data is
rejected explicitly; this synchronous implementation does not claim support for
unbounded site migrations. The JSON format is versioned (`groovepost-site`, v1)
and excludes tenant IDs, credentials and raw Payload storage metadata. Reference
keys are remapped only for exported content; media references stay literal.

## API and consumers

All routes are under `/api/v1/site-transfers/tenants/{slug}` and require an
explicit authorized tenant/environment scope for mutations.

| Method/path                                                 | Behavior                                              |
| ----------------------------------------------------------- | ----------------------------------------------------- |
| `GET /`                                                     | Destination context and exact confirmation text       |
| `POST /exports` `{ packageKind: "theme" \| "full" }`        | Returns JSON immediately                              |
| `POST /imports/preview` `{ document }`                      | Validates JSON and returns counts/digests             |
| `POST /imports/apply` `{ document, preview, confirmation }` | Atomic replacement; returns previous JSON as `backup` |

SDK `operations.invoke` exposes the same operations. Generic CLI/MCP catalogs
include `site_json_preview` and `site_json_apply`; removed job/upload-complete,
restore and download-URL operations are no longer supported.

```sh
groovepost site export --tenant SITE --environment development --package theme --output theme.json
groovepost site import --tenant SITE --environment development --package theme --file theme.json
# After reviewing the returned preview:
groovepost site import --tenant SITE --environment development --package theme --file theme.json --confirm-destination development:SITE --backup before-import.json
```

Use `--package full` for Full Site. The CLI never overwrites a backup file.
Cross-environment copies use export followed by import into the selected
destination. Old `.tar` transfer files are not accepted by these endpoints.

## Rollout

The old worker callbacks, archive upload/download endpoints and transfer worker
commands are removed. Retire `GROOVEPOST_SITE_TRANSFER_BUCKET` and
`GROOVEPOST_SITE_TRANSFER_WORKER_TOKEN` from instance/worker configuration during
an authorized cutover. Unrelated housekeeping workers remain. Existing transfer
rows and stored archives are left intact; this change does not delete hosted data
or run destructive cleanup/migrations. Shared package publication and hosted
cutover require separate authorization.
