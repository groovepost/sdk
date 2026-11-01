# Getting started

## Requirements

Use Node 22+ and npm. Have a Groovepost tenant, the configured API origin, and
GitHub package read access. Documentation can be built without package access.

## Configure package access

Add a credential-free `.npmrc` to your app:

```ini
@groovepost:registry=https://npm.pkg.github.com
@danielmarkland:registry=https://npm.pkg.github.com
```

GitHub Packages currently requires a personal access token (classic) with
`read:packages` and access to the relevant packages; authorize organization SSO
if required. GitHub CLI login alone is not npm package authentication.
Authenticate interactively, keeping the token out of repository files:

```sh
npm login --scope=@groovepost --auth-type=legacy --registry=https://npm.pkg.github.com
```

Use your GitHub username and the token when prompted for the password. Package
permissions and organization policy must allow access; publication configuration
alone does not prove packages are visible to every developer.

## Install the current SDK

Install the exact SDK version from the package inventory:

```sh
npm install --save-exact @groovepost/app-sdk@0.6.2
```

See [the inventory](./packages.md) before selecting other packages. The SDK is
ESM and ships declarations. Browser examples use React 19.2.6 where applicable.

## Make a call

```ts
import { createGroovePostClient } from "@groovepost/app-sdk";
const api = createGroovePostClient({
  apiUrl: configuredApiUrl, // includes /api/v1
  tenantSlug: configuredTenant,
  environment: "development",
});
const session = await api.createCustomerSession();
```

API URL and tenant values come from your environment configuration. There is no
production-domain fallback. Creating a session needs a reachable configured
platform and may require anti-abuse configuration. Persist the returned customer
capability appropriately for your application. See [sessions](./data-and-sessions.md).

For an offline first run, use the [REST example](./examples.md). It injects a
fixture fetch and verifies request scoping without writing tenant data.

## Build and upload an app

Follow [local packages and promotion](app-packages.md): build locally, verify and upload one archive to Development. Import layout defaults explicitly, publish and test before promoting the exact package and published layout to Production. No repository connection or custom workflow is required. Publication and hosted acceptance are separate prerequisites.
