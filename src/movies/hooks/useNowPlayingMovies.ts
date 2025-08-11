import { useQuery } from "@tanstack/react-query";
import { nowPlayingMovies } from "../../service/MovieDBAPI";

const useNowPlayingMovies = (page?: number) => {
    return useQuery({
        queryKey: ["nowPlayingMovies", page],
        queryFn: () => nowPlayingMovies(page),
    });
};

export default useNowPlayingMovies;
