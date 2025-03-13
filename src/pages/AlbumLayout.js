import {
  React,
  useEffect,
  useRef,
  useState,
  useContext,
  useReducer,
} from "react";
import { Outlet, NavLink } from "react-router-dom";
import { AlbumContext, albumReducer, albumInit, alumList } from "../albumstore";

import Cart from "../components/album/Cart";

const AlbumLayout = () => {
  const reducer = useReducer(albumReducer, albumInit);

  return (
    <div className="d-flex">
      <AlbumContext.Provider value={reducer}>
        <aside className="side-left vh-100 border-end">
          <div className="vw-100">
            <h3>左側欄</h3>
            <ul>
              <li>
                <NavLink className="nav-link" to="">
                  搜尋圖片
                </NavLink>
              </li>
              {alumList.map((item) => {
                return (
                  <li key={item}>
                    <NavLink to={`/album/search/${item}`}>{item}</NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>
        <main className="main ">
          {/* <main className="main  vh-100 vw-100 overflow-scroll "> */}
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
