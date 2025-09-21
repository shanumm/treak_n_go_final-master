export const initialState = {
  basket: [],
  isPaymentModalOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_PAYMENT_MODAL_OPEN":
      return {
        ...state,
        isPaymentModalOpen: action.isPaymentModalOpen,
      };
    default:
      return state;
  }
};

export default reducer;
