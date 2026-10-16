# Hosted apps

Use the current widget runtime with a schema-3 `web-features-v1` manifest and `defineWidget` exports. The app repository owns design, routes, dependency pins and composition. GroovePost supplies tenant branding, authentication and configured services through SDK context and its capability-limited bridge.

See [repository setup and builds](repository-builds.md) for the complete customer workflow. For a single app with its own header, footer and navigation, set `layout: "app-owned"` with one widget on one screen. Tabs and master/detail compose multiple widgets. Built-in feed, content and shop widgets remain available through source-controlled configuration.

App developers can use `createHostedClient` for session, data, draft, photo and submission services without platform credentials. Declared capabilities restrict existing customer permissions; they do not grant administrator access. Keep private data and photos out of analytics metadata. SMS requires a configured provider and real testing.

The repository workflow replaces URL import, package selection, release acceptance, promotion and restore. Only active serving output is retained. Revert in Git and build again to recover. The repository workflow has passed hosted development verification. Test your own configured services and production environment before publishing.
