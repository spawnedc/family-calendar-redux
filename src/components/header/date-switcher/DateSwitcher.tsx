import { Moment } from "moment";
import React from "react";
import { CalendarViewTypes } from "../../../constants/CalendarViewTypes";
import { DateFormats } from "../../../constants/DateFormats";

interface IDateSwitcherProps {
  selectedDate: Moment;
  currentView: CalendarViewTypes;
  dateChangeHandler: (newDate: Moment) => void;
}

export class DateSwitcher extends React.Component<IDateSwitcherProps> {
  constructor(props: IDateSwitcherProps) {
    super(props);
    this.previousDate = this.previousDate.bind(this);
    this.nextDate = this.nextDate.bind(this);
  }

  public render() {
    const { selectedDate } = this.props;
    return (
      <div className="date-switcher">
        <div className="date">
          {selectedDate.format(DateFormats.FULL_MONTH_NAME_AND_YEAR)}
        </div>
        <div onClick={this.previousDate} className="previous-date">
          Previous date
        </div>
        <div onClick={this.nextDate} className="next-date">
          Next date
        </div>
      </div>
    );
  }

  private modifyDate(amount: number) {
    const { selectedDate, currentView, dateChangeHandler } = this.props;
    const newDate: Moment = selectedDate.clone().add(amount, currentView);
    dateChangeHandler(newDate);
  }

  private previousDate(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    this.modifyDate(-1);
  }

  private nextDate(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    this.modifyDate(1);
  }
}
