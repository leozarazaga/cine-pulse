import Container from "react-bootstrap/esm/Container";
import MovieCarousel from "../components/home/MovieCarousel";
import TrendingMoviesCarousel from "../components/home/TrendingMoviesCarousel";
import HeroSection from "../components/navbar/HeroSection";
import RecentlyViewedMovies from "../components/RecentlyViewedMovies";
import { useNowPlayingMovies, useTopRatedMovies } from "../hooks/useMovieQueries";

const HomePage = () => {
    const nowPlayingQuery = useNowPlayingMovies();
    const topRatedQuery = useTopRatedMovies();

    return (
        <div>
            <title>Home</title>

            <HeroSection />

            <Container>
                <TrendingMoviesCarousel />
                <MovieCarousel title="Now Playing" exploreLink="/now-playing" query={nowPlayingQuery} />
                <MovieCarousel title="Top Rated" exploreLink="/top-rated" query={topRatedQuery} />
                <RecentlyViewedMovies />
            </Container>
        </div>
    );
};

export default HomePage;
