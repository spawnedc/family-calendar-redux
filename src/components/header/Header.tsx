import { Moment } from "moment";
import React, { Component } from "react";
import { CalendarViewTypes } from "../../constants/CalendarViewTypes";
import { CalendarViewDropdown } from "./calendar-view-dropdown/CalendarViewDropdown";
import { DateSwitcher } from "./date-switcher/DateSwitcher";
import "./header.css";
import { UserInfo } from "./user-info/UserInfo";

interface IHeaderProps {
  currentView: CalendarViewTypes;
  selectedDate: Moment;
  userProfile: gapi.auth2.BasicProfile | null;
  viewChangeHandler: (newView: CalendarViewTypes) => void;
  dateChangeHandler: (newDate: Moment) => void;
}

export class Header extends Component<IHeaderProps> {
  public render() {
    const {
      currentView,
      viewChangeHandler,
      selectedDate,
      dateChangeHandler,
      userProfile,
    } = this.props;

    return (
      <div className="header">
        <DateSwitcher
          currentView={currentView}
          selectedDate={selectedDate}
          dateChangeHandler={dateChangeHandler}
        />
        <CalendarViewDropdown
          currentView={currentView}
          viewChangeHandler={viewChangeHandler}
        />
        {userProfile && <UserInfo profile={userProfile} />}
      </div>
    );
  }
}
