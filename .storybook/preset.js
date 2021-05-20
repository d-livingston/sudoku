const path = require("path");

module.exports = {
    webpackFinal: async (baseConfig, options) => {
        const { module = {} } = baseConfig;

        const newConfig = {
            ...baseConfig,
            module: {
                ...module,
                rules: [...(module.rules || [])],
            },
        };

        newConfig.module.rules.push({
            test: /\.scss$/,
            include: [path.resolve(__dirname, "../src")],
            use: ["style-loader", "css-loader", "sass-loader"],
        });

        return newConfig;
    },
};
