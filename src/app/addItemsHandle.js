import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/Firebase-Config";

export const addItemsTodatabase = createAsyncThunk(
  "addItemsHandle/addItemsTodatabase",
  async (items) => {
    // console.log(items.title, items.comment);
    // console.log(items.date);
    try {
      const dateNow = Date();
      const docRef = doc(db, items.userEmail, dateNow);
      await setDoc(docRef, {
        title: items.title,
        comment: items.comment,
        date: items.setdate,
        time: items.settime,
      });
      window.localStorage.setItem(
        dateNow.toString(),
        JSON.stringify({
          id: dateNow.toString(),
          title: items.title,
          comment: items.comment,
          date: items.setdate,
          time: items.settime,
        })
      );
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
  date: "yyyy-MM-dd",
  time:"hh:mm",
  dateError: "white",
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
    addDateTime: (state, action) => {
      state.date = action.payload.date;
      state.time = action.payload.time;
    },
    titleErrorHandle: (state, action) => {
      state.titleError = action.payload;
    },
    commentErrorHandle: (state, action) => {
      state.commentError = action.payload;
    },
    dateErrorHandle: (state, action) => {
      state.dateError = action.payload;
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
          state.date = "yyyy-MM-dd";
          state.time = "hh:mm";
          // value="yyyy-MM-dd T hh:mm"
          // "yyyy-MM-ddThh:mm" 
          state.titleError = "white";
          state.commentError = "white";
          state.dateError = "white";
        }
        if (action.payload === "Failed") {
        }
      });
  },
});

export const {
  addTitle,
  addComment,
  addDateTime,
  titleErrorHandle,
  commentErrorHandle,
  dateErrorHandle,
} = addItemsHandle.actions;
export default addItemsHandle.reducer;
