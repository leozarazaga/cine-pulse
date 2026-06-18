import { useRef } from "react";
import { Swiper as SwiperCore } from "swiper";
import type { SwiperOptions } from "swiper/types";
import Swiperjs from "./Swiperjs";

interface SectionCarouselProps {
    title: string;
    children: React.ReactNode;
    breakpoints?: Record<number, SwiperOptions>;
}

const SectionCarousel = ({ title, children, breakpoints }: SectionCarouselProps) => {
    const swiperRef = useRef<SwiperCore | null>(null);

    return (
        <section>
            <div className="section-carousel-header">
                <h2 className="section-header" style={{ marginBottom: 0 }}>
                    {title}
                </h2>
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
