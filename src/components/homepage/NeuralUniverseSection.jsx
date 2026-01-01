// src/components/homepage/NeuralUniverseSection.jsx
import { Link } from "react-router-dom";
import { neuralUniverse } from "../../data/homePageData";

export default function NeuralUniverseSection() {
  return (
    <section className="w-full bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center gap-10">
        <div className="w-full md:w-1/2 flex">
          <img
            src={neuralUniverse.img}
            alt={neuralUniverse.title}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col items-start">
          <div className="font-bold text-[16px] leading-[24px] tracking-[0.1px] text-[#BDBDBD]">
            {neuralUniverse.season}
          </div>
          <div className="mt-4 font-bold text-[40px] leading-[50px] tracking-[0.2px] text-[#252B42]">
            {neuralUniverse.title}
          </div>
          <div className="mt-4 text-[14px] leading-[20px] tracking-[0.2px] text-[#737373] max-w-[420px]">
            {neuralUniverse.desc}
          </div>

          <div className="mt-6 flex flex-row items-center gap-4">
            <Link
              to={neuralUniverse.primaryHref || "/"}
              className="bg-[#2DC071] rounded-[5px] px-8 py-3 font-bold text-[14px] leading-[22px] tracking-[0.2px] text-white"
            >
              {neuralUniverse.primaryBtn}
            </Link>

            <Link
              to={neuralUniverse.secondaryHref || "/"}
              className="border border-[#2DC071] rounded-[5px] px-8 py-3 font-bold text-[14px] leading-[22px] tracking-[0.2px] text-[#2DC071]"
            >
              {neuralUniverse.secondaryBtn}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
