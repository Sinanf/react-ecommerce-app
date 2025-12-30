import { ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border p-6 space-y-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          <h1 className="text-xl font-semibold">E-Commerce</h1>
        </div>

        <p className="text-sm opacity-80">
          T01 setup tamamlandı ✅
        </p>

        <button
          className="rounded-xl border px-4 py-2 hover:bg-black/5"
          onClick={() => toast.success("Toast çalışıyor")}
        >
          Test Toast
        </button>
      </div>
    </div>
  );
}
