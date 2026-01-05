// src/store/actions/thunkActions.js

import { toast } from "react-toastify";
import md5 from "blueimp-md5";
import { api, setAuthToken, clearAuthToken } from "../../api/api";
import { setUser, setRoles, setAddressList, setCardList, setOrders, setOrdersFetchState  } from "./clientActions"; // ✅ T21: setCardList eklendi
import {
  setCategories,
  setFetchState,
  setProductList,
  setTotal,
  setProductFetchState,
  setProduct,
} from "./productActions";

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

      // ✅ HER DURUMDA header'a yaz
      if (token) {
        setAuthToken(token);

        // ✅ rememberMe true -> localStorage, false -> sessionStorage
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem("token", token);

        // diğer storage'dan varsa temizle (karışmasın)
        (rememberMe ? sessionStorage : localStorage).removeItem("token");
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
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (!token) {
    clearAuthToken();
    dispatch(setUser({}));
    return { ok: false, reason: "NO_TOKEN" };
  }

  try {
    setAuthToken(token);
    const res = await api.get("/verify");

    const data = res?.data || {};
    const newToken = data?.token || token;

    const user = {
      ...data,
      gravatarUrl: gravatarUrlFromEmail(data?.email),
    };

    dispatch(setUser(user));

    // ✅ token yenilendiyse, hangi storage'da varsa oraya yaz
    if (localStorage.getItem("token")) localStorage.setItem("token", newToken);
    else sessionStorage.setItem("token", newToken);

    setAuthToken(newToken);

    return { ok: true };
  } catch (err) {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
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
  sessionStorage.removeItem("token");
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

/* --------------------------------------------------
   CATEGORIES (T12)
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

/* --------------------------------------------------
   PRODUCTS
-------------------------------------------------- */
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

    const categoryId = state.product?.categoryId;
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

/* --------------------------------------------------
   ADDRESS (T20)
-------------------------------------------------- */
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

/* --------------------------------------------------
   ✅ T21 — CREDIT CARDS
-------------------------------------------------- */

// GET /user/card
export const fetchCardList = () => async (dispatch) => {
  try {
    const res = await api.get("/user/card");
    const list = Array.isArray(res.data) ? res.data : [];
    dispatch(setCardList(list));
    return { ok: true, list };
  } catch (err) {
    toast.error("Card list could not be loaded");
    console.error("fetchCardList error:", err);
    return { ok: false };
  }
};

// POST /user/card
export const createCard = (payload) => async (dispatch) => {
  try {
    await api.post("/user/card", payload);
    toast.success("Card added");
    dispatch(fetchCardList());
    return { ok: true };
  } catch (err) {
    toast.error("Card could not be added");
    console.error("createCard error:", err);
    return { ok: false };
  }
};

// PUT /user/card
export const updateCard = (payload) => async (dispatch) => {
  try {
    await api.put("/user/card", payload);
    toast.success("Card updated");
    dispatch(fetchCardList());
    return { ok: true };
  } catch (err) {
    toast.error("Card could not be updated");
    console.error("updateCard error:", err);
    return { ok: false };
  }
};

// DELETE /user/card/:cardId
export const deleteCard = (cardId) => async (dispatch) => {
  try {
    await api.delete(`/user/card/${cardId}`);
    toast.success("Card deleted");
    dispatch(fetchCardList());
    return { ok: true };
  } catch (err) {
    toast.error("Card could not be deleted");
    console.error("deleteCard error:", err);
    return { ok: false };
  }
};

/* --------------------------------------------------
   T22 — CREATE ORDER
   POST /order
-------------------------------------------------- */
export const createOrder = (payload) => async () => {
  try {
    // payload örneği taskte verilen yapıda olmalı
    // {
    //   address_id,
    //   order_date,
    //   card_no,
    //   card_name,
    //   card_expire_month,
    //   card_expire_year,
    //   card_ccv,
    //   price,
    //   products: [{ product_id, count, detail }]
    // }

    const res = await api.post("/order", payload);

    toast.success("🎉 Congrats! Your order has been created successfully.");
    return { ok: true, data: res?.data };
  } catch (err) {
    toast.error(
      err?.response?.data?.message ||
        "Order could not be created. Please try again."
    );
    console.error("createOrder error:", err);
    return { ok: false, error: err };
  }
};

// ✅ T23 — GET /order
export const fetchOrders = () => async (dispatch) => {
  try {
    dispatch(setOrdersFetchState("FETCHING"));
    const res = await api.get("/order");

    // API bazen {orders:[...]} veya direkt [...] dönebilir → defensive
    const data = res?.data;
    const list = Array.isArray(data) ? data : Array.isArray(data?.orders) ? data.orders : [];

    dispatch(setOrders(list));
    dispatch(setOrdersFetchState("FETCHED"));
    return { ok: true, list };
  } catch (err) {
    dispatch(setOrdersFetchState("FAILED"));
    toast.error(err?.response?.data?.message || "Orders could not be loaded");
    console.error("fetchOrders error:", err);
    return { ok: false, error: err };
  }
};
