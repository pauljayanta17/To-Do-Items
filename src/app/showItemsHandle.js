import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../utils/Firebase-Config";

export const getAllItemsFromDatabase = createAsyncThunk(
  "showItemsHandle/getAllItems",
  async (email) => {
    // console.log("in showitems", email);
    // code here
    try {
      let arr = [];
      window.localStorage.clear();
      const querySnapshot = await getDocs(collection(db, email));
      // console.log(typeof querySnapshot);
      querySnapshot.forEach((data) => {
        arr.push({
          id: data.id,
          title: data.data().title,
          comment: data.data().comment,
          date:data.data().date,
          time:data.data().time
        });
        window.localStorage.setItem(
          data.id,
          JSON.stringify({
            id: data.id,
            title: data.data().title,
            comment: data.data().comment,
            date:data.data().date,
            time:data.data().time
          })
        );
      });
      return arr;
    } catch (error) {
      // console.log(error.message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "showItemsHandle/deleteItem",
  async (e) => {
    // code here
    try {
      await deleteDoc(doc(db, e.userEmail, e.id));
      window.localStorage.removeItem(e.id);
    } catch (error) {
      // console.log(error.message);
    }
  }
);

export const deleteAllItem = createAsyncThunk(
  "showItemsHandle/deleteAllItem",
  async (emailid) => {
    // code here
    try {
      var length = window.localStorage.length;
      let arr=[];
      for (let i = 0; i < length; i++) {
        // console.log(window.localStorage.getItem(window.localStorage.key(i)));
        // console.log(JSON.parse(window.localStorage.getItem(localStorage.key(i))))
        arr.push(
          JSON.parse(window.localStorage.getItem(window.localStorage.key(i)))
        );
        // console.log(state.data)
      }
      arr.map(async(e)=>{
      await deleteDoc(doc(db,emailid,e.id));
      })
      window.localStorage.clear();
    } catch (error) {
      console.log(error.message);
    }
  }
);

const initialState = {
  data: [],
  loading: false,
};

const showItemsHandle = createSlice({
  name: "showItemsHandle",
  initialState,
  reducers: {
    updateItems: (state, action) => {
      // let index = state.data.indexOf(action.payload.item)
      if (action.payload.operation === "add") {
      } else if (action.payload.operation === "del") {
      }
    },
    getAllItemsFromLocalStorage: (state, action) => {
      state.loading = true;
      state.data = [];
      let arr = [];
      var length = window.localStorage.length;
      for (let i = 0; i < length; i++) {
        // console.log(window.localStorage.getItem(window.localStorage.key(i)));
        // console.log(JSON.parse(window.localStorage.getItem(localStorage.key(i))))
        arr.push(
          JSON.parse(window.localStorage.getItem(window.localStorage.key(i)))
        );
        // console.log(state.data)
      }
      state.data = arr;
      state.loading = false;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllItemsFromDatabase.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllItemsFromDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllItemsFromDatabase.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteAllItem.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteAllItem.fulfilled, (state, action) => {
        state.loading = false;
        state.data=[]
      })

  },
});

export const { updateItems, getAllItemsFromLocalStorage } =
  showItemsHandle.actions;
export default showItemsHandle.reducer;
