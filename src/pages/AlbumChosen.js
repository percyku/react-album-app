import axios from "axios";
import {
  React,
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { Modal } from "bootstrap";

import { UserContext } from "../store";
import { AlbumContext } from "../albumstore";
import Card from "../components/album/Card";
import albumsData from "../assets/albumsData";

const AlbumChosen = () => {
  const [state] = useContext(UserContext);
  const modalRef = useRef(null);
  const myModal = useRef(null);
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    console.log("initial modalRef");
    myModal.current = new Modal(modalRef.current);
  }, []);

  const closeModal = useCallback(() => {
    console.log("closeModal");
    myModal.current.hide();
  }, []);

  const getSinglePhoto = (id) => {
    (async () => {
      const api = "https://api.unsplash.com/photos/";
      const result = await axios(`${api}${id}?client_id=${state.accessKey}`);
      setPhotoUrl(result.data.urls.regular);
      console.log(result, photoUrl);
      // 打開 Modal
      myModal.current.show();
    })();
  };

  return (
    <div className="row">
      <div className="col-md-9 ">
        <div className="row row-cols-3 g-3 ">
          {albumsData.map((item) => {
            return (
              <div className="col" key={item.id}>
                <Card item={item} getSinglePhoto={getSinglePhoto} />
              </div>
            );
          })}
        </div>
        <div className="modal fade" tabIndex="-1" ref={modalRef}>
          <div className="modal-dialog">
            <div className="modal-content">
              <img src={photoUrl} alt="" width="100%" />
              <span className="badge rounded-pill  position-absolute top-0 start-100 translate-middle">
                <button
                  type="button"
                  className="btn btn-md"
                  onClick={closeModal}
                >
                  x
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-3">
        <h1>album cart</h1>
      </div>
    </div>
  );
};

export default AlbumChosen;
