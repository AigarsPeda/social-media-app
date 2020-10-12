import { ScreamType } from "../../types/types";
import {
  SET_SCREAMS,
  SetDataTypes,
  CLEAR_DATA,
  IS_LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_LIKE_SCREAM,
  DELETE_SCREAM
} from "../types";

export interface IUserInitialState {
  screams: ScreamType[];
  scream: ScreamType;
  isLoadingData: boolean;
}

const initialState: IUserInitialState = {
  isLoadingData: false,
  screams: [],
  scream: {
    body: "",
    commentCount: 0,
    createdAt: "",
    likeCount: 0,
    screamId: "",
    userHandle: "",
    userImage: ""
  }
};

export default (state = initialState, action: SetDataTypes) => {
  switch (action.type) {
    case SET_SCREAMS:
      return {
        ...state,
        isLoadingData: false,
        screams: action.payload
      };

    case IS_LOADING_DATA:
      return {
        ...state,
        isLoadingData: true
      };

    // in both cases do this
    case LIKE_SCREAM:
    case UNLIKE_LIKE_SCREAM:
      return {
        ...state,
        screams: state.screams.map((scream) => {
          if (scream.screamId === action.payload.screamId) {
            return (scream = action.payload);
          } else {
            return scream;
          }
        })
      };

    case DELETE_SCREAM:
      return {
        ...state,
        screams: state.screams.filter((scream) => {
          return scream.screamId !== action.payload;
        })
      };

    case CLEAR_DATA: {
      return initialState;
    }

    default:
      return state;
  }
};
