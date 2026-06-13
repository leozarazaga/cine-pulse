import { Link, useParams } from "react-router";
import { useRef } from "react";
import { Swiper as SwiperCore } from "swiper";
import { SwiperSlide } from "swiper/react";

import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";
import Swiperjs from "../../components/Swiperjs";
import TextExpander from "../../components/TextExpander";
import { calculateAgeAtDeath, calculateCurrentAge, isoToFormattedString } from "../../utils/formatDate";
import { useMoviesInvolvedIn, usePersonDetails } from "../hooks/useMovieQueries";
import "../../styles/person-editorial.css";

const PersonDetailsPage = () => {
    const { id } = useParams();
    const personId = Number(id);
    const swiperRef = useRef<SwiperCore | null>(null);

    const { data: personData, isLoading: isPersonLoading, isError: isPersonError, error: personError } = usePersonDetails(personId);
    const { data: involvedInData, isLoading: isInvolvedLoading, isError: isInvolvedError, error: involvedError } = useMoviesInvolvedIn(personId);

    if (!personData || isPersonLoading) return <LoadingSpinner />;
    if (!involvedInData || isInvolvedLoading) return <LoadingSpinner />;

    if (isPersonError) return <ErrorMessage message={personError.message} />;
    if (isInvolvedError) return <ErrorMessage message={involvedError.message} />;

    // Top 4 Critical Acclaim logic
    const top4Acclaimed = [...involvedInData.results]
        .filter((movie) => movie.backdrop_path && movie.vote_count > 100)
        .sort((a, b) => b.vote_average - a.vote_average)
        .slice(0, 4);

    return (
        <div className="editorial-wrapper">
            <main className="editorial-container">
                <title>{personData.name}</title>

                <div className="profile-grid">
                    {/* Left Rail */}
                    <aside className="profile-sidebar">
                        <img src={`https://image.tmdb.org/t/p/w780${personData.profile_path}`} alt={personData.name} className="profile-image" />

                        <div className="personal-record-card">
                            <h3 className="record-title">Personal Record</h3>
                            <div className="record-item">
                                <span className="record-item-label">Date of Birth</span>
                                <span className="record-item-value">{isoToFormattedString(personData.birthday)}</span>
                            </div>
                            <div className="record-item">
                                <span className="record-item-label">Status</span>
                                <span className="record-item-value">
                                    {personData.deathday
                                        ? `Deceased (${calculateAgeAtDeath(String(personData.birthday), personData.deathday)} years)`
                                        : `Alive (${calculateCurrentAge(String(personData.birthday))} years)`}
                                </span>
                            </div>
                            {personData.place_of_birth && (
                                <div className="record-item">
                                    <span className="record-item-label">Place of Birth</span>
                                    <span className="record-item-value">{personData.place_of_birth}</span>
                                </div>
                            )}
                            <div className="record-item">
                                <span className="record-item-label">Gender Identity</span>
                                <span className="record-item-value">
                                    {personData.gender === 1 ? "Female" : personData.gender === 2 ? "Male" : "Not specified"}
                                </span>
                            </div>
                        </div>
                    </aside>

                    {/* Right Rail */}
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

                        {/* Top 4 Critically Acclaimed Grid */}
                        {top4Acclaimed.length > 0 && (
                            <section className="mb-5 pb-4">
                                <h2 className="section-header">Top Critically Acclaimed</h2>
                                <div className="acclaim-grid">
                                    {top4Acclaimed.map((movie, index) => (
                                        <Link to={`/movie/${movie.id}`} key={movie.id} className="acclaim-card">
                                            <div className="acclaim-image-wrapper">
                                                <img src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} alt={movie.title} />
                                                <div className="acclaim-overlay">
                                                    <span className="acclaim-rank">#{index + 1} Rated</span>
                                                    <h3 className="acclaim-title">{movie.title}</h3>
                                                    <div className="acclaim-rating">
                                                        <span style={{ color: "#f2ca50", marginRight: "4px" }}>★</span>
                                                        {movie.vote_average.toFixed(1)} / 10
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Known For Cinematic Carousel */}
                        <section className="featured-works-section">
                            <div className="known-for-header">
                                <h2 className="section-header" style={{ marginBottom: 0 }}>
                                    Known For
                                </h2>
                                <div className="carousel-nav-buttons">
                                    <button className="custom-nav-btn" onClick={() => swiperRef.current?.slidePrev()}>
                                        &larr;
                                    </button>
                                    <button className="custom-nav-btn" onClick={() => swiperRef.current?.slideNext()}>
                                        &rarr;
                                    </button>
                                </div>
                            </div>

                            <Swiperjs
                                onSwiper={(swiper) => {
                                    swiperRef.current = swiper;
                                }}
                                breakpoints={{ 320: { slidesPerView: 2 }, 1024: { slidesPerView: 3.5 } }}
                            >
                                {involvedInData.results
                                    .filter((movie) => !top4Acclaimed.some((top) => top.id === movie.id))
                                    .map((movie) => (
                                        <SwiperSlide key={movie.id}>
                                            <div className="editorial-movie-card">
                                                <Link to={`/movie/${movie.id}`}>
                                                    <img src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`} alt={movie.title} />
                                                </Link>
                                                <p className="editorial-movie-title">{movie.title}</p>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                            </Swiperjs>
                        </section>
                    </article>
                </div>
            </main>
        </div>
    );
};

export default PersonDetailsPage;
