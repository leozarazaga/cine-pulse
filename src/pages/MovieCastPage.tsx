import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { ActorsCarouselCards } from "../components/ActorsCarouselCards";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { useMovieCredits, useMovieDetails } from "../hooks/useMovieQueries";

const MovieCastPage = () => {
    const { id } = useParams();
    const movieId = Number(id);

    const { data: movieData, isLoading: isMovieLoading } = useMovieDetails(movieId);
    const { data: creditsData, isLoading: isCreditsLoading, isError, error } = useMovieCredits(movieId);

    if (isMovieLoading || isCreditsLoading) return <LoadingSpinner />;
    if (isError) return <ErrorMessage message={error.message} />;

    return (
        <Container className="py-5 text-white">
            <div className="mb-4">
                <Link to={`/movie/${movieId}`} className="text-decoration-none text-secondary mb-2 d-inline-block">
                    &larr; Back to {movieData?.title}
                </Link>
                <h1 className="fw-bold">Full Cast & Crew</h1>
            </div>

            <Row className="g-4">
                {creditsData?.cast.map((actor) => (
                    <Col xs={6} sm={4} md={3} lg={2} xl={2} key={`${actor.id}-${actor.character}`}>
                        <ActorsCarouselCards actor={actor} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default MovieCastPage;
