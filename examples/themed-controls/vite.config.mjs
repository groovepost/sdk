import { defineConfig } from "vite";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
const require = createRequire(import.meta.url);
export default defineConfig({
  plugins: [
    {
      name: "preserve-font-notices",
      generateBundle() {
        for (const name of [
          "LICENSE_FONT",
          "LICENSE_INTER",
          "LICENSE_IBM_PLEX_MONO",
        ]) {
          const path = require.resolve(
            `@danielmarkland/design-tokens/fonts/${name}`,
          );
          this.emitFile({
            type: "asset",
            fileName: `licenses/${name}.txt`,
            source: readFileSync(path),
          });
        }
      },
    },
  ],
});
