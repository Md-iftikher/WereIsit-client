import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import Bannerslides from "./Bannerslides";

const Banner = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]"
      >
        {Bannerslides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <div className="absolute inset-0 bg-black/50 z-10" />
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="text-center text-white max-w-3xl px-4">
                  <h1
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                  >
                    {slide.title}
                  </h1>
                  <p
                    className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="200"
                  >
                    {slide.description}
                  </p>
                  <Link to={slide.link}>
                    <button
                      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg flex items-center gap-2 mx-auto transition-all border-none transform hover:scale-105 px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-900 active:scale-95"
                      data-aos="fade-up"
                      data-aos-duration="1000"
                      data-aos-delay="400"
                    >
                      {slide.buttonText}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;