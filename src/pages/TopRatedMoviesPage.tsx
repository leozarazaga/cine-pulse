import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router";
import ErrorMessage from "../components/ui/ErrorMessage";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Pagination from "../components/ui/Pagination";
import { isoToFormattedString } from "../utils/formatDate";
import { useTopRatedMovies } from "../hooks/useMovieQueries";

const TopRatedMoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const { data, isLoading, isError, error, isFetching } = useTopRatedMovies(currentPage);

    if (!data || isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorMessage message={error.message} />;

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: String(newPage) });
    };

    return (
        <div>
            <title>Top Rated Movies</title>

            <Container>
                <div className="page-header-wrapper">
                    <h2 className="page-header-title">Top Rated</h2>
                </div>

                <Row xs={2} sm={3} md={4} lg={5} className="g-4">
                    {data.results.map((movie) => (
                        <Col key={movie.id}>
                            <Card as={Link} to={`/movie/${movie.id}`} className="h-100 text-decoration-none genre-card-container">
                                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} alt={movie.title} />
                                <Card.Body>
                                    <Card.Title className="fs-6 fw-bold ">{movie.title}</Card.Title>
                                    <Card.Text className="text-muted" style={{ fontSize: "0.85rem" }}>
                                        {isoToFormattedString(movie.release_date)}
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

export default TopRatedMoviesPage;
