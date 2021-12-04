export const LOGIN_USER = 'LOGIN_USER';

export const loginUser = (email) => ({ type: LOGIN_USER, email });

export const ADD_EXPENSES = 'ADD_EXPENSES';

export const addExpenses = (payload) => ({ type: ADD_EXPENSES, payload });
