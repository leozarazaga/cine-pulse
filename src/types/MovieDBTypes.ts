/* ============= GENERICS =============*/

export interface PaginatedResponse<T> {
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

/* ============= ENTITIES =============*/

export interface Movie {
    id: number;
    title: string;
    original_title: string;
    original_language: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    popularity: number;
    vote_average: number;
    vote_count: number;
    video: boolean;
    genre_ids: number[];
}

export interface PopularPerson {
    id: number;
    name: string;
    profile_path: string | null;
    known_for: {
        title?: string;
        name?: string;
        original_name?: string;
    }[];
}

export type MovieCard = {
    id: number;
    poster_path: string;
    title: string;
    release_date: string;
};

/* ============= RESPONSES =============*/

export interface Genres {
    id: number;
    name: string;
}

export interface GenresResponse {
    genres: Genres[];
}

export interface MovieDetails {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    tagline: string;
    overview: string;
    release_date: string;
    runtime: number;
    genres: { id: number; name: string }[];
    origin_country: string[];
}

export interface MovieCast {
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
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
    profile_path: string | null;
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
    birthday: string | null;
    deathday: string | null;
    gender: number;
    homepage: string | null;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string | null;
    popularity: number;
    profile_path: string | null;
}

export interface ImageItem {
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
}

export interface MovieImagesResponse {
    id: number;
    backdrops: ImageItem[];
    logos: ImageItem[];
    posters: ImageItem[];
}