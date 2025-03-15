import esbuild from 'esbuild'
import postCssPlugin from "esbuild-postcss"


// Create a build context

const context = await esbuild.context({
    entryPoints: ["frontend/global.css", "frontend/entry.tsx"],
    outdir: "public/assets",
    bundle: true,
    plugins: [postCssPlugin()],
    loader: {".css": "css" },
});



// Start watching for changes and rebuilding

await context.watch(); 