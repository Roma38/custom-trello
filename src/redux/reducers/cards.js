import {
  CARDS_LOADING,
  CARDS_LOAD_SUCCEED,
  CARDS_LOAD_FAILED,
  CHANGE_COLUMN,
  ONE_CARD_LOADED,
  CHANGE_ORDER,
  DELETE_CARD
} from "../actions/cards";

const initialState = {
  requestState: null,
  items: []
};

export const cardsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CARDS_LOADING:
      return { ...initialState, requestState: "loading" };
    case CARDS_LOAD_SUCCEED:
      return {
        requestState: "succeed",
        items: payload,
      };
    case CARDS_LOAD_FAILED:
      return {
        ...initialState,
        requestState: "error"
      };
    case CHANGE_COLUMN:
      const newItems = [...state.items];
      const columnId = payload.card.columnId;
      const cardOrder = payload.card.order;
      newItems.forEach(card => {
        if (card.columnId === columnId && card.order > cardOrder) {
          --card.order;
        };
        if (card.id === payload.card.id) {
          card.columnId = payload.columnId;
          card.order = payload.order;
        }
      })
      return {
        ...state,
        items: newItems
      };
    case CHANGE_ORDER:
      const { droppedCard, targetCard } = payload;
      const droppedCardOrder = droppedCard.order;
      const targetCardOrder = targetCard.order
      const cards = [...state.items];
      cards.forEach(card => {
        if (card.columnId === droppedCard.columnId) {
          if (droppedCardOrder < targetCardOrder) {
            if (card.order > droppedCardOrder && card.order <= targetCardOrder)--card.order;
          } else {
            if (card.order < droppedCardOrder && card.order >= targetCardOrder)++card.order;
          }
          if (card.id === droppedCard.id) card.order = targetCardOrder;
        }
      });
      return {
        ...state,
        items: cards
      };
    case DELETE_CARD:
      console.log(payload);
      const newCards = [...state.items];
      newCards.forEach(card => {
        if (card.columnId === payload.columnId) {
          if (card.order > payload.order)--card.order;
        }
      });
      newCards.splice(newCards.indexOf(payload), 1);
      return {
        ...state,
        items: newCards
      };
    case ONE_CARD_LOADED:
      const cardIndex = state.items.indexOf(state.items.find(card => card.id === payload.id))
      const items = [...state.items];
      items[cardIndex] = payload;
      return {
        ...state,
        items
      };

    default:
      return state;
  }
};