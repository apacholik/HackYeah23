import { tv } from "tailwind-variants";

export const button = tv({
  base: "rounded-md border px-3 py-1",

  variants: {
    color: {
      primary: "bg-blue-900 hover:bg-blue-800 text-white disabled:opacity-50 disabled:cursor-not-allowed",
    },

    inverse: {
      true: "",
      false: "",
    },
  },

  compoundVariants: [
    {
      color: "primary",
      inverse: true,
      className:
        "text-blue-900 bg-white border border-blue-900 hover:bg-blue-50 hover:border-blue-800 hover:text-blue-800",
    },
  ],

  defaultVariants: {
    color: "primary",
  },
});
