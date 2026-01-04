// src/pages/CartPage.jsx
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// actions isimleri sende farklı olabilir -> aşağıdaki importu kendi cartActions.js'ine göre güncelle
import {
  increaseItem,
  decreaseItem,
  removeItem,
  toggleItemChecked,
} from "../store/actions/cartActions";

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((s) => s?.cart?.cart || []);

  const summary = useMemo(() => {
    const checkedItems = cart.filter((i) => i.checked);
    const totalCount = checkedItems.reduce((acc, i) => acc + (i.count || 0), 0);
    const totalAmount = checkedItems.reduce(
      (acc, i) => acc + (Number(i?.product?.price || 0) * Number(i.count || 0)),
      0
    );
    return { totalCount, totalAmount };
  }, [cart]);

  if (!cart.length) {
    return (
      <div className="w-full bg-white">
        <div className="w-full max-w-6xl mx-auto px-4 py-12">
          <h1 className="text-[24px] font-bold text-[#252B42]">Shopping Cart</h1>
          <div className="mt-6 text-[#737373]">
            Cart is empty.{" "}
            <Link to="/shop" className="text-[#23A6F0] font-bold">
              Go to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-bold text-[#252B42]">Shopping Cart</h1>
          <Link to="/shop" className="text-[#23A6F0] font-bold">
            Continue Shopping →
          </Link>
        </div>

        {/* Table */}
        <div className="mt-8 border border-[#E6E6E6] rounded-[8px] overflow-hidden">
          {/* table head */}
          <div className="hidden md:grid grid-cols-[60px_1.2fr_140px_160px_140px_80px] bg-[#FAFAFA] border-b border-[#E6E6E6]">
            <div className="p-4 text-[14px] font-bold text-[#252B42]">Sel</div>
            <div className="p-4 text-[14px] font-bold text-[#252B42]">Product</div>
            <div className="p-4 text-[14px] font-bold text-[#252B42]">Price</div>
            <div className="p-4 text-[14px] font-bold text-[#252B42]">Quantity</div>
            <div className="p-4 text-[14px] font-bold text-[#252B42]">Total</div>
            <div className="p-4 text-[14px] font-bold text-[#252B42]"></div>
          </div>

          {/* rows */}
          <div className="divide-y divide-[#E6E6E6]">
            {cart.map((item) => {
              const p = item.product || {};
              const img = p?.images?.[0]?.url || "https://picsum.photos/200/200?random=11";
              const price = Number(p.price || 0);
              const count = Number(item.count || 0);
              const rowTotal = price * count;

              return (
                <div
                  key={p.id}
                  className="grid grid-cols-1 md:grid-cols-[60px_1.2fr_140px_160px_140px_80px]"
                >
                  {/* mobile layout header */}
                  <div className="md:hidden flex items-center justify-between px-4 pt-4">
                    <div className="text-[#252B42] font-bold">{p.name}</div>
                    <button
                      type="button"
                      onClick={() => dispatch(removeItem(p.id))}
                      className="text-[#BDBDBD] hover:text-[#252B42]"
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  </div>

                  {/* checkbox */}
                  <div className="p-4 flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={Boolean(item.checked)}
                      onChange={() => dispatch(toggleItemChecked(p.id))}
                      className="w-5 h-5 accent-[#23A6F0]"
                    />
                  </div>

                  {/* product */}
                  <div className="p-4 flex items-center gap-4">
                    <div className="w-20 h-20 rounded-[6px] overflow-hidden border border-[#E6E6E6] bg-[#FAFAFA] shrink-0">
                      <img src={img} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[#252B42] font-bold">{p.name}</div>
                      <div className="text-[#737373] text-[14px] line-clamp-2">
                        {p.description}
                      </div>
                    </div>
                  </div>

                  {/* price */}
                  <div className="p-4 flex items-center text-[#252B42] font-bold">
                    ${price.toFixed(2)}
                  </div>

                  {/* quantity */}
                  <div className="p-4 flex items-center">
                    <div className="inline-flex items-center border border-[#E6E6E6] rounded-[6px] overflow-hidden">
                      <button
                        type="button"
                        onClick={() => dispatch(decreaseItem(p.id))}
                        className="w-10 h-10 flex items-center justify-center bg-white hover:bg-[#FAFAFA]"
                        aria-label="Decrease"
                      >
                        −
                      </button>
                      <div className="w-12 h-10 flex items-center justify-center font-bold text-[#252B42]">
                        {count}
                      </div>
                      <button
                        type="button"
                        onClick={() => dispatch(increaseItem(p.id))}
                        className="w-10 h-10 flex items-center justify-center bg-white hover:bg-[#FAFAFA]"
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* row total */}
                  <div className="p-4 flex items-center font-bold text-[#23856D]">
                    ${rowTotal.toFixed(2)}
                  </div>

                  {/* remove (desktop) */}
                  <div className="p-4 hidden md:flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => dispatch(removeItem(p.id))}
                      className="text-[#BDBDBD] hover:text-[#252B42]"
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  </div>

                  {/* mobile totals */}
                  <div className="md:hidden px-4 pb-4 flex items-center justify-between">
                    <div className="text-[#737373] text-[14px]">
                      ${price.toFixed(2)} × {count}
                    </div>
                    <div className="font-bold text-[#23856D]">${rowTotal.toFixed(2)}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* footer total */}
          <div className="bg-[#FAFAFA] border-t border-[#E6E6E6] px-4 py-4 flex items-center justify-between">
            <div className="text-[#737373] text-[14px]">
              Selected items: <span className="font-bold text-[#252B42]">{summary.totalCount}</span>
            </div>
            <div className="text-[#252B42] font-bold text-[18px]">
              Total: <span className="text-[#23856D]">${summary.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* NOTE: Order Summary / Create Order T19+ */}
        <div className="mt-4 text-[12px] text-[#BDBDBD]">
          Order Summary / Create Order sonraki tasklerde.
        </div>
      </div>
    </div>
  );
}
