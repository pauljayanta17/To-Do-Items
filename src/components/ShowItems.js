import React, { useEffect, useState } from "react";
import ToDoItems from "./ToDoItems";
// import i from '../components/Icons/kindpng_815995.png'
import {
  deleteItem,
  deleteAllItem,
  getAllItemsFromDatabase,
  getAllItemsFromLocalStorage,
} from "../app/showItemsHandle";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Spinner from "./Spinner";
function ShowItems() {
  const dispatch = useDispatch();
  const refreshLoading = useSelector((state) => state.showItemsHandle.loading);
  const alldata = useSelector((state) => state.showItemsHandle.data);
  const userEmail = useSelector((state) => state.loginHandle.userEmail);

  useEffect(() => {
    const intervalID = setInterval(() => {
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
        if (t === check ) {
          // window.localStorage.removeItem(element.id)
          window.localStorage.setItem(
            element.id,
            JSON.stringify({
              id: element.id,
              title: element.title,
              comment: element.comment,
              date: element.date,
              time: element.time,
              complete:"complete"
            })
          );
          new Notification(element.title, {
            body: "Complete task",
            icon: "https://cdn4.iconfinder.com/data/icons/generic-interaction/143/yes-tick-success-done-complete-check-allow-512.png",
          });
        }
      });
      // console.log("interval")
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const handlegetDocument = () => {
    dispatch(getAllItemsFromDatabase(userEmail));
    // new Notification("Get all")
  };

  const deleteItemHandle = (e) => {
    let id = e.id;
    dispatch(deleteItem({ userEmail, id }));
  };

  const deletAllDocument = () => {
    dispatch(deleteAllItem(userEmail));
  };
  // console.log(alldata)
  return (
    <>
      <div className="container text-light my-3 d-flex justify-content-between">
        <h4>Your Items </h4>
        <div>
          <button
            className="btn btn-dark text-light mx-1"
            onClick={handlegetDocument}
          >
            {refreshLoading ? "Please Wait" : "Refresh"}
          </button>

          <button
            className="btn btn-danger text-light"
            onClick={deletAllDocument}
          >
            {refreshLoading ? "Please Wait" : "Delete All"}
          </button>
        </div>
      </div>
      {alldata.length === 0 && (
        <div className="conatiner fs-5 text-center text-danger">
          <b>
            Nothing to show
          </b>
        </div>
      )}
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
                date={e.date}
                time={e.time}
                deleteItem={() => deleteItemHandle(e)}
                complete = {e.complete}
              />
            </div>
          );
        })}
    </>
  );
}

export default ShowItems;
