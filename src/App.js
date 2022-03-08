import "./App.css";
import NavBar from "./components/NavBar";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import UserAccount from "./components/UserAccount";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import ForgotPassword from "./pages/ForgotPassword";
import { checkEmailVerified } from "./app/loginhandle";
import { authApp } from "./utils/Firebase-Config";
import { useDispatch } from "react-redux";
import { getAllItemsFromLocalStorage } from "./app/showItemsHandle";
import { updateIitemsTodatabase } from "./app/addItemsHandle";
import { useSelector } from "react-redux";
import CheckConnection from "./components/CheckConnection";
import { useSpeechSynthesis } from "react-speech-kit";
import Browsersupport from "./components/Browsersupport";
function App() {
  const { speak } = useSpeechSynthesis();
  const useragent = navigator.userAgent;
  const [browserName, setbrowserName] = useState("chrome");
  const dispatch = useDispatch();
  const email = useSelector((state) => state.loginHandle.userEmail);
  const name = useSelector((state) => state.loginHandle.displayName);
  const [connection, setconnection] = useState(true);
  useEffect(() => {
    const intervalID1 = setInterval(() => {
      if (!window.navigator.onLine) {
        setconnection(false);
      } else {
        setconnection(true);
      }
      if (useragent.match(/chrome|chromium|crios/i)) {
        setbrowserName("chrome");
      } else if (useragent.match(/edg/i)) {
        setbrowserName("edge");
      }
      else if(useragent.match(/firefox|fxios/i)){
        setbrowserName("firefox");
      } 
      else if(useragent.match(/safari/i)){
        setbrowserName("safari");
      }
      else if(useragent.match(/opr\//i)){
        setbrowserName("opera")
           } 
      if (authApp.currentUser !== null)
        dispatch(checkEmailVerified(authApp.currentUser.emailVerified));
    }, 1000);

    //For items Notification

    const intervalID2 = setInterval(() => {
      if (authApp.currentUser !== null) {
        let dateTime = Date();
        // let update = dateTime.slice(16,24);
        dispatch(getAllItemsFromLocalStorage());
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
        // console.log(notiComplete)

        arr.forEach((element) => {
          // console.log(element.time)
          let t = element.time;
          let check = dateTime.slice(16, 24);
          // console.log(check)
          if (t === check) {
            // window.localStorage.removeItem(element.id)
            window.localStorage.setItem(
              element.id,
              JSON.stringify({
                id: element.id,
                title: element.title,
                comment: element.comment,
                date: element.date,
                time: element.time,
                complete: "complete",
              })
            );
            let idtemp = element.id;
            dispatch(updateIitemsTodatabase({ email, idtemp }));
            speak({
              text: `Hey, ${name.split(" ")[0]}, your task - ${
                element.title
              } is complete`,
            });
            new Notification(element.title, {
              body: element.comment,
              icon: "https://cdn4.iconfinder.com/data/icons/generic-interaction/143/yes-tick-success-done-complete-check-allow-512.png",
            });
          }
        });
      }
      // console.log("interval")
    }, 1000);

    return () => {
      clearInterval(intervalID1);
      clearInterval(intervalID2);
    };
  });

  return (
    <>
      {browserName === "chrome" || browserName === "edge" ? (
        connection ? (
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/userpage" element={<UserAccount />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/logout" element={<LoginPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
            </Routes>
          </Router>
        ) : (
          <CheckConnection />
        )
      ) : (
        <Browsersupport />
      )}
    </>
  );
}

export default App;
