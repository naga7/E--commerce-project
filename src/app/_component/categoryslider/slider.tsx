"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import React from "react";
import Image from "next/image";
import { Category } from "@/app/types/productInterface";
import { Autoplay } from "swiper/modules";
export default function Slider({ categories }: { categories: Category[] }) {
  return (
    <>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 700,
        }}
        spaceBetween={0}
        slidesPerView={6}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {categories.map((category, index) => {
          return (
            <div key={index}>
              <SwiperSlide key={category._id}>
                <Image
                  className="w-full object-cover h-[200px]"
                  src={category.image}
                  width={600}
                  height={300}
                  alt="img3"
                />
              </SwiperSlide>
              <h2>{category.name}</h2>
            </div>
          );
        })}
      </Swiper>
    </>
  );
}
