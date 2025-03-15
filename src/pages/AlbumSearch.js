import {
  React,
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Modal } from "bootstrap";
import PicModal from "../components/PicModal";
import Card from "../components/album/Card";
import Loading from "../components/Loading";

import { UserContext } from "../store";

const AlbumSearch = () => {
  const [searchParams] = useSearchParams();
  const [userState] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const api = "https://api.unsplash.com/search/photos/";
  const accessKey = userState.accessKey;
  const [jsonData, setJsonData] = useState([]);
  const [remaining, setRemaining] = useState(0);
  const currentPage = useRef(1);
  const listRef = useRef(null);

  const modalRef = useRef(null);
  const myModal = useRef(null);
  const [photoUrl, setPhotoUrl] = useState("");
  console.log("AlbumSearch params", searchParams.get("s"));

  useEffect(() => {
    // console.log("initial modalRef");
    myModal.current = new Modal(modalRef.current);
  }, []);

  const closeModal = useCallback(() => {
    // console.log("closeModal");
    myModal.current.hide();
  }, []);
  const getSinglePhoto = (item) => {
    (async () => {
      // const api = "https://api.unsplash.com/photos/";
      // const result = await axios(
      //   `${api}${id}?client_id=${userState.accessKey}`
      // );
      // setPhotoUrl(result.data.urls.regular);
      setPhotoUrl(item?.urls?.raw);
      myModal.current.show();
    })();
  };

  const getPhotos = async (page = 1, isNew = true) => {
    try {
      setIsLoading(true);
      const result = await axios.get(
        `${api}?client_id=${accessKey}&query=${searchParams.get(
          "s"
        )}&page=${page}`
      );
      console.log(result);
      setJsonData((preData) => {
        console.log("更新資料觸發");
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
  };

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
  }, [searchParams.get("s")]);

  return (
    <>
      <Loading isLoading={isLoading} />
      <p>剩餘請求次數：{remaining}</p>

      <div className="row ">
        <div className="col-md-12 ">
          <div className="row row-cols-3 g-3 " ref={listRef}>
            {jsonData?.map((item) => {
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
      </div>
    </>
  );
};

export default AlbumSearch;
