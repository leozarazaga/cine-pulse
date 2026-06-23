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
                freeMode={true}
                mousewheel={{
                    forceToAxis: true,
                    releaseOnEdges: true,
                    sensitivity: 1,
                }}
                spaceBetween={6}
                slidesPerGroup={1}
                grabCursor={true}
                loop={false}
                breakpoints={breakpoints}
            >
                {children}
            </Swiper>
        </div>
    );
};

export default Swiperjs;
