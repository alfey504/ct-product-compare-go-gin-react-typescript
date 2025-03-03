const { build } = require("esbuild")
const  postCssPlugin   = require("esbuild-postcss")

build({
    entryPoints: ["frontend/global.css", "frontend/entry.tsx"],
    outdir: "public/assets",
    bundle: true,
    plugins: [postCssPlugin()],
    loader: {".css": "css" },
}).then(() => console.log("⚡ Build complete! ⚡")).catch(() => process.exit(1));