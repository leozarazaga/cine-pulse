import { Link, useSearchParams } from "react-router";
import useSearchForm from "../hooks/useSearchForm";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";
import { Card, Col, Container, Row } from "react-bootstrap";
import SearchForm from "../../components/SearchForm";
import Pagination from "../../components/Pagination";
import { isoToFormattedString } from "../../utils/formatDate";

const SearchResultPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("query") || "";
    const page = Number(searchParams.get("page") || 1);

    const { data: searchMovieData, isLoading: searchIsLoading, isError: isSearchError, error: searchError, isFetching } = useSearchForm(query, page);

    if (!searchMovieData || searchIsLoading) return <LoadingSpinner />;
    if (isSearchError) return <ErrorMessage message={searchError.message} />;

    const handleSearch = (query: string) => {
        setSearchParams({ query, page: "1" });
    };

    const handlePageChange = (newPage: number) => {
        setSearchParams({ query, page: String(newPage) });
    };

    return (
        <div>
            <Container className="my-4">
                <SearchForm onSearch={handleSearch} searchCategory="movie" />

                {query !== "" &&
                    (searchMovieData.results.length === 0 ? (
                        <p className="fs-5">No results found for "{query}"</p>
                    ) : (
                        <p className="fs-5">Search results for "{query}"</p>
                    ))}

                {/* <h1 className="mb-4">Movies</h1> */}
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
