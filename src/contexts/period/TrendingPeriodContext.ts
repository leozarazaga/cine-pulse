import { createContext } from "react";

export type TrendingPeriod = "day" | "week";

interface TrendingPeriodContextType {
    trendingPeriod: TrendingPeriod;
    setTrendingPeriod: (period: TrendingPeriod) => void;
}

export const TrendingPeriodContext = createContext<TrendingPeriodContextType | null>(null);
