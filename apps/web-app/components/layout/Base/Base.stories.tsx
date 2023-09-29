import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { decorators, parameters } from "ui/stories/common";

import { Base } from "./Base";

export default {
  title: "Layout Components/Base",
  component: Base,
  decorators: [...decorators],
  parameters: { ...parameters },
} as ComponentMeta<typeof Base>;

const Template: ComponentStory<typeof Base> = (props) => (
  <Base {...props} />
);

export const Default = Template.bind({});
Default.args = {
  children: "Welcome",
};
