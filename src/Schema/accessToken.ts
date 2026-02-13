import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getAccessToken() {
  const authTOKEN = (await cookies()).get("next-auth.session-token")?.value;
  const token = await decode({
    token: authTOKEN,
    secret: process.env.AUTH_SECRET!,
  });
  return token?.token;
}
