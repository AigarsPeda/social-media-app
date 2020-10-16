import axios from "axios";
import { BASE_URL } from "../../constant";

// redux
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootStateType } from "../store";

// helper functions
import { authToken } from "../../helpers/authToken";
import { signUpUser, singInUser } from "../../services/auth.services";

// types
import {
  LoginUserType,
  SignUserType,
  UserDetailsType
} from "../../types/types";
import {
  UNAUTHENTICATED_USER,
  AUTHENTICATE_USER,
  IS_LOADING_UI,
  IS_LOADED_UI,
  CLEAR_ERROR,
  SET_ERROR,
  SET_USER,
  AuthenticateActionTypes,
  SetErrorActionTypes,
  SetLoadingUITypes,
  LOADING_USER,
  LOADED_USER,
  SetDataTypes,
  CLEAR_DATA
} from "../types";

type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootStateType,
  | AuthenticateActionTypes
  | SetErrorActionTypes
  | SetLoadingUITypes
  | SetDataTypes,
  Action<string>
>;

// log in existing user
export const logInUser = (userData: LoginUserType): AppThunk => async (
  dispatch
) => {
  try {
    // IS_LOADING_UI is necessary for login and sign up button
    dispatch({ type: IS_LOADING_UI });
    dispatch({ type: LOADING_USER });
    const user = await singInUser(userData);
    const { token } = user;
    // adding axios default header if token to use it other axis calls
    authToken(token);
    // dispatches action to add userData to state
    dispatch({
      type: AUTHENTICATE_USER,
      payload: token
    });
    // adding logged in userData to state (calling different action)
    dispatch(getUserData());
    // if there is any error in state clear it
    dispatch({ type: CLEAR_ERROR });
    dispatch({ type: IS_LOADED_UI });
    // setting UI to loaded
  } catch (error) {
    if (error.response) {
      dispatch({
        type: SET_ERROR,
        payload: error.response.data
      });
      // setting UI to loaded
      dispatch({ type: LOADED_USER });
      dispatch({ type: IS_LOADED_UI });
    }
  }
};

// cerate new user
export const createUser = (newUserData: SignUserType): AppThunk => async (
  dispatch
) => {
  try {
    // IS_LOADING_UI is necessary for login and sign up button
    dispatch({ type: IS_LOADING_UI });
    dispatch({ type: LOADING_USER });
    const user = await signUpUser(newUserData);
    const { token } = user;
    // adding axios default header if token to use it other axis calls
    authToken(token);
    // dispatches action to add userData to state
    dispatch({
      type: AUTHENTICATE_USER,
      payload: token
    });
    // adding logged in userData to state (calling different action)
    dispatch(getUserData());
    // if there is any error in state clear it
    dispatch({ type: CLEAR_ERROR });
    dispatch({ type: IS_LOADED_UI });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: SET_ERROR,
        payload: error.response.data
      });
      // setting UI to loaded
      dispatch({ type: LOADED_USER });
      dispatch({ type: IS_LOADED_UI });
    }
  }
};

// get user data from db
export const getUserData = (): AppThunk => (dispatch) => {
  axios
    // get works because axis header has token from signInUser or createUser action
    .get(`${BASE_URL}/user`)
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
      dispatch({
        type: LOADED_USER
      });
    })
    .catch((err) => {
      console.log("SET_USER ACTION ERROR: ", console.error(err));
      // setting user to loaded
      dispatch({
        type: LOADED_USER
      });
    });
};

// up load image to db and update logged in user
export const uploadImage = (formData: FormData): AppThunk => (dispatch) => {
  axios
    .post(`${BASE_URL}/user/image`, formData)
    .then(() => {
      // calling getUserData to fetch new image and set new user data
      dispatch(getUserData());
    })
    .catch((err) => {
      console.error(err);
      dispatch({
        type: LOADED_USER
      });
    });
};

// update logged in user data
export const editUserDetails = (userDetails: UserDetailsType): AppThunk => (
  dispatch
) => {
  // dispatch({
  //   type: LOADING_USER
  // });
  axios
    .post(`${BASE_URL}/user`, userDetails)
    .then(() => {
      // calling getUserData to fetch new image and set new user data
      dispatch(getUserData());
    })
    .catch((err) => {
      console.error(err);
      dispatch({
        type: LOADED_USER
      });
    });
};

// log out user
export const logOutUser = (): AppThunk => (dispatch) => {
  dispatch({
    type: CLEAR_DATA
  });
  dispatch({
    type: UNAUTHENTICATED_USER
  });
  delete axios.defaults.headers.common["Authorization"];
};
