# Tenant-linked onboarding

Create a site through an authorized platform administrator, then sign in with `groovepost auth login` and inspect accessible tenants with `groovepost tenants list`.

Run `groovepost apps init --tenant <slug> --directory <path>` to create a local app directory. Use `--adopt` only after reviewing an existing directory. The binding records the tenant and explicit environment; no repository URL, branch or workflow is needed. `apps sync` refreshes public tenant settings without replacing app source or storing service credentials.

Follow [local packages and promotion](app-packages.md) for build, verify, Development upload, preview and Production promotion. Every operation keeps the caller's API permissions. Platform administrators, tenant members and customer identities remain separate.

Hosted widgets receive tenant/environment context from the platform. Keep database,
S3, email, social-provider and Vercel credentials out of app code and app runtime
configuration. The developer CLI's API/tenant/environment selection is local
operation scope, not another set of hosted frontend environment variables.
`PACKAGE_READ_TOKEN` belongs only in dependency-installation CI. Registry access,
source CI and GitHub Pages publishing are independent of app upload/promotion.

The configuration-cleanup CLI candidate resolves project scope from local
schema-2 bindings and rejects conflicting API, tenant or environment overrides
before loading origin-bound OAuth credentials. Re-adopt old bindings explicitly;
see [candidate configuration](tooling.md#configuration-cleanup-candidate). These
changes are pending CLI publication and do not add hosted frontend settings.
