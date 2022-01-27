import React, { Component } from "react";
import validator from "validator";
import { authApp, db } from "../utils/Firebase-Config";
import {
  // getAuth,
  // signInWithEmailAndPassword,
  // signInWithPhoneNumber,
  // RecaptchaVerifier,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Spinner from "./Spinner";
import {
  // addDoc,
  collection,
  getDocs,
  // query,
  setDoc,
  // where,
  doc,
} from "firebase/firestore";
export default class SignupModal extends Component {
  //Define some variables in constructor like email,password,name etc.
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      cnfpassword: "",
      fullname: "",
      mobile: "",
      text_color: "rgb(6, 118, 36)",
      errorMessage: "",
      loading: false,
      modalState: "",
      userExists: false,
      signUp: false,
    };
  }

  //check if email is registered or not ?

  // emailCheckAuth=async()=>{
  //  const query = query(collection(db,"users"),where("uid","==",user.uid))
  //  const docs = await getDocs(query);
  //  if(docs.docs.length==0){

  //  }

  // }

  //Reset Sign up modal
  resetModal = async () => {
    //   if(this.state.loading===false)
    //  {
    //   this.setState({
    //     signUp: false,
    //   })
    //  }
  };
  //end here

  //create account for user

  userexistsOrnot = async () => {
    //check if the user exists or not?
    this.setState(
      {
        loading: true,
        userExists: false,
      },
      async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          //get emails from firebase
          if (doc.data()["email"] === this.state.email) {
            this.setState({
              userExists: true,
              errorMessage: "User Exists",
            });
          }
          console.log(doc.data()["email"]);
          console.log(this.state.userExists);
        });
      }
    );
  };

  handleAuth = async () => {
    await this.userexistsOrnot().then((e) => {
      //check user exists or not
      if (
        !this.state.userExists &&
        //check if the data is validate or not ??
        validator.isEmail(this.state.email) &&
        validator.isStrongPassword(this.state.password) &&
        !validator.isEmpty(this.state.fullname) &&
        this.state.password === this.state.cnfpassword
      ) {
        //set the state of loading
        this.setState(
          {
            loading: true,
            errorMessage: "",
          },
          async () => {
            //create user account to firebase
            // const authentication = getAuth();
            await createUserWithEmailAndPassword(
              authApp,
              this.state.email,
              this.state.password
            )
              .then(async (response) => {
                console.log(response.operationType);
                console.log(response.providerId);
                console.log(response.user.uid);
                //add users details in firebase storage for further use
                const ref = collection(db, "users");
                await setDoc(doc(ref, this.state.email), {
                  uid: response.user.uid,
                  email: response.user.email,
                  name: this.state.fullname,
                  authprovider: "local",
                }).then((e) => {
                  //set the state of loading to false e.g user created

                  //send OTP for varification of mobile number

                  //verification is end here

                  //set the variables values to null
                  this.setState({
                    loading: false,
                    fullname: "",
                    email: "",
                    cnfpassword: "",
                    password: "",
                    signUp: true,
                    userExists: false,
                  });
                });
              })
              //if find any error then it will handle by this function
              .catch((e) => {
                console.log(e);
                this.setState(
                  {
                    errorMessage: "Something went wrong",
                  },
                  () => {
                    this.setState({
                      loading: false,
                    });
                  }
                );
              });
          }
        );
      } else if (this.state.userExists) {
        //show error message
        this.setState({
          errorMessage: "User exists",
          loading: false,
        });
      } else {
        this.setState({
          errorMessage: "Please enter valid input",
        });
      }
    });
  };

  //onMobile number changed

  onMobileNumberChange = (event) => {
    this.setState({
      mobile: event.target.value,
    });
  };

  //onChange password

  onCnfpassword = (event) => {
    this.setState(
      {
        cnfpassword: event.target.value,
      },
      () => {
        // console.log(this.state.cnfpassword);
      }
    );
  };

  onPasswordChnaged = (event) => {
    this.setState(
      {
        password: event.target.value,
      },
      () => {
        // console.log(this.state.password);
      }
    );
  };

  //onchange name

  onNamechanged = (event) => {
    this.setState(
      {
        fullname: event.target.value,
      },
      () => {
        // console.log(this.state.fullname);
      }
    );
  };

  //onchange email
  onEmailChnaged = (event) => {
    this.setState(
      {
        email: event.target.value,
      },
      () => {
        // console.log(this.state.email);
      }
    );
  };

  render() {
    return (
      <>
        {/* Sign up button on nav bar */}
        <button
          className="btn btn-primary mx-1 my-1"
          type="submit"
          data-bs-toggle="modal"
          data-bs-target="#SignupModal"
          onClick={this.resetModal}
        >
          Sign Up
        </button>
        <div
          className="modal fade"
          id="SignupModal"
          tabIndex="-1"
          aria-labelledby="SignupModal"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="LoginModalLabel">
                  Create An Account
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={this.resetModal}
                ></button>
              </div>
            </div>

            <div className="modal-body">
              <form>
                <label
                  htmlFor="fullname"
                  className="form-label"
                  style={{ color: this.state.text_color }}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="fullnameid"
                  placeholder="Enter Full Name"
                  value={this.state.fullname}
                  onChange={this.onNamechanged}
                  required
                />

                <label
                  htmlFor="emailid"
                  className="form-label"
                  style={{ color: this.state.text_color }}
                >
                  Email ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="emailid"
                  placeholder="Enter Your Email Address"
                  value={this.state.email}
                  onChange={this.onEmailChnaged}
                  required
                />

                {/* <label
        htmlFor="emailid"
        className="form-label"
        style={{ color: this.state.text_color }}
      >
        Mobile Number
      </label>
      <input
        type="number"
        className="form-control"
        id="mobileno"
        placeholder="Enter Your Email Address"
        value={this.state.mobile}
        onChange={this.onMobileNumberChange}
        required
      /> */}

                <label
                  htmlFor="password"
                  className="form-label"
                  style={{ color: this.state.text_color }}
                >
                  New Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom01"
                  placeholder="Enter Password (inlude @,$,number,capital letters)"
                  value={this.state.password}
                  onChange={this.onPasswordChnaged}
                  required
                />
                <label
                  htmlFor="password"
                  className="form-label"
                  style={{ color: this.state.text_color }}
                >
                  Confirm Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom01"
                  placeholder="Confirm Password"
                  value={this.state.cnfpassword}
                  onChange={this.onCnfpassword}
                  required
                />
              </form>
            </div>

            {/* If the account is crated then it will show */}
            {this.state.signUp ? (
              <button className="btn btn-primary" disabled>
                Account created succssfully
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-success mx-2 my-2"
                  id="LoginModalLabel"
                  // data-bs-dismiss="modal"
                  onClick={this.handleAuth}
                >
                  {this.state.loading ? <Spinner /> : "Create Account"}
                </button>
                <div className="container text-center my-2">
                  <font color="red">{this.state.errorMessage}</font>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}
