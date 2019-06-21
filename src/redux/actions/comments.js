import axios from "axios";
import { API_HOST } from "../../config"
export const COMMENTS_LOADING = "COMMENTS_LOADING";
export const COMMENTS_LOAD_SUCCEED = "COMMENTS_LOAD_SUCCEED";
export const COMMENTS_LOAD_FAILED = "COMMENTS_LOAD_FAILED";

export const commentsLoadStart = () => ({ type: COMMENTS_LOADING });

export const commentsLoadSucceed = comments => ({
  type: COMMENTS_LOAD_SUCCEED,
  payload: comments
});

export const commentsLoadFailed = () => ({
  type: COMMENTS_LOAD_FAILED
});

export const getComments = () => dispatch => {
  dispatch(commentsLoadStart());
  axios
    .get(`${API_HOST}/comments`)
    .then(({ data }) => dispatch(commentsLoadSucceed(data)))
    .catch(() => dispatch(commentsLoadFailed()));
};

export const addComment = payload => dispatch => {
  console.log("ADD COMENT FUNCTION FIRED")
  axios({
    method: 'post',
    url: `${API_HOST}/comments`,
    data: payload
  }).then((response) => {
    dispatch(getComments())
    //console.log(response)
  })
    .catch(error => alert("Oops, something went wrong :("));
};