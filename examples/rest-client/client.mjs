import { createGroovePostClient } from "@groovepost/app-sdk";
export function makeClient(configuration, fetch) {
  return createGroovePostClient({
    ...configuration,
    environment: "development",
    ...(fetch ? { fetch } : {}),
  });
}
export function fixtureFetch(url) {
  if (!String(url).endsWith("/sessions"))
    throw new Error("Unexpected fixture request");
  return Promise.resolve(
    Response.json({
      token: "example-only-fixture",
      expires_at: "2099-01-01T00:00:00Z",
    }),
  );
}
