import esbuild from 'esbuild'
import postCssPlugin from "esbuild-postcss"
import { globSync } from "glob"


// Create a build context

const reactEntryPoints = globSync("frontend/**/entry.tsx")
const cssEntryPoints = globSync("frontend/**/*.css")

const clientEnv = { "process.env.NODE_ENV": `"production"` };

const context = await esbuild.context({
    entryPoints: [...reactEntryPoints, ...cssEntryPoints],
    outdir: "public/assets",
    bundle: true,
    plugins: [postCssPlugin()],
    loader: {".css": "css" },
    outbase: "frontend/",
    define: clientEnv,
    minify: true,
    sourcemap: false,
});



// Start watching for changes and rebuilding

await context.watch(); 