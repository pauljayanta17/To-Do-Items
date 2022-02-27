import { configureStore } from "@reduxjs/toolkit";
import loginHandle from "../app/loginhandle";
import signupHandle from "../app/signuphandle";
import addItemsHandle from "./addItemsHandle";
import showItemsHandle from "./showItemsHandle";
//Store define here
export default configureStore({
  //reducer define here
  reducer: {
    loginHandle: loginHandle,
    signupHandle: signupHandle,
    addItemsHandle: addItemsHandle,
    showItemsHandle: showItemsHandle,
  },
});
