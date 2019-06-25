import axios from "axios";
import { API_HOST } from "../../config";

export const AUTH_REQUESTED = "AUTH_REQUESTED";
export const AUTH_SUCCEED = "AUTH_SUCCEED";
export const AUTH_FAILED = "AUTH_FAILED";
export const LOG_OUT = "LOG_OUT";

export const authRequested = () => ({
  type: AUTH_REQUESTED,
});

export const authSucceed = payload => ({
  type: AUTH_SUCCEED,
  payload
});

export const authFailed = () => ({
  type: AUTH_FAILED
});

export const logOut = () => ({
  type: LOG_OUT
});

export const register = data => dispatch => axios({
  method: 'post',
  url: `${API_HOST}/users`,
  data
}).then(() => {
  alert("You was succefuly registered");
})
  .catch(error => {
    console.log(error.response)
    alert("Oops, somethig went wrong :(");
  });

export const login = ({ email, password }) => dispatch => {
  dispatch(authRequested());
  axios({
    method: 'post',
    url: `${API_HOST}/users/signIn`,
    data: { email, password }
  }).then(({ data }) => {
    console.log(data)
    localStorage.setItem('userId', data.id);
    localStorage.setItem('token', data.token);
    localStorage.setItem('nickname', data.nickname);
    localStorage.setItem('email', data.email);
    dispatch(authSucceed({ ...data }));
  })
    .catch(error => {
      alert("Oops, somethig went wrong :(");
      console.log(error.response)
      dispatch(authFailed())
    });
};
