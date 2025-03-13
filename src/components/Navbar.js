import { React, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getCurrentUser, userRegister, UserContext } from "../store";

const Navbar = () => {
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate();
  const handlerLogout = () => {
    console.log("logout");
    dispatch({
      type: "LOGOUT",
      payload: {
        update_id: userRegister.findIndex(
          (item) => item.username === getCurrentUser.username
        ),
      },
    });
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary mb-5">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Navbar
          </NavLink>

          {state.username !== "" && (
            <div className="collapse navbar-collapse ">
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/album/search">
                    相片查詢
                  </NavLink>
                </li>
              </ul>

              <ul className="navbar-nav ">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/collect">
                    相片收藏
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav ">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    個人資料
                  </NavLink>
                </li>
              </ul>
            </div>
          )}

          <div className="collapse navbar-collapse justify-content-end">
            {state.username === "" && (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/login">
                    登入
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    註冊
                  </NavLink>
                </li>
              </ul>
            )}
            {state.username !== "" && (
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    onClick={handlerLogout}
                  >
                    登出
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
