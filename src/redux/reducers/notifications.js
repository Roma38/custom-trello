import {
  NOTIFICATIONS_LOADING,
  NOTIFICATIONS_LOAD_SUCCEED,
  NOTIFICATIONS_LOAD_FAILED
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

    default:
      return state;
  }
};