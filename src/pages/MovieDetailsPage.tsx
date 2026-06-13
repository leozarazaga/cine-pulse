import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { SwiperSlide } from "swiper/react";
import { ActorsCarouselCards } from "../components/ActorsCarouselCards";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { MovieCarouselCards } from "../components/MovieCarouselCards";
import RecentlyViewedMovies from "../components/RecentlyViewedMovies";
import Swiperjs from "../components/Swiperjs";
import useRecentViewedMovies from "../contexts/history/useRecentViewedMovies";
import { useMovieCredits, useMovieDetails, useMovieImages, useSimilarMovies } from "../hooks/useMovieQueries";
import "../styles/movie-details-page.css";

const MovieDetailsPage = () => {
    const { id } = useParams();
    const movieId = Number(id);

    const { addToRecentlyViewed } = useRecentViewedMovies();

    const { data: movieData, isLoading: isMovieLoading, isError: isMovieError, error: movieError } = useMovieDetails(movieId);
    const { data: creditsData, isLoading: isCreditsLoading, isError: isCreditsError, error: creditsError } = useMovieCredits(movieId);
    const { data: similarMovieData, isLoading: similarMovieisLoading, isError: isSimilarError, error: similarError } = useSimilarMovies(movieId);
    const { data: imagesData, isLoading: isImagesLoading, isError: isImagesError, error: imagesError } = useMovieImages(movieId);

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

    if (isMovieError) return <ErrorMessage message={movieError.message} />;
    if (isCreditsError) return <ErrorMessage message={creditsError.message} />;
    if (isSimilarError) return <ErrorMessage message={similarError.message} />;
    if (isImagesError) return <ErrorMessage message={imagesError.message} />;

    const releaseYear = movieData.release_date.slice(0, 4);

    const sneakPeekBackdrops = imagesData.backdrops.slice(0, 4);
    const topCast = creditsData.cast.slice(0, 6);

    const principalCrew = creditsData.crew.filter((member) => ["Director", "Writer", "Screenplay", "Story"].includes(member.job));

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
                                    {principalCrew.map((member, index) => (
                                        <div key={`${member.credit_id}-${index}`} className="crew-member-block">
                                            <span className="crew-member-name">{member.name}</span>
                                            <span className="crew-member-job">{member.job}</span>
                                        </div>
                                    ))}
                                </div>
                             )}
                        </Col>

                        {/* =============== SCENES & TOP CAST =============== */}
                        <Col lg={12}>
                            {/* Scenes Images */}
                            {sneakPeekBackdrops.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="movie-section-label">Scenes</h4>
                                    <div className="mini-poster-grid">
                                        {sneakPeekBackdrops.map((image, index) => (
                                            <a
                                                href={`https://image.tmdb.org/t/p/original${image.file_path}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                key={index}
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

                            {/* Top Cast */}
                            {topCast.length > 0 && (
                                <div>
                                    <h4 className="movie-section-label">Top Cast</h4>
                                    <div className="cast-circles-container">
                                        {topCast.map((actor) => (
                                            <Link to={`/person/${actor.id}`} key={actor.id} className="cast-circle-item">
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

            {/* ================= LOWER CONTENT CAROUSELS ================= */}
            <section className="carousel-section my-5">
                <Container>
                    <h4 className="mb-4 fw-bold">Full Cast</h4>
                    <Swiperjs breakpoints={{ 320: { slidesPerView: 3.5 }, 1024: { slidesPerView: 6.5 } }}>
                        {creditsData.cast.map((actor) => (
                            <SwiperSlide key={actor.id}>
                                <ActorsCarouselCards actor={actor} />
                            </SwiperSlide>
                        ))}
                    </Swiperjs>
                </Container>
            </section>

            <section className="carousel-section my-5">
                <Container>
                    <h4 className="mb-4 fw-bold">Similar Movies</h4>
                    <Swiperjs breakpoints={{ 320: { slidesPerView: 3.5 }, 1024: { slidesPerView: 6.5 } }}>
                        {similarMovieData.results.map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <MovieCarouselCards movie={movie} />
                            </SwiperSlide>
                        ))}
                    </Swiperjs>
                </Container>
            </section>

            <section className="my-5">
                <Container>
                    <RecentlyViewedMovies />
                </Container>
            </section>
        </>
    );
};

export default MovieDetailsPage;