import React from "react";
import NavBar from "./NavBar";

export default function Forgot() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  async function userForgot(url = "", data = {}) {
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

  const forgot = (event) => {
    event.preventDefault();
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    emailError.innerHTML = "";
    document.getElementById("email").style.borderColor = "#4f8a82";
    if (email.value === "" || email.value === null) {
      document.getElementById("email").style.borderColor = "red";
      emailError.innerHTML = "Email is required!";
    } else if (!regex.test(email.value)) {
      document.getElementById("email").style.borderColor = "red";
      emailError.innerHTML = "This is not a valid email format!";
    }
    if (regex.test(email.value)) {
      userForgot("https://test.clitehd.com/api/forgot", {
        email: email.value,
      }).then((data) => {
        if (data.status === 400) {
          emailError.innerHTML = "Email does not exist!";
        } else {
          window.location = "/reset";
        }
      });
    }
  };

  return (
    <div>
      <NavBar />
      <div className="center center-login">
        <h1>
          <div className="title">
            Let’s check if your E-mail is in our bucket :{")"}
          </div>
        </h1>
        <form action="#">
          <div className="text_field">
            <label className="email-login email" htmlFor="username">
              E-mail
            </label>
            <br />
            <input type="email" id="email" placeholder="Enter E-mail" />
          </div>
          <p style={{ color: "red" }} id="emailError"></p>
          <button
            onClick={(event) => forgot(event)}
            className="login"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
