import {
  AUTH_SUCCEED,
  LOG_OUT
} from "../actions/auth";

const initialState = {
  authState: "loggedIn",
  id: null,
  email: null,
  nickname: null,
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // case AUTH_REQUESTED:
    //   return { ...initialState, authState: "loading" };
    case AUTH_SUCCEED:
      const { id, email, nickname } = payload;
      return { authState: "loggedIn", id, email, nickname };
    // case AUTH_FAILED:
    //   return { ...initialState };
    case LOG_OUT:
      return { ...initialState };

    default:
      return state;
  }
};
