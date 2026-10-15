# Contributing and support

This repository accepts SDK documentation corrections, example improvements and
reproducible integration issues. SDK implementation is maintained privately.

Use Node 22+, `npm ci`, `npm test` and `npm run docs:build`. Run example checks
separately with package-read access. Keep examples independent of private source,
pin registry versions, include lockfiles and use environment-based configuration.
Never add credentials, private tenant data or production theme copies.

Submit a pull request with the problem, change and validation. A docs change must
not describe an unreleased API as available. Do not include implementation patches
from private repositories. For SDK behavior issues include a minimal consumer
reproduction and exact package versions; maintainers route implementation work
internally.
