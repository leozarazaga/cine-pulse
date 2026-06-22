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
        /* Dynamically attach a variant class modifier onto the section node */
        <section className={`carousel-variant-${variant}`}>
            <div className="section-carousel-header">
                <h4 className="section-header" style={{ marginBottom: 0 }}>
                    {title}
                </h4>
                <div className="carousel-nav-buttons">
                    <button className="custom-nav-btn" onClick={() => swiperRef.current?.slidePrev()}>
                        &larr;
                    </button>
                    <button className="custom-nav-btn" onClick={() => swiperRef.current?.slideNext()}>
                        &rarr;
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
