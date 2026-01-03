// src/store/actions/thunkActions.js
import { toast } from "react-toastify";
import { api } from "../../api/api";
import { setRoles } from "./clientActions";
import md5 from "blueimp-md5";
import { setUser } from "./clientActions";

const gravatarUrlFromEmail = (email) => {
  const normalized = String(email || "").trim().toLowerCase();
  const hash = md5(normalized);
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=96`;
};

export const loginUser =
  ({ email, password, rememberMe, redirectTo }) =>
  async (dispatch) => {
    try {
      const res = await api.post("/login", { email, password });

      // Backend formatı değişebileceği için esnek al:
      const data = res?.data || {};
      const token = data?.token || data?.access_token || data?.jwt;
      const user = data?.user || data;

      const finalUser = {
        ...user,
        email: user?.email || email,
        gravatarUrl: gravatarUrlFromEmail(user?.email || email),
      };

      dispatch(setUser(finalUser));

      if (rememberMe && token) {
        localStorage.setItem("token", token);
      }

      toast.success("Login successful");
      // redirect işi page tarafında da yapılabilir; burada sadece bilgi dönüyoruz
      return { ok: true, redirectTo: redirectTo || "/" };
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Login failed. Please check your credentials.";
      toast.error(msg);
      return { ok: false };
    }
  };




export const fetchRolesIfNeeded = () => async (dispatch, getState) => {
  const roles = getState()?.client?.roles;
  if (Array.isArray(roles) && roles.length > 0) return;

  try {
    const res = await api.get("/roles");
    const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
    dispatch(setRoles(list));
  } catch (err) {
    toast.error("Roles could not be loaded");
    console.error("fetchRolesIfNeeded error:", err);
  }
};
