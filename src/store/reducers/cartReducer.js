// src/store/reducers/cartReducer.js
import {
  ADD_TO_CART,
  TOGGLE_CART_ITEM,
  REMOVE_FROM_CART,
  SET_CART_OPEN,
} from "../actions/cartActions";

const initialState = {
  cart: [], // [{count: 1, checked: true, product: {...}}]
  isOpen: false, // dropdown kontrolü
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART: {
      const product = action.payload;
      if (!product?.id) return state;

      const idx = state.cart.findIndex((x) => String(x.product?.id) === String(product.id));

      // aynı ürün varsa count++
      if (idx >= 0) {
        const next = [...state.cart];
        next[idx] = { ...next[idx], count: next[idx].count + 1 };
        return { ...state, cart: next };
      }

      // yoksa ekle
      return {
        ...state,
        cart: [{ count: 1, checked: true, product }, ...state.cart],
      };
    }

    case TOGGLE_CART_ITEM: {
      const id = action.payload;
      const next = state.cart.map((x) =>
        String(x.product?.id) === String(id) ? { ...x, checked: !x.checked } : x
      );
      return { ...state, cart: next };
    }

    case REMOVE_FROM_CART: {
      const id = action.payload;
      return { ...state, cart: state.cart.filter((x) => String(x.product?.id) !== String(id)) };
    }

    case SET_CART_OPEN:
      return { ...state, isOpen: Boolean(action.payload) };

    default:
      return state;
  }
}
