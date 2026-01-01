import { Link } from "react-router-dom";

export default function ProductCard({
  id,
  img,
  title,
  department,
  priceOld,
  priceNew,
}) {
  return (
    <Link to={`/product/${id}`} className="w-full flex">
      <div className="w-full flex flex-col bg-white">
        {/* image */}
        <div className="w-full flex flex-col">
          <img
            src={img}
            alt={title}
            className="w-full aspect-[348/427] object-cover"
          />
        </div>

        {/* content */}
        <div className="w-full flex flex-col items-center gap-2 px-6 py-6">
          <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42] text-center">
            {title}
          </div>
          <div className="font-bold text-[14px] leading-[24px] tracking-[0.2px] text-[#737373] text-center">
            {department}
          </div>

          <div className="flex flex-row items-center gap-[5px] py-[5px] px-[3px]">
            <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#BDBDBD]">
              {priceOld}
            </div>
            <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#23856D]">
              {priceNew}
            </div>
          </div>

          {/* colors */}
          <div className="flex flex-row items-center gap-[6px]">
            <div className="w-4 h-4 rounded-full bg-[#23A6F0]" />
            <div className="w-4 h-4 rounded-full bg-[#23856D]" />
            <div className="w-4 h-4 rounded-full bg-[#E77C40]" />
            <div className="w-4 h-4 rounded-full bg-[#252B42]" />
          </div>
        </div>
      </div>
    </Link>
  );
}
