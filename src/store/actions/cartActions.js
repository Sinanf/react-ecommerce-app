export const SET_CART = "cart/SET_CART";
export const SET_PAYMENT = "cart/SET_PAYMENT";
export const SET_ADDRESS = "cart/SET_ADDRESS";

export const setCart = (cart) => ({ type: SET_CART, payload: cart });
export const setPayment = (payment) => ({ type: SET_PAYMENT, payload: payment });
export const setAddress = (address) => ({ type: SET_ADDRESS, payload: address });
