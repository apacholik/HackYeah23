import { DocsContainer } from "@storybook/addon-docs";
import type { PartialStoryFn } from "@storybook/csf";
import type { Args, ReactFramework } from "@storybook/react";
import type { PropsWithChildren } from "react";
import attachThemeGlobalCss from "ui/helpers/attachThemeGlobalCss";
import { darkTheme } from "ui/themes/dark";

export const docsContainerWrapper = () => {
  attachThemeGlobalCss();
};

export const decorators = [
  (Story: PartialStoryFn<ReactFramework, Args>) => {
    attachThemeGlobalCss();
    return <Story />;
  },
];

export const parameters = {
  docs: {
    container: (props: PropsWithChildren<any>) => {
      attachThemeGlobalCss();
      return <DocsContainer {...props} />;
    },
    source: {
      excludeDecorators: true,
    },
  },
  multipleThemesStitches: {
    values: [
      {
        name: "Dark",
        theme: darkTheme,
      },
    ],
  },
};
