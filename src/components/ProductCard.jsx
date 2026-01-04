// src/components/ProductCard.jsx
import { Link } from "react-router-dom";

export default function ProductCard({
  id,
  img,
  title,
  department,
  priceOld,
  priceNew,
  to,
  variant = "default", // ✅ default | compact
}) {
  const href = to || (id ? `/product/${id}` : "/product");

  const isCompact = variant === "compact";

  return (
    <Link to={href} className="w-full cursor-pointer">
      <div
        className={`w-full flex flex-col bg-white transition-transform duration-200 hover:-translate-y-1 hover:shadow-md ${
          isCompact ? "border border-[#F2F2F2]" : ""
        }`}
      >
        {/* image */}
        <div className="w-full">
          {isCompact ? (
            <div className="w-full h-[238px] overflow-hidden bg-[#F6F6F6]">
              <img
                src={img}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <img
              src={img}
              alt={title}
              className="w-full aspect-[348/427] object-cover"
            />
          )}
        </div>

        {/* content */}
        <div
          className={`w-full flex flex-col ${
            isCompact ? "items-start px-4 py-4 gap-1" : "items-center px-6 py-6 gap-2"
          }`}
        >
          <div
            className={`font-bold text-[#252B42] ${
              isCompact ? "text-[16px] leading-[24px]" : "text-[16px] leading-[24px] text-center"
            }`}
          >
            {title}
          </div>

          <div
            className={`font-bold text-[#737373] ${
              isCompact ? "text-[14px] leading-[24px]" : "text-[14px] leading-[24px] text-center"
            }`}
          >
            {department}
          </div>

          <div className={`flex flex-row items-center gap-[6px] ${isCompact ? "mt-2" : "py-[5px] px-[3px]"}`}>
            <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#BDBDBD]">
              {priceOld}
            </div>
            <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#23856D]">
              {priceNew}
            </div>
          </div>

          {/* colors (Figma’da bestseller’da yok gibi; istersen compact’ta kapatalım) */}
          {!isCompact && (
            <div className="flex flex-row items-center gap-[6px]">
              <div className="w-4 h-4 rounded-full bg-[#23A6F0]" />
              <div className="w-4 h-4 rounded-full bg-[#23856D]" />
              <div className="w-4 h-4 rounded-full bg-[#E77C40]" />
              <div className="w-4 h-4 rounded-full bg-[#252B42]" />
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
