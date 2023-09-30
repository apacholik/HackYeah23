import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { decorators, parameters } from "ui/stories/common";

import { Select } from "./Select";

export default {
  title: "Atoms Components/Select",
  decorators: [...decorators],
  parameters: { ...parameters },
} as ComponentMeta<never>;

const Template: ComponentStory<never> = () => (
  <Select.Root>
    <Select.SelectTrigger>
      <Select.SelectValue placeholder="Typ" />
    </Select.SelectTrigger>

    <Select.SelectContent>
      <Select.SelectItem value="test1">Test 1</Select.SelectItem>
    </Select.SelectContent>
  </Select.Root>
);

export const Default = Template.bind({});
