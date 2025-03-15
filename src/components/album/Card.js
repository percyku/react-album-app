import { React, useContext } from "react";
import { AlbumContext } from "../../albumstore";
const Card = ({ item, getSinglePhoto }) => {
  const [albumState, albumDispatch] = useContext(AlbumContext);
  const handleAddToAlbumCart = (picture) => {
    console.log("handleAddToAlbumCart", picture);
    albumDispatch({
      type: "ADD_ALBUM_TO_CART",
      payload: {
        ...picture,
      },
    });
  };

  return (
    <div className="col" key={item.id}>
      <a
        className="card"
        href="#"
        onClick={(e) => {
          e.preventDefault();
          getSinglePhoto(item);
        }}
      >
        <img
          className="card-img object-cover"
          width="100%"
          height="400"
          src={`${item.urls.small}`}
          alt=""
        />
      </a>
      <button
        type="button"
        href="#"
        className="btn btn-outline-dark w-100"
        onClick={() => {
          handleAddToAlbumCart(item);
        }}
      >
        加入收藏
      </button>
    </div>
  );
};

export default Card;
