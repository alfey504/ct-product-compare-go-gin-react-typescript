const { context } = require("esbuild")
const  postCssPlugin   = require("esbuild-postcss")

context ({
    entryPoints: ["frontend/global.css", "frontend/entry.tsx"],
    outdir: "public/assets",
    bundle: true,
    plugins: [postCssPlugin()],
    loader: {".css": "css" },
}).then((context) => context.watch()).catch(() => process.exit(1));