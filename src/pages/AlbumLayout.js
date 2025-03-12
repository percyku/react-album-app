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

import Cart from "../components/album/Cart";

const AlbumLayout = () => {
  const reducer = useReducer(albumReducer, albumInit);

  return (
    <div className="d-flex">
      <AlbumContext.Provider value={reducer}>
        <aside className="side-left vh-100 border-end">
          <div className="vw-100">左側欄</div>
        </aside>
        <main className="main  vh-100 overflow-auto">
          <Outlet />
        </main>

        <aside className="side-right vh-100 d-flex flex-column px-5">
          <div className="vw-100">
            <h1>album cart</h1>
          </div>

          <div className="overflow-auto">
            <Cart />
          </div>
        </aside>
      </AlbumContext.Provider>
    </div>
  );
};

export default AlbumLayout;
