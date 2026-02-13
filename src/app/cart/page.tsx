"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { CartResponse } from "../types/cart-response";
import { deletecartItem } from "@/serives/cart/delete-cart-item";
import toast from "react-hot-toast";
import { updatecartItem } from "@/serives/cart/update-cart";
import { Button } from "@/components/ui/button";
import { clearcart } from "@/serives/cart/clearAllcart";
import cartimg from "../../assets/3081840.png";
import Image from "next/image";
import Link from "next/link";
export default function Cart() {
  const queryclient = useQueryClient();
  const {
    data: CartData,
    isLoading,
    isError,
  } = useQuery<CartResponse>({
    queryKey: ["get-cart"],
    queryFn: async () => {
      const res = await fetch("api/cart");
      const payload = await res.json();
      return payload;
    },
  });
  // --------------delete cart---------------
  const {
    mutate: deletecartitemm,
    isPending,
    isError: error,
  } = useMutation({
    mutationFn: deletecartItem,
    onSuccess: () => {
      toast.success("product deleted");
      queryclient.invalidateQueries({ queryKey: ["get-cart"] });
    },
    onError: () => {
      toast.success("error....");
    },
  });
  // ----------clear all items cart------------
  const {
    mutate: clearcartitemm,
    data,
    isError: error3,
  } = useMutation({
    mutationFn: clearcart,
    onSuccess: () => {
      toast.success("cart deleted ");
      queryclient.invalidateQueries({ queryKey: ["get-cart"] });
    },
    onError: () => {
      toast.success("error....");
    },
  });
  // -----------------update---------
  const {
    mutate: updatecartitemm,
    isPending: updateloading,
    isError: errorr,
  } = useMutation({
    mutationFn: updatecartItem,
    onSuccess: () => {
      toast.success("update product cart");
      queryclient.invalidateQueries({ queryKey: ["get-cart"] });
    },
    onError: () => {
      toast.success("error....");
    },
  });
  function handelupdate(productId: string, count: number) {
    updatecartitemm({ productId, count });
  }
  // ----------------------------
  console.log(CartData);
  if (isLoading) {
    <h2>loading.............</h2>;
  }
  if (isError) {
    <h2>.............</h2>;
  }

  return (
    <>
      {CartData?.numOfCartItems > 0 ? (
        <div className="flex gap-5">
          <div className="w-3/4 mt-5">
            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
              <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {CartData?.data.products.map((pro) => {
                    return (
                      <tr
                        key={pro._id}
                        className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
                      >
                        <td className="p-4">
                          <img
                            src={pro.product.imageCover}
                            className="w-16 md:w-24 max-w-full max-h-full"
                            alt="Apple Watch"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-heading">
                          {pro.product.title}
                        </td>
                        <td className="px-6 py-4">
                          <form className="max-w-xs mx-auto">
                            <label
                              htmlFor="counter-input-1"
                              className="sr-only"
                            >
                              Choose quantity:
                            </label>
                            <div className="relative flex items-center">
                              <button
                                onClick={() => {
                                  handelupdate(pro.product._id, pro.count - 1);
                                }}
                                type="button"
                                id="decrement-button-1"
                                data-input-counter-decrement="counter-input-1"
                                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                              >
                                <svg
                                  className="w-3 h-3 text-heading"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 12h14"
                                  />
                                </svg>
                              </button>
                              <span
                                id="counter-input-1"
                                data-input-counter
                                className="mx-3 shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                              >
                                {pro.count}
                              </span>
                              <button
                                onClick={() => {
                                  handelupdate(pro.product._id, pro.count + 1);
                                }}
                                type="button"
                                id="increment-button-1"
                                data-input-counter-increment="counter-input-1"
                                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                              >
                                <svg
                                  className="w-3 h-3 text-heading"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width={24}
                                  height={24}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 12h14m-7 7V5"
                                  />
                                </svg>
                              </button>
                            </div>
                          </form>
                        </td>
                        <td className="px-6 py-4 font-semibold text-heading">
                          {pro.price} EGP
                        </td>
                        <td className="px-6 py-4">
                          <span
                            onClick={() => {
                              deletecartitemm(pro.product._id);
                            }}
                            className="cursor-pointer font-medium text-fg-danger hover:underline"
                          >
                            Remove
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <Button
                className=" my-4 w-full"
                onClick={() => {
                  clearcartitemm();
                }}
              >
                Clear Cart
              </Button>
            </div>
          </div>
          <div className="w-1/4 mt-5">
            <div className="border p-4">
              <h2 className="text-xl my-4  ">
                Number of cart items{" "}
                <span className="text-green-400">
                  {CartData?.numOfCartItems}
                </span>
              </h2>
              <h2 className="text-xl ">
                Total price{" "}
                <span className="text-green-400">
                  {CartData?.data.totalCartPrice}EGP
                </span>
              </h2>
              <Button className=" my-4">
                <Link href={`/checkout/${CartData?.cartId}`}>check out</Link>
              </Button>
            </div>
            {/* <section className=" w-full h-[700px] relative bg-white dark:bg-[#0A2025] ">
                    <div className="bg-white flex flex-col h-full absolute right-0 p-10 w-[450px]">
                      <div className="flex items-center mb-3 justify-between ">
                        <h2 className="text-[#191919] text-xl font-medium leading-[30px]">
                          Shopping Card (2)
                        </h2>
                        <svg
                          width={45}
                          height={45}
                          viewBox="0 0 45 45"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="22.5" cy="22.5" r="22.5" fill="white" />
                          <path
                            d="M28.75 16.25L16.25 28.75"
                            stroke="#1A1A1A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.25 16.25L28.75 28.75"
                            stroke="#1A1A1A"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="flex gap-2 mb-6 items-center">
                        <img
                          width={120}
                          height={100}
                          src="https://iili.io/3FqLBsI.png"
                          alt
                        />
                        <div>
                          <h3 className="w-[216px]   text-[#191919] text-sm font-normal  leading-[21px]">
                            Fresh Indian Orange
                          </h3>
                          <p>
                            <span className="relative justify-start text-[#7f7f7f] text-sm font-normal  leading-[21px]">
                              1 kg x
                            </span>
                            <span className="relative justify-start text-[#191919] text-sm font-semibold  leading-[16.80px]">
                              {" "}
                              12.00
                            </span>
                          </p>
                        </div>
                        <svg
                          width={32}
                          height={32}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_629_6652)">
                            <path
                              d="M12 23C18.0748 23 23 18.0748 23 12C23 5.92525 18.0748 1 12 1C5.92525 1 1 5.92525 1 12C1 18.0748 5.92525 23 12 23Z"
                              stroke="#CCCCCC"
                              strokeMiterlimit={10}
                            />
                            <path
                              d="M16 8L8 16"
                              stroke="#666666"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M16 16L8 8"
                              stroke="#666666"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_629_6652">
                              <rect width={24} height={24} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="flex  gap-2 mb-6 items-center">
                        <img
                          width={120}
                          height={100}
                          src="https://iili.io/3FqLBsI.png"
                          alt
                        />
                        <div>
                          <h3 className="w-[216px]   text-[#191919] text-sm font-normal  leading-[21px]">
                            Fresh Indian Orange
                          </h3>
                          <p>
                            <span className="relative justify-start text-[#7f7f7f] text-sm font-normal  leading-[21px]">
                              1 kg x
                            </span>
                            <span className="relative justify-start text-[#191919] text-sm font-semibold  leading-[16.80px]">
                              {" "}
                              12.00
                            </span>
                          </p>
                        </div>
                        <svg
                          width={32}
                          height={32}
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_629_6652)">
                            <path
                              d="M12 23C18.0748 23 23 18.0748 23 12C23 5.92525 18.0748 1 12 1C5.92525 1 1 5.92525 1 12C1 18.0748 5.92525 23 12 23Z"
                              stroke="#CCCCCC"
                              strokeMiterlimit={10}
                            />
                            <path
                              d="M16 8L8 16"
                              stroke="#666666"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <path
                              d="M16 16L8 8"
                              stroke="#666666"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_629_6652">
                              <rect width={24} height={24} fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div className="mt-auto">
                        <div className=" py-6 bg-white flex justify-between items-center">
                          <span className="relative justify-start text-[#191919] text-base font-normal  leading-normal">
                            2 Product
                          </span>
                          <span className="relative justify-start text-[#191919] text-base font-semibold  leading-tight">
                            $26.00
                          </span>
                        </div>
                        <button className="w-full px-10 py-4 bg-[#00b206] rounded-[43px]     text-white text-base font-semibold  leading-tight">
                          Checkout
                        </button>
                        <button className="w-[376px] mt-3 px-10 py-4 bg-[#56ac59]/10 rounded-[43px]   text-[#00b206] text-base font-semibold  leading-tight">
                          Go To Cart
                        </button>
                      </div>
                    </div>
                  </section> */}
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center">
            <Image src={cartimg} width={400} height={400} alt="cart" />
          </div>
        </>
      )}
    </>
  );
}
