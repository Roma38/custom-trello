import { ADD_BOARD } from "../actions/boards";

const initialState = {
  items: []
};

export const boardsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_BOARD:
      const { name, userId } = payload;
      return { ...state, items: [...state.items, { id: "хз", name, userId, members: [] }] };
    default:
      return state;
  }
};
