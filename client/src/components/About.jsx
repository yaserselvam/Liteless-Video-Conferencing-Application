import React from "react";
import NavBar from "./NavBar";

export default class About extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="textContent">
          <p>
            LiteLess has defined a new standard of doing video conferencing, by
            offering a user-friendly, highly secured and cheaper real-time
            communications options. The browser-based behavior enables LiteLess
            to be accessed via most OS platform and allows users/participants to
            join into a video conferencing session by using their existing web
            browser from the PC, laptop as well as mobile devices, unlike other
            conventional video conferencing products that require download and
            installation. <br /> <br /> LiteLess protocol is made standard, it
            can be easily integrated with a standards-based Unified
            Communication (UC) solution. This has been proven by the successful
            integration with Crystalview HD platform, which is an HD Unified
            Communication Platform that provides a range of VC solution for
            boardroom-based video conferencing.
          </p>
        </div>
      </div>
    );
  }
}
