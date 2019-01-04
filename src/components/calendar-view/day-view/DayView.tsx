import { Moment, utc } from "moment";
import React from "react";
import { DateFormats } from "../../../constants/DateFormats";
import "./day-view.css";

interface IDayViewProps {
  year: number;
  month: number;
  day: number;
  isToday?: boolean;
  isSelected?: boolean;
  isOutsideOfCurrentMonth?: boolean;
}

export class DayView extends React.Component<IDayViewProps> {
  public render() {
    const { day, month, year } = this.props;
    const className: string = this.getClassName();
    const dateToDisplay: Moment = utc()
      .year(year)
      .month(month)
      .date(day);

    return (
      <div className={className} key={dateToDisplay.format(DateFormats.SHORT)}>
        <span className="label">{dateToDisplay.format(DateFormats.DAY)}</span>
      </div>
    );
  }

  private getClassName(): string {
    const classNames = ["day"];
    const { isToday, isSelected, isOutsideOfCurrentMonth } = this.props;

    if (isToday) {
      classNames.push("is-today");
    }

    if (isSelected) {
      classNames.push("is-selected");
    }

    if (isOutsideOfCurrentMonth) {
      classNames.push("is-faded");
    }

    return classNames.join(" ");
  }
}
