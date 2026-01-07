// src/components/homepage/FeaturedPostsSection.jsx
import { Link } from "react-router-dom";
import { featuredPosts } from "../../data/homePageData";

export default function FeaturedPostsSection() {
  return (
    <section className="w-full bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="w-full flex flex-col items-center gap-2">
          <div className="font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#23A6F0]">
            Practice Advice
          </div>
          <div className="font-bold text-[32px] leading-[40px] md:text-[40px] md:leading-[50px] tracking-[0.2px] text-[#252B42] text-center">
            Featured Posts
          </div>
          <div className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] text-center max-w-[520px]">
            Problems trying to resolve the conflict between the two major realms
            of Classical physics: Newtonian mechanics
          </div>
        </div>

        <div className="mt-10 w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPosts.map((p) => (
            <Link
              key={p.id}
              to={p.href || "/blog/1"}
              className="group w-full flex flex-col bg-white border border-[#E6E6E6] rounded-[12px] overflow-hidden
                         hover:shadow-md hover:-translate-y-0.5 transition-all duration-200
                         focus:outline-none focus:ring-2 focus:ring-[#23A6F0]/40"
              aria-label={`Open post: ${p.title}`}
            >
              {/* ✅ image frame: taşmayı/kırpılmayı çözer */}
              <div className="w-full h-full bg-[#F6F6F6] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-200"
                  loading="lazy"
                />
              </div>

              <div className="p-6 flex flex-col gap-3">
                <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42]">
                  {p.title}
                </div>

                <div className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373]">
                  {p.desc}
                </div>

                <div className="mt-1 font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#23A6F0]">
                  Learn More →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
