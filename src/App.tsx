import { Route, Routes } from "react-router";
import Navigation from "./components/navbar/Navigation";
import HomePage from "./pages/HomePage";

import MovieDetailsPage from "./pages/MovieDetailsPage";
import PersonDetailsPage from "./pages/PersonDetailsPage";
import GenresPage from "./pages/GenresPage";
import SearchResultPage from "./pages/SearchResultPage";
import NowTrendingMoviesPage from "./pages/NowTrendingMoviesPage";
import NowPlayingMoviesPage from "./pages/NowPlayingMoviesPage";
import TopRatedMoviesPage from "./pages/TopRatedMoviesPage";
import PopularPeoplePage from "./pages/PopularPeoplePage";

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
                <Route path="/popular-people" element={<PopularPeoplePage />} />
                <Route path="/search" element={<SearchResultPage />} />

                <Route path="*" element={<p>Page not found</p>} />
            </Routes>
        </div>
    );
}

export default App;
