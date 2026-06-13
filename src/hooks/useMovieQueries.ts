import { useQuery } from "@tanstack/react-query";
import * as service from "../service/MovieDBAPI";

// ====================  LIST QUERIES (PAGINATION) ====================

export const useGenres = () => {
    return useQuery({
        queryKey: ["genres"],
        queryFn: service.genresMovies,
    });
};

export const useNowPlayingMovies = (page = 1) => {
    return useQuery({
        queryKey: ["nowPlayingMovies", page],
        queryFn: () => service.nowPlayingMovies(page),
    });
};

export const useTopRatedMovies = (page = 1) => {
    return useQuery({
        queryKey: ["topRatedMovies", page],
        queryFn: () => service.topRatedMovies(page),
    });
};

export const useTrendingMovies = (period: "day" | "week", page = 1) => {
    return useQuery({
        queryKey: ["trending-movies", period, page],
        queryFn: () => service.trendingMovies(period, page),
        staleTime: 1000 * 60 * 5,
    });
};

export const usePopularPeople = (page = 1) => {
    return useQuery({
        queryKey: ["popular-people", page],
        queryFn: () => service.popularPeople(page),
    });
};

export const useSearchForm = (query: string, page = 1) => {
    return useQuery({
        queryKey: ["search-form", query, page],
        queryFn: () => service.searchMovie(query, page),
    });
};

// ==================== ID-DEPENDENT QUERIES ====================

export const useMovieByGenre = (genreId: number, page = 1) => {
    return useQuery({
        queryKey: ["movie-by-genre", genreId, page],
        queryFn: () => service.movieByGenreId(genreId, page),
    });
};

export const useMovieDetails = (movieId: number) => {
    return useQuery({
        queryKey: ["movie-details", movieId],
        queryFn: () => service.movieDetails(movieId),
    });
};

export const useMovieCredits = (movieId: number) => {
    return useQuery({
        queryKey: ["movie-credits", movieId],
        queryFn: () => service.movieCredits(movieId),
    });
};

export const useSimilarMovies = (movieId: number) => {
    return useQuery({
        queryKey: ["similar-movies", movieId],
        queryFn: () => service.similarMovies(movieId),
    });
};

export const usePersonDetails = (personId: number) => {
    return useQuery({
        queryKey: ["person-details", personId],
        queryFn: () => service.personDetails(personId),
    });
};

export const useMoviesInvolvedIn = (personId: number) => {
    return useQuery({
        queryKey: ["movies-involved", personId],
        queryFn: () => service.personMoviesInvolvedIn(personId),
    });
};
