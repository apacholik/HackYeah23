import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { decorators, parameters } from "ui/stories/common";

import { Dialog } from "./Dialog";

export default {
  title: "Atoms Components/Dialog",
  decorators: [...decorators],
  parameters: { ...parameters },
} as ComponentMeta<never>;

const Template: ComponentStory<never> = () => (
  <Dialog.Root>
    <Dialog.DialogTrigger>Open</Dialog.DialogTrigger>
    <Dialog.DialogContent>
      <Dialog.DialogHeader>
        <Dialog.DialogTitle>Are you sure absolutely sure?</Dialog.DialogTitle>
        <Dialog.DialogDescription>
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </Dialog.DialogDescription>
      </Dialog.DialogHeader>
    </Dialog.DialogContent>
  </Dialog.Root>
);

export const Default = Template.bind({});
