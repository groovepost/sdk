# Hosted apps and screens

Use `defineApp` for a complete hosted app or `defineScreen` for a screen export.
A mount receives a DOM element, tenant/environment/theme context, validated
options, and a capability-limited bridge. Return cleanup for listeners and timers.

```ts
import { defineScreen } from "@groovepost/app-sdk";
export const Welcome = defineScreen({
  mount(element, context) {
    const heading = document.createElement("h1");
    heading.textContent = context.tenant.name;
    element.append(heading);
    return () => heading.remove();
  },
});
```

Schema-v2 frontend manifests declare `web-frame-v1`, source/bundle names, exports,
SDK compatibility, option schemas, and requested capabilities. Access is
host-controlled; public screens must explicitly declare public entry. Packages
run in isolated frames and receive no provider credentials or platform sessions.

The [countdown example](./examples.md) contains a complete manifest and packaging
command. Preserve its compatibility range until the platform explicitly supports
a different range; npm package version and manifest compatibility are different
contracts.

Package locally, host the immutable archive at your configured HTTPS destination,
then import through development Apps admin or `groovepost apps import URL`.
Scanning and hosted startup checks must pass, followed by explicit administrator
acceptance. Production promotes the exact validated development release rather
than refetching or rebuilding the package. Local packing is not hosted acceptance.

## Widgets and layouts

SDK 0.4.2 and the corresponding platform release support `defineWidget`, built-in Feed/Page/Shop widgets,
master-detail app layouts and widget navigation. Use the corresponding released package declarations and configured hosted platform.
The countdown example demonstrates the simpler screen contract.
