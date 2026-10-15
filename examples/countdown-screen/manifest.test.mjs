import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
test("public screen is capability-free and validates its configurable inputs", async () => {
  const m = JSON.parse(
    await readFile(new URL("./manifest.json", import.meta.url)),
  );
  assert.equal(m.runtime, "web-frame-v1");
  assert.deepEqual(m.capabilities, []);
  assert.equal(m.screens[0].access, "public");
  assert.deepEqual(m.screens[0].options.required, ["title", "releaseDate"]);
  assert.equal(m.screens[0].options.additionalProperties, false);
});
