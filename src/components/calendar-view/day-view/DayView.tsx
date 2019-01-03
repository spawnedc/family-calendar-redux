import React from "react";
import { DateFormats } from "../../../constants/DateFormats";
import { MomentDateUnits } from "../../../constants/MomentDateUnits";
import { AbstractView } from "../AbstractView";

export class DayView extends AbstractView {
  protected dateUnits: MomentDateUnits = MomentDateUnits.DAY;

  public render() {
    const { selectedDate } = this.state;
    return (
      <div className="day" key={selectedDate.format(DateFormats.SHORT)}>
        {selectedDate.format(DateFormats.DAY)}
      </div>
    );
  }
}
