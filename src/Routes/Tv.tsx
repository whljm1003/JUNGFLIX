import { useQuery } from "react-query";
import { AnimatePresence, useViewportScroll } from "framer-motion";
import {
  getOnTheAir,
  getAiringToday,
  IgetTv,
  getPopularTv,
  getTop_ratedTv,
} from "../api";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Wrapper, Loader, Overlay, BigMovie } from "./layout";
import DetailsCompo from "../Components/DetailsCompo";
import BannerCompo from "../Components/BannerCompo";
import SliderCompo from "../Components/SliderCompo";

function Tv() {
  const history = useHistory();
  const bigtvMatch = useRouteMatch<{ movieId: string }>("/tv/:tvId");
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

  const onOverlayClick = () => history.push("/tv");

  const loading =
    onTheAirLoading || TodayLoading || TopLoading || PopularLoading;

  return (
    <Wrapper>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <BannerCompo data={onTheAir} />
          <SliderCompo data={onTheAir} title="Latest Shows" />
          <SliderCompo data={todayTv} title="Airing Today" />
          <SliderCompo data={popularTv} title="Popular" />
          <SliderCompo data={topTv} title="Top Rated" />

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

export default Tv;
