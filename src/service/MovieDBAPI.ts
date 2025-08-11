import axios from "axios";
import type {
    GenresResponse,
    MovieCreditsResponse,
    MovieDetails,
    MoviesByGenreResponse,
    MoviesInvolvedInResponse,
    NowPlayingMoviesResponse,
    PersonDetails,
    PopularPeopleResponse,
    SearchMovieResponse,
    SimilarMoviesResponse,
    TopRatedMoviesResponse,
    TrendingMoviesResponse,
} from "../types/MovieDBTypes";

const BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

if (!BEARER_TOKEN) {
  throw new Error("Missing TMDB Bearer Token in environment variables");
}

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

const get = async <T>(endpoint: string) => {
    const res = await instance.get<T>(endpoint);
    return res.data;
};

export const trendingMovies = (period: "day" | "week", page = 1) => {
    return get<TrendingMoviesResponse>(`trending/movie/${period}?&page=${page}&include_adult=false`);
};

export const nowPlayingMovies = (page = 1) => {
    return get<NowPlayingMoviesResponse>(`movie/now_playing?&page=${page}&include_adult=false`);
};

export const topRatedMovies = (page = 1) => {
    return get<TopRatedMoviesResponse>(`movie/top_rated?&page=${page}&include_adult=false`);
};

export const genresMovies = () => {
    return get<GenresResponse>("/genre/movie/list?include_adult=false");
};

export const movieByGenreId = (genreId: number, page = 1) => {
    return get<MoviesByGenreResponse>(`/discover/movie?with_genres=${genreId}&page=${page}`);
};

export const movieDetails = (movieId: number) => {
    return get<MovieDetails>(`movie/${movieId}`);
};

export const movieCredits = (movieId: number) => {
    return get<MovieCreditsResponse>(`movie/${movieId}/credits`);
};

export const popularPeople = (page= 1) => {
    return get<PopularPeopleResponse>(`/person/popular?&page=${page}`)
}

export const personDetails = (personId: number) => {
    return get<PersonDetails>(`/person/${personId}`);
};

export const personMoviesInvolvedIn = (personId: number) => {
    return get<MoviesInvolvedInResponse>(`/discover/movie?with_people=${personId}`);
};

export const similarMovies = (movieId: number) => {
    return get<SimilarMoviesResponse>(`/movie/${movieId}/similar`);
};

export const searchMovie = (query: string, page = 1) => {
    return get<SearchMovieResponse>(`/search/movie?query=${query}&page=${page}`);
};
