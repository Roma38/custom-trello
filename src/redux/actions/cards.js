import axios from "axios";
import { API_HOST } from "../../config";
import { addMoveCardNote, addMemberNote } from "./notifications";

export const CARDS_LOADING = "CARDS_LOADING";
export const CARDS_LOAD_SUCCEED = "CARDS_LOAD_SUCCEED";
export const CARDS_LOAD_FAILED = "CARDS_LOAD_FAILED";
export const CHANGE_COLUMN = "CHANGE_COLUMN";
export const ONE_CARD_LOADED = "ONE_CARD_LOADED";
export const CHANGE_ORDER = "CHANGE_ORDER";
export const DELETE_CARD = "DELETE_CARD";

export const cardsLoadStart = () => ({ type: CARDS_LOADING });

export const cardsLoadSucceed = cards => ({
  type: CARDS_LOAD_SUCCEED,
  payload: cards
});

export const cardsLoadFailed = () => ({
  type: CARDS_LOAD_FAILED
});

export const oneCardsLoaded = card => ({
  type: ONE_CARD_LOADED,
  payload: card
});

export const removeCard = card => ({
  type: DELETE_CARD,
  payload: card
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

export const deleteCard = card => dispatch => {
  axios({
    method: 'delete',
    url: `${API_HOST}/cards/${card.id}`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  }).then(() => dispatch(removeCard(card)))
    .catch(error => {
      alert("Oops, something went wrong :(")
      console.log(error)
    });
};

export const moveCard = payload => ({
  type: CHANGE_COLUMN,
  payload
});

export const changeOrder = payload => ({
  type: CHANGE_ORDER,
  payload
});

export const changeColumn = payload => dispatch => {
  const { columnId, card, order } = payload
  //columnId, authorId, boardId, columnName, userNickName, order, card
  axios({
    method: 'patch',
    url: `${API_HOST}/cards/${card.id}`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    data: { columnId, order }
  }).then(() => {
    addMoveCardNote(payload);
    dispatch(moveCard({ columnId, card, order }));
  })
    .catch(() => alert("Oops, something went wrong :("));
};

export const addMember = (cardId, members, authorId, columnId, boardId, addedMember, authorNickname) => dispatch => {
  //console.log({cardId, members, authorId, columnId, boardId})
  axios({
    method: 'patch',
    url: `${API_HOST}/cards/${cardId}`,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    data: { members }
  }).then(({ data }) => {
    //console.log(data[1][0]);
    const cardName = data[1][0].name

    dispatch(getOneCard(cardId));
    //columnId, cardId, authorId, boardId, cardName, authorNickname, recipients
    //console.log(columnId, cardId, authorId, boardId, cardName, authorNickname, addedMember)
    if (addedMember) addMemberNote({ columnId, cardId, authorId, boardId, cardName, authorNickname, addedMember });
  })
    .catch(() => alert("Oops, something went wrong :("));
};

export const getOneCard = id => dispatch => {
  axios
    .get(`${API_HOST}/cards/${id}`)
    .then(({ data }) => dispatch(oneCardsLoaded(data)))
    .catch(() => alert("Oops, something went wrong :("));
};