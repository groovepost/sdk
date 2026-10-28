# Google Tag Manager and server-side Meta conversions

> These guides describe the current supported contracts. The [package inventory](packages.md)
> records verified published versions; newer source changes do not imply package publication
> or acceptance of your configured services. Check installed declarations and the selected
> environment's authenticated API documentation before using an operation.

The existing site setting **Google Tag Manager ID** is the only browser tag
configuration. Install Google Ads and Meta Pixel tags in that GTM web container.
GroovePost does not load gtag.js or fbevents.js separately, initialize a Pixel,
store Google Ads IDs/conversion labels, or calculate attribution. Google and Meta
provide attribution, reporting and optimization.

## Tenant environment setup

1. Set the existing Google Tag Manager container ID in site settings. The same
   tenant environment's website and hosted app use that setting.
2. In **Services → Submission advertising events**, choose the installed forms
   that count as leads and enable submission advertising events.
3. Optionally configure **Meta Conversions API (server-side)**: dataset ID matching
   the Pixel in GTM, supported Graph API version and access token. This connection
   sends directly from GroovePost's existing server; no server GTM container,
   tagging server, vendor service, queue or additional infrastructure is needed.

Settings are independent for each resource tenant/environment. Meta credentials
are encrypted using existing server encryption and never returned to the browser.
Blank tokens retain the secret only for the same dataset; clearing the dataset
removes CAPI delivery. Google Ads and browser Pixel configuration live only in GTM.

## GTM event setup

Create a Custom Event trigger named `groovepost_submission`. Create Data Layer
Variables for `transaction_id`, `event_id`, and optionally `form_id`:

| GTM tag                        | Configuration                                                                                                                                             |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Google Ads Conversion Tracking | Configure the Google Ads conversion ID/label in GTM. Use `transaction_id` as Transaction ID. Fire on `groovepost_submission`.                             |
| Meta Pixel                     | Configure the Pixel in GTM. Send standard `Lead` on `groovepost_submission`, using `event_id` as Event ID. Use the same dataset as the server connection. |
| Google Conversion Linker       | Configure in GTM for website/app hosts, including cross-domain linking where needed.                                                                      |

Use consent-aware tags/templates compatible with the hosted app CSP; no unsafe
script evaluation is enabled. On permission changes GroovePost queues native Google
consent updates and `groovepost_advertising_consent` with `advertising_consent` set
to `granted` or `denied`. Require advertising permission for the Ads and Meta tags,
and configure the Meta tag/template's consent handling for both grant and revoke.
Do not configure an additional Lead trigger on status pages or form button clicks.

When submission advertising is enabled, the shared consent component mounts the
existing GTM component only after explicit permission and after queuing the consent
commands. It never creates another tag loader. Revocation queues denied consent,
removes known ad cookies/cached click information, and stops submission events and
CAPI. Existing GTM behavior is unchanged for tenants without this feature enabled.
Advertising permission is separate from SMS verification/contact consent; declining
leaves submission functionality available.

## Website to hosted app handoff

The shared link handler retains standard `gclid`, `gbraid`, `wbraid`, `fbclid` and
UTM parameters only on HTTPS links to verified, ready domains of the same resource
tenant. It forwards no arbitrary query fields or user-entered form data. The
permission cookie is shared with a verified parent domain when one exists;
unrelated custom domains ask separately. GTM's Conversion Linker and provider
cookies handle native matching. There is no attribution model in GroovePost.

## Successful submission and server delivery

Only a successful, committed submission for a selected form emits:

```json
{
  "event": "groovepost_submission",
  "transaction_id": "<submission UUID>",
  "event_id": "submission:<submission UUID>",
  "form_id": "<configured form ID>"
}
```

Failed validation, draft saves, uploads, reviews, reloads and returning login do
not emit a lead. The browser suppresses repeated conversion events in its session;
Google uses the transaction ID and Meta uses the matching browser/server event ID
for native deduplication.

With explicit advertising permission, the server sends Meta's standard `Lead`
with the same `event_id`, immutable submission time, verified tenant app URL,
optional `_fbc`/`_fbp`, browser user agent, and a normalized SHA-256 verified phone
when available. It sends no raw contact details, form values, images, client IP
address or optional SMS consent. Public configuration contains neither dataset ID
nor server token. Meta failure cannot undo or report a successful save as failed;
the bounded request logs only provider/status. There is no delivery queue; a
retried submit reuses the same event ID.

Outside production CAPI requires a Meta Test Events code. Use test provider
resources in development. Remove the test code for live production events.

## Release acceptance

Tests simulate GTM events/provider delivery; they do not prove real ad-account
receipt. After release/migration, configure the existing GTM container and server
connection, then verify in GTM Preview/Google Tag Assistant and Meta Test Events:

- No duplicate Google/Meta browser loaders or settings; the existing container is used.
- Declining permission keeps advertising off and still allows submission.
- Website/app handoff retains click identifiers; no external links receive them.
- One submission produces one Google conversion and one deduplicated Meta Lead.
- Reloading or viewing status does not produce another conversion.
- Tokens never appear in public page source, visitor requests, SDK context or logs.

References: [GTM](https://developers.google.com/tag-platform/tag-manager),
[Google CSP requirements](https://developers.google.com/tag-platform/security/guides/csp),
[Meta CAPI](https://developers.facebook.com/docs/marketing-api/conversions-api/),
[Meta deduplication](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events).
