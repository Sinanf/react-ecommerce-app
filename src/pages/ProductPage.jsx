// src/pages/ProductPage.jsx
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, ShoppingCart, Eye, ChevronLeft, ChevronRight, Star } from "lucide-react";

import ProductCard from "../components/ProductCard";
import { getProductById, productDetails } from "../data/productpageData";


export default function ProductPage() {
  const { id } = useParams();
  const product = useMemo(() => getProductById(id || 1), [id]);

  const [activeThumb, setActiveThumb] = useState(0);
  const mainImg = product?.images?.main;
  const thumbs = product?.images?.thumbs || [];

  // fallback
  if (!product) {
    return (
      <div className="w-full flex flex-col items-center justify-center px-4 py-16">
        <div className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">
          Product not found
        </div>
        <Link to="/shop" className="mt-4 text-[#23A6F0] text-[14px]">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-white">
      {/* PAGE TOP: breadcrumb */}
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

      {/* HERO: gallery + product info */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 pb-10 flex flex-col md:flex-row md:items-start gap-8">
          {/* LEFT: Gallery */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="w-full relative overflow-hidden rounded-[6px]">
              <img
                src={activeThumb === 0 ? mainImg : thumbs[activeThumb - 1] || mainImg}
                alt={product.title}
                className="w-full h-[320px] md:h-[450px] object-cover"
              />

              {/* arrows */}
              <button
                type="button"
                aria-label="Previous"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/40"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <button
                type="button"
                aria-label="Next"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/40"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* thumbs */}
            <div className="w-full flex flex-row items-center gap-4">
              {thumbs.map((t, idx) => {
                const isActive = activeThumb === idx + 1;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActiveThumb(idx + 1)}
                    className={`w-20 h-16 rounded-[4px] overflow-hidden border ${
                      isActive ? "border-[#23A6F0]" : "border-[#E6E6E6]"
                    }`}
                    aria-label={`Thumbnail ${idx + 1}`}
                  >
                    <img src={t} alt="thumb" className="w-full h-full object-cover" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Info */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="font-bold text-[20px] leading-[30px] tracking-[0.2px] text-[#252B42]">
              {product.title}
            </div>

            {/* rating */}
            <div className="flex flex-row items-center gap-3">
              <div className="flex flex-row items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#F3CD03]" />
                ))}
              </div>
              <div className="text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
                {product.reviews} Reviews
              </div>
            </div>

            <div className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">
              {product.price}
            </div>

            <div className="text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
              Availability :{" "}
              <span className="text-[#23A6F0] font-bold">{product.availability}</span>
            </div>

            <div className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] max-w-[520px]">
              {product.description}
            </div>

            <div className="w-full h-px bg-[#E6E6E6]" />

            {/* colors */}
            <div className="flex flex-row items-center gap-3">
              {product.colors.map((c) => (
                <div
                  key={c}
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>

            {/* actions */}
            <div className="flex flex-row items-center gap-4 pt-2">
              <button
                type="button"
                className="h-11 px-6 bg-[#23A6F0] text-white font-bold text-[14px] leading-[22px] tracking-[0.2px] rounded-[5px]"
              >
                Select Options
              </button>

              <button
                type="button"
                aria-label="Add to wishlist"
                className="w-10 h-10 rounded-full border border-[#E6E6E6] flex items-center justify-center"
              >
                <Heart className="w-5 h-5 text-[#252B42]" />
              </button>

              <button
                type="button"
                aria-label="Add to cart"
                className="w-10 h-10 rounded-full border border-[#E6E6E6] flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 text-[#252B42]" />
              </button>

              <button
                type="button"
                aria-label="Quick view"
                className="w-10 h-10 rounded-full border border-[#E6E6E6] flex items-center justify-center"
              >
                <Eye className="w-5 h-5 text-[#252B42]" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TABS + CONTENT */}
      <section className="w-full bg-white">
        <div className="w-full max-w-6xl mx-auto px-4">
          {/* tabs row */}
          <div className="w-full flex flex-row items-center justify-center gap-8 border-b border-[#E6E6E6] py-4 text-[14px] leading-[24px] tracking-[0.2px]">
            <button type="button" className="text-[#737373] font-bold">
              Description
            </button>
            <button type="button" className="text-[#737373] font-bold">
              Additional Information
            </button>
            <button type="button" className="text-[#23A6F0] font-bold">
              Reviews (0)
            </button>
          </div>

          <div className="w-full py-10 flex flex-col md:flex-row gap-8">
            {/* left image */}
            <div className="w-full md:w-[360px]">
              <img
                src={product.tabs.image}
                alt="tab visual"
                className="w-full h-[320px] md:h-[360px] object-cover rounded-[6px]"
              />
            </div>

            {/* middle text */}
            <div className="w-full md:flex-1 flex flex-col gap-4">
              <div className="font-bold text-[20px] leading-[30px] tracking-[0.2px] text-[#252B42]">
                {product.tabs.descriptionTitle}
              </div>
              {product.tabs.paragraphs.map((t, idx) => (
                <div
                  key={idx}
                  className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373]"
                >
                  {t}
                </div>
              ))}
            </div>

            {/* right bullets */}
            <div className="w-full md:w-[320px] flex flex-col gap-4">
              <div className="font-bold text-[20px] leading-[30px] tracking-[0.2px] text-[#252B42]">
                {product.tabs.descriptionTitle}
              </div>

              <div className="flex flex-col gap-3">
                {product.tabs.bullets.map((b, idx) => (
                  <div key={idx} className="flex flex-row items-start gap-2">
                    <span className="text-[#737373]">{">"}</span>
                    <span className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373]">
                      {b}
                    </span>
                  </div>
                ))}
              </div>

              <div className="font-bold text-[20px] leading-[30px] tracking-[0.2px] text-[#252B42] pt-2">
                {product.tabs.descriptionTitle}
              </div>

              <div className="flex flex-col gap-3">
                {product.tabs.bullets.map((b, idx) => (
                  <div key={`b2-${idx}`} className="flex flex-row items-start gap-2">
                    <span className="text-[#737373]">{">"}</span>
                    <span className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373]">
                      {b}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BESTSELLER PRODUCTS */}
      <section className="w-full bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 py-10">
          <div className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">
            BESTSELLER PRODUCTS
          </div>

          <div className="mt-8 w-full flex flex-row flex-wrap justify-center gap-6">
            {productDetails.slice(0, 8).map((p) => (
              <div key={p.id} className="w-full md:w-[calc(25%-18px)] flex">
                <ProductCard
                  id={p.id}
                  img={p.images.main}
                  title="Graphic Design"
                  department="English Department"
                  priceOld="$16.48"
                  priceNew="$6.48"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
