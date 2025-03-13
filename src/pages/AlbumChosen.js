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
import PicModal from "../components/PicModal";
import Card from "../components/album/Card";
import Loading from "../components/Loading";
import { UserContext } from "../store";
import {
  humanData,
  buildingData,
  animalData,
  oceanData,
  natureData,
  mountainData,
} from "../assets/albumsData";

const AlbumChosen = () => {
  const [userState] = useContext(UserContext);

  const { id } = useParams();
  const modalRef = useRef(null);
  const myModal = useRef(null);
  const [photoUrl, setPhotoUrl] = useState("");
  const [jsonData, setJsonData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    setTimeout(() => {
      if (id === "human") {
        setJsonData([...humanData]);
      } else if (id === "animal") {
        setJsonData([...animalData]);
      } else if (id === "building") {
        setJsonData([...buildingData]);
      } else if (id === "nature") {
        setJsonData([...natureData]);
      } else if (id === "ocean") {
        setJsonData([...oceanData]);
      } else if (id === "mountain") {
        setJsonData([...mountainData]);
      }
      setIsLoading(false);
    }, 1500);

    // console.log(window.scrollTo);
  }, [id]);

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
    <div>
      <Loading isLoading={isLoading} />
      <div className="row ">
        {/* <div className="col-md-9 "> */}
        <div className="col-md-12 ">
          <div className="row row-cols-3 g-3 ">
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
        {/* <div className="col-md-3">
          <h1>album cart</h1>
          <Cart />
        </div> */}
      </div>
    </div>
  );
};

export default AlbumChosen;
