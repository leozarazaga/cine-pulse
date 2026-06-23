// MovieCarousel.tsx
import type { UseQueryResult } from "@tanstack/react-query";
import { Link } from "react-router";
import { SwiperSlide } from "swiper/react";
import type { Movie, PaginatedResponse } from "../../types/MovieDBTypes";
import ErrorMessage from "../ErrorMessage";
import { MovieCarouselCards } from "../MovieCarouselCards";
import { MovieCardSkeleton } from "../MovieCardSkeleton"; // Import skeleton card
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

    if (isError) return <ErrorMessage message={error.message} />;

    const skeletonItems = Array.from({ length: 7 });

    return (
        <section className={sectionClassName}>
            <div className="carousel-header-wrapper">
                <div className={headerClassName} style={{ margin: 0, width: "100%" }}>
                    <div className={titleGroupClassName}>
                        <h2 className="carousel-header-title">{title}</h2>
                        {children}
                    </div>

                    <Link to={exploreLink} className="carousel-explore-all">
                        Explore All
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </Link>
                </div>
            </div>

            <Swiperjs breakpoints={{ 320: { slidesPerView: 3.5 }, 1024: { slidesPerView: 7.5 } }}>
                {isLoading
                    ? skeletonItems.map((_, index) => (
                          <SwiperSlide key={`skeleton-${index}`}>
                              <MovieCardSkeleton />
                          </SwiperSlide>
                      ))
                    : data?.results.map((movie) => (
                          <SwiperSlide key={movie.id}>
                              <MovieCarouselCards movie={movie} />
                          </SwiperSlide>
                      ))}
            </Swiperjs>
        </section>
    );
};

export default MovieCarousel;
