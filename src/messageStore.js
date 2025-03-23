import { createContext } from "react";

export const initMessageState = {
  type: "",
  title: "",
  text: "",
};

export const messgaeReducer = (state, action) => {
  switch (action.type) {
    case "POST_MESSAGE":
      return {
        ...action.payload,
      };
    case "CLEAR_MESSAGE":
      return {
        ...initMessageState,
      };
    default:
      return state;
  }
};

export function handleMessage(dispatch, type, title, context, time) {
  dispatch({
    type: "POST_MESSAGE",
    payload: {
      type: type,
      title: title,
      text: context,
    },
  });
  setTimeout(() => {
    dispatch({
      type: "CLEAR_MESSAGE",
    });
  }, time);
}

export const MessageContext = createContext({});
