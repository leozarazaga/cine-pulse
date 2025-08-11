import { useQuery } from "@tanstack/react-query";
import { similarMovies } from "../../service/MovieDBAPI";

const useSimilarMovies = (movieId: number) => {
    return useQuery({
        queryKey: ["similar-movies", movieId],
        queryFn: () => similarMovies(movieId),
    });
};

export default useSimilarMovies;
