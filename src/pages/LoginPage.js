import React, { Component } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authApp } from "../utils/Firebase-Config";
import validator from "validator";
import { Link , Navigate } from "react-router-dom";
import PasswordKeyIcon from "../components/Icons/PasswordKeyIcon";
import GoogleSigninSVGIcons from "../components/Icons/GoogleSigninSVGIcons";
import EmailIcon from "../components/Icons/EmailIcon";
import Spinner from "../components/Spinner";
export default class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
      signin: false,
    };
  }

  //Reset Sign up modal
  resetModal = async () => {
    this.setState({
      loading: false,
      signin: false,
    });
  };
  //end here

  // Sign In handle here
  handleSignIn = async () => {
    if(this.state.email!=="" && this.state.password!=="")
    this.setState(
      {
        loading: true,
      },
     async () => {
        if (
          validator.isEmail(this.state.email) &&
          validator.isStrongPassword(this.state.password)
        ) {
          await signInWithEmailAndPassword(
            authApp,
            this.state.email,
            this.state.password
          )
            .then((response) => {
              console.log(response.user);
              localStorage.setItem("user", this.state.email);
              this.setState({
                loading:false,
                signin:true
              },()=>{
                localStorage.setItem('user',this.state.email)
                localStorage.setItem('userstatus',"login")
                })

              // useHistory().push("/")
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    );
  };
  // end here

  onEmailChnaged = (event) => {
    this.setState(
      {
        email: event.target.value,
      });
  };
  onPasswordChnaged = (event) => {
    this.setState(
      {
        password: event.target.value,
      });
  };

  renderRedirect=()=>{
    if(this.state.signin){
      return <Navigate to="/userpage"></Navigate>
    }
  }
  render() {
    return (
      <div className="d-flex justify-content-center">
        {this.renderRedirect()}
        <div className="card text-white bg-dark mb-3 text-center pb-4 px-4 mt-3">
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
                type="text"
                className="form-control"
                id="validationCustom01"
                placeholder="Email Address"
                value={this.state.email}
                onChange={this.onEmailChnaged}
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
                type="text"
                className="form-control"
                id="validationCustom01"
                placeholder="Password"
                value={this.state.password}
                onChange={this.onPasswordChnaged}
                required
              />
            </div>
          </div>

          {/* <div className="d-flex flex-column my-2 text-center"> */}
          {this.state.signin ?? <Link to="/" />}
          {this.state.loading ? (
            <Spinner></Spinner>
          ) : (
            <button
              type="button"
              className="btn btn-primary my-2"
              onClick={this.handleSignIn}
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
          <Link to="/googlesignin">
            <GoogleSigninSVGIcons></GoogleSigninSVGIcons>
          </Link>
          {/* </div> */}
        </div>
      </div>
    );
  }
}
