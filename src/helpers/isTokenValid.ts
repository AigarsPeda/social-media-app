import jwtDecode from "jwt-decode";
import { TokenType } from "../types/types";

export const isTokenValid = (value: any) => {
  const decodedToken: TokenType = jwtDecode(value);
  if (
    (value === undefined ||
      value === null ||
      (typeof value === "object" && Object.keys(value).length === 0) ||
      (typeof value === "string" && value.trim().length === 0)) &&
    // decoding token checking if its expiration date is no over
    decodedToken.exp * 1000 < Date.now()
  ) {
    return false;
  } else {
    return true;
  }
};
