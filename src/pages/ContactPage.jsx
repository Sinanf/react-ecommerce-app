// src/pages/ContactPage.jsx

import { Link } from "react-router-dom";
import { Twitter, Facebook, Instagram, Linkedin } from "lucide-react";
import { contactHero, contactSocials } from "../data/contactpageData";

const iconMap = {
  Twitter,
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
};

export default function ContactPage() {
  return (
    <div className="w-full bg-white">
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-20 md:py-24 flex flex-col items-center">
          {/* Title */}
          <div className="w-full flex flex-col items-center">
            <h1 className="whitespace-pre-line text-center font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#252B42] md:text-[58px] md:leading-[80px]">
              {contactHero.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-6 whitespace-pre-line text-center text-[20px] leading-[30px] tracking-[0.2px] text-[#737373] max-w-[520px]">
              {contactHero.subtitle}
            </p>

            {/* CTA */}
            <div className="mt-10 w-full flex flex-col items-center">
              <Link
                to={contactHero.ctaHref}
                className="w-full max-w-[340px] md:max-w-[360px] text-center bg-[#23A6F0] text-white font-bold text-[14px] leading-[22px] tracking-[0.2px] rounded-[5px] px-10 py-4"
              >
                {contactHero.ctaText}
              </Link>
            </div>

            {/* Social Icons */}
            <div className="mt-12 flex flex-row items-center justify-center gap-10 opacity-60">
              {contactSocials.map((s) => {
                const Icon = iconMap[s.name];
                return (
                  <a
                    key={s.id}
                    href={s.href}
                    aria-label={s.name}
                    className="p-2"
                  >
                    <Icon className="w-9 h-9 text-[#737373]" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
