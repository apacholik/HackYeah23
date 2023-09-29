import { tv } from "tailwind-variants";

export const samplePage = tv({
  base: "flex",
  variants: {
    fancy: {
      true: "py-2 px-4",
      false: "my-3 my-5",
    }
  },
  defaultVariants: {
    fancy: true,
  },
});
