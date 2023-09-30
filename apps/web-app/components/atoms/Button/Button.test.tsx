import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";

import * as stories from "./Button.stories";

const { Default } = composeStories(stories);

describe("Button", () => {
  it("should render", () => {
    render(<Default />);

    const helloWorldText = screen.getByText(/Welcome!/i);

    expect(!!helloWorldText).not.toBeNull();
  });
});
