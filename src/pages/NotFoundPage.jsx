import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-16">
      <div className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">
        404 - Page Not Found
      </div>
      <Link
        to="/"
        className="mt-6 bg-[#2DC071] rounded-[5px] px-8 py-3 font-bold text-[14px] leading-[22px] tracking-[0.2px] text-white"
      >
        Go Home
      </Link>
    </div>
  );
}
