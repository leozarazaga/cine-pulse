import { useState } from "react";
import { Container } from "react-bootstrap";
import { SwiperSlide } from "swiper/react";
import { useUpcomingTrailers } from "../../hooks/useMovieQueries";
import { TrailerCardSkeleton } from "../skeletons/TrailerCardSkeleton";
import "../styles/latest-trailers.css";
import SectionCarousel from "../ui/SectionCarousel";

const LatestTrailers = () => {
    const { data, isLoading, isError } = useUpcomingTrailers();
    const [activeTrailerId, setActiveTrailerId] = useState<number | null>(null);

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
                                  <div className="trailer-card p-2" onClick={() => setActiveTrailerId(movie.id)}>
                                      <div className="trailer-thumbnail-wrapper mb-2">
                                          {activeTrailerId === movie.id ? (
                                              <iframe
                                                  src={`https://www.youtube.com/embed/${movie.trailerKey}?autoplay=1`}
                                                  title={movie.title}
                                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                  allowFullScreen
                                                  style={{ width: "100%", height: "100%", border: "none" }}
                                              ></iframe>
                                          ) : (
                                              <>
                                                  <img
                                                      src={`https://img.youtube.com/vi/${movie.trailerKey}/maxresdefault.jpg`}
                                                      alt={movie.title}
                                                      className="trailer-thumbnail-img"
                                                      onError={(e) => {
                                                          (e.target as HTMLImageElement).src =
                                                              `https://img.youtube.com/vi/${movie.trailerKey}/mqdefault.jpg`;
                                                      }}
                                                  />
                                                  <div className="trailer-play-overlay">
                                                      <div className="trailer-play-icon"></div>
                                                  </div>
                                              </>
                                          )}
                                      </div>
                                      <h6 className="trailer-card-title fw-bold text-truncate mb-0 mt-2 text-black">{movie.title}</h6>
                                  </div>
                              </SwiperSlide>
                          ))}
                </SectionCarousel>
            </Container>
        </section>
    );
};

export default LatestTrailers;
