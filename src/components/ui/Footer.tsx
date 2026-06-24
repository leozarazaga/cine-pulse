import { Link } from "react-router";
import tmdbLogo from "../../assets/images/TMDB-logo.svg";
import "../../styles/footer.css";

const ExternalLinkIcon = () => (
    <svg
        className="external-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
        <polyline points="15 3 21 3 21 9"></polyline>
        <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
);

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-main-content">
                    <div className="footer-brand-statement">
                        <span className="footer-pre-heading">TMDB Platform</span>
                        <h2 className="footer-statement-title">
                            Built for the Pure <br />
                            Passion of Cinema.
                        </h2>

                        <div className="footer-action-wrapper">
                            <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="footer-pill-button">
                                Visit TMDB Source
                                <span className="button-arrow">→</span>
                            </a>
                        </div>
                    </div>

                    <div className="footer-grid">
                        <div className="footer-column">
                            <h3 className="footer-heading">Movies</h3>
                            <ul className="footer-links">
                                <li>
                                    <Link to="/trending">Trending</Link>
                                </li>
                                <li>
                                    <Link to="/now-playing">Now Playing</Link>
                                </li>
                                <li>
                                    <Link to="/top-rated">Top Rated</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3 className="footer-heading">Genres</h3>
                            <ul className="footer-links">
                                <li>
                                    <Link to="/genre/28">Action</Link>
                                </li>
                                <li>
                                    <Link to="/genre/35">Comedy</Link>
                                </li>
                                <li>
                                    <Link to="/genre/18">Drama</Link>
                                </li>
                                <li>
                                    <Link to="/genres">All Genres</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3 className="footer-heading">Actors</h3>
                            <ul className="footer-links">
                                <li>
                                    <Link to="/popular-people">Popular Actors</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="footer-column">
                            <h3 className="footer-heading">Legal & API</h3>
                            <ul className="footer-links">
                                <li>
                                    <a href="https://www.themoviedb.org/documentation/api" target="_blank" rel="noreferrer">
                                        API Documentation <ExternalLinkIcon />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.themoviedb.org/documentation/api/terms-of-use" target="_blank" rel="noreferrer">
                                        API Terms of Use <ExternalLinkIcon />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-brand">
                        <img src={tmdbLogo} alt="TMDB Logo" className="footer-logo" />
                    </div>
                    <div className="footer-attribution">This project uses the TMDB API but is not endorsed or certified by TMDB.</div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
