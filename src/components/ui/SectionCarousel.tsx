import { useRef } from "react";
import { Swiper as SwiperCore } from "swiper";
import type { SwiperOptions } from "swiper/types";
import Swiperjs from "./Swiperjs";

interface SectionCarouselProps {
    title: string;
    children: React.ReactNode;
    breakpoints?: Record<number, SwiperOptions>;
    variant?: "light" | "dark";
}

const SectionCarousel = ({ title, children, breakpoints, variant = "dark" }: SectionCarouselProps) => {
    const swiperRef = useRef<SwiperCore | null>(null);

    return (
        <section className={`carousel-variant-${variant}`}>
            <div className="section-carousel-header">
                <h4 className="section-header" style={{ marginBottom: 0 }}>
                    {title}
                </h4>
                <div className="carousel-nav-buttons">
                    <button className="custom-nav-btn" onClick={() => swiperRef.current?.slidePrev()} aria-label="Previous Slide">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                    </button>

                    <button className="custom-nav-btn" onClick={() => swiperRef.current?.slideNext()} aria-label="Next Slide">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                            <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                    </button>
                </div>
            </div>

            <Swiperjs
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                breakpoints={breakpoints}
            >
                {children}
            </Swiperjs>
        </section>
    );
};

export default SectionCarousel;
