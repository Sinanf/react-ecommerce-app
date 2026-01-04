// src/store/actions/cartActions.js
export const ADD_TO_CART = "cart/ADD_TO_CART";
export const TOGGLE_CART_ITEM = "cart/TOGGLE_CART_ITEM";
export const REMOVE_FROM_CART = "cart/REMOVE_FROM_CART";
export const SET_CART_OPEN = "cart/SET_CART_OPEN";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});

export const toggleCartItem = (productId) => ({
  type: TOGGLE_CART_ITEM,
  payload: productId,
});

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

export const setCartOpen = (isOpen) => ({
  type: SET_CART_OPEN,
  payload: isOpen,
});
