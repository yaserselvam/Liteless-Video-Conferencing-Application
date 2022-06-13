import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { getDatabase, set, ref } from "firebase/database";

export default function NavBar() {
  const userId = localStorage.getItem("uid");
  const database = getDatabase();
  function writeUserData(userId) {
    const db = database;
    set(ref(db, "UserStatus/" + userId), {
      email: localStorage.getItem("loginEmail"),
      status: "Offline",
      token: localStorage.getItem("accessToken"),
    })
      .then(() => {
        console.log("User Status Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const logout = (event) => {
    event.preventDefault();
    writeUserData(userId);
    localStorage.clear();
    setTimeout(() => {
      window.location = "/home";
    }, 1000);
  };

  return (
    <header>
      <nav>
        <div className="logo-container">
          <Link to="/home">
            <img src={logo} alt="LiteLess" height="65px" />
          </Link>
        </div>
        <input type="checkbox" name="check" id="check" />
        <label htmlFor="check" className="hamburger-btn">
          <i className="fas fa-bars"></i>
        </label>
        <ul className="nav-list">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {localStorage.getItem("accessToken") == null ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/dashboard">
                  <button className="dashboard">Dashboard</button>
                </Link>
              </li>
              <li>
                <button className="logout" onClick={(event) => logout(event)}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
