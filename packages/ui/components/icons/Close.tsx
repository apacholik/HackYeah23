import { memo, SVGProps } from "react";
const wrapperStyles = {
  fill: "currentColor",
  transformOrigin: "center center",
};

const Svg = (props: SVGProps<SVGSVGElement>): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z" />
  </svg>
);

const SvgClose = memo((props: SVGProps<SVGSVGElement>) => (
  <Svg
    {...props}
    style={{ ...wrapperStyles, ...(props.style || {}) }}
    width="1em"
    height="1em"
  />
));
SvgClose.displayName = "SvgClose";
export default SvgClose;
