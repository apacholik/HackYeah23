import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";

import * as stories from "./SampleButton.stories";

const { Primary, Secondary } = composeStories(stories);

it("Checks if it is rendered", () => {
  render(<Primary />);
  const buttonElement = screen.getByRole("button");
  expect(buttonElement).not.toBeNull();
});

it("Checks if it handles click event", () => {
  const onClickSpy = jest.fn();
  render(<Secondary onClick={onClickSpy} />);
  const buttonElement = screen.getByRole("button");
  buttonElement.click();
  expect(onClickSpy).toHaveBeenCalled();
});
