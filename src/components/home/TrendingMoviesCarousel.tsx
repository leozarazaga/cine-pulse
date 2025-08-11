import "../../styles/trending-movies-carousel.css";

import { SwiperSlide } from "swiper/react";
import { MovieCarouselCards } from "../MovieCarouselCards";
import Swiperjs from "../Swiperjs";
import useTrendingMovies from "../../movies/hooks/useTrendingMovies";
import LoadingCarouselSpinner from "../LoadingCarouselSpinner";
import ErrorMessage from "../ErrorMessage";
import useTrendingPeriod from "../../movies/hooks/useTrendingPeriod";
import { useQueryClient } from "@tanstack/react-query";
import { trendingMovies } from "../../service/MovieDBAPI";
import { useEffect } from "react";
import { Link } from "react-router";

const TrendingMoviesCarousel = () => {
    const { trendingPeriod, setTrendingPeriod } = useTrendingPeriod();
    const { data, isLoading, isError, error } = useTrendingMovies(trendingPeriod, 1);

    // Prefetch: "Today" | "Week"
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

    if (!data || isLoading) return <LoadingCarouselSpinner />;
    if (isError) return <ErrorMessage message={error.message} />;

    return (
        <section className="trending-movies-background">
            <div className="trending-header-container">
                <div className="trending-title-button-group">
                    <h2 className="section-title-header my-0">Trending</h2>

                    <div className="trending-buttons-wrapper">
                        <div className={`toggle-background ${trendingPeriod === "week" ? "right" : "left"}`} />
                        <button className={trendingPeriod === "day" ? "active" : ""} onClick={() => setTrendingPeriod("day")}>
                            Today
                        </button>
                        <button className={trendingPeriod === "week" ? "active" : ""} onClick={() => setTrendingPeriod("week")}>
                            This Week
                        </button>
                    </div>
                </div>

                <Link to="/trending" className="trending-carousel-explore-all">
                    Explore All <span>&#65125;</span>
                </Link>
            </div>

            <Swiperjs>
                {data.results.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <MovieCarouselCards key={movie.id} movie={movie} />
                    </SwiperSlide>
                ))}
            </Swiperjs>
        </section>
    );
};

export default TrendingMoviesCarousel;
