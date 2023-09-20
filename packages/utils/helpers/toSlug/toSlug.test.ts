import { toSlug } from "./toSlug";

it("Checks if it transforms string to slug", () => {
  expect(toSlug("hello world")).toEqual("hello-world");
});
