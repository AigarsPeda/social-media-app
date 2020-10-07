import { ErrorsType, UserDataType } from "../types/types";

// USER
export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
interface IAuthenticateUserAction {
  type: typeof AUTHENTICATE_USER;
  payload: string;
}

export const UNAUTHENTICATED_USER = "UNAUTHENTICATED_USER";
interface IUnauthenticatedUserAction {
  type: typeof UNAUTHENTICATED_USER;
  // payload: string;
}

export const SET_USER = "SET_USER";
interface ISetUserAction {
  type: typeof SET_USER;
  payload: UserDataType;
}

export const LOADING_USER = "LOADING_USER";
interface ILoadingUserAction {
  type: typeof LOADING_USER;
  // payload: UserDataType;
}

export const LOADED_USER = "LOADED_USER";
interface ILoadedUserAction {
  type: typeof LOADED_USER;
  // payload: UserDataType;
}

export type AuthenticateActionTypes =
  | IAuthenticateUserAction
  | ISetUserAction
  | IUnauthenticatedUserAction
  | ILoadingUserAction
  | ILoadedUserAction;

// ERROR
export const SET_ERROR = "SET_ERROR";
interface ISetErrorAction {
  type: typeof SET_ERROR;
  payload: ErrorsType;
}

export const CLEAR_ERROR = "CLEAR_ERROR";
interface IClearErrorAction {
  type: typeof CLEAR_ERROR;
  // payload: ErrorsType;
}
export type SetErrorActionTypes = ISetErrorAction | IClearErrorAction;

// UI
export const IS_LOADING_UI = "IS_LOADING_UI";
interface IisLoadingUIAction {
  type: typeof IS_LOADING_UI;
  // payload: ErrorsType;
}

export const IS_LOADED_UI = "IS_LOADED_UI";
interface ILoadedUIAction {
  type: typeof IS_LOADED_UI;
  // payload: ErrorsType;
}
export type SetLoadingUITypes = IisLoadingUIAction | ILoadedUIAction;
