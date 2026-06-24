import { useNavigate } from "react-router";
import type { PersonMovieCast } from "../../types/MovieDBTypes";

interface ActorCreditsProps {
    credits: PersonMovieCast[];
}

const ActorCredits = ({ credits }: ActorCreditsProps) => {
    const navigate = useNavigate();
    const today = new Date();

    const upcomingCredits = credits
        .filter((credit) => {
            if (!credit.release_date) return true;
            return new Date(credit.release_date) > today;
        })
        .sort((a, b) => {
            if (!a.release_date) return -1;
            if (!b.release_date) return 1;
            return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
        });

    const previousCredits = credits
        .filter((credit) => {
            if (!credit.release_date) return false;
            return new Date(credit.release_date) <= today;
        })
        .sort((a, b) => {
            return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
        });

    const renderCreditRow = (credit: PersonMovieCast) => {
        const releaseYear = credit.release_date ? new Date(credit.release_date).getFullYear() : "—";

        return (
            <div key={credit.credit_id} className="filmography-row" onClick={() => navigate(`/movie/${credit.id}`)}>
                <div className="credit-poster-wrapper">
                    {credit.poster_path ? (
                        <img src={`https://image.tmdb.org/t/p/w92${credit.poster_path}`} alt={credit.title} className="credit-mini-poster" />
                    ) : (
                        <div className="credit-poster-placeholder">🎬</div>
                    )}
                </div>

                <div className="credit-main-info">
                    <span className="credit-movie-title">{credit.title}</span>

                    {credit.vote_average > 0 && (
                        <div className="credit-rating">
                            <span className="star-icon">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2.25l2.84 8.76h9.16l-7.4 5.38 2.83 8.76L12 19.77l-7.43 5.38 2.83-8.76-7.4-5.38h9.16L12 2.25z" />
                                </svg>
                            </span>
                            <span className="rating-number">{credit.vote_average.toFixed(1)}</span>
                        </div>
                    )}

                    {credit.character && <div className="credit-character-name">{credit.character}</div>}
                </div>

                <div className="credit-year-column">{releaseYear}</div>
            </div>
        );
    };

    if (!credits || credits.length === 0) return null;

    return (
        <section className="mt-5 pt-2">
            <h2 className="section-header mb-4">Credits</h2>

            <div className="filmography-container">
                {upcomingCredits.length > 0 && (
                    <>
                        <div className="filmography-category-header">
                            <span>
                                Upcoming <span className="credits-count">· {upcomingCredits.length}</span>
                            </span>
                        </div>
                        <div className="filmography-list">{upcomingCredits.map(renderCreditRow)}</div>
                    </>
                )}

                {previousCredits.length > 0 && (
                    <>
                        <div className="filmography-category-header">
                            <span>
                                Previous <span className="credits-count">· {previousCredits.length}</span>
                            </span>
                        </div>
                        <div className="filmography-list">{previousCredits.map(renderCreditRow)}</div>
                    </>
                )}
            </div>
        </section>
    );
};

export default ActorCredits;
