import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// reducers
import uiReducer from "./reducers/uiReducer";
import dataReducer from "./reducers/dataReducer";
import userReducer from "./reducers/userReducer";
import errorReducer from "./reducers/errorReducer";

const initialState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState")!)
  : {};

const middleware = [thunk];

const rootReducers = combineReducers({
  user: userReducer,
  errors: errorReducer,
  ui: uiReducer,
  data: dataReducer
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
