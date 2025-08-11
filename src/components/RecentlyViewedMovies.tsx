import { SwiperSlide } from "swiper/react";
import useRecentViewedMovies from "../movies/hooks/useRecentViewedMovies";
import Swiperjs from "./Swiperjs";
import { Link } from "react-router";

const RecentlyViewedMovies = () => {
    const { recentlyViewed } = useRecentViewedMovies();

    return (
        <div>
            {recentlyViewed.length > 0 && <h2 className="section-title-header">Recently Viewed Movies</h2>}
            
            <Swiperjs>
                {recentlyViewed.map((movie) => (
                    <SwiperSlide>
                        <Link to={`/movie/${movie.id}`}>
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                                style={{ borderRadius: "12px", width: "100%" }}
                            />
                        </Link>
                        <p className="movie-carousel-title">{movie.title}</p>
                    </SwiperSlide>
                ))}
            </Swiperjs> 
        </div>
    );
};

export default RecentlyViewedMovies;
