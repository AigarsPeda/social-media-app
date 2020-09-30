export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
interface IAuthenticateUserAction {
  type: typeof AUTHENTICATE_USER;
  payload: string;
}

export type AuthenticateActionTypes = IAuthenticateUserAction;
