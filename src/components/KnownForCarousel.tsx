import { useRef } from "react";
import { Link } from "react-router";
import { Swiper as SwiperCore } from "swiper";
import { SwiperSlide } from "swiper/react";
import type { Movie } from "../types/MovieDBTypes";
import Swiperjs from "./Swiperjs";

interface KnownForCarouselProps {
    movies: Movie[];
}

const KnownForCarousel = ({ movies }: KnownForCarouselProps) => {
    const swiperRef = useRef<SwiperCore | null>(null);

    return (
        <section className="featured-works-section">
            <div className="known-for-header">
                <h2 className="section-header" style={{ marginBottom: 0 }}>
                    Known For
                </h2>
                <div className="carousel-nav-buttons">
                    <button className="custom-nav-btn" onClick={() => swiperRef.current?.slidePrev()}>
                        &larr;
                    </button>
                    <button className="custom-nav-btn" onClick={() => swiperRef.current?.slideNext()}>
                        &rarr;
                    </button>
                </div>
            </div>

            <Swiperjs
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                breakpoints={{ 320: { slidesPerView: 2.5 }, 1024: { slidesPerView: 3.5 } }}
            >
                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div className="editorial-movie-card">
                            <Link to={`/movie/${movie.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} alt={movie.title} />
                            </Link>
                            <p className="editorial-movie-title">{movie.title}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiperjs>
        </section>
    );
};

export default KnownForCarousel;
