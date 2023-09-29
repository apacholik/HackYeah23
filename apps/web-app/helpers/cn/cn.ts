/** Documentation for cn helper */
export function cn(...args: unknown[]): string {
  const ony = args.filter((item) => Boolean(item));

  return ony.join(" ");
}
