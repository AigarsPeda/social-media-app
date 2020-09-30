import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";

const initialState = {};
const middleware = [thunk];

const rootReducers = combineReducers({
  auth: authReducer
});

const store = createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
