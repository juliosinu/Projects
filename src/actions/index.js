export const loginUser = (email) => ({ type: 'LOGIN_USER', email });

export const addCurrencies = (currencies) => ({ type: 'ADD_CURRENCIES', currencies });

export const addExpenses = (expenses) => ({ type: 'ADD_EXPENSES', expenses });

export const deleteExpenses = (expenses) => ({ type: 'DELETE_EXPENSES', expenses });

export const changeExpenses = (expenses) => ({ type: 'CHANGE_EXPENSES', expenses });

export const changeFormButton = (changeButton) => ({ type: 'CHANGE_FORM_BUTTON',
  changeButton });
