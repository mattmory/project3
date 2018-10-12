import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isAuth: false,
  userId: null,
  email: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUCCESSFULL_LOGIN:
      return {
        ...state,
        isAuth: true,
        userId: action.payload.id,
        email: action.payload.email
      }
      break;
    default:
      break;
  }
  return state;
};

export default reducer;