"use client";
import { shipping } from "@/app/types/cart-response";
import { Button } from "@/components/ui/button";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { paychashorder } from "@/serives/cart/paychash";
import { payOnlineorder } from "@/serives/cart/payOnline";

import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import toast from "react-hot-toast";

export default function CheckoutForm({ cartId }: { cartId: string }) {
  const [isOnline, setisOnline] = useState(true);

  async function paychach(cartId: string, shippingAddress: shipping) {
    const response = await paychashorder(cartId, shippingAddress);
    console.log(response);
    if (response.status == "success") {
      toast.success("order will deliverd sooon...");
      window.location.href = "/";
    } else {
      toast.error("errror");
    }
  }
  // ----------------online orde----------
  async function payonline(cartId: string, shippingAddress: shipping) {
    const response = await payOnlineorder(cartId, shippingAddress);
    console.log(response);
    if (response.status == "success") {
      // toast.success("order will deliverd sooon...");
      window.location.href = response.session.url;
    } else {
      toast.error("errror");
    }
  }
  // --------------------------
  const [Isloading, setIsloading] = useState(false);
  let form = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  async function submitform(values: shipping) {
    setIsloading(true);
    console.log(values);
    const shippingAddress = {
      ...values,
    };
    if (isOnline) {
      payonline(cartId, shippingAddress);
    } else {
      paychach(cartId, shippingAddress);
    }
    // paychach(cartId, shippingAddress);

    setIsloading(false);
  }
  return (
    <>
      <div className="container w-1/2 mx-auto p-5 bg-gray-300 mt-10 rounded-2xl">
        <h2 className="text-green-600 font-bold text-2xl">payOrder Now</h2>
        <form onSubmit={form.handleSubmit(submitform)}>
          <div className="mt-4">
            <Controller
              name="details"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Details</FieldLabel>
                  <Input
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your Details"
                    autoComplete="on"
                  />
                </Field>
              )}
            />
          </div>
          <div className="mt-4">
            <Controller
              name="city"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>city</FieldLabel>
                  <Input
                    type="text"
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your city"
                    autoComplete="on"
                  />
                </Field>
              )}
            />
          </div>
          <div className="mt-4">
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                  <Input
                    type="number"
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your phone"
                    autoComplete="on"
                  />
                </Field>
              )}
            />
          </div>
          <Button
            onClick={() => {
              setisOnline(false);
            }}
            disabled={Isloading}
            type="submit"
            className="my-5 w-full"
          >
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
              "pay cash"
            )}
          </Button>
          <Button
            onClick={() => {
              setisOnline(true);
            }}
            disabled={Isloading}
            type="submit"
            className="my-5 w-full"
          >
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
              "pay online"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
