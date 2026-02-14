import { Category } from "@/app/types/productInterface";
import Slider from "./slider";

export default async function CategorySlider() {
  const response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories"
  );
  const payload = await response.json();
  const categories: Category[] = payload.data;

  return <Slider categories={categories}></Slider>;
}
