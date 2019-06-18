import {
  USERS_LOADING,
  USERS_LOAD_SUCCEED,
  USERS_LOAD_FAILED
} from "../actions/users";

const initialState = {
  requestState: null,
  items: []
};

export const usersReduser = (state = initialState, { type, payload }) => {
  switch (type) {
    case USERS_LOADING:
      return { ...initialState, requestState: "loading" };
    case USERS_LOAD_SUCCEED:
      return {
        requestState: "succeed",
        items: payload,
      };
    case USERS_LOAD_FAILED:
      return {
        requestState: "error",
        items: []
      };

    default:
      return state;
  }
};