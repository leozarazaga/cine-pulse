import Container from "react-bootstrap/esm/Container";
import MovieCarousel from "../components/home/MovieCarousel";
import TrendingMoviesCarousel from "../components/home/TrendingMoviesCarousel";
import LatestTrailers from "../components/LatestTrailers";
import HeroSection from "../components/navbar/HeroSection";
import RecentlyViewedMovies from "../components/RecentlyViewedMovies";
import { useNowPlayingMovies } from "../hooks/useMovieQueries";

const HomePage = () => {
    const nowPlayingQuery = useNowPlayingMovies();

    return (
        <div>
            <title>Home</title>

            <HeroSection />

            <TrendingMoviesCarousel />

            <LatestTrailers />

            <Container>
                <MovieCarousel title="Now Playing" exploreLink="/now-playing" query={nowPlayingQuery} />
            </Container>

            <RecentlyViewedMovies />
        </div>
    );
};

export default HomePage;
