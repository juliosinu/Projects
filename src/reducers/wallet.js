const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  changeExpense: {},
  changeFormButton: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_CURRENCIES':
    return { ...state, currencies: action.currencies };
  case 'ADD_EXPENSES':
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case 'DELETE_EXPENSES':
    return { ...state, expenses: action.expenses };
  case 'CHANGE_EXPENSES':
    return { ...state, changeExpense: action.expenses };
  case 'CHANGE_FORM_BUTTON':
    return { ...state, changeFormButton: action.changeButton };
  default:
    return state;
  }
};

export default userReducer;
