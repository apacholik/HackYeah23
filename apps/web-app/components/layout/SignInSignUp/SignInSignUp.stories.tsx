import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { decorators, parameters } from "ui/stories/common";

import { SignInSignUp } from "./SignInSignUp";

export default {
  title: "Layout Components/SignInSignUp",
  component: SignInSignUp,
  decorators: [...decorators],
  parameters: { ...parameters },
} as ComponentMeta<typeof SignInSignUp>;

const Template: ComponentStory<typeof SignInSignUp> = () => <SignInSignUp />;

export const Default = Template.bind({});
Default.args = {
  children: "",
};
