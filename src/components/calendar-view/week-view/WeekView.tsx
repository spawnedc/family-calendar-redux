import { Moment } from "moment";
import { DateRange } from "moment-range";
import React from "react";
import { DateFormats } from "../../../constants/DateFormats";
import { MomentDateUnits } from "../../../constants/MomentDateUnits";
import { AbstractView } from "../AbstractView";
import { DayView } from "../day-view/DayView";
import "./week-view.css";

export class WeekView extends AbstractView {
  protected dateUnits: MomentDateUnits = MomentDateUnits.WEEK;

  public render() {
    const weekRange: DateRange = this.getRange();
    const daysInWeek: Moment[] = Array.from(weekRange.by(MomentDateUnits.DAY));

    const days: JSX.Element[] = daysInWeek.map((day: Moment) => (
      <DayView key={day.format(DateFormats.SHORT)} selectedDate={day} />
    ));
    return (
      <div
        className="week"
        key={weekRange.start.format(DateFormats.WEEK_WITH_YEAR)}
      >
        {days}
      </div>
    );
  }

  private getRange(): DateRange {
    const { selectedDate } = this.state;
    const startDate: Moment = selectedDate.clone().startOf(this.dateUnits);
    const endDate: Moment = selectedDate.clone().endOf(this.dateUnits);

    return new DateRange(startDate, endDate);
  }
}
