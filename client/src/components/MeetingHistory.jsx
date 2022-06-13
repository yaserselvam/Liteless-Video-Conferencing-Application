import React from "react";
import { useState, useEffect } from "react/cjs/react.development";

export default function MeetingHistory() {
  const [history, setHistory] = useState([]);
  const uid = localStorage.getItem("uid");
  const admin = localStorage.getItem("admin");
  useEffect(() => {
    getHistory();
  }, []);

  function getHistory() {
    fetch(
      `https://test.clitehd.com/api/meetinghistory/${admin === "1" ? "" : uid}`
    ).then((result) => {
      result.json().then((data) => {
        setHistory(data);
      });
    });
  }

  function handleArchive(roomname) {
    fetch(`https://test.clitehd.com/api/meetinghistory/${roomname}`, {
      method: "PUT",
    }).then((result) => {
      console.log(result);
      result.json().then(() => {
        getHistory();
      });
    });
  }

  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Roomname</th>
            <th>Date and Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {history.map((gethistory) =>
            gethistory.isArchieved === 0 ? (
              <>
                <tr key={gethistory.roomname}>
                  <td>{gethistory.roomname}</td>
                  <td>{gethistory.dateandtime}</td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleArchive(gethistory.roomname)}
                    >
                      Archive
                    </button>
                  </td>
                </tr>
              </>
            ) : null
          )}
        </tbody>
      </table>
      {admin === "1" ? (
        <table className="styled-table">
          <caption>Archived Meeting History</caption>
          <thead>
            <tr>
              <th>Roomname</th>
              <th>Date and Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((gethistory) =>
              gethistory.isArchieved === 1 ? (
                <>
                  <tr key={gethistory.roomname}>
                    <td>{gethistory.roomname}</td>
                    <td>{gethistory.dateandtime}</td>
                    <td>Archived</td>
                  </tr>
                </>
              ) : null
            )}
          </tbody>
        </table>
      ) : null}
    </div>
  );
}
