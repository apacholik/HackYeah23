const template = (variables, { tpl }) => {
  return tpl`
import { memo, SVGProps } from "react";

${variables.interfaces};

const wrapperStyles = {
  fill: "currentColor",
  transformOrigin: "center center",
};

const Svg = (props: SVGProps<SVGSVGElement>): JSX.Element => ${variables.jsx};

const ${variables.componentName} = memo((props: SVGProps<SVGSVGElement>) => (
  <Svg {...props} style={{ ...wrapperStyles, ...(props.style || {}) }} />
));

${variables.componentName}.displayName = "${variables.componentName}";

${variables.exports};
`;
};

module.exports = {
  template,
  svgProps: { width: "1em", height: "1em" },
};
