import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
test("current widget is capability-free and validates its configurable inputs", async () => {
  const m = JSON.parse(
    await readFile(new URL("./manifest.json", import.meta.url)),
  );
  assert.equal(m.runtime, "web-features-v1");
  assert.deepEqual(m.capabilities, []);
  assert.deepEqual(m.features[0].routes,[{id:"root",path:"/"}]);
  assert.deepEqual(m.features[0].options.required, ["title", "releaseDate"]);
  assert.equal(m.features[0].options.additionalProperties, false);
});
