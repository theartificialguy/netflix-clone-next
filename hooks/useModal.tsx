import { useContext, createContext, useState, useMemo } from "react";
import ReactPlayer from "react-player/lazy";
import { Modal } from "@mui/material";
import {
  XIcon,
  PlusIcon,
  VolumeUpIcon,
  VolumeOffIcon,
} from "@heroicons/react/outline";
import useMovieDetails from "./useMovieDetails";
import { FaPlay } from "react-icons/fa";
import { Movie } from "../types";

interface ModalProvderProps {
  children: React.ReactNode;
}

interface ModalContextProps {
  openModal: () => void;
  closeModal: () => void;
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
  renderModal: (movie: Movie | null) => React.ReactElement | null;
}

const ModalContext = createContext<ModalContextProps>({
  openModal: () => {},
  selectedMovie: null,
  closeModal: () => {},
  renderModal: () => <></>,
  setSelectedMovie: () => {},
});

export const ModalProvider = ({ children }: ModalProvderProps) => {
  const [isModalOpen, setToggleModal] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { trailer, genres, setTrailer } = useMovieDetails(selectedMovie);

  const openModal = () => {
    setToggleModal(true);
  };

  const closeModal = () => {
    setToggleModal(false);
    setSelectedMovie(null);
    setTrailer(null);
  };

  const renderModal = (movie: Movie | null) => {
    if (!movie) return null;
    return (
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
      >
        <>
          <button
            onClick={closeModal}
            className="modalButton absolute top-5 right-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          >
            <XIcon className="h-6 w-6" />
          </button>
          <div className="relative pt-[56.25%]">
            <ReactPlayer
              playing
              width="100%"
              height="100%"
              muted={isMuted}
              url={`https://www.youtube.com/watch?v=${trailer}`}
              style={{ position: "absolute", top: "0", left: "0" }}
            />
            <div className="absolute flex w-full bottom-10 items-center justify-between px-10">
              <div className="flex space-x-2">
                <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                  <FaPlay className="h-7 w-7 text-black" />
                  Play
                </button>

                <button className="modalButton">
                  <PlusIcon className="h-7 w-7" />
                </button>
              </div>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="modalButton"
              >
                {isMuted ? (
                  <VolumeOffIcon className="h-6 w-6" />
                ) : (
                  <VolumeUpIcon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
            <div className="space-y-6 text-lg">
              <div className="flex items-center space-x-2 text-sm">
                <p className="font-semibold text-green-400">
                  {Math.round(movie?.vote_average * 10)}% Match
                </p>
                <p className="font-light">
                  {movie?.release_date || movie?.first_air_date}
                </p>

                <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-sm">
                  HD
                </div>
              </div>

              <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                <p className="w-5/6">{movie?.overview}</p>
                <div className="flex flex-col space-y-3 text-sm">
                  <div>
                    <span className="text-[gray]">Genres: </span>
                    {genres.map((genre) => genre.name).join(", ")}
                  </div>

                  <div>
                    <span className="text-[gray]">Original language: </span>
                    {movie?.original_language}
                  </div>

                  <div>
                    <span className="text-[gray]">Votes: </span>
                    {movie?.vote_count}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </Modal>
    );
  };

  const memoedValue = useMemo(
    () => ({
      openModal,
      closeModal,
      renderModal,
      selectedMovie,
      setSelectedMovie,
    }),
    [isModalOpen, selectedMovie, trailer]
  );

  return (
    <ModalContext.Provider value={memoedValue}>
      {children}
    </ModalContext.Provider>
  );
};

export default () => {
  return useContext(ModalContext);
};
