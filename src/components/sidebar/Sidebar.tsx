import { Moment } from "moment";
import React, { Component } from "react";
import { CalendarViewTypes } from "../../constants/CalendarViewTypes";
import "./sidebar.css";

interface ISidebarProps {
  currentView: CalendarViewTypes;
  selectedDate: Moment;
}

interface ISidebarState {
  currentView: CalendarViewTypes;
  selectedDate: Moment;
}

export class Sidebar extends Component<ISidebarProps, ISidebarState> {
  constructor(props: ISidebarProps) {
    super(props);
    const { currentView, selectedDate } = props;
    this.state = {
      currentView,
      selectedDate,
    };
  }

  public render() {
    return <div className="sidebar">Such empty...</div>;
  }
}
