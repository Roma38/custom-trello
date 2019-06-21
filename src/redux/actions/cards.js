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
    .catch(() => dispatch(cardsLoadFailed()));
};

export const getOneCard = id => dispatch => {
  dispatch(cardsLoadStart());
  axios
    .get(`${API_HOST}/cards/${id}`)
    .then(({ data }) => dispatch(cardsLoadSucceed([data])))
    .catch(() => dispatch(cardsLoadFailed()));
};

export const addCard = payload => dispatch => {
  axios({
    method: 'post',
    url: `${API_HOST}/cards`,
    data: payload
  }).then(() => dispatch(getCards()))
    .catch(() => alert("Oops, something went wrong :("));
};

export const editCard = ({name, description, cardId}) => dispatch => {
  axios({
    method: 'patch',
    url: `${API_HOST}/cards/${cardId}`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    data: {name, description}
  }).then(() => dispatch(getCards()))
    .catch(() => alert("Oops, something went wrong :("));
};

export const deleteCard = cardId => dispatch => {
  axios({
    method: 'delete',
    url: `${API_HOST}/cards/${cardId}`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then(() => dispatch(getCards()))
    .catch(() => alert("Oops, something went wrong :("));
};

export const changeColumn = payload => {
  console.log(payload)
  axios({
    method: 'patch',
    url: `${API_HOST}/cards/${payload.id}`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    data: { columnId: payload.columnId }
  }).then(response => console.log(response))
    .catch(() => alert("Oops, something went wrong :("));
  return ({
    type: CHANGE_COLUMN,
    payload
  })
};

export const addMember = payload => {
  console.log(payload)
  axios({
    method: 'patch',
    url: `${API_HOST}/cards/${payload.id}`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    data: { members: payload.members }
  }).then(response => console.log(response))
    .catch(() => alert("Oops, something went wrong :("));
};