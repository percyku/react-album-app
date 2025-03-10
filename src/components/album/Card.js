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
          getSinglePhoto(item.id);
        }}
      >
        {/* <span className="badge rounded-pill  position-absolute top-0 start-100 translate-middle">
          <input
            className={`form-check-input`}
            type="checkbox"
            name="checkbox"
            id={item.id}
            onClick={(e) => {
              e.preventDefault();
              console.log("test");
            }}
          />
        </span> */}
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
          // dispatch({
          //   type: "ADD_TO_CART",
          //   payload: {
          //     ...product,
          //     quantity: 1,
          //   },
          // });
          handleAddToAlbumCart(item);
        }}
      >
        加入收藏
      </button>
    </div>
  );
};

export default Card;
