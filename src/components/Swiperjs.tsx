import { Swiper } from "swiper/react";
import type { SwiperOptions } from "swiper/types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";
import { Navigation, FreeMode, Mousewheel } from "swiper/modules";

type SwiperjsProps = {
    children: React.ReactNode;
    breakpoints?: Record<number, SwiperOptions>;
    onSwiper?: (swiper: any) => void;
};

const Swiperjs: React.FC<SwiperjsProps> = ({ children, breakpoints, onSwiper }) => {
    return (
        <Swiper
            onSwiper={onSwiper}
            modules={[Navigation, FreeMode, Mousewheel]}
            freeMode={true}
            mousewheel={{ forceToAxis: true }}
            spaceBetween={24}
            slidesPerGroup={1}
            grabCursor={true}
            loop={false}
            breakpoints={breakpoints || {
                320: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
            }}
        >
            {children}
        </Swiper>
    );
};

export default Swiperjs;