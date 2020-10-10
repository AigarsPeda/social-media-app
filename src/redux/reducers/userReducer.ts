import { isToken } from "../../helpers/isToken";
import {
  AUTHENTICATE_USER,
  SET_USER,
  UNAUTHENTICATED_USER,
  AuthenticateActionTypes,
  SetDataTypes,
  LOADING_USER,
  LOADED_USER,
  LIKE_SCREAM,
  UNLIKE_LIKE_SCREAM
} from "../types";
import { UserDataType } from "../../types/types";

export interface IUserInitialState {
  isAuthenticated: boolean;
  isLoadingUser: boolean;
  token: string;
  userData: UserDataType;
}

const initialState: IUserInitialState = {
  isAuthenticated: false,
  isLoadingUser: false,
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

export default (
  state = initialState,
  action: AuthenticateActionTypes | SetDataTypes
) => {
  switch (action.type) {
    case AUTHENTICATE_USER:
      return {
        ...state,
        isAuthenticated: isToken(action.payload),
        token: action.payload
      };
    case SET_USER:
      return {
        ...state,
        userData: action.payload
      };
    case LOADING_USER:
      return {
        ...state,
        isLoadingUser: true
      };
    case LOADED_USER:
      return {
        ...state,
        isLoadingUser: false
      };
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.userData.likes,
          {
            userHandle: state.userData.credentials.handle,
            screamId: action.payload.screamId
          }
        ]
      };
    case UNLIKE_LIKE_SCREAM:
      return {
        ...state,
        likes: state.userData.likes.filter(
          (like) => like.screamId !== action.payload.screamId
        )
      };
    case UNAUTHENTICATED_USER:
      return initialState;

    default:
      return state;
  }
};
