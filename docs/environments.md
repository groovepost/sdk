# Tenant environments

> These guides describe the current supported contracts. The [package inventory](packages.md)
> records verified published versions; newer source changes do not imply package publication
> or acceptance of your configured services. Check installed declarations and the selected
> environment's authenticated API documentation before using an operation.

The platform instance hosts canonical tenant accounts. Each authorized tenant
account has separately configured environments, such as development and production.
The platform's own development instance tests the platform; it is not your app's
logical development environment.

Each tenant environment has its own content, customer identity, domains, integration
credentials, app output and data. New environments start empty. Membership and roles
are enforced server-side; choosing an environment never grants access.

Select an environment explicitly in the SDK client, CLI configuration or scoped
MCP tool. REST uses explicit environment paths or `x-groovepost-environment` where
supported. Configured registry keys are supported; do not assume only two keys.
Hostname-bound requests stay in that hostname's resource environment regardless of
caller headers. The admin tenant/environment selector updates the same context.

A tenant environment selects a repository branch and approved external origins.
Eligible development branches can build automatically; production builds are
always manual. Recovery uses Git revert and rebuild. Editorial content transfer
is separate from app deployment and does not copy credentials or customer data.

See [onboarding](onboarding.md), [repository builds](repository-builds.md),
[authentication](authentication.md), and [site transfer](site-transfer.md).
