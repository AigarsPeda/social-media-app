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
import { LoginUserType, SignUserType } from "../../types/types";
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
  SetLoadingUITypes
} from "../types";

type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootStateType,
  AuthenticateActionTypes | SetErrorActionTypes | SetLoadingUITypes,
  Action<string>
>;

export const logInUser = (userData: LoginUserType): AppThunk => async (
  dispatch
) => {
  try {
    // setting UI to loading
    dispatch({ type: IS_LOADING_UI });
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
    // setting UI to loaded
    dispatch({ type: IS_LOADED_UI });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: SET_ERROR,
        payload: error.response.data
      });
      // setting UI to loaded
      dispatch({ type: IS_LOADED_UI });
    }
  }
};

export const createUser = (newUserData: SignUserType): AppThunk => async (
  dispatch
) => {
  try {
    // setting UI to loading
    dispatch({ type: IS_LOADING_UI });
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
    // setting UI to loaded
    dispatch({ type: IS_LOADED_UI });
  } catch (error) {
    if (error.response) {
      dispatch({
        type: SET_ERROR,
        payload: error.response.data
      });
      // setting UI to loaded
      dispatch({ type: IS_LOADED_UI });
    }
  }
};

export const getUserData = (): AppThunk => (dispatch) => {
  axios
    // get works because axis header has token from signInUser or createUser action
    .get(`${BASE_URL}/user`)
    .then((res) => {
      console.log("SET_USER ACTION: ", res.data);
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    })
    .catch((err) => {
      console.log("SET_USER ACTION ERROR: ", console.error(err));
    });
};

export const logOutUser = (): AppThunk => (dispatch) => {
  dispatch({
    type: UNAUTHENTICATED_USER
  });
  delete axios.defaults.headers.common["Authorization"];
};
