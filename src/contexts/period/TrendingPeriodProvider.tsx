import { useEffect, useState } from "react";
import { TrendingPeriodContext, type TrendingPeriod } from "./TrendingPeriodContext";

interface TrendingPeriodProviderProps {
    children: React.ReactNode;
}

const TrendingPeriodProvider: React.FC<TrendingPeriodProviderProps> = ({ children }) => {
    const [trendingPeriod, setTrendingPeriod] = useState<TrendingPeriod>(() => {
        const stored = localStorage.getItem("period");
        return stored === "week" ? "week" : "day";
    });

    useEffect(() => {
        localStorage.setItem("period", trendingPeriod);
    }, [trendingPeriod]);

    return (
        <TrendingPeriodContext.Provider value={{trendingPeriod, setTrendingPeriod}}>
            {children}
        </TrendingPeriodContext.Provider>
    )
};

export default TrendingPeriodProvider;
