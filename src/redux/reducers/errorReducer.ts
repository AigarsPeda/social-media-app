import { ErrorsType } from "../../types/types";
import { SET_ERROR, SetErrorActionTypes, CLEAR_ERROR } from "../types";

export interface IErrorInitialState {
  error: ErrorsType;
}

const initialState: IErrorInitialState = {
  error: {}
};

export default (state = initialState, action: SetErrorActionTypes) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case CLEAR_ERROR:
      return initialState;

    default:
      return state;
  }
};
