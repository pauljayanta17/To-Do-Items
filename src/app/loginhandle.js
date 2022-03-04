import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { authApp, provider } from "../utils/Firebase-Config";

// Check login Authentication from firebase
export const loginAuthentication = createAsyncThunk(
  "loginHandle/loginAuthentication",
  async (e) => {
    let res;
    if (authApp.currentUser === null)
      try {
        //Signin to user account
        await signInWithEmailAndPassword(authApp, e.email, e.password).then(
          (response) => {
            // console.log(response.user.uid);
            // window.localStorage.setItem("Login",true)
            window.localStorage.clear();
            // if(!authApp.currentUser.emailVerified){
            //   window.localStorage.setItem("EmailMustVerify",authApp.currentUser.email)
            // }
            // console.log(authApp.currentUser.emailVerified)
            if ("Notification" in window) {
              Notification.requestPermission();
            }
            res = response.user.uid;
          }
        );
        return { userId: res };
      } catch (e) {
        // console.log("Response error ", e);
        return e.code;
      }
    else {
      return "Signin";
    }
  }
);


//Google signin 



export const googleLogin = createAsyncThunk(
  "loginHandle/googleLogin",
  async (e) => {
    // console.log(email);
  if(authApp.currentUser===null)
    try {
      let userId;
      await signInWithRedirect(authApp,provider).then((result) => {
          // const credential = GoogleAuthProvider.credential(result);
          // const token = credential.accessToken;
          userId = result.user.uid
          // console.log(user)
      })
      return {id:userId}
    } catch (error) {
      console.log(error.code)
      return error.code;
    }
    else{
      return "Signin"
    }
  }
);


//Reset password for user account using email link

export const resetPassword = createAsyncThunk(
  "loginHandle/resetPassword",
  async (email) => {
    // console.log(email);
    try {
      await sendPasswordResetEmail(authApp, email).then(() => {
        console.log(`Password reset link is sent to ${email} address`);
      });
      return "success";
    } catch (error) {
      // console.log(error.code);
      return error.code;
    }
  }
);


export const authenticateEmail = createAsyncThunk(
  "loginHandle/authenticateEmail",
  async () => {
    // console.log(email);
    try {
      await sendEmailVerification(authApp.currentUser).then(() => {
        // console.log(`Email verificaton link is sent to ${authApp.currentUser.email} address`);
      });
      return "success"
    } catch (error) {
      return error.code;
    }
  }
);

export const logOut = createAsyncThunk("loginHandle/logOut", async () => {
  try {
    const res = await signOut(authApp);
    return res;
  } catch (error) {
    //  console.log(error)
  }
});

const initialState = {
  email: "",
  password: "",
  loading: false,
  emailLoading:false,
  errorMsg: "",
  signin: false,
  showPassword: false,
  userEmail: "",
  emailVerified:false
};

const loginHandle = createSlice({
  name: "loginHandle",
  initialState,
  reducers: {
    emailStore: (state, action) => {
      // console.log(state.signin);
      state.email = action.payload;
    },
    passwordStore: (state, action) => {
      state.password = action.payload;
    },
    login: (state, action) => {
      state.signin = action.payload;
    },
    togglePassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    loginError: (state, action) => {
      state.errorMsg = action.payload;
    },
    checkEmailVerified:(state,action)=>{
      state.emailVerified = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginAuthentication.pending, (state, action) => {
        state.loading = true;
        state.errorMsg=""
      })
      .addCase(loginAuthentication.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload === "Signin") {
          state.errorMsg = "Already Sign in";
        } else if (action.payload.userId) {
          state.errorMsg = "";
          state.email = "";
          state.password = "";
        } else if (action.payload === "auth/invalid-email") {
          state.errorMsg = "Email is not valid";
        } else if (action.payload === "auth/wrong-password") {
          state.errorMsg = "Password is incorrect";
        } else if (action.payload === "auth/user-not-found") {
          state.errorMsg = "Email is not register";
        } else if (action.payload === "auth/too-many-requests") {
          state.errorMsg =
            "Too many attempts reset your password";
            state.email="";
            state.password="";
        } else {
          state.errorMsg = "Something went wrong";
        }
      })
      .addCase(logOut.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(resetPassword.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload === "auth/missing-email") {
          state.errorMsg = "Email can not be empty";
        } else if (action.payload === "auth/invalid-email") {
          state.errorMsg = "Invalid Email Address";
        } else if (action.payload === "auth/user-not-found") {
          state.errorMsg = "Email is not register";
        } else if (action.payload === "success") {
          state.errorMsg = "Check your email for reset password";
          state.email = "";
        }
      })
      .addCase(authenticateEmail.pending, (state, action) => {
        state.emailLoading = true;
        state.errorMsg = "";
      })
      .addCase(authenticateEmail.fulfilled, (state, action) => {
        state.emailLoading = false;
        if (action.payload === "auth/missing-email") {
          state.errorMsg = "Email cann't be empty";
        }
        else if(action.payload==="success"){
          state.errorMsg = "verificaton link sent to email"
        }
        // state.sendLink = true;
      })
      .addCase(authenticateEmail.rejected, (state, action) => {
        state.emailLoading = false;
      })
  },
});

export const {
  emailStore,
  passwordStore,
  login,
  togglePassword,
  setUserEmail,
  loginError,
  checkEmailVerified
} = loginHandle.actions;

export default loginHandle.reducer;
