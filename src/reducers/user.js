const INITIAL_STATE = {
  email: '',
  password: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return ({
      ...state,
      email: action.payload,
    });
  default:
    return ({
      ...state,
    });
  }
}

export default userReducer;
