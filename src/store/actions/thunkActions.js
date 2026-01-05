// src/store/actions/thunkActions.js

import { toast } from "react-toastify";
import md5 from "blueimp-md5";
import { api, setAuthToken, clearAuthToken } from "../../api/api";
import { setUser, setRoles, setAddressList } from "./clientActions";
import { setCategories, setFetchState, setProductList, setTotal, setProductFetchState, setProduct } from "./productActions";

/* --------------------------------------------------
   Helpers
-------------------------------------------------- */
const gravatarUrlFromEmail = (email) => {
  const normalized = String(email || "").trim().toLowerCase();
  const hash = md5(normalized);
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=96`;
};

/* --------------------------------------------------
   LOGIN
-------------------------------------------------- */
export const loginUser =
  ({ email, password, rememberMe }) =>
  async (dispatch) => {
    try {
      const res = await api.post("/login", { email, password });

      const data = res?.data || {};
      const token = data?.token;
      const user = {
        ...data,
        email: data?.email || email,
        gravatarUrl: gravatarUrlFromEmail(data?.email || email),
      };

      dispatch(setUser(user));

      if (rememberMe && token) {
        localStorage.setItem("token", token);
        setAuthToken(token);
      }

      toast.success("Login successful");
      return { ok: true };
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
      return { ok: false };
    }
  };

/* --------------------------------------------------
   AUTO LOGIN (T11)
-------------------------------------------------- */
export const verifyToken = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  // Token yok → temiz çık
  if (!token) {
    clearAuthToken();
    dispatch(setUser({}));
    return { ok: false, reason: "NO_TOKEN" };
  }

  try {
    // Header’a token yaz (Bearer YOK)
    setAuthToken(token);

    const res = await api.get("/verify");

    const data = res?.data || {};
    const newToken = data?.token || token;

    const user = {
      ...data,
      gravatarUrl: gravatarUrlFromEmail(data?.email),
    };

    dispatch(setUser(user));

    // Token yenile
    localStorage.setItem("token", newToken);
    setAuthToken(newToken);

    return { ok: true };
  } catch (err) {
    // Token geçersiz → HER ŞEYİ TEMİZLE
    localStorage.removeItem("token");
    clearAuthToken();
    dispatch(setUser({}));

    console.error("verifyToken failed:", err);
    return { ok: false, reason: "UNAUTHORIZED" };
  }
};

/* --------------------------------------------------
   LOGOUT
-------------------------------------------------- */
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  clearAuthToken();
  dispatch(setUser({}));
};

/* --------------------------------------------------
   ROLES (Signup için)
-------------------------------------------------- */
export const fetchRolesIfNeeded = () => async (dispatch, getState) => {
  const roles = getState()?.client?.roles;
  if (Array.isArray(roles) && roles.length > 0) return;

  try {
    const res = await api.get("/roles");
    const list = Array.isArray(res.data) ? res.data : [];
    dispatch(setRoles(list));
  } catch (err) {
    toast.error("Roles could not be loaded");
    console.error("fetchRolesIfNeeded error:", err);
  }
};

/* ... login / verify / logout / roles ... */

/* --------------------------------------------------
   CATEGORIES (T12) - senin mevcut halin aynı kalabilir
-------------------------------------------------- */
export const fetchCategoriesIfNeeded = () => async (dispatch, getState) => {
  const categories = getState()?.product?.categories;
  if (Array.isArray(categories) && categories.length > 0) return;

  try {
    dispatch(setFetchState("FETCHING"));
    const res = await api.get("/categories");
    const list = Array.isArray(res.data) ? res.data : [];
    dispatch(setCategories(list));
    dispatch(setFetchState("FETCHED"));
  } catch (err) {
    dispatch(setFetchState("FAILED"));
    toast.error("Categories could not be loaded");
    console.error("fetchCategoriesIfNeeded error:", err);
  }
};

// Parametreli versiyon (T14 için önerilen):
export const fetchProductsByQuery =
  ({ categoryId } = {}) =>
  async (dispatch, getState) => {
    try {
      dispatch(setProductFetchState("FETCHING"));

      const st = getState()?.product || {};
      const { filter, sort, limit, offset } = st;

      const params = new URLSearchParams();

      if (categoryId) params.set("category", String(categoryId));
      if (filter) params.set("filter", String(filter));
      if (sort) params.set("sort", String(sort));

      // limit/offset kullanacaksan (opsiyonel)
      if (limit != null) params.set("limit", String(limit));
      if (offset != null) params.set("offset", String(offset));

      const qs = params.toString();
      const url = qs ? `/products?${qs}` : "/products";

      const res = await api.get(url);

      const data = res?.data || {};
      const total = Number(data?.total || 0);
      const products = Array.isArray(data?.products) ? data.products : [];

      dispatch(setTotal(total));
      dispatch(setProductList(products));

      dispatch(setProductFetchState("FETCHED"));
      return { ok: true };
    } catch (err) {
      dispatch(setProductFetchState("FAILED"));
      toast.error("Products could not be loaded");
      console.error("fetchProductsByQuery error:", err);
      return { ok: false };
    }
  };

  export const fetchProducts = () => async (dispatch, getState) => {
  try {
    dispatch(setProductFetchState("FETCHING"));

    const state = getState();
    const { limit, offset, filter, sort } = state.product;

    const categoryId = state.product?.categoryId; // varsa
    const params = new URLSearchParams();

    if (categoryId) params.set("category", String(categoryId));
    if (filter) params.set("filter", filter);
    if (sort) params.set("sort", sort);

    params.set("limit", String(limit || 25));
    params.set("offset", String(offset || 0));

    const res = await api.get(`/products?${params.toString()}`);
    const data = res?.data || {};

    dispatch(setTotal(Number(data.total || 0)));
    dispatch(setProductList(Array.isArray(data.products) ? data.products : []));
    dispatch(setProductFetchState("FETCHED"));

    return { ok: true };
  } catch (err) {
    dispatch(setProductFetchState("FAILED"));
    toast.error("Products could not be loaded");
    console.error("fetchProducts error:", err);
    return { ok: false };
  }
};

// ✅ T16
export const fetchProductById = (productId) => async (dispatch) => {
  if (!productId) return { ok: false };

  try {
    dispatch(setProductFetchState("FETCHING"));
    const res = await api.get(`/products/${productId}`);
    dispatch(setProduct(res.data));
    dispatch(setProductFetchState("FETCHED"));
    return { ok: true };
  } catch (err) {
    dispatch(setProductFetchState("FAILED"));
    toast.error("Product could not be loaded");
    console.error("fetchProductById error:", err);
    return { ok: false };
  }
};

// GET /user/address
export const fetchAddressList = () => async (dispatch) => {
  try {
    const res = await api.get("/user/address");
    const list = Array.isArray(res.data) ? res.data : [];
    dispatch(setAddressList(list));
    return { ok: true, list };
  } catch (err) {
    toast.error("Address list could not be loaded");
    console.error("fetchAddressList error:", err);
    return { ok: false };
  }
};

// POST /user/address
export const createAddress = (payload) => async (dispatch) => {
  try {
    await api.post("/user/address", payload);
    toast.success("Address added");
    dispatch(fetchAddressList());
    return { ok: true };
  } catch (err) {
    toast.error("Address could not be added");
    console.error("createAddress error:", err);
    return { ok: false };
  }
};

// PUT /user/address
export const updateAddress = (payload) => async (dispatch) => {
  try {
    await api.put("/user/address", payload);
    toast.success("Address updated");
    dispatch(fetchAddressList());
    return { ok: true };
  } catch (err) {
    toast.error("Address could not be updated");
    console.error("updateAddress error:", err);
    return { ok: false };
  }
};

// DELETE /user/address/:addressId
export const deleteAddress = (addressId) => async (dispatch) => {
  try {
    await api.delete(`/user/address/${addressId}`);
    toast.success("Address deleted");
    dispatch(fetchAddressList());
    return { ok: true };
  } catch (err) {
    toast.error("Address could not be deleted");
    console.error("deleteAddress error:", err);
    return { ok: false };
  }
};