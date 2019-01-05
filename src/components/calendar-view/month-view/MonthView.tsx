import { Moment, utc } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import { DateFormats } from "../../../constants/DateFormats";
import { MomentDateUnits } from "../../../constants/MomentDateUnits";
import { IAbstractViewProps } from "../IAbstractViewProps";
import { WeekView } from "../week-view/WeekView";
import "./month-view.css";

interface IMonthViewProps extends IAbstractViewProps {
  month: number;
}

export class MonthView extends React.Component<IMonthViewProps> {
  public render() {
    const { selectedDate } = this.props;
    const range: DateRange = this.getRange();
    const weeksInMonth: Moment[] = Array.from(range.by(MomentDateUnits.WEEK));

    const weeks: JSX.Element[] = weeksInMonth.map((week: Moment) => {
      const year = week.year();
      const weekInYear = week.isoWeek();

      return (
        <WeekView
          key={week.format(DateFormats.WEEK_WITH_YEAR)}
          selectedDate={selectedDate}
          year={year}
          weekInYear={weekInYear}
        />
      );
    });

    const numberOfWeeks = weeks.length;
    const style: React.CSSProperties = {
      ["--numberOfRows" as any]: numberOfWeeks,
    };

    return (
      <div className="month" style={style}>
        {weeks}
      </div>
    );
  }

  private getRange(): DateRange {
    const { year, month } = this.props;
    const startDate: Moment = utc()
      .year(year)
      .month(month)
      .date(1);
    const endDate: Moment = startDate.clone().endOf(MomentDateUnits.MONTH);

    return new DateRange(startDate, endDate);
  }
}
