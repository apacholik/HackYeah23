import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";

import * as stories from "./Base.stories";

const { Default } = composeStories(stories);

describe("Base", () => {
  it("should render", () => {
    render(<Default />);

    const helloWorldText = screen.getByText(/Welcome/i);

    expect(!!helloWorldText).not.toBeNull();
  });
});
