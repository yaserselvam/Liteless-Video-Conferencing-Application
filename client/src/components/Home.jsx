import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import { Typewriter } from "react-simple-typewriter";
import NavBar from "./NavBar";

export default function Home() {
  const [history, setHistory] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    getHistory();
  }, []);

  function getHistory() {
    fetch("https://test.clitehd.com/api/meetinghistory/").then((result) => {
      result.json().then((data) => {
        setHistory(data);
      });
    });
  }

  const joinMeeting = (event) => {
    event.preventDefault();
    const room = document.getElementById("room-name");
    const roomError = document.getElementById("room-error");
    roomError.innerHTML = "";
    document.getElementById("room-name").style.borderColor = "#4f8a82";
    if (room.value === "") {
      document.getElementById("room-name").style.borderColor = "red";
      roomError.innerHTML = "Please enter a room name!";
    }
    if (room.value !== "") {
      history.map((gethistory) => {
        if (gethistory.roomname === room.value) {
          window.top.location =
            "https://test.clitehd.com/" + room.value + "?jwt=" + accessToken;
          return;
        }
      });
    }
  };

  return (
    <div>
      <NavBar />
      <div className="demo">
        <div className="text-container">
          <h1>Meeting's Made Easier</h1>
          <p className="typewriting">
            <Typewriter
              loop
              cursor
              cursorStyle="|"
              typespeed={40}
              deleteSpeed={70}
              delaySpeed={1000}
              words={["#tired_of_remembering_room_codes"]}
            />
          </p>
          <form action="/">
            <input type="text" id="room-name" placeholder="Enter Room Name" />
            <br />
            <p style={{ color: "red" }} id="room-error"></p>
            <button onClick={(event) => joinMeeting(event)}>Join</button>
          </form>
          {accessToken !== null ? (
            <div className="options">
              <button
                className="create-btn"
                onClick={() => (window.location = "/create")}
              >
                Create
              </button>
              <button onClick={() => (window.location = "/schedule")}>
                Schedule
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
