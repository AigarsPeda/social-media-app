import { AUTHENTICATE_USER, AuthenticateActionTypes } from "../types";

export interface IAuthInitialState {
  isAuthenticated: boolean;
  token: string;
}

// Initial State
const initialState: IAuthInitialState = {
  isAuthenticated: false,
  token: ""
};

export default (state = initialState, action: AuthenticateActionTypes) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        isAuthenticated: action.payload,
        token: action.payload
      };

    default:
      return state;
  }
};
