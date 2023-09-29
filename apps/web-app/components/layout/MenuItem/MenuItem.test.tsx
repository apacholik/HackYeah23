import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";

import * as stories from "./MenuItem.stories";

const { Default } = composeStories(stories);

describe("MenuItem", () => {
  it("should render", () => {
    render(<Default />);

    const helloWorldText = screen.getByText(/Nowhere/i);

    expect(!!helloWorldText).not.toBeNull();
  });
});
