import axios from "axios";
import { BASE_URL } from "../constant";

// types
import { LoginUserType, SignUserType } from "../types/types";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const singInUser = (user: LoginUserType) => {
  const response = axios.post(`${BASE_URL}/login`, user, config).then((res) => {
    return res.data;
  });
  // catch is in action and calls different dispatch
  return response;
};

export const signUpUser = (user: SignUserType) => {
  const response = axios
    .post(`${BASE_URL}/signup`, user, config)
    .then((res) => {
      return res.data;
    });
  // catch is in action and calls different dispatch
  // TODO: this should be moved to action
  // .catch((err) => {
  //   return err.response.data;
  // });
  return response;
};
