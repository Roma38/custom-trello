import {
  AUTH_REQUESTED,
  AUTH_SUCCEED,
  AUTH_FAILED,
  LOG_OUT
} from "../actions/auth";


const initialState = {
  authState: "unauthorized",
  id: null,
  email: null,
  nickname: null,
  token: null
};

export const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_REQUESTED:
      return { ...initialState, authState: "loading" };
    case AUTH_SUCCEED:
      const { id, email, nickname, token } = payload;
      localStorage.setItem('userId', id);
      localStorage.setItem('email', email);
      localStorage.setItem('nickname', nickname);
      localStorage.setItem('token', token)
      return { authState: "loggedIn", id, email, nickname, token };
    case AUTH_FAILED:
      return { ...initialState };
    case LOG_OUT:
      localStorage.clear()
      return { ...initialState };

    default:
      return state;
  }
};
