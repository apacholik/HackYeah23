import { rest } from "msw";

export const handlers = [
  rest.get("https://api.github.com/users/:login", (req, res, ctx) => {
    return res(
      ctx.json({
        name: "Some Developer",
        login: req.params.login,
      })
    );
  }),
];
