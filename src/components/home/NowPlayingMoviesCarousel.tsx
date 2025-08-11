import useNowPlayingMovies from "../../movies/hooks/useNowPlayingMovies";

import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";

import Swiperjs from "../Swiperjs";
import { MovieCarouselCards } from "../MovieCarouselCards";
import LoadingCarouselSpinner from "../LoadingCarouselSpinner";
import ErrorMessage from "../ErrorMessage";
import { Link } from "react-router";

const NowPlayingMoviesCarousel = () => {
    const { data, isLoading, isError, error } = useNowPlayingMovies();

    if (!data || isLoading) return <LoadingCarouselSpinner />;
    if (isError) return <ErrorMessage message={error.message} />;

    return (
        <section className="now-playing-carousel-section">
            <div className="now-playing-header-container">
                <h2 className="section-title-header my-0">Now Playing</h2>

                <Link to="/now-playing" className="trending-carousel-explore-all">
                    Explore All <span>&#65125;</span>
                </Link>
            </div>

            <Swiperjs>
                {data.results.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <MovieCarouselCards movie={movie} />
                    </SwiperSlide>
                ))}
            </Swiperjs>
        </section>
    );
};

export default NowPlayingMoviesCarousel;
