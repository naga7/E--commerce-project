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
import ProductCard from "@/app/_component/productCard/page";

type myprops = {
  params: {
    id: string;
  };
};
export default async function SubBrand(props: myprops) {
  let { id } = await props.params;
  console.log(id);
  //  https://ecommerce.routemisr.com/api/v1/brand/${id}
  let response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
  );
  let { data: singleDataDetails }: { data: ProductItem[] } =
    await response.json();
  // console.log(prodDetail);
  console.log(singleDataDetails);

  return (
    <>
      {" "}
      {/* <Card className="relative mx-auto max-w-sm pt-0 rounded-2xl">
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
   
          </CardHeader>
        </Link>

      </Card> */}{" "}
      <div className="grid md:grid-cols-3 gap-5 lg:grid-cols-4 xl:grid-cols-5">
        {singleDataDetails.map((prod) => {
          return <ProductCard key={prod._id} prod={prod} />;
        })}
      </div>{" "}
    </>
  );
}
{
  /* <div className="grid md:grid-cols-3 gap-5 lg:grid-cols-4 xl:grid-cols-5">
{singleDataDetails.map((prod) => {
  return <ProductCard key={prod._id} prod={prod} />;
})}
</div> */
}
//
