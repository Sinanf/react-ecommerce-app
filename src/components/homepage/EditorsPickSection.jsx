// src/components/homepage/EditorsPickSection.jsx
import { editorsPick } from "../../data/homePageData";

export default function EditorsPickSection() {
  return (
    <section className="w-full flex flex-col items-center bg-[#FAFAFA]">
      {/* SECTION HEADER */}
      <div className="w-full max-w-6xl flex flex-col items-center px-4 py-10 gap-2">
        <div className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">
          EDITOR’S PICK
        </div>
        <div className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] text-center">
          Problems trying to resolve the conflict between
        </div>
      </div>

      {/* EDITOR'S PICK GRID (MEN / WOMEN / ACCESSORIES / KIDS) */}
      <div className="w-full max-w-6xl px-4 pb-10 flex flex-col gap-4 md:flex-row md:gap-6">
        <Tile img={editorsPick.men} label="MEN" className="md:flex-1 h-[500px]" />
        <Tile img={editorsPick.women} label="WOMEN" className="md:w-[320px] h-[500px]" />

        {/* RIGHT COLUMN: TWO SMALL TILES */}
        <div className="w-full md:w-[320px] flex flex-col gap-4">
          <Tile
            img={editorsPick.accessories}
            label="ACCESSORIES"
            className="h-[242px]"
            small
          />
          <Tile img={editorsPick.kids} label="KIDS" className="h-[242px]" small />
        </div>
      </div>
    </section>
  );
}

/* TILE COMPONENT: IMAGE + LABEL OVERLAY */
function Tile({ img, label, className = "", small = false }) {
  return (
    <div className={`w-full relative flex ${className}`}>
      {/* BACKGROUND IMAGE */}
      <img src={img} alt={label} className="w-full h-full object-cover" />

      {/* LABEL OVERLAY (position differs for small tiles) */}
      <div
        className={`absolute ${
          small ? "left-4 bottom-4 px-10" : "left-6 bottom-6 px-12"
        } py-3 bg-white flex`}
      >
        <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#252B42]">
          {label}
        </div>
      </div>
    </div>
  );
}
