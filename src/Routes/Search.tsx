import { AnimatePresence, useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { useNavigate, useMatch } from "react-router-dom";
import { getSearch, IGetSearch } from "../api";
import BannerCompo from "../Components/BannerCompo";
import DetailsCompo from "../Components/DetailsCompo";
import SliderCompo from "../Components/SliderCompo";
import { BigMovie, Loader, Overlay, Wrapper } from "./layout";

function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const { scrollY } = useViewportScroll();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const SearchMovieMatch = useMatch("/search/:movieId");

  const { data, isLoading } = useQuery<IGetSearch>("search", () =>
    getSearch(keyword)
  );
  const onOverlayClick = () => navigate("/search");

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <BannerCompo data={data} />
          <SliderCompo data={data} title="Search" />

          <AnimatePresence>
            {SearchMovieMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={SearchMovieMatch.params.movieId}
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
export default Search;
