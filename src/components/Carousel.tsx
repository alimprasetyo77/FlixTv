"use client";
import { Movie } from "@/lib/apis/movie/types";
import Image from "next/image";
import { useEffect, useState } from "react";

interface props {
  data: string[];
}

const Carousel = ({ data }: props) => {
  const [sizeImg, setSizeImg] = useState(0);

  const prev = () => {
    setSizeImg((sizeImg) => (sizeImg === 0 ? data.length - 1 : sizeImg - 1));
  };
  const next = () => {
    setSizeImg((sizeImg) => (sizeImg === data.length - 1 ? 0 : sizeImg + 1));
  };
  useEffect(() => {
    const slide = setInterval(next, 1000);
    return () => {
      clearInterval(slide);
    };
  }, []);

  return (
    <div className="container relative flex gap-x-12 borders justify-between">
      <span className="text-4xl text-red-500 z-0 fixed">{sizeImg}</span>
      <div className={`flex items-center gap-x-10  transition-transform ease-out duration-500`}>
        {data.map((value, index) => (
          <Image
            key={index}
            src={`https://image.tmdb.org/t/p/original${value}`}
            alt={value}
            width={300}
            height={300}
            style={{ transform: `translateX(-${sizeImg * 100} %)` }}
            className={`aspect-[3/4] w-auto h-auto object-cover rounded-lg`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
