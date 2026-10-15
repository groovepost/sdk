import { makeClient, fixtureFetch } from "./client.mjs";
const live = process.argv.includes("--live");
if (
  live &&
  (!process.env.GROOVEPOST_API_URL || !process.env.GROOVEPOST_TENANT)
) {
  throw new Error(
    "Live mode requires GROOVEPOST_API_URL and GROOVEPOST_TENANT",
  );
}
const api = makeClient(
  live
    ? {
        apiUrl: process.env.GROOVEPOST_API_URL,
        tenantSlug: process.env.GROOVEPOST_TENANT,
      }
    : { apiUrl: "https://fixture.example/api/v1", tenantSlug: "example" },
  live ? undefined : fixtureFetch,
);
await api.createCustomerSession();
console.log(
  live
    ? "Development customer session created; token is not logged."
    : "Offline fixture session created; no live request was sent.",
);
