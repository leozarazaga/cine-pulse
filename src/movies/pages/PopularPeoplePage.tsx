import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import Pagination from "../../components/Pagination";
import { usePopularPeople } from "../hooks/useMovieQueries";

const PopularPeoplePage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const { data, isLoading, isError, error, isFetching } = usePopularPeople(currentPage);

    if (!data || isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorMessage message={error.message} />;

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: String(newPage) });
    };

    return (
        <div>
            <Container className="my-4">
                <h2 className="mb-4">Popular Actors</h2>

                <Row xs={2} sm={3} md={4} lg={5} className="g-4">
                    {data.results.map((person) => (
                        <Col key={person.id}>
                            <Card as={Link} to={`/person/${person.id}`} className="h-100 text-decoration-none genre-card-container">
                                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w400${person.profile_path}`} alt={person.name} />
                                <Card.Body>
                                    <Card.Title className="fs-6 fw-bold ">{person.name}</Card.Title>
                                    <Card.Text className="text-muted" style={{ fontSize: "0.85rem" }}>
                                        {person.known_for
                                            .map((movie) => movie.title || movie.name || movie.original_name)
                                            .slice(0, 2)
                                            .join(", ")}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <div className="mt-4 d-flex justify-content-center">
                    <Pagination currentPage={currentPage} totalPages={data.total_pages} onPageChange={handlePageChange} isFetching={isFetching} />
                </div>
            </Container>
        </div>
    );
};

export default PopularPeoplePage;
