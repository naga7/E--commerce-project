"use client";
import React from "react";
import img1 from "../../../assets/images-20260210T233105Z-1-001/images/grocery-banner.png";

import img2 from "../../../assets/images-20260210T233105Z-1-001/images/grocery-banner-2.jpeg";
import img3 from "../../../assets/images-20260210T233105Z-1-001/images/slider-image-3.jpeg";
import img4 from "../../../assets/images-20260210T233105Z-1-001/images/slider-image-1.jpeg";
import img5 from "../../../assets/images-20260210T233105Z-1-001/images/slider-image-2.jpeg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";

export default function MainSlider() {
  return (
    <>
      <div className="flex">
        <div className="w-3/4">
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 600,
            }}
            spaceBetween={0}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              {" "}
              <Image
                className="w-full h-[400px] object-cover"
                alt="img1"
                src={img3}
                width={600}
                height={300}
              />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <Image
                className="w-full h-[400px] object-cover"
                alt="img1"
                src={img4}
                width={600}
                height={300}
              />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <Image
                className="w-full h-[400px] object-cover"
                alt="img1"
                src={img5}
                width={600}
                height={300}
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="w-1/4">
          <Image
            className="w-full h-[200px] object-cover"
            alt="img1"
            src={img1}
            width={200}
            height={200}
          />
          <Image
            className="w-full h-[200px] object-cover"
            alt="img1"
            src={img2}
            width={200}
            height={200}
          />
        </div>
      </div>
    </>
  );
}
