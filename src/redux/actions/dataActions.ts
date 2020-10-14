import { BASE_URL } from "../../constant";
import axios from "axios";
// redux
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

// types
import { RootStateType } from "../store";
import {
  LIKE_SCREAM,
  UNLIKE_LIKE_SCREAM,
  SET_SCREAMS,
  IS_LOADING_DATA,
  DELETE_SCREAM,
  IS_LOADING_UI,
  SetDataTypes,
  SetLoadingUITypes,
  POST_SCREAM,
  SET_ERROR,
  SetErrorActionTypes,
  IS_LOADED_UI,
  CLEAR_ERROR,
  SET_SCREAM
} from "./../types";
import { getUserData } from "./userAction";

type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootStateType,
  SetDataTypes | SetLoadingUITypes | SetErrorActionTypes,
  Action<string>
>;

// get all screams
export const getScreams = (): AppThunk => (dispatch) => {
  dispatch({
    type: IS_LOADING_DATA
  });
  axios
    .get(`${BASE_URL}/screams`)
    // destruction data property from res
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data
      });
    })
    .catch((err) => console.error(err));
};

// get scream
export const getScream = (screamId: string): AppThunk => (dispatch) => {
  dispatch({ type: IS_LOADING_UI });
  axios
    .get(`${BASE_URL}/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: SET_SCREAM,
        payload: res.data
      });
      dispatch({ type: IS_LOADED_UI });
    })
    .catch((err) => {
      console.log(err);
    });
};

// like a scream
export const likeScream = (screamId: string): AppThunk => (dispatch) => {
  axios
    .post(`${BASE_URL}/scream/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data
      });

      dispatch(getUserData());
    })
    .catch((err) => {
      console.error(err);
    });
};

// unlike a scream
export const unLikeScream = (screamId: string): AppThunk => (dispatch) => {
  axios
    .post(`${BASE_URL}/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_LIKE_SCREAM,
        payload: res.data
      });

      dispatch(getUserData());
    })
    .catch((err) => {
      console.error(err);
    });
};

// poste a scream
export const postScream = (newScream: string): AppThunk => (dispatch) => {
  dispatch({ type: IS_LOADING_UI });
  axios
    .post(`${BASE_URL}/scream`, { body: newScream })
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data
      });
      dispatch({ type: CLEAR_ERROR });
      dispatch({ type: IS_LOADED_UI });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERROR,
        payload: err.response.data
      });
      dispatch({ type: IS_LOADED_UI });
    });
};

// delete a scream
export const deleteScream = (screamId: string): AppThunk => (dispatch) => {
  axios
    .delete(`${BASE_URL}/scream/${screamId}`)
    .then(() => {
      dispatch({
        type: DELETE_SCREAM,
        payload: screamId
      });
    })
    .catch((err) => {
      console.error(err);
    });
};
