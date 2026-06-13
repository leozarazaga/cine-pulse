import { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { SwiperSlide } from "swiper/react";
import { ActorsCarouselCards } from "../components/ActorsCarouselCards";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { MovieCarouselCards } from "../components/MovieCarouselCards";
import RecentlyViewedMovies from "../components/RecentlyViewedMovies";
import Swiperjs from "../components/Swiperjs";
import useRecentViewedMovies from "../contexts/history/useRecentViewedMovies";
import { useMovieCredits, useMovieDetails, useSimilarMovies } from "../hooks/useMovieQueries";
import "../styles/movie-details-page.css";

const MovieDetailsPage = () => {
    const { id } = useParams();
    const movieId = Number(id);

    const { addToRecentlyViewed } = useRecentViewedMovies();

    const { data: movieData, isLoading: isMovieLoading, isError: isMovieError, error: movieError } = useMovieDetails(movieId);
    const { data: creditsData, isLoading: isCreditsLoading, isError: isCreditsError, error: creditsError } = useMovieCredits(movieId);
    const { data: similarMovieData, isLoading: similarMovieisLoading, isError: isSimilarError, error: similarError } = useSimilarMovies(movieId);

    useEffect(() => {
        if (movieData && movieData.id) {
            addToRecentlyViewed({
                id: movieData.id,
                title: movieData.title,
                poster_path: movieData.poster_path,
            });
        }
    }, [movieData, addToRecentlyViewed]);

    if (!movieData || isMovieLoading) return <LoadingSpinner />;
    if (!creditsData || isCreditsLoading) return <LoadingSpinner />;
    if (!similarMovieData || similarMovieisLoading) return <LoadingSpinner />;

    if (isMovieError) return <ErrorMessage message={movieError.message} />;
    if (isCreditsError) return <ErrorMessage message={creditsError.message} />;
    if (isSimilarError) return <ErrorMessage message={similarError.message} />;

    const filmCrew = creditsData.crew.filter((crew) => ["Director", "Writer", "Screenplay"].includes(crew.job));

    return (
        <>
            <title>{movieData.title}</title>

            <div className="movie-details-backdrop-container ">
                <img
                    src={`https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}`}
                    alt={`${movieData.title} Backdrop`}
                    className="movie-deails-backdrop-image"
                />

                <section className="movie-backdrop-overlay py-5">
                    <Container>
                        <Row className="align-items-start">
                            <Col md={4}>
                                <Card className="movie-card-details-page shadow-sm">
                                    <Card.Img src={`https://image.tmdb.org/t/p/w400${movieData.poster_path}`} alt={movieData.title} />
                                </Card>
                            </Col>

                            <Col md={8}>
                                <h2 className="text-white fw-bold">
                                    {movieData.title} <span className="fw-light">({movieData.release_date.slice(0, 4)})</span>
                                </h2>

                                <div className="text-light mb-3 d-flex flex-wrap align-items-center gap-2">
                                    <span>{movieData.release_date}</span> <span>({movieData.origin_country[0]})</span>
                                    <span>&#x2022;</span>
                                    {movieData.genres.map((genre, index) => (
                                        <span key={genre.id}>
                                            <Link to={`/genre/${genre.id}`} className="text-decoration-none text-light">
                                                {genre.name} {index < movieData.genres.length - 1 && ","}
                                            </Link>
                                        </span>
                                    ))}
                                    <span>&#x2022;</span>
                                    <span>
                                        {Math.floor(movieData.runtime / 60)}h {movieData.runtime % 60}min
                                    </span>
                                </div>

                                {movieData.tagline && <p className="text-light fst-italic mb-4">{movieData.tagline}</p>}

                                <h5 className="text-light fw-bold">Overview</h5>
                                <p className="text-light">{movieData.overview}</p>

                                <Row className="mt-4">
                                    {filmCrew.map((crew) => (
                                        <Col key={crew.credit_id} md={4} className="mb-3">
                                            <p className="mb-0 fw-bold text-light">{crew.name}</p>
                                            <small className="text-light">{crew.job}</small>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>

            <section className="carousel-section my-3">
                <Container>
                    <h4 className="my-4 fw-bold">Top Billed Cast</h4>
                    <Swiperjs>
                        {creditsData.cast.map((actor) => (
                            <SwiperSlide>
                                <ActorsCarouselCards actor={actor} />
                            </SwiperSlide>
                        ))}
                    </Swiperjs>
                </Container>
            </section>

            <section className="carousel-section my-3">
                <Container>
                    <h4 className="my-4 fw-bold">Similar Movies</h4>
                    <Swiperjs>
                        {similarMovieData.results.map((movie) => (
                            <SwiperSlide>
                                <MovieCarouselCards movie={movie} />
                            </SwiperSlide>
                        ))}
                    </Swiperjs>
                </Container>
            </section>

            <section>
                <Container>
                    <RecentlyViewedMovies />
                </Container>
            </section>
        </>
    );
};

export default MovieDetailsPage;
