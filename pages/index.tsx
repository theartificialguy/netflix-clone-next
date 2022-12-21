import Banner from "../components/Banner";
import Head from "next/head";

import Header from "../components/Header";
import Row from "../components/Row";
import { Movie } from "../types";
import apis from "../utils/api";
import useModal from "../hooks/useModal";
// import useAuth from "../hooks/useAuth";

interface Props {
  trending: Movie[];
  netflixOriginals: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
}

const Home = ({
  trending,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  netflixOriginals,
  romanceMovies,
  topRated,
}: Props) => {
  // const { loading } = useAuth();
  const { renderModal, selectedMovie } = useModal();
  console.log('movie: ', selectedMovie);
  // const subscription = false;

  // if (loading || subscription === null) return null;

  // if (!subscription) return <div>Plans</div>

  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>Netflix - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />

      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-12">
        <Banner netflixOriginals={netflixOriginals} />

        <section className="space-y-6 md:space-y-12">
          <Row title="Trending" movies={trending} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action" movies={actionMovies} />
          <Row title="Comedy" movies={comedyMovies} />
          <Row title="Horror" movies={horrorMovies} />
          <Row title="Romance" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>

      {/* Modal */}
      {renderModal(selectedMovie)}
    </div>
  );
};

export default Home;

// server side rendering -> can only be done in pages (pages under pages/), not in components.
export const getServerSideProps = async () => {
  const trendingPromise = fetch(apis.fetchTrending).then((res) => res.json());
  const netflixOriginalsPromise = fetch(apis.fetchNetflixOriginals).then(
    (res) => res.json()
  );
  const topRatedPromise = fetch(apis.fetchTopRated).then((res) => res.json());
  const actionMoviesPromise = fetch(apis.fetchActionMovies).then((res) =>
    res.json()
  );
  const comedyMoviesPromise = fetch(apis.fetchComedyMovies).then((res) =>
    res.json()
  );
  const horrorMoviesPromise = fetch(apis.fetchHorrorMovies).then((res) =>
    res.json()
  );
  const romanceMoviesPromise = fetch(apis.fetchRomanceMovies).then((res) =>
    res.json()
  );
  const documentariesPromise = fetch(apis.fetchDocumentaries).then((res) =>
    res.json()
  );
  const [
    trendingPromiseResult,
    netflixOriginalsPromiseResult,
    topRatedPromiseResult,
    actionMoviesPromiseResult,
    comedyMoviesPromiseResult,
    horrorMoviesPromiseResult,
    romanceMoviesPromiseResult,
    documentariesPromiseResult,
  ] = await Promise.all([
    trendingPromise,
    netflixOriginalsPromise,
    topRatedPromise,
    actionMoviesPromise,
    comedyMoviesPromise,
    horrorMoviesPromise,
    romanceMoviesPromise,
    documentariesPromise,
  ]);

  return {
    props: {
      trending: trendingPromiseResult.results,
      netflixOriginals: netflixOriginalsPromiseResult.results,
      topRated: topRatedPromiseResult.results,
      actionMovies: actionMoviesPromiseResult.results,
      comedyMovies: comedyMoviesPromiseResult.results,
      horrorMovies: horrorMoviesPromiseResult.results,
      romanceMovies: romanceMoviesPromiseResult.results,
      documentaries: documentariesPromiseResult.results,
    },
  };
};
