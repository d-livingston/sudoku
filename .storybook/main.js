const path = require("path");

module.exports = {
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
    core: {
        builder: "webpack5",
    },
    webpackFinal: async (config) => {
        const { module = {} } = config;

        const newConfig = {
            ...config,
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

        newConfig.resolve.fallback = {
            http: false,
        };

        return newConfig;
    },
};
