import React from "react";
import { Brand } from "../types/productInterface";
import BrandCard from "../_component/brandCard/brandCard";

export default async function Brands() {
  let response = await fetch("https://ecommerce.routemisr.com/api/v1/brands");
  let { data: allbrand }: { data: Brand[] } = await response.json();
  console.log(allbrand);

  return (
    <>
      <div className="grid md:grid-cols-3 gap-5 lg:grid-cols-4 xl:grid-cols-5">
        {allbrand.map((brand) => {
          return <BrandCard key={brand._id} brand={brand} />;
        })}
      </div>
    </>
  );
}
