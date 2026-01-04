export const SET_CATEGORIES = "product/SET_CATEGORIES";
export const SET_PRODUCT_LIST = "product/SET_PRODUCT_LIST";
export const SET_TOTAL = "product/SET_TOTAL";
export const SET_FETCH_STATE = "product/SET_FETCH_STATE";
export const SET_LIMIT = "product/SET_LIMIT";
export const SET_OFFSET = "product/SET_OFFSET";
export const SET_FILTER = "product/SET_FILTER";
export const SET_SORT = "product/SET_SORT";

// ✅ T13/T16 fetch state ayrımı
export const SET_PRODUCT_FETCH_STATE = "product/SET_PRODUCT_FETCH_STATE";

// ✅ T16: tekil product
export const SET_PRODUCT = "product/SET_PRODUCT";

export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories });
export const setProductList = (productList) => ({ type: SET_PRODUCT_LIST, payload: productList });
export const setTotal = (total) => ({ type: SET_TOTAL, payload: total });
export const setFetchState = (fetchState) => ({ type: SET_FETCH_STATE, payload: fetchState });
export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit });
export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset });
export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter });
export const setSort = (sort) => ({ type: SET_SORT, payload: sort });

export const setProductFetchState = (fetchState) => ({ type: SET_PRODUCT_FETCH_STATE, payload: fetchState });
export const setProduct = (product) => ({ type: SET_PRODUCT, payload: product });
