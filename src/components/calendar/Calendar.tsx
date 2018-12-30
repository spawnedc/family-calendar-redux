import React, { Component } from "react";
import { CalendarViewTypes } from "../../constants/CalendarViewTypes";
import { CalendarView } from "../calendar-view/CalendarView";

interface ICalendarProps {
  viewType: CalendarViewTypes;
}

export class Calendar extends Component<ICalendarProps, {}> {
  public render() {
    return <CalendarView viewType={this.props.viewType} />;
  }
}
