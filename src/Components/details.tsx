import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { useRouteMatch } from "react-router-dom";
import { getDetailsMovies, getDetailsTv, IDetail } from "../api";
import { useQuery } from "react-query";
import { makeImagePath } from "../utils";

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
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

const BigOverview = styled.p`
  margin-top: 20px;
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
  font-size: 40px;
  @media screen and (max-width: 1440px) {
    font-size: 25px;
  }
`;

const DetailItems = styled.ul`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 85px;
`;

const DetailItem = styled.li`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 500;
  margin: 0 5px;
  color: ${(props) => props.theme.white.lighter};
  border: 2px solid ${(props) => props.theme.white.darker};
  border-radius: 13px;
`;

function Details() {
  const bigMoviesMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const bigtvMatch = useRouteMatch<{ movieId: string }>("/tv/:movieId");

  const { data, isLoading } = useQuery<IDetail>(["tv"], () =>
    bigMoviesMatch?.params.movieId
      ? getDetailsMovies(bigMoviesMatch?.params.movieId as string)
      : getDetailsTv(bigtvMatch?.params.movieId as string)
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
              <BigOverview>{data.overview}</BigOverview>
              <DetailItems>
                <DetailItem>{data.release_date}</DetailItem>
                <DetailItem>{`runtime ${data.runtime}`}</DetailItem>
                <DetailItem>{`average ${data.vote_average}`}</DetailItem>
                <DetailItem>{`count ${data.vote_count}`}</DetailItem>
              </DetailItems>
            </>
          )}
        </AnimatePresence>
      )}
      ;
    </>
  );
}

export default Details;
