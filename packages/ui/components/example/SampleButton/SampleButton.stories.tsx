import { linkTo } from "@storybook/addon-links";
import { expect } from "@storybook/jest";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/testing-library";
import { decorators, parameters } from "ui/stories/common";

import { SampleButton } from "./SampleButton";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/SampleButton",
  component: SampleButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  decorators: [...decorators],
  parameters: { ...parameters },
} as ComponentMeta<typeof SampleButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SampleButton> = (args) => (
  <SampleButton {...args} />
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  children: "Click me to see story link example!",
  onClick: linkTo("Example/SampleButton", "Secondary"),
};

export const Secondary = Template.bind({});
Secondary.args = {
  primary: false,
  children: "I have an interaction sample!",
};
// Added interaction: https://storybook.js.org/docs/react/essentials/interactions
Secondary.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(canvas.getByRole("button"));
  await waitFor(() => expect(args.onClick).toHaveBeenCalled());
};
