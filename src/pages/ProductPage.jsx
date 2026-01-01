import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { getProductDetailById } from "../data/productpageData";

export default function ProductPage() {
  const { id } = useParams();
  const product = useMemo(() => getProductDetailById(id || 1), [id]);

  const [activeImg, setActiveImg] = useState(0);

  const mainImg = product.images[activeImg] || product.images[0];

  return (
    <div className="w-full flex flex-col bg-white">
      {/* breadcrumb */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 pt-6 pb-4 flex flex-row items-center gap-2 text-[14px] leading-[24px] tracking-[0.2px]">
          <Link to="/" className="font-bold text-[#252B42]">
            Home
          </Link>
          <span className="text-[#BDBDBD]">{">"}</span>
          <Link to="/shop" className="text-[#BDBDBD]">
            Shop
          </Link>
        </div>
      </section>

      {/* top detail */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 pb-8 flex flex-col md:flex-row gap-10">
          {/* left gallery */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="w-full relative flex">
              <img
                src={mainImg}
                alt={product.title}
                className="w-full h-[360px] md:h-[450px] object-cover"
              />

              {/* arrows */}
              <button
                type="button"
                onClick={() =>
                  setActiveImg((v) => (v - 1 + product.images.length) % product.images.length)
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white"
                aria-label="Prev image"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => setActiveImg((v) => (v + 1) % product.images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white"
                aria-label="Next image"
              >
                ›
              </button>
            </div>

            {/* thumbs */}
            <div className="w-full flex flex-row gap-4">
              {product.thumbs.map((t, idx) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveImg(idx)}
                  className="w-[90px] h-[70px] border border-[#E6E6E6] flex"
                >
                  <img src={t} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* right info */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="font-bold text-[20px] leading-[30px] tracking-[0.2px] text-[#252B42]">
              {product.title}
            </div>

            {/* rating row */}
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-row items-center gap-1 text-[#F3CD03]">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
              </div>
              <div className="text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
                {product.reviewsCount} Reviews
              </div>
            </div>

            <div className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">
              {product.price}
            </div>

            <div className="text-[14px] leading-[24px] tracking-[0.2px]">
              <span className="text-[#737373]">Availability : </span>
              <span className="text-[#23A6F0] font-bold">{product.availability}</span>
            </div>

            <div className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373]">
              {product.desc}
            </div>

            <div className="w-full h-px bg-[#E6E6E6]" />

            {/* color dots */}
            <div className="flex flex-row items-center gap-3">
              {product.colors.map((c) => (
                <div
                  key={c}
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            {/* actions */}
            <div className="flex flex-row items-center gap-3 pt-2">
              <button
                type="button"
                className="h-10 px-6 bg-[#23A6F0] text-white font-bold text-[14px] leading-[22px] tracking-[0.2px] rounded-[5px]"
              >
                Select Options
              </button>

              <button
                type="button"
                className="h-10 w-10 rounded-full border border-[#E6E6E6] flex items-center justify-center"
                aria-label="Add to wishlist"
              >
                <Heart className="w-5 h-5 text-[#252B42]" />
              </button>

              <button
                type="button"
                className="h-10 w-10 rounded-full border border-[#E6E6E6] flex items-center justify-center"
                aria-label="Add to cart"
              >
                <ShoppingCart className="w-5 h-5 text-[#252B42]" />
              </button>

              <button
                type="button"
                className="h-10 w-10 rounded-full border border-[#E6E6E6] flex items-center justify-center"
                aria-label="Preview"
              >
                <Eye className="w-5 h-5 text-[#252B42]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* tabs section (static UI like figma) */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-8">
          {/* tab headers */}
          <div className="w-full flex flex-row items-center justify-center gap-8 border-b border-[#E6E6E6] pb-4">
            <div className="font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
              Description
            </div>
            <div className="font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
              Additional Information
            </div>
            <div className="font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#23A6F0]">
              Reviews (0)
            </div>
          </div>

          {/* content */}
          <div className="w-full pt-8 flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 flex">
              <img
                src={product.tabs.image}
                alt="tab visual"
                className="w-full h-[260px] md:h-[320px] object-cover"
              />
            </div>

            <div className="w-full md:w-1/3 flex flex-col gap-3">
              <div className="font-bold text-[20px] leading-[30px] tracking-[0.2px] text-[#252B42]">
                {product.tabs.descriptionTitle}
              </div>
              <div className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] whitespace-pre-line">
                {product.tabs.descriptionText}
              </div>
            </div>

            <div className="w-full md:w-1/3 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="font-bold text-[20px] leading-[30px] tracking-[0.2px] text-[#252B42]">
                  {product.tabs.bulletTitle}
                </div>
                <div className="flex flex-col gap-2">
                  {product.tabs.bullets.slice(0, 4).map((b, i) => (
                    <div key={i} className="flex flex-row items-center gap-2">
                      <span className="text-[#737373]">{">"}</span>
                      <span className="text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="font-bold text-[20px] leading-[30px] tracking-[0.2px] text-[#252B42]">
                  {product.tabs.bulletTitle}
                </div>
                <div className="flex flex-col gap-2">
                  {product.tabs.bullets.slice(4).map((b, i) => (
                    <div key={i} className="flex flex-row items-center gap-2">
                      <span className="text-[#737373]">{">"}</span>
                      <span className="text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bestseller */}
          <div className="w-full pt-10">
            <div className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">
              BESTSELLER PRODUCTS
            </div>

            <div className="w-full pt-6 flex flex-row flex-wrap justify-center gap-6">
              {product.related.map((p) => (
                <div key={p.id} className="w-full md:w-[calc(25%-18px)] flex">
                  <ProductCard {...p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
