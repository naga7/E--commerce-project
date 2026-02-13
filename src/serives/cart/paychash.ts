"use server";
import { shipping } from "@/app/types/cart-response";
import { getAccessToken } from "@/Schema/accessToken";

export async function paychashorder(
  carttId: String,
  shippingAddress: shipping
) {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("unauthorized.....");
  }
  const response = await fetch(`${process.env.API}/orders/${carttId}`, {
    method: "POST",
    headers: {
      token: token,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      shippingAddress,
    }),
  });
  const payload = await response.json();
  console.log(payload);
  return payload;
}
