import { Native } from "@stitches/react/types/css-util";
import { fontFace } from "polished";
import { globalCss } from "ui/themes/default";

/** Utility to allow easier @font-face declaration adding */
function createFontFaceList(
  fontFamilyName: string,
  baseFontPath: string,
  fontVariantsTuplesList: [
    fontWeight: string,
    fontFileNameWithoutExtension: string
  ][]
): Native.AtRule.FontFace[] {
  const familyCommonConfig = {
    fontFamily: fontFamilyName,
    localFonts: [fontFamilyName],
    fileFormats: ["woff2", "eot", "woff", "ttf", "svg"],
  };

  return fontVariantsTuplesList.map(
    ([fontWeight, fontFileNameWithoutExtension]) => {
      const generatedPolishedFontFaceObject = fontFace({
        ...familyCommonConfig,
        fontWeight,
        fontFilePath: baseFontPath + fontFileNameWithoutExtension,
      });

      return generatedPolishedFontFaceObject[
        "@font-face"
      ] as Native.AtRule.FontFace;
    }
  );
}

/**
 * Allows to attach global CSS with default theme tokens from UI package applied.
 * Remember to copy static assets (such as fonts) to every app and package (such as Storybook) using these styles from UI package!
 */
export function attachThemeGlobalCss(additionalStyles = {}) {
  return globalCss({
    // Applying @font-face
    "@font-face": [
      ...createFontFaceList("Urbanist", "/assets/fonts/urbanist/", [
        ["400", "urbanist-400"],
        ["600", "urbanist-600"],
        ["800", "urbanist-800"],
      ]),
    ],
    // Adding default typography settings
    body: {
      fontFamily: "$urbanist",
      fontWeight: "$regular",
      lineHeight: "$regular",
    },
    // Allow percentage-based heights in the application
    ["html, body"]: {
      height: "100%",
    },
    // Remove built-in form typography styles
    ["input, button, textarea, select"]: {
      font: "inherit",
    },
    // Remove built-in textarea styles
    textarea: {
      resize: "none",
    },
    // Improve media defaults
    ["img, picture, video, canvas, svg"]: {
      display: "block",
    },
    // Root stacking context
    "#root, #__next": {
      isolation: "isolate",
    },
    // Remove animations with reduced motion
    ["@prefersReducedMotion"]: {
      "*": {
        animationDuration: "0.01ms !important",
        animationIterationCount: "1 !important",
        transitionDuration: "0.01ms !important",
        scrollBehavior: "auto !important",
      },
    },
    ...additionalStyles,
  })();
}
