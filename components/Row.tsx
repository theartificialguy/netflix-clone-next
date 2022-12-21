import React, { useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

import { Movie } from "../types";
import { Thumbnail } from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[];
}

function Row({ title, movies }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      ref.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="md:space-y-6">
      <h2 className="font-semibold text-base text-[#e5e5e5] cursor-pointer hover:text-white md:text-xl">
        {title}
      </h2>
      <div className="group relative my-3 -ml-6 space-x-6 md:space-x-8 md:-ml-8">
        <ChevronLeftIcon
          className={`chevronIcon left-6 md:left-8 ${!isMoved && "hidden"}`}
          onClick={() => handleClick("left")}
        />

        <div
          ref={ref}
          className="flex items-center scrollbar-hide space-x-4 overflow-x-scroll md:space-x-6"
        >
          {movies.map((movie, i) => (
            <Thumbnail key={movie.id ?? i.toString()} movie={movie} />
          ))}
        </div>

        <ChevronRightIcon
          className="chevronIcon right-6 md:right-8"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
}

export default Row;
