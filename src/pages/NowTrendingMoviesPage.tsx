import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useSearchParams } from "react-router";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import { isoToFormattedString } from "../utils/formatDate";
import { useTrendingMovies } from "../hooks/useMovieQueries";

const NowTrendingMoviesPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const period = searchParams.get("period") === "week" ? "week" : "day";
    const currentPage = Number(searchParams.get("page")) || 1;

    const { data, isLoading, isError, error, isFetching } = useTrendingMovies(period, currentPage);

    if (!data || isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorMessage message={error.message} />;

    const handlePageChange = (newPage: number) => {
        setSearchParams((currentParams) => {
            const params = new URLSearchParams(currentParams);
            params.set("page", String(newPage));
            return params;
        });
    };

    const handlePeriodChange = (selectedPeriod: "day" | "week") => {
        setSearchParams((currentPage) => {
            const params = new URLSearchParams(currentPage);
            params.set("period", selectedPeriod);
            params.set("page", "1");
            return params;
        });
    };

    return (
        <div>
            <Container className="my-4">
                <div className="d-flex align-items-center mb-4">
                    <h2 className="section-title-header my-0 fs-3">Trending</h2>

                    <div className="trending-buttons-wrapper mx-3 my-3">
                        <div className={`toggle-background ${period === "week" ? "right" : "left"}`} />
                        <button className={period === "day" ? "active" : ""} onClick={() => handlePeriodChange("day")}>
                            Today
                        </button>
                        <button className={period === "week" ? "active" : ""} onClick={() => handlePeriodChange("week")}>
                            This Week
                        </button>
                    </div>
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

export default NowTrendingMoviesPage;
