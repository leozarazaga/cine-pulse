import Container from "react-bootstrap/esm/Container";
import MovieCarousel from "../components/home/MovieCarousel";
import TrendingMoviesCarousel from "../components/home/TrendingMoviesCarousel";
import LatestTrailers from "../components/LatestTrailers";
import HeroSection from "../components/navbar/HeroSection";
import RecentlyViewedMovies from "../components/RecentlyViewedMovies";
import { useNowPlayingMovies } from "../hooks/useMovieQueries";
import PopularActorsCarousel from "../components/PopularActorsCarousel";

const HomePage = () => {
    const nowPlayingQuery = useNowPlayingMovies();

    return (
        <div>
            <title>Home</title>

            <HeroSection />
            <TrendingMoviesCarousel />
            <LatestTrailers />

            <MovieCarousel title="Now Playing" exploreLink="/now-playing" query={nowPlayingQuery} />

            <PopularActorsCarousel />

            <RecentlyViewedMovies />
        </div>
    );
};

export default HomePage;
