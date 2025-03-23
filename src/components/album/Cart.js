import { React, useContext, memo } from "react";

import { AlbumContext } from "../../albumstore";
import { UserContext } from "../../store";
import { MessageContext, handleMessage } from "../../messageStore";
const Cart = memo(({ myModal, setPhotoUrl }) => {
  const [albumState, albumDispatch] = useContext(AlbumContext);
  const [userState, userDispatch] = useContext(UserContext);
  const [, messageDispatch] = useContext(MessageContext);

  console.log("Cart albumState", albumState);
  console.log("Cart userState", userState);
  const getSinglePhoto = (item) => {
    (async () => {
      setPhotoUrl(item?.urls?.raw);

      myModal.current.show();
    })();
  };

  const handlerAlbumList = () => {
    const newAlbumList = [];

    // if (userState.albumList.length === 0) {
    // } else {
    // }
    albumState.albumList.forEach((item1) => {
      if (
        userState.albumList.findIndex((item2) => item1.id == item2.id) === -1
      ) {
        newAlbumList.push(item1);
      }
    });
    console.log("newAlbumList", newAlbumList);

    userDispatch({
      type: "ADD_ABLUM_LIST",
      payload: {
        ...userState,
        newAlbumList: [...newAlbumList],
      },
    });

    albumDispatch({
      type: "CLEAR_CART_ALBUM_LIST",
      payload: { ...albumState },
    });
    //navigate("/login");

    handleMessage(
      messageDispatch,
      "success",
      "新增至相片收藏",
      "新增成功",
      1000
    );
  };
  return (
    <>
      <div
        className={` ${
          albumState?.albumList?.length > 0 ? "bg-light p-3" : ""
        } `}
      >
        <table className="table align-middle">
          <tbody>
            {albumState?.albumList?.map((item) => {
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
                        handleMessage(
                          messageDispatch,
                          "danger",
                          "移除至購物車",
                          "移除成功",
                          1000
                        );
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
                        // getSinglePhoto(item.id);
                        getSinglePhoto(item);
                      }}
                    >
                      <img
                        className="table-image object-cover"
                        width="90"
                        height="90"
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
                    onClick={handlerAlbumList}
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
});

export default Cart;
