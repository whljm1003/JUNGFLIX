import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { getMovies, IGetMovies, topMovies, upcomingMovie } from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
import Details from "../Components/details";
const Wrapper = styled.div`
  background: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
  font-weight: 400;
  color: ${(props) => props.theme.white.darker};
`;

const Overview = styled.p`
  font-size: 35px;
  width: 50%;
  color: ${(props) => props.theme.white.darker};
`;

const Slider = styled.div`
  position: relative;
  top: -120px;
  height: 35vh;
  /* padding-left: 60px; */
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 5px;
  border: 2px solid red;
  grid-template-columns: repeat(6, 1fr);
  position: absolute;
  width: 100%;
`;

const RowTitle = styled.h2`
  font-weight: 600;
  font-size: 32px;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 30vh;
  font-size: 66px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 20px;
  background-color: ${(props) => props.theme.black.darker};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 14px;
  }
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
`;

const NextBtn = styled.div`
  width: 50px;
  height: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  cursor: pointer;
`;

const rowVariants = {
  hidden: {
    // window.outerWidth => 사용자 컴퓨터 길이
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  nomal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -80,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};
const offset = 6;

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
              <RowTitle>LATEST</RowTitle>
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
              <RowTitle>TOP</RowTitle>
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
              <RowTitle>UP COMING</RowTitle>
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
