import { useQuery } from "@tanstack/react-query";
import { topRatedMovies } from "../../service/MovieDBAPI";

const useTopRatedMovies = (page?: number) => {
    return useQuery({
        queryKey: ["topRatedMovies", page],
        queryFn: () => topRatedMovies(page),
    });
};

export default useTopRatedMovies;
