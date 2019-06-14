import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { boardsReducer } from "./boards";


const rootReduser = combineReducers({
 auth: authReducer,
 boards: boardsReducer
});

export default rootReduser;