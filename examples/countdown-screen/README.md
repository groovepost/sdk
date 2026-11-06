# Countdown widget

After registry authentication, install the exact dependencies with npm ci, then run npm run typecheck, npm test and npm run build. The current schema-3 widget owns its timer and cleans it up on unmount; it requests no platform capabilities.

Composition and title/releaseDate defaults live in app.config.json and are embedded in the package. Follow [local packages and promotion](../../docs/app-packages.md) to upload to Development, explicitly import defaults, publish and test before promotion. Toolkit publication remains a separate prerequisite.
