import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import userReducer from "./reducers/userReducer";
import errorReducer from "./reducers/errorReducer";

const initialState = {};
const middleware = [thunk];

const rootReducers = combineReducers({
  user: userReducer,
  errors: errorReducer
});

const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
export type RootStateType = ReturnType<typeof rootReducers>;
