import { useQuery } from "@tanstack/react-query";
import { personMoviesInvolvedIn } from "../../service/MovieDBAPI";

const useMoviesInvolvedIn = (movieId: number) => {
    return useQuery({
        queryKey: ["movies-involved", movieId],
        queryFn: () => personMoviesInvolvedIn(movieId),
    });
};

export default useMoviesInvolvedIn;
