import Container from "react-bootstrap/esm/Container";
import HeroSection from "../../components/navbar/HeroSection";
import TrendingMoviesCarousel from "../../components/home/TrendingMoviesCarousel";
import RecentlyViewedMovies from "../../components/RecentlyViewedMovies";
import MovieCarousel from "../../components/home/MovieCarousel";

import useNowPlayingMovies from "../../movies/hooks/useNowPlayingMovies";
import useTopRatedMovies from "../../movies/hooks/useTopRatedMovies";

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
