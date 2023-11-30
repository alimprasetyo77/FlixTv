import Card from "@/components/Card";
import { getFavoriteMovies } from "@/lib/apis/movie/api";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import React from "react";

const Favorite = async () => {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");
  const sessionID = cookieStore.get("sessionID");
  const datas = await getFavoriteMovies(userID?.value ?? "", sessionID?.value ?? "");

  return (
    <div className="min-h-screen bg-primary py-10">
      <div className="container">
        <h1 className="text-4xl ">My Favorites</h1>
        <div className="grid grid-cols-4 gap-x-8 mt-8 ">
          {datas.results.map((data) => (
            <Card href={`/movies/${data.id}`} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
