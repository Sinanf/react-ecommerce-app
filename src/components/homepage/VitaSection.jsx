// src/components/homepage/VitaSection.jsx
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { vitaClassicSlides } from "../../data/homePageData";

export default function VitaSection() {
  // SLIDES FALLBACK (Swiper loop 느낌: tek slide varsa kendini kopyalar)
  const slides =
    vitaClassicSlides.length > 1
      ? vitaClassicSlides
      : [...vitaClassicSlides, ...vitaClassicSlides];

  return (
    <section className="w-full">
      {/* SWIPER (navigation + pagination) */}
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="w-full vita-swiper"
      >
        {slides.map((s, idx) => (
          <SwiperSlide key={`${s.id}-${idx}`}>
            <div className="w-full relative flex">
              {/* BACKGROUND IMAGE */}
              <img
                src={s.bg}
                alt={s.title}
                className="w-full h-[620px] md:h-[753px] object-cover"
              />

              {/* READABILITY OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-black/10" />
              <div className="absolute inset-0 bg-black/10" />

              {/* CONTENT WRAPPER */}
              <div className="absolute inset-0 w-full flex items-center">
                <div className="w-full max-w-6xl mx-auto px-4">
                  <div className="w-full flex flex-col md:flex-row items-center justify-between gap-10">
                    {/* LEFT: TEXT + PRICE + CTA */}
                    <div className="w-full md:w-1/2 flex flex-col items-start text-white">
                      {/* SEASON BADGE */}
                      <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-[12px] md:text-[14px] font-bold tracking-[0.1px]">
                        {s.season}
                      </div>

                      {/* TITLE */}
                      <h2 className="mt-4 font-bold tracking-[0.2px] text-[30px] leading-[38px] md:text-[44px] md:leading-[54px]">
                        {s.title}
                      </h2>

                      {/* DESCRIPTION */}
                      <p className="mt-3 text-white/90 text-[16px] leading-[24px] md:text-[20px] md:leading-[30px] tracking-[0.2px] max-w-[520px]">
                        {s.desc}
                      </p>

                      {/* PRICE + CTA BUTTON */}
                      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="font-bold text-[22px] md:text-[24px] leading-[32px]">
                          {s.price}
                        </div>

                        <Link
                          to={s.href || "/"}
                          aria-label={s.button}
                          className="
                            inline-flex items-center justify-center h-11 px-8 rounded-[8px]
                            bg-[#2DC071] font-bold text-[14px] leading-[22px] tracking-[0.2px] text-white
                            hover:brightness-95 active:brightness-90
                            focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 focus:ring-offset-black/30
                          "
                        >
                          {s.button}
                        </Link>
                      </div>

                      {/* TRUST LINE */}
                      <div className="mt-5 text-[13px] text-white/80">
                        Free returns • Fast delivery • Secure payment
                      </div>
                    </div>

                    {/* RIGHT: PRODUCT CHARACTER IMAGE */}
                    <div className="w-full md:w-1/2 flex items-end justify-center">
                      <div className="relative">
                        <div className="absolute -inset-6 rounded-[24px] bg-white/10 blur-2xl" />
                        <img
                          src={s.personPng}
                          alt="Vita Classic"
                          loading="lazy"
                          className="relative max-h-[420px] md:max-h-[560px] w-auto object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)]"
                        />
                      </div>
                    </div>
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
