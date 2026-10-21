# Builds and releases

An app release is a fresh build of the selected repository branch. Development can deploy automatically after a branch push. Production deploys only when an administrator starts a build. Merging production's branch does not deploy the app. There is no scheduling or cron.

See [repository builds](repository-builds.md) for setup and verification. Build history records commit, branch, actor, status, checksum and CI logs. A failed or superseded build leaves the current deployment intact. Historical archives are not a release catalog; recover by reverting source and rebuilding.

SDK library versions are separate: install exact published SDK/CLI versions and commit the lockfile. A successful package publication or app CI run alone does not prove hosted customer-flow acceptance. Verify configured external services before claiming them complete.

## Changelog and release milestones

Maintain a root `CHANGELOG.md`. Record noteworthy implemented changes under
`Unreleased` in the same feature PR, using Added, Changed, Fixed, and Removed
categories where useful. Ideas belong in issues. Maintenance-only PRs may omit an
entry when the PR explains why. This is a review requirement, not a CI gate.

For an authorized release, move the entries into a dated version section and leave
an empty `Unreleased` heading. For generated apps, squash feature PRs into develop and release through a
same-repository develop → main PR with a merge commit. This documentation-only
repository uses feature PRs into main. Production remains separately
authorized. Keep release bookkeeping synchronized back to develop through a PR;
do not reset branches or rewrite shared history.

Prepare GitHub Release notes from the changelog. After release acceptance, create
an annotated tag against the exact verified main commit and publish the matching
GitHub Release. A GitHub Release alone does not deploy an app. Record deployment
and service acceptance separately. Repository milestone tags do not reset app or
independently published package versions.

## Adopting the convention

CLI 0.9.3 includes a changelog, release guide, PR checklist and agent rules in
new app scaffolds. Existing applications add these files explicitly; installing
a new SDK version does not rewrite project files. See the [verified package
inventory](packages.md) for the production publication evidence.
