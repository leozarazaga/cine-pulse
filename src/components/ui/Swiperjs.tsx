import { Swiper as SwiperCore } from "swiper";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import { Mousewheel, Navigation, Scrollbar } from "swiper/modules";
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
                className="netflix-carousel"
                onSwiper={onSwiper}
                scrollbar={{
                    draggable: true,
                    hide: false,
                }}
                modules={[Navigation, Mousewheel, Scrollbar]}
                cssMode={true}
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
                preventInteractionOnTransition={false}
                watchSlidesProgress={true}
                shortSwipes={true}
                touchStartPreventDefault={false}
            >
                {children}
            </Swiper>
        </div>
    );
};

export default Swiperjs;
