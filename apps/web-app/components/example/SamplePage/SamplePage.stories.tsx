import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { SamplePage } from "./SamplePage";

export default {
  title: "Example/SamplePage",
  component: SamplePage,
} as ComponentMeta<typeof SamplePage>;

const Template: ComponentStory<typeof SamplePage> = (props) => (
  <SamplePage {...props} />
);

export const Default = Template.bind({});
Default.args = {
  children: "",
};
