import { useContext } from "react";
import { RecentViewedMoviesContext } from "../../contexts/history/RecentViewedMoviesContext";

const useRecentViewedMovies = () => {
    const viewedContext = useContext(RecentViewedMoviesContext);

    if (!viewedContext) {
        throw new Error("ViewedContext must be used inside a RecentViewedMoviesProvider");
    }
    return viewedContext;
};

export default useRecentViewedMovies;
