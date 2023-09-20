import { act, renderHook } from "@testing-library/react-hooks";

import { useExample } from "./useExample";

it("Hook useExample should have basic working counter", () => {
  const { result } = renderHook(() => useExample());

  act(() => {
    result.current.inc();
  });

  expect(result.current.count).toBe(1);
});
