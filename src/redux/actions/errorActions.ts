import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootStateType } from "../store";
import { CLEAR_ERROR, SetErrorActionTypes } from "./../types";

type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootStateType,
  SetErrorActionTypes,
  Action<string>
>;

export const clearErrors = (): AppThunk => (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
