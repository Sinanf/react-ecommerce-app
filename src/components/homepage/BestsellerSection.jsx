// src/components/homepage/BestsellerSection.jsx
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductCard from "../ProductCard";
import {
  fetchCategoriesIfNeeded,
  fetchHomepageBestsellers,
} from "../../store/actions/thunkActions";

/**
 * Turkish slug helper
 * - Example: "ayakkabı" -> "ayakkabi"
 * - Used for readable SEO-friendly routes
 */
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

/**
 * Maps category gender code to URL segment.
 * Backend: "k" (kadın), "e" (erkek), others -> "unisex"
 */
const genderPath = (g) =>
  g === "k" ? "kadin" : g === "e" ? "erkek" : "unisex";

export default function BestsellerSection() {
  const dispatch = useDispatch();

  // Homepage products (separate from Shop page listing)
  const products = useSelector((s) => s?.product?.homeProductList || []);
  const fetchState = useSelector((s) => s?.product?.homeProductFetchState);

  // Needed to build ProductDetail route consistently with ShopPage
  const categories = useSelector((s) => s?.product?.categories || []);

  useEffect(() => {
    // Ensure categories exist (for route building) + load homepage bestsellers
    dispatch(fetchCategoriesIfNeeded());
    dispatch(fetchHomepageBestsellers());
  }, [dispatch]);

  /**
   * Fallback sorting: If backend doesn't provide "top N bestsellers",
   * sort by rating and take the first 8 items.
   */
  const best8 = useMemo(() => {
    const sorted = [...products].sort(
      (a, b) => Number(b?.rating || 0) - Number(a?.rating || 0)
    );
    return sorted.slice(0, 8);
  }, [products]);

  return (
    <section className="w-full flex flex-col items-center bg-white">
      {/* Section header */}
      <div className="w-full max-w-6xl flex flex-col items-center px-4 pt-12 gap-2">
        <div className="text-[20px] leading-[30px] tracking-[0.2px] text-[#737373] text-center">
          Featured Products
        </div>
        <div className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42] text-center">
          BESTSELLER PRODUCTS
        </div>
        <div className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] text-center">
          Problems trying to resolve the conflict between
        </div>
      </div>

      {/* Content */}
      <div className="w-full max-w-6xl px-4 py-10">
        {/* Initial loading (only when list is empty) */}
        {fetchState === "FETCHING" && best8.length === 0 ? (
          <div className="w-full flex items-center justify-center py-12">
            <div className="w-10 h-10 rounded-full border-4 border-[#E6E6E6] border-t-[#23A6F0] animate-spin" />
          </div>
        ) : best8.length === 0 ? (
          // Empty state
          <div className="text-[#737373] text-[14px] text-center py-10">
            No products found.
          </div>
        ) : (
          // Product grid
          <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:justify-center">
            {best8.map((p) => {
              const firstImg = p?.images?.[0]?.url;

              // Build ProductDetail route using category info (same approach as ShopPage)
              const cat = categories.find(
                (c) => Number(c.id) === Number(p.category_id)
              );

              const gender = genderPath(cat?.gender);

              // Category slug: prefer code's right side (e.g. "women:shoes" -> "shoes")
              const categoryName = slugifyTr(
                cat?.code?.split(":")?.[1] || cat?.title || "kategori"
              );

              const productNameSlug = slugifyTr(p?.name || "urun");

              const to = `/shop/${gender}/${categoryName}/${p.category_id}/${productNameSlug}/${p.id}`;

              return (
                <div key={p.id} className="w-full md:w-[240px]">
                  <ProductCard
                    id={p.id}
                    to={to}
                    img={firstImg || "https://picsum.photos/800/900?random=1"}
                    title={p.name}
                    department="English Department"
                    priceOld={`$${(Number(p.price) * 1.25).toFixed(2)}`}
                    priceNew={`$${Number(p.price).toFixed(2)}`}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Error state */}
      {fetchState === "FAILED" && (
        <div className="pb-10 text-red-500 text-[13px]">
          Homepage products could not be loaded.
        </div>
      )}
    </section>
  );
}
