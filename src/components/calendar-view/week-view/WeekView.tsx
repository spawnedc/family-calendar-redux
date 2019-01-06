import { Moment, utc } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import { DateFormats } from "../../../constants/DateFormats";
import { MomentDateUnits } from "../../../constants/MomentDateUnits";
import { DayView } from "../day-view/DayView";
import "./week-view.css";

interface IWeekViewProps {
  selectedDate: Moment;
  year: number;
  weekInYear: number;
}

export class WeekView extends React.Component<IWeekViewProps> {
  public render() {
    const weekRange: DateRange = this.getRange();
    const daysInWeek: Moment[] = Array.from(weekRange.by(MomentDateUnits.DAY));
    const { selectedDate, year } = this.props;
    const formattedSelectedDate = selectedDate.format(DateFormats.SHORT);

    const days: JSX.Element[] = daysInWeek.map((day: Moment) => {
      const isOutsideOfCurrentMonth = selectedDate.month() !== day.month();
      const month = day.month();
      const date = day.date();

      return (
        <DayView
          key={day.format(DateFormats.SHORT)}
          isOutsideOfCurrentMonth={isOutsideOfCurrentMonth}
          year={year}
          month={month}
          day={date}
        />
      );
    });
    return <div className="week">{days}</div>;
  }

  private getRange(): DateRange {
    const { year, weekInYear } = this.props;
    const startDate: Moment = utc()
      .year(year)
      .isoWeek(weekInYear)
      .startOf(MomentDateUnits.WEEK);
    const endDate: Moment = startDate.clone().endOf(MomentDateUnits.WEEK);

    return new DateRange(startDate, endDate);
  }
}
