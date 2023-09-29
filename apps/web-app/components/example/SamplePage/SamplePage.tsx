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

      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In venenatis non turpis ut dignissim. Sed facilisis mauris in blandit convallis. Nunc suscipit libero sed justo ornare, eget laoreet eros iaculis. Sed dignissim maximus nibh, at varius mauris ultrices vitae. Sed non velit libero. Duis non hendrerit mi. Donec rutrum tortor quis tellus suscipit, eu ultrices eros mollis. Vestibulum hendrerit justo faucibus sapien eleifend aliquet. Nullam id libero in urna efficitur dapibus. Quisque condimentum dolor mauris, quis aliquam ante vehicula ut.</p>

      <p>Vivamus in sem sapien. Ut scelerisque metus eu ante rhoncus, a accumsan metus feugiat. Aliquam vitae felis turpis. Integer turpis urna, faucibus non dictum quis, fringilla vitae elit. Ut ac pharetra magna, quis scelerisque tortor. Ut libero turpis, faucibus eget nisi vel, ullamcorper vulputate quam. Praesent elementum sagittis nulla mattis pharetra. Nullam sollicitudin tempus fringilla. Sed dignissim odio sed laoreet scelerisque.</p>

      <p>Vivamus finibus nunc quam, et laoreet metus vehicula vitae. Integer ac vestibulum sem, nec suscipit urna. Nam elementum sem erat, in mollis lorem egestas sit amet. Cras at sem et tortor venenatis feugiat. Vestibulum ut nulla nisl. Integer mattis venenatis elit, in accumsan magna fringilla eu. Nullam posuere sed felis quis efficitur. Vestibulum porttitor leo eget nulla laoreet bibendum. Vestibulum in lectus purus. Nullam eget placerat erat. Duis auctor elit tellus, a porta lacus tempus vel. Suspendisse sollicitudin et augue quis placerat. Nam mauris metus, porttitor vel pulvinar et, bibendum id urna. Curabitur fringilla ultrices cursus. Suspendisse augue erat, bibendum at nulla et, suscipit pharetra diam.</p>

      {children}
    </div>
  );
}
