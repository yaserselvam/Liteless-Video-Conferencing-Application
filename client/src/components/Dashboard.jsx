import React from "react";
import NavBar from "./NavBar";
import UserStatus from "./UserStatus";
import MeetingHistory from "./MeetingHistory";
import ChangePassword from "./ChangePassword";

export default function Dashboard() {
  return (
    <div>
      <NavBar />
      <div class="d-flex">
        <div
          class="nav flex-column nav-pills me-3 p-3 m-5"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <button
            class="nav-link active btn-lg"
            id="v-pills-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-friends"
            type="button"
            role="tab"
            aria-controls="v-pills-friends"
            aria-selected="true"
          >
            Users
          </button>
          <button
            class="nav-link btn-lg"
            id="v-pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-history"
            type="button"
            role="tab"
            aria-controls="v-pills-history"
            aria-selected="false"
          >
            Meeting History
          </button>
          <button
            class="nav-link btn-lg"
            id="v-pills-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#v-pills-change"
            type="button"
            role="tab"
            aria-controls="v-pills-change"
            aria-selected="false"
          >
            Change Password
          </button>
        </div>
        <div class="tab-content mx-auto" id="v-pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="v-pills-friends"
            role="tabpanel"
            aria-labelledby="v-pills-friends-tab"
          >
            <UserStatus />
          </div>
          <div
            class="tab-pane fade"
            id="v-pills-history"
            role="tabpanel"
            aria-labelledby="v-pills-history-tab"
          >
            <MeetingHistory />
          </div>
          <div
            class="tab-pane fade"
            id="v-pills-change"
            role="tabpanel"
            aria-labelledby="v-pills-change-tab"
          >
            <ChangePassword />
          </div>
        </div>
      </div>
    </div>
  );
}
