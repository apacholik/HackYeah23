import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { decorators, parameters } from "ui/stories/common";

import { Button } from "./Button";

export default {
  title: "Atoms Components/Button",
  component: Button,
  decorators: [...decorators],
  parameters: { ...parameters },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (props) => <Button {...props} />;

export const Default = Template.bind({});
Default.args = {
  children: "Welcome!",
};

export const Inverse = Template.bind({});
Default.args = {
  children: "Welcome!",
  inverse: true,
};
