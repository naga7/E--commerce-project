"use server";
import { getAccessToken } from "@/Schema/accessToken";
import { log } from "console";
import { decode } from "next-auth/jwt";

import { json } from "zod";

export async function addwish(productId: String) {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("unauthorized.....");
  }
  const response = await fetch(`${process.env.API}/wishlist`, {
    cache: "no-store",
    method: "POST",
    headers: {
      token: token,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      productId,
    }),
  });
  const payload = await response.json();
  console.log(payload);
  return payload;
}
