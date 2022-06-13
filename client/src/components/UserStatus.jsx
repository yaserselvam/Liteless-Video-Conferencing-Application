import React from "react";
import { useState, useEffect } from "react/cjs/react.development";
import { get, getDatabase, ref, remove, set } from "firebase/database";

export default function UserStatus() {
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState([]);
  const database = getDatabase();
  const db = database;
  function writeUserData(userId, email, token) {
    set(ref(db, "UserStatus/" + userId), {
      email: email,
      status: "Offline",
      token: token,
    })
      .then(() => {
        console.log("User Status Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getUserStatus() {
    const db = database;
    const data = await get(ref(db, "UserStatus/"));
    const statuses = await data.val();
    setStatus(Object.values(statuses));
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const admin = localStorage.getItem("admin");

  useEffect(() => {
    getUsers();
  }, []);

  function getUsers() {
    fetch(`https://test.clitehd.com/api/admin/users`).then((result) => {
      result.json().then((data) => {
        setUsers(data);
        getUserStatus();
      });
    });
  }

  function handleDelete(uid) {
    remove(ref(db, "UserStatus/" + uid))
      .then(() => {
        console.log("User deleted");
      })
      .catch((error) => {
        console.log(error);
      });
    fetch(`https://test.clitehd.com/api/admin/users/${uid}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then(() => {
        getUsers();
      });
    });
  }

  async function userSignup(url = "", data = {}) {
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

  const signup = (event) => {
    event.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    document.getElementById("email").style.borderColor = "#4f8a82";
    document.getElementById("password").style.borderColor = "#4f8a82";
    if (email.value === "" || email.value === null) {
      document.getElementById("email").style.borderColor = "red";
    } else if (!regex.test(email.value)) {
      document.getElementById("email").style.borderColor = "red";
    }
    if (password.value === "" || password.value === null) {
      document.getElementById("password").style.borderColor = "red";
    } else if (password.value.length < 4) {
      document.getElementById("password").style.borderColor = "red";
    } else if (password.value.length > 10) {
      document.getElementById("password").style.borderColor = "red";
    }
    if (regex.test(email.value) && password.value !== "") {
      userSignup("https://test.clitehd.com/api/register", {
        email: email.value,
        password: password.value,
      }).then((data) => {
        if (data.status === 400) {
          document.getElementById("email").style.borderColor = "red";
          document.getElementById("password").style.borderColor = "red";
        } else {
          email.value = "";
          password.value = "";
          writeUserData(data.body.uid, email.value, data.body.token);
          getUsers();
        }
      });
    }
  };

  return (
    <div>
      {admin === "1" ? (
        <form className="row g-3 addForm">
          <div className="col-md-3 addEmail">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control p-2"
            ></input>
          </div>
          <div className="col-md-3 addPassword">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control p-2"
            ></input>
          </div>
          <div className="col-md-3">
            <button
              type="submit"
              id="addUser"
              className="btn btn-success"
              onClick={(event) => signup(event)}
            >
              Add
            </button>
          </div>
        </form>
      ) : null}
      <table className="styled-table">
        <thead>
          <tr>
            <th>Users</th>
            <th>Status</th>
            {admin === "1" ? <th>Action</th> : null}
          </tr>
        </thead>
        <tbody>
          {users.map((getusers, index) => (
            <tr key={index}>
              <td>{getusers.Email}</td>
              {status.map((presence) =>
                getusers.Email === presence.email ? (
                  <td>{presence.status}</td>
                ) : null
              )}
              {admin === "1" ? (
                getusers.isAdmin === 0 ? (
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(getusers.UserId)}
                    >
                      Delete
                    </button>
                  </td>
                ) : null
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
