import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Forgot from "./components/Forgot";
import Create from "./components/Create";
import Schedule from "./components/Schedule";
import MeetingHistory from "./components/MeetingHistory";
import ResetPassword from "./components/ResetPassword";
import ChangePassword from "./components/ChangePassword";
import UserStatus from "./components/UserStatus";
import Dashboard from "./components/Dashboard";
import EmailVerify from "./components/EmailVerify";

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="home" element={<Home></Home>}></Route>
            <Route path="about" element={<About></About>}></Route>
            <Route path="login" element={<SignIn></SignIn>}></Route>
            <Route path="signup" element={<SignUp></SignUp>}></Route>
            <Route path="forgot" element={<Forgot></Forgot>}></Route>
            <Route
              path="reset"
              element={<ResetPassword></ResetPassword>}
            ></Route>
            <Route
              path="change"
              element={<ChangePassword></ChangePassword>}
            ></Route>
            <Route path="create" element={<Create></Create>}></Route>
            <Route path="schedule" element={<Schedule></Schedule>}></Route>
            <Route
              path="history"
              element={<MeetingHistory></MeetingHistory>}
            ></Route>
            <Route path="status" element={<UserStatus></UserStatus>}></Route>
            <Route path="dashboard" element={<Dashboard></Dashboard>}></Route>
            <Route
              path="emailVerify"
              element={<EmailVerify></EmailVerify>}
            ></Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}
