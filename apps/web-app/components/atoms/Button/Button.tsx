import { ReactNode } from "react";
import type { VariantProps } from "tailwind-variants";

import * as styles from "./Button.styled";

type Props = {
  children: ReactNode;
  type?: "button";
  onClick?: () => void;
} & VariantProps<typeof styles.button>;

/** Documentation for Button component */
export function Button({ children, type, ...restProps }: Props) {
  return (
    <button type={type} className={styles.button(restProps)}>
      {children}
    </button>
  );
}
