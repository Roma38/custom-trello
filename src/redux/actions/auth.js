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
  // dispatch(openPopup({
  //   content: `You was successfully registered! Now you can login`,
  //   attributes: { positive: true }
  // }))
  // dispatch(push('/login'))
  alert("You was succefuly registered");
})
  .catch(error => {
    // dispatch((openPopup({
    //   content: error.response.data.errors ? error.response.data.errors.message : `Ooops, something went wrong :(`,
    //   attributes: { negative: true }
    // })))
    alert("Oops, somethig went wrong :(",error);
  });

export const login = ({ email, password }) => dispatch => {
  dispatch(authRequested());
  axios({
    method: 'post',
    url: `${API_HOST}/users/signIn`,
    data: { email, password }
  }).then(({ data }) => {
    // dispatch(openPopup({
    //   content: `You was successfully logged in`,
    //   attributes: { positive: true }
    // }))
    // dispatch(push('/halls'));
    dispatch(authSucceed({ ...data, email }));
  })
    .catch(error => {
      // dispatch((openPopup({
      //   content: error.response.data.message ? error.response.data.message : `Ooops, something went wrong :(`,
      //   attributes: { negative: true }
      // })))
      dispatch(authFailed(error))
    });
};
