import { createContext } from "react";

export interface ViewedMovie {
    id: number;
    title: string;
    poster_path: string | null;
}

interface RecentViewedMoviesContextType {
    recentlyViewed: ViewedMovie[];
    addToRecentlyViewed: (movie: ViewedMovie) => void;
}

export const RecentViewedMoviesContext = createContext<RecentViewedMoviesContextType | null>(null);
