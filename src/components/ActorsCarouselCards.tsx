import "../styles/actors-carousel-cards-styles.css";
import { Link } from "react-router";
import type { MovieCast } from "../types/MovieDBTypes";

import maleAvatarIMG from "../assets/images/avatar/male-avatar.svg";
import femaleAvatarIMG from "../assets/images/avatar/woman-avatar.svg";

interface ActorsCarouselCardsProps {
    actor: MovieCast;
}
export const ActorsCarouselCards: React.FC<ActorsCarouselCardsProps> = ({ actor }) => {
    const actorGenderIMG = actor.gender === 1 ? femaleAvatarIMG : maleAvatarIMG;

    return (
        <div key={actor.id}>
            <Link to={`/person/${actor.id}`}>
                <div className="actor-carousel-image-wrapper">
                    <img
                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w200${actor.profile_path}` : actorGenderIMG}
                        alt={actor.name}
                        className={`${!actor.profile_path ? "avatar-icon" : ""}`}
                    />
                </div>
            </Link>
            <p className="movie-carousel-title">{actor.original_name}</p>
            <p>{actor.character}</p>
        </div>
    );
};
