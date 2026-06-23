import { Link } from "react-router";
import { SwiperSlide } from "swiper/react";
import { usePopularPeople } from "../../hooks/useMovieQueries";
import "../../styles/popular-actors.css";
import Swiperjs from "../ui/Swiperjs";

const PopularActorsCarousel = () => {
    const { data, isLoading, isError } = usePopularPeople(1);

    if (isError) return null;

    const skeletonItems = Array.from({ length: 8 });

    return (
        <section className="carousel-section container my-5">
            <div className="carousel-header-wrapper">
                <div className="carousel-header-container" style={{ margin: 0, width: "100%" }}>
                    <div className="title-button-group">
                        <h2 className="carousel-header-title">Popular Actors</h2>
                    </div>

                    <Link to="/popular-people" className="carousel-explore-all">
                        Explore All
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </Link>
                </div>
            </div>

            <Swiperjs breakpoints={{ 320: { slidesPerView: 3.5 }, 1024: { slidesPerView: 7.5 } }}>
                {isLoading
                    ? skeletonItems.map((_, index) => (
                          <SwiperSlide key={`actor-skeleton-${index}`}>
                              <div className="popular-actor-card skeleton-active"></div>
                          </SwiperSlide>
                      ))
                    : data?.results.map((actor, index) => (
                          <SwiperSlide key={actor.id}>
                              <Link to={`/person/${actor.id}`} className="popular-actor-card">
                                  <img
                                      src={
                                          actor.profile_path
                                              ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                                              : "https://via.placeholder.com/300x450?text=No+Image"
                                      }
                                      alt={actor.name}
                                      className="popular-actor-img"
                                  />

                                  <div className="popular-actor-overlay">
                                      <span className="popular-actor-rank">{index + 1}</span>
                                      <div className="popular-actor-info">
                                          <span className="popular-actor-name">{actor.name}</span>
                                      </div>
                                  </div>
                              </Link>
                          </SwiperSlide>
                      ))}
            </Swiperjs>
        </section>
    );
};

export default PopularActorsCarousel;
