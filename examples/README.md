# Independent SDK examples

Configure the two registry scopes and package-read authentication as described in
[getting started](../docs/getting-started.md). Run `npm ci` in each directory.

- [REST client](rest-client/README.md): SDK scope and error handling with offline fixtures.
- [Countdown screen](countdown-screen/README.md): complete manifest, lifecycle and packaging.
- [Themed controls](themed-controls/README.md): shared React controls and tenant composition.

Every example pins verified GitHub Packages releases. No platform checkout is
required. Live API calls need configured tenant access; local tests/builds do not
prove hosted acceptance. Do not commit .env files or package tokens.
