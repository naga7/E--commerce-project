import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const protectedPages = ["/cart", "/profile", "wishlist"];
const authPages = ["/Login", "/Register"];
export default async function middleWare(req: NextRequest) {
  const token = await getToken({ req });
  if (protectedPages.includes(req.nextUrl.pathname)) {
    if (token) {
      //cart
      return NextResponse.next();
    } else {
      //login
      const redirectUrl = new URL("/Login", process.env.AUTH_URL);
      redirectUrl.searchParams.set("callback-url", req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (authPages.includes(req.nextUrl.pathname)) {
    if (!token) {
      //cart
      return NextResponse.next();
    } else {
      //lofin
      const redirectUrl = new URL("/", process.env.AUTH_URL);
      return NextResponse.redirect(redirectUrl);
    }
  }
  return NextResponse.next();
}
