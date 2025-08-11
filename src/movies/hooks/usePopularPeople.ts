import { useQuery } from "@tanstack/react-query";
import { popularPeople } from "../../service/MovieDBAPI";

const usePopularPeople = (page: number) => {
    return useQuery({
        queryKey: ["popular-people", page],
        queryFn: () => popularPeople(page),
    });
};

export default usePopularPeople;
