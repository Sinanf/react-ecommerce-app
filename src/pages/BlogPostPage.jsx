// src/pages/BlogPostPage.jsx
import { Link, useParams } from "react-router-dom";
import { featuredPosts } from "../data/homePageData";

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso || "";
  }
};

export default function BlogPostPage() {
  const { id } = useParams();

  // ✅ Eğer id varsa: detail mod
  const post = featuredPosts.find((p) => String(p.id) === String(id));

  // ✅ id yoksa (ileride /blog route eklersen): listing mod
  const isDetail = Boolean(id);

  if (isDetail && post) {
    return (
      <div className="w-full bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 py-10">
          <div className="text-[14px] text-[#737373]">
            {post.tags?.join("  •  ")}
          </div>

          <h1 className="mt-2 font-bold text-[32px] leading-[40px] tracking-[0.2px] text-[#252B42]">
            {post.title}
          </h1>

          <div className="mt-3 flex items-center gap-6 text-[13px] text-[#737373]">
            <div>📅 {formatDate(post.date)}</div>
            <div>💬 {post.comments ?? 0} comments</div>
          </div>

          <div className="mt-6 w-full overflow-hidden rounded-[10px] border border-[#E6E6E6]">
            <img
              src={post.img}
              alt={post.title}
              className="w-full h-[260px] md:h-[420px] object-cover"
            />
          </div>

          <div className="mt-8 space-y-4 text-[14px] leading-[22px] text-[#737373] max-w-3xl">
            {(post.content || []).map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex h-10 px-4 items-center justify-center rounded-[8px] border border-[#E6E6E6] text-[#252B42] font-bold hover:bg-[#FAFAFA]"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Listing (senin attığın görseldeki gibi kart grid)
  return (
    <div className="w-full bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="w-full flex flex-col items-center gap-2">
          <div className="font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#23A6F0]">
            Practice Advice
          </div>
          <div className="font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#252B42] text-center">
            Blog
          </div>
          <div className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] text-center max-w-[520px]">
            Latest posts and updates
          </div>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredPosts.map((p) => (
            <Link
              key={p.id}
              to={`/blog/${p.id}`}
              className="w-full bg-white border border-[#E6E6E6] rounded-[10px] overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* image */}
              <div className="relative w-full h-[520px]">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
                {p.isNew && (
                  <div className="absolute top-4 left-4 bg-[#E74040] text-white text-[12px] font-bold px-3 py-1 rounded-[6px]">
                    NEW
                  </div>
                )}
              </div>

              {/* content */}
              <div className="p-6">
                <div className="text-[12px] text-[#737373] flex flex-wrap gap-3">
                  {(p.tags || []).map((t) => (
                    <span key={t} className={t === "Google" ? "text-[#23A6F0]" : ""}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-2 font-bold text-[20px] leading-[28px] text-[#252B42]">
                  {p.title}
                </div>

                <div className="mt-3 text-[14px] leading-[20px] text-[#737373]">
                  {p.desc}
                </div>

                <div className="mt-5 flex items-center justify-between text-[12px] text-[#737373]">
                  <div>📅 {formatDate(p.date)}</div>
                  <div>💬 {p.comments ?? 0} comments</div>
                </div>

                <div className="mt-6 font-bold text-[14px] text-[#737373]">
                  Learn More →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
