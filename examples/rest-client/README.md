# REST client

After registry authentication: `npm ci`, `npm test`, `npm start`.
The default uses an injected fixture fetch and makes no network requests.

For a live development customer session, configure `GROOVEPOST_API_URL` (including
`/api/v1`) and `GROOVEPOST_TENANT`, then run `npm start -- --live`.
This creates a session in the configured development tenant. It never logs tokens.
No administrator/provider credentials are required. Anti-abuse policy may require
additional application integration beyond this minimal example.
