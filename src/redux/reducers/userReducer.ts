import { isToken } from "../../helpers/isToken";
import {
  AUTHENTICATE_USER,
  AuthenticateActionTypes,
  LIKE_SCREAM,
  LOADED_USER,
  LOADING_USER,
  MARK_NOTIFICATIONS_RED,
  SET_USER,
  SetDataTypes,
  UNAUTHENTICATED_USER,
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
        recipient: "",
        sender: "",
        createdAt: "",
        screamId: "",
        type: "",
        read: false,
        notificationId: ""
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
        userData: action.payload,
        isLoadingUser: false
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
        ...state.userData,
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
        ...state.userData,
        likes: state.userData.likes.filter(
          (like) => like.screamId !== action.payload.screamId
        )
      };
    case MARK_NOTIFICATIONS_RED:
      // return {
      //   ...state,
      //   userData: {
      //     ...state.userData,
      //     notifications: state.userData.notifications.forEach(
      //       (not) => (not.read = true)
      //     )
      //   }
      // };
      return {
        ...state,
        ...state.userData,
        notifications: state.userData.notifications.map((notification) => {
          notification.read = true;
        })
      };
    case UNAUTHENTICATED_USER:
      return initialState;

    default:
      return state;
  }
};
