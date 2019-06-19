import {
  COMMENTS_LOADING,
  COMMENTS_LOAD_SUCCEED,
  COMMENTS_LOAD_FAILED,
} from "../actions/comments";

const initialState = {
  requestState: null,
  items: []
};

export const commentsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case COMMENTS_LOADING:
      return { ...initialState, requestState: "loading" };
    case COMMENTS_LOAD_SUCCEED:
      return {
        requestState: "succeed",
        items: payload,
      };
    case COMMENTS_LOAD_FAILED:
      return {
        ...initialState,
        requestState: "error"
      };

    default:
      return state;
  }
};