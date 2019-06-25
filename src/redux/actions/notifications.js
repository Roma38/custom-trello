import axios from "axios";
import { API_HOST } from "../../config"
export const NOTIFICATIONS_LOADING = "NOTIFICATIONS_LOADING";
export const NOTIFICATIONS_LOAD_SUCCEED = "NOTIFICATIONS_LOAD_SUCCEED";
export const NOTIFICATIONS_LOAD_FAILED = "NOTIFICATIONS_LOAD_FAILED";

export const notificationsLoadStart = () => ({ type: NOTIFICATIONS_LOADING });

export const notificationsLoadSucceed = notifications => ({
  type: NOTIFICATIONS_LOAD_SUCCEED,
  payload: notifications
});

export const notificationsLoadFailed = () => ({
  type: NOTIFICATIONS_LOAD_FAILED
});

export const getNotifications = () => dispatch => {
  dispatch(notificationsLoadStart());
  axios
    .get(`${API_HOST}/notifications`)
    .then(({ data }) => dispatch(notificationsLoadSucceed(data)))
    .catch(() => dispatch(notificationsLoadFailed()));
};

export const addMoveCardNote = payload => {
  const { columnId, cardId, authorId, cardAuthor, boardId, cardName, columnName, userNickName } = payload;
  const name = `${cardName} was moved to ${columnName}`;
  const text = `${cardAuthor === authorId ? "You" : userNickName} moved card ${cardName} to the ${columnName} column`;
  const data = { name, text, authorId, recipients: [cardAuthor], cardId, columnId, boardId, type: "move" }
  axios({
    method: 'post',
    url: `${API_HOST}/notifications`,
    data
  }).then((response) => {
    //console.log(response)
  })
    .catch(() => alert("Oops, something went wrong :("));
};
