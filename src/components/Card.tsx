"use client";
import { Movie } from "@/lib/apis/movie/types";
import { Bookmark, PlayCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CardProps {
  data: Movie;
  href: string;
}
const Card = ({ data, href }: CardProps) => {
  const [onHover, setOnHover] = useState(false);
  return (
    <div className="flex flex-col items-center ">
      <Link href={href} className=" space-y-4 group ">
        <div
          className="overflow-hidden relative "
          onMouseEnter={() => setOnHover(true)}
          onMouseLeave={() => setOnHover(false)}>
          <Image
            className={`aspect-[3/4] object-cover duration-300 min-w-[300px] ${
              onHover ? "blur-sm scale-105" : "blur-0 scale-100"
            }`}
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            alt={data.title}
            width={500}
            height={300}
          />

          <PlayCircle
            className={`text-white absolute w-14 h-14 top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2 ${
              onHover ? "opacity-100" : "opacity-0"
            } transition-opacity duration-500`}
          />
          <button
            className={`text-font absolute p-2 bg-primary rounded-full top-2 left-2 hover:text-amber-500 ${
              onHover ? "opacity-100" : "opacity-0"
            } transition-opacity duration-500`}>
            <Bookmark />
          </button>
        </div>
        <div className="text-center group-hover:text-font  duration-500 text-primary dark:text-white  font-medium text-lg">
          {data.title}
        </div>
      </Link>
    </div>
  );
};

export default Card;
