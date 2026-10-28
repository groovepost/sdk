# Tenant-linked developer onboarding

> These guides describe the current supported contracts. The [package inventory](packages.md)
> records verified published versions; newer source changes do not imply package publication
> or acceptance of your configured services. Check installed declarations and the selected
> environment's authenticated API documentation before using an operation.

Use the production platform to manage a tenant's logical development, production
and configured stage environments. The platform development instance tests
GroovePost itself and remains separate. See [tenant app environments](environments.md)
and [repository builds](repository-builds.md).

Authenticate using an account authorized for the configured API. Configure the
explicit `/api/v1` base as `GROOVEPOST_API_URL`, the selected logical environment
as `GROOVEPOST_ENVIRONMENT`, and use browser OAuth login or an ordinary account
access token. Never use a service-role key. Tenant creation is an operator action;
new development resources start empty and existing production resources stay intact.
Repository setup does not start trials or billing.

```sh
groovepost tenants list
groovepost apps init --tenant <slug> --repo <github-owner>/<repo-name> --directory <path>
cd <path>
npm install
npm run sync
npm run dev
npm run build
```

The CLI verifies current owner/admin membership in the selected tenant environment.
It uses the caller's authenticated `gh` session and Git identity to create a private
repository with `main` and `develop` branches and the repository CI workflow.
For an existing application use `apps init --adopt` with its local directory; this
records the binding/public settings without replacing application source or design.
Interrupted creation never deletes the repository.

`.groovepost/project.json` records canonical tenant/project identity, repository URL,
and API base. Synced public branding/settings, including the selected logical environment, live in ignored
`.groovepost/settings.json`; secrets are never written there. Sync rechecks current
membership and repository identity. Independent apps retain design freedom and
consume SDK context and platform services; see [the app developer contract](developer-contract.md).

In App deployments, connect the GitHub repository using the existing GitHub App and
select each environment's branch and external origins. Development automatically
builds branch pushes; production builds manually. CI checks out the exact commit
and deploys its `app.config.json` composition. Recovery is Git revert and rebuild;
there is no retained-package import, acceptance, promotion or restore command.

SDK operations are `tenants.list`, `projects.{get,link,settings}`, and `.builds`.
REST environment paths and `x-groovepost-environment` support registry-defined keys.
MCP tenant discovery requires no preselected tenant; scoped tools accept the chosen
environment. Local Git/repository setup remains a CLI operation. Tokens, provider
credentials, storage configuration and domains stay in their owning environment.
