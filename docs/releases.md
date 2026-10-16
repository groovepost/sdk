# Builds and releases

An app release is a fresh build of the selected repository branch. Development can deploy automatically after a branch push. Production deploys only when an administrator starts a build. Merging production's branch does not deploy the app. There is no scheduling or cron.

See [repository builds](repository-builds.md) for setup and verification. Build history records commit, branch, actor, status, checksum and CI logs. A failed or superseded build leaves the current deployment intact. Historical archives are not a release catalog; recover by reverting source and rebuilding.

SDK library versions are separate: install exact published SDK/CLI versions and commit the lockfile. A successful package publication or app CI run alone does not prove hosted customer-flow acceptance. Verify configured external services before claiming them complete.
