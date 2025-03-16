import {
  React,
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { Modal } from "bootstrap";
import PicModal from "../components/PicModal";
import Card from "../components/album/Card";
import Loading from "../components/Loading";
import { UserContext } from "../store";

const AlbumCollect = () => {
  const [userState, userDispatch] = useContext(UserContext);
  const modalRef = useRef(null);
  const myModal = useRef(null);
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    // console.log("initial modalRef");
    myModal.current = new Modal(modalRef.current);
  }, []);

  const closeModal = useCallback(() => {
    // console.log("closeModal");
    myModal.current.hide();
  }, []);

  const handlerRemovePic = useCallback((picture) => {
    let newAlbumList = userState.albumList.filter(
      (item) => item.id !== picture.id
    );
    userDispatch({
      type: "REMOVE_PICTURE",
      payload: {
        newAlbumList: newAlbumList,
      },
    });
  }, []);

  const getSinglePhoto = useCallback((item) => {
    (async () => {
      setPhotoUrl(item?.urls?.raw);
      myModal.current.show();
    })();
  }, []);

  return (
    <div className="container">
      <div className="row ">
        <div className="col-md-12 ">
          <div className="row row-cols-3 g-3 ">
            {userState?.albumList?.map((item) => {
              console.log(item.id);
              return (
                <Card
                  item={item}
                  getSinglePhoto={getSinglePhoto}
                  btnText={"取消收藏"}
                  btnHandler={handlerRemovePic}
                />
              );
            })}
          </div>
          <PicModal
            modalRef={modalRef}
            closeModal={closeModal}
            photoUrl={photoUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default AlbumCollect;
