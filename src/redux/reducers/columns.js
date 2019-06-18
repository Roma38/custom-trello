import {
  COLUMN_LOADING,
  COLUMN_LOAD_SUCCEED,
  COLUMN_LOAD_FAILED
} from "../actions/columns";

const initialState = {
  requestState: null,
  items: []
};

export const columnsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case COLUMN_LOADING:
      return { ...initialState, requestState: "loading" };
    case COLUMN_LOAD_SUCCEED:
      console.log(payload)
      return {
        requestState: "succeed",
        items: payload,        
      };
    case COLUMN_LOAD_FAILED:
      return {
        ...initialState,
        requestState: "error"
      };

    default:
      return state;
  }
};