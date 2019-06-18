import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { boardsReducer } from "./boards";
import { usersReduser } from "./users";
import { columnsReducer } from "./columns";


const rootReduser = combineReducers({
  auth: authReducer,
  boards: boardsReducer,
  users: usersReduser,
  columns: columnsReducer
});

export default rootReduser;