# Countdown hosted screen

After registry authentication: `npm ci`, `npm run typecheck`, `npm test`, then
`npm run package`. The last command builds a frontend archive in `dist/`; it does
not upload or deploy it. The screen uses tenant options, owns a timer and cleans
that timer up on unmount. It requests no platform capabilities.

The schema-v2 manifest declares `web-frame-v1`, public screen entry and required
`title`/`releaseDate` options. Its SDK compatibility range describes the host
protocol; it is distinct from the installed SDK package version.

Host the resulting archive at a configured HTTPS URL, import it through your
development tenant Apps admin, wait for validation, and select the exported
`countdown` screen. Supply a title and an ISO release date. Explicitly accept the
hosted development release before promoting exact validated bytes to production.
Use an ordinary authorized administrator; never embed its token in this screen.
