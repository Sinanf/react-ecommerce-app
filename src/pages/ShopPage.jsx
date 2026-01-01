// src/pages/ShopPage.jsx
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { shopCategories, shopProducts } from "../data/shopPageData";

export default function ShopPage() {
  return (
    <div className="w-full flex flex-col bg-white">
      {/* PAGE HEADER */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 pt-8 pb-4 flex flex-col gap-3">
          <div className="w-full flex flex-row items-center justify-between">
            <div className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">
              Shop
            </div>

            {/* breadcrumb (desktop look) */}
            <div className="hidden md:flex flex-row items-center gap-2 text-[14px] leading-[24px] tracking-[0.2px]">
              <Link to="/" className="font-bold text-[#252B42]">
                Home
              </Link>
              <span className="text-[#BDBDBD]">{">"}</span>
              <span className="text-[#BDBDBD]">Shop</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY CARDS */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 pb-6">
          {/* Mobile: horizontal scroll */}
          <div className="w-full flex flex-row gap-4 overflow-x-auto md:overflow-visible">
            {shopCategories.map((c) => (
              <Link
                key={c.id}
                to="/shop"
                className="shrink-0 w-[240px] h-[240px] md:w-[210px] md:h-[210px] relative flex"
              >
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-white">
                    {c.title}
                  </div>
                  <div className="text-[14px] leading-[24px] tracking-[0.2px] text-white">
                    {c.items}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLBAR */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
            Showing all {shopProducts.length} results
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
            {/* Views */}
            <div className="flex flex-row items-center gap-2">
              <div className="text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
                Views:
              </div>
              <button
                type="button"
                className="w-10 h-10 border border-[#E6E6E6] flex items-center justify-center"
                aria-label="Grid view"
              >
                ▦
              </button>
              <button
                type="button"
                className="w-10 h-10 border border-[#E6E6E6] flex items-center justify-center"
                aria-label="List view"
              >
                ≡
              </button>
            </div>

            {/* Sort + Filter */}
            <div className="flex flex-row items-center gap-3">
              <select className="h-10 px-4 border border-[#E6E6E6] text-[14px] text-[#737373] bg-white">
                <option>Popularity</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>

              <button
                type="button"
                className="h-10 px-6 bg-[#23A6F0] text-white font-bold text-[14px] leading-[22px] tracking-[0.2px] rounded-[5px]"
              >
                Filter
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-6 flex flex-row flex-wrap justify-center gap-6">
          {shopProducts.map((p) => (
            <div
              key={p.id}
              className="w-full md:w-[calc(25%-18px)] flex"
            >
              <ProductCard {...p} />
            </div>
          ))}
        </div>
      </section>

      {/* PAGINATION */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 pb-10 flex items-center justify-center">
          <div className="flex flex-row items-center overflow-hidden rounded-[6px] border border-[#E6E6E6]">
            <button className="h-12 px-6 text-[14px] text-[#BDBDBD] bg-[#F3F3F3]">
              First
            </button>
            <button className="h-12 w-12 text-[14px] text-[#23A6F0] bg-white border-l border-[#E6E6E6]">
              1
            </button>
            <button className="h-12 w-12 text-[14px] text-white bg-[#23A6F0] border-l border-[#E6E6E6]">
              2
            </button>
            <button className="h-12 w-12 text-[14px] text-[#23A6F0] bg-white border-l border-[#E6E6E6]">
              3
            </button>
            <button className="h-12 px-6 text-[14px] text-[#23A6F0] bg-white border-l border-[#E6E6E6]">
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
