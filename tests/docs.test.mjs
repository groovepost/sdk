import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
const versions = JSON.parse(readFileSync("versions.json"));
const examples = [
  "rest-client",
  "countdown-screen",
  "themed-controls",
  "native-post-list",
];
test("examples use exact SDK versions without private workspace links", () => {
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
        existsSync(resolve(dirname(file), target)) ||
          (target.startsWith("/") &&
            existsSync(resolve("docs/public", target.slice(1)))),
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

test("documented package pins agree with the release inventory", () => {
  const files = ["README.md", ...readdirSync("docs").filter(name => name.endsWith(".md")).map(name => `docs/${name}`)];
  for (const file of files) {
    for (const match of readFileSync(file, "utf8").matchAll(/(@groovepost\/[a-z-]+)@(\d+\.\d+\.\d+)/g))
      assert.equal(match[2], versions.packages[match[1]], `${file}: stale package pin`);
  }
  const inventory = readFileSync("docs/packages.md", "utf8");
  for (const [name, version] of Object.entries(versions.packages)) {
    const row = inventory.split("\n").find(line => line.includes("`" + name + "`"));
    assert.ok(row, name + " missing from package table");
    assert.equal(row.split("|")[2].trim(), version, name + " has stale table version");
  }
  const operations = JSON.parse(readFileSync("docs/public/operations.json"));
  const tools = JSON.parse(readFileSync("docs/public/mcp-tools.json"));
  assert.ok(operations.length > 0);
  for (const operation of operations) {
    const tool = tools.find(tool => tool.name === operation.mcp);
    assert.ok(tool, `${operation.name}: missing MCP tool`);
    assert.deepEqual(tool.inputSchema, operation.inputSchema);
  }
});
