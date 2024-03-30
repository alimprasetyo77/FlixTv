"use client";
import { Movie } from "@/lib/apis/movie/types";
import { Rubik } from "next/font/google";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

const rubik = Rubik({ subsets: ["latin"] });

const UpComing = ({ data }: { data: Movie[] }) => {
  const plugin = React.useRef(Autoplay({ delay: 4000 }));

  return (
    <div className="space-y-5 py-10 ">
      <h1 className={`container text-4xl text-primary dark:text-white ${rubik.className}`}>
        Up Coming
      </h1>
      <Carousel
        className="p-5"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.play}
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent className="gap-x-6">
          {data.map((value, index) => (
            <CarouselItem className="max-w-lg min-h-[320px] p-0 " key={index}>
              <div
                className="relative space-y-4 rounded overflow-hidden h-full  bg-cover bg-center bg-no-repeat  bg-black/20 bg-blend-overlay"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w500${value.backdrop_path})`,
                }}
              >
                {/* <Image
                  src={`https://image.tmdb.org/t/p/w500${value.backdrop_path}`}
                  className=" min-w-[350px] min-h-[280px] h-full object-fill "
                  width={500}
                  height={300}
                  alt="image"
                /> */}
                <h1
                  className={`w-full absolute bottom-2 right-1/2 translate-x-1/2 text-white text-2xl text-center ${rubik.className} group-hover:text-font duration-300 transition-all`}
                >
                  {value.title}
                </h1>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      {/* <div
        className=" flex items-center gap-10 snap-mandatory snap-x  transition-transform duration-700 ease-linear "
        style={{ transform: `translateX(-${indexImage * 100}%)` }}
      >
        {data.map((value) => (
          <div className="relative space-y-4 snap-start" key={value.id}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${value.backdrop_path}`}
              className=" min-w-[350px] min-h-[280px]  bg-cover bg-center rounded-xl"
              width={400}
              height={400}
              alt="image"
            />
            <h1
              className={`absolute bottom-2 right-1/2 translate-x-1/2 text-3xl  text-center ${rubik.className} `}
            >
              {value.title}
            </h1>
          </div>
        ))}
      </div> */}
      {/* <div className="flex items-center justify-between fixed top-0 w-full h-full  gap-x-72 border ">
        <button className="px-5 bg-red-500 py-5 h-full w-full">Prev</button>
        <button className="px-5 bg-red-500 py-5 h-full w-full">Next</button>
      </div> */}
    </div>
  );
};

export default UpComing;
