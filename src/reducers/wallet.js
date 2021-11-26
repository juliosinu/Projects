import { ACTION_WALLET }

const INITIAL_STATE = {
  currence: [],
  expenses: [],
};

function walletReducer(state = INITIAL_STATE, action) {
  switch ( action.type) {
  default:
    return state;
  }
}

export default walletReducer;
