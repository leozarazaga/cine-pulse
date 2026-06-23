import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink } from "react-router";
import navbarLogo from "../../assets/images/TMDB-logo.svg";
import { useGenres } from "../../hooks/useMovieQueries";
import "../../styles/navbar.css";

const Navigation = () => {
    const [showMovies, setShowMovies] = useState(false);
    const [showPeople, setShowPeople] = useState(false);
    const [showGenres, setShowGenres] = useState(false);
    const { data, isLoading, isError } = useGenres();

    return (
        <Navbar expand="lg" className="navbar-container" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to={"/"} className="navbar-brand-wrapper">
                    <img src={navbarLogo} alt="The Movie Database Logo" className="navbar-logo" />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="me-auto navbar-links-nav">
                        <NavDropdown
                            title={<span className="navbar-menu-title">Movies</span>}
                            id="movies-dropdown"
                            show={showMovies}
                            onMouseEnter={() => setShowMovies(true)}
                            onMouseLeave={() => setShowMovies(false)}
                            renderMenuOnMount
                            className="premium-dropdown"
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
                            title={<span className="navbar-menu-title">Actors</span>}
                            id="people-dropdown"
                            show={showPeople}
                            onMouseEnter={() => setShowPeople(true)}
                            onMouseLeave={() => setShowPeople(false)}
                            renderMenuOnMount
                            className="premium-dropdown"
                        >
                            <NavDropdown.Item as={NavLink} to="/popular-people">
                                Popular Actors
                            </NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown
                            title={<span className="navbar-menu-title">Genres</span>}
                            id="genres-dropdown"
                            show={showGenres}
                            onMouseEnter={() => setShowGenres(true)}
                            onMouseLeave={() => setShowGenres(false)}
                            renderMenuOnMount
                            className="premium-dropdown genre-megamenu"
                        >
                            <div className="premium-menu-grid">
                                {!isLoading &&
                                    !isError &&
                                    data?.genres.map((genre) => (
                                        <NavDropdown.Item key={genre.id} as={NavLink} to={`/genre/${genre.id}`} className="grid-dropdown-item">
                                            {genre.name}
                                        </NavDropdown.Item>
                                    ))}
                            </div>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
