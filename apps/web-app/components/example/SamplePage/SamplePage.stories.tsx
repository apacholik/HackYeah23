import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { decorators, parameters } from "ui/stories/common";

import { SamplePage } from "./SamplePage";

export default {
  title: "Example Components/SamplePage",
  component: SamplePage,
  decorators: [...decorators],
  parameters: { ...parameters },
} as ComponentMeta<typeof SamplePage>;

const Template: ComponentStory<typeof SamplePage> = (props) => (
  <SamplePage {...props} />
);

export const Default = Template.bind({});
Default.args = {
  children: "",
};
