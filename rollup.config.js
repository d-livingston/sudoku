import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: pkg.main,
                format: "cjs",
                exports: "named",
                sourcemap: true,
                strict: false,
            },
        ],
        plugins: [
            postcss({
                plugins: [autoprefixer()],
                extract: true,
                sourceMap: true,
                minimize: true,
                use: ["sass"],
            }),
            typescript(),
            commonjs(),
            nodeResolve(),
            terser(),
        ],
        external: Object.keys(pkg.peerDependencies || {}),
    },
];
