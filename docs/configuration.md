# Configuration sources

Standalone backend: environment credentials plus private CMS policy → typed service resolver → shared service implementation.

GroovePost backend: verified tenant/environment/application context → authorized encrypted database connection → the same typed resolver and service implementation.

The canonical inventory has 25 names (23 shared, 2 platform-only), not 25 platform runtime environment variables. Tenant provider accounts, connection IDs, enablement, sender/recipient policy and native/web trusted origins remain scoped records. Existing accounts are preserved independently; platform operator credentials are never a tenant fallback.

Clients receive available methods, public destinations and scoped SDK context only. Submission questions, presentation and business-specific validation remain in the consumer; the shared backend owns draft, attachment, submission, review, notification and cleanup behavior. Existing REST/SDK operations remain compatible. See the [platform inventory](https://github.com/groovepost/platform/blob/main/docs/environment-configuration.md) and [starter inventory](https://github.com/danielmarkland/expo-payload-starter/blob/main/docs/configuration.md) for the generated authoritative inventory for the implemented configuration contract.

The shared release (publishing-contracts 0.15.0, publishing-core 0.20.0, publishing-ui 0.15.0, auth-runtime 0.3.0) is [published and clean-install verified](https://github.com/danielmarkland/expo-payload-starter/actions/runs/42129981675). Examples retain supported developer SDK/CLI versions and pin the applicable shared dependencies through npm overrides and registry lockfiles. Hosted acceptance remains separate. For an existing installation, review credential renames, migrations and resource-bound OAuth configuration before any environment change.
