import axios from "axios";
import { Genre, Movie } from "../models";

type TMDBResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

const BASE_URL_API = "https://api.themoviedb.org/3";
const API_KEY = "d60b9236200ea914f0975a476ecdbd79";

const DEFAULT_SEARCH_PARAMS = {
  api_key: API_KEY,
  language: "fr-FR",
};

const generateTMDBUrl = (path: string, params: Record<string, string>) => {
  const url = new URL(`${BASE_URL_API}${path}`);
  url.search = new URLSearchParams({
    ...DEFAULT_SEARCH_PARAMS,
    ...params,
  }).toString();
  return url.toString();
};

const get = async <T>(url: string) => {
  const response = await axios.get<TMDBResponse<T>>(url);
  return response.data.results;
};

export const getMovies = async (
  page: number,
  genres: number[] = []
): Promise<Movie[]> => {
  return await get<Movie>(
    generateTMDBUrl("/discover/movie", {
      page: page.toString(),
      with_genres: genres.join(","),
    })
  );
};

export const getMovieById = async (movieId: string) => {
  const response = await axios.get<Movie>(
    generateTMDBUrl(`/movie/${movieId}`, {})
  );
  return response.data;
};

export const getGenres = async () => {
  const response = await axios.get<{
    genres: Genre[];
  }>(generateTMDBUrl(`/genre/movie/list`, {}));
  return response.data.genres;
};

export const searchMovies = async (page: number, query: string) => {
  return await get<Movie>(
    generateTMDBUrl("/search/movie", {
      query,
      page: page.toString(),
    })
  );
};
