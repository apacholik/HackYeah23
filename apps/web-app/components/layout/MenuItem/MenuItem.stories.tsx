import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { decorators, parameters } from "ui/stories/common";

import { MenuItem } from "./MenuItem";

export default {
  title: "Layout Components/MenuItem",
  component: MenuItem,
  decorators: [...decorators],
  parameters: { ...parameters },
} as ComponentMeta<typeof MenuItem>;

const Template: ComponentStory<typeof MenuItem> = (props) => (
  <MenuItem {...props} />
);

export const Default = Template.bind({});
Default.args = {
  href: "/nowhere",
  label: "Nowhere"
};
