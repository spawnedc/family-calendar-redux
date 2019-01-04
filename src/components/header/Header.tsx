import { Moment } from "moment";
import React, { Component } from "react";
import { CalendarViewTypes } from "../../constants/CalendarViewTypes";
import { CalendarViewDropdown } from "../calendar-view-dropdown/CalendarViewDropdown";
import "./header.css";

interface IHeaderProps {
  currentView: CalendarViewTypes;
  selectedDate: Moment;
  viewChangeHandler: (newView: CalendarViewTypes) => void;
}

interface IHeaderState {
  currentView: CalendarViewTypes;
  selectedDate: Moment;
}

export class Header extends Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);

    const { currentView, selectedDate } = props;
    this.state = {
      currentView,
      selectedDate,
    };
  }

  public render() {
    const { viewChangeHandler } = this.props;
    const { currentView } = this.state;
    return (
      <div className="header">
        <CalendarViewDropdown
          currentView={currentView}
          viewChangeHandler={viewChangeHandler}
        />
      </div>
    );
  }
}
