import { toast } from "react-toastify";
import md5 from "blueimp-md5";
import { api, setAuthToken, clearAuthToken } from "../../api/api";
import { setUser, setRoles } from "./clientActions";

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
