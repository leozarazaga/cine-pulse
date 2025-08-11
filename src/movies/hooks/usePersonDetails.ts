import { useQuery } from "@tanstack/react-query";
import { personDetails } from "../../service/MovieDBAPI";

const usePersonDetails = (personId: number) => {
    return useQuery({
        queryKey: ["person-details", personId],
        queryFn: () => personDetails(personId),
    });
};

export default usePersonDetails;
