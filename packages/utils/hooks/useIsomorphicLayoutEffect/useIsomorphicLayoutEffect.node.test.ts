/** @jest-environment node */
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

it("Checks if it returns noop during ssr", () => {
  expect(useIsomorphicLayoutEffect(() => {})).toBeUndefined();
});

it("Checks if it runs no effect during ssr", () => {
  const mockFn = jest.fn();

  useIsomorphicLayoutEffect(() => {
    mockFn();
  });

  expect(mockFn).not.toHaveBeenCalled();
});
