import React from "react";
// import imagech from '../components/Icons/noconnection.gif'
import './checkconnection.css'
// /src/components/Icons/noconnection.gif
function CheckConnection() {
  return (
    <>
    <div className="container d-flex justify-content-center my-4">
    <span className="emoji clock" role="img" aria-label="clock">
    <div className="fs-2 text-danger text-center">Waiting For Connection</div>
    <div className="fs-2 text-danger text-center">🥱🥱🥱🥱</div>
   </span>
    </div>
    
    </>
  );
}

export default CheckConnection;
