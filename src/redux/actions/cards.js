import axios from "axios";
import { API_HOST } from "../../config"
export const CARDS_LOADING = "CARDS_LOADING";
export const CARDS_LOAD_SUCCEED = "CARDS_LOAD_SUCCEED";
export const CARDS_LOAD_FAILED = "CARDS_LOAD_FAILED";
export const CHANGE_COLUMN = "CHANGE_COLUMN";


export const cardsLoadStart = () => ({ type: CARDS_LOADING });

export const cardsLoadSucceed = cards => ({
  type: CARDS_LOAD_SUCCEED,
  payload: cards
});

export const cardsLoadFailed = () => ({
  type: CARDS_LOAD_FAILED
});

export const getCards = () => dispatch => {
  dispatch(cardsLoadStart());
  axios
    .get(`${API_HOST}/cards`)
    .then(({ data }) => dispatch(cardsLoadSucceed(data)))
    .catch(error => dispatch(cardsLoadFailed(error)));
};

export const getOneCard = id => dispatch => {
  dispatch(cardsLoadStart());
  axios
    .get(`${API_HOST}/cards/${id}`)
    .then(({ data }) => dispatch(cardsLoadSucceed([data])))
    .catch(error => dispatch(cardsLoadFailed(error)));
};

export const addCard = payload => dispatch => {
  axios({
    method: 'post',
    url: `${API_HOST}/cards`,
    data: payload
  }).then(() => dispatch(getCards()))
    .catch(error => alert("Oops, something went wrong :(", error));
};

export const changeColumn = payload => {
  axios({
    method: 'patch',
    url: `${API_HOST}/cards/${payload.cardId}`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    data: { columnId: payload.columnId }
  }).then(response => console.log("RESPONSE: " + response))
    .catch(error => alert("Oops, something went wrong :(", error));
  return ({
    type: CHANGE_COLUMN,
    payload
  })
}