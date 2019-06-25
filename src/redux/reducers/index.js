import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { boardsReducer } from "./boards";
import { usersReduser } from "./users";
import { columnsReducer } from "./columns";
import { cardsReducer } from "./cards";
import { commentsReducer } from "./comments";
import { notificationsReducer } from "./notifications";


const rootReduser = combineReducers({
  auth: authReducer,
  boards: boardsReducer,
  users: usersReduser,
  columns: columnsReducer,
  cards: cardsReducer,
  comments: commentsReducer,
  notifications: notificationsReducer
});

export default rootReduser;