import React from "react";
import image  from './Icons/edge_browser_logo_icon_152998.png'
function Browsersupport() {
  return (
    <div className="container text-center">
      <div className="text-light fs-4">
        Use{" "}
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/87/Google_Chrome_icon_%282011%29.png"
          height={50}
          alt=""
        />
        OR{" "}
        <img src={image} height={50} alt="Error"/>
      </div>
      <br />
      <img src="https://i.pinimg.com/originals/2d/8e/61/2d8e61b8420097f56d9ba344b8d00328.png" alt="Error"></img>
    </div>
  );
}

export default Browsersupport;
