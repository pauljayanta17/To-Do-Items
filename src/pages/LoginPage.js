import React from "react";
import { Link, Navigate } from "react-router-dom";
import PasswordKeyIcon from "../components/Icons/PasswordKeyIcon";
import GoogleSigninSVGIcons from "../components/Icons/GoogleSigninSVGIcons";
import EmailIcon from "../components/Icons/EmailIcon";
import Spinner from "../components/Spinner";
import { useDispatch } from "react-redux";
import ShowPassword from "../components/visibility_icon/ShowPassword";
import HidePassword from "../components/visibility_icon/HidePassword";

import {
  emailStore,
  passwordStore,
  loginAuthentication,
  togglePassword,
  loginError,
  googleLogin,
} from "../app/loginhandle";
import { useSelector } from "react-redux";
function LoginPage() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.loginHandle.email);
  const password = useSelector((state) => state.loginHandle.password);
  const errorMsg = useSelector((state) => state.loginHandle.errorMsg);
  const signin = useSelector((state) => state.loginHandle.signin);
  const loading = useSelector((state) => state.loginHandle.loading);
  const isShowPassword = useSelector((state) => state.loginHandle.showPassword);

  const handleSignIn = async () => {
    if (email !== "" && password !== "") {
      dispatch(loginAuthentication({ email, password }));
    } else {
      dispatch(loginError("Email and password can not be empty"));
    }
  };

  const handleGoogleSignin = () => {
    dispatch(googleLogin())
  };

  const togglePasswordHandle = () => {
    if (isShowPassword) {
      dispatch(togglePassword(!isShowPassword));
    } else {
      dispatch(togglePassword(!isShowPassword));
    }
  };

  const onEmailChnaged = (event) => {
    dispatch(emailStore(event.target.value));
  };
  const onPasswordChnaged = (event) => {
    dispatch(passwordStore(event.target.value));
  };

  const renderRedirect = () => {
    if (signin) {
      return <Navigate to="/userpage"></Navigate>;
    }
  };

  return (
    <div className="d-flex justify-content-center">
      {renderRedirect()}
      <div className="card text-white bg-dark bg-gradient mb-3 text-center pb-4 px-4 mt-3 mx-2">
        <h4 className="my-3">Login To Account</h4>
        <div className="row align-items-center">
          <div className="col-auto">
            <label
              htmlFor="EmailID"
              className="form-label"
              style={{ color: "white" }}
            >
              Email Address
            </label>
          </div>
          <div className="col-12 input-group">
            <span className="input-group-text" id="basic-addon1">
              <EmailIcon></EmailIcon>
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
        </div>
        <div className="row align-items-center my-2">
          <div className="col-auto">
            <label
              htmlFor="password"
              className="form-label"
              style={{ color: "white" }}
            >
              Enter Password
            </label>
          </div>
          <div className="col-12 input-group">
            <span className="input-group-text" id="basic-addon1">
              <PasswordKeyIcon></PasswordKeyIcon>
            </span>
            <input
              type={isShowPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={onPasswordChnaged}
              required
            />

            <span className="input-group-text" onClick={togglePasswordHandle}>
              {isShowPassword ? <ShowPassword /> : <HidePassword />}
            </span>
          </div>
        </div>
        {loading ? (
          <Spinner></Spinner>
        ) : (
          <button
            type="button"
            className="btn btn-primary my-2"
            onClick={handleSignIn}
          >
            Login
          </button>
        )}

        <Link to="/forgotpassword" className="link-success my-2">
          <label htmlFor="forgotpassword" style={{ cursor: "pointer" }}>
            <strong>Forgot Password ?</strong>
          </label>
        </Link>

        <label htmlFor="ordivider">OR</label>
       <div className="text-center my-2">
       <GoogleSigninSVGIcons onclick={handleGoogleSignin} />
       </div>

        <h6
          className="conatiner text-danger text-center"
          style={{ height: "1rem" }}
        >
          {errorMsg}
        </h6>
        {/* </div> */}
      </div>
    </div>
  );
}

export default LoginPage;
