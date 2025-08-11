import { Link } from "react-router";
import type { MovieCard } from "../types/MovieDBTypes";
import { isoToFormattedString } from "../utils/formatDate";

interface MovieCardProps {
    movie: MovieCard;
}
export const MovieCarouselCards: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <div className="movie-carousel-container">
            <Link to={`/movie/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} style={{ borderRadius: "12px", width: "100%" }} />
            </Link>
            <p className="movie-carousel-title">{movie.title}</p>
            <span className="movie-carousel-date">
                {isoToFormattedString(movie.release_date)}
            </span>
        </div>
    );
};
