import * as actionTypes from "../actions/actionTypes";

const initialState = {
  faves: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case actionTypes.GET_ALL_FAVORITES:
    return {
      ...state,
      faves: action.payload
    };
  case actionTypes.ADD_FAVORITE:
    console.log(action.payload);
    return {
      ...state,
      faves: state.faves.concat({drink_id: action.payload.drinkId})
    };
  case actionTypes.REMOVE_FAVORITE:
    console.log(action.payload);
    const updatedArray = state.faves.filter(result => {
      return (result.drink_id !== action.payload.drinkId);
    });
    return {
      ...state,
      faves: updatedArray
    };
  default:
    break;
  }
  return state;
};

export default reducer;