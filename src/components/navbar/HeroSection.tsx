import { useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { useNavigate } from "react-router";
import { useNowPlayingMovies } from "../../movies/hooks/useMovieQueries";
import "../../styles/hero-section.css";
import ErrorMessage from "../ErrorMessage";
import LoadingCarouselSpinner from "../LoadingCarouselSpinner";
import SearchForm from "../SearchForm";

const HeroSection = () => {
    const { data, isLoading, isError, error } = useNowPlayingMovies();
    const [backdropPath, setBackdropPath] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!data) return;
        const randomIndex = Math.floor(Math.random() * data.results.length);
        setBackdropPath(data.results[randomIndex].backdrop_path);
    }, [data]);

    if (!data || isLoading) return <LoadingCarouselSpinner />;
    if (isError) return <ErrorMessage message={error.message} />;

    return (
        <>
            <header className="hero-container">
                <img src={`https://image.tmdb.org/t/p/w1280${backdropPath}`} alt="Backdrop Image" className="hero-image" />

                <section className="hero-overlay">
                    <Container>
                        <div className="hero-content">
                            <h1 className="hero-title">Welcome.</h1>
                            <p>Millions of movies to discover. Explore now!</p>
                            <SearchForm onSearch={(query) => navigate(`/search?query=${query}&page=1`)} searchCategory="movie" />
                        </div>
                    </Container>
                </section>
            </header>
        </>
    );
};

export default HeroSection;
