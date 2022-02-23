import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/Firebase-Config";

export const addItemsTodatabase = createAsyncThunk(
  "addItemsHandle/addItemsTodatabase",
  async (items) => {
    // console.log(items.title, items.comment);
    try {
      const dateNow = Date(Date.now().toString());
      const docRef = doc(db, items.userEmail, dateNow);
      await setDoc(docRef, {
        title: items.title,
        comment: items.comment,
      });
      // console.log(refId.id)
      return "Success";
    } catch (error) {
      // console.log("Error", error);
      return "Failed";
    }
  }
);

const initialState = {
  title: "",
  comment: "",
  titleError: "white",
  commentError: "white",
  loading: false,
};

const addItemsHandle = createSlice({
  name: "addItemsHandle",
  initialState,
  reducers: {
    addTitle: (state, action) => {
      state.title = action.payload;
    },
    addComment: (state, action) => {
      state.comment = action.payload;
    },
    titleErrorHandle: (state, action) => {
      state.titleError = action.payload;
    },
    commentErrorHandle: (state, action) => {
      state.commentError = action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(addItemsTodatabase.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addItemsTodatabase.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload === "Success") {
          // console.log("Successfully add document to databse");
          state.title = "";
          state.comment = "";
          state.titleError = "white";
          state.commentError = "white";
        }
        if (action.payload === "Failed") {
        }
      });
  },
});

export const { addTitle, addComment, titleErrorHandle, commentErrorHandle } =
  addItemsHandle.actions;
export default addItemsHandle.reducer;
