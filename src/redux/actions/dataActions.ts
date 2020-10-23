import { BASE_URL } from "../../constant";
import axios from "axios";
// redux
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

// types
import { RootStateType } from "../store";
import {
  CLEAR_ERROR,
  DELETE_SCREAM,
  IS_LOADED_UI,
  IS_LOADING_DATA,
  IS_LOADING_UI,
  LIKE_SCREAM,
  POST_SCREAM,
  SET_ERROR,
  SET_SCREAM,
  SET_SCREAMS,
  SetDataTypes,
  SetErrorActionTypes,
  SetLoadingUITypes,
  SUBMIT_COMMENT,
  UNLIKE_LIKE_SCREAM
} from "../types";
import { getUserData } from "./userAction";

export type DataActionThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootStateType,
  SetDataTypes | SetLoadingUITypes | SetErrorActionTypes,
  Action<string>
>;

// get all screams
export const getScreams = (): DataActionThunk => (dispatch) => {
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
export const getScream = (screamId: string): DataActionThunk => (dispatch) => {
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
export const likeScream = (screamId: string): DataActionThunk => (dispatch) => {
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
export const unLikeScream = (screamId: string): DataActionThunk => (
  dispatch
) => {
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

// post a scream
export const postScream = (newScream: string): DataActionThunk => (
  dispatch
) => {
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
export const deleteScream = (screamId: string): DataActionThunk => (
  dispatch
) => {
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

// post comment
export const submitComment = (
  screamId: string,
  commentData: string
): DataActionThunk => (dispatch) => {
  axios
    .post(`${BASE_URL}/scream/${screamId}/comment`, { body: commentData })
    .then((res) => {
      dispatch({ type: SUBMIT_COMMENT, payload: res.data });
      dispatch({ type: CLEAR_ERROR });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERROR,
        payload: err.response.data
      });
      console.error(err);
    });
};

export const getUserProfile = (userHandle: string): DataActionThunk => (
  dispatch
) => {
  dispatch({ type: IS_LOADING_DATA });
  axios(`${BASE_URL}/user/${userHandle}`)
    .then((res) => {
      console.log("DATA ACTION: ", res.data.screams);
      dispatch({
        type: SET_SCREAMS,
        payload: res.data.screams
      });
    })
    .catch((err) => {
      console.error(err);
      dispatch({
        type: SET_SCREAMS,
        payload: null
      });
    });
};
