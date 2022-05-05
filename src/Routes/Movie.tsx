import { useQuery } from "react-query";
import { AnimatePresence, useViewportScroll } from "framer-motion";
import { getMovies, IGetMovies, topMovies, upcomingMovie } from "../api";
import { useNavigate, useMatch } from "react-router-dom";
import { Wrapper, Loader, Overlay, BigMovie } from "./layout";
import DetailsCompo from "../Components/DetailsCompo";
import BannerCompo from "../Components/BannerCompo";
import SliderCompo from "../Components/SliderCompo";

function Home() {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId");

  const { scrollY } = useViewportScroll();
  const { data: latestData, isLoading: latestLoading } = useQuery<IGetMovies>(
    ["movies", "latestPlaying"],
    getMovies
  );
  const { data: topData, isLoading: topLoading } = useQuery<IGetMovies>(
    ["movies", "topMovie"],
    topMovies
  );
  const { data: UpcomingData, isLoading: upcomingLoading } =
    useQuery<IGetMovies>(["movies", "upcomingMovie"], upcomingMovie);

  const onOverlayClick = () => navigate("/");

  const loading = latestLoading || topLoading || upcomingLoading;
  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <BannerCompo data={latestData} />
          <SliderCompo data={latestData} title="Latest Movie" />
          <SliderCompo data={topData} title="Top rated" />
          <SliderCompo data={UpcomingData} title="Upcoming" />

          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigMovieMatch.params.movieId}
                >
                  <DetailsCompo />
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
