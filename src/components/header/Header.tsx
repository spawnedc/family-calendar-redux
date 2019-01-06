import { Moment } from "moment";
import React, { Component } from "react";
import { CalendarViewTypes } from "../../constants/CalendarViewTypes";
import { CalendarViewDropdown } from "./calendar-view-dropdown/CalendarViewDropdown";
import { DateSwitcher } from "./date-switcher/DateSwitcher";
import "./header.css";

interface IHeaderProps {
  currentView: CalendarViewTypes;
  selectedDate: Moment;
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
      </div>
    );
  }
}
