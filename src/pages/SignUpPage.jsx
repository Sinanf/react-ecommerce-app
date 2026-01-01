// src/pages/SignUpPage.jsx
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { api } from "../api/api";
import { fetchRolesIfNeeded } from "../store/actions/thunkActions";

const TR_PHONE_REGEX = /^(\+90|0)?5\d{9}$/;
// TXXXXVXXXXXX (T + 4 digit + V + 6 digit)
const TAX_NO_REGEX = /^T\d{4}V\d{6}$/;
// TR + 24 digit (toplam 26)
const IBAN_TR_REGEX = /^TR\d{24}$/;

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// min 8; number, lower, upper, special
function isStrongPassword(value) {
  return (
    value.length >= 8 &&
    /[a-z]/.test(value) &&
    /[A-Z]/.test(value) &&
    /\d/.test(value) &&
    /[^A-Za-z0-9]/.test(value)
  );
}

export default function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // roles artık Redux store’dan
  const roles = useSelector((s) => s?.client?.roles || []);
  const rolesLoading = !roles || roles.length === 0;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
      role_id: "",
      store_name: "",
      store_phone: "",
      store_tax_no: "",
      store_bank_account: "",
    },
  });

  const password = watch("password");
  const selectedRoleId = watch("role_id");

  // ihtiyaç varsa roles çek
  useEffect(() => {
    dispatch(fetchRolesIfNeeded());
  }, [dispatch]);

  // roles geldiyse default Customer seç (kullanıcı seçmediyse)
  useEffect(() => {
    if (!roles || roles.length === 0) return;

    const currentRoleId = getValues("role_id");
    if (currentRoleId) return; // kullanıcı seçtiyse dokunma

    const customer =
      roles.find((r) => (r.code || "").toLowerCase() === "customer") || roles[0];

    if (customer) {
      setValue("role_id", String(customer.id), { shouldValidate: true });
    }
  }, [roles, setValue, getValues]);

  const selectedRole = useMemo(() => {
    return roles.find((r) => String(r.id) === String(selectedRoleId));
  }, [roles, selectedRoleId]);

  const isStoreRole = useMemo(() => {
    const code = (selectedRole?.code || "").toLowerCase();
    return code === "store";
  }, [selectedRole]);

  async function onSubmit(values) {
    const payload = {
      name: values.name,
      email: values.email,
      password: values.password,
      role_id: Number(values.role_id),
    };

    if (isStoreRole) {
      payload.store = {
        name: values.store_name,
        phone: values.store_phone,
        tax_no: values.store_tax_no,
        bank_account: values.store_bank_account,
      };
    }

    try {
      await api.post("/signup", payload);
      toast.warning("You need to click link in email to activate your account!");
      navigate(-1);
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data?.error ||
        "Signup failed. Please check your inputs and try again.";
      toast.error(msg);
    }
  }

  return (
    <div className="w-full flex flex-col bg-white">
      <section className="w-full">
        <div className="w-full max-w-2xl mx-auto px-4 py-12 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="font-bold text-[24px] leading-[32px] tracking-[0.1px] text-[#252B42]">
              Sign Up
            </div>
            <div className="text-[14px] leading-[20px] tracking-[0.2px] text-[#737373]">
              Create your account.
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-5">
            {/* Name */}
            <div className="w-full flex flex-col gap-2">
              <label className="text-[14px] text-[#252B42] font-bold">Name</label>
              <input
                className="w-full border border-[#E6E6E6] px-4 py-3 text-[14px]"
                placeholder="Your name"
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Min 3 characters" },
                })}
              />
              {errors.name && (
                <div className="text-[12px] text-[#E74040]">{errors.name.message}</div>
              )}
            </div>

            {/* Email */}
            <div className="w-full flex flex-col gap-2">
              <label className="text-[14px] text-[#252B42] font-bold">Email</label>
              <input
                className="w-full border border-[#E6E6E6] px-4 py-3 text-[14px]"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required",
                  validate: (v) => isValidEmail(v) || "Email is not valid",
                })}
              />
              {errors.email && (
                <div className="text-[12px] text-[#E74040]">{errors.email.message}</div>
              )}
            </div>

            {/* Password */}
            <div className="w-full flex flex-col gap-2">
              <label className="text-[14px] text-[#252B42] font-bold">Password</label>
              <input
                type="password"
                className="w-full border border-[#E6E6E6] px-4 py-3 text-[14px]"
                placeholder="********"
                {...register("password", {
                  required: "Password is required",
                  validate: (v) =>
                    isStrongPassword(v) ||
                    "Min 8 chars + upper + lower + number + special",
                })}
              />
              {errors.password && (
                <div className="text-[12px] text-[#E74040]">{errors.password.message}</div>
              )}
            </div>

            {/* Password Confirm */}
            <div className="w-full flex flex-col gap-2">
              <label className="text-[14px] text-[#252B42] font-bold">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full border border-[#E6E6E6] px-4 py-3 text-[14px]"
                placeholder="********"
                {...register("passwordConfirm", {
                  required: "Please confirm password",
                  validate: (v) => v === password || "Passwords do not match",
                })}
              />
              {errors.passwordConfirm && (
                <div className="text-[12px] text-[#E74040]">
                  {errors.passwordConfirm.message}
                </div>
              )}
            </div>

            {/* Role */}
            <div className="w-full flex flex-col gap-2">
              <label className="text-[14px] text-[#252B42] font-bold">Role</label>
              <select
                className="w-full border border-[#E6E6E6] px-4 py-3 text-[14px] bg-white"
                disabled={rolesLoading}
                {...register("role_id", { required: "Role is required" })}
              >
                {rolesLoading ? (
                  <option value="">Loading roles...</option>
                ) : (
                  <>
                    <option value="" disabled>
                      Select role
                    </option>
                    {roles.map((r) => (
                      <option key={r.id} value={String(r.id)}>
                        {r.name}
                      </option>
                    ))}
                  </>
                )}
              </select>
              {errors.role_id && (
                <div className="text-[12px] text-[#E74040]">{errors.role_id.message}</div>
              )}
            </div>

            {/* Store Fields (conditional) */}
            {isStoreRole && (
              <div className="w-full flex flex-col gap-5 border border-[#E6E6E6] p-4">
                <div className="font-bold text-[16px] text-[#252B42]">Store Details</div>

                <div className="w-full flex flex-col gap-2">
                  <label className="text-[14px] text-[#252B42] font-bold">Store Name</label>
                  <input
                    className="w-full border border-[#E6E6E6] px-4 py-3 text-[14px]"
                    placeholder="Store name"
                    {...register("store_name", {
                      required: "Store name is required",
                      minLength: { value: 3, message: "Min 3 characters" },
                    })}
                  />
                  {errors.store_name && (
                    <div className="text-[12px] text-[#E74040]">{errors.store_name.message}</div>
                  )}
                </div>

                <div className="w-full flex flex-col gap-2">
                  <label className="text-[14px] text-[#252B42] font-bold">
                    Store Phone (TR)
                  </label>
                  <input
                    className="w-full border border-[#E6E6E6] px-4 py-3 text-[14px]"
                    placeholder="05XXXXXXXXX"
                    {...register("store_phone", {
                      required: "Store phone is required",
                      validate: (v) =>
                        TR_PHONE_REGEX.test(v) || "Invalid Türkiye phone number",
                    })}
                  />
                  {errors.store_phone && (
                    <div className="text-[12px] text-[#E74040]">
                      {errors.store_phone.message}
                    </div>
                  )}
                </div>

                <div className="w-full flex flex-col gap-2">
                  <label className="text-[14px] text-[#252B42] font-bold">Store Tax ID</label>
                  <input
                    className="w-full border border-[#E6E6E6] px-4 py-3 text-[14px]"
                    placeholder="T0000V000000"
                    {...register("store_tax_no", {
                      required: "Tax ID is required",
                      validate: (v) =>
                        TAX_NO_REGEX.test(v) || "Format must be TXXXXVXXXXXX (X=number)",
                    })}
                  />
                  {errors.store_tax_no && (
                    <div className="text-[12px] text-[#E74040]">
                      {errors.store_tax_no.message}
                    </div>
                  )}
                </div>

                <div className="w-full flex flex-col gap-2">
                  <label className="text-[14px] text-[#252B42] font-bold">
                    Bank Account (IBAN)
                  </label>
                  <input
                    className="w-full border border-[#E6E6E6] px-4 py-3 text-[14px]"
                    placeholder="TRXXXXXXXXXXXXXXXXXXXXXXXX"
                    {...register("store_bank_account", {
                      required: "IBAN is required",
                      validate: (v) => IBAN_TR_REGEX.test(v) || "Invalid IBAN",
                    })}
                  />
                  {errors.store_bank_account && (
                    <div className="text-[12px] text-[#E74040]">
                      {errors.store_bank_account.message}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-12 rounded-[5px] font-bold text-[14px] leading-[22px] tracking-[0.2px] text-white flex items-center justify-center gap-2 ${
                isSubmitting ? "bg-[#BDBDBD]" : "bg-[#23A6F0]"
              }`}
            >
              {isSubmitting && (
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
              )}
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
