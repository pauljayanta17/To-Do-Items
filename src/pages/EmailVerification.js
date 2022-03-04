import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authenticateEmail } from "../app/loginhandle";
import { authApp } from "../utils/Firebase-Config";

function EmailVerification() {
  const dispatch = useDispatch();
  const errorMsg = useSelector((state) => state.loginHandle.errorMsg);
  const loading = useSelector((state) => state.loginHandle.emailLoading);

  const sendVerificationLink = () => {
    dispatch(authenticateEmail());
  };

  return (
    <div className="container d-flex justify-content-center">
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#emailVerifyModal"
      >
        Verify Your Email Address
      </button>

      <div
        className="modal fade"
        id="emailVerifyModal"
        tabIndex="-1"
        aria-labelledby="emailVerifyModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark" id="emailVerifyModalLabel">
                {authApp.currentUser ? authApp.currentUser.email : ""}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              Verify your email address by send a link to your email. Click on
              Send button and check your email and open the link and it will
              automatically verify the email address
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={sendVerificationLink}
              >
                {loading ? "Wait" : "Send"}
              </button>
            </div>
            <div className="conatiner text-center fs-5 text-dark" >{errorMsg}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
