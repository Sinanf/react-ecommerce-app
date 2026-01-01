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
          <div className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#252B42] text-center">
            Featured Posts
          </div>
          <div className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] text-center max-w-[520px]">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </div>
        </div>

        <div className="mt-10 w-full flex flex-col gap-6 md:flex-row md:flex-wrap">
          {featuredPosts.map((p) => (
            <Link
              key={p.id}
              to={p.href || "/"}
              className="w-full flex flex-col bg-white border border-[#E6E6E6] md:w-[calc(33.333%-16px)]"
            >
              <img src={p.img} alt={p.title} className="w-full h-[220px] object-cover" />
              <div className="p-6 flex flex-col gap-3">
                <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42]">
                  {p.title}
                </div>
                <div className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373]">
                  {p.desc}
                </div>
                <div className="font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
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
