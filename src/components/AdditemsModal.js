// import { signInWithEmailAndPassword } from "firebase/auth";
import React, { Component } from "react";
import AddIcon from "./Icons/AddIcon";
// import { authApp } from "../utils/Firebase-Config";
// import validator from "validator";
// import { useHistory } from "react-router-dom";
export default class Additemsmodal extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      content: "",
      date: "",
      time: "",
      modalState: "",
    };
  }

  //Reset Sign up modal
  resetModal = async () => {
    this.setState({
      title: "",
      content: "",
      date: "",
      time: "",
    });
  };
  //end here

  //Sign In handle here
  handleItemAddToDatabase = async () => {
    if (
      this.state.content !== "" &&
      this.state.title.length >= 3 &&
      this.state.title !== ""
    ) {
      
    }
  };
  //end here

  onTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  onContentChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };
  render() {
    return (
      <>
        <button
          type="button"
          className="btn btn-primary text-center"
          data-bs-toggle="modal"
          data-bs-target="#additemModal"
        >
          <AddIcon /> Add Items
        </button>

        <div
          className="modal fade"
          id="additemModal"
          tabIndex="-1"
          aria-labelledby="additemModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content bg-dark">
              <div className="modal-header">
                <h5 className="modal-title text-light" id="additemModalLabel">
                  Add Your Items Here
                </h5>
                <button
                  type="button"
                  className="btn-close btn-danger"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body bg-dark">
                {/* Add items form start here */}
                <form>
                  <div className="row g-4 form-group align-items-center">
                    <div className="col-auto">
                      <label
                        htmlFor="titleid"
                        className="form-label text-light"
                      >
                        Title
                      </label>
                    </div>
                    <div className="col-auto">
                      <input
                        type="text"
                        className="form-control"
                        id="titleid"
                        aria-describedby="emailHelp"
                        placeholder="Enter Title"
                        value={this.state.title}
                        onChange={this.onTitleChange}
                      />
                    </div>

                    <div className="col-auto">
                      <label htmlFor="floatingTextarea" className="text-light">
                        Set Reminder
                      </label>
                    </div>

                    <div className="col-auto">
                      <input
                        type="datetime-local"
                        id="setreminder"
                        name="setreminder"
                      />
                    </div>

                    {/* set reminder */}
                  </div>
                  <div className="form-group my-3">
                    <div className="form-floating">
                      <textarea
                        className="form-control"
                        id="floatingTextarea2"
                        placeholder="Place Your Content Here"
                        style={{ height: "100px" }}
                        value={this.state.content}
                        onChange={this.onContentChange}
                        required
                      ></textarea>
                      <label
                        htmlFor="floatingTextarea2"
                        className="text-primary"
                      >
                        Place Your Content
                      </label>
                    </div>
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-danger"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type={this.handleItemAddToDatabase}
                      className="btn btn-primary text-center"
                      data-bs-target="#additemModal"
                      data-bs-dismiss={this.state.modalState}
                      onClick={this.handleItemAddToDatabase}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
