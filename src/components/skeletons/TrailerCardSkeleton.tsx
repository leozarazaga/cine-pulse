export const TrailerCardSkeleton: React.FC = () => {
    return (
        <div className="movie-carousel-container skeleton-active">
            <div className="skeleton-element skeleton-trailer-thumbnail" />
            <div className="skeleton-element skeleton-title" />
        </div>
    );
};
