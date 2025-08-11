import "../../styles/navbar.css";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router";

import navbarLogo from "../../assets/images/TMDB-logo.svg";
import useGenres from "../../movies/hooks/useGenres";
import useTheme from "../../movies/hooks/useTheme";
import LoadingSpinner from "../LoadingSpinner";

const Navigation = () => {
    const [showMovies, setShowMovies] = useState(false);
    const [showPeople, setShowPeople] = useState(false);
    const [showGenres, setShowGenres] = useState(false);
    const { data, isLoading, isError, error } = useGenres();

    const { isDarkMode, toggleTheme } = useTheme();

    if (isLoading) return <LoadingSpinner/>
    if (isError) return <p>Error: {error.message} ⛔️</p>;
    if (!data) return;

    return (
        <Navbar expand="lg" className="navbar-container">
            <Container>
                <Navbar.Brand as={Link} to={"/"}>
                    <img src={navbarLogo} alt="The Movie Database Logo" className="navbar-logo" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="me-auto">
                        <NavDropdown
                            title={<span className="text-white fs-6 mx-2">Movies</span>}
                            id="movies-dropdown"
                            show={showMovies}
                            onMouseEnter={() => setShowMovies(true)}
                            onMouseLeave={() => setShowMovies(false)}
                            renderMenuOnMount
                        >
                            <NavDropdown.Item as={NavLink} to="/trending">
                                Trending
                            </NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/now-playing">
                                Now Playing
                            </NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/top-rated">
                                Top Rated
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown
                            title={<span className="text-white fs-6 mx-2">Actors</span>}
                            id="people-dropdown"
                            show={showPeople}
                            onMouseEnter={() => setShowPeople(true)}
                            onMouseLeave={() => setShowPeople(false)}
                            renderMenuOnMount
                        >
                            <NavDropdown.Item as={NavLink} to="/popular-people">
                                Popular Actors
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown
                            title={<span className="text-white fs-6 mx-2">Genres</span>}
                            id="genres-dropdown"
                            show={showGenres}
                            onMouseEnter={() => setShowGenres(true)}
                            onMouseLeave={() => setShowGenres(false)}
                            renderMenuOnMount
                        >
                            {data.genres.map((genre) => (
                                <NavDropdown.Item key={genre.id} as={NavLink} to={`/genre/${genre.id}`}>
                                    {genre.name}
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    </Nav>
                    <div className="ms-auto d-flex align-items-center gap-2">
                        <button onClick={toggleTheme} className="navbar-dark-light-btn">
                            {isDarkMode ? "☀️" : "🌙"}
                        </button>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
