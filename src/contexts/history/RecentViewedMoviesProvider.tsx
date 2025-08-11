import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { RecentViewedMoviesContext, type ViewedMovie } from "./RecentViewedMoviesContext";

interface RecentViewedMoviesProviderProps {
    children: React.ReactNode;
}

const RecentViewedMoviesProvider: React.FC<RecentViewedMoviesProviderProps> = ({ children }) => {
    const [recentlyViewed, setRecentlyViewed] = useState<ViewedMovie[]>(() => {
        const stored = localStorage.getItem("recentlyViewed");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
    }, [recentlyViewed]);

    const addToRecentlyViewed = useCallback((movie: ViewedMovie) => {
        setRecentlyViewed((films) => {
            const filtered = films.filter((film) => film.id !== movie.id);
            return [movie, ...filtered].slice(0, 10);
        });
    }, []);

    return <RecentViewedMoviesContext.Provider value={{ recentlyViewed, addToRecentlyViewed }}>{children}</RecentViewedMoviesContext.Provider>;
};

export default RecentViewedMoviesProvider;
