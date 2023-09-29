import { Axios } from "axios";

import { apiClient } from "./apiClient";

it("Should return its name", () => {
  expect(apiClient).toBeInstanceOf(Axios);
});
