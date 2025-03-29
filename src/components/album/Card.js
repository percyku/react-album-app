import { React } from "react";
const Card = ({ item, getSinglePhoto, btnText, btnHandler }) => {
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
          btnHandler(item);
        }}
      >
        {btnText}
      </button>
    </div>
  );
};

export default Card;
