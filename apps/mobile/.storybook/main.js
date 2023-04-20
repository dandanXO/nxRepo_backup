const rootMain = require("../../../.storybook/main");

module.exports = {
    ...rootMain,
    core: { ...rootMain.core, builder: "webpack5" },
    addons: ["@storybook/addon-essentials", ...rootMain.addons],
    stories: [
        ...rootMain.stories,
        "../src/app/**/*.stories.mdx",
        "../src/app/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    webpackFinal: async (config, { configType }) => {
        // apply any global webpack configs that might have been specified in .storybook/main.js
        if (rootMain.webpackFinal) {
            config = await rootMain.webpackFinal(config, { configType });
        }
        // add your own webpack tweaks if needed
        return config;
    },
};
