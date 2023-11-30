import Card from "@/components/Card";
import { Response } from "@/lib/types/api";
import { MovieDetail } from "@/lib/apis/movie/types";
import axios from "axios";
import { Dot, PlayCircle, Star } from "lucide-react";
import { Metadata } from "next";
import { Rubik } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getDetailMovie, getSimilarMovies } from "@/lib/apis/movie/api";

const rubik = Rubik({ subsets: ["latin"] });

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const id = params.id;
  const movie = await getDetailMovie(id);
  return {
    title: "FlixTV - " + movie.title,
  };
}

const DetailMovie = async ({ params }: { params: { id: string } }) => {
  const movie = await getDetailMovie(params.id);
  const similiarMovies = await getSimilarMovies(params.id);

  return (
    <div className="min-h-screen bg-slate-600 dark:bg-primary bg-blend-overlay fixed inset-0 overflow-y-auto py-24">
      <div
        className={`bg-slate-600 dark:bg-primar bg-blend-soft-light w-full h-[55%] bg-no-repeat bg-cover bg-center`}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
        }}></div>

      <div className={`container space-y-10 -translate-y-[55%] text-white `}>
        <div className="flex items-center gap-x-16">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.original_title}
            width={350}
            height={400}
          />
          <div className="flex flex-col gap-y-8">
            <div className="flex items-center gap-x-4 cursor-pointer">
              <PlayCircle className="w-11 h-11" />
              <span className="text-lg tracking-wide ">Trailer</span>
            </div>
            <ul className="flex items-center gap-x-8">
              <li className="flex items-center gap-x-2">
                <Star className="text-font" />
                {movie.vote_average} ({movie.vote_count})
              </li>
              <li className="flex items-center">
                <Dot className="text-font" />
                {movie.genres[0].name}
              </li>
              <li className="flex items-center">
                <Dot className="text-font" />
                {movie.release_date}
                <span className="ml-1">released</span>
              </li>
              <li className="flex items-center ">
                <Dot className="text-font" />
                {movie.runtime}
                <span className="ml-1">min</span>
              </li>
            </ul>
            <h1 className={`text-4xl font-semibold ${rubik.className}`}>{movie.title}</h1>
            <p className="tracking-wide">{movie.overview}</p>
            <div className="flex items-center gap-x-4">
              {movie.genres.map((value) => (
                <Link
                  href={"/"}
                  className="px-3 py-1 bg-[#151f30] hover:bg-font duration-500 rounded-lg">
                  {value.name}
                </Link>
              ))}
            </div>
            {movie.tagline && (
              <span className="font-semibold text-lg italic">#{movie.tagline}</span>
            )}
          </div>
        </div>
      </div>
      <div className="container space-y-8">
        <h1 className={`text-4xl text-primary dark:text-white ${rubik.className}`}>
          Similiar Movies
        </h1>
        <div className="grid grid-cols-4 gap-8">
          {similiarMovies.results.map((value) => (
            <Card data={value} href={`/movies/${value.id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailMovie;
