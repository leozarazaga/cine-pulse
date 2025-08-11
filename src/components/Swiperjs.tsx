import { Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/mousewheel";

import { Navigation, FreeMode, Mousewheel } from "swiper/modules";

type SwiperjsProps = {
    children: React.ReactNode;
};

const Swiperjs: React.FC<SwiperjsProps> = ({ children }) => {
    return (
        <Swiper
            modules={[Navigation, FreeMode, Mousewheel]}
            navigation
            freeMode={true}
            mousewheel={{ forceToAxis: true }}
            spaceBetween={20}
            slidesPerGroup={3}
            grabCursor={true}
            loop={false}
            allowTouchMove={true}
            touchStartPreventDefault={false}
            breakpoints={{
                320: { slidesPerView: 3 },
                640: { slidesPerView: 4 },
                1024: { slidesPerView: 7 },
            }}
        >
            {children}
        </Swiper>
    );
};

export default Swiperjs;
