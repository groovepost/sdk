# Native Post List reference

This Expo consumer loads the selected tenant/environment's published App Builder composition. It does not ship fixture tabs or copy configuration into native source.

The example pins published SDK 0.6.4 and app-native 0.1.0. Package publication and clean registry installation are verified; see the platform PR evidence for simulator/device limitations.

Authenticate package reads, install dependencies with `npm ci`, copy `.env.example` to `.env`, and supply the explicit API origin (including `/api/v1`), tenant slug and environment. Use an HTTPS endpoint reachable from the simulator/device. Never put administrator credentials in Expo public configuration.

Run `npm run typecheck`, `npm run build`, then `npm run ios` or `npm run android`. A reload fetches the latest published layout. Create and publish three tabs in App Builder, each with its own Post List heading/page size; verify the native labels, lists, pagination, detail navigation and retry behavior. No repository connection is required.

The native renderer currently supports tab layouts and Post List. WBUR remains a custom web widget until it provides a native implementation. No WebView substitutes for native acceptance.
