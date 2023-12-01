"use client";
import { Movie } from "@/lib/apis/movie/types";
import Image from "next/image";
import React from "react";
interface CarouselProps {
  data: Movie[];
}
const Carousel = ({ data }: CarouselProps) => {
  return (
    <div className="flex  items-center  gap-10 snap-mandatory snap-x overflow-x-visible py-10 -translate-x-1/2">
      {data.map((value) => (
        <div
          className="relative space-y-4  snap-start min-w-[400px] min-h-[350px] bg-cover bg-center rounded-xl"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${value.backdrop_path})`,
          }}>
          <h1 className="absolute bottom-2 right-1/2 translate-x-1/2 text-xl font-semibold text-center ">
            {value.original_title}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default Carousel;
