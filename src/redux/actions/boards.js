
import axios from "axios";
import { API_HOST } from "../../config"
export const BOARDS_LOADING = "BOARDS_LOADING";
export const BOARDS_LOAD_SUCCEED = "BOARDS_LOAD_SUCCEED";
export const BOARDS_LOAD_FAILED = "BOARDS_LOAD_FAILED";
//export const ADD_BOARD = "ADD_BOARD";

export const boardsLoadStart = () => ({ type: BOARDS_LOADING });

export const boardsLoadSucceed = boards => ({
  type: BOARDS_LOAD_SUCCEED,
  payload: boards
});

export const boardsLoadFailed = () => ({
  type: BOARDS_LOAD_FAILED
});

export const getBoards = () => dispatch => {
  dispatch(boardsLoadStart());
  axios
    .get(`${API_HOST}/boards`)
    .then(({ data }) => dispatch(boardsLoadSucceed(data)))
    .catch(() => dispatch(boardsLoadFailed()));
};

export const addBoard = payload => dispatch => {
  axios({
    method: 'post',
    url: `${API_HOST}/boards`,
    data: payload
  }).then(({ data }) => dispatch(getBoards()))
    .catch(error => alert("Oops, something went wrong :(", error));
};