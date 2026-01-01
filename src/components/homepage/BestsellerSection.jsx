// src/components/homepage/BestsellerSection.jsx
import ProductCard from "../ProductCard";
import { bestsellerProducts } from "../../data/homePageData";

export default function BestsellerSection() {
  return (
    <section className="w-full flex flex-col items-center bg-white">
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

      <div className="w-full max-w-6xl px-4 py-10 flex flex-col gap-6 md:flex-row md:flex-wrap md:justify-center">
        {bestsellerProducts.map((p) => (
          <div key={p.id} className="w-full md:w-[240px]">
            <ProductCard {...p} />
          </div>
        ))}
      </div>
    </section>
  );
}
