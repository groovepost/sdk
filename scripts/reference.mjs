import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
const versions = JSON.parse(await readFile(new URL('../versions.json', import.meta.url)));
const existing = process.argv.indexOf('--installed');
const root = existing < 0 ? await mkdtemp(join(tmpdir(), 'groovepost-reference-')) : resolve(process.argv[existing + 1]);
try {
  if (existing < 0) execFileSync('npm', ['install', '--prefix', root, '--ignore-scripts', '--no-audit', '--no-fund', '--loglevel=error', ...['app-sdk', 'mcp', 'cli'].map(name => `@groovepost/${name}@${versions.packages[`@groovepost/${name}`]}`)], { stdio: 'inherit' });
  const module = async (name, entry) => import(pathToFileURL(join(root, 'node_modules/@groovepost', name, 'dist', entry)));
  for (const name of ['app-sdk', 'cli', 'mcp']) {
    const manifest = JSON.parse(await readFile(join(root, 'node_modules/@groovepost', name, 'package.json')));
    assert.equal(manifest.version, versions.packages[`@groovepost/${name}`]);
  }
  const { operationCatalog } = await module('app-sdk', 'operation-catalog.js');
  const { toolDefinitions } = await module('mcp', 'tools.js');
  const files = {
    'docs/public/operations.json': JSON.stringify(operationCatalog, null, 2) + '\n',
    'docs/public/mcp-tools.json': JSON.stringify(toolDefinitions, null, 2) + '\n',
    'docs/operations.md': `# Operation and MCP tool reference\n\nGenerated from published SDK ${versions.packages['@groovepost/app-sdk']} and MCP ${versions.packages['@groovepost/mcp']}. Do not edit by hand.\nRun \`npm run reference:generate\` with registry read access to refresh.\n\n[Operation schemas](/operations.json) and [stdio MCP tool schemas](/mcp-tools.json)\ninclude complete JSON input schemas. Hosted MCP adds request-specific scope; use its\n\`tools/list\` for authoritative hosted inputs. Responses are described by the installed SDK\ndeclarations and selected host OpenAPI; binary generic results use \`{mimeType,dataBase64}\`.\n\nUse SDK \`operations.invoke(name, input)\`, CLI \`api NAME INPUT.json\` or the listed MCP tool.\nTenant-scoped operations require a selected tenant/environment; mutation authorization remains server-enforced.\n\n## Registered REST operations\n\n| Operation | Method and path | Permission | Tenant scope | MCP tool |\n| --- | --- | --- | --- | --- |\n${operationCatalog.map(op => `| \`${op.name}\` | \`${op.method} ${op.path}\` | ${op.permission} | ${op.scopeTenant ? 'Required' : 'Not inferred'} | \`${op.mcp}\` |`).join('\n')}\n\n## Additional stdio MCP tools\n\nThe schema download includes generated API tools and these convenience tools.\nCustomer versus administrator access is enforced by the underlying REST operation.\n\n| Tool | Description |\n| --- | --- |\n${toolDefinitions.filter(tool => !operationCatalog.some(op => op.mcp === tool.name)).map(tool => `| \`${tool.name}\` | ${tool.description.replaceAll('|', '\\|').replaceAll('\n', ' ')} |`).join('\n')}\n`,
  };
  for (const [file, content] of Object.entries(files)) {
    if (process.argv.includes('--check')) assert.equal(await readFile(file, 'utf8'), content, `${file} is stale; run npm run reference:generate`);
    else { await mkdir(join(file, '..'), { recursive: true }); await writeFile(file, content); }
  }
  // Validate actual installed entry points, CLI catalog and MCP protocol, without hosted access.
  const { createGroovePostClient, GroovePostError } = await module('app-sdk', 'index.js');
  let requests = 0;
  const api = createGroovePostClient({ apiUrl: 'https://fixture.invalid/api/v1', tenantSlug: 'example-site', environment: 'development', administratorToken: 'fixture-only', fetch: async () => { requests++; return new Response(JSON.stringify({ error: { code: 'conflict', message: 'Fixture revision conflict' } }), { status: 409 }); } });
  await assert.rejects(api.data.collection('notes').patch('fixture-entity', { text: 'fixture change' }, { expectedVersion: 1, operationId: '00000000-0000-4000-8000-000000000001' }), error => error instanceof GroovePostError && error.status === 409);
  assert.equal(requests, 1);
  const env = { PATH: process.env.PATH, HOME: process.env.HOME, GROOVEPOST_API_URL: 'https://fixture.invalid/api/v1', GROOVEPOST_TENANT: 'example-site', GROOVEPOST_ENVIRONMENT: 'development', GROOVEPOST_ADMIN_TOKEN: 'fixture-only' };
  const cli = (...args) => execFileSync(process.execPath, [join(root, 'node_modules/@groovepost/cli/dist/index.js'), ...args], { env, cwd: root, encoding: 'utf8' });
  assert.match(cli('--help'), /groovepost/);
  assert.match(cli('doctor'), /Authentication and hosted services were not checked/);
  assert.deepEqual(JSON.parse(cli('api', 'list')), operationCatalog);
  const sdkRoot = join(root, 'node_modules/@modelcontextprotocol/sdk/dist/esm/client');
  const { Client } = await import(pathToFileURL(join(sdkRoot, 'index.js')));
  const { StdioClientTransport } = await import(pathToFileURL(join(sdkRoot, 'stdio.js')));
  const transport = new StdioClientTransport({ command: process.execPath, args: [join(root, 'node_modules/@groovepost/mcp/dist/index.js')], env, stderr: 'pipe' });
  const client = new Client({ name: 'docs-reference-check', version: '1.0.0' });
  try {
    await client.connect(transport);
    const listed = await client.listTools();
    assert.deepEqual(listed.tools, toolDefinitions);
    const invalid = await client.callTool({ name: 'not_a_registered_tool', arguments: {} });
    assert.equal(invalid.isError, true);
  } finally { await client.close(); }
  console.log(`Verified ${operationCatalog.length} operations, ${toolDefinitions.length} MCP tools, CLI discovery and fixture error handling.`);
} finally { if (existing < 0) await rm(root, { recursive: true, force: true }); }
