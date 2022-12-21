import React from "react";
import Image from "next/image";

import { Movie } from "../types";
import useModal from "../hooks/useModal";

interface Props {
  movie: Movie;
}

const THUMBNAIL_BASE_URL = "https://image.tmdb.org/t/p/w500";

export const Thumbnail = ({ movie }: Props) => {
  const { setSelectedMovie, openModal } = useModal();

  const handleClick = () => {
    setSelectedMovie(movie);
    openModal();
  };

  return (
    <div
      onClick={handleClick}
      className="relative h-28 min-w-[200px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
    >
      <Image
        className="rounded-sm object-cover md:rounded"
        src={`${THUMBNAIL_BASE_URL}${
          movie?.poster_path || movie?.backdrop_path
        }`}
        alt="#"
        fill
      />
    </div>
  );
};
