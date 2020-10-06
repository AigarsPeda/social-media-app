import { IS_LOADING_UI, IS_LOADED_UI, SetLoadingUITypes } from "../types";

export interface IUiInitialState {
  isLoading: boolean;
}

const initialState: IUiInitialState = {
  isLoading: false
};

export default (state = initialState, action: SetLoadingUITypes) => {
  switch (action.type) {
    case IS_LOADING_UI:
      return {
        ...state,
        isLoading: true
      };

    case IS_LOADED_UI:
      return {
        ...state,
        isLoading: false
      };

    default:
      return state;
  }
};
