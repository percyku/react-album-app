import {
  React,
  useEffect,
  useRef,
  useState,
  useContext,
  useReducer,
} from "react";
import { Outlet } from "react-router-dom";
import { AlbumContext, albumReducer, albumInit } from "../albumstore";

const AlbumLayout = () => {
  const reducer = useReducer(albumReducer, albumInit);

  return (
    <>
      <AlbumContext.Provider value={reducer}>
        <Outlet />
      </AlbumContext.Provider>
    </>
  );
};

export default AlbumLayout;
