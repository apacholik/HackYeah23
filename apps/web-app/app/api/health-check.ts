import { type NextRequest, NextResponse } from "next/server";

import type { HealthCheck } from "../../types/healthCheck";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");

  const response: HealthCheck = {
    message: `Hello ${name || "world"}!`,
  };

  // NOTE: Place to get data from database
  return NextResponse.json(response, {
    status: 200,
  });
}
