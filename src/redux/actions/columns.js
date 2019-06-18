import axios from "axios";
import { API_HOST } from "../../config"
export const COLUMN_LOADING = "COLUMN_LOADING";
export const COLUMN_LOAD_SUCCEED = "COLUMN_LOAD_SUCCEED";
export const COLUMN_LOAD_FAILED = "COLUMN_LOAD_FAILED";
//export const ADD_COLUMN = "ADD_COLUMN";

export const columnsLoadStart = () => ({ type: COLUMN_LOADING });

export const columnsLoadSucceed = columns => ({
  type: COLUMN_LOAD_SUCCEED,
  payload: columns
});

export const columnsLoadFailed = () => ({
  type: COLUMN_LOAD_FAILED
});

export const getColumns = () => dispatch => {
  dispatch(columnsLoadStart());
  axios
    .get(`${API_HOST}/columns`)
    .then(({ data }) => dispatch(columnsLoadSucceed(data)))
    .catch(error => dispatch(columnsLoadFailed(error)));
};

export const addColumn = payload => dispatch => {
  axios({
    method: 'post',
    url: `${API_HOST}/columns`,
    data: payload
  }).then(() => dispatch(getColumns()))
    .catch(error => alert("Oops, something went wrong :(", error));
};