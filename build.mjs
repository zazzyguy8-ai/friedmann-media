import * as esbuild from "esbuild";
import { cpSync, mkdirSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "dist");
const watch = process.argv.includes("--watch");

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });

const buildOptions = {
  entryPoints: [
    { in: "src/background/index.ts", out: "background" },
    { in: "src/content/search-ai-blocker.ts", out: "content/search-ai-blocker" },
    { in: "src/popup/popup.ts", out: "popup/popup" },
    { in: "src/popup/popup.css", out: "popup/popup" },
    { in: "src/options/options.ts", out: "options/options" },
    { in: "src/options/options.css", out: "options/options" },
    { in: "src/blocked/blocked.ts", out: "blocked/blocked" },
    { in: "src/blocked/blocked.css", out: "blocked/blocked" },
  ],
  bundle: true,
  outdir: DIST,
  format: "esm",
  target: "chrome111",
  sourcemap: false,
  minify: true,
  logLevel: "info",
  alias: { "@": join(__dirname, "src") },
};

function copyStatic() {
  cpSync(join(__dirname, "public"), DIST, { recursive: true });
}

if (watch) {
  const ctx = await esbuild.context(buildOptions);
  copyStatic();
  await ctx.watch();
  console.log("watching for changes...");
} else {
  await esbuild.build(buildOptions);
  copyStatic();
  console.log("build complete ->", DIST);
}
