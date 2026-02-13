"use server";
import { getAccessToken } from "@/Schema/accessToken";
import { log } from "console";
import { decode } from "next-auth/jwt";

import { json } from "zod";

export async function deletecartItem(productId: String) {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("unauthorized.....");
  }
  const response = await fetch(`${process.env.API}/wishlist/${productId}`, {
    method: "DELETE",
    headers: {
      token: token,
      "content-type": "application/json",
    },
  });
  const payload = await response.json();
  console.log(payload);
  return payload;
}
