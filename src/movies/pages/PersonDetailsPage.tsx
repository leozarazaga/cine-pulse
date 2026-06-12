import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { SwiperSlide } from "swiper/react";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import Swiperjs from "../../components/Swiperjs";
import TextExpander from "../../components/TextExpander";
import { calculateAgeAtDeath, calculateCurrentAge, isoToFormattedString } from "../../utils/formatDate";
import { useMoviesInvolvedIn, usePersonDetails } from "../hooks/useMovieQueries";

const PersonDetailsPage = () => {
    const { id } = useParams();
    const personId = Number(id);
    const { data: personData, isLoading: isPersonLoading, isError: isPersonError, error: personError } = usePersonDetails(personId);
    const { data: involvedInData, isLoading: isInvolvedLoading, isError: isInvolvedError, error: involvedError } = useMoviesInvolvedIn(personId);

    if (!personData || isPersonLoading) return <LoadingSpinner />;
    if (!involvedInData || isInvolvedLoading) return <LoadingSpinner />;

    if (isPersonError) return <ErrorMessage message={personError.message} />;
    if (isInvolvedError) return <ErrorMessage message={involvedError.message} />;

    return (
        <>
            <title>{personData.name}</title>

            <Container className="my-5">
                <Row>
                    <Col md={4}>
                        <Card className="person-card-details-page">
                            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${personData.profile_path}`} alt={personData.name} />
                        </Card>
                    </Col>

                    <Col md={8}>
                        <h1>{personData.name}</h1>

                        <div>
                            <strong>Known for:</strong>
                            <p>{personData.known_for_department}</p>
                        </div>

                        <div>
                            <strong>Birthday: </strong>
                            <p>
                                {isoToFormattedString(personData.birthday)} ({calculateCurrentAge(String(personData.birthday))} years old)
                            </p>
                        </div>

                        {personData.deathday && (
                            <div>
                                <strong>Day of Death</strong>
                                <p>
                                    {isoToFormattedString(personData.deathday)} (
                                    {calculateAgeAtDeath(String(personData.birthday), personData.deathday)} years old)
                                </p>
                            </div>
                        )}

                        <div>
                            <strong>Place of Birth:</strong>
                            <p>{personData.place_of_birth}</p>
                        </div>

                        <div>
                            <strong>Biography: </strong>
                            <TextExpander collapsedNumWords={70}>
                                {personData.biography || `We don't have a biography for ${personData.name}.`}
                            </TextExpander>
                        </div>
                    </Col>
                </Row>

                <hr className="my-5" />

                <h4 className="my-4 fw-bold">Known For</h4>
                <Swiperjs>
                    {involvedInData.results.map((movie) => (
                        <SwiperSlide>
                            <Link to={`/movie/${movie.id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                    style={{ borderRadius: "12px", width: "100%" }}
                                />
                            </Link>
                            <p>{movie.title}</p>
                        </SwiperSlide>
                    ))}
                </Swiperjs>
            </Container>
        </>
    );
};

export default PersonDetailsPage;
