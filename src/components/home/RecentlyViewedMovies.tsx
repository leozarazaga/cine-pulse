import { Container } from "react-bootstrap";
import { Link } from "react-router";
import { SwiperSlide } from "swiper/react";
import useRecentViewedMovies from "../../contexts/history/useRecentViewedMovies";
import SectionCarousel from "../ui/SectionCarousel";

const RecentlyViewedMovies = () => {
    const { recentlyViewed } = useRecentViewedMovies();

    if (recentlyViewed.length === 0) return null;

    return (
        <section className="recently-viewed-section py-5 bg-black text-white position-relative">
            <Container>
                <SectionCarousel title="Recently viewed" variant="light" breakpoints={{ 320: { slidesPerView: 3.5 }, 1024: { slidesPerView: 7.5 } }}>
                    {recentlyViewed.map((movie) => (
                        <SwiperSlide key={movie.id}>
                            <div className="carousel-card">
                                <Link to={`/movie/${movie.id}`}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                                        alt={movie.title}
                                        style={{ borderRadius: "4px" }}
                                    />
                                </Link>
                                <p className="carousel-card-title text-white text-truncate">{movie.title}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </SectionCarousel>
            </Container>
        </section>
    );
};

export default RecentlyViewedMovies;
