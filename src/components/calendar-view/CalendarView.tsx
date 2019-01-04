import { Moment } from "moment";
import React from "react";
import { CalendarViewTypes } from "../../constants/CalendarViewTypes";
import { DayView } from "./day-view/DayView";
import { MonthView } from "./month-view/MonthView";
import { WeekView } from "./week-view/WeekView";

interface ICalendarViewProps {
  viewType: CalendarViewTypes;
  selectedDate: Moment;
}

export class CalendarView extends React.Component<ICalendarViewProps> {
  public render() {
    const { selectedDate } = this.props;
    const year = selectedDate.year();
    const month = selectedDate.month();
    const weekInYear = selectedDate.isoWeek();
    const day = selectedDate.date();

    switch (this.props.viewType) {
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
