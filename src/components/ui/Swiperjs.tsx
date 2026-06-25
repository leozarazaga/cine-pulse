import { Swiper as SwiperCore } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { FreeMode, Mousewheel, Navigation, Scrollbar } from "swiper/modules";
import { Swiper } from "swiper/react";
import type { SwiperOptions } from "swiper/types";

type SwiperjsProps = {
    children: React.ReactNode;
    breakpoints?: Record<number, SwiperOptions>;
    onSwiper?: (swiper: SwiperCore) => void;
};

const Swiperjs: React.FC<SwiperjsProps> = ({ children, breakpoints, onSwiper }) => {
    return (
        <div className="swiper-hardware-trap" style={{ width: "100%" }}>
            <Swiper
                onSwiper={onSwiper}
                scrollbar={{
                    draggable: true,
                    hide: false,
                }}
                modules={[Navigation, FreeMode, Mousewheel, Scrollbar]}
                freeMode={{
                    enabled: true,
                    momentum: true,
                    momentumRatio: 1.4,
                    momentumVelocityRatio: 1.5,
                    momentumBounce: false,
                }}
                mousewheel={{
                    forceToAxis: true,
                    releaseOnEdges: true,
                    sensitivity: 1,
                }}
                spaceBetween={6}
                grabCursor={true}
                loop={false}
                breakpoints={breakpoints}
                touchMoveStopPropagation={true}
                resistance={true}
                resistanceRatio={0.85}
            >
                {children}

                {children}
            </Swiper>
        </div>
    );
};

export default Swiperjs;
