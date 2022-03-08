import React from "react";
import Additems from "./Additems";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  addTitle,
  addComment,
  addDateTime,
  titleErrorHandle,
  commentErrorHandle,
  addItemsTodatabase,
  dateErrorHandle,
} from "../app/addItemsHandle";
import { useDispatch } from "react-redux";
import ShowItems from "./ShowItems";
// import { authApp } from "../utils/Firebase-Config";
// import { checkEmailVerified } from "../app/loginhandle";
import EmailVerification from "../pages/EmailVerification";

function UserAccount() {
  const dispatch = useDispatch();
  //Load state for login and addItems Reducers
  const signin = useSelector((state) => state.loginHandle.signin);
  const userEmail = useSelector((state) => state.loginHandle.userEmail);
  const emailVerified = useSelector((state) => state.loginHandle.emailVerified);
  const loading = useSelector((state) => state.addItemsHandle.loading);
  const title = useSelector((state) => state.addItemsHandle.title);
  const comment = useSelector((state) => state.addItemsHandle.comment);
  const setdate = useSelector((state) => state.addItemsHandle.date);
  const settime = useSelector((state) => state.addItemsHandle.time);

  // useEffect(() => {
  //   const intervalID = setInterval(() => {
  //     dispatch(checkEmailVerified(authApp.currentUser.emailVerified));
  //   }, 1000);
  //   return () => {
  //     clearInterval(intervalID);
  //   };
  // }, [authApp]);

  //After click on Save button this function will run
  const handleItemAddToDatabase = () => {
    title === ""
      ? dispatch(titleErrorHandle("red"))
      : dispatch(titleErrorHandle("green"));
    comment === ""
      ? dispatch(commentErrorHandle("red"))
      : dispatch(commentErrorHandle("green"));
    settime !== "hh:mm" && setdate !== "yyyy-MM-dd"
      ? dispatch(dateErrorHandle("green"))
      : dispatch(dateErrorHandle("red"));
    if (
      title !== "" &&
      comment !== "" &&
      settime !== "hh:mm" &&
      setdate !== "yyyy-MM-dd"
    ) {
      // console.log(date)
      dispatch(
        addItemsTodatabase({ title, comment, userEmail, setdate, settime })
      );
    }
  };

  const handleDateChanged = (e) => {
    // console.log(e.target.value)
    const temp = e.target.value;
    const date = temp.slice(0, 10);
    let time = temp.slice(11, 16) + ":00";
    dispatch(addDateTime({ date, time }));
    // console.log(temp.slice(0,10))
    // console.log(temp.slice(11,16))
    // if (settime !== "hh:mm" && setdate !== "yyyy-MM-dd") {
    //   dispatch(dateErrorHandle("green"));
    // } else {
    //   dispatch(dateErrorHandle("red"));
    // }
  };

  const onTitleChange = (event) => {
    dispatch(addTitle(event.target.value));
  };

  const onContentChange = (event) => {
    dispatch(addComment(event.target.value));
  };

  const renderRedirect = () => {
    if (!signin) {
      return <Navigate to="/login" />;
    }
  };
  

  return (
    <>
      {renderRedirect()}
      {emailVerified ? (
        <>
          <Additems
            loading={loading}
            title={title}
            onTitleChange={onTitleChange}
            content={comment}
            onContentChange={onContentChange}
            handleItemAddToDatabase={handleItemAddToDatabase}
            btnTitle="Save"
            handleDateChanged={handleDateChanged}
          />
          <ShowItems />
          
        </>
      ) : (
        <>
           <EmailVerification />
        </>
       
      )}
    </>
  );
}

export default UserAccount;
