import React, { Component } from "react";
import EmailIcon from "../components/Icons/EmailIcon";
import validator from "validator";
import { authApp, db } from "../utils/Firebase-Config";
import MobileIcon from '../components/Icons/MobileIcon';
import PersonIcon from '../components/Icons/PersonIcon'
import {
  // getAuth,
  // signInWithEmailAndPassword,
  // signInWithPhoneNumber,
  // RecaptchaVerifier,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Spinner from "../components/Spinner";
import {
  // addDoc,
  collection,
  getDocs,
  // query,
  setDoc,
  // where,
  doc,
} from "firebase/firestore";
import PasswordKeyIcon from "../components/Icons/PasswordKeyIcon";
export default class SignUpPage extends Component {
  //Define some variables in constructor like email,password,name etc.
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      cnfpassword: "",
      fullname: "",
      mobileno: "",
      // text_color: "rgb( 58, 29, 140 )",
      text_color: "white",
      errorMessage: "",
      loading: false,
      modalState: "",
      userExists: false,
      signUp: false,
      count: 0,
    };
  }

  componentDidMount(){
   
  
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
        count: 0,
      },
      async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        console.log(querySnapshot.size)
        !querySnapshot.size===0 ?
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          //get emails from firebase
          if (doc.data()["email"] === this.state.email) {
            this.setState({
              userExists: true,
              errorMessage: "User Exists",
              loading: false,
              count: this.state.count + 1,
            });
          }
          console.log(doc.data()["email"]);
          console.log(this.state.userExists);
        }) : this.setState({
          loading:false,
          userExists: false,
        })
      }
    );
  };

  handleAuth = async () => {
    if (validator.isEmail(this.state.email) &&
    validator.isStrongPassword(this.state.password) &&
    !validator.isEmpty(this.state.fullname) &&
    this.state.mobileno.length===10&&
    this.state.password === this.state.cnfpassword)
      await this.userexistsOrnot().then((e) => {
        //check user exists or not
        if (
          !this.state.count > 0 &&
          //check if the data is validate or not ??
          validator.isEmail(this.state.email) &&
          validator.isStrongPassword(this.state.password) &&
          !validator.isEmpty(this.state.fullname) &&
          this.state.mobileno.length===10&&
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
                    fullname: this.state.fullname,
                    mobileno: this.state.mobileno,
                    authprovider: "local",
                  }).then((e) => {
                    //set the state of loading to false e.g user created

                    //send OTP for varification of mobile number

                    //verification is end here

                    //set the variables values to null
                    this.setState({
                      loading: false,
                      fullname: "",
                      mobileno: "",
                      email: "",
                      cnfpassword: "",
                      password: "",
                      signUp: true,
                      userExists: false,
                    },()=>{
                      setTimeout(() => {
                          this.setState({
                            signUp:false
                          })
                      }, 1500);
                    })
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
          });
        } else {
          this.setState({
            errorMessage: "Please enter valid input",
          });
        }
      });

      else
      this.setState({
        errorMessage: "Please enter valid input",
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

  onFullNamechanged = (event) => {
    this.setState(
      {
        fullname: event.target.value,
      },
      () => {
        // console.log(this.state.fullname);
      }
    );
  };

  onMobilenoNamechanged = (event) => {
    this.setState(
      {
        mobileno: event.target.value,
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
  // style={{maxWidth: '25rem'}}
  render() {
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
                style={{ color: this.state.text_color }}
              >
                Full Name
              </label>
            </div>
            <div className="col-12 input-group">
            <span className="input-group-text" id="basic-addon1"><PersonIcon></PersonIcon></span>
              <input
                type="text"
                className="form-control"
                id="firstnameid"
                placeholder="Full Name"
                value={this.state.fullname}
                onChange={this.onFullNamechanged}
                required
              />
             
            </div>
          </div>

          <div className="row align-items-center my-1">
            <div className="col-auto">
              <label
                htmlFor="mobileno"
                className="form-label"
                style={{ color: this.state.text_color }}
              >
                Phone Number
              </label>
            </div>
            <div className="col-12 input-group">
            <span className="input-group-text" id="basic-addon1"><MobileIcon></MobileIcon></span>
              <input
                type="text"
                className="form-control"
                id="mobileno"
                placeholder="Phone Number"
                value={this.state.mobileno}
                onChange={this.onMobilenoNamechanged}
                required
              />
            </div>
          </div>

          <div className="row align-items-center my-1">
            <div className="col-auto">
              <label
                htmlFor="emailid"
                className="form-label"
                style={{ color: this.state.text_color }}
              >
                Email ID
              </label>
            </div>
            <div className="col-12 input-group">
            <span className="input-group-text" id="basic-addon1"><EmailIcon></EmailIcon></span>
              <input
                type="text"
                className="form-control"
                id="emailid"
                placeholder="Enter Your Email Address"
                value={this.state.email}
                onChange={this.onEmailChnaged}
                required
              />
            </div>
          </div>

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
          <div className="row align-items-center my-1">
            <div className="col-auto">
              <label
                htmlFor="password"
                className="form-label"
                style={{ color: this.state.text_color }}
              >
                New Password
              </label>
            </div>
            <div className="col-12 input-group">
            <span className="input-group-text" id="basic-addon1"><PasswordKeyIcon></PasswordKeyIcon></span>
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                placeholder="Enter Password (inlude @,$,number,capital letters)"
                value={this.state.password}
                onChange={this.onPasswordChnaged}
                required
              />
            </div>
          </div>

          <div className="row align-items-center my-1">
            <div className="col-auto">
              <label
                htmlFor="password"
                className="form-label"
                style={{ color: this.state.text_color }}
              >
                Confirm Password
              </label>
            </div>
            <div className="col-12 input-group">
            <span className="input-group-text" id="basic-addon1"><PasswordKeyIcon></PasswordKeyIcon></span>
              <input
                type="text"
                className="form-control"
                id="validationCustom01"
                placeholder="Confirm Password"
                value={this.state.cnfpassword}
                onChange={this.onCnfpassword}
                required
              />
            </div>
          </div>

          {/* If the account is crated then it will show */}
          {this.state.signUp ? (
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
      </form>
    );
  }
}
