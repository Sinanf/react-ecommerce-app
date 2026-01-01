// src/pages/AboutPage.jsx
import { Link } from "react-router-dom";
import { Play, Facebook, Instagram, Twitter } from "lucide-react";
import {
  aboutHero,
  aboutIntro,
  aboutStats,
  aboutVideo,
  meetTeamPreview,
  bigCompanies,
  workWithUs,
} from "../data/aboutPageData";

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col bg-white">
      {/* HERO */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 pt-10 pb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-10">
          {/* left */}
          <div className="w-full md:w-1/2 flex flex-col items-start gap-4">
            <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#737373]">
              {aboutHero.kicker}
            </div>

            <div className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#252B42]">
              {aboutHero.title}
            </div>

            <div className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] max-w-[420px]">
              {aboutHero.desc}
            </div>

            <Link
              to={aboutHero.buttonHref}
              className="mt-2 bg-[#23A6F0] text-white font-bold text-[14px] leading-[22px] tracking-[0.2px] rounded-[5px] px-8 py-3"
            >
              {aboutHero.button}
            </Link>
          </div>

          {/* right image (with soft circles like figma) */}
          <div className="w-full md:w-1/2 flex items-center justify-center relative">
            <div className="absolute w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full bg-[#FEEAE7] opacity-80" />
            <div className="absolute w-6 h-6 rounded-full bg-[#FEEAE7] left-6 top-6" />
            <div className="absolute w-3 h-3 rounded-full bg-[#B9B6FF] right-10 top-16" />
            <div className="absolute w-3 h-3 rounded-full bg-[#B9B6FF] left-12 bottom-14" />

            <img
              src={aboutHero.img}
              alt="About hero"
              className="relative w-[260px] h-[260px] md:w-[420px] md:h-[420px] object-cover rounded-[12px]"
            />
          </div>
        </div>
      </section>

      {/* INTRO TEXT */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="w-full md:w-1/2 flex flex-col gap-3">
            <div className="text-[14px] leading-[20px] tracking-[0.2px] text-[#E74040]">
              {aboutIntro.leftKicker}
            </div>
            <div className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">
              {aboutIntro.leftTitle}
            </div>
          </div>

          <div className="w-full md:w-1/2 text-[14px] leading-[20px] tracking-[0.2px] text-[#737373]">
            {aboutIntro.rightDesc}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row md:justify-between gap-8">
          {aboutStats.map((s) => (
            <div key={s.id} className="w-full md:w-1/4 flex flex-col items-center">
              <div className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#252B42]">
                {s.value}
              </div>
              <div className="text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VIDEO */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-12">
          <div className="w-full relative overflow-hidden rounded-[12px]">
            <img
              src={aboutVideo.img}
              alt="Video"
              className="w-full h-[220px] md:h-[420px] object-cover"
            />
            <button
              type="button"
              aria-label="Play video"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#23A6F0] flex items-center justify-center"
            >
              <Play className="w-7 h-7 text-white" />
            </button>
          </div>
        </div>
      </section>

      {/* MEET OUR TEAM (preview) */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-12 flex flex-col items-center">
          <div className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#252B42] text-center">
            {meetTeamPreview.title}
          </div>
          <div className="mt-2 text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] text-center max-w-[560px]">
            {meetTeamPreview.desc}
          </div>

          <div className="w-full mt-10 flex flex-col md:flex-row md:justify-center md:flex-wrap gap-10">
            {meetTeamPreview.members.map((m) => (
              <div
                key={m.id}
                className="w-full md:w-[calc(33.333%-28px)] flex flex-col items-center"
              >
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full max-w-[320px] h-[240px] md:h-[240px] object-cover"
                />
                <div className="mt-4 font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42]">
                  {m.name}
                </div>
                <div className="text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
                  {m.role}
                </div>

                <div className="mt-2 flex flex-row items-center gap-3">
                  <Facebook className="w-5 h-5 text-[#23A6F0]" />
                  <Instagram className="w-5 h-5 text-[#23A6F0]" />
                  <Twitter className="w-5 h-5 text-[#23A6F0]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* WORK WITH US */}
      <section className="w-full">
        <div className="w-full flex flex-col md:flex-row">
          {/* left blue */}
          <div className="w-full md:w-1/2 bg-[#2A7CC7] flex">
            <div className="w-full max-w-6xl mx-auto px-6 py-16 flex flex-col items-start gap-4">
              <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-white">
                {workWithUs.kicker}
              </div>

              <div className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-white">
                {workWithUs.title}
              </div>

              <div className="text-[14px] leading-[20px] tracking-[0.2px] text-white/80 max-w-[420px]">
                {workWithUs.desc}
              </div>

              <Link
                to={workWithUs.buttonHref}
                className="mt-2 border border-white text-white font-bold text-[14px] leading-[22px] tracking-[0.2px] rounded-[5px] px-10 py-3"
              >
                {workWithUs.button}
              </Link>
            </div>
          </div>

          {/* right image */}
          <div className="w-full md:w-1/2 flex">
            <img
              src={workWithUs.img}
              alt="Work with us"
              className="w-full h-[320px] md:h-[520px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* BIG COMPANIES */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-12 flex flex-col items-center">
          <div className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#252B42] text-center">
            {bigCompanies.title}
          </div>
          <div className="mt-2 text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] text-center max-w-[560px]">
            {bigCompanies.desc}
          </div>

          <div className="w-full mt-10 flex flex-row flex-wrap items-center justify-center gap-10 opacity-60"></div>
        </div>
      </section>
    </div>
  );
}
