import Container from "react-bootstrap/esm/Container";
import HeroSection from "../../components/navbar/HeroSection";
import NowPlayingMoviesCarousel from "../../components/home/NowPlayingMoviesCarousel";
import TopRatedMoviesCarousel from "../../components/home/TopRatedMoviesCarousel";
import TrendingMoviesCarousel from "../../components/home/TrendingMoviesCarousel";
import RecentlyViewedMovies from "../../components/RecentlyViewedMovies";

const HomePage = () => {
    return (
        <div>
            <title>Home</title>
            
            <HeroSection />

            <Container>
                <TrendingMoviesCarousel />
                <NowPlayingMoviesCarousel />
                <TopRatedMoviesCarousel />
                <RecentlyViewedMovies />
            </Container>
        </div>
    );
};

export default HomePage;
