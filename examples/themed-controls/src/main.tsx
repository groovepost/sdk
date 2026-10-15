import { useState, type ComponentProps, type CSSProperties } from "react";
import { createRoot } from "react-dom/client";
import { Button, Field } from "@groovepost/ui/web";
import "@groovepost/ui/controls.css";
import "./preview.css";

// Compose the released control; shared behavior remains in @groovepost/ui.
function TenantButton({
  className = "",
  ...props
}: ComponentProps<typeof Button>) {
  return <Button {...props} className={`tenant-button ${className}`} />;
}
function Preview() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  return (
    <main
      className="preview"
      style={{ "--color-primary": "#7c3aed" } as CSSProperties}
    >
      <h1>Shared controls, tenant presentation</h1>
      <p>
        Sample preview theme. Hosted apps receive actual tenant branding from
        platform context.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setMessage("Saved locally for this preview.");
        }}
      >
        <Field label="Display name">
          <input
            name="displayName"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </Field>
        <TenantButton type="submit">Save preview</TenantButton>
      </form>
      <p role="status">{message}</p>
    </main>
  );
}
createRoot(document.getElementById("root")!).render(<Preview />);
