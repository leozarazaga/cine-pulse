import { Route, Routes } from "react-router";
import Navigation from "./components/navbar/Navigation";
import Footer from "./components/ui/Footer";
import GenresPage from "./pages/GenresPage";
import HomePage from "./pages/HomePage";
import MovieCastPage from "./pages/MovieCastPage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import NotFoundPage from "./pages/NotFoundPage";
import NowPlayingMoviesPage from "./pages/NowPlayingMoviesPage";
import NowTrendingMoviesPage from "./pages/NowTrendingMoviesPage";
import PersonDetailsPage from "./pages/PersonDetailsPage";
import PopularPeoplePage from "./pages/PopularPeoplePage";
import SearchResultPage from "./pages/SearchResultPage";
import TopRatedMoviesPage from "./pages/TopRatedMoviesPage";

function App() {
    return (
        <div>
            <Navigation />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/trending" element={<NowTrendingMoviesPage />} />
                <Route path="/now-playing" element={<NowPlayingMoviesPage />} />
                <Route path="/top-rated" element={<TopRatedMoviesPage />} />
                <Route path="/genre/:id" element={<GenresPage />} />
                <Route path="/movie/:id" element={<MovieDetailsPage />} />
                <Route path="/person/:id" element={<PersonDetailsPage />} />
                <Route path="/movie/:id/cast" element={<MovieCastPage />} />
                <Route path="/popular-people" element={<PopularPeoplePage />} />
                <Route path="/search" element={<SearchResultPage />} />

                <Route path="*" element={<NotFoundPage/>} />
            </Routes>

            <Footer/>
        </div>
    );
}

export default App;
