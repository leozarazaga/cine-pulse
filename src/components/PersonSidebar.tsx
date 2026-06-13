import type { PersonDetails } from "../types/MovieDBTypes";
import { calculateAgeAtDeath, calculateCurrentAge, isoToFormattedString } from "../utils/formatDate";

interface PersonSidebarProps {
    personData: PersonDetails;
}

const PersonSidebar = ({ personData }: PersonSidebarProps) => {
    return (
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
    );
};

export default PersonSidebar;
