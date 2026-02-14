import Image from "next/image";
import { ProductItem } from "./types/productInterface";
import { Card } from "@/components/ui/card";
import ProductCard from "./_component/productCard/page";
import MainSlider from "./_component/mainSlider/mainSlider";
import CategorySlider from "./_component/categoryslider/sliders";

export default async function Home() {
  let response = await fetch("https://ecommerce.routemisr.com/api/v1/products");
  let { data: allProducts }: { data: ProductItem[] } = await response.json();
  console.log(allProducts);

  return (
    <>
      <MainSlider />
      <CategorySlider />
      <div className="grid md:grid-cols-3 gap-5 lg:grid-cols-4 xl:grid-cols-5">
        {allProducts.map((prod) => {
          return <ProductCard key={prod._id} prod={prod} />;
        })}
      </div>
    </>
  );
}
