import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router";
import { useNowPlayingMovies } from "../../hooks/useMovieQueries";
import "../../styles/hero-section.css";
import ErrorMessage from "../ui/ErrorMessage";
import SearchForm from "../search/SearchForm";

const HeroSection = () => {
    const { data, isLoading, isError, error } = useNowPlayingMovies();
    const [backdropPath, setBackdropPath] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!data || data.results.length === 0) return;
        
        // Ensure we only pick movies that actually have a backdrop image
        const validMovies = data.results.filter(movie => movie.backdrop_path);
        if (validMovies.length === 0) return;

        const randomIndex = Math.floor(Math.random() * validMovies.length);
        setBackdropPath(validMovies[randomIndex].backdrop_path);
    }, [data]);

    if (!data || isLoading) return <div className="hero-container" style={{ backgroundColor: '#032541' }} />;
    if (isError) return <ErrorMessage message={error.message} />;
    if (!backdropPath) return null;

    return (
        <header className="hero-container">
            <img 
                src={`https://image.tmdb.org/t/p/w1280${backdropPath}`} 
                alt="Movie Backdrop" 
                className="hero-image" 
            />

            <section className="hero-overlay">
                <Container>
                    <div className="hero-content">
                        <h1 className="hero-title">Welcome.</h1>
                        <p className="hero-subtitle">Millions of movies to discover. Explore now!</p>
                        
                        <div className="hero-search-wrapper">
                            <SearchForm 
                                onSearch={(query) => navigate(`/search?query=${query}&page=1`)} 
                                searchCategory="movie" 
                            />
                        </div>
                    </div>
                </Container>
            </section>
        </header>
    );
};

export default HeroSection;