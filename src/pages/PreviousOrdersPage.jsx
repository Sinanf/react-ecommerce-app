// src/pages/PreviousOrdersPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, fetchProducts } from "../store/actions/thunkActions";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../store/actions/cartActions";


const money = (n) => `$${Number(n || 0).toFixed(2)}`;
const onlyDigits = (s = "") => String(s).replace(/\D/g, "");
const maskLast4 = (cardNo) => {
  const d = onlyDigits(cardNo);
  const last4 = d.slice(-4);
  return last4 ? `**** ${last4}` : "****";
};

const getOrderId = (o) => o?.id ?? o?.order_id ?? "-";
const getOrderDate = (o) => o?.order_date || o?.date || o?.created_at || "";
const getOrderTotal = (o) => o?.price ?? o?.total ?? 0;

const getOrderProducts = (o) => {
  if (Array.isArray(o?.products)) return o.products;
  if (Array.isArray(o?.items)) return o.items;
  return [];
};

const getAddressId = (o) => o?.address_id ?? o?.address?.id ?? "-";

const getFirstImageFromProduct = (p) => {
  const img =
    p?.images?.[0]?.url ||
    p?.images?.[0] ||
    p?.image ||
    p?.img ||
    "";
  return typeof img === "string" ? img : "";
};

const buildProductUrl = (product) => {
  return `/product/${product?.id}`;
};

export default function PreviousOrdersPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const orders = useSelector((s) => s?.client?.orders || []);
  const fetchState = useSelector(
    (s) => s?.client?.ordersFetchState || "NOT_FETCHED"
  );

  // Ürün isim/görsel için (varsa)
  const productList = useSelector((s) => s?.product?.productList || []);
  const productFetchState = useSelector(
    (s) => s?.product?.productFetchState || "NOT_FETCHED"
  );

  const [openMap, setOpenMap] = useState({}); // orderId -> bool

  useEffect(() => {
    dispatch(fetchOrders());

    // Amazon benzeri görünüm için ürün meta (isim/görsel) faydalı.
    // productList boşsa bir sayfa ürün çekelim (istenirse kaldırabilirsin).
    if (!Array.isArray(productList) || productList.length === 0) {
      dispatch(fetchProducts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const productById = useMemo(() => {
    const m = new Map();
    (productList || []).forEach((p) => {
      if (p?.id != null) m.set(String(p.id), p);
    });
    return m;
  }, [productList]);

  const toggle = (orderId) => {
    setOpenMap((prev) => ({ ...prev, [String(orderId)]: !prev[String(orderId)] }));
  };

  return (
    <div className="w-full bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 py-10">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-[28px] font-bold text-[#252B42]">
              Your Orders
            </h1>
            <div className="text-[#737373] text-[14px] mt-1">
              Review, track, and manage your orders
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:block text-[12px] text-[#BDBDBD]">
              {productFetchState === "FETCHING" ? "Loading products…" : ""}
            </div>

            <button
              type="button"
              onClick={() => dispatch(fetchOrders())}
              className="h-10 px-4 rounded-[10px] border border-[#E6E6E6] text-[#252B42] font-bold hover:bg-[#FAFAFA]"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* States */}
        {fetchState === "FETCHING" && (
          <div className="mt-6 border border-[#E6E6E6] rounded-[12px] p-6 text-[#737373]">
            Loading orders...
          </div>
        )}

        {fetchState !== "FETCHING" && orders.length === 0 && (
          <div className="mt-6 border border-[#E6E6E6] rounded-[12px] p-6 text-[#737373]">
            No previous orders found.
          </div>
        )}

        {/* Orders list */}
        <div className="mt-6 space-y-4">
          {orders.map((o) => {
            const id = getOrderId(o);
            const dateRaw = getOrderDate(o);
            const dateText = dateRaw ? new Date(dateRaw).toLocaleString() : "-";
            const total = getOrderTotal(o);
            const addressId = getAddressId(o);

            const products = getOrderProducts(o);
            const itemsCount = products.reduce(
              (acc, p) => acc + Number(p?.count ?? p?.quantity ?? 0),
              0
            );

            const isOpen = Boolean(openMap[String(id)]);

            return (
              <div
                key={String(id)}
                className="border border-[#E6E6E6] rounded-[14px] overflow-hidden"
              >
                {/* Amazon-like summary bar */}
                <div className="bg-[#F6F7F8] border-b border-[#E6E6E6] px-4 py-3">
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-[12px]">
                    <div>
                      <div className="text-[#737373] font-bold">ORDER PLACED</div>
                      <div className="text-[#252B42]">{dateText}</div>
                    </div>

                    <div>
                      <div className="text-[#737373] font-bold">TOTAL</div>
                      <div className="text-[#252B42] font-bold">
                        {money(total)}
                      </div>
                    </div>

                    <div>
                      <div className="text-[#737373] font-bold">SHIP TO</div>
                      <div className="text-[#252B42]">
                        Address #{String(addressId)}
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <div className="text-[#737373] font-bold">PAYMENT</div>
                      <div className="text-[#252B42]">
                        {o?.card_name ? `${o.card_name} • ${maskLast4(o?.card_no)}` : "-"}
                      </div>
                    </div>

                    <div className="flex items-start md:justify-end">
                      <div className="text-right">
                        <div className="text-[#737373] font-bold">ORDER #</div>
                        <div className="text-[#252B42] font-bold">{id}</div>

                        <button
                          type="button"
                          onClick={() => toggle(id)}
                          className="mt-1 text-[#23A6F0] font-bold"
                        >
                          {isOpen ? "Hide details" : "View details"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="px-4 py-4 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="text-[14px] text-[#737373]">
                      {itemsCount} item{itemsCount === 1 ? "" : "s"}
                    </div>

                    <div className="text-[12px] text-[#BDBDBD]">
                      {/* istersen burada status yazarsın */}
                    </div>
                  </div>

                  {/* Collapsible details */}
                  {isOpen && (
                    <div className="mt-4">
                      <div className="text-[14px] font-bold text-[#252B42]">
                        Order Items
                      </div>

                      <div className="mt-3 space-y-3">
                        {products.length === 0 ? (
                          <div className="text-[#737373] text-[14px]">
                            No product details.
                          </div>
                        ) : (
                          products.map((p, idx) => {
                            const pid = p?.product_id ?? p?.id ?? "";
                            const count = Number(p?.count ?? p?.quantity ?? 0);

                            const productMeta =
                              productById.get(String(pid)) || null;

                            const name =
                              productMeta?.name ||
                              productMeta?.title ||
                              `Product #${pid || "-"}`;

                            const img =
                              getFirstImageFromProduct(productMeta) ||
                              p?.img ||
                              p?.image ||
                              "https://picsum.photos/120/120?random=11";

                            const detail = p?.detail || p?.variant || "-";
                            const price =
                              productMeta?.price != null
                                ? Number(productMeta.price)
                                : null;

                            return (
                              <div
                                key={`${id}-${idx}`}
                                className="flex gap-4 border border-[#E6E6E6] rounded-[12px] p-3"
                              >
                                <div className="w-[84px] h-[84px] rounded-[10px] overflow-hidden bg-[#FAFAFA] border border-[#E6E6E6] shrink-0">
                                  <img
                                    src={img}
                                    alt={name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                      <div className="text-[#252B42] font-bold text-[14px] truncate">
                                        {name}
                                      </div>
                                      <div className="text-[#737373] text-[12px] mt-1">
                                        Detail: {detail}
                                      </div>
                                    </div>

                                    <div className="text-right shrink-0">
                                      <div className="text-[#252B42] font-bold text-[13px]">
                                        Qty: {count}
                                      </div>
                                      {price != null && (
                                        <div className="text-[#737373] text-[12px] mt-1">
                                          {money(price)} each
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div className="mt-3 flex items-center gap-2">
                                    {/* Amazon vibe action buttons (placeholder) */}
                                    <button
  type="button"
  onClick={() => {
    if (!productMeta?.id) return;
    dispatch(addToCart(productMeta));
  }}
  className="h-9 px-3 rounded-[10px] border border-[#E6E6E6] text-[#252B42] text-[13px] font-bold hover:bg-[#FAFAFA]"
>
  Buy it again
</button>

<button
  type="button"
  onClick={() => {
    if (!productMeta?.id) return;
    navigate(buildProductUrl(productMeta));
  }}
  className="h-9 px-3 rounded-[10px] border border-[#E6E6E6] text-[#252B42] text-[13px] font-bold hover:bg-[#FAFAFA]"
>
  View product
</button>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {fetchState === "FAILED" && (
          <div className="mt-4 text-red-500 text-[13px]">
            Orders could not be loaded. Check auth token and Network tab.
          </div>
        )}
      </div>
    </div>
  );
}
