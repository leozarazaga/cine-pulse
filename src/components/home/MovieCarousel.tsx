import type { UseQueryResult } from "@tanstack/react-query";
import { Link } from "react-router";
import { SwiperSlide } from "swiper/react";
import type { Movie, PaginatedResponse } from "../../types/MovieDBTypes";
import ErrorMessage from "../ErrorMessage";
import LoadingCarouselSpinner from "../LoadingCarouselSpinner";
import { MovieCarouselCards } from "../MovieCarouselCards";
import Swiperjs from "../Swiperjs";

interface MovieCarouselProps {
    title: string;
    exploreLink: string;
    query: UseQueryResult<PaginatedResponse<Movie>, Error>;
    sectionClassName?: string;
    headerClassName?: string; 
    titleGroupClassName?: string; 
    children?: React.ReactNode;
}

const MovieCarousel = ({
    title,
    exploreLink,
    query,
    sectionClassName = "carousel-section",
    headerClassName = "carousel-header-container",
    titleGroupClassName = "title-button-group",
    children,
}: MovieCarouselProps) => {
    const { data, isLoading, isError, error } = query;

    if (!data || isLoading) return <LoadingCarouselSpinner />;
    if (isError) return <ErrorMessage message={error.message} />;

    return (
        <section className={sectionClassName}>
            <div className={headerClassName}>
                <div className={titleGroupClassName}>
                    <h2 className="section-title-header my-0">{title}</h2>
                    {children}
                </div>

                <Link to={exploreLink} className="carousel-explore-all">
                    Explore All <span>&#65125;</span>
                </Link>
            </div>

            <Swiperjs  breakpoints={{ 320: { slidesPerView: 2 }, 1024: { slidesPerView: 6.5 } }}>
                {data.results.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <MovieCarouselCards movie={movie} />
                    </SwiperSlide>
                ))}
            </Swiperjs>
        </section>
    );
};

export default MovieCarousel;
