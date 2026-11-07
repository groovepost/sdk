import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import assert from 'node:assert/strict';
const directory = 'docs/.vitepress/dist';
const required = ['index', 'site-design', 'cli', 'mcp', 'agents', 'operations', 'configuration', 'logging'];
const revision = process.env.DOCS_REVISION;
const origin = process.argv[2];
async function read(route) {
  if (!origin) return readFile(join(directory, route), 'utf8');
  const url = new URL(route, origin.endsWith('/') ? origin : origin + '/');
  const response = await fetch(url, { cache: 'no-store' });
  assert.equal(response.status, 200, `${url} must be published`);
  return response.text();
}
for (const page of required) {
  const content = await read(`${page}.html`);
  assert.match(content, /Design a site/, `${page} has stale navigation`);
}
const build = JSON.parse(await read('build.json'));
if (revision) assert.equal(build.revision, revision, 'Published docs are from a different commit');
if (origin) { console.log(`Verified published documentation at ${origin} (${build.revision})`); process.exit(0); }
// Validate local navigation, Markdown anchors and public downloads using the rendered site.
const files = await readdir(directory);
for (const file of files.filter(file => file.endsWith('.html') && file !== '404.html')) {
  const html = await read(file);
  for (const [, href] of html.matchAll(/href="([^"\s]+)"/g)) {
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/.test(href)) continue;
    const url = new URL(href.replaceAll('&amp;', '&'), `https://docs.invalid/sdk/${file}`);
    if (!url.pathname.startsWith('/sdk/')) continue;
    let target = decodeURIComponent(url.pathname.slice('/sdk/'.length)) || 'index.html';
    if (!target.includes('.')) target += target.endsWith('/') ? 'index.html' : '.html';
    const content = await read(target);
    if (url.hash && target.endsWith('.html')) {
      const anchor = decodeURIComponent(url.hash.slice(1));
      assert.ok(content.includes(`id="${anchor}"`), `${file}: missing anchor ${href}`);
    }
  }
}
console.log('Verified built navigation, links, anchors and required routes.');
