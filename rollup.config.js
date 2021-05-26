import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";

import pkg from "./package.json";

export default {
    input: "src/index.ts",
    output: {
        file: "dist/index.js",
        format: "es",
        exports: "named",
        sourcemap: true,
    },
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [
        resolve(),
        commonjs(),
        typescript(),
        postcss(),
        terser(),
        visualizer({ open: true, filename: "build-analysis.html" }),
    ],
};
