import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../utils/Firebase-Config";

export const getAllItems = createAsyncThunk(
  "showItemsHandle/getAllItems",
  async (email) => {
    // console.log("in showitems", email);
    // code here
    try {
      let arr = [];
      const querySnapshot = await getDocs(collection(db, email));
      // console.log(typeof querySnapshot);
      querySnapshot.forEach((data) => {
        arr.push({ id:data.id,title: data.data().title, comment: data.data().comment });
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
      await deleteDoc(doc(db, e.userEmail, e.id))
    } catch (error) {
      // console.log(error.message);
    }
  }
);

const initialState = {
  data:[],
  loading: false,
};

const showItemsHandle = createSlice({
  name: "showItemsHandle",
  initialState,
  reducers: {
    updateItems:(state,action)=>{
      // let index = state.data.indexOf(action.payload.item)
      if(action.payload.operation==="add"){
        
      }
      else if(action.payload.operation==="del"){

      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAllItems.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(getAllItems.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteItem.pending,(state,action)=>{
        state.loading = true;
      })
      .addCase(deleteItem.fulfilled,(state,action)=>{
        state.loading = false;
      })
  },
});

export const {updateItems} = showItemsHandle.actions;
export default showItemsHandle.reducer;
