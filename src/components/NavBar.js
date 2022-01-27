import React, { Component } from "react";
import { Link } from "react-router-dom";
import HomeIcon from "../components/Icons/HomeIcon";
import { signOut } from "firebase/auth";
import { authApp } from "../utils/Firebase-Config";
export default class NavBar extends Component {
  // componentDidMount(){
  //   if(localStorage.getItem('user')!==null){
  //     if(localStorage.getItem('userstatus')==="login")
  //     {
  //       this.setState({
  //         currentUser:true,
  //       })
        
  //     }
  //     else{
  //       this.setState({
  //         currentUser:false,
  //       })
  //     }
  //   }
  // }
  handleLogOut=async()=>{
    console.log("Logout")
    await signOut(authApp).then((e)=>{
      this.setState({
        currentUser:false
      },()=>{
        localStorage.clear()
         
      })
    })
    
  }
 

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-inherit">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <HomeIcon></HomeIcon>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/about"
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/contactus">
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* <div className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-success" type="submit">
                Search
              </button>
            </div> */}
            {!this.props.currentUser ?
              <>
               {/* Sign Up page  */}
            <Link to="/signup">
              <button className="btn btn-primary mx-1 my-1" type="submit">
                Sign Up
              </button>
            </Link>

            {/* Login Modal */}
            <Link to="/login">
              <button className="btn btn-danger my-1" type="submit">
                Login
              </button>
            </Link>
              </>: <Link to="/logout">
              <button className="btn btn-danger my-1" type="submit" onClick={this.handleLogOut}>
                Logout
              </button>
            </Link>
              }
          </div>
        </div>
      </nav>
    );
  }
}