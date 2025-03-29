import {
  React,
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux";
import { createAsyncMessage } from "../slice/messageSlice";
import PicModal from "../components/PicModal";
import Card from "../components/album/Card";
import Loading from "../components/Loading";
import { UserContext } from "../store/userStore";
import { AlbumContext } from "../store/albumStore";
// import { MessageContext, handleMessage } from "../store/messageStore";
// import {
//   humanData,
//   buildingData,
//   animalData,
//   oceanData,
//   natureData,
//   mountainData,
// } from "../assets/albumsData";

const AlbumChosen = () => {
  const { id } = useParams();
  const [userState] = useContext(UserContext);
  const [, albumDispatch] = useContext(AlbumContext);
  // const [, messageDispatch] = useContext(MessageContext);
  const dispatch = useDispatch();

  const modalRef = useRef(null);
  const myModal = useRef(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const api = "https://api.unsplash.com/search/photos/";
  const accessKey = userState.accessKey;
  const [jsonData, setJsonData] = useState([]);
  const [remaining, setRemaining] = useState(0);
  const currentPage = useRef(1);
  const listRef = useRef(null);

  // useEffect(() => {
  //   setIsLoading(true);
  //   window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  //   setTimeout(() => {
  //     if (id === "human") {
  //       setJsonData([...humanData]);
  //     } else if (id === "animal") {
  //       setJsonData([...animalData]);
  //     } else if (id === "building") {
  //       setJsonData([...buildingData]);
  //     } else if (id === "nature") {
  //       setJsonData([...natureData]);
  //     } else if (id === "ocean") {
  //       setJsonData([...oceanData]);
  //     } else if (id === "mountain") {
  //       setJsonData([...mountainData]);
  //     }
  //     setIsLoading(false);
  //   }, 1500);
  // }, [id]);
  useEffect(() => {
    getPhotos(1, true);

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const scrollEvent = (evt) => {
      const height =
        listRef.current.offsetHeight +
        listRef.current.offsetTop -
        window.innerHeight;
      // console.log("scrollEvent height", height);
      // console.log("scrollEvent window.scrollY", window.scrollY);
      if (!isLoading && window.scrollY > height - 10) {
        currentPage.current++;
        getPhotos(currentPage.current, false);
      }
    };
    window.addEventListener("scroll", scrollEvent);
    return () => window.removeEventListener("scroll", scrollEvent);
  }, [id]);

  useEffect(() => {
    // console.log("initial modalRef");
    myModal.current = new Modal(modalRef.current);
  }, []);

  const closeModal = useCallback(() => {
    // console.log("closeModal");
    myModal.current.hide();
  }, []);

  const getSinglePhoto = useCallback((item) => {
    (async () => {
      // const api = "https://api.unsplash.com/photos/";
      // const result = await axios(
      //   `${api}${id}?client_id=${userState.accessKey}`
      // );
      // setPhotoUrl(result.data.urls.regular);
      setPhotoUrl(item?.urls?.raw);

      myModal.current.show();
    })();
  }, []);

  const getPhotos = useCallback(
    async (page = 1, isNew = true) => {
      try {
        setIsLoading(true);
        const result = await axios.get(
          `${api}?client_id=${accessKey}&query=${id}&page=${page}`
        );
        console.log(result);
        setJsonData((preData) => {
          // console.log("getNew Data");
          if (isNew) {
            return [...result.data.results];
          }
          return [...preData, ...result.data.results];
        });
        currentPage.current = page;
        setRemaining(result.headers["x-ratelimit-remaining"]);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.log(error);
      }
    },
    [id]
  );

  const handleAddToAlbumCart = useCallback((picture) => {
    // console.log("handleAddToAlbumCart", picture);
    albumDispatch({
      type: "ADD_ALBUM_TO_CART",
      payload: {
        ...picture,
      },
    });
    // handleMessage(
    //   messageDispatch,
    //   "success",
    //   "新增至相片Cart",
    //   "新增成功",
    //   1000
    // );
    dispatch(
      createAsyncMessage({
        id: new Date(),
        success: true,
        type: "success",
        title: "新增至相片Cart",
        message: "新增成功",
        time: 1000,
      })
    );
  }, []);

  return (
    <div>
      <Loading isLoading={isLoading} />
      <p>剩餘請求次數：{remaining}</p>
      <div className="row ">
        {/* <div className="col-md-9 "> */}
        <div className="col-md-12 ">
          <div className="row row-cols-3 g-3 " ref={listRef}>
            {jsonData?.map((item) => {
              return (
                <Card
                  item={item}
                  getSinglePhoto={getSinglePhoto}
                  btnText={"加入收藏"}
                  btnHandler={handleAddToAlbumCart}
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

export default AlbumChosen;
