"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export default function ProductImg({ images }: { images: string[] }) {
  return (
    <>
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {images.map((src) => {
            return (
              <CarouselItem key={src}>
                {" "}
                <Image
                  height={300}
                  width={400}
                  src={src}
                  alt={src}
                  className="w-full object-fill w-full h-auto"
                  priority
                />
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>
    </>
  );
}
