import { isTokenValid } from "../../helpers/isTokenValid";
import {
  AUTHENTICATE_USER,
  SET_USER,
  UNAUTHENTICATED_USER,
  AuthenticateActionTypes
} from "../types";
import { UserDataType } from "../../types/types";

export interface IUserInitialState {
  isAuthenticated: boolean;
  token: string;
  userData: UserDataType;
}

const initialState: IUserInitialState = {
  isAuthenticated: false,
  token: "",
  userData: {
    credentials: {
      bio: "",
      createdAt: "",
      email: "",
      handle: "",
      imageUrl: "",
      location: "",
      userId: "",
      website: ""
    },
    likes: [
      {
        userHandle: "",
        screamId: ""
      }
    ],
    notifications: [
      {
        userHandle: "",
        screamId: ""
      }
    ]
  }
};

export default (state = initialState, action: AuthenticateActionTypes) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        isAuthenticated: isTokenValid(action.payload),
        token: action.payload
      };
    case SET_USER:
      return {
        ...state,
        userData: action.payload
      };
    case UNAUTHENTICATED_USER:
      return initialState;

    default:
      return state;
  }
};
