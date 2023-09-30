import { act, renderHook } from "@testing-library/react-hooks";
import { beforeEach, expect, it } from "vitest";

import { useBears, useBearsActions } from "./locationStore";

// NOTE: It's NECESSARY to reset all stores after each test run
beforeEach(() => {
  const { result: bearActions } = renderHook(() => useBearsActions());
  act(() => bearActions.current.reset());
});

it("Store LocationStore should have working actions", () => {
  const { result: bears } = renderHook(() => useBears());
  const { result: bearActions } = renderHook(() => useBearsActions());

  const initialCount = 0;
  const increasedCount = 10;

  expect(bears.current).toBe(initialCount);

  act(() => bearActions.current.increaseBearsCount(increasedCount));
  expect(bears.current).toBe(increasedCount);

  act(() => bearActions.current.reset());
  expect(bears.current).toBe(initialCount);
});

