import { configureStore } from "@reduxjs/toolkit";
import loginHandle from "../app/loginhandle";
import signupHandle from "../app/signuphandle";
import addItemsHandle from "./addItemsHandle";
import showItemsHandle from "./showItemsHandle";
export default configureStore({
  reducer: {
    loginHandle: loginHandle,
    signupHandle: signupHandle,
    addItemsHandle: addItemsHandle,
    showItemsHandle: showItemsHandle,
  },
});
