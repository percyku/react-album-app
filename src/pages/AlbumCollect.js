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
import { MessageContext, handleMessage } from "../messageStore";

const AlbumCollect = () => {
  const [userState, userDispatch] = useContext(UserContext);
  const [, messageDispatch] = useContext(MessageContext);
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

    handleMessage(
      messageDispatch,
      "danger",
      "移除至相片收藏",
      "移除成功",
      1000
    );
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
