import React from "react";
import EmailIcon from "../components/Icons/EmailIcon";
import validator from "validator";
import MobileIcon from "../components/Icons/MobileIcon";
import PersonIcon from "../components/Icons/PersonIcon";
import Spinner from "../components/Spinner";
import PasswordKeyIcon from "../components/Icons/PasswordKeyIcon";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  nameStore,
  emailStore,
  newpasswordStore,
  cnfpasswordStore,
  mobileStore,
  signUpAuth,
  signup,
  errorMsgStore,
} from "../app/signuphandle";
function SignUpPage() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.signupHandle.email);
  const fullname = useSelector((state) => state.signupHandle.fullname);
  const mobileno = useSelector((state) => state.signupHandle.mobileno);
  const password = useSelector((state) => state.signupHandle.password);
  const cnfpassword = useSelector((state) => state.signupHandle.cnfpassword);
  const signUpstate = useSelector((state) => state.signupHandle.signUp);
  const loading = useSelector((state) => state.signupHandle.loading);
  const errorMessage = useSelector((state) => state.signupHandle.errorMsg);

  let text_color = "white";

  //create new user

  if (signUpstate) {
    dispatch(nameStore(""));
    dispatch(cnfpasswordStore(""));
    dispatch(newpasswordStore(""));
    dispatch(mobileStore(""));
    dispatch(emailStore(""));
    setTimeout(() => {
      dispatch(signup(false));
    }, 1500);
  }

  const handleAuth = async () => {
    dispatch(errorMsgStore(""));
    if (
      validator.isEmail(email) &&
      validator.isStrongPassword(cnfpassword) &&
      password === cnfpassword &&
      mobileno.length === 10 &&
      fullname !== ""
    ) {
      dispatch(signUpAuth({ email, password }));
    } else {
      dispatch(errorMsgStore("Enter valid Inputes"));
    }
  };

  //onChange password

  const onCnfpassword = (event) => {
    dispatch(cnfpasswordStore(event.target.value));
  };

  const onPasswordChnaged = (event) => {
    dispatch(newpasswordStore(event.target.value));
  };

  //onchange name

  const onFullNamechanged = (event) => {
    dispatch(nameStore(event.target.value));
  };

  const onMobilenoNamechanged = (event) => {
    dispatch(mobileStore(event.target.value));
  };

  //onchange email
  const onEmailChnaged = (event) => {
    dispatch(emailStore(event.target.value));
  };
  // style={{maxWidth: '25rem'}}
  return (
    <form className="row g-3 needs-validation">
      <div className="d-flex justify-content-center">
        <div className="card text-white bg-dark mb-3 text-center pb-4 px-4 mt-2">
          <h4>
            <div className="card-header">Create Account</div>
          </h4>
          <div className="row align-items-center">
            <div className="col-auto">
              <label
                htmlFor="fullname"
                className="form-label"
                style={{ color: text_color }}
              >
                Full Name
              </label>
            </div>
            <div className="col-12 input-group">
              <span
                className="input-group-text"
                id="basic-addon1"
                style={{
                  border: `2px solid ${fullname === "" ? "red" : "green"}`,
                }}
              >
                <PersonIcon></PersonIcon>
              </span>
              <input
                type="text"
                className="form-control"
                id="firstnameid"
                placeholder="Full Name"
                value={fullname}
                onChange={onFullNamechanged}
                required
              />
            </div>
          </div>

          <div className="row align-items-center my-1">
            <div className="col-auto">
              <label
                htmlFor="mobileno"
                className="form-label"
                style={{ color: text_color }}
              >
                Phone Number
              </label>
            </div>
            <div className="col-12 input-group">
              <span
                className="input-group-text"
                id="basic-addon1"
                style={{
                  border: `2px solid ${
                    mobileno.length === 10 ? "green" : "red"
                  }`,
                }}
              >
                <MobileIcon></MobileIcon>
              </span>
              <input
                type="text"
                className="form-control"
                id="mobileno"
                placeholder="Phone Number"
                value={mobileno}
                onChange={onMobilenoNamechanged}
                required
              />
            </div>
          </div>

          <div className="row align-items-center my-1">
            <div className="col-auto">
              <label
                htmlFor="emailid"
                className="form-label"
                style={{ color: text_color }}
              >
                Email ID
              </label>
            </div>
            <div className="col-12 input-group">
              <span
                className="input-group-text"
                id="basic-addon1"
                style={{
                  border: `2px solid ${
                    validator.isEmail(email) ? "green" : "red"
                  }`,
                }}
              >
                <EmailIcon></EmailIcon>
              </span>
              <input
                type="text"
                className="form-control"
                id="emailid"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={onEmailChnaged}
                required
              />
            </div>
          </div>

          <div className="row align-items-center my-1">
            <div className="col-auto">
              <label
                htmlFor="password"
                className="form-label"
                style={{ color: text_color }}
              >
                New Password
              </label>
            </div>
            <div className="col-12 input-group">
              <span
                className="input-group-text"
                id="basic-addon1"
                style={{
                  border: `2px solid ${
                    validator.isStrongPassword(password) ? "green" : "red"
                  }`,
                }}
              >
                <PasswordKeyIcon></PasswordKeyIcon>
              </span>
              <input
                type="password"
                className="form-control"
                id="validationCustom01"
                placeholder="Enter Password (inlude @,$,number,capital letters)"
                value={password}
                onChange={onPasswordChnaged}
                required
              />
            </div>
          </div>

          <div className="row align-items-center my-1">
            <div className="col-auto">
              <label
                htmlFor="password"
                className="form-label"
                style={{ color: text_color }}
              >
                Confirm Password
              </label>
            </div>
            <div className="col-12 input-group">
              <span
                className="input-group-text"
                id="basic-addon1"
                style={{
                  border: `2px solid ${
                    validator.isStrongPassword(cnfpassword) ? "green" : "red"
                  }`,
                }}
              >
                <PasswordKeyIcon></PasswordKeyIcon>
              </span>
              <input
                type="password"
                className="form-control"
                id="validationCustom01"
                placeholder="Confirm Password"
                value={cnfpassword}
                onChange={onCnfpassword}
                required
              />
            </div>
          </div>

          {/* If the account is crated then it will show */}
          {signUpstate ? (
            <button className="btn btn-primary col-12 my-1" disabled>
              Account created succssfully
            </button>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-success col-12 my-1 my-2"
                id="LoginModalLabel"
                // data-bs-dismiss="modal"
                onClick={handleAuth}
              >
                {loading ? <Spinner /> : "Create Account"}
              </button>
              {/* <div className="container text-center my-2">
                <font color="red">{errorMessage}</font>
              </div> */}
            </>
          )}
        </div>
      </div>
    </form>
  );
}

export default SignUpPage;
