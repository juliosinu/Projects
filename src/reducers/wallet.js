import { ADD_EXPENSES, DELETE_EXPENSE } from '../actions';
import { GET_API } from '../actions/api';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_API:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .filter((expense) => (expense.id !== action.payload)),
    };
  default:
    return state;
  }
}

export default walletReducer;
