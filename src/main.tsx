import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import RecentViewedMoviesProvider from "./contexts/history/RecentViewedMoviesProvider.tsx";
import TrendingPeriodProvider from "./contexts/period/TrendingPeriodProvider.tsx";
import ThemeContextProvider from "./contexts/theme/ThemeContextProvider.tsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <RecentViewedMoviesProvider>
                    <ThemeContextProvider>
                        <TrendingPeriodProvider>
                            <App />
                        </TrendingPeriodProvider>
                    </ThemeContextProvider>
                </RecentViewedMoviesProvider>
            </BrowserRouter>
            <ReactQueryDevtools />
        </QueryClientProvider>
    </StrictMode>,
);
