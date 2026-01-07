// src/pages/CreateOrderAddressPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchAddressList,
  createAddress,
  updateAddress,
  deleteAddress,
} from "../store/actions/thunkActions";

/* CITY OPTIONS (select) */
const CITIES = [
  "istanbul",
  "ankara",
  "izmir",
  "bursa",
  "antalya",
  "adana",
  "konya",
  "gaziantep",
  "kocaeli",
  "mersin",
];

/* FORM DEFAULTS */
const emptyForm = {
  title: "",
  name: "",
  surname: "",
  phone: "",
  city: "istanbul",
  district: "",
  neighborhood: "",
  address: "",
};

export default function CreateOrderAddressPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /* STORE STATE */
  const addressList = useSelector((s) => s?.client?.addressList || []);
  const cart = useSelector((s) => s?.cart?.cart || []);

  /* FORM UI STATE */
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);

  /* SELECTION STATE (shipping / billing) */
  const [shippingId, setShippingId] = useState(null);
  const [billingId, setBillingId] = useState(null);
  const [sameAsShipping, setSameAsShipping] = useState(true);

  /* DEFAULT IDS (first address) */
  const firstId = addressList?.[0]?.id ?? null;

  const effectiveShippingId = useMemo(
    () => shippingId ?? firstId,
    [shippingId, firstId]
  );

  const effectiveBillingId = useMemo(
    () => billingId ?? firstId,
    [billingId, firstId]
  );

  /* FETCH: address list */
  useEffect(() => {
    dispatch(fetchAddressList());
  }, [dispatch]);

  /* INIT DEFAULT SELECTIONS (after list loads) */
  useEffect(() => {
    if (!firstId) return;

    if (shippingId == null) setShippingId(firstId);

    if (billingId == null) {
      setBillingId(sameAsShipping ? shippingId ?? firstId : firstId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstId]);

  /* BILLING FOLLOWS SHIPPING (when enabled) */
  useEffect(() => {
    if (!sameAsShipping) return;
    if (effectiveShippingId != null) setBillingId(effectiveShippingId);
  }, [sameAsShipping, effectiveShippingId]);

  /* ORDER SUMMARY (checked cart items) */
  const summary = useMemo(() => {
    const checked = cart.filter((i) => i.checked);

    const productsTotal = checked.reduce(
      (acc, i) => acc + Number(i.count || 0) * Number(i?.product?.price || 0),
      0
    );

    const shipping = productsTotal > 150 ? 0 : checked.length ? 29.99 : 0;
    const discount = productsTotal > 150 ? 29.99 : 0;
    const grandTotal = productsTotal + shipping - discount;

    return {
      checkedCount: checked.length,
      productsTotal,
      shipping,
      discount,
      grandTotal,
    };
  }, [cart]);

  /* FORM OPEN/CLOSE */
  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEdit = (addr) => {
    setEditing(addr);
    setForm({
      id: addr.id,
      title: addr.title || "",
      name: addr.name || "",
      surname: addr.surname || "",
      phone: addr.phone || "",
      city: addr.city || "istanbul",
      district: addr.district || "",
      neighborhood: addr.neighborhood || "",
      address: addr.address || "",
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setForm(emptyForm);
  };

  /* FORM SUBMIT (create / update) */
  const onSubmit = async (e) => {
    e.preventDefault();

    /* API PAYLOAD (naming is important) */
    const payload = {
      title: form.title,
      name: form.name,
      surname: form.surname,
      phone: form.phone,
      city: form.city,
      district: form.district,
      neighborhood: form.neighborhood,
      // address endpoint kabul ediyorsa aç:
      // address: form.address,
    };

    if (editing?.id) {
      await dispatch(updateAddress({ id: editing.id, ...payload }));
    } else {
      await dispatch(createAddress(payload));
    }

    await dispatch(fetchAddressList());
    closeForm();
  };

  /* DELETE ADDRESS + FIX SELECTED IDS */
  const onDelete = async (id) => {
    await dispatch(deleteAddress(id));
    await dispatch(fetchAddressList());

    if (String(shippingId) === String(id)) setShippingId(null);
    if (String(billingId) === String(id)) setBillingId(null);
  };

  /* PAGE GUARDS */
  const hasAddresses = addressList.length > 0;
  const canProceed =
    summary.checkedCount > 0 &&
    hasAddresses &&
    effectiveShippingId != null;

  return (
    <div className="w-full bg-white">
      <div className="w-full max-w-6xl mx-auto px-4 py-10">
        {/* TOP STEPS BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-[#E6E6E6] rounded-[8px] p-4">
            <div className="font-bold text-[#252B42]">
              1 — Address Information
            </div>
            <div className="text-[#737373] text-[14px] mt-1">
              Shipping & billing address
            </div>
          </div>

          <div className="border border-[#E6E6E6] rounded-[8px] p-4 opacity-60">
            <div className="font-bold text-[#252B42]">2 — Payment Options</div>
            <div className="text-[#737373] text-[14px] mt-1">Next task</div>
          </div>

          {/* CTA: save & continue */}
          <div className="md:flex md:justify-end">
            <button
              type="button"
              className="w-full md:w-auto h-11 px-8 bg-[#E77C40] text-white font-bold rounded-[8px] disabled:opacity-50"
              disabled={!canProceed}
              onClick={() =>
                navigate("/order/payment", {
                  state: {
                    shippingId: effectiveShippingId,
                    billingId: effectiveBillingId,
                    sameAsShipping,
                  },
                })
              }
            >
              Save & Continue
            </button>
          </div>
        </div>

        {/* PAGE GRID: addresses + summary */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
          {/* LEFT: ADDRESS SELECTION */}
          <div className="border border-[#E6E6E6] rounded-[10px] p-6">
            {/* header */}
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-bold text-[#252B42]">
                Delivery Address
              </h2>

              <button
                type="button"
                onClick={openCreate}
                className="h-10 px-4 border border-[#E6E6E6] rounded-[8px] text-[#252B42] font-bold hover:bg-[#FAFAFA]"
              >
                + Add Address
              </button>
            </div>

            {/* same as shipping toggle */}
            <div className="mt-4 flex items-center gap-2">
              <input
                id="sameAsShipping"
                type="checkbox"
                checked={sameAsShipping}
                onChange={(e) => setSameAsShipping(e.target.checked)}
                className="w-4 h-4 accent-[#23A6F0]"
              />

              <label
                htmlFor="sameAsShipping"
                className="text-[14px] text-[#737373]"
              >
                Billing address same as shipping
              </label>
            </div>

            {/* empty state */}
            {!hasAddresses && (
              <div className="mt-6 border border-dashed border-[#E6E6E6] rounded-[10px] p-6 text-[#737373]">
                No address found. Please add an address to continue.
              </div>
            )}

            {/* shipping cards */}
            {hasAddresses && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {addressList.map((a) => {
                  const selected =
                    String(a.id) === String(effectiveShippingId);

                  return (
                    <div
                      key={a.id}
                      className={`border rounded-[10px] p-4 ${
                        selected
                          ? "border-[#E77C40] bg-[#FFF7F0]"
                          : "border-[#E6E6E6]"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="shipping"
                            checked={selected}
                            onChange={() => {
                              setShippingId(a.id);
                              if (sameAsShipping) setBillingId(a.id);
                            }}
                            className="accent-[#E77C40]"
                          />
                          <span className="font-bold text-[#252B42]">
                            {a.title}
                          </span>
                        </label>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => openEdit(a)}
                            className="text-[12px] font-bold text-[#23A6F0]"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => onDelete(a.id)}
                            className="text-[12px] font-bold text-[#BDBDBD] hover:text-[#252B42]"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="mt-2 text-[#737373] text-[14px]">
                        <div className="font-bold text-[#252B42]">
                          {a.name} {a.surname}
                        </div>
                        <div>{a.phone}</div>
                        <div className="mt-2">
                          {a.neighborhood} / {a.district} / {a.city}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* billing cards (only if not same) */}
            {!sameAsShipping && hasAddresses && (
              <div className="mt-8">
                <h2 className="text-[20px] font-bold text-[#252B42]">
                  Receipt / Billing Address
                </h2>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addressList.map((a) => {
                    const selectedBill =
                      String(a.id) === String(effectiveBillingId);

                    return (
                      <div
                        key={`bill-${a.id}`}
                        className={`border rounded-[10px] p-4 ${
                          selectedBill
                            ? "border-[#23A6F0] bg-[#F2FAFF]"
                            : "border-[#E6E6E6]"
                        }`}
                      >
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="billing"
                            checked={selectedBill}
                            onChange={() => setBillingId(a.id)}
                            className="accent-[#23A6F0]"
                          />
                          <span className="font-bold text-[#252B42]">
                            {a.title}
                          </span>
                        </label>

                        <div className="mt-2 text-[#737373] text-[14px]">
                          <div className="font-bold text-[#252B42]">
                            {a.name} {a.surname}
                          </div>
                          <div>{a.phone}</div>
                          <div className="mt-2">
                            {a.neighborhood} / {a.district} / {a.city}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ADDRESS FORM */}
            {showForm && (
              <div className="mt-8 border-t border-[#E6E6E6] pt-6">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-[#252B42]">
                    {editing ? "Update Address" : "New Address"}
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
                    value={form.title}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, title: e.target.value }))
                    }
                    placeholder="Address Title"
                    className="h-11 px-4 border border-[#E6E6E6] rounded-[8px]"
                    required
                  />

                  <input
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="Phone"
                    className="h-11 px-4 border border-[#E6E6E6] rounded-[8px]"
                    required
                  />

                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Name"
                    className="h-11 px-4 border border-[#E6E6E6] rounded-[8px]"
                    required
                  />

                  <input
                    value={form.surname}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, surname: e.target.value }))
                    }
                    placeholder="Surname"
                    className="h-11 px-4 border border-[#E6E6E6] rounded-[8px]"
                    required
                  />

                  <select
                    value={form.city}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, city: e.target.value }))
                    }
                    className="h-11 px-4 border border-[#E6E6E6] rounded-[8px] bg-white"
                  >
                    {CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>

                  <input
                    value={form.district}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, district: e.target.value }))
                    }
                    placeholder="District (İlçe)"
                    className="h-11 px-4 border border-[#E6E6E6] rounded-[8px]"
                    required
                  />

                  <input
                    value={form.neighborhood}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, neighborhood: e.target.value }))
                    }
                    placeholder="Neighborhood (Mahalle)"
                    className="h-11 px-4 border border-[#E6E6E6] rounded-[8px] md:col-span-2"
                    required
                  />

                  <textarea
                    value={form.address}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, address: e.target.value }))
                    }
                    placeholder="Address (Street, building, door no...)"
                    className="min-h-[100px] px-4 py-3 border border-[#E6E6E6] rounded-[8px] md:col-span-2"
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

          {/* RIGHT: ORDER SUMMARY */}
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

              {/* CTA: currently navigates without state (left as-is) */}
              <button
                type="button"
                className="mt-6 w-full h-11 bg-[#E77C40] text-white font-bold rounded-[8px] disabled:opacity-50"
                disabled={!canProceed}
                onClick={() => navigate("/order/payment")}
              >
                Create Order
              </button>

              <div className="mt-3 text-[12px] text-[#BDBDBD]">
                (Button functionality next tasks)
              </div>

              {!hasAddresses && (
                <div className="mt-2 text-[12px] text-[#BDBDBD]">
                  Add at least one address to continue.
                </div>
              )}

              {summary.checkedCount === 0 && (
                <div className="mt-2 text-[12px] text-[#BDBDBD]">
                  Select at least one product in cart to continue.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
