"use client";
import { Movie } from "@/lib/apis/movie/types";
import useSlider from "@/lib/hooks/useSlider";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Rubik } from "next/font/google";
import Image from "next/image";

const rubik = Rubik({ subsets: ["latin"] });

const UpComing = ({ data }: { data: Movie[] }) => {
  const { indexImage, next, prev } = useSlider({ data });
  return (
    <div className="container space-y-5 py-10 ">
      <div className="flex justify-between items-center">
        <h1 className={`text-4xl text-primary dark:text-white ${rubik.className}`}>Up Coming</h1>
        <div className="space-x-4">
          <button className="px-3 py-1 rounded-md border text-red-50" onClick={prev}>
            <ArrowLeft />
          </button>
          <button className="px-3 py-1 rounded-md border text-red-50" onClick={next}>
            <ArrowRight />
          </button>
        </div>
      </div>
      <div
        className=" flex items-center gap-10 snap-mandatory snap-x  transition-transform duration-700 ease-linear "
        style={{ transform: `translateX(-${indexImage * 100}%)` }}>
        {data.map((value) => (
          <div className="relative space-y-4 snap-start ">
            <Image
              src={`https://image.tmdb.org/t/p/w500${value.backdrop_path}`}
              className=" min-w-[350px] min-h-[280px]  bg-cover bg-center rounded-xl"
              width={400}
              height={400}
              alt="image"
            />
            <h1
              className={`absolute bottom-2 right-1/2 translate-x-1/2 text-3xl  text-center ${rubik.className} `}>
              {value.title}
            </h1>
          </div>
        ))}
      </div>
      {/* <div className="flex items-center justify-between fixed top-0 w-full h-full  gap-x-72 border ">
        <button className="px-5 bg-red-500 py-5 h-full w-full">Prev</button>
        <button className="px-5 bg-red-500 py-5 h-full w-full">Next</button>
      </div> */}
    </div>
  );
};

export default UpComing;
