// src/store/reducers/clientReducer.js
import {
  SET_LANGUAGE,
  SET_ROLES,
  SET_THEME,
  SET_USER,
  SET_ADDRESS_LIST,
  SET_CARD_LIST, 
  SET_ORDERS,
  SET_ORDERS_FETCH_STATE,
} from "../actions/clientActions";

const initialState = {
  user: {},
  addressList: [],
  creditCards: [], 
  orders: [],
  ordersFetchState: "NOT_FETCHED",
  roles: [],
  theme: "light",
  language: "en",
};

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };

    case SET_ROLES:
      return { ...state, roles: action.payload };

    case SET_THEME:
      return { ...state, theme: action.payload };

    case SET_LANGUAGE:
      return { ...state, language: action.payload };

    case SET_ADDRESS_LIST:
      return { ...state, addressList: action.payload };

    // ✅ T21
    case SET_CARD_LIST:
      return { ...state, creditCards: action.payload };

    case SET_ORDERS:
      return { ...state, orders: action.payload };

    case SET_ORDERS_FETCH_STATE:
      return { ...state, ordersFetchState: action.payload };

    default:
      return state;
  }
}


