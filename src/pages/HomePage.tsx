import LatestTrailers from "../components/home/LatestTrailers";
import MovieCarousel from "../components/home/MovieCarousel";
import PopularActorsCarousel from "../components/home/PopularActorsCarousel";
import RecentlyViewedMovies from "../components/home/RecentlyViewedMovies";
import TrendingMoviesCarousel from "../components/home/TrendingMoviesCarousel";
import HeroSection from "../components/navbar/HeroSection";
import Footer from "../components/ui/Footer";
import { useNowPlayingMovies } from "../hooks/useMovieQueries";

const HomePage = () => {
    const nowPlayingQuery = useNowPlayingMovies();

    return (
        <div>
            <title>TMDB</title>

            <HeroSection />
            <TrendingMoviesCarousel />
            <LatestTrailers />
            <MovieCarousel title="Now Playing" exploreLink="/now-playing" query={nowPlayingQuery} />
            <PopularActorsCarousel />
            <RecentlyViewedMovies />
            <Footer/>
        </div>
    );
};

export default HomePage;
