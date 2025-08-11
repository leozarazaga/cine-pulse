import { Route, Routes } from "react-router";
import Navigation from "./components/navbar/Navigation";
import HomePage from "./movies/pages/HomePage";

import MovieDetailsPage from "./movies/pages/MovieDetailsPage";
import PersonDetailsPage from "./movies/pages/PersonDetailsPage";
import GenresPage from "./movies/pages/GenresPage";
import SearchResultPage from "./movies/pages/SearchResultPage";
import NowTrendingMoviesPage from "./movies/pages/NowTrendingMoviesPage";
import NowPlayingMoviesPage from "./movies/pages/NowPlayingMoviesPage";
import TopRatedMoviesPage from "./movies/pages/TopRatedMoviesPage";
import PopularPeoplePage from "./movies/pages/PopularPeoplePage";

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
