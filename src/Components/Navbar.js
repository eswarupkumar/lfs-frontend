import React from "react";
import { setConstraint } from "../constraints";
import "../css/Navbar.css";
import axios from "axios";
import LostItem from "./Lost_item";
import { ToastProvider } from "react-toast-notifications";
// import profile_icon from "../img/profile-icon.png";
// import { Dropdown } from "react-bootstrap";
// import Login from './Login'
function Navbar() {
  const token = window.localStorage.getItem("token");
  // console.log(props)
  // console.log("Status :", LOGGED_IN)
  // useEffect(()=>{
  //   axios({
  //     url:'checktoken',
  //     method:"POST",
  //     headers:{
  //       Authorization: token ? `Bearer ${token}` : "",
  //     },
  //   })
  //   .then((res)=>{
  //     console.log(res)
  //   })
  //   .catch((err)=>{
  //     console.log("400 : ",err)
  //   })
  // },[])
  const signout = () => {
    // constraint.LOGGED_IN = false;
    setConstraint(false);

    console.log("Signed out !");
    axios({
      url: "https://lfs-backend.herokuapp.com/signout",
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then(localStorage.clear())
      .catch((error) => {
        console.log(error);
        // console.log("Error occured");
      });
  };
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <a style={{ textDecoration: "none", color: "white" }} href="/">
            <h2>Lost and Found</h2>
          </a>
        </div>

        <div
          style={token ? { display: "none" } : {}}
          id="login"
          className="signin"
        >
          <ul>
            <a
              id="a"
              style={{ textDecoration: "none", color: "white" }}
              href="/sign-up"
            >
              Sign-up
            </a>
          </ul>
          <ul>
            <a
              id="a"
              style={{ textDecoration: "none", color: "white" }}
              href="/log-in"
            >
              Log-in
            </a>
          </ul>
        </div>
        <div style={token ? {} : { display: "none" }} className="postsignin">
          <ToastProvider autoDismiss={true} placement={"bottom-right"}>
            <div>
              <LostItem />
            </div>
          </ToastProvider>
          {/* <Found_item /> */}
          <ul>
            <a style={{ textDecoration: "none", color: "white" }} href="/feed">
              Feed
            </a>
            {/* {props.name} */}
            <a
              style={{ textDecoration: "none", color: "white" }}
              href="/responses"
            >
              Responses
            </a>
            <a
              style={{ textDecoration: "none", color: "white" }}
              href="/mylistings"
            >
              My Listings
            </a>
            <a
              style={{ textDecoration: "none", color: "white" }}
              onClick={signout}
              href="/log-in"
            >
              Sign-out
            </a>
            {/* <div>
              <img src={profile_icon} alt="profile-icon" />
              <ul>
                <li>
                  <a
                    style={{ textDecoration: "none", color: "white" }}
                    href="/mylistings"
                  >
                    My Listings
                  </a>
                </li>
                <li>
                  <a
                    style={{ textDecoration: "none", color: "white" }}
                    href="/responses"
                  >
                    Responses
                  </a>
                </li>
                <li>
                  <a
                    style={{ textDecoration: "none", color: "white" }}
                    onClick={signout}
                    href="/log-in"
                  >
                    Log-out
                  </a>
                </li>
              </ul>
            </div> */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
