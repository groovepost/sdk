import { test } from "node:test";
import assert from "node:assert/strict";
import { GroovePostError } from "@groovepost/app-sdk";
import { makeClient, fixtureFetch } from "./client.mjs";
test("SDK scopes the request and retains the customer capability", async () => {
  const calls = [];
  const api = makeClient(
    { apiUrl: "https://fixture.example/api/v1", tenantSlug: "example" },
    async (url, init) => {
      calls.push({ url, init });
      return fixtureFetch(url);
    },
  );
  await api.createCustomerSession();
  assert.equal(
    calls[0].url,
    "https://fixture.example/api/v1/funnel/example/development/sessions",
  );
  assert.equal(
    new Headers(calls[0].init.headers).get("x-groovepost-tenant"),
    "example",
  );
  assert.equal(new Headers(calls[0].init.headers).get("authorization"), null);
  assert.equal(api.getCustomerToken(), "example-only-fixture");
});
test("REST permission errors retain structured code and status", async () => {
  const api = makeClient(
    { apiUrl: "https://fixture.example/api/v1", tenantSlug: "example" },
    async () =>
      Response.json(
        { error: { code: "forbidden", message: "Fixture denial" } },
        { status: 403 },
      ),
  );
  await assert.rejects(
    () => api.createCustomerSession(),
    (error) =>
      error instanceof GroovePostError &&
      error.status === 403 &&
      error.code === "forbidden",
  );
});
