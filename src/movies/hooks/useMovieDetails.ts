import { useQuery } from "@tanstack/react-query";
import { movieDetails } from "../../service/MovieDBAPI";

const useMovieDetails = (movieId: number) => {
    return useQuery({
        queryKey: ["movie-details", movieId],
        queryFn: () => movieDetails(movieId),
    });
};

export default useMovieDetails;
