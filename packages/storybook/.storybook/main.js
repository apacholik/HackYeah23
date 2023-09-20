module.exports = {
  core: {
    builder: "webpack5",
  },
  framework: "@storybook/react",
  // NOTE: Add every package containing stories to show
  stories: [
    "../../ui/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../apps/web-app/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
    "multiple-themes-stitches",
    "storybook-addon-next-router",
  ],
  babel: async (options) => ({
    ...options,
    plugins: [...(options.plugins || []), "transform-stitches-display-name"],
  }),
};
