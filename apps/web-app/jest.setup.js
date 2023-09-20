require("@testing-library/jest-dom");
const { setGlobalConfig } = require("@storybook/testing-react");

const globalStorybookConfig = require("storybook/.storybook/preview");

setGlobalConfig(globalStorybookConfig);
