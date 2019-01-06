import { Moment, utc } from "moment";
import React from "react";
import { CalendarViewTypes } from "../../../constants/CalendarViewTypes";
import { DateFormats } from "../../../constants/DateFormats";
import { MomentDateUnits } from "../../../constants/MomentDateUnits";
import "./date-switcher.css";

interface IDateSwitcherProps {
  selectedDate: Moment;
  currentView: CalendarViewTypes;
  dateChangeHandler: (newDate: Moment) => void;
}

export class DateSwitcher extends React.Component<IDateSwitcherProps> {
  constructor(props: IDateSwitcherProps) {
    super(props);
    this.previousDateClickHandler = this.previousDateClickHandler.bind(this);
    this.nextDateClickHandler = this.nextDateClickHandler.bind(this);
    this.todayClickHandler = this.todayClickHandler.bind(this);
  }

  public render() {
    const { selectedDate } = this.props;
    const today: Moment = utc();
    const isToday: boolean = selectedDate.isSame(today, MomentDateUnits.DAY);
    return (
      <div className="date-switcher">
        <button
          onClick={this.todayClickHandler}
          disabled={isToday}
          className="today"
        >
          Today
        </button>
        <div onClick={this.previousDateClickHandler} className="previous-date">
          &lt;
        </div>
        <div onClick={this.nextDateClickHandler} className="next-date">
          &gt;
        </div>
        <div className="date">
          {selectedDate.format(DateFormats.FULL_MONTH_NAME_AND_YEAR)}
        </div>
      </div>
    );
  }

  private previousDateClickHandler() {
    const { selectedDate, currentView, dateChangeHandler } = this.props;
    const newDate: Moment = selectedDate.clone().add(-1, currentView);
    dateChangeHandler(newDate);
  }

  private nextDateClickHandler() {
    const { selectedDate, currentView, dateChangeHandler } = this.props;
    const newDate: Moment = selectedDate.clone().add(1, currentView);
    dateChangeHandler(newDate);
  }

  private todayClickHandler() {
    const { dateChangeHandler } = this.props;
    dateChangeHandler(utc());
  }
}
