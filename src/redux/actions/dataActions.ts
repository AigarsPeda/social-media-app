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
  SetDataTypes
} from "./../types";
import { getUserData } from "./userAction";

type AppThunk<ReturnType = any> = ThunkAction<
  ReturnType,
  RootStateType,
  SetDataTypes,
  Action<string>
>;

// get all screams
export const getScreams = (): AppThunk => async (dispatch) => {
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
