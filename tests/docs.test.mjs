import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
const versions = JSON.parse(readFileSync("versions.json"));
const examples = ["rest-client", "countdown-screen", "themed-controls"];
test("examples use verified exact SDK releases without private workspace links", () => {
  for (const example of examples) {
    const p = JSON.parse(readFileSync(`examples/${example}/package.json`));
    assert.equal(p.private, true);
    for (const [name, version] of Object.entries({
      ...p.dependencies,
      ...p.devDependencies,
    })) {
      assert.doesNotMatch(version, /workspace:|file:|link:/);
      if (name.startsWith("@groovepost/"))
        assert.equal(version, versions.packages[name]);
    }
    assert.ok(existsSync(`examples/${example}/package-lock.json`));
  }
});
test("local Markdown links resolve to committed documentation", () => {
  const visit = (directory) =>
    readdirSync(directory, { withFileTypes: true }).flatMap((entry) =>
      entry.name.startsWith(".") || entry.name === "node_modules"
        ? []
        : entry.isDirectory()
          ? visit(`${directory}/${entry.name}`)
          : entry.name.endsWith(".md")
            ? [`${directory}/${entry.name}`]
            : [],
    );
  for (const file of visit("."))
    for (const match of readFileSync(file, "utf8").matchAll(
      /(?<!!)\[[^\]]*\]\(([^)]+)\)/g,
    )) {
      const target = match[1].split("#")[0];
      if (!target || /^(https?:|mailto:)/.test(target)) continue;
      assert.ok(
        existsSync(resolve(dirname(file), target)),
        `${file}: broken link ${target}`,
      );
    }
});

test("example registry config and lockfile URLs contain no credentials", () => {
  for (const example of examples) {
    const root = `examples/${example}`;
    assert.doesNotMatch(
      readFileSync(`${root}/.npmrc`, "utf8"),
      /_auth|password|token/i,
    );
    const lock = JSON.parse(readFileSync(`${root}/package-lock.json`));
    for (const entry of Object.values(lock.packages)) {
      if (!entry.resolved) continue;
      const url = new URL(entry.resolved);
      assert.equal(url.username, "");
      assert.equal(url.password, "");
      assert.equal(url.search, "");
    }
  }
});
