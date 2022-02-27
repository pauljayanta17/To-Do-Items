import "./App.css";
import NavBar from "./components/NavBar";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import UserAccount from "./components/UserAccount";
import AboutUs from './components/AboutUs'
import ContactUs from "./components/ContactUs";
function App() {
  
  
  // const getDataFirebase = async () => {
  //   const querySnapshot = await getDocs(collection(db, "users"));
  //   querySnapshot.forEach((doc) => {
  //     // doc.data() is never undefined for query doc snapshots
  //     console.log(doc.id, " => ", doc.data());
  //     //get emails from firebase
  //     console.log(doc.data()["email"]);
  //   });
  // };
  // hgdashg@gmail.com
  // const setDataFirebase = async () => {
  //   var ref = collection(db, "users");
  //   var v = doc(ref, "hie");
  //   await updateDoc(v, {
  //     to: "hi",
  //   });
  //   // const ref = collection(db, "users");
  //   // // console.log(await db.collection('users').document('users').collection('hgdashg@gmail.com'))
  //   // await db.collection("users").then((result) => {
  //   //   console.log(result)
  //   // }).catch((err) => {
  //   //   console.log(err)
  //   // });
  //   // await addDoc(collection(db, "users","hgdashg@gmail.com"), {
  //   //   name: "jayanta",
  //   //   email: "paul17jayata",
  //   //   language: ["hindi", "english", "bengali"],
  //   // });
  // };

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/userpage" element={<UserAccount />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LoginPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />


      </Routes>
    </Router>
   
  );
}

export default App;
