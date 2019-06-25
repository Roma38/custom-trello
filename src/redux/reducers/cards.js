import {
  CARDS_LOADING,
  CARDS_LOAD_SUCCEED,
  CARDS_LOAD_FAILED,
  CHANGE_COLUMN
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
    case CHANGE_COLUMN:
      const index = state.items.findIndex(({ id }) => id === payload.cardId)
      const newItems = [...state.items];
      newItems[index].columnId = payload.columnId;
      return {
        ...state,
        items: newItems
      }

    default:
      return state;
  }
};