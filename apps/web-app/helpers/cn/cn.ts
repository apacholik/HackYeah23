import { twMerge } from "tailwind-merge";

/** Documentation for cn helper */
export function cn(...args: unknown[]): string {
  const ony = args.filter((item) => Boolean(item));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return twMerge(ony);
}
