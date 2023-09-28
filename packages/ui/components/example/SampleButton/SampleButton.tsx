import type { MouseEventHandler, ReactNode } from "react";
import type { VariantProps } from "tailwind-variants";

import * as styles from "./SampleButton.styled";

type Props = {
  primary?: boolean;
  children?: ReactNode;
  onClick?: MouseEventHandler;
} & VariantProps<typeof styles.sampleButton>;

export const SampleButton = ({ primary = true, children = "Click me!", size, onClick, ...restProps }: Props) => {
  return (
    <button
      className={styles.sampleButton({ size })}
      role="button"
      onClick={onClick}
      style={{ fontSize: (primary ? 1 : 0.75) + "em" }}
      {...restProps}
    >
      {children}
    </button>
  );
};
