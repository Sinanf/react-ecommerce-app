import { useParams } from "react-router-dom";

export default function BlogPostPage() {
  const { id } = useParams();

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 py-16">
      <div className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">
        Blog Post #{id}
      </div>
    </div>
  );
}
