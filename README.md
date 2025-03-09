## Dev Setup

After installing Vite, I installed Storybook with:

```
$ npx storybook@latest init
```

Making this into a package (vs. an app) is done with the instructions explained
[here](https://dev.to/receter/how-to-create-a-react-component-library-using-vites-library-mode-4lma).
Specifically, adding the `pkg` directory as the source for the package itself, _e.g.,_

```
$ mkdir pkg
$ touch pkg/index.ts
$ npm add @types/node --save-dev
$ npm i vite-plugin-dts --save-dev
```

In addition, `vite.config.ts` was update to contain:

```typescript
import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ["lib"] })],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "lib/main.ts"),
      formats: ["es"],
    },
  },
});
```

...and `tsconfig.app.json` needs to be changed such that `"include"` is set
equal to `["src", "pkg"]` and `package.json` is updated so that the `"build"`
script is: `"tsc --p ./tsconfig-build.json && vite build"`

Finally, we need to add a `tsconfig-build.json` file that contains:

```json
{
  "extends": "./tsconfig.json",
  "include": ["lib"]
}
```
