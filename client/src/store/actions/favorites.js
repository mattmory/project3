import * as actionTypes from "./actionTypes";

export const getAllFavorites = (payload) => {
  return {
    type: actionTypes.GET_ALL_FAVORITES,
    payload
  };
};

export const addFavorite = (payload) => {
  return {
    type: actionTypes.ADD_FAVORITE,
    payload
  };
};

export const removeFavorite = (payload) => {
  return {
    type: actionTypes.REMOVE_FAVORITE,
    payload
  };
};