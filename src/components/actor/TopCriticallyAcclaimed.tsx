import { Link } from "react-router";
import type { Movie } from "../../types/MovieDBTypes";

interface TopAcclaimedGridProps {
    movies: Movie[];
}

const TopCriticallyAcclaimed = ({ movies }: TopAcclaimedGridProps) => {
    return (
        <section className="mb-5 pb-4">
            <h2 className="section-header">Top Critically Acclaimed</h2>
            <div className="acclaim-grid">
                {movies.map((movie, index) => (
                    <Link to={`/movie/${movie.id}`} key={movie.id} className="acclaim-card">
                        <div className="acclaim-image-wrapper">
                            <img src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} alt={movie.title} />
                            <div className="acclaim-overlay">
                                <span className="acclaim-rank">#{index + 1} Rated</span>
                                <h3 className="acclaim-title">{movie.title}</h3>
                                <div className="acclaim-rating">
                                    <span style={{ color: "#f2ca50", marginRight: "4px" }}>★</span>
                                    {movie.vote_average.toFixed(1)} / 10
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default TopCriticallyAcclaimed;
