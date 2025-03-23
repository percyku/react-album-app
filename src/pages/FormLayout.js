import { React, useReducer } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Message from "../components/Message";

import {
  UserContext,
  userReducer,
  userInit,
  getCurrentUser,
  setCurrentUser,
} from "../store";

import {
  MessageContext,
  messgaeReducer,
  initMessageState,
} from "../messageStore";

function FormLayout() {
  console.log("FormLayout", getCurrentUser());
  if (getCurrentUser() == null) {
    console.log("FormLayout", userInit);
    setCurrentUser(userInit);
  }

  const reducer = useReducer(userReducer, getCurrentUser());
  const messageReducer = useReducer(messgaeReducer, initMessageState);
  return (
    <>
      <MessageContext.Provider value={messageReducer}>
        <UserContext.Provider value={reducer}>
          <Message />
          <Navbar />
          <Outlet />
        </UserContext.Provider>
      </MessageContext.Provider>
    </>
  );
}

export default FormLayout;
