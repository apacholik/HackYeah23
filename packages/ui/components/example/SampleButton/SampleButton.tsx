import type { MouseEventHandler, ReactNode } from "react";

import * as S from "./SampleButton.styled";

type Props = {
  primary?: boolean;
  children?: ReactNode;
  onClick?: MouseEventHandler;
};

export const SampleButton = ({
  primary = true,
  children = "Click me!",
  onClick,
  ...restProps
}: Props) => {
  return (
    <S.SampleButton
      role="button"
      onClick={onClick}
      style={{ fontSize: (primary ? 1 : 0.75) + "em" }}
      {...restProps}
    >
      {children}
    </S.SampleButton>
  );
};
