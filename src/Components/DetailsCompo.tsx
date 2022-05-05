import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import { getDetailsMovies, getDetailsTv, IDetail } from "../api";
import { useQuery } from "react-query";
import { makeImagePath } from "../utils";

function DetailsCompo() {
  const bigMoviesMatch = useMatch("/movies/:movieId");
  const bigtvMatch = useMatch("/tv/:tvId");

  const { data, isLoading } = useQuery<IDetail>(["serarch/tv", "movies"], () =>
    bigMoviesMatch?.params.movieId
      ? getDetailsMovies(bigMoviesMatch?.params.movieId as string)
      : getDetailsTv(bigtvMatch?.params.tvId as string)
  );
  return (
    <>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <AnimatePresence>
          {data && (
            <>
              <BigCover
                style={{
                  backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                    data.backdrop_path,
                    "w500"
                  )})`,
                }}
              />
              <BigTitle>{data.name || data.title}</BigTitle>
              <Detailbody>
                <BigOverview>{data.overview || "no story line"}</BigOverview>
                <DetailItems>
                  <DetailItem>
                    release:&nbsp;
                    <Context>
                      {data.release_date?.slice(0, 4) ||
                        data.first_air_date?.slice(0, 4)}
                    </Context>
                  </DetailItem>
                  <DetailItem>
                    runtime:&nbsp;
                    <Context>{`${data.runtime || ""} min`}</Context>
                  </DetailItem>
                  {Math.ceil(data.vote_average) > 8 ? (
                    <DetailItem>grade: ⭐️⭐️⭐️⭐️⭐️</DetailItem>
                  ) : Math.ceil(data.vote_average) > 6 ? (
                    <DetailItem>grade: ⭐️⭐️⭐️⭐️</DetailItem>
                  ) : Math.ceil(data.vote_average) > 4 ? (
                    <DetailItem>grade: ⭐️⭐️⭐️</DetailItem>
                  ) : Math.ceil(data.vote_average) > 2 ? (
                    <DetailItem>grade: ⭐️⭐️</DetailItem>
                  ) : (
                    <DetailItem>grade: ⭐️</DetailItem>
                  )}
                  <DetailItem>
                    genre&nbsp;
                    <Context>
                      {data.genres.slice(0, 2).map((e) => e.name)}
                    </Context>
                  </DetailItem>
                </DetailItems>
              </Detailbody>
            </>
          )}
        </AnimatePresence>
      )}
      ;
    </>
  );
}

export default DetailsCompo;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BigCover = styled.div`
  width: 100%;
  background-size: 100% 100%;
  background-position: center center;
  height: 50vh;
`;
const BigTitle = styled.h4`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 40px;
  position: relative;
  top: -110px;
  font-weight: 400;
  @media screen and (max-width: 1440px) {
    font-size: 28px;
    top: -70px;
  }
`;
const Detailbody = styled.div`
  display: flex;
`;
const BigOverview = styled.div`
  padding: 20px;
  position: relative;
  top: -80px;
  width: 75%;
  color: ${(props) => props.theme.white.lighter};
  font-size: 35px;
  @media screen and (max-width: 1440px) {
    font-size: 23px;
  }
`;
const DetailItems = styled.ul`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 25%;
  margin-top: 20px;
  top: -80px;
  right: 10px;
`;
const DetailItem = styled.li`
  display: flex;
  align-items: center;
  height: 40px;
  font-size: 16px;
  font-weight: 350;
  color: ${(props) => props.theme.white.veryDark};
  border: 1px solid ${(props) => props.theme.white.darker};
  border-radius: 13px;
  margin-bottom: 10px;
  padding-left: 5px;
`;
const Context = styled.p`
  color: ${(props) => props.theme.white.lighter};
`;
