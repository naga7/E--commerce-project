"use client";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { addcart } from "@/serives/cart/add-prod-cart";
import { addwish } from "@/serives/whishList/add-prod-wishlist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { log } from "console";
import React from "react";
import toast from "react-hot-toast";

export default function AddButton({ productId }: { productId: string }) {
  const queryclient = useQueryClient();
  const {
    data,
    isPending,
    isError,
    error,
    mutate: addproductTocart,
  } = useMutation({
    mutationFn: addcart,
    onSuccess: (data) => {
      toast.success(data?.message);
      queryclient.invalidateQueries({ queryKey: ["get-cart"] });
    },
    onError: () => {
      toast.error("login first.....");
    },
  });
  console.log(data);
  // --------------
  const {
    data: aa,
    isPending: lo,
    isError: is,
    error: err,
    mutate: addproductTowish,
  } = useMutation({
    mutationFn: addwish,
    onSuccess: (aa) => {
      toast.success(aa?.message);
      queryclient.invalidateQueries({ queryKey: ["get-wishList"] });
    },
    onError: () => {
      toast.error("login first.....");
    },
  });
  return (
    <>
      <CardFooter>
        <div className="flex justify-between w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 hover:text-green-400 cursor-pointer"
            onClick={() => {
              addproductTowish(productId);
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>

          <Button
            className="cursor-pointer"
            onClick={() => {
              addproductTocart(productId);
            }}
          >
            Add to cart
          </Button>
        </div>
      </CardFooter>
    </>
  );
}
