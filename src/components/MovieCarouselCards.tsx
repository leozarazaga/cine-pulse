import { Link } from "react-router";
import type { Movie } from "../types/MovieDBTypes";

interface MovieCardProps {
    movie: Movie;
}

export const MovieCarouselCards: React.FC<MovieCardProps> = ({ movie }) => {
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "NR";

    return (
        <div className="movie-carousel-container">
            <Link to={`/movie/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} style={{ borderRadius: "12px", width: "100%" }} />
            </Link>

            <div className="movie-carousel-rating">
                <span className="movie-carousel-star">★</span> {rating}
            </div>

            <p className="movie-carousel-title">{movie.title}</p>
        </div>
    );
};
