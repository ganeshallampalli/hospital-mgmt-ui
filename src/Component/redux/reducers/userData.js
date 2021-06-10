import { SET_USER_DATA } from "../actionTypes";

const initialState = {};
export const userData = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      console.log("Here", action.user);
      return Object.assign({}, state, {
        user: action.user,
      });
    default:
      return state;
  }
};
