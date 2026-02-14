"use server";
import { getAccessToken } from "@/Schema/accessToken";
import { updatePassword } from "@/Schema/RegisterSchema";
import { log } from "console";
import { decode } from "next-auth/jwt";

import { json } from "zod";

export async function updatepasswordd(values: object) {
  const token = await getAccessToken();
  if (!token) {
    throw new Error("unauthorized.....");
  }
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
    {
      cache: "no-store",
      method: "PUT",
      headers: {
        token: token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        values,
      }),
    }
  );
  const payload = await response.json();
  console.log(payload);
  return payload;
}
