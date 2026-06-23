import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { SwiperSlide } from "swiper/react";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { MovieCarouselCards } from "../components/MovieCarouselCards";
import RecentlyViewedMovies from "../components/RecentlyViewedMovies";
import SectionCarousel from "../components/SectionCarousel";
import useRecentViewedMovies from "../contexts/history/useRecentViewedMovies";
import { useMovieCredits, useMovieDetails, useMovieImages, useMovieVideos, useSimilarMovies } from "../hooks/useMovieQueries";
import "../styles/movie-details-page.css";

const MovieDetailsPage = () => {
    const { id } = useParams();
    const movieId = Number(id);

    const { addToRecentlyViewed } = useRecentViewedMovies();

    const { data: movieData, isLoading: isMovieLoading, isError: isMovieError, error: movieError } = useMovieDetails(movieId);
    const { data: creditsData, isLoading: isCreditsLoading, isError: isCreditsError, error: creditsError } = useMovieCredits(movieId);
    const { data: similarMovieData, isLoading: similarMovieisLoading, isError: isSimilarError, error: similarError } = useSimilarMovies(movieId);
    const { data: imagesData, isLoading: isImagesLoading, isError: isImagesError, error: imagesError } = useMovieImages(movieId);
    const { data: videosData, isLoading: isVideosLoading, isError: isVideosError, error: videosError } = useMovieVideos(movieId);

    // Sync History Tracking
    useEffect(() => {
        if (movieData && movieData.id) {
            addToRecentlyViewed({
                id: movieData.id,
                title: movieData.title,
                poster_path: movieData.poster_path || "",
            });
        }
    }, [movieData, addToRecentlyViewed]);

    if (!movieData || isMovieLoading) return <LoadingSpinner />;
    if (!creditsData || isCreditsLoading) return <LoadingSpinner />;
    if (!similarMovieData || similarMovieisLoading) return <LoadingSpinner />;
    if (!imagesData || isImagesLoading) return <LoadingSpinner />;
    if (!videosData || isVideosLoading) return <LoadingSpinner />;

    if (isMovieError) return <ErrorMessage message={movieError.message} />;
    if (isCreditsError) return <ErrorMessage message={creditsError.message} />;
    if (isSimilarError) return <ErrorMessage message={similarError.message} />;
    if (isImagesError) return <ErrorMessage message={imagesError.message} />;
    if (isVideosError) return <ErrorMessage message={videosError.message} />;

    const releaseYear = movieData.release_date.slice(0, 4);

    const sneakPeekBackdrops = imagesData.backdrops.slice(0, 4);
    const topCast = creditsData.cast.slice(0, 7);
    const principalCrew = creditsData.crew.filter((member) => ["Director", "Writer", "Screenplay", "Story"].includes(member.job));
    const trailers = videosData.results.filter((video) => video.site === "YouTube" && video.type === "Trailer").slice(0, 2);

    return (
        <>
            <title>{movieData.title}</title>
            {/* ================= MOVIE HERO ================= */}
            <div className="movie-hero-wrapper" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})` }}>
                <div className="movie-hero-overlay"></div>

                <Container className="movie-hero-content">
                    <Row>
                        {/* =============== MOVIE INFORMATION =============== */}
                        <Col lg={12} className="mb-5">
                            <h1 className="movie-title">{movieData.title}</h1>

                            <div className="movie-metadata mb-3">
                                <span className="movie-rating">
                                    <span className="star">★</span> {movieData.vote_average.toFixed(1)}
                                </span>
                                <span>
                                    {Math.floor(movieData.runtime / 60)}h {movieData.runtime % 60}m
                                </span>
                                <span>{releaseYear}</span>
                                <span>{movieData.genres.map((g) => g.name).join(", ")}</span>
                            </div>

                            {movieData.tagline && <p className="movie-tagline">“{movieData.tagline}”</p>}

                            <p className="movie-overview">{movieData.overview}</p>

                            {/* Movie Credits */}
                            {principalCrew.length > 0 && (
                                <div className="movie-crew-row">
                                    {principalCrew.map((member) => (
                                        <div key={`${member.credit_id}-${member.job}`} className="crew-member-block">
                                            <span className="crew-member-name">{member.name}</span>
                                            <span className="crew-member-job">{member.job}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Col>

                        {/* =============== SCENES =============== */}
                        <Col lg={12}>
                            {sneakPeekBackdrops.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="movie-section-label">Scenes</h4>
                                    <div className="mini-poster-grid">
                                        {sneakPeekBackdrops.map((image, index) => (
                                            <a
                                                href={`https://image.tmdb.org/t/p/original${image.file_path}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                key={image.file_path}
                                            >
                                                <img
                                                    src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                                                    alt={`Scene ${index + 1}`}
                                                    className="mini-backdrop"
                                                />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* =============== TOP CAST =============== */}
                            {topCast.length > 0 && (
                                <div>
                                    <div className="movie-header-wrap">
                                        <Link to={`/movie/${movieData.id}/cast`} className="movie-header-link">
                                            <h4 className="movie-header-title">Top Cast</h4>

                                            <span className="movie-header-counter">
                                                {creditsData.cast.length > 99 ? "99+" : creditsData.cast.length}
                                            </span>

                                            <svg
                                                className="movie-header-chevron"
                                                width="23"
                                                height="23"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <polyline points="9 18 15 12 9 6"></polyline>
                                            </svg>
                                        </Link>
                                    </div>

                                    <div className="cast-circles-container">
                                        {topCast.map((actor) => (
                                            <Link to={`/person/${actor.id}`} key={`${actor.id}-${actor.character}`} className="cast-circle-item">
                                                <img
                                                    src={
                                                        actor.profile_path
                                                            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                                            : "https://via.placeholder.com/150"
                                                    }
                                                    alt={actor.name}
                                                    className="cast-circle-img"
                                                />
                                                <span className="cast-circle-name">{actor.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* ================= VIDEOS SECTION ================= */}
            {trailers.length > 0 && (
                <section className="trailers-section pt-5">
                    <Container>
                        <div className="movie-trailer-wrap">
                            <div style={{ cursor: "default" }}>
                                <h4 className="movie-header-title">Trailer</h4>
                            </div>
                        </div>

                        <Row className="mt-4">
                            {trailers.map((trailer) => (
                                <Col md={6} key={trailer.id} className="mb-4">
                                    <div className="ratio ratio-16x9">
                                        <iframe
                                            src={`https://www.youtube.com/embed/${trailer.key}`}
                                            title={trailer.name}
                                            allowFullScreen
                                            style={{ borderRadius: "8px", border: "none" }}
                                        ></iframe>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </Container>
                </section>
            )}

            {/* ================= LOWER CONTENT CAROUSELS ================= */}
            <section className="carousel-section my-5">
                <Container>
                    <SectionCarousel title="More Like This"  variant="dark" breakpoints={{ 320: { slidesPerView: 3.5 }, 1024: { slidesPerView: 6.5 } }}>
                        {similarMovieData.results.map((movie) => (
                            <SwiperSlide key={`${movie.id}`}>
                                <MovieCarouselCards movie={movie} />
                            </SwiperSlide>
                        ))}
                    </SectionCarousel>
                </Container>
            </section>

            <RecentlyViewedMovies />
        </>
    );
};

export default MovieDetailsPage;
