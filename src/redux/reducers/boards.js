import {
  BOARDS_LOADING,
  BOARDS_LOAD_SUCCEED,
  BOARDS_LOAD_FAILED
} from "../actions/boards";

const initialState = {
  requestState: null,
  items: []
};

export const boardsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case BOARDS_LOADING:
      return { ...initialState, requestState: "loading" };
    case BOARDS_LOAD_SUCCEED:
      return {
        requestState: "succeed",
        items: payload,
      };
    case BOARDS_LOAD_FAILED:
      return {
        ...initialState,
        requestState: "error"
      };
    
    default:
      return state;
  }
};
