import React, { Component } from "react";

export default class Spinner extends Component {
  render() {
    return (
      <div className="justify-content-center">
        <div  className="spinner-border text-light" role="status"></div>
       
        {/* <div className="spinner-grow text-primary" role="status">
          <span className="sr-only"></span>
        </div>
        <div className="spinner-grow text-secondary" role="status">
          <span className="sr-only"></span>
        </div>
        <div className="spinner-grow text-success" role="status">
          <span className="sr-only"></span>
        </div>
        <div className="spinner-grow text-danger" role="status">
          <span className="sr-only"></span>
        </div>
        <div className="spinner-grow text-warning" role="status">
          <span className="sr-only"></span>
        </div>
        <div className="spinner-grow text-info" role="status">
          <span className="sr-only"></span>
        </div> */}
      </div>
    );
  }
}
