"use client";
import { Movie } from "@/lib/apis/movie/types";
import { Rubik } from "next/font/google";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const rubik = Rubik({ subsets: ["latin"] });

interface UpComingProps {
  data: Movie[];
}

const UpComing = ({ data }: UpComingProps) => {
  return (
    <div className="container space-y-5 py-10">
      <h1 className={`text-4xl text-primary dark:text-white ${rubik.className}`}>
        Up Coming
      </h1>
      <div className="flex items-center  gap-10 snap-mandatory snap-x overflow-x-auto py-10 ">
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
    </div>
  );
};

export default UpComing;
