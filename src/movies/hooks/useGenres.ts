import { useQuery } from "@tanstack/react-query";
import { genresMovies } from "../../service/MovieDBAPI";

const useGenres = () => {
    return useQuery({
        queryKey: ["genres"],
        queryFn: genresMovies,
    });
};

export default useGenres;
