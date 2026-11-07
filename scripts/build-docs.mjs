import { execFileSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
execFileSync(process.execPath, ['node_modules/vitepress/bin/vitepress.js', 'build', 'docs'], { stdio: 'inherit' });
const revision = process.env.GITHUB_SHA || execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
await writeFile('docs/.vitepress/dist/build.json', JSON.stringify({ revision }) + '\n');
