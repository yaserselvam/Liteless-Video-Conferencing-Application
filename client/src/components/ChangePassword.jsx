import React from "react";

export default function ChangePassword() {
  const uid = localStorage.getItem("uid");

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
      currentError.innerHTML = "Current Password is required!";
    }
    if (newPassword.value === "" || newPassword.value === null) {
      document.getElementById("newPassword").style.borderColor = "red";
      document.getElementById("passwordError").style.color = "red";
      newError.innerHTML = "New Password is required!";
    }
    if (currentPassword.value !== "" && newPassword.value !== "") {
      fetch(`https://test.clitehd.com/api/changepassword/${uid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: currentPassword.value,
          newPassword: newPassword.value,
        }),
      }).then((result) => {
        if (result.status === 400) {
          document.getElementById("currentPassword").style.borderColor = "red";
          currentError.innerHTML = "Current Password is incorrect!";
        } else if (result.status === 202) {
          newError.innerHTML = "Unable to change the password!";
          document.getElementById("passwordError").style.color = "red";
        } else if (currentPassword.value === newPassword.value) {
          document.getElementById("newPassword").style.borderColor = "red";
          document.getElementById("passwordError").style.color = "red";
          newError.innerHTML = "New Password is same as current password!";
        } else {
          newError.innerHTML = "Password changed successfully!";
          document.getElementById("passwordError").style.color = "green";
        }
      });
    }
  };

  return (
    <div>
      <div id="change-pass-container" className="center center-login">
        <form id="change-password" action="#">
          <div className="text_field">
            <label className="current-password" htmlFor="password">
              Current Password
            </label>
            <br />
            <input
              type="password"
              id="currentPassword"
              placeholder="Enter Current Password"
            />
          </div>
          <p style={{ color: "red" }} id="emailError"></p>
          <div className="text_field">
            <label className="new-password" htmlFor="password">
              New Password
            </label>
            <br />
            <input
              type="password"
              id="newPassword"
              placeholder="Enter New Password"
            />
          </div>
          <p id="passwordError"></p>
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
