const { context } = require("esbuild")
const  postCssPlugin   = require("esbuild-postcss")

const clientEnv = { "process.env.NODE_ENV": `"production"` };

context ({
    entryPoints: ["frontend/global.css", "frontend/entry.tsx"],
    outdir: "public/assets",
    bundle: true,
    plugins: [postCssPlugin()],
    loader: {".css": "css" },
    define: clientEnv, 
    minify: true,
    sourcemap: false
}).then((context) => context.watch()).catch(() => process.exit(1));