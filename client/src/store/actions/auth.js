import * as actionTypes from "./actionTypes";

export const onSuccessfullLogin = (payload) => {
  return {
    type: actionTypes.SUCCESSFULL_LOGIN,
    payload
  };
};