import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";

import * as stories from "./SamplePage.stories";

const { Default } = composeStories(stories);

describe("SamplePage", () => {
  it("should render", () => {
    render(<Default />);

    const helloWorldText = screen.getByText(/SamplePage works!/i);

    expect(!!helloWorldText).not.toBeNull();
  });
});
