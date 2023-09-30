import { composeStories } from "@storybook/testing-react";
import { render, screen } from "@testing-library/react";

import * as stories from "./SignInSignUp.stories";

const { Default } = composeStories(stories);

describe("SignInSignUp", () => {
  it("should render", () => {
    render(<Default />);

    const helloWorldText = screen.getByText(/SignInSignUp works!/i);

    expect(!!helloWorldText).not.toBeNull();
  });
});
