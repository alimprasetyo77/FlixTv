import NowPlaying from "@/components/section/NowPlaying";
import UpComing from "@/components/section/UpComing";
import { getMovieUpComing, getMoviesNowPlaying } from "@/lib/apis/movie/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlixTV - Movies",
};

export default async function Home() {
  const nowPlayingMovies = await getMoviesNowPlaying();
  const upComingMovies = await getMovieUpComing();
  return (
    <main className="bg-slate-200  dark:bg-primary min-h-screen overflow-hidden ">
      <section id="upComing">
        <UpComing data={upComingMovies.results} />
      </section>
      <section id="now-playing">
        <NowPlaying data={nowPlayingMovies.results} />
      </section>
    </main>
  );
}
