// import { useContext } from "react";
// import { MessageContext } from "../store/messageStore";
import { useSelector } from "react-redux";

function MessageToast() {
  const messages = useSelector((state) => state.message);
  // const [message] = useContext(MessageContext);

  return (
    <>
      <div
        className="toast-container position-fixed"
        style={{
          top: "5%",
          right: "10%",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
        }}
      >
        {messages?.map((msg) => {
          return (
            <div
              key={msg.id}
              className="toast show"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className={`toast-header text-white bg-${msg.type}`}>
                <strong className="me-auto">{msg.title}</strong>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                />
              </div>
              <div className="toast-body">{msg.text}</div>
            </div>
          );
        })}
        {/* {message.title && (
          <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className={`toast-header text-white bg-${message.type}`}>
              <strong className="me-auto">{message.title}</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              />
            </div>
            <div className="toast-body">{message.text}</div>
          </div>
        )} */}
        {/* <div
          className="toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className={`toast-header text-white bg-success`}>
            <strong className="me-auto">title</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            />
          </div>
          <div className="toast-body">context</div>
        </div> */}
      </div>
    </>
  );
}

export default MessageToast;
