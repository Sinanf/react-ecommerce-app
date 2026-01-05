// src/store/actions/cartActions.js
export const ADD_TO_CART = "cart/ADD_TO_CART";
export const INCREASE_ITEM = "cart/INCREASE_ITEM";
export const DECREASE_ITEM = "cart/DECREASE_ITEM";
export const REMOVE_ITEM = "cart/REMOVE_ITEM";
export const TOGGLE_ITEM_CHECKED = "cart/TOGGLE_ITEM_CHECKED";
export const CLEAR_CART = "cart/CLEAR_CART";

export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product });
export const increaseItem = (productId) => ({ type: INCREASE_ITEM, payload: productId });
export const decreaseItem = (productId) => ({ type: DECREASE_ITEM, payload: productId });
export const removeItem = (productId) => ({ type: REMOVE_ITEM, payload: productId });
export const toggleItemChecked = (productId) => ({ type: TOGGLE_ITEM_CHECKED, payload: productId });
export const clearCart = () => ({ type: CLEAR_CART });
