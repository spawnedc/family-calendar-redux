import { Moment } from "moment";
import React, { Component } from "react";
import { CalendarViewTypes } from "../../constants/CalendarViewTypes";
import { DayView } from "../calendar-view/day-view/DayView";
import { MonthView } from "../calendar-view/month-view/MonthView";
import { WeekView } from "../calendar-view/week-view/WeekView";
import "./calendar.css";

interface ICalendarProps {
  currentView: CalendarViewTypes;
  selectedDate: Moment;
}

export class Calendar extends Component<ICalendarProps, {}> {
  public render() {
    const viewToRender: JSX.Element = this.getViewToRender();
    return <div className="calendar">{viewToRender}</div>;
  }

  private getViewToRender(): JSX.Element {
    const { selectedDate, currentView } = this.props;
    const year = selectedDate.year();
    const month = selectedDate.month();
    const weekInYear = selectedDate.isoWeek();
    const day = selectedDate.date();

    switch (currentView) {
      case CalendarViewTypes.WEEK:
        return (
          <WeekView
            selectedDate={selectedDate}
            year={year}
            weekInYear={weekInYear}
          />
        );

      case CalendarViewTypes.DAY:
        return <DayView year={year} month={month} day={day} />;

      case CalendarViewTypes.MONTH:
      default:
        return (
          <MonthView selectedDate={selectedDate} year={year} month={month} />
        );
    }
  }
}
