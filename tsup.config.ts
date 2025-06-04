import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["cjs"],
    dts: true,
    outDir: "dist/cjs",
    clean: true,
  },
  {
    entry: ["src/index.ts"],
    format: ["esm"],
    dts: false,
    outDir: "dist/esm",
  },
]);