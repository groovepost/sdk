# Repository builds

Status: implementation branch; registry publication and hosted development acceptance must be recorded before treating this workflow as available to customers.

The connected GitHub repository owns app code, `manifest.json`, `app.config.json`, dependency pins and CI. GroovePost owns tenant settings, shared services, environment branch selection and the active deployment. Development builds automatically on a push to its assigned branch. Production builds only when an administrator selects **Build and deploy**. Merging production's branch does not publish it. There is no scheduler or cron job.

## Customer setup

1. Create `main` and `develop`. Require pull requests and CI. Keep a lockfile and exact SDK/CLI pins; do not commit credentials. Use the registry access instructions in the public SDK guide.
2. Run `groovepost apps init` for a new app, or copy the CLI's `templates/groovepost.yml` into `.github/workflows/groovepost.yml` for an existing app. Preserve your own tests and browser checks. This workflow uses `workflow_dispatch`, GitHub environments and short-lived OIDC identity; it has no production push trigger.
3. Commit the workflow to the repository's default branch and the environment branches. GitHub requires workflow registration before it can be dispatched. This setup commit is not a GroovePost production deployment. Set up GitHub environments named `development` and `production`; restrict their deployment branches to their intended branch. `production` should require a reviewer as an additional repository policy.
4. Provide GitHub's `PACKAGE_READ_TOKEN` secret with permission to read the SDK packages. This is dependency installation access, not a GroovePost administrator token. Repository workflow permissions are `contents: read`, `packages: read`, `id-token: write`.
5. In the tenant's **App deployments**, connect the GitHub repository and install the operator's GitHub App on that repository only. Save the development branch and enable automatic builds. Configure the production environment separately, with automatic builds disabled. Environment hosts enforce their own boundary.
6. Click **Build and deploy** for the initial development build, then test a push to `develop`. Check the full live commit and the GitHub Actions logs. Test the real hosted app before publishing production. A successful CI run alone does not establish acceptance of SMS, payments or other external integrations.

## Repository build contract

`npm run build` runs `groovepost apps build manifest.json dist/app.tar.gz`. The archive contains the current schema-3 `web-features-v1` bundle, styles and manifest; it is build transport, not a customer package registry. `app.config.json` contains composition in source control:

```json
{
  "layout": "app-owned",
  "defaultDestination": "sell",
  "tabs": [{
    "id": "sell",
    "label": "Sell records",
    "screen": "features",
    "features": [{ "id": "seller", "feature": "wbur-sell", "options": {} }]
  }]
}
```

Use your own exported widget ID. Do not supply output digests, stored package references or a `mode`. `app-owned` means one widget on one screen; its design and navigation remain app-owned. Tabs and master/detail support compositions including built-in feed, content and shop widgets. Tenant branding and services still come from SDK context.

GroovePost captures the branch head before dispatch and the workflow checks out that exact SHA. The CLI reports status, requests a bounded private upload, then submits the source-controlled app configuration. Each callback verifies GitHub's OIDC issuer, audience, repository ID, branch, SHA, environment, workflow and run binding. External request/image origins must be declared in the manifest and allowed in that tenant environment. App code receives no platform credentials.

Failed and superseded builds do not replace the live pointer. Activation is serialized per tenant. Only active serving output is retained; previous outputs are deleted after activation. History records commit, branch, actor, time, status, checksum and CI run link. Cleanup failures are visible and can be retried manually. No archived package can be restored or promoted. Revert code in Git and build it again to recover.

## Platform readiness

The GroovePost operator registers the GitHub App and configures its server secrets and existing private storage. Customers install it only on their selected repository. If the connection button says operator setup is missing, the developer cannot fix that by supplying a package URL or a platform token.

The GitHub App needs Contents read and Actions read/write plus Metadata read. It receives push and workflow-run webhooks. It does not write your source or administer your repository. CI uses an existing GitHub runner; no new build worker, scheduler, cron or polling service is required.

The implementation is awaiting package publication and hosted acceptance. Existing package version metadata describes published SDK releases, not completed app deployment acceptance.
