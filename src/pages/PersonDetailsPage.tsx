import { useParams } from "react-router";
import ErrorMessage from "../components/ErrorMessage";
import LoadingSpinner from "../components/LoadingSpinner";
import TextExpander from "../components/TextExpander";
import KnownForCarousel from "../components/actor/KnownForCarousel";
import PersonSidebar from "../components/actor/PersonSidebar";
import TopCriticallyAcclaimed from "../components/actor/TopCriticallyAcclaimed";
import { useMoviesInvolvedIn, usePersonDetails } from "../hooks/useMovieQueries";
import "../styles/person-details-styles.css";

const PersonDetailsPage = () => {
    const { id } = useParams();
    const personId = Number(id);

    const { data: personData, isLoading: isPersonLoading, isError: isPersonError, error: personError } = usePersonDetails(personId);
    const { data: involvedInData, isLoading: isInvolvedLoading, isError: isInvolvedError, error: involvedError } = useMoviesInvolvedIn(personId);

    if (!personData || isPersonLoading) return <LoadingSpinner />;
    if (!involvedInData || isInvolvedLoading) return <LoadingSpinner />;

    if (isPersonError) return <ErrorMessage message={personError.message} />;
    if (isInvolvedError) return <ErrorMessage message={involvedError.message} />;

    const topCriticallyAcclaimed = [...involvedInData.results]
        .filter((movie) => movie.backdrop_path && movie.vote_count > 100)
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 4);

    const carouselMovies = involvedInData.results.filter((movie) => !topCriticallyAcclaimed.some((top) => top.id === movie.id));

    return (
        <div className="person-details-wrapper">
            <main className="person-container">
                <title>{personData.name}</title>

                <div className="profile-grid">
                    {/* Left Side Grid */}

                    {/* =============== Personal Record =============== */}
                    <PersonSidebar personData={personData} />

                    {/* Right Side Grid */}
                    <article className="content-main">
                        <div className="profile-main-header">
                            <h1 className="profile-title">{personData.name}</h1>
                        </div>

                        <section className="mb-5 pb-4">
                            <h2 className="section-header">Biography</h2>
                            <div className="person-bio-content">
                                <TextExpander collapsedNumWords={80}>
                                    {personData.biography || `We don't have a biography for ${personData.name}.`}
                                </TextExpander>
                            </div>
                        </section>

                        {/* =============== Top Critically Acclaimed =============== */}
                        <TopCriticallyAcclaimed movies={topCriticallyAcclaimed} />

                        {/* =============== Known For Carousel =============== */}
                        <KnownForCarousel movies={carouselMovies} />
                    </article>
                </div>
            </main>
        </div>
    );
};

export default PersonDetailsPage;
