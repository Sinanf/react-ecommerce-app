import {
  SET_CATEGORIES,
  SET_FETCH_STATE,
  SET_FILTER,
  SET_LIMIT,
  SET_OFFSET,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_SORT,
  SET_PRODUCT_FETCH_STATE,
  SET_PRODUCT,
  SET_HOME_PRODUCT_LIST,
  SET_HOME_TOTAL,
  SET_HOME_PRODUCT_FETCH_STATE,
} from "../actions/productActions";

const initialState = {
  categories: [],
  productList: [],
  total: 0,
  limit: 25,
  offset: 0,
  filter: "",
  sort: "",

  fetchState: "NOT_FETCHED",          // categories state
  productFetchState: "NOT_FETCHED",   // products list OR product detail state
  product: null,  
  
  homeProductList: [],
  homeTotal: 0,
  homeProductFetchState: "NOT_FETCHED",
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case SET_PRODUCT_LIST:
      return { ...state, productList: action.payload };
    case SET_TOTAL:
      return { ...state, total: action.payload };
    case SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };
    case SET_LIMIT:
      return { ...state, limit: action.payload };
    case SET_OFFSET:
      return { ...state, offset: action.payload };
    case SET_FILTER:
      return { ...state, filter: action.payload };
    case SET_SORT:
      return { ...state, sort: action.payload };

    case SET_PRODUCT_FETCH_STATE:
      return { ...state, productFetchState: action.payload };

    case SET_PRODUCT:
      return { ...state, product: action.payload };

    // ✅ HomePage
    case SET_HOME_PRODUCT_LIST:
      return { ...state, homeProductList: action.payload };
    case SET_HOME_TOTAL:
      return { ...state, homeTotal: action.payload };
    case SET_HOME_PRODUCT_FETCH_STATE:
      return { ...state, homeProductFetchState: action.payload };

    default:
      return state;
  }
}
