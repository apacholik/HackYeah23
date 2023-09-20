import { styled } from "ui/themes";

export const SampleButton = styled("button", {
  background: "$primary500",
  borderStyle: "$primary",
  color: "$primary100",
  fontSize: "$16",
  lineHeight: "$normal",
  padding: "$8 $24",
  transition: "$standard",
  "&:hover": {
    background: "$primary900",
    cursor: "pointer",
  },
});
