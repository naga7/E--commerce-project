import React from "react";
import { Category } from "../types/productInterface";
import Categorycard from "../_component/categoryCard/Categorycard";

export default async function Categories() {
  let response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );
  let { data: allcategory }: { data: Category[] } = await response.json();
  console.log(allcategory);

  return (
    <>
      <div className="grid md:grid-cols-3 gap-5 lg:grid-cols-4 xl:grid-cols-5">
        {allcategory.map((cate) => {
          return <Categorycard key={cate._id} cate={cate} />;
        })}
      </div>
    </>
  );
}
