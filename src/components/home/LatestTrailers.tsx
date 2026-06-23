import { useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { SwiperSlide } from "swiper/react";
import { useUpcomingTrailers } from "../../hooks/useMovieQueries";
import "../../styles/latest-trailers.css";
import { TrailerCardSkeleton } from "../skeletons/TrailerCardSkeleton";
import SectionCarousel from "../ui/SectionCarousel";

const LatestTrailers = () => {
    const { data, isLoading, isError } = useUpcomingTrailers();
    const [activeTrailerKey, setActiveTrailerKey] = useState<string | null>(null);

    if (isError || (!data && !isLoading)) return null;

    const videoMovies = data?.results
        ? data.results
              .map((movie) => {
                  const trailer = movie.videos?.results.find((v) => v.site === "YouTube" && v.type === "Trailer");
                  return { ...movie, trailerKey: trailer?.key };
              })
              .filter((movie) => movie.trailerKey)
        : [];

    const skeletonItems = Array.from({ length: 4 });

    const handleClose = () => setActiveTrailerKey(null);

    return (
        <section className="trailers-section my-5">
            <Container>
                <SectionCarousel
                    title="Latest Trailers"
                    variant="dark"
                    breakpoints={{
                        320: { slidesPerView: 2 },
                        768: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 3.2 },
                    }}
                >
                    {isLoading
                        ? skeletonItems.map((_, index) => (
                              <SwiperSlide key={`trailer-skeleton-${index}`}>
                                  <TrailerCardSkeleton />
                              </SwiperSlide>
                          ))
                        : videoMovies.map((movie) => (
                              <SwiperSlide key={movie.id}>
                                  <div className="trailer-card p-2" onClick={() => setActiveTrailerKey(movie.trailerKey || null)}>
                                      <div className="trailer-thumbnail-wrapper mb-2">
                                          <img
                                              src={`https://img.youtube.com/vi/${movie.trailerKey}/maxresdefault.jpg`}
                                              alt={movie.title}
                                              className="trailer-thumbnail-img"
                                              onError={(e) => {
                                                  (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${movie.trailerKey}/mqdefault.jpg`;
                                              }}
                                          />
                                          <div className="trailer-play-overlay">
                                              <div className="trailer-play-icon"></div>
                                          </div>
                                      </div>
                                      <h6 className="trailer-card-title fw-bold text-truncate mb-0 mt-2 text-black">{movie.title}</h6>
                                  </div>
                              </SwiperSlide>
                          ))}
                </SectionCarousel>
            </Container>

            {/*  =============== TRAILER MODAL =============== */}
            <Modal
                show={!!activeTrailerKey}
                onHide={handleClose}
                centered
                size="xl"
                contentClassName="cinematic-modal-content"
                backdropClassName="cinematic-modal-backdrop"
            >
                {activeTrailerKey && (
                    <div className="cinematic-iframe-wrapper">
                        <iframe
                            src={`https://www.youtube.com/embed/${activeTrailerKey}?autoplay=1`}
                            title="Trailer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="cinematic-iframe"
                        ></iframe>
                    </div>
                )}
            </Modal>
        </section>
    );
};

export default LatestTrailers;
