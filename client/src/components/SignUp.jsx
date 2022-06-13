import { Link } from "react-router-dom";
import NavBar from "./NavBar";

export default function SignUp() {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

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
    return response.status;
  }

  const signup = (event) => {
    event.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const repeat = document.getElementById("repeat");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const repeatError = document.getElementById("repeatError");
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    repeatError.innerHTML = "";
    document.getElementById("email").style.borderColor = "#4f8a82";
    document.getElementById("password").style.borderColor = "#4f8a82";
    document.getElementById("repeat").style.borderColor = "#4f8a82";
    if (email.value === "" || email.value === null) {
      document.getElementById("email").style.borderColor = "red";
      emailError.innerHTML = "Email is required!";
    } else if (!regex.test(email.value)) {
      document.getElementById("email").style.borderColor = "red";
      emailError.innerHTML = "This is not a valid email format!";
    }
    if (password.value === "" || password.value === null) {
      document.getElementById("password").style.borderColor = "red";
      passwordError.innerHTML = "Password is required!";
    } else if (password.value.length < 4) {
      document.getElementById("password").style.borderColor = "red";
      passwordError.innerHTML = "Password must be more than 4 characters!";
    } else if (password.value.length > 10) {
      document.getElementById("password").style.borderColor = "red";
      passwordError.innerHTML =
        "Password cannot exceed more than 10 characters!";
    }
    if (repeat.value === "" || repeat.value === null) {
      document.getElementById("repeat").style.borderColor = "red";
      repeatError.innerHTML = "Repeat password is required!";
    } else if (password.value !== repeat.value) {
      document.getElementById("repeat").style.borderColor = "red";
      repeatError.innerHTML = "Password does not match!";
    }
    if (
      regex.test(email.value) &&
      password.value !== "" &&
      password.value === repeat.value
    ) {
      userSignup("https://test.clitehd.com/api/register", {
        email: email.value.toLowerCase(),
        password: repeat.value,
      }).then((data) => {
        if (data === 400) {
          document.getElementById("email").style.borderColor = "red";
          emailError.innerHTML = "User with this email already exists!";
        } else {
          window.location = "/login";
        }
      });
    }
  };

  return (
    <div>
      <NavBar />
      <div className="center center-signup">
        <h1 className="signup-title">Create Account</h1>
        <form id="signup-form" action="#">
          <div className="text_field">
            <label className="email" htmlFor="email">
              E-mail
            </label>
            <br />
            <input type="email" id="email" placeholder="Enter E-mail" />
          </div>
          <p style={{ color: "red" }} id="emailError"></p>
          <div className="text_field">
            <label className="password" htmlFor="password">
              Password
            </label>
            <br />
            <input type="password" id="password" placeholder="Enter Password" />
          </div>
          <p style={{ color: "red" }} id="passwordError"></p>
          <div className="text_field">
            <label className="repeat" htmlFor="repeat">
              Confirm Password
            </label>
            <br />
            <input type="password" id="repeat" placeholder="Repeat Password" />
          </div>
          <p style={{ color: "red" }} id="repeatError"></p>
          <button
            className="signup"
            type="submit"
            onClick={(event) => signup(event)}
          >
            SignUp
          </button>
          <br />
          <a className="pass forgot-new">
            <Link className="link" to="/login">
              Already have an account?
            </Link>
          </a>
        </form>
      </div>
    </div>
  );
}
