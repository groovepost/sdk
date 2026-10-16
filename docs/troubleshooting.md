# Troubleshooting

| Symptom                                        | Check                                                                                     |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------- |
| npm 401/403                                    | npm GitHub Packages login, read:packages access, package permissions and organization SSO |
| npm 404 for a Groovepost package               | Both scope mappings, exact verified version, and package-read access                      |
| npmjs cannot find shared packages              | Current distribution is GitHub Packages; configure both scopes                            |
| GitHub CLI is logged in but npm fails          | npm package authentication is separate from gh authentication                             |
| Control styles/fonts are absent                | Import controls.css and use a bundler resolving its package imports/assets                |
| Export missing                                 | Check installed declarations and version; platform develop may contain unreleased APIs    |
| API redirects or HTML response                 | Explicit API URL must end in /api/v1 and point at the intended deployment                 |
| Tenant operation denied                        | Tenant/environment, customer/admin realm, manifest capabilities and REST permissions      |
| Entity write returns 409                       | Reload/reconcile current version before retrying                                          |
| Repository will not connect | Confirm the operator configured the GitHub App; install it only on the selected repository |
| Build dispatch fails | Commit groovepost.yml to the default and selected branches; confirm installation Actions access |
| Dependencies fail in CI | Configure PACKAGE_READ_TOKEN and both GitHub Packages scopes; commit the lockfile |
| App differs from current Git source | Compare the full live SHA with the selected branch, then inspect the latest build logs |
| Production merge did not deploy | Production builds are manual; explicitly start a build when ready |
| Cleanup failed | Retry output cleanup from build history; current serving output stays protected |

When opening an issue include OS, Node/package versions, sanitized configuration,
reproduction steps, and the error code/status. Omit tokens, customer data, private
URLs where sensitive, and private source. Local fixtures prove behavior only within
the fixture; they do not validate hosted SMS, Shopify, deployment or permissions.
