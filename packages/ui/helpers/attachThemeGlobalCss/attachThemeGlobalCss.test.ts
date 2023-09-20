import { attachThemeGlobalCss } from "./attachThemeGlobalCss";

it("Should return global CSS string", () => {
  expect(attachThemeGlobalCss()).toEqual("");
});
