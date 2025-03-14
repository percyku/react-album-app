import {
  React,
  useEffect,
  useRef,
  useState,
  useReducer,
  useCallback,
} from "react";
import { Outlet, NavLink } from "react-router-dom";
import { Modal } from "bootstrap";
import PicModal from "../components/PicModal";
import { AlbumContext, albumReducer, albumInit, alumList } from "../albumstore";

import Cart from "../components/album/Cart";

const AlbumLayout = () => {
  const reducer = useReducer(albumReducer, albumInit);
  const modalRef = useRef(null);
  const myModal = useRef(null);
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    console.log("initial modalRef");
    myModal.current = new Modal(modalRef.current);
  }, []);

  const closeModal = useCallback(() => {
    // console.log("closeModal");
    myModal.current.hide();
  }, []);

  return (
    <div className="conatiner">
      <div className="d-flex">
        <PicModal
          modalRef={modalRef}
          closeModal={closeModal}
          photoUrl={photoUrl}
        />

        <AlbumContext.Provider value={reducer}>
          <aside className="side-left vh-100 sticky-top">
            <div className="vw-100 ">
              <br />
              <br />
              <br />
              <h3>左側欄</h3>
              <input type="text" id="filter" className="" />

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

          <main className="main vw-100">
            <div className="container">
              <Outlet />
            </div>
          </main>

          <aside className="side-right vh-100 px- sticky-top ">
            <br />
            <br />
            <br />
            <div className="vw-100">
              <h1>album cart</h1>
            </div>

            <div className="overflow-auto ">
              {/* <Cart  /> */}
              <Cart setPhotoUrl={setPhotoUrl} myModal={myModal}></Cart>
            </div>
          </aside>
        </AlbumContext.Provider>
      </div>
    </div>
  );
};

export default AlbumLayout;
