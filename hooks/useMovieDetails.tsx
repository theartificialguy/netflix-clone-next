import { useEffect, useState } from "react";
import { Element, Genre, Movie } from "../types";
// import useIsMounted from "./useIsMounted";

const useMovieDetails = (movie: Movie | null) => {
  const [trailer, setTrailer] = useState(null);
  const [genres, setGenres] = useState<Genre[] | []>([]);
  // const isMounted = useIsMounted();

  useEffect(() => {
    if (!movie) return;

    const fetchMovieTrailer = async () => {
      try {
        const result = await fetch(
          `https://api.themoviedb.org/3/${
            movie?.media_type === "tv" ? "tv" : "movie"
          }/${movie?.id}?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
          }&language=en-US&append_to_response=videos`
        );
        const response = await result.json();

        if (response?.videos) {
          const index = response.videos.results.findIndex(
            (e: Element) => e.type === "Trailer"
          );
          if (index >= 0) {
            setTrailer(response.videos?.results[index]?.key);
          }
        }
        if (response?.genres) {
          setGenres(response?.genres);
        }
      } catch (error) {
        alert(error);
      }
    };

    fetchMovieTrailer();
  }, [movie]);

  return { trailer, genres, setTrailer };
};

export default useMovieDetails;
