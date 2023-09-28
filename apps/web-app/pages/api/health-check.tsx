import type { NextApiRequest, NextApiResponse } from "next";

import type { HealthCheck } from "../../types/healthCheck";

export default function healthCheckHandler(
  req: NextApiRequest,
  res: NextApiResponse<HealthCheck>
) {
  const { query, method } = req;
  const name = query.name as string;

  switch (method) {
    case "GET":
      // NOTE: Place to get data from database
      res.status(200).json({ message: `Hello ${name || "world"}!` });
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
