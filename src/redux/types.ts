import { ErrorsType, UserDataType } from "../types/types";

// USER
export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
interface IAuthenticateUserAction {
  type: typeof AUTHENTICATE_USER;
  payload: string;
}

export const SET_USER = "SET_USER";
interface ISetUserAction {
  type: typeof SET_USER;
  payload: UserDataType;
}

export type AuthenticateActionTypes = IAuthenticateUserAction | ISetUserAction;

// ERROR
export const SET_ERROR = "SET_ERROR";
interface ISetErrorAction {
  type: typeof SET_ERROR;
  payload: ErrorsType;
}
export type SetErrorActionTypes = ISetErrorAction;
