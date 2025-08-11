import { useQuery } from "@tanstack/react-query";
import { trendingMovies } from "../../service/MovieDBAPI";

const useTrendingMovies = (period: "day" | "week", page?: number) => {
    return useQuery({
        queryKey: ["trending-movies", period, page],
        queryFn: () => trendingMovies(period, page),
        staleTime: 1000 * 60 * 5,
    });
};

export default useTrendingMovies;
