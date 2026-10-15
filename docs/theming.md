# Theming and shared controls

```tsx
import { Button, Field } from "@groovepost/ui/web";
import "@groovepost/ui/controls.css";

export function NameField() {
  return (
    <Field label="Name">
      <input name="name" autoComplete="name" />
    </Field>
  );
}
```

The stylesheet includes control styling and portable licensed fonts through the
shared publishing packages. Your bundler must resolve CSS package imports and font
assets. Keep font license notices in distributed bundles.

Hosted context supplies tenant-resolved CSS variables and optional public footer/
help metadata. Tenant records own branding. Standalone previews should use synced
public settings rather than copying a production theme into app source.

`Button` and `Field` provide shared controls; `Field` associates the label, hint and
error presentation with its child control. `FunnelLayout`, `StepProgress`,
`ChoiceGroup` and `UploadCard` are shared building blocks. Apps own validation,
persistence, navigation and upload calls. `UploadCard` itself does not upload or
verify images.

Use React 19.2.6 with the verified UI release. Compose small tenant wrappers and
pass supported React props/children. The [controls example](./examples.md) shows
a wrapper and a tenant-scoped CSS-variable preview without a private app checkout.
Its preview theme is sample data, not a tenant's production branding.

Custom UI may consume the same platform APIs. Automatic interaction analytics and
uniform loading/error behavior are not promised; track intentional events through
supported APIs, without form values, photos or private data in metadata.
