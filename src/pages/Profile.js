import {
  React,
  useState,
  useRef,
  useEffect,
  useContext,
  useLayoutEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "bootstrap";

import EditModal from "../components/EditModal";
import ProfileEdit from "./ProfileEdit";

import { UserContext, Roles } from "../store";

function Profile() {
  const navigate = useNavigate();
  const [state] = useContext(UserContext);
  const myModal = useRef(null);
  const profileModalRef = useRef(null);
  // const profileModal = useRef(null);
  console.log("Profile state", state);

  useEffect(() => {
    if (state.username === "") {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    console.log("initial myModal");
    myModal.current = new Modal(profileModalRef.current, {
      backdrop: "static",
    });
    //profileModal.current = new Modal("#EditModalId", { backdrop: "static" });
  }, []);

  // const openProfileModal = () => {
  //   console.log("openProfileModal");
  //   myModal.current.show();
  //   // profileModal.current.show();
  // };

  // const closeProfileModal = () => {
  //   console.log("closeProfileModal");
  //   myModal.current.hide();
  //   // profileModal.current.hide();
  // };

  const openProfileModal = useCallback(() => {
    console.log("openProfileModal");
    myModal.current.show();
    // profileModal.current.show();
  }, []);

  const closeProfileModal = useCallback(() => {
    console.log("closeProfileModal");
    myModal.current.hide();
    // profileModal.current.hide();
  }, []);

  return (
    <>
      <EditModal
        modalRef={profileModalRef}
        modalTitle={"修改個人資料"}
        closeModal={closeProfileModal}
        footer="false"
      >
        <ProfileEdit closeProfileModal={closeProfileModal} />
      </EditModal>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            使用者名稱
          </label>
          <input
            id="username"
            type="text"
            name="username"
            className={`form-control `}
            readOnly
            defaultValue={state.username}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            密碼
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className={`form-control `}
            readOnly
            defaultValue={state.password}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            UnSplash AccessKey
          </label>
          <input
            id="accessKey"
            type="text"
            name="accessKey"
            className={`form-control `}
            readOnly
            defaultValue={state.accessKey}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            角色
          </label>
          <select
            id="role"
            className={`form-select`}
            disabled="true"
            defaultValue={state.role}
            // value={state.role}
          >
            {Roles.map((role, id) => {
              return (
                <option value={role} key={id}>
                  {role}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-3">
          <div className="form-label">性別</div>

          <div className="form-check">
            <input
              className={`form-check-input`}
              type="radio"
              name="sexual"
              id="men"
              defaultValue="men"
              checked={state.sexual === "men"}
              disabled={true}
            />
            <label className="form-check-label" htmlFor="men">
              男
            </label>
          </div>

          <div className="form-check">
            <input
              className={`form-check-input`}
              type="radio"
              name="sexual"
              id="female"
              defaultValue="female"
              checked={state.sexual === "female"}
              disabled={true}
            />
            <label className="form-check-label" htmlFor="female">
              女
            </label>
          </div>

          <div className="form-check">
            <input
              className={`form-check-input`}
              type="radio"
              name="sexual"
              id="other"
              defaultValue="other"
              checked={state.sexual === "other"}
              disabled={true}
            />
            <label className="form-check-label" htmlFor="other">
              其他
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="brief">自我介紹</label>
          <textarea
            id="brief"
            rows="5"
            className={`form-control `}
            defaultValue={state.brief}
            readOnly
            name="brief"
          />
        </div>
      </form>
      <div className="row row-cols-2 g-0 ">
        <div className="col-6">
          <button
            type="submit"
            className="btn btn-info"
            onClick={openProfileModal}
          >
            更新
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
