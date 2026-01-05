// src/pages/CreateOrderPaymentPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  fetchCardList,
  createCard,
  updateCard,
  deleteCard,
  fetchAddressList, // address_id fallback için
  createOrder, // T22
} from "../store/actions/thunkActions";
import { clearCart } from "../store/actions/cartActions";

const emptyForm = {
  id: null,
  card_no: "",
  expire_month: "",
  expire_year: "",
  name_on_card: "",
};

const onlyDigits = (s = "") => String(s).replace(/\D/g, "");

const formatCardNo = (digits = "") => {
  const d = onlyDigits(digits).slice(0, 16);
  return d.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
};

const maskCardNo = (digits = "") => {
  const d = onlyDigits(digits);
  if (!d) return "";
  const last4 = d.slice(-4);
  return `**** **** **** ${last4}`;
};

export default function CreateOrderPaymentPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // redux state
  const cards = useSelector((s) => s?.client?.creditCards || []);
  const addressList = useSelector((s) => s?.client?.addressList || []);
  const cart = useSelector((s) => s?.cart?.cart || []);

  // location.state (Address page'den gelen)
  const { shippingId, billingId: _billingId } = location.state || {};


  // address_id fallback: shippingId varsa onu, yoksa ilk adres
  const effectiveAddressId = shippingId ?? addressList?.[0]?.id ?? null;

  // local UI state
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const [selectedCardId, setSelectedCardId] = useState(null);

  // CCV order için (karta kaydedilmez)
  const [ccv, setCcv] = useState("");

  // order başarılıysa aynı sayfada “Congrats”
  const [orderOk, setOrderOk] = useState(false);

  // load saved cards + addresses
  useEffect(() => {
    dispatch(fetchCardList());
    dispatch(fetchAddressList());
  }, [dispatch]);

  // default card selection
  const firstCardId = cards?.[0]?.id ?? null;
  const effectiveSelectedId = selectedCardId ?? firstCardId;

  const selectedCard = useMemo(() => {
    return (
      cards.find((c) => String(c.id) === String(effectiveSelectedId)) || null
    );
  }, [cards, effectiveSelectedId]);

  // Order Summary (checked ürünler)
  const summary = useMemo(() => {
    const checked = cart.filter((i) => i.checked);
    const productsTotal = checked.reduce(
      (acc, i) => acc + Number(i.count || 0) * Number(i?.product?.price || 0),
      0
    );

    const shipping = productsTotal > 150 ? 0 : checked.length ? 29.99 : 0;
    const discount = productsTotal > 150 ? 29.99 : 0;
    const grandTotal = productsTotal + shipping - discount;

    return { productsTotal, shipping, discount, grandTotal, checked };
  }, [cart]);

  const months = useMemo(() => Array.from({ length: 12 }, (_, i) => i + 1), []);
  const years = useMemo(() => {
    const now = new Date().getFullYear();
    return Array.from({ length: 16 }, (_, i) => now + i);
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (card) => {
    setEditing(card);
    setForm({
      id: card?.id ?? null,
      card_no: String(card?.card_no ?? ""),
      expire_month: String(card?.expire_month ?? ""),
      expire_year: String(card?.expire_year ?? ""),
      name_on_card: String(card?.name_on_card ?? ""),
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
  };

  const validateCardForm = () => {
    const cardDigits = onlyDigits(form.card_no);
    if (cardDigits.length !== 16) return "Kart numarası 16 haneli olmalı.";

    const m = Number(form.expire_month);
    const y = Number(form.expire_year);
    if (!m || m < 1 || m > 12) return "Geçerli bir ay seç.";
    if (!y || y < 2000) return "Geçerli bir yıl seç.";

    if (!String(form.name_on_card || "").trim())
      return "Kart üzerindeki isim gerekli.";

    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const errMsg = validateCardForm();
    if (errMsg) {
      alert(errMsg);
      return;
    }

    const payload = {
      card_no: onlyDigits(form.card_no),
      expire_month: Number(form.expire_month),
      expire_year: Number(form.expire_year),
      name_on_card: form.name_on_card.trim(),
    };

    if (editing?.id) {
      await dispatch(updateCard({ id: editing.id, ...payload }));
    } else {
      await dispatch(createCard(payload));
    }

    closeForm();
    // İstersen burada refresh de yapabilirsin ama fetchCardList zaten sayfa açılışında var
    dispatch(fetchCardList());
  };

  const onDelete = async (cardId) => {
    await dispatch(deleteCard(cardId));
    if (String(selectedCardId) === String(cardId)) setSelectedCardId(null);
    dispatch(fetchCardList());
  };

  // payment options (placeholder)
  const paymentOptions = useMemo(() => {
    const digits = onlyDigits(selectedCard?.card_no || "");
    const first = digits[0];
    const brand =
      first === "4"
        ? "VISA"
        : first === "5"
        ? "Mastercard"
        : digits
        ? "Card"
        : "-";

    return [
      { id: "single", title: "Tek Çekim", desc: `Kart: ${brand}` },
      {
        id: "installment",
        title: "Taksit (placeholder)",
        desc: "Taksit seçenekleri sonraki task",
      },
    ];
  }, [selectedCard]);

  // T22 payload
  const buildOrderPayload = () => {
    const addrId = Number(effectiveAddressId);

    const cardDigits = onlyDigits(selectedCard?.card_no || "");
    const month = Number(selectedCard?.expire_month);
    const year = Number(selectedCard?.expire_year);
    const ccvDigits = onlyDigits(ccv).slice(0, 4);

    const products = summary.checked.map((i) => ({
      product_id: Number(i?.product?.id),
      count: Number(i?.count || 0),
      detail: String(i?.detail || i?.variant || i?.selectedVariant || ""),
    }));

    return {
      address_id: addrId,
      order_date: new Date().toISOString(),
      // 16 hane number JS’te bozulur → string
      card_no: cardDigits,
      card_name: String(selectedCard?.name_on_card || ""),
      card_expire_month: month,
      card_expire_year: year,
      card_ccv: Number(ccvDigits),
      price: Number(summary.grandTotal.toFixed(2)),
      products,
      // billingId backend isterse sonra ekleriz:
      // billing_address_id: billingId ? Number(billingId) : undefined,
    };
  };

  const canPay = useMemo(() => {
    if (!effectiveAddressId) return false;
    if (!selectedCard) return false;
    if (summary.checked.length === 0) return false;

    const cardDigits = onlyDigits(selectedCard?.card_no || "");
    if (cardDigits.length !== 16) return false;

    const m = Number(selectedCard?.expire_month);
    const y = Number(selectedCard?.expire_year);
    if (!m || m < 1 || m > 12) return false;
    if (!y || y < 2000) return false;

    const ccvDigits = onlyDigits(ccv);
    if (!(ccvDigits.length === 3 || ccvDigits.length === 4)) return false;

    return true;
  }, [effectiveAddressId, selectedCard, summary.checked.length, ccv]);

  const onPay = async () => {
    if (!canPay) return;

    const payload = buildOrderPayload();

    const res = await dispatch(createOrder(payload));

    if (res?.ok) {
      setOrderOk(true);
      dispatch(clearCart());
    } else {
      // hata görünürlüğü için (istersen toast yaparsın)
      alert(res?.message || "Order oluşturulamadı. Console/Network kontrol et.");
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 py-10">
        {/* Steps bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-[#E6E6E6] rounded-[8px] p-4 opacity-60">
            <div className="font-bold text-[#252B42]">
              1 — Address Information
            </div>
            <div className="text-[#737373] text-[14px] mt-1">
              Shipping & billing address
            </div>
          </div>

          <div className="border border-[#E6E6E6] rounded-[8px] p-4">
            <div className="font-bold text-[#252B42]">2 — Payment Options</div>
            <div className="text-[#737373] text-[14px] mt-1">Credit card</div>
          </div>

          <div className="md:flex md:justify-end">
            <button
              type="button"
              className="w-full md:w-auto h-11 px-8 bg-[#E77C40] text-white font-bold rounded-[8px]"
              disabled
            >
              Save & Continue
            </button>
          </div>
        </div>

        {orderOk && (
          <div className="mt-6 border border-[#E6E6E6] rounded-[10px] p-5 bg-[#F2FAFF]">
            <div className="font-bold text-[#252B42] text-[18px]">
              🎉 Congrats! Your order has been created.
            </div>
            <div className="mt-2 text-[#737373] text-[14px]">
              Siparişiniz başarıyla oluşturuldu. Teşekkürler!
            </div>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/shop")}
                className="h-10 px-4 rounded-[8px] bg-[#23A6F0] text-white font-bold"
              >
                Continue Shopping
              </button>
              <button
                type="button"
                onClick={() => navigate("/")}
                className="h-10 px-4 rounded-[8px] border border-[#E6E6E6] text-[#252B42] font-bold"
              >
                Go Home
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* LEFT */}
          <div className="border border-[#E6E6E6] rounded-[10px] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-bold text-[#252B42]">
                Payment Method
              </h2>

              <div className="flex items-center gap-3">
                <Link
                  to="/order/create"
                  className="h-10 px-4 border border-[#E6E6E6] rounded-[8px] text-[#252B42] font-bold hover:bg-[#FAFAFA] flex items-center"
                >
                  ← Back
                </Link>

                <button
                  type="button"
                  onClick={openCreate}
                  className="h-10 px-4 border border-[#E6E6E6] rounded-[8px] text-[#252B42] font-bold hover:bg-[#FAFAFA]"
                >
                  + Add New Card
                </button>
              </div>
            </div>

            {/* Saved cards */}
            <div className="mt-6">
              <div className="text-[16px] font-bold text-[#252B42]">
                Saved Cards
              </div>

              {cards.length === 0 ? (
                <div className="mt-3 text-[#737373] text-[14px]">
                  No saved cards yet. Click{" "}
                  <span className="font-bold">“Add New Card”</span>.
                </div>
              ) : (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cards.map((c) => {
                    const selected = String(c.id) === String(effectiveSelectedId);
                    return (
                      <div
                        key={c.id}
                        className={`border rounded-[10px] p-4 ${
                          selected
                            ? "border-[#23A6F0] bg-[#F2FAFF]"
                            : "border-[#E6E6E6]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <label className="flex items-start gap-2 cursor-pointer">
                            <input
                              type="radio"
                              name="card"
                              checked={selected}
                              onChange={() => setSelectedCardId(c.id)}
                              className="mt-1 accent-[#23A6F0]"
                            />
                            <div>
                              <div className="font-bold text-[#252B42] text-[14px]">
                                {c.name_on_card || "Card"}
                              </div>
                              <div className="text-[#737373] text-[13px] mt-1">
                                {maskCardNo(c.card_no)}
                              </div>
                              <div className="text-[#737373] text-[13px] mt-1">
                                Exp: {String(c.expire_month).padStart(2, "0")}/
                                {c.expire_year}
                              </div>
                            </div>
                          </label>

                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => openEdit(c)}
                              className="text-[12px] font-bold text-[#23A6F0]"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => onDelete(c.id)}
                              className="text-[12px] font-bold text-[#BDBDBD] hover:text-[#252B42]"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Payment options placeholder */}
            <div className="mt-8">
              <div className="text-[16px] font-bold text-[#252B42]">
                Payment Options
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentOptions.map((opt) => (
                  <div
                    key={opt.id}
                    className="border border-[#E6E6E6] rounded-[10px] p-4"
                  >
                    <div className="font-bold text-[#252B42]">{opt.title}</div>
                    <div className="mt-1 text-[#737373] text-[13px]">
                      {opt.desc}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 text-[12px] text-[#BDBDBD]">
                (T21: placeholder)
              </div>
            </div>

            {/* Form */}
            {showForm && (
              <div className="mt-8 border-t border-[#E6E6E6] pt-6">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-[#252B42]">
                    {editing ? "Update Card" : "New Card"}
                  </div>
                  <button
                    type="button"
                    onClick={closeForm}
                    className="text-[#BDBDBD] hover:text-[#252B42]"
                  >
                    ✕
                  </button>
                </div>

                <form
                  onSubmit={onSubmit}
                  className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <input
                    value={formatCardNo(form.card_no)}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        card_no: onlyDigits(e.target.value),
                      }))
                    }
                    placeholder="Card Number (16 digits)"
                    className="h-11 px-4 border border-[#E6E6E6] rounded-[8px] md:col-span-2"
                    inputMode="numeric"
                    required
                  />

                  <select
                    value={form.expire_month}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, expire_month: e.target.value }))
                    }
                    className="h-11 px-4 border border-[#E6E6E6] rounded-[8px] bg-white"
                    required
                  >
                    <option value="">Expire Month</option>
                    {months.map((m) => (
                      <option key={m} value={m}>
                        {String(m).padStart(2, "0")}
                      </option>
                    ))}
                  </select>

                  <select
                    value={form.expire_year}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, expire_year: e.target.value }))
                    }
                    className="h-11 px-4 border border-[#E6E6E6] rounded-[8px] bg-white"
                    required
                  >
                    <option value="">Expire Year</option>
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>

                  <input
                    value={form.name_on_card}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name_on_card: e.target.value }))
                    }
                    placeholder="Name on Card"
                    className="h-11 px-4 border border-[#E6E6E6] rounded-[8px] md:col-span-2"
                    required
                  />

                  <div className="md:col-span-2 flex items-center gap-3">
                    <button
                      type="submit"
                      className="h-11 px-8 bg-[#23A6F0] text-white font-bold rounded-[8px]"
                    >
                      {editing ? "Update" : "Save"}
                    </button>

                    <button
                      type="button"
                      onClick={closeForm}
                      className="h-11 px-8 border border-[#E6E6E6] rounded-[8px] font-bold text-[#252B42]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* RIGHT: Order Summary */}
          <div className="lg:sticky lg:top-6 h-fit">
            <div className="border border-[#E6E6E6] rounded-[10px] p-6">
              <div className="text-[20px] font-bold text-[#252B42]">
                Order Summary
              </div>

              <div className="mt-4 space-y-3 text-[14px]">
                <div className="flex items-center justify-between text-[#737373]">
                  <span>Products Total</span>
                  <span className="font-bold text-[#252B42]">
                    ${summary.productsTotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#737373]">
                  <span>Shipping</span>
                  <span className="font-bold text-[#252B42]">
                    ${summary.shipping.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#737373]">
                  <span>Discount</span>
                  <span className="font-bold text-[#E77C40]">
                    -${summary.discount.toFixed(2)}
                  </span>
                </div>

                <div className="mt-3 h-px bg-[#E6E6E6]" />

                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#252B42]">Grand Total</span>
                  <span className="font-bold text-[#E77C40] text-[18px]">
                    ${summary.grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* CCV */}
              <div className="mt-5">
                <label className="block text-[13px] text-[#737373] font-bold mb-2">
                  Card CCV
                </label>
                <input
                  value={onlyDigits(ccv).slice(0, 4)}
                  onChange={(e) => setCcv(onlyDigits(e.target.value))}
                  placeholder="123"
                  className="h-11 w-full px-4 border border-[#E6E6E6] rounded-[8px]"
                  inputMode="numeric"
                />
                <div className="mt-2 text-[12px] text-[#BDBDBD]">
                  (CCV kaydedilmez.)
                </div>
              </div>

              <button
                type="button"
                className="mt-6 w-full h-11 bg-[#E77C40] text-white font-bold rounded-[8px] disabled:opacity-60"
                disabled={!canPay || orderOk}
                onClick={onPay}
              >
                Pay & Complete Order
              </button>

              {!effectiveAddressId && (
                <div className="mt-3 text-[12px] text-red-500">
                  Address not found. Please go back and add/select an address.
                </div>
              )}

              <div className="mt-3 text-[12px] text-[#BDBDBD]">
                (T22: POST /order)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
