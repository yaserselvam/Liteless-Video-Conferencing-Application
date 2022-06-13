import React from "react";
import NavBar from "./NavBar";

export default function ResetPassword() {
  const setnewpswd = (event) => {
    event.preventDefault();
    const currentPassword = document.getElementById("currentPassword");
    const newPassword = document.getElementById("newPassword");
    const currentError = document.getElementById("emailError");
    const newError = document.getElementById("passwordError");
    currentError.innerText = "";
    newError.innerHTML = "";
    document.getElementById("currentPassword").style.borderColor = "#4f8a82";
    document.getElementById("newPassword").style.borderColor = "#4f8a82";
    if (currentPassword.value === "" || currentPassword.value === null) {
      document.getElementById("currentPassword").style.borderColor = "red";
      currentError.innerHTML = "Password is required!";
    }
    if (newPassword.value === "" || newPassword.value === null) {
      document.getElementById("newPassword").style.borderColor = "red";
      newError.innerHTML = "Confirm Password is required!";
    } else if (currentPassword.value !== newPassword.value) {
      document.getElementById("newPassword").style.borderColor = "red";
      newError.innerHTML = "New Password does not match!";
    }
  };

  return (
    <div>
      <NavBar />
      <div className="center center-login">
        <h1>
          <div className="title">Set New Password</div>
        </h1>
        <form action="#">
          <div className="text_field">
            <label className="email-login password" htmlFor="password">
              Password
            </label>
            <br />
            <input type="password" id="password" placeholder="Enter Password" />
          </div>
          <p style={{ color: "red" }} id="emailError"></p>
          <div className="text_field">
            <label
              className="password-login password new-password"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <br />
            <input type="password" id="repeat" placeholder="Repeat Password" />
          </div>
          <p style={{ color: "red" }} id="passwordError"></p>
          <button
            className="login"
            type="submit"
            onClick={(event) => setnewpswd(event)}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
