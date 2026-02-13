"use server";
import { getAccessToken } from "@/Schema/accessToken";
import { count, log } from "console";
import { decode } from "next-auth/jwt";

import { json } from "zod";

export async function updatecartItem({
  productId,
  count,
}: {
  productId: String;
  count: number;
}) {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("unauthorized.....");
  }
  const response = await fetch(`${process.env.API}/cart/${productId}`, {
    method: "PUT",
    headers: {
      token: token,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      count: count,
    }),
  });
  const payload = await response.json();
  console.log(payload);
  return payload;
}
