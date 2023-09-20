import { useCallback, useState } from "react";

/** Documentation for useExample hook */
export function useExample(): { count: number; inc: () => void } {
  console.log(`Hello from useExample hook!`);

  const [count, setCount] = useState(0);
  const inc = useCallback(() => setCount((x) => x + 1), []);

  return { count, inc };
}
