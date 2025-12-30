// src/components/homepage/VitaSection.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Link } from "react-router-dom";
import { vitaClassicSlides } from "../../data/homepageData";

export default function VitaSection() {
  // Eğer data tek slide ise, slider görsel olarak "slide" gibi çalışsın diye 2'liyoruz
  const slides =
    vitaClassicSlides.length > 1
      ? vitaClassicSlides
      : [...vitaClassicSlides, ...vitaClassicSlides];

  return (
    <section className="w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="w-full"
      >
        {slides.map((s, idx) => (
          <SwiperSlide key={`${s.id}-${idx}`}>
            <div className="w-full relative flex">
              {/* background */}
              <img
                src={s.bg}
                alt={s.title}
                className="w-full h-[753px] object-cover"
              />

              {/* overlay content */}
              <div className="absolute inset-0 w-full flex items-center">
                <div className="w-full max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
                  {/* left */}
                  <div className="flex flex-col items-start text-white">
                    <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px]">
                      {s.season}
                    </div>

                    <div className="mt-4 font-bold text-[40px] leading-[50px] tracking-[0.2px]">
                      {s.title}
                    </div>

                    <div className="mt-4 text-[20px] leading-[30px] tracking-[0.2px] max-w-[380px]">
                      {s.desc}
                    </div>

                    {/* price + button (buton fiyatın altında) */}
                    <div className="mt-6 flex flex-col items-start gap-4">
                      <div className="font-bold text-[24px] leading-[32px]">
                        {s.price}
                      </div>

                      <Link
                        to={s.href || "/"}
                        className="bg-[#2DC071] rounded-[5px] px-8 py-3 font-bold text-[14px] leading-[22px] tracking-[0.2px] text-white"
                      >
                        {s.button}
                      </Link>
                    </div>
                  </div>

                  {/* right person */}
                  <div className="w-full md:w-[420px] flex items-end justify-center">
                    <img
                      src={s.personPng}
                      alt="Vita Classic"
                      className="max-h-[520px] w-auto object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
