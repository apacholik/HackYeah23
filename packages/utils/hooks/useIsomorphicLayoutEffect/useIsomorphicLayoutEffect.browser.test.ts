import { renderHook } from "@testing-library/react-hooks";

import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect";

it("Checks if runs effect in browser", () => {
  const mockFn = jest.fn();

  renderHook(() => {
    useIsomorphicLayoutEffect(() => {
      mockFn();
    });
  });

  expect(mockFn).toHaveBeenCalledTimes(1);
});
