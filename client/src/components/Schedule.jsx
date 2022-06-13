import React from "react";
import NavBar from "./NavBar";

export default function Schedule() {
  async function userSchedule(url = "", data = {}) {
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
    return response.status;
  }

  const scheduleMeeting = (event) => {
    event.preventDefault();
    const roomName = document.getElementById("email");
    const date = document.getElementById("date");
    const time = document.getElementById("time");
    const roomError = document.getElementById("room-error");
    const dateError = document.getElementById("date-error");
    const timeError = document.getElementById("time-error");
    roomError.innerHTML = "";
    dateError.innerHTML = "";
    timeError.innerHTML = "";
    if (roomName.value === "") {
      roomError.innerHTML = "Please enter a room name!";
    }
    if (date.value === "") {
      dateError.innerHTML = "Please enter a date!";
    }
    if (time.value === "") {
      timeError.innerHTML = "Please enter a password!";
    }
    if (roomName.value !== "" && date.value !== "" && time.value !== "") {
      userSchedule("https://test.clitehd.com/api/schedulemeeting", {
        roomname: roomName.value,
        date: date.value,
        time: time.value,
      }).then((data) => {
        localStorage.setItem("accessToken", data.token);
        console.log(localStorage.getItem("accessToken")); 
        
      });
    }
  };

  return (
    <div>
      <NavBar />
      <div className="center center-signup">
        <h1 className="signup-title">Schedule Meeting</h1>
        <form action="#">
          <div className="text_field">
            <label className="room-login email" htmlFor="username">
              Room Name
            </label>
            <br />
            <input type="text" id="email" placeholder="Enter Room Name" />
          </div>
          <p id="room-error"></p>
          <div className="text_field">
            <label className="date" htmlFor="date">
              Date
            </label>
            <br />
            <input type="date" id="date" />
          </div>
          <p id="date-error"></p>
          <div className="text_field">
            <label className="time" htmlFor="time">
              Time
            </label>
            <br />
            <input type="time" id="time" />
          </div>
          <p id="time-error"></p>
          <button
            onClick={(event) => scheduleMeeting(event)}
            className="signup"
            type="submit"
          >
            Schedule
          </button>
        </form>
      </div>
    </div>
  );
}
