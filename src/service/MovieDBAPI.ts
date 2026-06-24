import axios from "axios";
import type {
    PaginatedResponse,
    Movie,
    PopularPerson,
    GenresResponse,
    MovieCreditsResponse,
    MovieDetails,
    PersonDetails,
    MovieImagesResponse,
    MovieVideosResponse,
    PersonMovieCreditsResponse,
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
    return get<PaginatedResponse<Movie>>(`trending/movie/${period}?&page=${page}&include_adult=false`);
};

export const nowPlayingMovies = (page = 1) => {
    return get<PaginatedResponse<Movie>>(`movie/now_playing?&page=${page}&include_adult=false`);
};

export const topRatedMovies = (page = 1) => {
    return get<PaginatedResponse<Movie>>(`movie/top_rated?&page=${page}&include_adult=false`);
};

export const genresMovies = () => {
    return get<GenresResponse>("/genre/movie/list");
};

export const movieByGenreId = (genreId: number, page = 1) => {
    return get<PaginatedResponse<Movie>>(`/discover/movie?with_genres=${genreId}&page=${page}`);
};

export const movieDetails = (movieId: number) => {
    return get<MovieDetails>(`movie/${movieId}`);
};

export const movieCredits = (movieId: number) => {
    return get<MovieCreditsResponse>(`movie/${movieId}/credits`);
};

export const popularPeople = (page = 1) => {
    return get<PaginatedResponse<PopularPerson>>(`/person/popular?&page=${page}`);
};

export const personDetails = (personId: number) => {
    return get<PersonDetails>(`/person/${personId}`);
};

export const personMovieCredits = (personId: number) => {
    return get<PersonMovieCreditsResponse>(`person/${personId}/movie_credits`);
};

export const personMoviesInvolvedIn = (personId: number) => {
    return get<PaginatedResponse<Movie>>(`/discover/movie?with_people=${personId}`);
};

export const similarMovies = (movieId: number) => {
    return get<PaginatedResponse<Movie>>(`/movie/${movieId}/recommendations`);
};

export const searchMovie = (query: string, page = 1) => {
    return get<PaginatedResponse<Movie>>(`/search/movie?query=${query}&page=${page}`);
};

export const movieImages = (movieId: number) => {
    return get<MovieImagesResponse>(`/movie/${movieId}/images?include_image_language=en,null`);
};

export const movieVideos = (movieId: number) => {
    return get<MovieVideosResponse>(`/movie/${movieId}/videos`);
};

export const upcomingTrailersList = async () => {
    const listData = await get<PaginatedResponse<Movie>>("movie/now_playing?page=1&include_adult=false");

    const topMovies = listData.results.slice(0, 8);

    const moviesWithVideos = await Promise.all(
        topMovies.map(async (movie) => {
            try {
                const videoData = await get<MovieVideosResponse>(`/movie/${movie.id}/videos`);
                return {
                    ...movie,
                    videos: videoData,
                };
            } catch (error) {
                console.error(`Failed to fetch videos for movie ${movie.id}`, error);
                return movie;
            }
        }),
    );

    return {
        ...listData,
        results: moviesWithVideos,
    };
};
