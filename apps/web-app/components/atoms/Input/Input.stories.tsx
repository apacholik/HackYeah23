import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { decorators, parameters } from "ui/stories/common";

import { Input } from "./Input";

export default {
  title: "Atoms Components/Input",
  component: Input,
  decorators: [...decorators],
  parameters: { ...parameters },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (props) => <Input {...props} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Wpisz coś",
};
