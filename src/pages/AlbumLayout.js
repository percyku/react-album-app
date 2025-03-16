import {
  React,
  useEffect,
  useRef,
  useState,
  useReducer,
  useCallback,
} from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";
import PicModal from "../components/PicModal";
import { AlbumContext, albumReducer, albumInit, alumList } from "../albumstore";

import Cart from "../components/album/Cart";

const AlbumLayout = () => {
  const reducer = useReducer(albumReducer, albumInit);
  const navigate = useNavigate();

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

  const onSearchEnter = (e) => {
    console.log(e);
    if (e.key === "Enter") {
      // setFilterString(e.target.value);
      console.log(e.target.value);
      navigate(`/album/search?s=${e.target.value}`);
    }
  };

  return (
    // <div className="conatiner">
    <AlbumContext.Provider value={reducer}>
      <div className="d-flex">
        <PicModal
          modalRef={modalRef}
          closeModal={closeModal}
          photoUrl={photoUrl}
        />

        <aside className="side-left vh-100 sticky-top">
          <div className="vw-100 ">
            <br />
            <br />
            <br />
            <h3>左側欄</h3>
            {/* <input
              type="text"
              id="filter"
              onKeyUp={onSearchEnter}
              style={{ width: "150px" }}
            /> */}

            <div class="input-group  input-group-sm mb-3">
              <span class="input-group-text" id="basic-filter">
                搜尋
              </span>
              <input
                type="text"
                id="filter"
                onKeyUp={onSearchEnter}
                style={{ width: "100px" }}
              />
            </div>
            <ul>
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

        <div>
          <br />
          <br />
          <h1 className="sticky-top text-start" style={{ top: "100px" }}>
            album cart
          </h1>

          <aside className="side-right sticky-top overflow-auto">
            <div className=" ">
              {/* <Cart  /> */}
              <Cart setPhotoUrl={setPhotoUrl} myModal={myModal}></Cart>
            </div>
          </aside>
        </div>
      </div>
    </AlbumContext.Provider>
    // </div>
  );
};

export default AlbumLayout;
