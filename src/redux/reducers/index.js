import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { boardsReducer } from "./boards";
import { usersReduser } from "./users";
import { columnsReducer } from "./columns";
import { cardsReducer } from "./cards";
import { commentsReducer } from "./comments";


const rootReduser = combineReducers({
  auth: authReducer,
  boards: boardsReducer,
  users: usersReduser,
  columns: columnsReducer,
  cards: cardsReducer,
  comments: commentsReducer
});

export default rootReduser;