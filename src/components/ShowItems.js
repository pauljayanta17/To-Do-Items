import React from "react";
import ToDoItems from "./ToDoItems";
import { deleteItem, getAllItems } from "../app/showItemsHandle";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Spinner from "./Spinner";
function ShowItems() {
  const dispatch = useDispatch();
  const refreshLoading = useSelector((state) => state.showItemsHandle.loading);
  const alldata = useSelector((state) => state.showItemsHandle.data);
  const userEmail = useSelector((state) => state.loginHandle.userEmail);

  const handlegetDocument = () => {
    dispatch(getAllItems(userEmail));
  };

  const deleteItemHandle = (e) => {
    let id = e.id;
    dispatch(deleteItem({userEmail,id}));
    dispatch(getAllItems(userEmail))
  };

  return (
    <>
      <div className="container text-light my-3 d-flex justify-content-between">
        <h4>Your Items </h4>
        <button className="btn btn-dark text-light" onClick={handlegetDocument}>
          {refreshLoading ? "Please Wait" : "Refresh"}
        </button>
      </div>

      {refreshLoading && (
        <div className="container text-center">
          <Spinner />
        </div>
      )}
      {alldata &&
        alldata.map((e) => {
          return (
            <div className="container list-group" key={e.id}>
              <ToDoItems
                title={e.title}
                comment={e.comment}
                date={e.id}
                deleteItem={()=>deleteItemHandle(e)}
              />
            </div>
          );
        })}
    </>
  );
}

export default ShowItems;
