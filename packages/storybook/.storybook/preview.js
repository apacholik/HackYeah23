require("minireset.css");

const { RouterContext } = require("next/dist/shared/lib/router-context");

// NOTE: MSW initialization
// Storybook executes this module in both bootstrap phase (Node) and story (browser)
// However, we only can call `setupWorker` in browser environment
if (typeof global.process === "undefined") {
  const { worker } = require("../mocks/browser");
  worker.start();
}

const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  options: {
    storySort: {
      order: ["Design System", ["Introduction"], "Example"],
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

module.exports = {
  parameters,
};
