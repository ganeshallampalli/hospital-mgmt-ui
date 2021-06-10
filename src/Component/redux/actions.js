import {
  SET_USER_DATA,
} from "./actionTypes";
export const setUser = (content) => {
  return {
    type: SET_USER_DATA,
    user: content.user,
  };
};
