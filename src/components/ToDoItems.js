import React from "react";
import { Link } from "react-router-dom";
import DeleIcon from '../components/Icons/DeleteIcon'
function ToDoItems(props) {
  return (
    <Link
      to="/userpage"
      className="list-group-item list-group-item-action my-2"
      aria-current="true"
      style={{ backgroundColor: "blueviolet", color: "white" }}
    >
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{props.title}</h5>
        <small>
        <button className="btn btn-outline-danger" onClick={props.deleteItem}><DeleIcon/></button>
        </small>
      </div>
      <p className="mb-1">{props.comment}</p>
      <small><i className="text-dark">Last Edited on</i> {props.date}</small>
    </Link>
  );
}

export default ToDoItems;
