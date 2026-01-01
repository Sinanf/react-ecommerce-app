// src/store/actions/thunkActions.js
import { toast } from "react-toastify";
import { api } from "../../api/api";
import { setRoles } from "./clientActions";

export const fetchRolesIfNeeded = () => async (dispatch, getState) => {
  const roles = getState()?.client?.roles;
  if (Array.isArray(roles) && roles.length > 0) return;

  try {
    const res = await api.get("/roles");
    const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
    dispatch(setRoles(list));
  } catch (err) {
    toast.error("fetchRolesIfNeeded failed:", err);
    // istersen burada toast da atabilirsin ama thunk içinde toast şart değil
  }
};
