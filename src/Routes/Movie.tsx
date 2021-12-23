import { useQuery } from "react-query";
import { AnimatePresence, useViewportScroll } from "framer-motion";
import { getMovies, IGetMovies, topMovies, upcomingMovie } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
import Details from "../Components/details";
import {
  Wrapper,
  Loader,
  Banner,
  Title,
  Overview,
  Slider,
  RowTitle,
  Row,
  Box,
  Info,
  NextBtn,
  Overlay,
  BigMovie,
  rowVariants,
  boxVariants,
  infoVariants,
} from "./layout";

const offset = 7;

function Home() {
  const history = useHistory();
  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
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

  const [latestIndex, setLatestIndex] = useState(0);
  const [topIndex, setTopIndex] = useState(0);
  const [upcomingIndex, setUpcomingIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const latestncrease = () => {
    if (latestData) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = latestData.results.length - 1;
      const maxIdex = Math.floor(totalMovies / offset) - 1;
      setLatestIndex((prev) => (prev === maxIdex ? 0 : prev + 1));
    }
  };
  const topIncrease = () => {
    if (latestData) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = latestData.results.length - 1;
      const maxIdex = Math.floor(totalMovies / offset) - 1;
      setTopIndex((prev) => (prev === maxIdex ? 0 : prev + 1));
    }
  };
  const upcomingIncrease = () => {
    if (latestData) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = latestData.results.length - 1;
      const maxIdex = Math.floor(totalMovies / offset) - 1;
      setUpcomingIndex((prev) => (prev === maxIdex ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };
  const onOverlayClick = () => history.push("/");

  const loading = latestLoading || topLoading || upcomingLoading;
  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(latestData?.results[0].backdrop_path || "")}
          >
            <Title>{latestData?.results[0].title}</Title>
            <Overview>{latestData?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <RowTitle>Latest Movie</RowTitle>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={latestIndex}
              >
                {latestData?.results
                  .slice(1)
                  .slice(offset * latestIndex, offset * latestIndex + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      variants={boxVariants}
                      whileHover="hover"
                      initial="nomal"
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <NextBtn onClick={latestncrease}>
              <AiOutlineDoubleRight
                style={{ fontSize: "40px", fontWeight: "500" }}
              />
            </NextBtn>
          </Slider>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <RowTitle>Top rated</RowTitle>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={topIndex}
              >
                {topData?.results
                  .slice(offset * topIndex, offset * topIndex + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      variants={boxVariants}
                      whileHover="hover"
                      initial="nomal"
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.poster_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <NextBtn onClick={topIncrease}>
              <AiOutlineDoubleRight
                style={{ fontSize: "40px", fontWeight: "500" }}
              />
            </NextBtn>
          </Slider>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <RowTitle>Upcoming</RowTitle>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={upcomingIndex}
              >
                {UpcomingData?.results
                  .slice(
                    offset * upcomingIndex,
                    offset * upcomingIndex + offset
                  )
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      variants={boxVariants}
                      whileHover="hover"
                      initial="nomal"
                      onClick={() => onBoxClicked(movie.id)}
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(movie.poster_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <NextBtn onClick={upcomingIncrease}>
              <AiOutlineDoubleRight
                style={{ fontSize: "40px", fontWeight: "500" }}
              />
            </NextBtn>
          </Slider>
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
                  <Details />
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
