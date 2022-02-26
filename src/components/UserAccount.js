import React, { useEffect } from "react";
import Additems from "./Additems";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  addTitle,
  addComment,
  titleErrorHandle,
  commentErrorHandle,
  addItemsTodatabase,
} from "../app/addItemsHandle";
import { useDispatch } from "react-redux";
import ShowItems from "./ShowItems";
import { getAllItemsFromLocalStorage } from "../app/showItemsHandle";

function UserAccount() {
  const dispatch = useDispatch();
  //Load state for login and addItems Reducers
  const signin = useSelector((state) => state.loginHandle.signin);
  const loading = useSelector((state) => state.addItemsHandle.loading);
  const title = useSelector((state) => state.addItemsHandle.title);
  const comment = useSelector((state) => state.addItemsHandle.comment);
  const userEmail = useSelector((state) => state.loginHandle.userEmail);

 
  useEffect(() => {
    dispatch(getAllItemsFromLocalStorage());
  }, [])
  
  const handleItemAddToDatabase = () => {
    title === ""
      ? dispatch(titleErrorHandle("red"))
      : dispatch(titleErrorHandle("green"));
    comment === ""
      ? dispatch(commentErrorHandle("red"))
      : dispatch(commentErrorHandle("green"));
    if (title !== "" && comment !== "") {
      dispatch(addItemsTodatabase({ title, comment, userEmail }));
    }
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
      <Additems
        loading={loading}
        title={title}
        onTitleChange={onTitleChange}
        content={comment}
        onContentChange={onContentChange}
        handleItemAddToDatabase={handleItemAddToDatabase}
        btnTitle="Save"
      />
      <ShowItems />
    </>
  );
}

export default UserAccount;
