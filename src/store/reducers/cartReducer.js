// src/store/reducers/cartReducer.js
import {
  ADD_TO_CART,
  INCREASE_ITEM,
  DECREASE_ITEM,
  REMOVE_ITEM,
  TOGGLE_ITEM_CHECKED,
  CLEAR_CART,
} from "../actions/cartActions";

const initialState = {
  cart: [],
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_CART:
      return { ...state, cart: [] };

    case ADD_TO_CART: {
      const product = action.payload;
      const idx = state.cart.findIndex(
        (i) => String(i.product.id) === String(product.id)
      );

      if (idx >= 0) {
        const updated = state.cart.map((it, i) =>
          i === idx ? { ...it, count: (it.count || 0) + 1 } : it
        );
        return { ...state, cart: updated };
      }

      return {
        ...state,
        cart: [...state.cart, { product, count: 1, checked: true }],
      };
    }

    case INCREASE_ITEM: {
      const id = action.payload;
      return {
        ...state,
        cart: state.cart.map((it) =>
          String(it.product.id) === String(id)
            ? { ...it, count: it.count + 1 }
            : it
        ),
      };
    }

    case DECREASE_ITEM: {
      const id = action.payload;
      return {
        ...state,
        cart: state.cart.map((it) =>
          String(it.product.id) === String(id)
            ? { ...it, count: Math.max(1, it.count - 1) }
            : it
        ),
      };
    }

    case REMOVE_ITEM: {
      const id = action.payload;
      return {
        ...state,
        cart: state.cart.filter((it) => String(it.product.id) !== String(id)),
      };
    }

    case TOGGLE_ITEM_CHECKED: {
      const id = action.payload;
      return {
        ...state,
        cart: state.cart.map((it) =>
          String(it.product.id) === String(id)
            ? { ...it, checked: !it.checked }
            : it
        ),
      };
    }

    default:
      return state;
  }
}
