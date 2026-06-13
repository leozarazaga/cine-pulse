import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import useTrendingPeriod from "../../contexts/period/useTrendingPeriod";
import { useTrendingMovies } from "../../hooks/useMovieQueries";
import { trendingMovies } from "../../service/MovieDBAPI";
import "../../styles/movie-carousel.css";
import MovieCarousel from "./MovieCarousel";

const TrendingMoviesCarousel = () => {
    const { trendingPeriod, setTrendingPeriod } = useTrendingPeriod();
    const trendingQuery = useTrendingMovies(trendingPeriod, 1);
    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.prefetchQuery({
            queryKey: ["trending-movies", "day", 1],
            queryFn: () => trendingMovies("day", 1),
        });

        queryClient.prefetchQuery({
            queryKey: ["trending-movies", "week", 1],
            queryFn: () => trendingMovies("week", 1),
        });
    }, [queryClient]);

    return (
        <MovieCarousel title="Trending" exploreLink="/trending" query={trendingQuery} sectionClassName="trending-movies-background">
            <div className="trending-buttons-wrapper">
                <div className={`toggle-background ${trendingPeriod === "week" ? "right" : "left"}`} />
                <button className={trendingPeriod === "day" ? "active" : ""} onClick={() => setTrendingPeriod("day")}>
                    Today
                </button>
                <button className={trendingPeriod === "week" ? "active" : ""} onClick={() => setTrendingPeriod("week")}>
                    This Week
                </button>
            </div>
        </MovieCarousel>
    );
};

export default TrendingMoviesCarousel;
