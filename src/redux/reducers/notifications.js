import {
  NOTIFICATIONS_LOADING,
  NOTIFICATIONS_LOAD_SUCCEED,
  NOTIFICATIONS_LOAD_FAILED,
  DELETE_NOTIFICATION
} from "../actions/notifications";

const initialState = {
  requestState: null,
  items: []
};

export const notificationsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case NOTIFICATIONS_LOADING:
      return { ...initialState, requestState: "loading" };
    case NOTIFICATIONS_LOAD_SUCCEED:
      return {
        requestState: "succeed",
        items: payload,
      };
    case NOTIFICATIONS_LOAD_FAILED:
      return {
        ...initialState,
        requestState: "error"
      };
    case DELETE_NOTIFICATION:
      const noteIndex = state.items.findIndex(note => note.id === payload);
      const newItems = [...state.items];
      newItems.splice(noteIndex, 1);
      return { ...state, items: newItems };

    default:
      return state;
  }
};