import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import useMovieByGenre from "../hooks/useMovieByGenre";
import useGenres from "../hooks/useGenres";
import Pagination from "../../components/Pagination";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Card, Col, Container, Row } from "react-bootstrap";
import { isoToFormattedString } from "../../utils/formatDate";
import SearchForm from "../../components/SearchForm";

const GenresPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const genreId = Number(id);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const { data, isLoading, isError, error, isFetching } = useMovieByGenre(genreId, currentPage);
    const { data: genreData, isLoading: isGenresLoading, isError: isGenresError, error: genresError } = useGenres();

    if (!data || isLoading) return <LoadingSpinner />;
    if (isError) return <ErrorMessage message={error.message} />;

    if (!genreData || isGenresLoading) return <LoadingSpinner />;
    if (isGenresError) return <ErrorMessage message={genresError.message} />;

    const handlePageChange = (newPage: number) => {
        setSearchParams({ page: String(newPage) });
    };

    const genrebyName = genreData.genres.find((genre) => genre.id === genreId)?.name;

    return (
        <>
            <title>{genrebyName}</title>

            <Container className="my-4">
                <h1 className="mb-4">{genrebyName}</h1>

                <SearchForm onSearch={(query) => navigate(`/search?query=${query}&page=1`)} searchCategory="movie" />

                <Row xs={2} sm={3} md={4} lg={5} className="g-4">
                    {data.results.map((movie) => (
                        <Col key={movie.id}>
                            <Card as={Link} to={`/movie/${movie.id}`} className="h-100 text-decoration-none genre-card-container">
                                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`} alt={movie.title} />
                                <Card.Body>
                                    <Card.Title className="fs-6 fw-bold ">{movie.title}</Card.Title>
                                    <Card.Text className="text-muted" style={{ fontSize: "0.90rem" }}>
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
        </>
    );
};

export default GenresPage;
