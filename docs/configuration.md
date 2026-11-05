# Configuration sources

Standalone backend: environment credentials plus private CMS policy → typed service resolver → shared service implementation.

GroovePost backend: verified tenant/environment/application context → authorized encrypted database connection → the same typed resolver and service implementation.

The canonical inventory has 25 names (23 shared, 2 platform-only), not 25 platform runtime environment variables. Tenant provider accounts, connection IDs, enablement, sender/recipient policy and native/web trusted origins remain scoped records. Existing accounts are preserved independently; platform operator credentials are never a tenant fallback.

Clients receive available methods, public destinations and scoped SDK context only. Submission questions, presentation and business-specific validation remain in the consumer; the shared backend owns draft, attachment, submission, review, notification and cleanup behavior. Existing REST/SDK operations remain compatible. See the [platform inventory](https://github.com/groovepost/platform/blob/codex/configuration-cleanup/docs/environment-configuration.md) and [starter inventory](https://github.com/danielmarkland/expo-payload-starter/blob/codex/configuration-cleanup/docs/configuration.md) for the generated authoritative inventory in the review candidates.

Source/package tests do not establish registry publication or hosted acceptance. Credential renames, migrations, reauthentication and deployment require the coordinated cutover after review.
