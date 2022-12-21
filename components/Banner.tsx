import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/solid";

import { BASE_URL } from "../constants/movie";
import { Movie } from "../types";
import useModal from "../hooks/useModal";

interface Props {
  netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const { setSelectedMovie, openModal } = useModal();

  useEffect(() => {
    const random = Math.floor(Math.random() * netflixOriginals.length);
    const randomMovie = netflixOriginals[random];
    setMovie(randomMovie);
  }, [netflixOriginals]);

  const handleClick = () => {
    setSelectedMovie(movie);
    openModal();
  };

  return (
    <div className="flex flex-col space-y-4 py-16 md:space-y-5 lg:h-[60vh] lg:justify-end lg:pb-10">
      <div className="absolute -z-10 top-0 left-0 h-[95vh] w-screen">
        <Image
          src={`${BASE_URL}${movie?.backdrop_path || movie?.poster_path}`}
          style={{ objectFit: "cover" }}
          alt="#"
          fill
        />
      </div>

      <h1 className="text-2xl mt-10 md:mt-12 md:text-3xl lg:text-4xl font-bold">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-sm text-shadow-md md:max-w-lg md:text-base lg:max-w-xl lg:text-lg">
        {movie?.overview}
      </p>

      <div className="flex space-x-3">
        <button className="bannerButton bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
          Play
        </button>
        <button onClick={handleClick} className="bannerButton bg-[gray]/70">
          More Info <InformationCircleIcon className="h-5 w-5 md:h-7 md:w-7" />
        </button>
      </div>
    </div>
  );
}

export default Banner;
