import React, { useEffect, useState } from "react";
import DeleteIcon from "../components/Icons/DeleteIcon";
import DoneComplete from "../components/Icons/DoneComplete";
import Clock from "../components/Icons/Clock";

function ToDoItems(props) {
  const [background, setbackground] = useState("rgb(104, 68, 182)");
  //Get random color for list
  useEffect(() => {
    var items = ["#1148AF", "#075B37", "#2A2081", "#5C2081", "#815320"];
    var item = items[Math.floor(Math.random() * items.length)];
    setbackground(item);
  },[background]);

  return (
    <>
      <div
        className="list-group-item list-group-item-action my-2 mx-1"
        aria-current="true"
        style={{ backgroundColor: background, color: "white" }}
      >
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">
            <font color="orange">Title </font>: {props.title}
          </h5>
          <small>
            <button
              className="btn btn-outline-danger"
              onClick={props.deleteItem}
            >
              <DeleteIcon />
            </button>
          </small>
        </div>
        <p className="mb-1 text-info">
          {" "}
          <b>
            <font color="#AF6C11">Comment</font>
          </b>{" "}
          : {props.comment}
        </p>
        <div className="d-flex justify-content-between">
          <small>
            {/* Show when the reminder is */}
            <b className="text-light">
              Reminder On {props.date} at {props.time}
            </b>{" "}
            {/* When the reminder is complete then show it */}
            {/* When the reminder is not complete then show it */}
          </small>
          {props.complete === "complete" ? (
            <small>
              <b className="text-light mx-2">
                <DoneComplete />
              </b>{" "}
            </small>
          ) : (
            <small>
              <b className="text-light mx-2">
                <Clock />
              </b>{" "}
            </small>
          )}
        </div>
      </div>
    </>
  );
}

export default ToDoItems;
