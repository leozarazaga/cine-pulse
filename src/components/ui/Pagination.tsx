import "../../styles/pagination-styles.css";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    isFetching: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, isFetching }) => {
    return (
        <div className="pagination-container">
            <button disabled={currentPage <= 1 || isFetching} onClick={() => onPageChange(currentPage - 1)}>
                Previous
            </button>

            <span>
                {currentPage} {totalPages > 1 && " / " + totalPages}
            </span>

            <button disabled={currentPage >= totalPages || isFetching} onClick={() => onPageChange(currentPage + 1)}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
