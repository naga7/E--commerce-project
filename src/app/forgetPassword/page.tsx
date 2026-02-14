"use client";
import { Button } from "@/components/ui/button";
import { changpass, Registerschema } from "../../Schema/RegisterSchema";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as zod from "zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function ForgetPassword() {
  const [Isloading, setIsloading] = useState(false);
  const router = useRouter();
  let form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(changpass),
  });
  async function submitform(values: zod.infer<typeof changpass>) {
    console.log(values);
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const payload = await response.json();
    console.log(payload);
    if (payload.statusMsg == "success") {
      return router.push("/verifyResetCode");
    } else {
      toast.error("error reset code");
    }
  }

  return (
    <>
      <div className="container w-1/2 mx-auto p-5 bg-gray-300 mt-10 rounded-2xl">
        <h2 className="text-green-600 font-bold text-2xl">FORGET PASSWORD</h2>
        <form onSubmit={form.handleSubmit(submitform)}>
          <div className="mt-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    autoComplete="on"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Button disabled={Isloading} type="submit" className="my-5 w-full">
            {Isloading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
