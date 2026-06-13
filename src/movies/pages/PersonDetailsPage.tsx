import { useParams } from "react-router";
import ErrorMessage from "../../components/ErrorMessage";
import KnownForCarousel from "../../components/KnownForCarousel";
import LoadingSpinner from "../../components/LoadingSpinner";
import PersonSidebar from "../../components/PersonSidebar";
import TextExpander from "../../components/TextExpander";
import TopAcclaimedGrid from "../../components/TopAcclaimedGrid";
import "../../styles/person-editorial.css";
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

    const topCriticallyAcclaimed = [...involvedInData.results]
        .filter((movie) => movie.backdrop_path && movie.vote_count > 100)
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 4);

    const carouselMovies = involvedInData.results.filter((movie) => !topCriticallyAcclaimed.some((top) => top.id === movie.id));

    return (
        <div className="editorial-wrapper">
            <main className="editorial-container">
                <title>{personData.name}</title>

                <div className="profile-grid">
                    {/* Left Grid Side */}

                    {/* =============== Personal Record =============== */}
                    <PersonSidebar personData={personData} />

                    {/* Right Grid Side */}
                    <article className="content-main">
                        <div className="profile-main-header">
                            <h1 className="profile-title">{personData.name}</h1>
                        </div>

                        <section className="mb-5 pb-4">
                            <h2 className="section-header">Biography</h2>
                            <div className="editorial-bio-content">
                                <TextExpander collapsedNumWords={80}>
                                    {personData.biography || `We don't have a biography for ${personData.name}.`}
                                </TextExpander>
                            </div>
                        </section>

                        {/* =============== Top Critically Acclaimed =============== */}
                        <TopAcclaimedGrid movies={topCriticallyAcclaimed} />

                        {/* =============== Known For Carousel =============== */}
                        <KnownForCarousel movies={carouselMovies} />
                    </article>
                </div>
            </main>
        </div>
    );
};

export default PersonDetailsPage;
