import { Movie } from "@/lib/apis/movie/types";
import { Rubik } from "next/font/google";
import Card from "../Card";

const rubik = Rubik({ subsets: ["latin"] });

const NowPlaying = ({ data }: { data: Movie[] }) => {
  return (
    <div className="container space-y-5 py-10">
      <h1 className={`text-4xl text-primary dark:text-white ${rubik.className}`}>Now Playing</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 ">
        {data.map((value) => (
          <Card key={value.id} data={value} href={`/movies/${value.id}`} />
        ))}
      </div>
    </div>
  );
};

export default NowPlaying;
