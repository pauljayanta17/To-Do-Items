import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { authApp } from "../utils/Firebase-Config";
export const signUpAuth = createAsyncThunk("signinHandle/auth", async (e) => {
  let msg;
  try {
    await createUserWithEmailAndPassword(authApp, e.email, e.password)
      .then((e) => {
        // console.log(e.user.uid);
        msg = "user created";
      })
      .then(async (e) => {
        await signOut(authApp);
      })
      .catch((error) => {
        msg = error.code;
      });

    return msg;
  } catch (error) {
    // console.log(error)
  }
});

const initialState = {
  fullname: "",
  email: "",
  password: "",
  cnfpassword: "",
  mobileno: "",
  loading: false,
  errorMsg: "",
  signUp: false,
};

const signupHandle = createSlice({
  name: "signupHandle",
  initialState,
  reducers: {
    nameStore: (state, action) => {
      state.fullname = action.payload;
    },
    emailStore: (state, action) => {
      state.email = action.payload;
    },
    mobileStore: (state, action) => {
      state.mobileno = action.payload;
    },
    newpasswordStore: (state, action) => {
      state.password = action.payload;
    },
    cnfpasswordStore: (state, action) => {
      state.cnfpassword = action.payload;
    },
    errorMsgStore: (state, action) => {
      state.errorMsg = action.payload;
    },
    signup: (state, action) => {
      state.signUp = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(signUpAuth.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(signUpAuth.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload === "auth/email-already-in-use") {
          state.errorMsg = "Email is already in use";
        }
        if (action.payload === "user created") {
          state.signUp = true;
          state.cnfpassword = "";
          state.email = "";
          state.fullname = "";
          state.mobileno = "";
          state.password = "";
        }
      })
      .addCase(signUpAuth.rejected, (state, action) => {
        state.loading = false;
        state.errorMsg = "Something went wrong";
      });
  },
});

export const {
  nameStore,
  emailStore,
  newpasswordStore,
  cnfpasswordStore,
  mobileStore,
  signup,
  errorMsgStore,
} = signupHandle.actions;

export default signupHandle.reducer;
