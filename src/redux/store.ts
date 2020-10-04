import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import errorReducer from "./reducers/errorReducer";
import uiReducer from "./reducers/uiReducer";

const initialState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState")!)
  : {};

const middleware = [thunk];

const rootReducers = combineReducers({
  user: userReducer,
  errors: errorReducer,
  ui: uiReducer
});

const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
export type RootStateType = ReturnType<typeof rootReducers>;
