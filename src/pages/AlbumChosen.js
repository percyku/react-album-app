import {
  React,
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import PicModal from "../components/PicModal";
import Card from "../components/album/Card";
import Cart from "../components/album/Cart";
import { UserContext } from "../store";
import albumsData from "../assets/albumsData";

const AlbumChosen = () => {
  const [userState] = useContext(UserContext);

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
      const result = await axios(
        `${api}${id}?client_id=${userState.accessKey}`
      );
      setPhotoUrl(result.data.urls.regular);
      console.log(result, photoUrl);
      // 打開 Modal
      myModal.current.show();
    })();
  };

  return (
    <>
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
          <PicModal
            modalRef={modalRef}
            closeModal={closeModal}
            photoUrl={photoUrl}
          />
        </div>
        <div className="col-md-3">
          <h1>album cart</h1>
          <Cart />
        </div>
      </div>
    </>
  );
};

export default AlbumChosen;
