import Card from "@/components/Card";
import Carousel from "@/components/Carousel";
import { getMovieUpComing, getMoviesNowPlaying } from "@/lib/apis/movie/api";
import { Metadata } from "next";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FlixTV - Movies",
};

export default async function Home() {
  const nowPlayingMovies = await getMoviesNowPlaying();
  const upComingMovies = await getMovieUpComing();
  return (
    <main className="bg-slate-100  dark:bg-primary min-h-screen overflow-hidden">
      <section id="upComing">
        <div className="container space-y-5 py-10">
          <h1 className={`text-4xl text-primary dark:text-white ${rubik.className}`}>Up Coming</h1>
          <Carousel data={upComingMovies.results} />
        </div>
      </section>
      <section id="now-playing">
        <div className="container space-y-5 py-10">
          <h1 className={`text-4xl text-primary dark:text-white ${rubik.className}`}>Now Playing</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
            {nowPlayingMovies.results.map((value) => (
              <Card key={value.id} data={value} href={`/movies/${value.id}`} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
