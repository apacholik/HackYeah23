import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { decorators, parameters } from "ui/stories/common";

import { Card } from "./Card";

export default {
  title: "Atoms Components/Card",
  decorators: [...decorators],
  parameters: { ...parameters },
} as ComponentMeta<never>;

const Template: ComponentStory<never> = () => (
  <Card.Root>
    <Card.CardHeader>
      <Card.CardTitle>Weather Forecast</Card.CardTitle>
      <Card.CardDescription>Card Description</Card.CardDescription>
    </Card.CardHeader>
    <Card.CardContent>
      <p>Card Content</p>
    </Card.CardContent>
    <Card.CardFooter>
      <p>Card Footer</p>
    </Card.CardFooter>
  </Card.Root>
);

export const Default = Template.bind({});
