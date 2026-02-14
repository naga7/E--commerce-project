"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import imgLogo from "../../../assets/logo.jpg";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Badge, BadgeCheck } from "lucide-react";
import { Span } from "next/dist/trace";
import { DropdownMenuDemo } from "../dropdowen/dropdowen";
import { useQuery } from "@tanstack/react-query";
import { CartResponse } from "@/app/types/cart-response";

export default function Navbar() {
  const {
    data: CartData,
    isLoading,
    isError,
  } = useQuery<CartResponse>({
    queryKey: ["get-cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart", { cache: "no-store" });
      const payload = await res.json();
      return payload;
    },
  });

  const { data: session, status } = useSession();
  console.log(session, status);
  function logout() {
    signOut({
      callbackUrl: "/Login",
    });
  }

  const [isOpen, setOpen] = useState(false);
  function toggleNav() {
    setOpen(!isOpen);
  }

  const path = [
    { href: "/", content: "Home" },
    { href: "/category", content: "Category" },
    { href: "/brands", content: "Brands" },
  ];

  const Authpath = [
    { href: "/Login", content: "Login" },
    { href: "/Register", content: "Register" },
  ];
  const pathofTap = usePathname();
  return (
    <>
      <nav
        className="bg-gray-300 text-black py-2
      "
      >
        <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap md:gap-20 items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            {/* <img src={imgLogo} className="h-7" alt="Flowbite Logo" /> */}
            <Image
              src={imgLogo}
              width={40}
              height={40}
              alt="logo"
              className="rounded-full"
            />
            <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
              Frish Cart
            </span>
          </a>
          <button
            onClick={toggleNav}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
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
                strokeWidth={2}
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
          <div
            className={` ${
              !isOpen && "hidden"
            }     justify-between   w-full md:flex`}
            id="navbar-default"
          >
            <ul className="font-medium flex justify-center items-center flex-col p-4 md:p-0 mt-4  rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              {path.map((ele) => {
                return (
                  <li key={ele.content}>
                    <Link
                      href={ele.href}
                      className={` ${pathofTap == ele.href ? "active" : ""}
                        block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent`}
                    >
                      {ele.content}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <ul className="font-medium flex justify-center items-center flex-col p-4 md:p-0 rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
              {status == "authenticated" ? (
                <>
                  <li> Hi , {session?.user.name}</li>
                  <li className="relative my-8 md:mx-3">
                    {/* {CartData?.numOfCartItems > 0 ? (
                      <span className="bg-green-400 text-white p-1  rounded-full absolute -top-[20px] start-4"></span>
                    ) : (
                      " "
                    )} */}
                    <Link href={"/wishlist"}>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    </Link>{" "}
                  </li>
                  <li className="relative my-8 md:mx-3">
                    {(CartData?.numOfCartItems ?? 0) > 0 ? (
                      <span className="bg-green-400 text-white p-1  rounded-full absolute -top-[20px] start-4">
                        {CartData?.numOfCartItems}
                      </span>
                    ) : (
                      " "
                    )}
                    <Link href={"/cart"}>
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </Link>{" "}
                  </li>
                  {/* <li onClick={logout} className="cursor-pointer">
                    Log out
                  </li> */}
                  <DropdownMenuDemo logout={logout} />
                </>
              ) : (
                Authpath.map((ele) => {
                  return (
                    <li key={ele.content}>
                      <Link
                        href={ele.href}
                        className={` ${pathofTap == ele.href ? "active" : ""}
                      block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent`}
                      >
                        {ele.content}
                      </Link>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
