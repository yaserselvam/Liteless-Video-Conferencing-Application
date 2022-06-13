import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { auth, app } from "../firebase-config";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

export default function SignIn() {
  const database = getDatabase();
  function writeUserData(userId, email, token) {
    const db = database;
    set(ref(db, "UserStatus/" + userId), {
      email: email,
      status: "Online",
      token: token,
    })
      .then(() => {
        console.log("User Status Updated");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  async function userLogin(url = "", data = {}) {
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

  const login = (event) => {
    event.preventDefault();
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    emailError.innerHTML = "";
    passwordError.innerHTML = "";
    document.getElementById("email").style.borderColor = "#4f8a82";
    document.getElementById("password").style.borderColor = "#4f8a82";
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
    }
    if (regex.test(email.value) && password.value !== "") {
      userLogin("https://test.clitehd.com/api/login", {
        email: email.value.toLowerCase(),
        password: password.value,
      }).then((data) => {
        if (data.status === 400) {
          passwordError.innerHTML = "Email or password is incorrect!";
        } else if (data.status === 401) {
          passwordError.innerHTML = "Email or password is incorrect!";
        } else {
          localStorage.setItem("loginEmail", email.value);
          localStorage.setItem("loginPassword", password.value);
          localStorage.setItem("uid", JSON.stringify(data.body.id));
          localStorage.setItem("admin", JSON.stringify(data.body.isAdmin));
          localStorage.setItem("accessToken", data.body.token);
          const accessToken = localStorage.getItem("accessToken");
          writeUserData(localStorage.getItem("uid"), email.value, accessToken);
          setTimeout(() => {
            window.location = "/home";
          }, 1000);
          // signInWithCustomToken(auth, accessToken)
          //   .then((userCredential) => {
          //     console.log(userCredential);
          //   })
          //   .catch((error) => {
          //     const errorCode = error.code;
          //     const errorMessage = error.message;
          //   });
        }
      });
    }
  };

  return (
    <div>
      <NavBar />
      <div className="center center-login">
        <h1 className="login-title">Welcome Back</h1>
        <form action="#">
          <div className="text_field">
            <label className="email-login email" htmlFor="email">
              E-mail
            </label>
            <br />
            <input type="email" id="email" placeholder="Enter E-mail" />
          </div>
          <p style={{ color: "red" }} id="emailError"></p>
          <div className="text_field">
            <label className="password-login password" htmlFor="password">
              Password
            </label>
            <br />
            <input type="password" id="password" placeholder="Enter Password" />
          </div>
          <p style={{ color: "red" }} id="passwordError"></p>
          <button
            className="login"
            type="submit"
            onClick={(event) => login(event)}
          >
            Login
          </button>
          <br />
          <a className="pass forgot-new">
            <Link className="link" to="/forgot">
              Forgot Password?
            </Link>
          </a>
          <br />
          <a className="signup-link forgot-new">
            <Link className="link" to="/signup">
              New to LiteLess?
            </Link>
          </a>
        </form>
      </div>
    </div>
  );
}
