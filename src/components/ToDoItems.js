import React, { useState } from "react";
import DeleteIcon from "../components/Icons/DeleteIcon";
import DoneComplete from "../components/Icons/DoneComplete";
import Clock from "../components/Icons/Clock";

function ToDoItems(props) {
  const [background, setbackground] = useState("rgb(104, 68, 182)");
  return (
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
          <button className="btn btn-outline-danger" onClick={props.deleteItem}>
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
          <b className="text-light">
            Reminder On {props.date} at {props.time}
          </b>{" "}
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
  );
}

export default ToDoItems;
