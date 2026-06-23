import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router";
import ErrorMessage from "../components/ui/ErrorMessage";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import Pagination from "../components/ui/Pagination";
import { useSearchForm } from "../hooks/useMovieQueries";
import { isoToFormattedString } from "../utils/formatDate";

const SearchResultPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const page = Number(searchParams.get("page") || 1);

    const { data: searchMovieData, isLoading: searchIsLoading, isError: isSearchError, error: searchError, isFetching } = useSearchForm(query, page);

    if (!searchMovieData || searchIsLoading) return <LoadingSpinner />;
    if (isSearchError) return <ErrorMessage message={searchError.message} />;

    const handlePageChange = (newPage: number) => {
        setSearchParams({ query, page: String(newPage) });
    };

    return (
        <div>
            <Container className="my-4">
                {query !== "" &&
                    (searchMovieData.results.length === 0 ? (
                        <p className="fs-5">No results found for "{query}"</p>
                    ) : (
                        <div className="page-header-wrapper">
                            <h2 className="page-header-title">Search results for "{query}"</h2>
                        </div>
                    ))}

                <Row xs={2} sm={3} md={4} lg={5} className="g-4">
                    {searchMovieData.results.map((movie) => (
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
                    {searchMovieData.total_pages > 1 && (
                        <Pagination
                            currentPage={page}
                            totalPages={searchMovieData.total_pages}
                            onPageChange={handlePageChange}
                            isFetching={isFetching}
                        />
                    )}
                </div>
            </Container>
        </div>
    );
};

export default SearchResultPage;
