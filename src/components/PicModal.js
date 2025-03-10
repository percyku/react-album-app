import { React, memo } from "react";

const PicModal = memo(({ modalRef, closeModal, photoUrl }) => {
  return (
    <div className="modal fade" tabIndex="-1" ref={modalRef}>
      <div className="modal-dialog">
        <div className="modal-content">
          <img src={photoUrl} alt="" width="100%" />
          <span className="badge rounded-pill  position-absolute top-0 start-100 translate-middle">
            <button type="button" className="btn btn-md" onClick={closeModal}>
              x
            </button>
          </span>
        </div>
      </div>
    </div>
  );
});

export default PicModal;
