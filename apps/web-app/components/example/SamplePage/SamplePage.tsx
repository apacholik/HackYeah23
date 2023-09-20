import { ReactNode } from "react";

import * as S from "./SamplePage.styled";

type Props = {
  children?: ReactNode;
};

/** Documentation for SamplePage component */
export function SamplePage({ children }: Props) {
  return (
    <S.SamplePage>
      <span>SamplePage works!</span>
      {children}
    </S.SamplePage>
  );
}
