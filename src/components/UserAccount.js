import React, { Component } from "react";
import Additemsmodal from "./AdditemsModal";
// import AddIcon from "./Icons/AddIcon";

export default class UserAccount extends Component {
  render() {
    return (
      <div className="container text-center">
        {/* <button type="button" className="btn btn-primary text-center ">
          <AddIcon /> Add Items
        </button> */}
        <Additemsmodal/>
      </div>
    );
  }
}
