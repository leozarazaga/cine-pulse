import { useQuery } from "@tanstack/react-query";
import { searchMovie } from "../../service/MovieDBAPI";

const useSearchForm = (query: string, page: number) => {
    return useQuery({
        queryKey: ["search-form", query, page],
        queryFn: () => searchMovie(query, page),
    });
};

export default useSearchForm;
