import { Moment } from "moment";
import React from "react";
import { CalendarViewTypes } from "../../constants/CalendarViewTypes";
import { IAbstractViewProps } from "./AbstractView";
import { DayView } from "./day-view/DayView";
import { MonthView } from "./month-view/MonthView";
import { WeekView } from "./week-view/WeekView";

interface ICalendarViewProps {
  viewType: CalendarViewTypes;
  selectedDate?: Moment;
}

export class CalendarView extends React.Component<ICalendarViewProps> {
  public render() {
    const { selectedDate } = this.props;
    const viewProps: IAbstractViewProps = {
      selectedDate,
    };

    switch (this.props.viewType) {
      case CalendarViewTypes.MONTH:
        return <MonthView {...viewProps} />;

      case CalendarViewTypes.WEEK:
        return <WeekView {...viewProps} />;

      case CalendarViewTypes.DAY:
        return <DayView {...viewProps} />;

      default:
        return <MonthView {...viewProps} />;
    }
  }
}
