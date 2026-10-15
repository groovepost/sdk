# Branch builds and hosted app packages

Give independent apps `develop` and `main` branches. Feature PRs target develop;
release PRs merge develop into main. Package publication and GroovePost activation
are separate operations: publishing an app archive does not deploy the platform.

| Branch | Package | Use |
| --- | --- | --- |
| Feature branch | CI review artifact | Local/review checks |
| develop | Immutable prerelease tied to the full commit SHA | GroovePost development import and acceptance |
| main | Versioned release of the same accepted candidate bytes | Production promotion of the accepted dev release |

## Setup steps

1. Pin published SDK/UI/CLI dependencies, commit the lockfile, and configure the
   package registry scopes from [getting started](./getting-started.md). Add a
   repository package-read secret with access to every dependency; keep it out
   of frontend code and fork PRs.
2. Add CI for typechecks, tests, browser checks and `groovepost apps pack`. Record
   the exact commit SHA, source tree, package version and archive SHA-256. Require
   CI before merging. Update the app version for every runtime/dependency change.
3. On pushes to develop, run that CI and publish its successful archive plus
   provenance as an immutable commit-specific prerelease. Give only the publishing
   job `contents: write`. Retrying must verify existing bytes, never replace them.
4. Release via a develop → main merge commit. Verify main has the same tree as its
   develop parent, retrieve the successful candidate for that exact commit, verify
   its digest/provenance, and publish those bytes under the app version. Do not
   rebuild on main. Keep dev prereleases from becoming GitHub's latest stable release.
5. Download the intended package and place its unchanged archive at your configured
   HTTPS artifact host. Private GitHub releases need authentication, and GitHub
   asset links normally redirect; neither should be assumed to work with the
   GroovePost direct-URL importer. Use a supported direct object URL, optionally
   signed and short-lived. Preserve its digest and provenance.
6. Import/activate in GroovePost development using an ordinary authorized tenant
   account. Test the hosted app, then record acceptance. Production promotes the
   accepted dev release ID with `apps publish`; it does not import or rebuild a
   different main archive. Retain the previous working release for rollback.

Manifest compatibility describes the hosted runtime contract separately from the
installed SDK version. See [hosted apps](./hosted-apps.md). Never advance only the
compatibility string to migrate runtimes.

WBUR provides a concrete implementation of this pattern:
[setup guide](https://github.com/groovepost/wbur-app/blob/develop/docs/branch-packages.md),
[develop workflow](https://github.com/groovepost/wbur-app/blob/develop/.github/workflows/candidate.yml),
[CI workflow](https://github.com/groovepost/wbur-app/blob/develop/.github/workflows/ci.yml),
and [main workflow](https://github.com/groovepost/wbur-app/blob/develop/.github/workflows/publish.yml).
WBUR is private, so those examples require repository access; the steps above are
usable independently. Adapt its app-specific helpers and tests before reuse.

GitHub publication and local tests are not hosted acceptance. Provider credentials
and platform sessions belong to the host, never an app package.
