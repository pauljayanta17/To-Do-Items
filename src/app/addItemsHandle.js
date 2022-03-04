import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../utils/Firebase-Config";

//Add items to database function

export const addItemsTodatabase = createAsyncThunk(
  "addItemsHandle/addItemsTodatabase",
  async (items) => {
    try {
      //get current date and time
      const dateNow = Date();
      //set doc for firebase
      const docRef = doc(db, items.userEmail, dateNow);
      //write items to firebase firestore
      await setDoc(docRef, {
        title: items.title,
        comment: items.comment,
        date: items.setdate,
        time: items.settime,
      });
      //write same items to localStorage for future
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

      return "Success";
    } catch (error) {
      // console.log("Error", error);
      return "Failed";
    }
  }
);

export const updateIitemsTodatabase = createAsyncThunk(
  "addItemsHandle/updateIitemsTodatabase",
  async (items) => {
    try {
      const updateItems = doc(db, items.email, items.idtemp);
      await updateDoc(updateItems, {
        complete: "complete",
      });
    } catch (error) {
      console.log(error.code);
    }
  }
);

//Defining initialState for the reducers
const initialState = {
  title: "",
  comment: "",
  date: "yyyy-MM-dd",
  time: "hh:mm",
  dateError: "white",
  titleError: "white",
  commentError: "white",
  loading: false,
};

const addItemsHandle = createSlice({
  name: "addItemsHandle",
  initialState,
  reducers: {
    //addTitle reducer
    addTitle: (state, action) => {
      state.title = action.payload;
    },
    //addComment reducer
    addComment: (state, action) => {
      state.comment = action.payload;
    },
    //addDateTime reducer
    addDateTime: (state, action) => {
      state.date = action.payload.date;
      state.time = action.payload.time;
    },
    //add Error in title
    titleErrorHandle: (state, action) => {
      state.titleError = action.payload;
    },
    //add Error in comment
    commentErrorHandle: (state, action) => {
      state.commentError = action.payload;
    },
    //add Error in date
    dateErrorHandle: (state, action) => {
      state.dateError = action.payload;
    },
  },

  //extraReducers for asynchronous functon
  extraReducers(builder) {
    builder //pending the writting process
      .addCase(addItemsTodatabase.pending, (state, action) => {
        state.loading = true;
      })
      //when writing process is done
      .addCase(addItemsTodatabase.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload === "Success") {
          state.title = "";
          state.comment = "";
          state.date = "yyyy-MM-dd";
          state.time = "hh:mm";
          state.titleError = "white";
          state.commentError = "white";
          state.dateError = "white";
        }
      })
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
