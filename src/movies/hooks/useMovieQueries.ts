import { useQuery } from "@tanstack/react-query";
import * as api from "../../service/MovieDBAPI";

// ====================  LIST QUERIES (Pagination) ====================

export const useGenres = () => {
    return useQuery({ queryKey: ["genres"], queryFn: api.genresMovies });
};

export const useNowPlayingMovies = (page = 1) => {
    return useQuery({
        queryKey: ["nowPlayingMovies", page],
        queryFn: () => api.nowPlayingMovies(page),
    });
};

export const useTopRatedMovies = (page = 1) => {
    return useQuery({
        queryKey: ["topRatedMovies", page],
        queryFn: () => api.topRatedMovies(page),
    });
};

export const useTrendingMovies = (period: "day" | "week", page = 1) => {
    return useQuery({
        queryKey: ["trending-movies", period, page],
        queryFn: () => api.trendingMovies(period, page),
        staleTime: 1000 * 60 * 5, // 5 minutes cache
    });
};

export const usePopularPeople = (page = 1) => {
    return useQuery({
        queryKey: ["popular-people", page],
        queryFn: () => api.popularPeople(page),
    });
};

export const useSearchForm = (query: string, page = 1) => {
    return useQuery({
        //enabled: !!query,
        queryKey: ["search-form", query, page],
        queryFn: () => api.searchMovie(query, page),
    });
};

// ==================== ID-DEPENDENT QUERIES ====================

export const useMovieByGenre = (genreId: number, page = 1) => {
    return useQuery({
        queryKey: ["movie-by-genre", genreId, page],
        queryFn: () => api.movieByGenreId(genreId, page),
    });
};

export const useMovieDetails = (movieId: number) => {
    return useQuery({
        queryKey: ["movie-details", movieId],
        queryFn: () => api.movieDetails(movieId),
    });
};

export const useMovieCredits = (movieId: number) => {
    return useQuery({
        queryKey: ["movie-credits", movieId],
        queryFn: () => api.movieCredits(movieId),
    });
};

export const useSimilarMovies = (movieId: number) => {
    return useQuery({
        queryKey: ["similar-movies", movieId],
        queryFn: () => api.similarMovies(movieId),
    });
};

export const usePersonDetails = (personId: number) => {
    return useQuery({
        queryKey: ["person-details", personId],
        queryFn: () => api.personDetails(personId),
    });
};

export const useMoviesInvolvedIn = (personId: number) => {
    return useQuery({
        queryKey: ["movies-involved", personId],
        queryFn: () => api.personMoviesInvolvedIn(personId),
    });
};
