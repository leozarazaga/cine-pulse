interface DiscoverMovies {
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface DiscoverMoviesResponse {
    results: DiscoverMovies[];
    page: number;
}

/* ============= NOW PLAYING MOVIES =============*/

interface NowPlayingMovies {
    id: number;
    backdrop_path: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface NowPlayingMoviesResponse {
    results: NowPlayingMovies[];
    page: number;
    total_pages: number;
    total_results: number;
}

/* ============= TRENDING MOVIES =============*/

interface TrendingMovies {
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string;
    original_language: string;
    release_date: string;
}

export interface TrendingMoviesResponse {
    results: TrendingMovies[];
    page: number;
    total_pages: number;
    total_results: number;
}

/* ============= TOP RATED MOVIES =============*/

interface TopRatedMovies {
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: false;
    vote_average: number;
    vote_count: number;
}

export interface TopRatedMoviesResponse {
    results: TopRatedMovies[];
    page: number;
    total_pages: number;
    total_results: number;
}

/* ============= GENRES =============*/

interface Genres {
    id: number;
    name: string;
}

export interface GenresResponse {
    genres: Genres[];
}

/* ============= MOVIE CARD =============*/

export type MovieCard = {
    id: number;
    poster_path: string;
    title: string;
    release_date: string;
};

/* ============= MOVIE =============*/

interface Movie {
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MoviesByGenreResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

/* ============= MOVIE DETAILS =============*/

export interface MovieDetails {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    tagline: string;
    overview: string;
    release_date: string;
    runtime: number;
    genres: { id: number; name: string }[];
    origin_country: string[];
}

/* ============= MOVIE CREDITS (CAST / CREW) =============*/

export interface MovieCast {
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}
export interface MovieCrew {
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    credit_id: string;
    department: string;
    job: string;
}

export interface MovieCreditsResponse {
    id: number;
    cast: MovieCast[];
    crew: MovieCrew[];
}

export interface PersonDetails {
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string;
    gender: number;
    homepage: string;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
}

/* ============= MOVIES INVOLVED IN =============*/

interface MoviesInvolvedIn {
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: false;
    vote_average: number;
    vote_count: number;
}

export interface MoviesInvolvedInResponse {
    results: MoviesInvolvedIn[];
}

/* ============= SIMILAR MOVIES OF THAT MOVIE =============*/

interface SimilarMovies {
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: false;
    vote_average: number;
    vote_count: number;
}

export interface SimilarMoviesResponse {
    results: SimilarMovies[];
}

/* ============= SEARCH FOR A MOVIE =============*/

interface SearchMovie {
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface SearchMovieResponse {
    results: SearchMovie[];
    page: number;
    total_pages: number;
    total_results: number;
}

/* ============= POPULAR PEOPLE =============*/

export interface PopularPeople {
    id: number;
    name: string;
    profile_path: string;
    known_for: {
        title: string | undefined;
        name: string;
        original_name: string;
    }[];
}

export interface PopularPeopleResponse {
    results: PopularPeople[];
    page: number;
    total_pages: number;
    total_results: number;
}
