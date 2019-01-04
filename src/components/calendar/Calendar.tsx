import { Moment } from "moment";
import React, { Component } from "react";
import { CalendarViewTypes } from "../../constants/CalendarViewTypes";
import { CalendarView } from "../calendar-view/CalendarView";
import "./calendar.css";

interface ICalendarProps {
  viewType: CalendarViewTypes;
  selectedDate: Moment;
}

export class Calendar extends Component<ICalendarProps, {}> {
  public render() {
    const { viewType, selectedDate } = this.props;
    return (
      <div className="calendar">
        <CalendarView viewType={viewType} selectedDate={selectedDate} />
      </div>
    );
  }
}
