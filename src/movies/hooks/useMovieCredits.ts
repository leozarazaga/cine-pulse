import { useQuery } from "@tanstack/react-query";
import { movieCredits } from "../../service/MovieDBAPI";

const useMovieCredits = (movieId: number) => {
    return useQuery({
        queryKey: ["movie-credits", movieId],
        queryFn: () => movieCredits(movieId),
    });
};

export default useMovieCredits;
