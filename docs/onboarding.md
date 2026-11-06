# Tenant-linked onboarding

Create a site through an authorized platform administrator, then sign in with `groovepost auth login` and inspect accessible tenants with `groovepost tenants list`.

Run `groovepost apps init --tenant <slug> --directory <path>` to create a local app directory. Use `--adopt` only after reviewing an existing directory. The binding records the tenant and explicit environment; no repository URL, branch or workflow is needed. `apps sync` refreshes public tenant settings without replacing app source or storing service credentials.

Follow [local packages and promotion](app-packages.md) for build, verify, Development upload, preview and Production promotion. Every operation keeps the caller's API permissions. Platform administrators, tenant members and customer identities remain separate.
