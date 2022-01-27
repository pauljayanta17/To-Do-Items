// import logo from './logo.svg';
import "./App.css";
import NavBar from "./components/NavBar";
import React, { Component } from "react";
import { db } from "./utils/Firebase-Config";
import {
  collection,
  getDocs,
  // query,
  doc,
  setDoc,
} from "firebase/firestore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
// import ToDoItems from "./components/ToDoItems";
import LoginPage from "./pages/LoginPage";
import UserAccount from "./components/UserAccount";
export default class App extends Component {
  constructor(){
    super()
    console.log("Don is here")
    this.state={
      currentUser:false,
    }
    console.log("component did mount")
    if(localStorage.getItem('user')!==null){
      if(localStorage.getItem('userstatus')==="login")
      {
        this.setState({
          currentUser:true,
        })
        
      }
      else{
        this.setState({
          currentUser:false,
        })
      }
    }
  }

  // async componentDidMount() {
  //   console.log("component did mount")
  //   if(localStorage.getItem('user')!==null){
  //     if(localStorage.getItem('userstatus')==="login")
  //     {
  //       this.setState({
  //         currentUser:true,
  //       })
        
  //     }
  //     else{
  //       this.setState({
  //         currentUser:false,
  //       })
  //     }
  //   }
    
  // }

  getDataFirebase = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      //get emails from firebase
      console.log(doc.data()["email"]);
    });
  };

  setDataFirebase = async () => {
    const ref = collection(db, "users");
    await setDoc(doc(ref, "jayanta"), {
      name: "jayanta",
      email: "paul17jayata",
      language: ["hindi", "english", "bengali"],
    });
  };

  
  render() {
    return (
      <Router>
        <NavBar currentUser={this.state.currentUser}/>
        <Routes>
          <Route path="/" element={this.state.currentUser ? <UserAccount/>:<LoginPage/> }/>
          <Route path="/userpage" element={ <UserAccount/> }/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/logout" element={<LoginPage/>}/>
          {/* <Route path="/forgotpassword"></Route>
          <LoginpageEx></LoginpageEx> */}
        </Routes>
      </Router>
    );
  }
}
