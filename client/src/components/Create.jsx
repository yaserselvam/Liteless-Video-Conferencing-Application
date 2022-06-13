import React from "react";
import NavBar from "./NavBar";
import { useState, useEffect } from "react/cjs/react.development";

export default function Create() {
  const [users, setUsers] = useState([]);
  const uid = localStorage.getItem("uid");
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    fetch(`https://test.clitehd.com/api/admin/users`).then((result) => {
      result.json().then((data) => {
        setUsers(data);
      });
    });
  }

  async function userCreate(url = "", data = {}) {
    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return {
      status: response.status,
      body: await response.json(),
    };
  }

  const createMeeting = (event) => {
    event.preventDefault();
    const roomName = document.getElementById("email");
    const password = document.getElementById("password");
    const roomError = document.getElementById("room-error");
    const passwordError = document.getElementById("password-error");
    roomError.innerHTML = "";
    passwordError.innerHTML = "";
    document.getElementById("email").style.borderColor = "#4f8a82";
    document.getElementById("password").style.borderColor = "#4f8a82";

    if (roomName.value === "") {
      document.getElementById("email").style.borderColor = "red";
      roomError.innerHTML = "Please enter a room name!";
    }
    if (password.value === "") {
      document.getElementById("password").style.borderColor = "red";
      passwordError.innerHTML = "Please enter a password!";
    }
    if (roomName.value !== "" && password.value !== "") {
      users.map((getusers) => {
        if (
          getusers.Email.substring(0, getusers.Email.lastIndexOf("@")) ===
          roomName.value
        ) {
          passwordError.innerHTML = "Can't create a room with the user name!";
          return;
        } else {
          userCreate(`https://test.clitehd.com/api/createmeeting/${uid}`, {
            roomName: roomName.value,
            password: password.value,
          }).then((data) => {
            if (data.status === 400) {
              passwordError.innerHTML = "Room name already exists!";
              return;
            } else {
              window.location =
                "https://test.clitehd.com/" +
                roomName.value +
                "?jwt=" +
                `${accessToken}`;
            }
          });
        }
      });
    }
  };
  return (
    <div>
      <NavBar />
      <div className="center center-login">
        <h1 className="login-title">Create Meeting</h1>
        <form action="#">
          <div className="text_field">
            <label className="room-login email" htmlFor="username">
              Room Name
            </label>
            <br />
            <input
              type="text"
              id="email"
              placeholder="Enter Room Name"
              required
            />
          </div>
          <p style={{ color: "red" }} id="room-error"></p>
          <div className="text_field">
            <label className="password-login password" htmlFor="password">
              Password
            </label>
            <br />
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              required
            />
          </div>
          <p style={{ color: "red" }} id="password-error"></p>
          <button
            onClick={(event) => createMeeting(event)}
            className="login"
            type="submit"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
