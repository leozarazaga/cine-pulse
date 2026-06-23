export const MovieCardSkeleton: React.FC = () => {
    return (
        <div className="movie-carousel-container skeleton-active">
            <div className="skeleton-element skeleton-poster" />
            <div className="skeleton-element skeleton-rating" />
            <div className="skeleton-element skeleton-title" />
        </div>
    );
};
