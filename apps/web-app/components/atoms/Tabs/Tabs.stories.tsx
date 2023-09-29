import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { decorators, parameters } from "ui/stories/common";

import { Tabs } from "./Tabs";

export default {
  title: "Atoms Components/Tabs",
  decorators: [...decorators],
  parameters: { ...parameters },
} as ComponentMeta<never>;

const Template: ComponentStory<never> = () => (
  <div>
    <Tabs.Root defaultValue="overview">
      <Tabs.TabsList>
        <Tabs.TabsTrigger value="overview">Overview</Tabs.TabsTrigger>
        <Tabs.TabsTrigger value="tasks">Tasks</Tabs.TabsTrigger>

      </Tabs.TabsList>

      <Tabs.TabsContent value="overview">
        Content 1
      </Tabs.TabsContent>

      <Tabs.TabsContent value="tasks">
        Content 2
      </Tabs.TabsContent>
    </Tabs.Root>
  </div>
);

export const Default = Template.bind({});
