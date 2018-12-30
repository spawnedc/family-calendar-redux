import React, { Component } from "react";
import { CalendarViewTypes } from "../../constants/CalendarViewTypes";
import { DayView } from "./day-view/DayView";
import { MonthView } from "./month-view/MonthView";
import { WeekView } from "./week-view/WeekView";

interface ICalendarViewProps {
  viewType: CalendarViewTypes;
}

export class CalendarView extends Component<ICalendarViewProps> {
  public render() {
    switch (this.props.viewType) {
      case CalendarViewTypes.MONTH:
        return <MonthView />;
        break;
      case CalendarViewTypes.WEEK:
        return <WeekView />;
        break;
      case CalendarViewTypes.DAY:
        return <DayView />;
        break;
      default:
        return <MonthView />;
    }
  }
}
