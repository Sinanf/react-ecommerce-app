// src/pages/ShopPage.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../components/ProductCard";
import { shopProducts } from "../data/shopPageData";
import { fetchCategoriesIfNeeded } from "../store/actions/thunkActions";

// TR slug helper (ayakkabı -> ayakkabi)
const slugifyTr = (text = "") =>
  String(text)
    .toLowerCase()
    .trim()
    .replaceAll("ç", "c")
    .replaceAll("ğ", "g")
    .replaceAll("ı", "i")
    .replaceAll("ö", "o")
    .replaceAll("ş", "s")
    .replaceAll("ü", "u")
    .replace(/\s+/g, "-");

const genderPath = (g) => (g === "k" ? "kadin" : g === "e" ? "erkek" : "unisex");

export default function ShopPage() {
  const dispatch = useDispatch();

  const categories = useSelector((s) => s?.product?.categories || []);
  const fetchState = useSelector((s) => s?.product?.fetchState);

  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded());
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col bg-white">
      {/* PAGE HEADER */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 pt-8 pb-4 flex flex-col gap-3">
          <div className="w-full flex flex-row items-center justify-between">
            <div className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">
              Shop
            </div>

            {/* breadcrumb */}
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

      {/* CATEGORY CARDS (ALL) */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 pb-6">
          {fetchState === "FETCHING" && categories.length === 0 ? (
            <div className="text-[#737373] text-[14px] py-6">Loading categories...</div>
          ) : categories.length === 0 ? (
            <div className="text-[#737373] text-[14px] py-6">No categories found.</div>
          ) : (
            <div className="w-full flex flex-row gap-4 overflow-x-auto md:overflow-visible">
              {categories.map((c) => {
                const gender = genderPath(c.gender);
                const categoryName = slugifyTr(c.code?.split(":")?.[1] || c.title);
                const to = `/shop/${gender}/${categoryName}/${c.id}`;

                return (
                  <Link
                    key={c.id}
                    to={to}
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
                        Rating: {c.rating}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* TOOLBAR */}
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="text-[14px] leading-[24px] tracking-[0.2px] text-[#737373]">
            Showing all {shopProducts.length} results
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
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
            <div key={p.id} className="w-full md:w-[calc(25%-18px)] flex">
              <ProductCard {...p} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
