import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import type { VariantProps } from "tailwind-variants";

import * as styles from "./Button.styled";

type Props = {
  children: ReactNode;
  type?: "button";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
} & VariantProps<typeof styles.button>;

/** Documentation for Button component */
export function Button({ children, type, onClick, className = "", disabled, ...restProps }: Props) {
  return (
    <button disabled={disabled} type={type} onClick={onClick} className={twMerge(styles.button(restProps), className)}>
      {children}
    </button>
  );
}
