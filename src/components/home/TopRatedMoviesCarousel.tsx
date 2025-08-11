import { SwiperSlide } from "swiper/react";
import Swiperjs from "../Swiperjs";
import useTopRatedMovies from "../../movies/hooks/useTopRatedMovies";
import { MovieCarouselCards } from "../MovieCarouselCards";
import LoadingCarouselSpinner from "../LoadingCarouselSpinner";
import ErrorMessage from "../ErrorMessage";
import { Link } from "react-router";

const TopRatedMoviesCarousel = () => {
    const { data, isLoading, isError, error } = useTopRatedMovies();

    if (!data || isLoading) return <LoadingCarouselSpinner />;
    if (isError) return <ErrorMessage message={error.message} />;

    return (
        <section className="top-rated-carousel-section">
            <div className="top-rated-header-container">
                <h2 className="section-title-header my-0">Top Rated</h2>

                <Link to="/top-rated" className="trending-carousel-explore-all">
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

export default TopRatedMoviesCarousel;
