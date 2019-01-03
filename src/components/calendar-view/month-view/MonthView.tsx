import { Moment } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import { DateFormats } from "../../../constants/DateFormats";
import { MomentDateUnits } from "../../../constants/MomentDateUnits";
import { AbstractView } from "../AbstractView";
import { WeekView } from "../week-view/WeekView";
import "./month-view.css";

export class MonthView extends AbstractView {
  protected dateUnits: MomentDateUnits = MomentDateUnits.MONTH;

  public render() {
    const range: DateRange = this.getRange();
    const weeksInMonth: Moment[] = Array.from(range.by(MomentDateUnits.WEEK));

    const weeks: JSX.Element[] = weeksInMonth.map((week: Moment) => (
      <WeekView
        key={week.format(DateFormats.WEEK_WITH_YEAR)}
        selectedDate={week}
      />
    ));

    return <div className="month">{weeks}</div>;
  }

  private getRange(): DateRange {
    const { selectedDate } = this.state;

    const startDate: Moment = selectedDate
      .clone()
      .startOf(this.dateUnits)
      .startOf(MomentDateUnits.WEEK);

    const endDate: Moment = selectedDate
      .clone()
      .endOf(this.dateUnits)
      .endOf(MomentDateUnits.WEEK);

    return new DateRange(startDate, endDate);
  }
}
