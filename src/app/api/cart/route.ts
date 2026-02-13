import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.json({ msg: "unAuthorized", status: 401 });
  }
  const response = await fetch(`${process.env.API}/cart`, {
    headers: {
      token: token.token,

      "Content-type": "application/json",
    },
  });
  const paylooad = await response.json();
  return NextResponse.json(paylooad);
}
