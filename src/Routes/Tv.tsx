import { useQuery } from "react-query";
import { AnimatePresence, useViewportScroll } from "framer-motion";
import {
  getOnTheAir,
  getAiringToday,
  IgetTv,
  getPopularTv,
  getTop_ratedTv,
} from "../api";
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

function Tv() {
  const history = useHistory();
  const bigtvMatch = useRouteMatch<{ movieId: string }>("/tv/:movieId");
  const { scrollY } = useViewportScroll();

  const { data: onTheAir, isLoading: onTheAirLoading } = useQuery<IgetTv>(
    ["tv", "onTheAir"],
    getOnTheAir
  );
  const { data: todayTv, isLoading: TodayLoading } = useQuery<IgetTv>(
    ["tv", "getTv"],
    getAiringToday
  );
  const { data: popularTv, isLoading: PopularLoading } = useQuery<IgetTv>(
    ["tv", "popularTv"],
    getPopularTv
  );
  const { data: topTv, isLoading: TopLoading } = useQuery<IgetTv>(
    ["tv", "topTv"],
    getTop_ratedTv
  );

  const [onTheAirIndex, setOnTheAirIndex] = useState(0);
  const [todayIndex, setTodayIndex] = useState(0);
  const [popularIndex, setPopularIndex] = useState(0);
  const [topIndex, setTopIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const onTheAirIncrease = () => {
    if (onTheAir) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = onTheAir.results.length - 1;
      const maxIdex = Math.floor(totalMovies / offset) - 1;
      setOnTheAirIndex((prev) => (prev === maxIdex ? 0 : prev + 1));
    }
  };
  const tvIncrease = () => {
    if (todayTv) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = todayTv.results.length - 1;
      const maxIdex = Math.floor(totalMovies / offset) - 1;
      setTodayIndex((prev) => (prev === maxIdex ? 0 : prev + 1));
    }
  };
  const popularIncrease = () => {
    if (popularTv) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = popularTv.results.length - 1;
      const maxIdex = Math.floor(totalMovies / offset) - 1;
      setPopularIndex((prev) => (prev === maxIdex ? 0 : prev + 1));
    }
  };
  const topTvIncrease = () => {
    if (topTv) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = topTv.results.length - 1;
      const maxIdex = Math.floor(totalMovies / offset) - 1;
      setTopIndex((prev) => (prev === maxIdex ? 0 : prev + 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    history.push(`/tv/${movieId}`);
  };
  const onOverlayClick = () => history.push("/tv");

  const loading =
    onTheAirLoading || TodayLoading || TopLoading || PopularLoading;

  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(onTheAir?.results[0].backdrop_path || "")}
          >
            <Title>{onTheAir?.results[0].name}</Title>
            <Overview>{onTheAir?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <RowTitle>Latest Shows</RowTitle>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={onTheAirIndex}
              >
                {onTheAir?.results
                  .slice(1)
                  .slice(
                    offset * onTheAirIndex,
                    offset * onTheAirIndex + offset
                  )
                  .map((tv) => (
                    <Box
                      layoutId={tv.id + ""}
                      key={tv.id}
                      variants={boxVariants}
                      whileHover="hover"
                      initial="nomal"
                      onClick={() => onBoxClicked(tv.id)}
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(tv.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{tv.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <NextBtn onClick={onTheAirIncrease}>
              <AiOutlineDoubleRight
                style={{ fontSize: "40px", fontWeight: "500" }}
              />
            </NextBtn>
          </Slider>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <RowTitle>Airing Today</RowTitle>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={todayIndex}
              >
                {todayTv?.results
                  .slice(offset * todayIndex, offset * todayIndex + offset)
                  .map((tv) => (
                    <Box
                      layoutId={tv.id + ""}
                      key={tv.id}
                      variants={boxVariants}
                      whileHover="hover"
                      initial="nomal"
                      onClick={() => onBoxClicked(tv.id)}
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(tv.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{tv.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <NextBtn onClick={tvIncrease}>
              <AiOutlineDoubleRight
                style={{ fontSize: "40px", fontWeight: "500" }}
              />
            </NextBtn>
          </Slider>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <RowTitle>Popular</RowTitle>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={popularIndex}
              >
                {popularTv?.results
                  .slice(offset * popularIndex, offset * popularIndex + offset)
                  .map((tv) => (
                    <Box
                      layoutId={tv.id + ""}
                      key={tv.id}
                      variants={boxVariants}
                      whileHover="hover"
                      initial="nomal"
                      onClick={() => onBoxClicked(tv.id)}
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(tv.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{tv.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <NextBtn onClick={popularIncrease}>
              <AiOutlineDoubleRight
                style={{ fontSize: "40px", fontWeight: "500" }}
              />
            </NextBtn>
          </Slider>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <RowTitle>Top Rated</RowTitle>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={topIndex}
              >
                {topTv?.results
                  .slice(offset * topIndex, offset * topIndex + offset)
                  .map((tv) => (
                    <Box
                      layoutId={tv.id + ""}
                      key={tv.id}
                      variants={boxVariants}
                      whileHover="hover"
                      initial="nomal"
                      onClick={() => onBoxClicked(tv.id)}
                      transition={{ type: "tween" }}
                      bgphoto={makeImagePath(tv.backdrop_path, "w500")}
                    >
                      <Info variants={infoVariants}>
                        <h4>{tv.name}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
            <NextBtn onClick={topTvIncrease}>
              <AiOutlineDoubleRight
                style={{ fontSize: "40px", fontWeight: "500" }}
              />
            </NextBtn>
          </Slider>
          <AnimatePresence>
            {bigtvMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={bigtvMatch.params.movieId}
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

export default Tv;
