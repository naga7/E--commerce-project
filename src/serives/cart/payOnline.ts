"use server";
import { shipping } from "@/app/types/cart-response";
import { getAccessToken } from "@/Schema/accessToken";

export async function payOnlineorder(
  carttId: String,
  shippingAddress: shipping
) {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("unauthorized.....");
  }
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${carttId}?url=http://localhost:3000`,
    {
      method: "POST",
      headers: {
        token: token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        shippingAddress,
      }),
    }
  );
  const payload = await response.json();
  console.log(payload);
  return payload;
}
