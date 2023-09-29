import { ReactNode } from "react";
import type { VariantProps } from "tailwind-variants";

import * as styles from "./SamplePage.styled";

type Props = {
  children?: ReactNode;
} & VariantProps<typeof styles.samplePage>;

/** Documentation for SamplePage component */
export function SamplePage({ children, ...restProps }: Props) {
  return (
    <div className={styles.samplePage(restProps)}>
      <span>SamplePage works!</span>
      {children}
    </div>
  );
}
