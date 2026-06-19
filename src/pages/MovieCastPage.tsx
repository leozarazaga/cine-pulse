import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import { useMovieCredits } from "../hooks/useMovieQueries";
import "../styles/movie-cast-page.css";

import maleAvatarIMG from "../assets/images/avatar/male-avatar.svg";
import femaleAvatarIMG from "../assets/images/avatar/woman-avatar.svg";

const MovieCastPage = () => {
    const { id } = useParams();
    const movieId = Number(id);

    const { data: creditsData, isLoading: isCreditsLoading, isError, error } = useMovieCredits(movieId);

    if (isCreditsLoading) return <LoadingSpinner />;
    if (isError) return <ErrorMessage message={error.message} />;

    return (
        <Container className="py-5">
            <div className="mb-4">
                <h1 className="fw-bold mb-4">Full Cast</h1>
            </div>

            <Row className="g-4">
                {creditsData?.cast.map((actor) => {
                    const actorGenderIMG = actor.gender === 1 ? femaleAvatarIMG : maleAvatarIMG;
                    const imageSrc = actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : actorGenderIMG;

                    return (
                        <Col xs={4} sm={4} md={3} lg={2} key={`${actor.id}-${actor.character}`}>
                            <Link to={`/person/${actor.id}`} className="cast-grid-card">
                                <div className="cast-image-wrapper">
                                    <img src={imageSrc} alt={actor.name} className={`cast-image ${!actor.profile_path ? "fallback-avatar" : ""}`} />
                                </div>
                                <div className="cast-info">
                                    <p className="cast-name">{actor.name}</p>
                                    <p className="cast-character">{actor.character}</p>
                                </div>
                            </Link>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};

export default MovieCastPage;
