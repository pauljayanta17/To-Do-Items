import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { authApp } from "../utils/Firebase-Config";

// Check login Authentication from firebase
export const loginAuthentication = createAsyncThunk(
  "loginHandle/loginAuthentication",
  async (e) => {
    let res;
    try {
      await signInWithEmailAndPassword(authApp, e.email, e.password)
        .then((response) => {
          // console.log(response.user.uid);
          // window.localStorage.setItem("Login",true)
          if ("Notification" in window) {
            Notification.requestPermission();
          }
          res = response.user.uid;
        })
        .catch((e) => {
          // console.log("Firebase error ", e);
          return e.code;
        });
      window.localStorage.clear();
      return res;
    } catch (e) {
      return e.code;
      // console.log("Response error ", e);
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
  errorMsg: "",
  signin: false,
  showPassword: false,
  userEmail: "",
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
    loginError:(state,action)=>{
      state.errorMsg = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loginAuthentication.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loginAuthentication.fulfilled, (state, action) => {
        state.loading = false;
        state.signin = action.payload ? true : false;
        state.errorMsg = !state.signin && "Login Failed";
        // console.log(state.email)
      })
      .addCase(loginAuthentication.rejected, (state, action) => {
        state.loading = false;
        state.signin = false;
        state.errorMsg = "Login Failed";
      })
      .addCase(logOut.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loading = false;
      });
  },
});

export const {
  emailStore,
  passwordStore,
  login,
  togglePassword,
  setUserEmail,
  loginError
} = loginHandle.actions;

export default loginHandle.reducer;
