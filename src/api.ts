/*
TMDB
main : https://www.themoviedb.org/?language=ko
for developers : https://developers.themoviedb.org/3/
*/
const API_KEY = "ddc787342ec23589c7fd7628051f7842";
const BASE_PATH = "https://api.themoviedb.org/3";

//Movie interface
interface IMovie {
  id: number;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  title: string;
  release_date?: string;
  vote_average?: number;
  name?: string;
  media_type: string;
}
export interface IGetMovies {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

// tv interface
interface ITv {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  first_air_date: string;
}
export interface IgetTv {
  page: number;
  results: ITv[];
  total_pages: number;
  total_results: number;
}
// detail interface
interface Igenres {
  id: number;
  name: string;
}
export interface IDetail {
  release_date: string;
  revenue: number;
  runtime: number;
  title: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  genres: Igenres[];
  backdrop_path: string;
  name: string;
}

// search interface

export interface ISearchResult {
  page: number;
  results: IMovie[];
}

//Movie
export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=en-US-KR&page=1`
  ).then((response) => response.json());
}
export function topMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
}
export function upcomingMovie() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=en-US-KR&page=3`
  ).then((response) => response.json());
}

//Tv
export function getTv() {
  return fetch(
    `${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
}
export function getPopularTv() {
  return fetch(
    `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=en-US&page=4`
  ).then((response) => response.json());
}
export function getTop_ratedTv() {
  return fetch(
    `${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}

// details
export function getDetailsMovies(movieId: string) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => response.json());
}

export function getDetailsTv(tvId: string) {
  return fetch(
    `${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}&language=en-US`
  ).then((response) => response.json());
}

// search

export function searchAll(keyword: string | null) {
  return fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&language=en-US&query=${keyword}`
  ).then((response) => response.json());
}
