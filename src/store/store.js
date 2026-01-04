import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers/rootReducer";

const isDev = import.meta.env.MODE === "development";

const middlewares = [thunk];

if (isDev) {
  const { createLogger } = await import("redux-logger");
  middlewares.push(createLogger());
}

const composeEnhancers =
  (isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
