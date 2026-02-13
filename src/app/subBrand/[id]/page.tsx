import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Brand, ProductItem } from "@/app/types/productInterface";
import ProductImg from "@/app/_component/productImg/page";
import AddButton from "@/app/_component/addButton/addButton";
import Link from "next/link";
import Image from "next/image";

type myprops = {
  params: {
    id: string;
  };
};
export default async function SubBrand(props: myprops) {
  let { id } = await props.params;
  console.log(id);
  let response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/brands/${id}`
  );
  let { data: singleDataDetails }: { data: Brand } = await response.json();
  // console.log(prodDetail);
  console.log(singleDataDetails);

  return (
    <>
      {" "}
      <Card className="relative mx-auto max-w-sm pt-0 rounded-2xl">
        <Link href={`subBrand/${singleDataDetails._id}`}>
          <Image
            height={300}
            width={200}
            src={singleDataDetails.image}
            alt={singleDataDetails.name}
            className="w-full object-fill w-[600] h-[300] rounded-2xl"
          />
          <CardHeader className="mt-5 ">
            <CardAction></CardAction>
            <CardTitle>{singleDataDetails.name}</CardTitle>
            {/* <CardDescription className="my-3">
                <div className="flex justify-between w-full">
                  <span>{prod.price} EGP</span>
                  <span className="flex">
                    {prod.ratingsAverage}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-yellow-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                      />
                    </svg>
                  </span>
                </div>
              </CardDescription> */}
          </CardHeader>
        </Link>
        {/* <AddButton productId={prod._id} /> */}
      </Card>
    </>
  );
}
