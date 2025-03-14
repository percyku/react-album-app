import { React, useContext } from "react";
import axios from "axios";

import { AlbumContext } from "../../albumstore";
import { UserContext } from "../../store";
const Cart = ({ myModal, setPhotoUrl }) => {
  const [albumState, albumDispatch] = useContext(AlbumContext);
  const [userState] = useContext(UserContext);
  console.log("Cart", albumState);

  const getSinglePhoto = (id) => {
    (async () => {
      const api = "https://api.unsplash.com/photos/";
      const result = await axios(
        `${api}${id}?client_id=${userState.accessKey}`
      );
      setPhotoUrl(result.data.urls.regular);

      myModal.current.show();
    })();
  };
  return (
    <>
      <div
        className={` ${albumState.albumList.length > 0 ? "bg-light p-3" : ""} `}
      >
        <table className="table align-middle">
          <tbody>
            {albumState.albumList?.map((item) => {
              return (
                <tr key={item?.id}>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => {
                        albumDispatch({
                          type: "REMOVE_ALBUM_CART_ITEM",
                          payload: {
                            ...item,
                          },
                        });
                      }}
                    >
                      x
                    </button>
                  </td>
                  <td>
                    <a
                      className="card"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        getSinglePhoto(item.id);
                      }}
                    >
                      <img
                        className="table-image object-cover"
                        width="80"
                        height="80"
                        src={`${item?.urls?.small_s3}`}
                        alt=""
                      />
                    </a>
                  </td>
                  <td className="text-end ">
                    <span
                      className="d-inline-block text-truncate"
                      style={{ maxWidth: "80px" }}
                    >
                      {item?.description}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          {albumState.albumList?.length > 0 && (
            <tfoot>
              <tr>
                <td colSpan={3} className="text-end">
                  <button
                    type="button"
                    href="#"
                    className="btn btn-outline-dark w-100 "
                  >
                    確定收藏
                  </button>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </>
  );
};

export default Cart;
