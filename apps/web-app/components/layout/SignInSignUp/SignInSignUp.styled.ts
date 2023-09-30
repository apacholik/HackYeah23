import { tv } from "tailwind-variants";

export const signInSignUp = tv({
  base: "flex",
  variants: {
    fancy: {
      true: "bg-pink-400",
      false: "bg-green-400",
    }
  },
  defaultVariants: {
    fancy: true,
  },
});
