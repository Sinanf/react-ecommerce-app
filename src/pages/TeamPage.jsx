// src/pages/TeamPage.jsx
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { teamHero, teamGallery, teamMembers, teamCta } from "../data/teamPageData";

export default function TeamPage() {
  return (
    <div className="w-full flex flex-col bg-white">
      {/* HERO */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 pt-10 pb-6 flex flex-col items-center gap-3">
          <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#737373]">
            {teamHero.kicker}
          </div>

          <div className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#252B42] text-center">
            {teamHero.title}
          </div>

          <div className="flex flex-row items-center gap-2 text-[14px] leading-[24px] tracking-[0.2px]">
            <Link to="/" className="font-bold text-[#252B42]">
              {teamHero.breadcrumbLeft}
            </Link>
            <span className="text-[#BDBDBD]">{">"}</span>
            <span className="text-[#737373]">{teamHero.breadcrumbRight}</span>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 pb-12 flex flex-col md:flex-row gap-6">
          {/* left big */}
          <div className="w-full md:w-1/2 flex">
            <img
              src={teamGallery.left}
              alt="team hero left"
              className="w-full h-[320px] md:h-[500px] object-cover"
            />
          </div>

          {/* right 2x2 */}
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <div className="w-full flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2 flex">
                <img
                  src={teamGallery.rightTopLeft}
                  alt="team hero 1"
                  className="w-full h-[220px] md:h-[240px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 flex">
                <img
                  src={teamGallery.rightTopRight}
                  alt="team hero 2"
                  className="w-full h-[220px] md:h-[240px] object-cover"
                />
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2 flex">
                <img
                  src={teamGallery.rightBottomLeft}
                  alt="team hero 3"
                  className="w-full h-[220px] md:h-[240px] object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 flex">
                <img
                  src={teamGallery.rightBottomRight}
                  alt="team hero 4"
                  className="w-full h-[220px] md:h-[240px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MEET OUR TEAM */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 pb-14 flex flex-col items-center">
          <div className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#252B42] text-center">
            Meet Our Team
          </div>

          <div className="w-full mt-10 flex flex-col md:flex-row md:flex-wrap md:justify-center gap-10">
            {teamMembers.map((m) => (
              <div
                key={m.id}
                className="w-full flex flex-col items-center md:w-[calc(33.333%-28px)]"
              >
                <img
                  src={m.img}
                  alt={m.name}
                  className="w-full max-w-[320px] h-[320px] object-cover"
                />

                <div className="mt-6 font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42] text-center">
                  {m.name}
                </div>
                <div className="mt-1 font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] text-center">
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

      {/* CTA */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 pb-16 flex flex-col items-center gap-4">
          <div className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#252B42] text-center">
            {teamCta.title}
          </div>

          <div className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] text-center max-w-[520px]">
            {teamCta.desc}
          </div>

          <button className="mt-4 bg-[#23A6F0] text-white font-bold text-[14px] leading-[22px] tracking-[0.2px] rounded-[5px] px-10 py-4">
            {teamCta.button}
          </button>

          <div className="mt-6 flex flex-row items-center gap-6 opacity-70">
            <Twitter className="w-6 h-6 text-[#252B42]" />
            <Facebook className="w-6 h-6 text-[#252B42]" />
            <Instagram className="w-6 h-6 text-[#252B42]" />
          </div>
        </div>
      </section>
    </div>
  );
}
