import axios from "axios";
import { API_HOST } from "../../config";
import { addMoveCardNote, addMemberNote } from "./notifications";

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


export const addCard = payload => dispatch => {
  axios({
    method: 'post',
    url: `${API_HOST}/cards`,
    data: payload
  }).then(() => dispatch(getCards()))
    .catch(() => alert("Oops, something went wrong :("));
};

export const editCard = ({ name, description, cardId }) => dispatch => {
  axios({
    method: 'patch',
    url: `${API_HOST}/cards/${cardId}`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    data: { name, description }
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

export const moveCard = payload => ({
  type: CHANGE_COLUMN,
  payload
});

export const changeColumn = payload => dispatch => {
  const { columnId, cardId } = payload
  axios({
    method: 'patch',
    url: `${API_HOST}/cards/${cardId}`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    data: { columnId }
  }).then(() => {
    addMoveCardNote(payload);
    dispatch(moveCard({ columnId, cardId }));
  })
    .catch(() => alert("Oops, something went wrong :("));
};

export const addMember = (cardId, members, authorId, columnId, boardId) => {
  console.log({cardId, members, authorId, columnId, boardId})
  axios({
    method: 'patch',
    url: `${API_HOST}/cards/${cardId}`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    data: { members }
  }).then(({ data }) => {
    console.log(data[1][0]);
    //addMemberNote(authorId, members);
  })
    .catch(() => alert("Oops, something went wrong :("));
};

// export const getOneCard = id => dispatch => {
//   dispatch(cardsLoadStart());
//   axios
//     .get(`${API_HOST}/cards/${id}`)
//     .then(({ data }) => dispatch(cardsLoadSucceed([data])))
//     .catch(() => dispatch(cardsLoadFailed()));
// };