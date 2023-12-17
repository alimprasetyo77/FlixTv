"use client";
import { useState } from "react";
import { Movie } from "../apis/movie/types";
const useSlider = ({ data }: { data: Movie[] }) => {
  const [indexImage, setIndexImage] = useState(Math.floor(data.length / 3) / 2);
  const next = () => {
    setIndexImage(indexImage === Math.floor(data.length / 3 - 1) ? 0 : indexImage + 1);
  };
  const prev = () => {
    setIndexImage(indexImage === 0 ? Math.floor(data.length / 3 - 1) : indexImage - 1);
  };
  return { indexImage, next, prev };
};

export default useSlider;
