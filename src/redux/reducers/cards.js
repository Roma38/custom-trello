import {
  CARDS_LOADING,
  CARDS_LOAD_SUCCEED,
  CARDS_LOAD_FAILED,
} from "../actions/cards";

const initialState = {
  requestState: null,
  items: []
};

export const cardsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CARDS_LOADING:
      return { ...initialState, requestState: "loading" };
    case CARDS_LOAD_SUCCEED:
      return {
        requestState: "succeed",
        items: payload,        
      };
    case CARDS_LOAD_FAILED:
      return {
        ...initialState,
        requestState: "error"
      };

    default:
      return state;
  }
};