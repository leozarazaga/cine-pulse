import { useQuery } from "@tanstack/react-query";
import { movieByGenreId } from "../../service/MovieDBAPI";

const useMovieByGenre = (genreId: number, page: number) => {
    return useQuery({
        queryKey: ["movie-by-gere", genreId, page],
        queryFn: () => movieByGenreId(genreId, page),
    });
};

export default useMovieByGenre;
