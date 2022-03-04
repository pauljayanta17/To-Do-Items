import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import EmailIcon from "../components/Icons/EmailIcon";
import { emailStore } from "../app/loginhandle";
import Spinner from "../components/Spinner";
import {resetPassword} from '../app/loginhandle'

function ForgotPassword() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.loginHandle.email);
  const loading = useSelector((state) => state.loginHandle.loading);
  const errorMsg = useSelector((state) => state.loginHandle.errorMsg);

  const onEmailChnaged = (event) => {
    dispatch(emailStore(event.target.value));
  };

  const handleForgotPassword = ()=>{
    dispatch(resetPassword(email))
  }
  return (
    <div className="d-flex justify-content-center">
      <div className="card text-white bg-dark bg-gradient mb-3 text-center pb-4 px-4 mt-3 mx-2">
        <h4 className="my-3">Reset Password</h4>
        <div className="row align-items-center">
          <div className="col-auto">
            <label
              htmlFor="EmailID"
              className="form-label"
              style={{ color: "white" }}
            >
              Enter Your Email Address
            </label>
          </div>
          <div className="col-12 input-group">
            <span className="input-group-text" id="basic-addon1">
              <EmailIcon />
            </span>
            <input
              type="email"
              className="form-control"
              id="validationCustom01"
              placeholder="Email Address"
              value={email}
              onChange={onEmailChnaged}
              required
            />
          </div>
        <div className="col-12 my-1">
        <button
              type="button"
              className="btn btn-primary my-2 col-12 my-1"
              onClick={handleForgotPassword}
            >
              {loading ? <Spinner/> :"Reset Password"}
            </button>
        </div>
       
        </div>
        <h6 className="text-danger text-center my-1" style={{height:"1rem"}}>{errorMsg}</h6>
      </div>
    </div>
  );
}

export default ForgotPassword;
