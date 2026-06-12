import { useContext } from "react";
import { TrendingPeriodContext } from "../../contexts/period/TrendingPeriodContext";

const useTrendingPeriod = () => {
    const periodContext = useContext(TrendingPeriodContext);

    if (!periodContext) {
        throw new Error("PeriodContext must be used inside a TrendingPeriodContextProvider");
    }

    return periodContext;
};

export default useTrendingPeriod;
