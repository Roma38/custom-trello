import axios from "axios";
import { API_HOST } from "../../config"
export const USERS_LOADING = "USERS_LOADING";
export const USERS_LOAD_SUCCEED = "USERS_LOAD_SUCCEED";
export const USERS_LOAD_FAILED = "USERS_LOAD_FAILED";

export const usersLoadStart = () => ({ type: USERS_LOADING });

export const usersLoadSucceed = users => ({
  type: USERS_LOAD_SUCCEED,
  payload: users
});

export const usersLoadFailed = () => ({
  type: USERS_LOAD_FAILED
});

export const getUsers = () => dispatch => {
  dispatch(usersLoadStart());
  axios
    .get(`${API_HOST}/users`)
    .then(({ data }) => dispatch(usersLoadSucceed(data)))
    .catch(() => dispatch(usersLoadFailed()));
};